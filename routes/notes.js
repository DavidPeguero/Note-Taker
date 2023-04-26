const note = require('express').Router();
const { json } = require('express');
const { readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');


note.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

note.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    readFromFile('./db/db.json').then((data) => {
        const notes = JSON.parse(data);
        let id = notes.length + 1;

        if (req.body) {
            const newNote = {
                id,
                title,
                text
            };
    
            readAndAppend(newNote, './db/db.json');
            res.json(`Note added successfully 🚀`);
        } else {
            res.error('Error in adding Note');
        }
    });
    
});


note.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    readFromFile('./db/db.json').then((data) => {
        const newData = JSON.parse(data);
        console.log(newData)
        const results = newData.filter((note) => {
            console.log(note.id)
            return note.id !== id
        });
        console.log(results)
        writeToFile('./db/db.json', JSON.stringify(newData));
    })
});


module.exports = note;