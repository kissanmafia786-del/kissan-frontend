import { useEffect, useState } from "react";
import AdminLayout from "./layout";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAdd = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, reward }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
    setReward("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-4">Manage Tasks</h1>
      <div className="mb-4">
        <input
          placeholder="Task Title"
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Reward"
          className="border p-2 mr-2"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2">
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 mb-2 flex justify-between">
            <span>{task.title} - Reward: {task.reward}</span>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-600 text-white px-3 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
}

