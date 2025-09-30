import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // token localStorage se lo
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // agar login nahi hai to login page bhej do
      return;
    }

    // token backend ko bhejo verify ke liye
    fetch("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          router.push("/login");
        } else {
          setUser(data);
        }
      })
      .catch(() => router.push("/login"));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Welcome to Dashboard</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}

