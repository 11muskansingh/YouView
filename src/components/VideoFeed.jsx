import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../context/contextApi";
import VideoCard from "./VideoCard";
import { FadeLoader } from "react-spinners";
const VideoFeed = () => {
  const { categoryName } = useParams();
  const [videos, setVideos] = useState([]);
  const { isSideBarVisible, loading, setLoading } = useContext(Context);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/v1/videos/category/${categoryName}`
        );
        // console.log(response.data);
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [categoryName]);

  return (
    <div
      className={`grow h-full overflow-hidden  bg-black absolute left-[84px] w-[calc(100%-84px)]
      `}
      style={{ overflow: "hidden" }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <FadeLoader color="#3498db" loading={loading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {videos.map((item) => {
            if (item.type === "video")
              return <VideoCard key={item?.videoId} video={item} />;
          })}
        </div>
      )}
    </div>
  );
};
export default VideoFeed;
