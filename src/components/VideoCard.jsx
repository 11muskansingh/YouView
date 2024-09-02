import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

const VideoCard = ({ video }) => {
  return (
    <div className="flex flex-col mb-8">
      <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={video?.thumbnail[0]?.url}
          alt={video?.title}
        />
      </div>

      <div className="flex text-white mt-3">
        <div className="flex items-start">
          <div className="flex h-9 w-9 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={
                (video?.channelThumbnail && video?.channelThumbnail[0]?.url) ||
                "https://tse4.mm.bing.net/th?id=OIP.tZq4FbHI-2VuBSGkHjfyfAHaHa&pid=Api&P=0&h=180"
              }
              alt={video?.channelTitle}
            />
          </div>
        </div>
        <div className="flex flex-col ml-3 overflow-hidden">
          <span className="text-sm font-bold line-clamp-2">{video?.title}</span>
          <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
            {video?.channelTitle}
            {video?.channelHandle && (
              <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
            )}
          </span>
          <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(video?.viewCount, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{video?.publishedTimeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
