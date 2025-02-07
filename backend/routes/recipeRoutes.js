import express from "express";
import { generateRecipe } from "../controllers/recipeController.js";

const router = express.Router();

// Route to generate a recipe
router.post("/generate", generateRecipe);

export default router;