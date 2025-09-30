import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
