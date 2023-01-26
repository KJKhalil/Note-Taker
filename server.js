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

// Gets the html's and the data(the notes) that are saved.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    res.json(data);
});

// Creates a new note.

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let highestId = 99;
    for (let i = 0; i < data.length; i++) {
        let createdNote = data[i];
        if (createdNote.id > highestId) {            
            highestId = createdNote.id;
        }
    }

    newNote.id = highestId + 1;

    data.push(newNote)

    fs.writeFile (path.join(__dirname, './db/db.json'), JSON.stringify(data));

    res.json(newNote);
});

// Deletes a note.

app.delete('/api/notes/:id', (req, res) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
            data.splice(i, 1);
            break;
        }
    }

    fs.writeFile (path.join(__dirname, './db/db.json'), JSON.stringify(data));

    res.json(data);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Sets the app up.
app.listen(PORT, () => {
    console.log('App on' + PORT);
});