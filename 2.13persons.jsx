import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

// Function to get all persons
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

// Function to create a new person
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

// Export the functions
export default { getAll, create };
