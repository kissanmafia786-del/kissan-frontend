import { useState, useEffect } from "react";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("replace_with_real_userId"); // 🔹 baad me JWT se lena hoga

  // Fetch Balance
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/wallet/${userId}`)
      .then((res) => res.json())
      .then((data) => setBalance(data.balance || 0));
  }, [userId]);

  // Add Balance (Test Purpose Only)
  const addBalance = async () => {
    const res = await fetch(`/api/wallet/add/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });
    const data = await res.json();
    setBalance(data.balance);
    setAmount("");
  };

  // Withdraw Balance
  const withdrawBalance = async () => {
    const res = await fetch(`/api/wallet/withdraw/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });
    const data = await res.json();
    if (data.balance !== undefined) {
      setBalance(data.balance);
    }
    setAmount("");
    alert(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>💰 Wallet</h1>
      <h2>Current Balance: {balance}</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={addBalance} style={{ marginRight: "10px" }}>
          ➕ Add Balance
        </button>
        <button onClick={withdrawBalance}>⬇ Withdraw</button>
      </div>
    </div>
  );
}

