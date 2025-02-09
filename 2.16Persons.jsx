import PropTypes from "prop-types";

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Persons;
