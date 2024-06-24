import axios from "axios";

const apiUrl = "http://localhost:3000/api";

export const getAllTodos = async () => {
  const response = await axios.get(`${apiUrl}/todos`);
  return response.data;
};

export const createTodo = async (text) => {
  const response = await axios.post(`${apiUrl}/todos`, { text });
  return response.data;
};

export const updateTodo = async (id, completed) => {
  const response = await axios.put(`${apiUrl}/todos/${id}`, { completed });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${apiUrl}/todos/${id}`);
};
