const express = require('express');
const mongoose = require('mongoose');
const route = require('./router/router');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use('/api', route);
// mongodb://localhost:27017/my_basecamp
// process.env.DB_URL
mongoose.connect('mongodb://localhost:27017/my_basecamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT}`);
    })
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection: ' + err.message);
  }
});