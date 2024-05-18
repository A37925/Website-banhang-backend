const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect(`mongodb+srv://nguyen7quoc4huy02:${process.env.MONGO_DB}@cluster0.tig9y7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('connect Mongoose success')
  })
  .catch((err) => {
    console.log('connect Mongoose error')
  })

app.listen(port, () => {
  console.log('sever is running in port: ', + port)
});