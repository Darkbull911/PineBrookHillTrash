// This is a comment test
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for form submissions
const submissionSchema = new mongoose.Schema({
    fullName: String,
    address: String,
    contactInfo: String,
    phoneNumber: String
});
const Submission = mongoose.model('Submission', submissionSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submissions
app.post('/submit', (req, res) => {
    const newSubmission = new Submission(req.body);
    newSubmission.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Submission successful');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
