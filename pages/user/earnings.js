import { useEffect, useState } from "react";
import { fetchTasks } from "../../utils/api";

export default function EarningsPage() {
  const [tasks, setTasks] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await fetchTasks();
    setTasks(data);

    // Completed tasks ki total earning calculate
    const total = data
      .filter((task) => task.status === "completed")
      .reduce((sum, task) => sum + (task.reward || 0), 0);

    setEarnings(total);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Earnings</h1>

      <p className="text-xl mb-4">💰 Total Earnings: Rs {earnings}</p>

      <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
      <ul>
        {tasks
          .filter((task) => task.status === "completed")
          .map((task) => (
            <li key={task._id} className="border-b py-2">
              {task.title} - Rs {task.reward}
            </li>
          ))}
      </ul>
    </div>
  );
}
