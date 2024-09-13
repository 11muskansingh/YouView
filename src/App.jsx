import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import Login from "./components/Signup/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";
import UploadVideo from "./components/UploadVideo.jsx";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <RouteHandler />
      </BrowserRouter>
    </AppContext>
  );
};

// Component to manage header visibility based on route
const RouteHandler = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed/*" element={<Feed />} />
        <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </>
  );
};

export default App;
