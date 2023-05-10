//jshint esversion:6
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const path = require("path")
const mongoose = require('mongoose');
var multerGoogleStorage = require("multer-google-storage");
const multer = require('multer')
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate')
const cookieParser = require("cookie-parser");
var uploadPoster = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: process.env.BUCKET,
    projectId: process.env.PROJECTID,
    keyFilename: process.env.KEYPATHFILE,
    filename: (req, file, cb) => {
      cb(null, `/posters/${Date.now()}_${file.originalname}`);
    }
  })
});
var uploadCoverImages = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: process.env.BUCKET,
    projectId: process.env.PROJECTID,
    keyFilename: process.env.KEYPATHFILE,
    filename: (req, file, cb) => {
      cb(null, `/driveLinkCoverImages/${Date.now()}_${file.originalname}`);
    }
  })
});
var ObjectId = require('mongodb').ObjectId;
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

app.use(express.static('public'))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ['profile'],
    state: true
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({
      googleId: profile.id,
      username: profile.emails[0].value
    })
    if (!user) {
      return cb("Review Techinical Team, LesGo Epic");
    } else {
      // console.log("success login")
      return cb(null, user);
    }
  }
));

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
    const events = await eventsCollection.find(query, options)
    let eventsJson = []
    for await (const doc of events) {
      eventsJson.push(doc)
    }
    return eventsJson
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function getEventInfo(id) {
  try {
    const database = client.db("upcomingevents");
    const eventCollection = database.collection("events");
    const query = {
      _id: new ObjectId(id)
    };
    const eventInfo = await eventCollection.findOne(query)

    return eventInfo
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function deleteEvent(id) {
  try {
    const database = client.db("upcomingevents");
    const eventCollection = database.collection("events");
    const query = {
      _id: new ObjectId(id)
    };
    const action = await eventCollection.deleteOne(query)
    // console.log(eventInfo)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function updateEvent(id, info, posterPath) {
  try {
    const database = client.db("upcomingevents");
    const eventCollection = database.collection("events");
    // create a filter for a movie to update
    const filter = {
      _id: new ObjectId(id)
    };
    // create a document that sets the plot of the movie
    var updateDoc = {}
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
    } else {
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
  } finally {
    // await client.close();
  }
}

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
  } finally {
    // await client.close();
  }
}

async function fetchAlbums() {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    const albums = await albumsCollection.find().sort({
      order: -1
    })
    let albumsJson = []
    for await (const doc of albums) {
      albumsJson.push(doc)
    }
    // console.log(albumsJson)
    return albumsJson
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function updateAlbum(id, info, coverImagePath) {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    // create a filter for a movie to update
    const filter = {
      _id: new ObjectId(id)
    };
    // create a document that sets the plot of the movie
    var updateDoc = {}
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
    } else {
      updateDoc = {
        $set: {
          name: info["name"],
          date: info["date"],
          driveLink: info["driveLink"],
          order: info["order"]
        },
      };
    }
    console.log(updateDoc)
    // console.log(updateDoc)
    const action = await albumsCollection.updateOne(filter, updateDoc);
    // console.log(result)
  } finally {
    // await client.close();
  }
}

async function getAlbumInfo(id) {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    const query = {
      _id: new ObjectId(id)
    };
    const albumInfo = await albumsCollection.findOne(query)

    return albumInfo
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

async function addNewAlbum(info, coverImagePath ) {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    const updateDoc = {
      name: info["name"],
      date: info["date"],
      image: coverImagePath ,
      driveLink: info["driveLink"],
      order: info["order"]
    };
    const action = await albumsCollection.insertOne(updateDoc);
    // console.log(result)
  } finally {
    // await client.close();
  }
}

async function deleteAlbum(id) {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    const query = {
      _id: new ObjectId(id)
    };
    const action = await albumsCollection.deleteOne(query)
    // console.log(eventInfo)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

function checkLogin(req, res) {
  if (req.user == null) {
    return true
  } else {
    return false
  }
}

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user, "hello")
    res.redirect('/');
  });

app.get("/", async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let eventsActive = await fetchEvents("true")
    let eventsPassed = await fetchEvents("false")
    res.render("events", {
      eventsActive: eventsActive,
      eventsPassed: eventsPassed
    })
  }
})

app.get("/login", function(req, res) {
  res.render("login")
})

app.get("/logout", function(req, res) {
  req.logout(function(err) {
    if (err) {
      // console.log(err)
    }
  });
  res.redirect("/");
})

app.get("/editEvent:eventId", async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let eventId = req.params.eventId.replace(":", "")
    let eventInfo = await getEventInfo(eventId)
    res.render("editEvent", {
      eventInfo: eventInfo
    })
  }
})

app.get("/addNewEvent", function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    res.render("addNewEvent")
  }
})

app.get("/albums", async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let albums = await fetchAlbums();
    res.render("albums", {
      albums: albums
    })
  }
})

app.get("/editAlbum:albumId", async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let albumId = req.params.albumId.replace(":", "")
    let albumInfo = await getAlbumInfo(albumId)
    res.render("editAlbum", {
      albumInfo: albumInfo
    })
  }
})

app.get("/addNewAlbum", function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    res.render("addNewAlbum")
  }
})

app.post("/editEvent:eventId", uploadPoster.any(), async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let eventId = req.params.eventId.replace(":", "")
    let eventInfo = req.body
    if (!req.files[0]) {
      await updateEvent(eventId, eventInfo)
      res.redirect("/")
    } else {
      // console.log(req.files[0])
      let posterPath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
      await updateEvent(eventId, eventInfo, posterPath)
      res.redirect("/")
    }
  }

})

app.post("/deleteEvent:eventId", async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let eventId = req.params.eventId.replace(":", "")
    // console.log(eventId)
    await deleteEvent(eventId)
    res.redirect("/")
  }
})

app.post("/addNewEvent", uploadPoster.any(), async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let newEventInfo = req.body
    let posterPath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
    await addNewEvent(newEventInfo, posterPath)
    res.redirect("/")
  }
})

app.post("/editAlbum:albumId", uploadCoverImages.any(), async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let albumId = req.params.albumId.replace(":", "")
    let albumInfo = req.body
    if (!req.files[0]) {
      await updateAlbum(albumId, albumInfo)
      res.redirect("albums")
    } else {
      // console.log(req.files[0])
      let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
      await updateAlbum(albumId, albumInfo, coverImagePath)
      res.redirect("/albums")
    }
  }

})

app.post("/addNewAlbum", uploadPoster.any(), async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let newAlbumInfo = req.body
    let coverImagePath = "https://storage.googleapis.com/lesgoepicadmin.appspot.com" + req.files[0].filename
    await addNewAlbum(newAlbumInfo, coverImagePath )
    res.redirect("albums")
  }
})

app.post("/deleteAlbum:albumId", async function(req, res) {
  if (checkLogin(req, res)) {
    res.redirect("login")
  } else {
    let albumId = req.params.albumId.replace(":", "")
    // console.log(eventId)
    await deleteAlbum(albumId)
    res.redirect("albums")
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {})
