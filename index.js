require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'baby mumthas', number: '39-23-6423122' },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${persons.length} people.<br/>${new Date()}`;
  res.send(info);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // Validation: Check if name and number exist
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Name and number are required!" });
  }

  // Check if name already exists
  if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 10000), // Generate random ID
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

const generateId = () => Math.floor(Math.random() * 10000);

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }
  if (persons.some(p => p.name === name)) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    id: generateId(),
    name,
    number,
  };
  persons.push(newPerson);
  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
