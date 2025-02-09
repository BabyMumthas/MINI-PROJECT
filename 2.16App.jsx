import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ message: null, type: "" });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService.update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id !== existingPerson.id ? p : returnedPerson)));
            showNotification(`Updated ${newName}`, "success");
          })
          .catch(() => {
            showNotification(`Error: ${newName} was already deleted from the server`, "error");
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personService.create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        showNotification(`Added ${newName}`, "success");
      })
      .catch(() => showNotification(`Error: Could not add ${newName}`, "error"));

    setNewName("");
    setNewNumber("");
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          showNotification(`Deleted ${name}`, "success");
        })
        .catch(() => showNotification(`Error: ${name} was already deleted`, "error"));
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: "" }), 3000);
  };

  const filteredPersons = persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} newNumber={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
        handleSubmit={handleAddPerson} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
