"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "mutaiba@gmail.com" && password === "mutaiba") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
