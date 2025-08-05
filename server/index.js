const express = require('express');
const path = require('path');

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
app.post('/submit-form', (req, res) => {
    const { textInput, numberSelect } = req.body;
    console.log('Received data from form:');
    console.log('Text Input:', textInput);
    console.log('Number Select:', numberSelect);

    res.json({ message: 'Data received successfully!', receivedData: req.body });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
