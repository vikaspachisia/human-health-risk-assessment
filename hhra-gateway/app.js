'use strict';

var config = require('./config/index');
var debug = require('debug')(config.product.name);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');

var middlewares = require('./middlewares/index');
var routers = require('./routers/index');

var app = express();

app.use(middlewares.auditHandler.logRequest());
app.use(middlewares.sessionHandler.newSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routers.rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', config.server.port);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
