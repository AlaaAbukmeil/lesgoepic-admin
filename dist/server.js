"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes/routes"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/", authRouter_1.default);
app.use("/", routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () { });
// console.log("hello")
