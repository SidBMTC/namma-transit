import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/api/users/register", userData);
  return response.data;
};
