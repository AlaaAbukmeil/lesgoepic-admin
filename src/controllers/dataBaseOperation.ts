import { eventInfo } from "../models/eventInfo"
import { albumInfo } from "../models/albumInfo"
import { postInfo } from "../models/postInfo"
import { AnyObject } from "../models/anyObject"
import { scheduleInfo } from "../models/scheduleInfo"
import { getCurrentMonthDateRange } from "./functions"
require("dotenv").config()

const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')
const ObjectId = require('mongodb').ObjectId;
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

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


export async function fetchEvents(state: string): Promise<eventInfo[]> {
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
    const events: eventInfo[] = await eventsCollection.find(query, options)
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

export async function getEventInfo(id: string): Promise<eventInfo> {
  try {
    const database = client.db("upcomingevents");
    const eventCollection = database.collection("events");
    const query = {
      _id: new ObjectId(id)
    };
    const eventInfo: eventInfo = await eventCollection.findOne(query)

    return eventInfo
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export async function deleteEvent(id: string): Promise<void> {
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

export async function updateEvent(id: string, info: eventInfo, posterPath: string | null): Promise<void> {
  try {
    const database = client.db("upcomingevents");
    const eventCollection = database.collection("events");
    // create a filter for a movie to update
    const filter = {
      _id: new ObjectId(id)
    };
    // create a document that sets the plot of the movie
    let updateDoc: AnyObject = {}
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

export async function addNewEvent(info: eventInfo, posterPath: string | null): Promise<void> {
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

export async function fetchAlbums(): Promise<albumInfo[]> {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    const albums: albumInfo[] = await albumsCollection.find().sort({
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

export async function updateAlbum(id: string, info: albumInfo, coverImagePath: string | null): Promise<void> {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    // create a filter for a movie to update
    const filter = {
      _id: new ObjectId(id)
    };
    // create a document that sets the plot of the movie
    let updateDoc: AnyObject = {}
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
    // console.log(updateDoc)
    // console.log(updateDoc)
    const action = await albumsCollection.updateOne(filter, updateDoc);
    // console.log(result)
  } finally {
    // await client.close();
  }
}

export async function getAlbumInfo(id: string): Promise<albumInfo> {
  try {
    const database = client.db("media");
    const albumsCollection = database.collection("albums");
    const query = {
      _id: new ObjectId(id)
    };
    const albumInfo: albumInfo = await albumsCollection.findOne(query)

    return albumInfo
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export async function addNewAlbum(info: albumInfo, coverImagePath: string | null): Promise<void> {
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
  } finally {
    // await client.close();
  }
}

export async function deleteAlbum(id: string): Promise<void> {
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

export async function fetchResponses(eventId: string): Promise<object[]> {
  try {
    const database = client.db("form");
    const responsesCollection = database.collection("responses");
    const query = {
      eventId: new ObjectId(eventId)
    };
    const responses: AnyObject[] = await responsesCollection.find(query)
    let responsesJson = []
    for await (const doc of responses) {
      responsesJson.push(doc)
    }
    return responsesJson
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export async function getNumSignUps(eventId: string): Promise<number> {
  try {
    const database = client.db("form");
    const responsesCollection = database.collection("responses");
    const query = {
      eventId: new ObjectId(eventId)
    };

    let count: number = await responsesCollection.countDocuments(query)
    return count
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export async function fetchPosts(): Promise<postInfo[]> {
  try {
    const database = client.db("blog");
    const postsCollection = database.collection("posts");
    const posts = await postsCollection.find().sort({
      order: -1
    })
    let postsJson = []
    for await (const doc of posts) {
      postsJson.push(doc)
    }
    // console.log(postsJson)
    return postsJson
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export async function updatePost(id: string, info: postInfo, coverImagePath: string | null): Promise<void> {
  try {
    const database = client.db("blog");
    const postsCollection = database.collection("posts");
    // create a filter for a movie to update
    const filter = {
      _id: new ObjectId(id)
    };
    // create a document that sets the plot of the movie
    let updateDoc: AnyObject = {}
    if (coverImagePath != null) {
      updateDoc = {
        $set: {
          name: info["name"],
          date: info["date"],
          image: coverImagePath,
          caption: info["caption"],
          order: info["order"]
        },
      };
    } else {
      updateDoc = {
        $set: {
          name: info["name"],
          date: info["date"],
          caption: info["caption"],
          order: info["order"]
        },
      };
    }
    // console.log(updateDoc)
    const action = await postsCollection.updateOne(filter, updateDoc);
    console.log(action)

    // console.log(result)
  } finally {
    // await client.close();
  }
}

export async function getPostInfo(id: string): Promise<postInfo> {
  try {
    const database = client.db("blog");
    const postsCollection = database.collection("posts");
    const query = {
      _id: new ObjectId(id)
    };
    const postInfo: postInfo = await postsCollection.findOne(query)

    return postInfo
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export async function addNewPost(info: postInfo, coverImagePath: string | null): Promise<void> {
  try {
    const database = client.db("blog");
    const postCollection = database.collection("posts");
    const updateDoc = {
      name: info["name"],
      date: info["date"],
      caption: info["caption"],
      image: coverImagePath,
      order: info["order"]
    };
    const action = await postCollection.insertOne(updateDoc);
    // console.log(result)
  } finally {
    // await client.close();
  }
}

export async function updateSchedule(id: string, info: scheduleInfo, coverImagePath: string | null): Promise<void> {
  try {
    const database = client.db("schedule");
    const scheduleCollection = database.collection("file");
    let scheduleTime = info["scheduleTime"];
    // create a filter for a movie to update
    const filter = {
      _id: new ObjectId(id)
    };
    // create a document that sets the plot of the movie
    let updateDoc: AnyObject = {}
    if (coverImagePath != null) {
      updateDoc = {
        $set: {
          image: coverImagePath,
          scheduleTime: scheduleTime
        },
      };
    } else {
      updateDoc = {
        $set: {
          scheduleTime: scheduleTime
        },
      };
    }

    // console.log(updateDoc)
    const action = await scheduleCollection.updateOne(filter, updateDoc);

    // console.log(result)
  } finally {
    // await client.close();
  }
}

export async function getScheduleInfo(): Promise<scheduleInfo> {
  try {
    const database = client.db("schedule");
    const scheduleCollection = database.collection("file");
    const query = {
      _id: new ObjectId("6474717f3ca184eb978e3e61")
    };
    const scheduleInfo: scheduleInfo = await scheduleCollection.findOne(query)

    return scheduleInfo
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}