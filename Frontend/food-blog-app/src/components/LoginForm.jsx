import React, { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isSignUp ? "signUp" : "login";

    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, {
        email,
        password,
      });

      if (!res.data?.token || !res.data?.user) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLoginSuccess()
      setIsOpen(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to login. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="rounded-t-2xl bg-[#BBCB64] px-6 py-5 text-center">
        <h2 className="text-xl font-extrabold text-white tracking-wide">
          Welcome Back
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-6 py-6 text-stone-800 space-y-5"
      >
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-800" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-stone-300 pl-10 pr-4 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-800" />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-stone-300 pl-10 pr-4 py-2 focus:ring-1 focus:ring-black focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F79A19] py-2.5 font-bold text-stone-800 shadow-md hover:bg-[#FFE52A] transition"
        >
          <FaSignInAlt />
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        {error && <h6 className="text-red-600 text-sm">{error}</h6>}
      </form>

      <div className="rounded-b-2xl bg-[#BBCB64]/30 py-3 text-center text-sm">
        {isSignUp ? "Already have an account? " : "Don’t have an account? "}
        <span
          className="cursor-pointer font-semibold text-[#F79A19] hover:underline"
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp ? "Login" : "Sign Up"}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
