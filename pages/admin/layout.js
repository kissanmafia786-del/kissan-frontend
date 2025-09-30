import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login"); // Redirect if not logged in
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/ads">Manage Ads</Link>
          <Link href="/admin/tasks">Manage Tasks</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}

