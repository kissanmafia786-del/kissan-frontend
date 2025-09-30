import { useEffect, useState } from "react";
import AdminLayout from "./layout";

export default function AdminAds() {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/ads")
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, []);

  const handleAdd = async () => {
    const res = await fetch("http://localhost:5000/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, link }),
    });
    const newAd = await res.json();
    setAds([...ads, newAd]);
    setTitle("");
    setLink("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/ads/${id}`, { method: "DELETE" });
    setAds(ads.filter((ad) => ad._id !== id));
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-4">Manage Ads</h1>
      <div className="mb-4">
        <input
          placeholder="Ad Title"
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Ad Link"
          className="border p-2 mr-2"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2">
          Add
        </button>
      </div>
      <ul>
        {ads.map((ad) => (
          <li key={ad._id} className="border p-2 mb-2 flex justify-between">
            <span>{ad.title} - {ad.link}</span>
            <button
              onClick={() => handleDelete(ad._id)}
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

