import React, { createContext, useState, useEffect } from "react";

// import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSideBarVisible, setSidebarVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [loginUsername, loginSetUsername] = useState("");
  const [loginPassword, loginSetPassword] = useState("");

  let avatarURL;
  let coverImageURL;

  const toggleSideBar = () => {
    setSidebarVisible(!isSideBarVisible);
  };

  // useEffect(() => {
  //     fetchSelectedCategoryData(selectedCategory);
  // }, [selectedCategory]);

  // const fetchSelectedCategoryData = (query) => {
  //     setLoading(true);
  //     fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
  //         console.log(contents);
  //         setSearchResults(contents);
  //         setLoading(false);
  //     });
  // };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
        isSideBarVisible,
        setSidebarVisible,
        toggleSideBar,
        username,
        setUsername,
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        avatar,
        setAvatar,
        profilePicture,
        setProfilePicture,
        avatarPreview,
        setAvatarPreview,
        profilePicturePreview,
        setProfilePicturePreview,
        loginUsername,
        loginSetUsername,
        loginPassword,
        loginSetPassword,
        avatarURL,
        coverImageURL,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
