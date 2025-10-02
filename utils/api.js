import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // apne backend ka port

// ✅ Users ke liye already hoga
export const fetchUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};

// ✅ Ads ke liye
export const fetchAds = async () => {
  const res = await axios.get(`${API_BASE}/ads`);
  return res.data;
};

// ✅ Tasks ke liye
export const fetchTasks = async () => {
  const res = await axios.get(`${API_BASE}/tasks`);
  return res.data;
};

export const updateTask = async (taskId, updatedData) => {
  const res = await axios.put(`${API_BASE}/tasks/${taskId}`, updatedData);
  return res.data;
};

