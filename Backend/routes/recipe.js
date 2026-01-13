const express = require("express")
const {getRecipes, getRecipe, postRecipe, editRecipe, deleteRecipe, upload} = require("../controller/recipe") 
const verifyToken = require("../middleware/auth")

const router = express.Router()

router.get("/", getRecipes)  //get all the recipes  
router.get("/:id",getRecipe) //get recipe throught id:
router.post("/",verifyToken,upload.single("coverImage"),postRecipe);
router.put("/:id",upload.single("coverImage"),editRecipe);

router.delete("/:id", deleteRecipe) //delete recipe


module.exports=router