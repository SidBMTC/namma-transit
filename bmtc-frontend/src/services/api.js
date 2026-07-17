import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5176",
});

export default api;
