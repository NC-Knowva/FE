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
export function getUserByUsername(username) {
  return apiClient.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
}
export function getMessagesByUsername(username) {
  return apiClient.get(`/users/${username}/messages`).then(({data}) => {
    return data.messages
  })
}