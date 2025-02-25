import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons"; // ✅ Correct URL

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

export default { getAll, create };
