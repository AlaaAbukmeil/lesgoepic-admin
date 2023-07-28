"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataBaseOperation_1 = require("../controllers/dataBaseOperation");
const authRouter_1 = require("./authRouter");
require("dotenv").config();
const router = (0, express_1.Router)();
const ObjectId = require('mongodb').ObjectId;
const multerGoogleStorage = require("multer-google-storage");
const multer = require('multer');
const uploadPoster = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: process.env.BUCKET,
        projectId: process.env.PROJECTID,
        keyFilename: process.env.KEYPATHFILE,
        filename: (req, file, cb) => {
            cb(false, `/posters/${Date.now()}_${file.originalname}`);
        }
    })
});
const uploadCoverImages = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: process.env.BUCKET,
        projectId: process.env.PROJECTID,
        keyFilename: process.env.KEYPATHFILE,
        filename: (req, file, cb) => {
            cb(false, `/driveLinkCoverImages/${Date.now()}_${file.originalname}`);
        }
    })
});
router.get("/", authRouter_1.checkLogin, async function (req, res, next) {
    let eventsActive = await (0, dataBaseOperation_1.fetchEvents)("true");
    let eventsPassed = await (0, dataBaseOperation_1.fetchEvents)("false");
    res.render("events", {
        eventsActive: eventsActive,
        eventsPassed: eventsPassed
    });
});
router.get("/login", function (req, res) {
    // console.log(req.session)
    res.render("login");
});
router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            // console.log(err)
        }
    });
    res.redirect("/");
});
router.get("/editEvent:eventId", authRouter_1.checkLogin, async function (req, res, next) {
    let eventId = req.params.eventId.replace(":", "");
    let eventInfo = await (0, dataBaseOperation_1.getEventInfo)(eventId);
    res.render("editEvent", {
        eventInfo: eventInfo
    });
});
router.get("/addNewEvent", authRouter_1.checkLogin, function (req, res, next) {
    res.render("addNewEvent");
});
router.get("/albums", authRouter_1.checkLogin, async function (req, res, next) {
    let albums = await (0, dataBaseOperation_1.fetchAlbums)();
    res.render("albums", {
        albums: albums
    });
});
router.get("/forms", authRouter_1.checkLogin, async function (req, res, next) {
    let formsActive = await (0, dataBaseOperation_1.fetchEvents)("true");
    let formsPassed = await (0, dataBaseOperation_1.fetchEvents)("false");
    let activeFormsCountSignUps = [];
    let passedFormsCountSignUps = [];
    for (let i = 0; i < formsActive.length; i++) {
        let eventId = new ObjectId(formsActive[i]["_id"]);
        let count = await (0, dataBaseOperation_1.getNumSignUps)(eventId);
        activeFormsCountSignUps.push(count);
    }
    for (let j = 0; j < formsPassed.length; j++) {
        let eventId = new ObjectId(formsPassed[j]["_id"]);
        let count = await (0, dataBaseOperation_1.getNumSignUps)(eventId);
        passedFormsCountSignUps.push(count);
    }
    res.render("forms", {
        formsActive: formsActive,
        activeCountSignUp: activeFormsCountSignUps,
        formsPassed: formsPassed,
        passedCountSignUp: passedFormsCountSignUps
    });
});
router.get("/viewForm:eventId", authRouter_1.checkLogin, async function (req, res, next) {
    let eventId = req.params.eventId.replace(":", "");
    let responses = await (0, dataBaseOperation_1.fetchResponses)(eventId);
    let eventInfo = await (0, dataBaseOperation_1.getEventInfo)(eventId);
    let countSignUps = await (0, dataBaseOperation_1.getNumSignUps)(eventId);
    res.render("response", {
        responses: responses,
        count: countSignUps,
        eventName: eventInfo.name
    });
    // console.log(responses)
});
router.get("/editAlbum:albumId", authRouter_1.checkLogin, async function (req, res, next) {
    let albumId = req.params.albumId.replace(":", "");
    let albumInfo = await (0, dataBaseOperation_1.getAlbumInfo)(albumId);
    res.render("editAlbum", {
        albumInfo: albumInfo
    });
});
router.get("/addNewAlbum", authRouter_1.checkLogin, function (req, res) {
    res.render("addNewAlbum");
});
router.get("/editPost:postId", authRouter_1.checkLogin, async function (req, res, next) {
    let postId = req.params.postId.replace(":", "");
    let postInfo = await (0, dataBaseOperation_1.getPostInfo)(postId);
    res.render("editPost", {
        postInfo: postInfo
    });
});
router.get("/blog", authRouter_1.checkLogin, async function (req, res, next) {
    let posts = await (0, dataBaseOperation_1.fetchPosts)();
    res.render("blog", { posts: posts });
});
router.get("/addNewPost", authRouter_1.checkLogin, function (req, res) {
    res.render("addNewPost");
});
router.get("/monthlySchedule", authRouter_1.checkLogin, async function (req, res, next) {
    let scheduleInfo = await (0, dataBaseOperation_1.getScheduleInfo)();
    res.render("monthlySchedule", {
        scheduleInfo: scheduleInfo
    });
});
router.post("/editEvent:eventId", authRouter_1.checkLogin, uploadPoster.any(), async function (req, res, next) {
    let eventId = req.params.eventId.replace(":", "");
    let eventInfo = req.body;
    if (!req.files[0]) {
        await (0, dataBaseOperation_1.updateEvent)(eventId, eventInfo, null);
        res.redirect("/");
    }
    else {
        // console.log(req.files[0])
        let posterPath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
        await (0, dataBaseOperation_1.updateEvent)(eventId, eventInfo, posterPath);
        res.redirect("/");
    }
});
router.post("/deleteEvent:eventId", authRouter_1.checkLogin, async function (req, res, next) {
    let eventId = req.params.eventId.replace(":", "");
    // console.log(eventId)
    await (0, dataBaseOperation_1.deleteEvent)(eventId);
    res.redirect("/");
});
router.post("/addNewEvent", authRouter_1.checkLogin, uploadPoster.any(), async function (req, res, next) {
    let newEventInfo = req.body;
    let posterPath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
    await (0, dataBaseOperation_1.addNewEvent)(newEventInfo, posterPath);
    res.redirect("/");
});
router.post("/editAlbum:albumId", authRouter_1.checkLogin, uploadCoverImages.any(), async function (req, res) {
    let albumId = req.params.albumId.replace(":", "");
    let albumInfo = req.body;
    if (!req.files[0]) {
        await (0, dataBaseOperation_1.updateAlbum)(albumId, albumInfo, null);
        res.redirect("albums");
    }
    else {
        // console.log(req.files[0])
        let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
        await (0, dataBaseOperation_1.updateAlbum)(albumId, albumInfo, coverImagePath);
        res.redirect("/albums");
    }
});
router.post("/addNewAlbum", authRouter_1.checkLogin, uploadCoverImages.any(), async function (req, res, next) {
    let newAlbumInfo = req.body;
    let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
    await (0, dataBaseOperation_1.addNewAlbum)(newAlbumInfo, coverImagePath);
    res.redirect("albums");
});
router.post("/deleteAlbum:albumId", authRouter_1.checkLogin, async function (req, res, next) {
    let albumId = req.params.albumId.replace(":", "");
    // console.log(eventId)
    await (0, dataBaseOperation_1.deleteAlbum)(albumId);
    res.redirect("albums");
});
router.post("/editPost:postId", authRouter_1.checkLogin, uploadCoverImages.any(), async function (req, res) {
    let postId = req.params.postId.replace(":", "");
    let postInfo = req.body;
    let coverImage = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
    let imagesPath = [];
    for (let index = 1; index < 4; index++) {
        imagesPath.push("https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[index].filename);
    }
    await (0, dataBaseOperation_1.updatePost)(postId, postInfo, imagesPath, coverImage);
    res.redirect("/blog");
});
router.post("/addNewPost", authRouter_1.checkLogin, uploadCoverImages.any(), async function (req, res, next) {
    let newPostInfo = req.body;
    let coverImage = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
    let imagesPath = [];
    for (let index = 1; index < 4; index++) {
        imagesPath.push("https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[index].filename);
    }
    await (0, dataBaseOperation_1.addNewPost)(newPostInfo, imagesPath, coverImage);
    res.redirect("blog");
});
router.post("/deletePost:postId", authRouter_1.checkLogin, async function (req, res, next) {
    let postId = req.params.postId.replace(":", "");
    // console.log(eventId)
    await (0, dataBaseOperation_1.deletePost)(postId);
    res.redirect("blog");
});
router.post("/editSchedule:scheduleId", authRouter_1.checkLogin, uploadCoverImages.any(), async function (req, res) {
    let scheduleId = req.params.scheduleId.replace(":", "");
    let scheduleInfo = req.body;
    if (!req.files[0]) {
        await (0, dataBaseOperation_1.updateSchedule)(scheduleId, scheduleInfo, null);
        res.redirect("/monthlySchedule");
    }
    else {
        let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename;
        await (0, dataBaseOperation_1.updateSchedule)(scheduleId, scheduleInfo, coverImagePath);
        res.redirect("/monthlySchedule");
    }
});
exports.default = router;
