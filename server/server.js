//Importing necessary modules
const express = require("express")
const mongoose = require("mongoose")

//Initializing the express app
const app = express()

//loading environment variables from .env file
require("dotenv").config();

// Setting the "strictQuery" option to true for better error handling
mongoose.set("strictQuery", true)

// Connecting to MongoDB database using the MONGODB_SECRET_VARIABLE environment variable
mongoose.connect(process.env.MONGODB_SECRET_VARIABLE)
.then(() => console.log("connected to MongoDB"))
.catch(() => console.log("Error connecting MongoDb"))

// Defining the user schema for MongoDB
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  condition: {type: String, required: true},
  price: {type: Number, required: true}
})

// Setting up a route for the server to handle GET requests to "/api"
app.get("/api", (req,res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]})
})

// Starting the server and listening for incoming requests on port 5000
app.listen(5000, () => console.log("server started on port 5000"))