import axios from "axios";

const baseUrl = "http://localhost:3001/persons"; // ✅ Check this URL

const getAll = () => axios.get(baseUrl).then(response => response.data);
const create = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data);
const remove = (id) => axios.delete(`${baseUrl}/${id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove };
