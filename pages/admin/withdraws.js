import { useEffect, useState } from "react";

export default function WithdrawsPage() {
  const [requests, setRequests] = useState([]);

  const load = async () => {
    const res = await fetch("/api/wallet/requests", {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    });
    setRequests(await res.json());
  };

  useEffect(() => { load(); }, []);

  const approve = async (id) => {
    await fetch(`/api/wallet/requests/${id}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    });
    load();
  };

  const reject = async (id) => {
    await fetch(`/api/wallet/requests/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      body: JSON.stringify({ note: "Rejected by admin" })
    });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Withdraw Requests</h1>
      {requests.map(r => (
        <div key={r._id} className="border p-3 mb-2">
          <div><b>{r.userId?.name}</b> — {r.amount} — {r.method} — {r.status}</div>
          {r.status === "pending" && (
            <div className="mt-2">
              <button onClick={() => approve(r._id)} className="bg-green-600 text-white px-3 py-1 mr-2">Approve</button>
              <button onClick={() => reject(r._id)} className="bg-red-600 text-white px-3 py-1">Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
