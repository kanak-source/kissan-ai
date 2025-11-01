require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// LLM API Endpoint
app.post("/api/ask-llm", async (req, res) => {
  try {
    const { question, language } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Kisaan AI, an agriculture expert assistant. You answer in the user's language." },
        { role: "user", content: question }
      ]
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "LLM request failed" });
  }
});

app.listen(5000, () => console.log("✅ Kisaan AI Backend running on http://localhost:5000"));
