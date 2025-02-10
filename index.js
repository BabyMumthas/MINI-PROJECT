// eslint-disable-next-line no-undef
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

let persons = [
  { id: 1, name: "Alice", number: "123-456" },
  { id: 2, name: "Bob", number: "987-654" },
  { id: 3, name: "Baby", number: "456-123" }
];

// Define the GET route for /api/persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// Define the POST route for /api/persons
app.post('/api/persons', (req, res) => {
  const person = req.body;
  person.id = Math.floor(Math.random() * 1000); // Generate random ID
  persons.push(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
