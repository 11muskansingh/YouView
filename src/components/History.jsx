import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Context } from "../context/contextApi";
import { FadeLoader } from "react-spinners";
import SearchResultVideoCard from "./SearchResultVideoCard";
import LeftNavMenuItems from "./LeftNavMenuItems.jsx";
import LeftNav from "./LeftNav.jsx";
const History = () => {
  const [videos, setVideos] = useState([]);
  const { loading, setLoading, isSideBarVisible } = useContext(Context);

  const getHistoryVideos = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/getWatchHistory`);
      console.log(response);
      // console.log(response.data);
      setVideos(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching the Video history of the user");
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistoryVideos();
  }, []);

  return (
    <div className="flex flex-row h-[calc(100%-56px)] relative left-[84px] w-[calc(100%-84px)]">
      {isSideBarVisible ? <LeftNavMenuItems /> : <LeftNav />}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FadeLoader color="#3498db" loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 p-5">
            {videos.length === 0 ? (
              <div>No videos found</div>
            ) : (
              videos.map((item, idx) => {
                let video = null;
                if (item?.videoFile) {
                  video = {
                    title: item.title || "Untitled Video",
                    thumbnail: item.thumbnail,
                    description:
                      item.description || "No description available.",
                    channelTitle: item.owner?.name || "Unknown Channel",
                    views: item.views || 0,
                    createdAt: item.createdAt,
                  };
                } else if (item?.id) {
                  video = {
                    id: item.id,
                    title: item.title,
                    thumbnail: item.thumbnail,
                    description: item.description,
                    channelTitle: item.channelTitle,
                    viewCount: item.viewCount || 0,
                    publishedTimeText: item.publishDate,
                  };
                }
                return (
                  <SearchResultVideoCard key={video.id || idx} video={video} />
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
