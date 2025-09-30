import { useEffect, useState } from "react";
import { fetchTasks, updateTask } from "../../utils/api";

export default function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await fetchTasks();
    setTasks(data);
  }

  async function markComplete(task) {
    // Task ko complete karne ke liye backend update
    await updateTask(task._id, { ...task, status: "completed" });
    setCompletedTasks([...completedTasks, task]);
    loadTasks();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

      {/* Tasks List */}
      <ul>
        {tasks.length === 0 && <p>No tasks available</p>}
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border-b py-3 flex justify-between items-center"
          >
            <div>
              <strong>{task.title}</strong> - {task.description}
              <p className="text-sm text-gray-500">Reward: Rs {task.reward}</p>
            </div>
            <div>
              {task.status === "completed" ? (
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded">
                  Completed
                </span>
              ) : (
                <button
                  onClick={() => markComplete(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
