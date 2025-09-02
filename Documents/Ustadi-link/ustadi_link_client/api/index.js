// api/index.js - The Definitive Fix

const path = require('path');
// This line now explicitly tells dotenv where to find your .env file.
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const fs = require('fs');
const multer = require('multer');

// Check if the key was loaded successfully.
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ FATAL ERROR: OpenAI API key not found.");
    console.error("Please ensure you have a file named '.env' in your '/api' folder.");
    console.error("The file should contain one line: OPENAI_API_KEY=sk-...");
    process.exit(1); // Stop the server if the key is missing.
}

// Setup Express
const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Initialize OpenAI with the key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The rest of your API code remains the same...
app.post('/api/transcribe', async (req, res) => {
  try {
    const audioFilePath = req.file.path;
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: 'whisper-1',
    });
    const transcriptText = transcription.text;
    const prompt = `You are a curriculum designer. Take the following transcript from a Kenyan artisan and structure it into a 'Skill Module'. The module must have a 'title', a 'materials' array, and a 'steps' array of strings. The response must be in JSON format. Here is the transcript: "${transcriptText}"`;
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
    });
    const structuredContent = gptResponse.choices[0].message.content;
    fs.unlinkSync(audioFilePath);
    res.json(JSON.parse(structuredContent));
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).json({ error: 'Failed to process audio.' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 UstadiLink API server is running on port ${PORT}`);
});
