import express from "express";
import { generateRecipe } from "../controllers/recipeContoller.js";

const router = express.Router();

// Route to generate a recipe
router.post("/generate", generateRecipe);

export default router;
