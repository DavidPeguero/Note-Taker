const note = require('express').Router();
const { json } = require('express');
const { readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

note.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

note.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            id : uuid(),
            title,
            text
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }
    
});


note.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    readFromFile('./db/db.json').then((data) => {
        const newData = JSON.parse(data);
        console.log(newData)
        //If it doesn't match the id in body delete
        const results = newData.filter((note) => {
            console.log(note.id)
            return note.id !== id
        });
        //Log the results
        writeToFile('./db/db.json', results);
        res.json(`Successully deleted Note of ${id}`)
    })
});


module.exports = note;