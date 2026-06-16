import api from "./api";

export const registerUser = (userData) => {
  return api.post("/users/register", userData);
};
