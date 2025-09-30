import { useEffect, useState } from "react";
import { fetchAds } from "../../utils/api";
import Navbar from "../../components/Navbar";

export default function AdsPage() {
  const [ads, setAds] = useState([]);
  useEffect(() => { fetchAds().then(setAds); }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Sponsored Ads</h1>
        {ads.map((ad) => (
          <div key={ad._id} className="border p-3 mb-3">
            <h2 className="font-semibold">{ad.title}</h2>
            {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} className="w-64 my-2" />}
            <p>Reward: Rs {ad.reward}</p>
          </div>
        ))}
      </div>
    </>
  );
}
