import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://knowvaapi.onrender.com/api",
});

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
  return apiClient.get(`/users/${username}/messages`).then(({ data }) => {
    return data.messages;
  });
}
export function getScores() {
  return apiClient.get(`/scoreboard`).then(({ data }) => {
    return data.scoreboard;
  });
}
export function getGames() {
  return apiClient.get(`/games`).then(({ data }) => {
    return data.games;
  });
}
export function getCards() {
  return apiClient.get(`/cards`).then(({ data }) => {
    return data.cards;
  });
}

export function getStudyGroups() {
  return apiClient.get(`/study_groups`).then(({ data }) => {
    return data.study_groups;
  });
}
export function getSubjects() {
  return apiClient.get(`/subjects`).then(({ data }) => {
    return data.subjects;
  });

}
