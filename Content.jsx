/* eslint-disable react/prop-types */
import Part from "./Part";

// eslint-disable-next-line react/prop-types
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
