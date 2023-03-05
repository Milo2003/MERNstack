const express = require('express');
const morgan = require('morgan');
const path = require('path');
const config = require('dotenv').config();
const app = express();

const router = require('./routes/task.router');
const { mongoose } = require('./db');

// Settings
const port =  process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname + '/public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/api/tasks', router);

// Run app
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//importar dotenv y leer una variable de entorno llamada PORT
