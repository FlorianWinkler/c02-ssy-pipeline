const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Load routes into variables
const index = require('./routes/index');
const queue = require("./routes/queue");
const counter = require("./routes/byteCounter");
const hosts = require("./routes/hostCounter");
const pubsub = require("./routes/pubsub");
const broker = require("./routes/broker");
const directory = require("./routes/directory");

const app = express();

// Template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Generic application setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes in Express webserver
app.use('/', index);
app.use("/queue",queue);
app.use("/bytes", counter);
app.use("/hosts", hosts);
app.use("/pubsub", pubsub);
app.use("/broker", broker);
app.use("/directory", directory);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.send('Not found');
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.stack);
    res.send(err.stack);
});

module.exports = app;
