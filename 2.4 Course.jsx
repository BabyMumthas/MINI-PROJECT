/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Part from "./Part";

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <b>
        total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
      </b>
    </div>
  );
};

export default Course;
