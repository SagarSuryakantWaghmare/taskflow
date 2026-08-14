import axios from "axios";

const DEFAULT_API = "http://localhost:8000/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API,
});

export default api;
