import express from 'express';
import type { Request, Response } from 'express';
import { Dish } from '../../models/index.js';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId, dishName} = req.body;
  try {
    const newDish = await Dish.create({ userId, dishName});
    res.status(201).json(newDish);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// get all dishes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const dishes = await Dish.findAll();
    res.json(dishes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as dishRouter };