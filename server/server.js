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
  condition: {type: String, required: true}
})

//Creating a mongoose model for the item schema
const Item = mongoose.model("Item", itemSchema)

// Defining category schema for MongoDB
const categorySchema = new mongoose.Schema({
  category: {type: String, required: true}
})

const Category = mongoose.model("Category", categorySchema)


//Setting up a route for the server to handle POST requests to "/api/items"
app.post("/Inventory_Application/addItem/post", async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.itemName,
      description: req.body.itemDescription,
      condition: req.body.itemCondition,
      price: req.body.itemPrice,
      category: req.body.itemCategory,
      releaseDate: req.body.releaseDate,
    });
    const savedItem = await newItem.save();
    return res.status(201).json({ message: "Item created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Setting up a route for the server to handle POST requests to "/api/categories"
app.post("/Inventory_Application/addCategory", async (req, res) => {
  try {
    const newCategory = new Category({
      category: req.body.categoryName,
    });
    const savedCategory = await newCategory.save();
    return res.status(201).json({ message: "Category created successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }})

//setting up a route to handle item delete requests "/api/items/:id"
app.delete("/api/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.itemName,
        description: req.body.itemDescription,
        condition: req.body.itemCondition,
        price: req.body.itemPrice,
        category: req.body.itemCategory,
        releaseDate: req.body.releaseDate,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      return res.status(200).json({message: "Item updated successfully"})
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Setting up a route for the server to handle GET requests to "/api" for item data
app.get("/api", async (req,res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
})

// Setting up a route for the server to handle GET requests to "/api/categories" for category data
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Starting the server and listening for incoming requests on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
