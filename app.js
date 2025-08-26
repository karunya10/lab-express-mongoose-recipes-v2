const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
app.post("/recipes", (request, response) => {
  Recipe.create({
    title: request.body.title,
    instructions: request.body.instructions,
    level: request.body.level,
    ingredients: request.body.ingredients,
    image: request.body.image,
    duration: request.body.duration,
    isArchived: request.body.isArchived,
    created: request.body.created,
  })
    .then((createdRecipe) => {
      console.log(createdRecipe);
      response.status(201).json(createdRecipe);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: "Failed to create Recipe" });
    });
});

//  Iteration 4 - Get All Recipes
app.get("/recipes", (request, response) => {
  Recipe.find({})
    .then((recipes) => {
      console.log("Retrieved Recipes ->", recipes);
      response.status(200).json(recipes);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      response.status(500).json({ error: "Failed to retrieve books" });
    });
});

//  Iteration 5 - Get a Single Recipe
app.get("/recipes/:recipeid", (request, response) => {
  const recipeId = request.params.recipeid;
  Recipe.findById(recipeId)
    .then((recipes) => {
      console.log("Retrieved Recipes ->", recipes);
      response.status(200).json(recipes);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      response.status(500).json({ error: "Failed to retrieve books" });
    });
});

//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:recipeid", (request, response) => {
  const recipeId = request.params.recipeid;
  Recipe.findByIdAndUpdate(recipeId, request.body, { new: true })
    .then((updatedRecipe) => {
      console.log(updatedRecipe);
      response.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: "Failed to update Recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
app.delete("/recipes/:recipeid", (request, response) => {
  const recipeId = request.params.recipeid;
  Recipe.findByIdAndDelete(recipeId)
    .then((result) => {
      response.status(200).send();
    })
    .catch((error) => {
      console.log(error);
      response.status(500).json({ error: "Failed to delete Recipe" });
    });
});

// Start the server
app.listen(3005, () => console.log("My first app listening on port 3005!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
