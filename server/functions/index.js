const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");
const express = require("express");
const app = express();

// Body parser for our JSON data

app.use(express.json());

// cross orgin
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// Firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// api endpoints
app.get("/", (req, res) => {
  return res.send("hello world");
});

const userRoute = require("./routes/users");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

// app.listen(1551, () => {
//   console.log("server started at 1551");
// });

exports.app = functions.https.onRequest(app);
