import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Khan", email: "ali@example.com", role: "user" },
    { id: 2, name: "Admin User", email: "admin@example.com", role: "admin" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  // Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      id: Date.now(),
      name: form.name.value,
      email: form.email.value,
      role: form.role.value,
    };
    setUsers([...users, newUser]);
    setIsAddOpen(false);
  };

  // Edit User
  const handleEditUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedUser = {
      ...currentUser,
      name: form.name.value,
      email: form.email.value,
      role: form.role.value,
    };
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setIsEditOpen(false);
  };

  // Delete User
  const handleDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== currentUser.id));
    setIsDeleteOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <button
        onClick={() => setIsAddOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        ➕ Add User
      </button>

      {/* Users Table */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => {
                    setCurrentUser(u);
                    setIsEditOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => {
                    setCurrentUser(u);
                    setIsDeleteOpen(true);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleAddUser}
            className="bg-white p-6 rounded shadow w-96"
          >
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <input
              name="name"
              placeholder="Name"
              className="w-full border p-2 mb-2"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-2"
              required
            />
            <select name="role" className="w-full border p-2 mb-2" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleEditUser}
            className="bg-white p-6 rounded shadow w-96"
          >
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              name="name"
              defaultValue={currentUser.name}
              className="w-full border p-2 mb-2"
              required
            />
            <input
              name="email"
              type="email"
              defaultValue={currentUser.email}
              className="w-full border p-2 mb-2"
              required
            />
            <select
              name="role"
              defaultValue={currentUser.role}
              className="w-full border p-2 mb-2"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirm Delete
            </h2>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{currentUser.name}</span>?
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

