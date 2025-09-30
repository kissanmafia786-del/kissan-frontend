import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    admins: 0,
  });

  useEffect(() => {
    // Backend API call for stats
    axios
      .get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const chartData = {
    labels: ["Total Users", "Active Users", "Admins"],
    datasets: [
      {
        label: "Users Overview",
        data: [stats.totalUsers, stats.activeUsers, stats.admins],
        backgroundColor: ["#3b82f6", "#22c55e", "#f97316"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg">Active Users</h2>
          <p className="text-3xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg">Admins</h2>
          <p className="text-3xl font-bold">{stats.admins}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <Bar data={chartData} />
      </div>
    </div>
  );
}
