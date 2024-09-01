import React, { useEffect } from "react";
import axios from "axios";

const SearchResult = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return <div>Check the console for API response.</div>;
};

export default SearchResult;
