import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const login = (username, password) =>
  api.post('/auth/login', { username, password });

export const register = (username, password) =>
  api.post('/auth/register', { username, password });

export const getTasks = (token) =>
  api.get('/tasks', { headers: { Authorization: token } });

export const createTask = (task, token) =>
  api.post('/tasks', task, { headers: { Authorization: token } });

export const updateTask = (id, task, token) =>
  api.put(`/tasks/${id}`, task, { headers: { Authorization: token } });

export const deleteTask = (id, token) =>
  api.delete(`/tasks/${id}`, { headers: { Authorization: token } });