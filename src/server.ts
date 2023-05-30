//jshint esversion:6
import { user } from "./models/user";
import { profile } from "./models/profile"
import router from  "./routes/routes"
import authRouter from "./routes/authRouter"

require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const path = require("path")


app.use(express.static(path.join(__dirname, '/public')))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", authRouter)
app.use("/", router)

const PORT = process.env.PORT || 3000
app.listen(PORT, function () { })
// console.log("hello")