import { Router } from "express";
import { Request, Response, NextFunction } from "express"
import {
    fetchEvents, fetchAlbums,
    fetchResponses, getEventInfo,
    getAlbumInfo, getNumSignUps,
    deleteAlbum, deleteEvent,
    updateAlbum, updateEvent,
    addNewAlbum, addNewEvent,
    fetchPosts, updatePost,
    getPostInfo, addNewPost,
    getScheduleInfo, updateSchedule,
    deletePost
} from "../controllers/dataBaseOperation"
import { checkLogin } from "./authRouter";
import { eventInfo } from "../models/eventInfo"
import { albumInfo } from "../models/albumInfo"
import { image } from "../models/image";
import { postInfo } from "../models/postInfo"
import { scheduleInfo } from "../models/scheduleInfo"

require("dotenv").config()

const router = Router();
const ObjectId = require('mongodb').ObjectId;
const multerGoogleStorage = require("multer-google-storage");
const multer = require('multer')

const uploadPoster = multer({
    storage: multerGoogleStorage.storageEngine({
        autoRetry: true,
        bucket: process.env.BUCKET,
        projectId: process.env.PROJECTID,
        keyFilename: process.env.KEYPATHFILE,
        filename: (req: Request, file: image, cb: (err: boolean, fileName: string) => void) => {
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
        filename: (req: Request, file: image, cb: (err: boolean, fileName: string) => void) => {
            cb(false, `/driveLinkCoverImages/${Date.now()}_${file.originalname}`);
        }

    })
});


router.get("/", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let eventsActive: eventInfo[] = await fetchEvents("true")
    let eventsPassed: eventInfo[] = await fetchEvents("false")
    res.render("events", {
        eventsActive: eventsActive,
        eventsPassed: eventsPassed
    })

})

router.get("/login", function (req: Request, res: Response): void {
    // console.log(req.session)
    res.render("login")
})

router.get("/logout", function (req: any, res: Response): void {
    req.logout(function (err: Error) {
        if (err) {
            // console.log(err)
        }
    });
    res.redirect("/");
})

router.get("/editEvent:eventId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let eventId: string = req.params.eventId.replace(":", "")
    let eventInfo: eventInfo = await getEventInfo(eventId)
    res.render("editEvent", {
        eventInfo: eventInfo
    })

})

router.get("/addNewEvent", checkLogin, function (req: Request, res: Response, next: NextFunction): void {
    res.render("addNewEvent")
})

router.get("/albums", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    let albums: albumInfo[] = await fetchAlbums();
    res.render("albums", {
        albums: albums
    })
})

router.get("/forms", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let formsActive: eventInfo[] = await fetchEvents("true")
    let formsPassed: eventInfo[] = await fetchEvents("false")
    let activeFormsCountSignUps = []
    let passedFormsCountSignUps = []
    for (let i = 0; i < formsActive.length; i++) {
        let eventId = new ObjectId(formsActive[i]["_id"])
        let count: number = await getNumSignUps(eventId)
        activeFormsCountSignUps.push(count)
    }
    for (let j = 0; j < formsPassed.length; j++) {
        let eventId = new ObjectId(formsPassed[j]["_id"])
        let count = await getNumSignUps(eventId)
        passedFormsCountSignUps.push(count)
    }
    res.render("forms", {
        formsActive: formsActive,
        activeCountSignUp: activeFormsCountSignUps,
        formsPassed: formsPassed,
        passedCountSignUp: passedFormsCountSignUps
    })

})

router.get("/viewForm:eventId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let eventId = req.params.eventId.replace(":", "")
    let responses = await fetchResponses(eventId)
    let eventInfo = await getEventInfo(eventId)
    let countSignUps = await getNumSignUps(eventId)
    res.render("response", {
        responses: responses,
        count: countSignUps,
        eventName: eventInfo.name
    })
    // console.log(responses)

})

router.get("/editAlbum:albumId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let albumId = req.params.albumId.replace(":", "")
    let albumInfo = await getAlbumInfo(albumId)
    res.render("editAlbum", {
        albumInfo: albumInfo
    })

})

router.get("/addNewAlbum", checkLogin, function (req: Request, res: Response): void {

    res.render("addNewAlbum")

})

