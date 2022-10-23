import axios from "axios";

export let Axios = axios.create({
  withCredentials: true
});

export function backendUrl(path) {
  const BACKEND_HOST = process.env.NEXT_PUBLIC_BACKEND_PATH;
  return BACKEND_HOST + path;
}

export function setAxiosBearerToken(token) {
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
}
