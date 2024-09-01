import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VideoFeed = () => {
  const { categoryName } = useParams(); // Get categoryName from URL
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/videos?category=${categoryName}`
        );
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [categoryName]);

  return (
    <div className="video-feed">
      {videos.map((video) => (
        <div key={video._id} className="video-card">
          <h3>{video.title}</h3>
          <img src={video.thumbnail} alt={video.title} />
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