router.get("/editPost:postId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let postId = req.params.postId.replace(":", "")
    let postInfo = await getPostInfo(postId)
    res.render("editPost", {
        postInfo: postInfo
    })

})

router.get("/blog", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let posts: postInfo[] = await fetchPosts()
    res.render("blog", { posts: posts })

})

router.get("/addNewPost", checkLogin, function (req: Request, res: Response): void {

    res.render("addNewPost")

})

router.get("/monthlySchedule", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    let scheduleInfo: scheduleInfo = await getScheduleInfo();
    res.render("monthlySchedule", {
        scheduleInfo: scheduleInfo
    })
})


router.post("/editEvent:eventId", checkLogin, uploadPoster.any(), async function (req: any, res: Response, next: NextFunction): Promise<void> {

    let eventId: string = req.params.eventId.replace(":", "")
    let eventInfo: eventInfo = req.body
    if (!req.files[0]) {
        await updateEvent(eventId, eventInfo, null)
        res.redirect("/")
    } else {
        // console.log(req.files[0])
        let posterPath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
        await updateEvent(eventId, eventInfo, posterPath)
        res.redirect("/")
    }


})

router.post("/deleteEvent:eventId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let eventId = req.params.eventId.replace(":", "")
    // console.log(eventId)
    await deleteEvent(eventId)
    res.redirect("/")

})

router.post("/addNewEvent", checkLogin, uploadPoster.any(), async function (req: any, res: Response, next: NextFunction): Promise<void> {
    let newEventInfo = req.body
    let posterPath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
    await addNewEvent(newEventInfo, posterPath)
    res.redirect("/")
})

router.post("/editAlbum:albumId", checkLogin, uploadCoverImages.any(), async function (req: any, res: Response) {

    let albumId = req.params.albumId.replace(":", "")
    let albumInfo = req.body
    if (!req.files[0]) {
        await updateAlbum(albumId, albumInfo, null)
        res.redirect("albums")
    } else {
        // console.log(req.files[0])
        let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
        await updateAlbum(albumId, albumInfo, coverImagePath)
        res.redirect("/albums")
    }


})

router.post("/addNewAlbum", checkLogin, uploadCoverImages.any(), async function (req: any, res: Response, next: NextFunction): Promise<void> {

    let newAlbumInfo = req.body
    let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
    await addNewAlbum(newAlbumInfo, coverImagePath)
    res.redirect("albums")

})

router.post("/deleteAlbum:albumId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let albumId = req.params.albumId.replace(":", "")
    // console.log(eventId)
    await deleteAlbum(albumId)
    res.redirect("albums")

})

router.post("/editPost:postId", checkLogin, uploadCoverImages.any(), async function (req: any, res: Response) {

    let postId = req.params.postId.replace(":", "")
    let postInfo = req.body
    let coverImage = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
    let imagesPath: string[] = []
    for (let index = 1; index < 4; index++) {
        imagesPath.push("https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[index].filename)
    }

    await updatePost(postId, postInfo, imagesPath, coverImage)
    res.redirect("/blog")
}
)

router.post("/addNewPost", checkLogin, uploadCoverImages.any(), async function (req: any, res: Response, next: NextFunction): Promise<void> {

    let newPostInfo = req.body
    let coverImage = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
    let imagesPath: string[] = []
    for (let index = 1; index < 4; index++) {
        imagesPath.push("https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[index].filename)
    }

    await addNewPost(newPostInfo, imagesPath, coverImage)
    res.redirect("blog")

})

router.post("/deletePost:postId", checkLogin, async function (req: Request, res: Response, next: NextFunction): Promise<void> {

    let postId: string = req.params.postId.replace(":", "")
    // console.log(eventId)
    await deletePost(postId)
    res.redirect("blog")

})

router.post("/editSchedule:scheduleId", checkLogin, uploadCoverImages.any(), async function (req: any, res: Response) {

    let scheduleId = req.params.scheduleId.replace(":", "")
    let scheduleInfo = req.body
    if (!req.files[0]) {
        await updateSchedule(scheduleId, scheduleInfo, null)
        res.redirect("/monthlySchedule")
    } else {
        let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
        await updateSchedule(scheduleId, scheduleInfo, coverImagePath)
        res.redirect("/monthlySchedule")
    }


})

export default router; 