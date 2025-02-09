import PropTypes from "prop-types";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

// ✅ Define PropTypes to remove the ESLint warning
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
