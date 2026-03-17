import axios, { type AxiosInstance } from "axios";

const apiElo: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_ELO_URL,
  headers: { "Content-Type": "application/json" },
});

export default apiElo;
