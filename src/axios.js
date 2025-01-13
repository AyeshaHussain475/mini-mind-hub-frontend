import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000/mini/";

const instance = axios.create({
  baseURL,
});

const token = localStorage.getItem("token");

if (token) {
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default instance;
