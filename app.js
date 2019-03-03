'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
// const Celebrity = require('./models/Celebrity');

const indexRouter = require('./routes/index');

const app = express();

// const dataSeed = require('./bin/seeds');
// const dataFeed = async () => {
//     try {
//         await Celebrity.insertMany(dataSeed);
//     } catch (err) {
//         console.log(err);
//     }
// };
// dataFeed();

mongoose.connect('mongodb://localhost/movies', {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
    res.status(404);
    res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
    // always log the error
    console.error('ERROR', req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
        res.status(500);
        res.render('error');
    }
});

module.exports = app;
