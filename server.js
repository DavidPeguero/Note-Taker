//Imports
const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3000;

//Create app and add middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.use('/api', api);



app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Start listening on the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);