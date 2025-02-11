import express from 'express';
// import type { Request, Response } from 'express';
import { Dish } from '../../models/index.js';

// Extend the Request interface to include the user object

const router = express.Router();

router.post('/', async (req, res): Promise<void> => {
  const { recipe } = req.body;
  const userId = req.body.userId;
  console.log(userId);
  try {
    const newDish = await Dish.create({ userId, recipe });
    res.status(201).json(newDish);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Get all dishes
router.get('/', async (_req, res): Promise<void> => {
  try {
    const dishes = await Dish.findAll();
    res.json(dishes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as dishRouter };