// api/index.js
console.log("✅ Script started..."); // Checkpoint 1

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai');
const fs = require('fs');

// Setup
const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });
console.log("✅ Express, CORS, and Multer setup complete."); // Checkpoint 2

// SECURELY get the API key from an environment variable
const apiKey = process.env.OPENAI_API_KEY;
console.log("🔑 Checking for OpenAI API Key...");
if (!apiKey) {
  console.error("❌ ERROR: OPENAI_API_KEY environment variable not set.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey });
console.log("✅ OpenAI client initialized."); // Checkpoint 4

// This is our main API endpoint
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioFilePath = req.file.path;
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: 'whisper-1',
    });

    const transcriptText = transcription.text;
    
    // CORRECTED: The entire prompt string must be wrapped in backticks (`)
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
console.log("✅ API endpoint configured."); // Checkpoint 5

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  // CORRECTED: The log message must be wrapped in backticks (`)
  console.log(`🚀 Server is running on port ${PORT}`); // Final Success Message
});