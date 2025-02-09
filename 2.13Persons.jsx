import PropTypes from "prop-types";

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  );
};

// ✅ Define PropTypes to remove the ESLint warning
Persons.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
};

export default Persons;
