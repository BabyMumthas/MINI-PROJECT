import React from 'react';

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <input value={newName} onChange={handleNameChange} placeholder="Name" />
      </div>
      <div>
        <input value={newNumber} onChange={handleNumberChange} placeholder="Phone number" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default PersonForm;
