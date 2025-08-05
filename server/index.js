const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, '../src')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'form.html'));
});

// New POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
    const { textInput, numberSelect } = req.body;
    console.log('Received data from form:');
    console.log('Text Input:', textInput);
    console.log('Number Select:', numberSelect);

    const webhookUrl = 'http://localhost:5678/webhook-test/6265d406-df3f-4ada-8ad5-c5a3f6d86ae0';

    try {
        const response = await axios.post(webhookUrl, req.body);
        console.log('Webhook response:', response.data);
        res.json({ message: 'Data received successfully and forwarded!', receivedData: req.body, webhookResponse: response.data });
    } catch (error) {
        console.error('Error forwarding data to webhook:', error.message);
        res.status(500).json({ message: 'Data received, but failed to forward to webhook.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
