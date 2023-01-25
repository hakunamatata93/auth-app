import axios from "axios";

const APP_URL = process.env.APP_URL || 'http://localhost:5000'
const instance = axios.create({
  baseURL: APP_URL,
});

export default instance;
