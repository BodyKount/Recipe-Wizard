const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import recipeRoutes from './routes/recipeRoutes.js';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//app.use(cors());
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

// Middleware
app.use(express.json());
app.use(routes);
app.use(cors());

//Routes
app.use("/api/recipes", recipeRoutes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
