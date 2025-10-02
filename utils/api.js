import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka port
});

// Existing
export const fetchUsers = async () => {
  const res = await API.get("/admin/users");
  return res.data;
};

// New: fetch ads
export const fetchAds = async (page = 1) => {
  const res = await API.get(`/ads?page=${page}`);
  return res.data;
};

// New: create ad (admin panel se)
export const createAd = async (adData) => {
  const res = await API.post("/ads", adData);
  return res.data;
};

export default API;

