require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API; 
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function generateResponse(req, res) {
  const { message } = req.body;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(message);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
}

module.exports = { generateResponse };
