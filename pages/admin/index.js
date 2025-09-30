import { useEffect, useState } from "react";
import AdminLayout from "./layout";

export default function AdminDashboard() {
  const [ads, setAds] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch ads
    fetch("http://localhost:5000/api/ads")
      .then((res) => res.json())
      .then((data) => setAds(data));

    // Fetch tasks
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Ads</h2>
          <p className="text-3xl">{ads.length}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl">{tasks.length}</p>
        </div>
      </div>

      {/* Quick overview */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Latest Ads</h2>
          <ul>
            {ads.slice(0, 5).map((ad) => (
              <li key={ad._id} className="border-b py-2">
                {ad.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Latest Tasks</h2>
          <ul>
            {tasks.slice(0, 5).map((task) => (
              <li key={task._id} className="border-b py-2">
                {task.title} - Reward: {task.reward}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
