const Recipes = require("../models/recipe");
const multer = require("multer");
const path = require("path");

/* =========================
   MULTER CONFIG (FIXED)
   ========================= */

// Storage with proper file extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .jpg .png etc
    const filename = Date.now() + "-" + file.fieldname + ext;
    cb(null, filename);
  },
});

// STRONGLY RECOMMENDED: File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// STRONGLY RECOMMENDED: Size limit (5MB)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/* =========================
   CONTROLLERS
   ========================= */

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
};

const postRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Required fields cannot be empty",
      });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients: JSON.parse(ingredients), // REQUIRED
      instructions,
      time,
      coverImage: req.file ? req.file.filename : null,
      createdBy: req.user?.id,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("POST RECIPE ERROR:", error);
    res.status(500).json({ message: "Failed to create recipe" });
  }
};

const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const updatedData = {
      title,
      instructions,
      time,
      ingredients: ingredients
        ? JSON.parse(ingredients)
        : recipe.ingredients,
      coverImage: req.file
        ? req.file.filename
        : recipe.coverImage,
    };

    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("EDIT RECIPE ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipes.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
};


module.exports = {
  getRecipes,
  getRecipe,
  postRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
