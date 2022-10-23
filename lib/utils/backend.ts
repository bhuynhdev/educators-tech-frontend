import axios from "axios";

export let Axios = axios.create({
  withCredentials: true
});

export function backendUrl(path) {
  const BACKEND_HOST = "http://localhost:3000/api/";
  return BACKEND_HOST + path;
}

export function setAxiosBearerToken(token) {
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
}
