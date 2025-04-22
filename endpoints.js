import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://knowvaapi.onrender.com/api",
});

// Articles

export function getUsers() {
  return apiClient.get(`/users`).then(({ data }) => {
    return data.users;
  });
}
