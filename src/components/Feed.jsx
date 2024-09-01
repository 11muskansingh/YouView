import React from "react";
import { useContext } from "react";
import { Context } from "../context/contextApi";
import LeftNavMenuItems from "./LeftNavMenuItems";
import LeftNav from "./LeftNav";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoFeed from "./VideoFeed";
const Feed = () => {
  const { isSideBarVisible, setSidebarVisible, toggleSideBar } =
    useContext(Context);

  return (
    <>
      <Header />
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <Router>
        <Routes>
          <Route path="/category/:categoryName" element={<VideoFeed />} />
        </Routes>
      </Router>
    </>
  );
};

export default Feed;
