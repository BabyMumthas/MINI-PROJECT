import { useState, useEffect } from "react";
import personsService from "./services/persons";  // ✅ Ensure lowercase
import Filter from "./components/Filter.jsx";    // ✅ Add .jsx
import Persons from "./components/Persons.jsx";  // ✅ Add .jsx
import PersonForm from "./components/PersonForm.jsx"; // ✅ Add .jsx

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch persons from backend when the app loads
  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  // Add a new contact
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    // Check if name already exists
    if (persons.some((p) => p.name === newName)) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }

    // Save to backend
    personsService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));  // Update state
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
