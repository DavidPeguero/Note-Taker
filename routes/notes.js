const note = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


note.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

note.post('/', (req, res) => {
    // TODO: Logic for appending data to the db/db.json file
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }
});

module.exports = note;