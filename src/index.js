const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log('connect Mongoose success')
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log('sever is running in port: ', + port)
});