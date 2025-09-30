import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">🚀 Kissan App</div>
      <ul className="flex space-x-6">
        {/* User Links */}
        <li>
          <Link href="/user/tasks" className="hover:text-yellow-300">
            My Tasks
          </Link>
        </li>
        <li>
          <Link href="/user/earnings" className="hover:text-yellow-300">
            My Earnings
          </Link>
        </li>

        {/* Admin Links */}
        <li>
          <Link href="/admin/users" className="hover:text-green-300">
            Manage Users
          </Link>
        </li>
        <li>
          <Link href="/admin/tasks" className="hover:text-green-300">
            Manage Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
}
