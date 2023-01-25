import axios from "axios";
const instance = axios.create({
  baseURL: "auth-app-phi.vercel.app",
});

export default instance;
