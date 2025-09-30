// utils/auth.js

export function getUserRole() {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user).role; // backend se role aa raha hai
    }
  }
  return null;
}

export function isAuthenticated() {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token");
  }
  return false;
}

