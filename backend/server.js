//kas naudojama
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//mongoose.set('useCreateIndex', true);//nuima warninga, bet reikia isitikinti ar viskas veikia. nes siaip warningas nepavojingas
//loginui
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');//bcrypt
//const bodyParser = require('body-parser');

//aplinkos kintamieji DMV faile
const dotenv = require('dotenv').config()
//require('dotenv').config();

//express serveris
const app = express();
const port = process.env.PORT || 5000;

//galima parsinti json
app.use(cors({origin: "http://localhost:3000", credentials: true}));//{origin: "http://localhost:3000", credentials: true} //<-- location of the react app connecting to
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology/*useCreateIndex*/: true } //depracated
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//prideti taip pat ir sekancius modelius!!!
const User = require('./models/user.model');
const projectssRouter = require('./routes/projects');
const productsRouter = require('./routes/products');
const accountRouter = require('./routes/accounts');
const agreementRouter = require('./routes/agreements');
const tasksRouter = require('./routes/tasks');

//uzkraus viska is sio saito (sub nuorodos pvz /projects)
app.use('/projects', projectssRouter);
app.use('/products', productsRouter);
app.use('/accounts', accountRouter);
app.use('/agreements', agreementRouter);
app.use('/tasks', tasksRouter);


//suveikia, kai pasileidzia serveris
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//Authentication naudojamos dalys
//middleware
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false//buvo tru dabar pakeitus logine galiu gauti userio info!!!!!
}));
app.use(cookieParser(process.env.SESSIOIN_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config")(passport);

//routes
app.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
  if (err) throw err;
  if (!user) res.send("No User Exists");
  else {
    req.logIn(user, (err) => {
      if (err) throw err;
      res.send("Successfully Authenticated");
      console.log(req.user);
    });
  }
})(req, res, next);
});
app.get('/user', (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  //console.log(req.user);
})
app.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        role: req.body.role
      });
      await newUser.save();
      res.send("User Created");
    }
  });
})

app.get('/users/me', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(204);
  }
});
