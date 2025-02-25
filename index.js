import 'dotenv/config'; // Load .env variables
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URI;

if (!mongoUrl) {
    console.error("❌ MONGO_URI is missing! Check your .env file.");
    process.exit(1); // Stop server if no DB URI
}

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
});

const Person = mongoose.model('Person', personSchema);

// Get all persons
app.get('/api/persons', async (req, res) => {
    try {
        const persons = await Person.find({});
        res.json(persons);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get a single person by ID
app.get('/api/persons/:id', async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (person) res.json(person);
        else res.status(404).json({ error: 'Person not found' });
    } catch (error) {
        next(error);
    }
});

// Add a new person
app.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body;
    if (!name || !number) {
        return res.status(400).json({ error: 'Name or number missing' });
    }

    try {
        const person = new Person({ name, number });
        const savedPerson = await person.save();
        res.json(savedPerson);
    } catch (error) {
        next(error);
    }
});

// Delete a person
app.delete('/api/persons/:id', async (req, res, next) => {
    try {
        await Person.findByIdAndRemove(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// Middleware for handling errors
const errorHandler = (error, req, res, next) => {
    console.error("❌ Error:", error.message);
    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Malformatted ID' });
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
