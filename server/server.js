//Importing necessary modules
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//Initializing the express app
const app = express()

//Enable CORS
app.use(cors())

//Middleware enables server to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//loading environment variables from .env file
require("dotenv").config();

// Setting the "strictQuery" option to true for better error handling
mongoose.set("strictQuery", true)

// Connecting to MongoDB database using the MONGODB_SECRET_VARIABLE environment variable
mongoose.connect(process.env.MONGODB_SECRET_VARIABLE)
.then(() => console.log("connected to MongoDB"))
.catch(() => console.log("Error connecting MongoDb"))

// Defining the user schema for MongoDB
const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  releaseDate: {type: String, required: true},
})

//Creating a mongoose model for the item schema
const Item = mongoose.model("Item", itemSchema)

//Setting up a route for the server to handle POST requests to "/api/items"
app.post("/Inventory_Application/addItem/post", async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.itemName,
      description: req.body.itemDescription,
      price: req.body.itemPrice,
      category: req.body.itemCategory,
      releaseDate: req.body.releaseDate,
    });
    const savedItem = await newItem.save();
    res.redirect("/")
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Setting up a route for the server to handle GET requests to "/api"
app.get("/api", (req,res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]})
})

// Starting the server and listening for incoming requests on port 5000
app.listen(5000, () => console.log("server started on port 5000"))