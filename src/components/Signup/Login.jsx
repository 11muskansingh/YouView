import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/contextApi";
import axiosInstance from "../../utils/AxiosInstance";

const Login = () => {
  const {
    loginUsername,
    loginSetUsername,
    loginPassword,
    loginSetPassword,
    avatar,
    setAvatar,
    profilePicture,
    setProfilePicture,
  } = useContext(Context);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log(username);
  // console.log(password);
  const handleLogin = (e) => {
    e.preventDefault();
    axiosInstance
      .post(
        "/users/login",
        {
          username: loginUsername,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        const response = res.data;
        setAvatar(response.data.avatar);
        setProfilePicture(response.data.coverImage);

        localStorage.setItem("avatar", response.data.avatar);
        localStorage.setItem("profilePicture", response.data.coverImage);

        console.log("avatar", response.data.avatar);
        console.log("profile", response.data.coverImage);
        navigate("/feed");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setError(
            err.response.data.message || "Username or Password is incorrect"
          );
        } else {
          setError("UserName or Password is incorrect");
        }
        console.error("Login error:", err);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

        {/* Guest Credentials Div - Below the Login title */}
        <div className="bg-gray-700 p-4 rounded-lg text-white mb-6">
          <p className="text-sm text-center">
            <strong>Guest Access:</strong> <br />
            Username: <span className="font-bold">guest_user</span> <br />
            Password: <span className="font-bold">guest_password</span>
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => loginSetUsername(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500 ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => loginSetPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500 ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
    </div>
  );
};

export default Login;
