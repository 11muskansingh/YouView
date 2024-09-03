import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/contextApi";
import VideoCard from "./VideoCard";

const VideoFeed = () => {
  const { categoryName } = useParams();
  const [videos, setVideos] = useState([]);
  const { isSideBarVisible } = useContext(Context);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/videos/category/${categoryName}`
        );
        console.log(response.data);
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [categoryName]);

  return (
    <div
      className={`grow h-full overflow-y-auto bg-black absolute ${
        isSideBarVisible
          ? "left-[256px] w-[calc(100%-256px)]"
          : "left-[84px] w-[calc(100%-84px)]"
      }`}
      style={{ overflow: "hidden" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {videos.map((item) => {
          if (item.type === "video")
            return <VideoCard key={item?.videoId} video={item} />;
        })}
      </div>
    </div>
  );
};
export default VideoFeed;
