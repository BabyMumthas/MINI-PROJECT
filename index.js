/* eslint-disable no-undef */
const express = require('express');

const morgan = require('morgan');


const app = express();
app.use(express.json());
app.use(morgan('tiny'));

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];

// ✅ New route for `/`
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Phonebook API</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
