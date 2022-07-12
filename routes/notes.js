const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const currentNotes = require('../db/db.json')

notes.get('/', (req, res) => {
    console.log(req.method)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.method);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title: title,
            text: text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    console.log(req.method)

    const deletedNoteId = req.params.id
    let updatedNotes = []

    if (deletedNoteId) {
        for (var i = 0; i < currentNotes.length; i++) {
            if (currentNotes[i].id !== deletedNoteId) {
                updatedNotes.push(currentNotes[i]);
            }
        }

        readAndDelete(updatedNotes, './db/db.json');
        res.json(`Note deleted successfully 🚀`);
    }
});


module.exports = notes;