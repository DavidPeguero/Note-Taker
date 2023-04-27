//Import express
const express = require('express')
const notesRouter = require('./notes')

//Create app with express
const app = express();

//Route to notes router
app.use('/notes', notesRouter)

module.exports = app;