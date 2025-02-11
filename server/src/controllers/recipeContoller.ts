import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import { Request, Response } from "express";

export const generateRecipe = async (req: Request, res: Response) => {
  try {
    const { ingredients, cuisine, time, difficulty } = req.body;

    if (!ingredients || !cuisine || !time || !difficulty) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `Generate a ${difficulty} level ${cuisine} recipe using the following ingredients: ${ingredients}. It should take around ${time} minutes to prepare. Provide step-by-step instructions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    const recipe = response.choices[0].message.content;
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate recipe" });
  }
  return;
};

