
import axios from 'axios';

const BASE_URL ='https://60a21a08745cd70017576014.mockapi.io/api/v1';

// GET all todos
export const getTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todo`);
  return response.data;
};

// POST a new todo
export const addTodo = async (todo) => {
  const response = await axios.post(`${BASE_URL}/todo`, todo);
  return response.data;
};

// PUT (update) a todo by ID
export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${BASE_URL}/todo/${id}`, todo);
  return response.data;
};

// DELETE a todo by ID
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/todo/${id}`);
  return response.data;
};

CLERK_API_KEY="pk_test_Z3VpZGluZy1tb2xseS0zMi5jbGVyay5hY2NvdW50cy5kZXYk"