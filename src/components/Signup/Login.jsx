import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/contextApi";

const Login = () => {
  const { loginUsername, loginSetUsername, loginPassword, loginSetPassword } =
    useContext(Context);
  const navigate = useNavigate();

  // console.log(username);
  // console.log(password);
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/users/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("authToken", token);
        navigate("/feed");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            value={loginUsername}
            onChange={(e) => loginSetUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => loginSetPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 mb-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
