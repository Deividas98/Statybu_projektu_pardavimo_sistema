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
const bodyParser = require('body-parser');

//Authentication naudojamos dalys
//const jwt = require('jsonwebtoken');
//Authentication naudojamos dalys

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

//uzkraus viska is sio saito (sub nuorodos pvz /projects)
app.use('/projects', projectssRouter);
app.use('/products', productsRouter);

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
  saveUninitialized: true
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

// 2021-04-10
//const flash = require('express-flash')


/*const initializePassport = require('./passport-config');
initializePassport(passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id) 
  );

const users = [];*/

//app.use(express.urlencoded({extended: false}));
//app.use(flash())
/*app.use(session({
  secret: process.env.SESSIOIN_SECRET,
  resave: false,
  saveUninitialized: false
}))*/
/*app.use(passport.initialize())
app.use(passport.session())

app.get('/login', (req, res) => {

})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Pete',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    req.user = user
    next()
  })
}*/
