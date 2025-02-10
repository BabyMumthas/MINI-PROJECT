// eslint-disable-next-line no-undef
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// GET all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// GET single person by ID
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

// DELETE a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const index = persons.findIndex(person => person.id === id);

  if (index !== -1) {
    persons.splice(index, 1); // Remove the person from the array
    res.status(204).end(); // Respond with "No Content" status
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

// Info Route
app.get('/info', (req, res) => {
  const count = persons.length;
  const currentTime = new Date();

  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${currentTime}</p>
  `);
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
