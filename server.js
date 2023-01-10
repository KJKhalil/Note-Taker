const PORT = process.env.PORT || 3001;

// Dependencies.

const express = require('express');
const fs = require('fs');
const path = require('path');
const data = require('.db/db.json');

// Sets app as express.

const app = express();

// Sets up the link to the public folder and sets up parsing.

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// Gets the html's and the data(the notes) saved.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    res.json(data);
});
