//kas naudojama
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//aplinkos kintamieji DMV faile
require('dotenv').config();

//express serveris
const app = express();
const port = process.env.PORT || 5000;

//galima parsinti json
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology/*useCreateIndex*/: true } //depracated
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//prideti taip pat ir sekancius modelius!!!
const projectssRouter = require('./routes/projects');
const productsRouter = require('./routes/products');

//uzkraus viska is sio saito (sub nuorodos pvz /projects)
app.use('/projects', projectssRouter);
app.use('/products', productsRouter);

//suveikia, kai pasileidzia serveris
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});