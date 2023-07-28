"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const express_1 = require("express");
require("dotenv").config();
const passport = require("passport");
const authRouter = (0, express_1.Router)();
const mongoose = require('mongoose');
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const cookieParser = require("cookie-parser");
const MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: "mongodb+srv://lesgoepic:" + process.env.MONGODBPASSWORD + "@lesgoepiccluster.phdxtre.mongodb.net/?retryWrites=true&w=majority",
    databaseName: 'sessions',
    collection: 'cookies'
}, function (error) {
    //   console.log(error)
});
let GoogleStrategyUrl = "https://admin.lesgoepic.com/auth/google/callback"; //"http://localhost:3000/auth/google/callback"//"
authRouter.use(cookieParser());
authRouter.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 6000000,
    },
    rolling: true
}));
authRouter.use(passport.initialize());
authRouter.use(passport.session());
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(false, {
            id: user.id,
            username: user.username,
        });
    });
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(false, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: GoogleStrategyUrl,
    scope: ['profile'],
    state: true,
    cookie: { secure: true }
}, async function (accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({
        googleId: profile.id,
        username: profile.emails[0].value
    });
    if (!user) {
        return cb(null, null);
    }
    else {
        // console.log("success login")
        return cb(null, user);
    }
}));
authRouter.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));
authRouter.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
authRouter.use(function (err, req, res, next) {
    // Handle errors during authentication
    console.error(err);
    res.redirect('/error');
});
function checkLogin(req, res, next) {
    // console.log(req.session, "log", req.isAuthenticated())
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.render("login");
    }
}
exports.checkLogin = checkLogin;
exports.default = authRouter;
