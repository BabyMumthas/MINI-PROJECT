/* eslint-disable no-unused-vars */
import React from 'react';
import Course from './components/Course';

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <h1>Course Information</h1>
      <Course course={course} />
    </div>
  );
};

export default App;
