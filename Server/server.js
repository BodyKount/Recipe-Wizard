const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = 3001;

//Enables CORS for all routes
app.use(cors());

app.get("/recipeSteam", (req, res) => { 
    const ingredients = req.query.ingredients;
    const mealType = req.query.mealType;
    const cuisine = req.query.cuisine;
    const cookingTime = req.query.cookingTime;
    const complexity = req.query.complexity;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendEvent = (chunk) => {
        let chunkResponse;
        if (chunk.choices[0].finish_reason === "stop") {
            res.write(`data: ${JSON.stringify({ action: "close"})}\n\n`);
        } else {
            if (
                chunk.choices[0].delta.role &&
                chunk.choices[0].delta.role === "assistant"
            ) {
                chunkResponse = {
                    action: "start",
                };
            } else {
                chunkResponse = {
                    action: "chunk",
                    chunk: chunk.choices[0].delta.content,
                };
            }
            res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`)
        }
    }


});

async function fetchOpenAICompletionsStream(messages, callback) {
    // When we have an OPENAI API key we need to edit it in here. 
    const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";
    const  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const aiModel = "gpt-4-1106-preview";

    try{
        openai.chat.completions.create({
            model: aiModel,
            messages: messages,
            stream: true,            
        })
        
        for await (const chunk of completion) {
            callback(chunk);
        }

    } catch (error) {
        console.error("Error fetching OpenAI completions:", error);
    }

}

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${port}`);
});