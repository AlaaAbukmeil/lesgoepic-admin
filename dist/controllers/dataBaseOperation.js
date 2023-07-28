"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleInfo = exports.updateSchedule = exports.deletePost = exports.addNewPost = exports.getPostInfo = exports.updatePost = exports.fetchPosts = exports.getNumSignUps = exports.fetchResponses = exports.deleteAlbum = exports.addNewAlbum = exports.getAlbumInfo = exports.updateAlbum = exports.fetchAlbums = exports.addNewEvent = exports.updateEvent = exports.deleteEvent = exports.getEventInfo = exports.fetchEvents = void 0;
require("dotenv").config();
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lesgoepic:" + process.env.MONGODBPASSWORD + "@lesgoepiccluster.phdxtre.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const userDbUrl = "mongodb+srv://lesgoepic:" + process.env.MONGODBPASSWORD + "@lesgoepiccluster.phdxtre.mongodb.net/auth?retryWrites=true&w=majority";
mongoose.connect(userDbUrl, {
    useNewUrlParser: true
});
async function fetchEvents(state) {
    try {
        const database = client.db("upcomingevents");
        const eventsCollection = database.collection("events");
        const query = {
            display: state
        };
        const options = {
            // sort returned documents in ascending order by title (A->Z)
            sort: {
                order: 1
            }
        };
        const events = await eventsCollection.find(query, options);
        let eventsJson = [];
        for await (const doc of events) {
            eventsJson.push(doc);
        }
        return eventsJson;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.fetchEvents = fetchEvents;
async function getEventInfo(id) {
    try {
        const database = client.db("upcomingevents");
        const eventCollection = database.collection("events");
        const query = {
            _id: new ObjectId(id)
        };
        const eventInfo = await eventCollection.findOne(query);
        return eventInfo;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.getEventInfo = getEventInfo;
async function deleteEvent(id) {
    try {
        const database = client.db("upcomingevents");
        const eventCollection = database.collection("events");
        const query = {
            _id: new ObjectId(id)
        };
        const action = await eventCollection.deleteOne(query);
        // console.log(eventInfo)
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.deleteEvent = deleteEvent;
async function updateEvent(id, info, posterPath) {
    try {
        const database = client.db("upcomingevents");
        const eventCollection = database.collection("events");
        // create a filter for a movie to update
        const filter = {
            _id: new ObjectId(id)
        };
        // create a document that sets the plot of the movie
        let updateDoc = {};
        if (posterPath != null) {
            updateDoc = {
                $set: {
                    name: info["name"],
                    location: info["location"],
                    date: info["date"],
                    cost: info["cost"],
                    image: posterPath,
                    display: info["display"],
                    shortDescription: info["shortDescription"],
                    description: info["description"],
                    questions: info["questions"],
                    notes: info["notes"],
                    stripe: info["stripe"],
                    timeslots: info["timeslots"],
                    googleMaps: info["googleMaps"],
                    order: info["order"]
                },
            };
        }
        else {
            updateDoc = {
                $set: {
                    name: info["name"],
                    location: info["location"],
                    date: info["date"],
                    cost: info["cost"],
                    display: info["display"],
                    shortDescription: info["shortDescription"],
                    description: info["description"],
                    questions: info["questions"],
                    notes: info["notes"],
                    stripe: info["stripe"],
                    timeslots: info["timeslots"],
                    googleMaps: info["googleMaps"],
                    order: info["order"]
                },
            };
        }
        // console.log(updateDoc)
        const action = await eventCollection.updateOne(filter, updateDoc);
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.updateEvent = updateEvent;
async function addNewEvent(info, posterPath) {
    try {
        const database = client.db("upcomingevents");
        const eventCollection = database.collection("events");
        const updateDoc = {
            name: info["name"],
            location: info["location"],
            date: info["date"],
            cost: info["cost"],
            image: posterPath,
            display: info["display"],
            shortDescription: info["shortDescription"],
            description: info["description"],
            questions: info["questions"],
            notes: info["notes"],
            stripe: info["stripe"],
            timeslots: info["timeslots"],
            googleMaps: info["googleMaps"],
            order: info["order"],
        };
        const action = await eventCollection.insertOne(updateDoc);
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.addNewEvent = addNewEvent;
async function fetchAlbums() {
    try {
        const database = client.db("media");
        const albumsCollection = database.collection("albums");
        const albums = await albumsCollection.find().sort({
            order: -1
        });
        let albumsJson = [];
        for await (const doc of albums) {
            albumsJson.push(doc);
        }
        // console.log(albumsJson)
        return albumsJson;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.fetchAlbums = fetchAlbums;
async function updateAlbum(id, info, coverImagePath) {
    try {
        const database = client.db("media");
        const albumsCollection = database.collection("albums");
        // create a filter for a movie to update
        const filter = {
            _id: new ObjectId(id)
        };
        // create a document that sets the plot of the movie
        let updateDoc = {};
        if (coverImagePath != null) {
            updateDoc = {
                $set: {
                    name: info["name"],
                    date: info["date"],
                    image: coverImagePath,
                    driveLink: info["driveLink"],
                    order: info["order"]
                },
            };
        }
        else {
            updateDoc = {
                $set: {
                    name: info["name"],
                    date: info["date"],
                    driveLink: info["driveLink"],
                    order: info["order"]
                },
            };
        }
        // console.log(updateDoc)
        // console.log(updateDoc)
        const action = await albumsCollection.updateOne(filter, updateDoc);
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.updateAlbum = updateAlbum;
async function getAlbumInfo(id) {
    try {
        const database = client.db("media");
        const albumsCollection = database.collection("albums");
        const query = {
            _id: new ObjectId(id)
        };
        const albumInfo = await albumsCollection.findOne(query);
        return albumInfo;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.getAlbumInfo = getAlbumInfo;
async function addNewAlbum(info, coverImagePath) {
    try {
        const database = client.db("media");
        const albumsCollection = database.collection("albums");
        const updateDoc = {
            name: info["name"],
            date: info["date"],
            image: coverImagePath,
            driveLink: info["driveLink"],
            order: info["order"]
        };
        const action = await albumsCollection.insertOne(updateDoc);
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.addNewAlbum = addNewAlbum;
async function deleteAlbum(id) {
    try {
        const database = client.db("media");
        const albumsCollection = database.collection("albums");
        const query = {
            _id: new ObjectId(id)
        };
        const action = await albumsCollection.deleteOne(query);
        // console.log(eventInfo)
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.deleteAlbum = deleteAlbum;
async function fetchResponses(eventId) {
    try {
        const database = client.db("form");
        const responsesCollection = database.collection("responses");
        const query = {
            eventId: new ObjectId(eventId)
        };
        const responses = await responsesCollection.find(query);
        let responsesJson = [];
        for await (const doc of responses) {
            responsesJson.push(doc);
        }
        return responsesJson;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.fetchResponses = fetchResponses;
async function getNumSignUps(eventId) {
    try {
        const database = client.db("form");
        const responsesCollection = database.collection("responses");
        const query = {
            eventId: new ObjectId(eventId)
        };
        let count = await responsesCollection.countDocuments(query);
        return count;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.getNumSignUps = getNumSignUps;
async function fetchPosts() {
    try {
        const database = client.db("blog");
        const postsCollection = database.collection("posts");
        const posts = await postsCollection.find().sort({
            order: -1
        });
        let postsJson = [];
        for await (const doc of posts) {
            postsJson.push(doc);
        }
        // console.log(postsJson)
        return postsJson;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.fetchPosts = fetchPosts;
async function updatePost(id, info, imagesPath, coverImagePath) {
    try {
        const database = client.db("blog");
        const postsCollection = database.collection("posts");
        // create a filter for a movie to update
        const filter = {
            _id: new ObjectId(id)
        };
        // create a document that sets the plot of the movie
        let updateDoc = {};
        updateDoc = {
            $set: {
                name: info["name"],
                date: info["date"],
                images: imagesPath,
                coverImage: coverImagePath,
                caption: info["caption"],
                order: info["order"]
            },
        };
        // console.log(updateDoc)
        const action = await postsCollection.updateOne(filter, updateDoc);
        // console.log(action)
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.updatePost = updatePost;
async function getPostInfo(id) {
    try {
        const database = client.db("blog");
        const postsCollection = database.collection("posts");
        const query = {
            _id: new ObjectId(id)
        };
        const postInfo = await postsCollection.findOne(query);
        return postInfo;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.getPostInfo = getPostInfo;
async function addNewPost(info, imagesPath, coverImagePath) {
    try {
        const database = client.db("blog");
        const postCollection = database.collection("posts");
        const updateDoc = {
            name: info["name"],
            date: info["date"],
            caption: info["caption"],
            images: imagesPath,
            order: info["order"]
        };
        const action = await postCollection.insertOne(updateDoc);
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.addNewPost = addNewPost;
async function deletePost(id) {
    try {
        const database = client.db("blog");
        const postsCollection = database.collection("posts");
        const query = {
            _id: new ObjectId(id)
        };
        const action = await postsCollection.deleteOne(query);
        // console.log(eventInfo)
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.deletePost = deletePost;
async function updateSchedule(id, info, coverImagePath) {
    try {
        const database = client.db("schedule");
        const scheduleCollection = database.collection("file");
        let scheduleTime = info["scheduleTime"];
        // create a filter for a movie to update
        const filter = {
            _id: new ObjectId(id)
        };
        // create a document that sets the plot of the movie
        let updateDoc = {};
        if (coverImagePath != null) {
            updateDoc = {
                $set: {
                    image: coverImagePath,
                    scheduleTime: scheduleTime
                },
            };
        }
        else {
            updateDoc = {
                $set: {
                    scheduleTime: scheduleTime
                },
            };
        }
        // console.log(updateDoc)
        const action = await scheduleCollection.updateOne(filter, updateDoc);
        // console.log(result)
    }
    finally {
        // await client.close();
    }
}
exports.updateSchedule = updateSchedule;
async function getScheduleInfo() {
    try {
        const database = client.db("schedule");
        const scheduleCollection = database.collection("file");
        const query = {
            _id: new ObjectId("6474717f3ca184eb978e3e61")
        };
        const scheduleInfo = await scheduleCollection.findOne(query);
        return scheduleInfo;
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
exports.getScheduleInfo = getScheduleInfo;
