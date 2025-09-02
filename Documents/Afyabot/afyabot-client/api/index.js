// api/index.js
console.log("✅ AfyaBot API Script started...");

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config(); // This line loads your .env file

// Setup
const app = express();
app.use(cors());
app.use(express.json());
console.log("✅ Express and CORS setup complete.");

// Initialize OpenAI Client SECURELY
// This now reads the key from your .env file instead of from the code
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});
console.log("✅ OpenAI client initialized.");

// This is our main API endpoint for sentiment analysis
app.post('/api/analyze-sentiment', async (req, res) => {
  try {
    const { journalEntry } = req.body;

    if (!journalEntry) {
      return res.status(400).json({ error: 'Journal entry is required.' });
    }

    const prompt = `Analyze the sentiment of the following journal entry from a user in Kenya. Classify it as "Positive", "Negative", or "Neutral". Also, provide a brief, encouraging one-sentence summary. Respond ONLY with a valid JSON object with two keys: "sentiment" and "summary". Journal Entry: "${journalEntry}"`;
    
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
    });

    const structuredContent = gptResponse.choices[0].message.content;
    res.json(JSON.parse(structuredContent));

  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).json({ error: 'Failed to analyze sentiment.' });
  }
});

// Start the server
const PORT = 5002;
app.listen(PORT, () => {
  console.log(`🚀 AfyaBot API server is running on port ${PORT}`);
});