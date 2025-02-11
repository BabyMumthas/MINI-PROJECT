/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Course = ({ course }) => {
  // Calculate total exercises using reduce
  const totalExercises = course.parts.reduce((sum, part) => {
    console.log("Current sum:", sum, "Current part:", part.exercises);
    return sum + part.exercises;
  }, 0);

  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map(part => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
      <strong>Total exercises: {totalExercises}</strong>
    </div>
  );
};

export default Course;
