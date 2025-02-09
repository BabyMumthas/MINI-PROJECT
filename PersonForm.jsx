import PropTypes from "prop-types";

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

PersonForm.propTypes = {
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PersonForm;
