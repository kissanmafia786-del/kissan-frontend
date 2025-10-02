import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    API.get("/ads").then((res) => setAds(res.data.ads));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Home Page</h2>
      <ul>
        {ads.map((ad, index) => (
          <li key={index}>{ad}</li>
        ))}
      </ul>
    </div>
  );
}

