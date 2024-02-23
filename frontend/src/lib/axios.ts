import axios from "axios";

const todoInstance = axios.create({
  baseURL: "http://localhost:3100/v1/todos",
});

export { todoInstance };
