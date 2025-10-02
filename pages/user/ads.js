import { useEffect, useState } from "react";
import { fetchAds } from "../../utils/api";

export default function AdsPage() {
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAds();
    // infinite scroll listener
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (page > 1) loadAds();
  }, [page]);

  const loadAds = async () => {
    try {
      const newAds = await fetchAds(page);
      setAds((prev) => [...prev, ...newAds]);
    } catch (err) {
      console.error("Error loading ads", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Latest Ads</h1>
      <div className="grid gap-4">
        {ads.map((ad, i) => (
          <div key={i} className="bg-white shadow rounded p-4">
            <h2 className="font-semibold">{ad.title}</h2>
            <p>{ad.description}</p>
            {ad.image && (
              <img src={ad.image} alt="Ad" className="w-full mt-2 rounded" />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-gray-500 mt-4">Loading more ads...</p>
    </div>
  );
}

