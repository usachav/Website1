require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// Importing generateText function from ai.js
const { generateText } = require("./ai.js");

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to handle preflight requests
app.options('/generateResponse', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'POST'); // Specify the allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Specify the allowed headers
    res.sendStatus(200); // Send HTTP OK status for preflight requests
});

// Middleware to set CORS headers for response
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    next();
});

// Route to generate response based on user input
app.post('/generateResponse', async (req, res) => {
    try {
        // Assuming ai.js exports generateText function correctly
        const userInput = req.body.prompt;
        console.log("userInput is,", req.body)
        const response = await generateText(userInput);
        res.json({ response });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));
