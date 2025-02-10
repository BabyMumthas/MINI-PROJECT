// eslint-disable-next-line no-undef
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample data
const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];


app.get('/api/persons', (req, res) => {
  res.json(persons);
});


app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = persons.findIndex(person => person.id === id);

  if (index !== -1) {
    persons.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Person not found" });
  }
});


app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' });
  }

  const nameExists = persons.some(person => person.name === name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000), // Generate a random ID
    name,
    number
  };

  persons.push(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
