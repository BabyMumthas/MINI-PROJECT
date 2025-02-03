import React from 'react';
import Person from './Person';

const Persons = ({ persons, filterValue }) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
        .map(person => <Person key={person.name} person={person} />)}
    </div>
  );
};

export default Persons;
