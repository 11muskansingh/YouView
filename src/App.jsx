import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";

import Login from "./components/Signup/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          {/* Redirect from root to signup */}
          <Route path="/" element={<Navigate to="/signup" />} />
          {/* Signup and Login routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <div className="flex flex-col h-full"> */}
          {/* Main application routes */}
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          {/* </div> */}
        </Routes>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
