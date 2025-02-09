import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/recipes", recipeRoutes);

app.post('/api/recipes/generate', (req, res) => {
  try {
    // ...existing code for generating recipes...
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
