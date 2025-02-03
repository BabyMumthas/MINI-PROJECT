import React from 'react';

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      <input 
        value={filterValue}
        onChange={handleFilterChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default Filter;
