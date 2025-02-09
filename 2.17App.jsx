import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetch initial data
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  // Handle form submission
  const addPerson = event => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      // Update number if person already exists
      const updatedPerson = { ...existingPerson, number: newNumber };

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePerson(existingPerson.id, updatedPerson);
      }
    } else {
      // Add new person
      const personObject = { name: newName, number: newNumber };

      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNotification({ message: `Added ${newName}`, type: "success" });
        setTimeout(() => setNotification(null), 5000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  // Handle updating a person
  const updatePerson = (id, newObject) => {
    personService
      .update(id, newObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)));
        setNotification({ message: `Updated ${newObject.name}`, type: "success" });
        setTimeout(() => setNotification(null), 5000);
      })
      .catch(() => {
        setNotification({ message: `Information of ${newObject.name} has already been removed from the server`, type: "error" });
        setTimeout(() => setNotification(null), 5000);
        setPersons(persons.filter(person => person.id !== id));
      });
  };

  // Handle deleting a person
  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification({ message: `Deleted ${person.name}`, type: "success" });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(() => {
          setNotification({ message: `Information of ${person.name} has already been removed from the server`, type: "error" });
          setTimeout(() => setNotification(null), 5000);
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
