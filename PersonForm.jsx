import PropTypes from "prop-types";

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label>
          Name: 
          <input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Number: 
          <input 
            value={newNumber} 
            onChange={(e) => setNewNumber(e.target.value)} 
          />
        </label>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

// ✅ Define PropTypes to avoid ESLint warning
PersonForm.propTypes = {
  addPerson: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  setNewName: PropTypes.func.isRequired,
  newNumber: PropTypes.string.isRequired,
  setNewNumber: PropTypes.func.isRequired,
};

export default PersonForm;
