import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "./SuggestionVideoCard";
const VideoDetails = () => {
  const [video, setVideo] = useState();
  const { id } = useParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const isFromDatabase = video?._id !== undefined;
  const fetchRelatedVideos = async () => {
    try {
      setVideo(null);
      const response = await axios.get(
        `http://localhost:3000/api/v1/videos/related/${id}`
      );
      //console.log("Related Videos data :", response.data);
      setRelatedVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoDetails = async () => {
    try {
      setRelatedVideos([]);
      const response = await axios.get(
        `http://localhost:3000/api/v1/videos/info/${id}`
      );
      // console.log("Videos Details", response.data);

      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  useEffect(() => {
    console.log("Current video ID:", id);
    fetchRelatedVideos();
    fetchVideoDetails();
  }, [id]);

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black ">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row ">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            {isFromDatabase ? (
              <video
                src={video.videoFile}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000" }}
                autoPlay
              />
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                playing={true}
              />
            )}
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      (video?.channelThumbnail &&
                        video?.channelThumbnail[0]?.url) ||
                      "https://tse4.mm.bing.net/th?id=OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa&pid=Api&P=0&h=180"
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.channelTitle || "Unknown Channel"}
                  {!isFromDatabase && video?.channelHandle && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.views, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                {`${abbreviateNumber(
                  video?.viewCount || video?.views,
                  2
                )} Views`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] no-scrollbar">
          {relatedVideos.map((item, index) => {
            if (item.type === "video")
              return <SuggestionVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
