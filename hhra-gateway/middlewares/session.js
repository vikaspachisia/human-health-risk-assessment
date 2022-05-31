const utils = require('./../utils/index');
const session = require('express-session');

const SessionHandler = class SessionHandler {
    
    newSession = async (req, res, next) => session({
        secret: 'ghl',
        resave: false,
        saveUninitialized: true
    });

    updateSession = async (req, res, next) => {
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)

            // store user information in session, typically a user id
            req.session.user = req.body.user

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) return next(err)
                next()
            })
        })
    };
};

const sessionHandler = new SessionHandler();

const middleware = {
    sessionHandler: sessionHandler
};

module.exports = middleware;