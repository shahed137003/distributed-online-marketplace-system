import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  //const { token } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const [userName, setName] = useState(null);
  const [facebookLink, setFaceLink] = useState(null);
  const [discordLink, setDiscordLink] = useState(null);
  const [twitterLink, setTwitterLink] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [bio, setBio] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  // Get all user profiles with error handling
  async function getAllUserProfiles() {
    //setLoading(true);
    try {
      const data  = await axios.get("https://localhost:7161/api/Profile");
      console.log(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching all user profiles:", error);
      return null;
    } 
  }

  // Get a specific user profile by ID with error handling
  async function getUserProfile(id) {
   // setLoading(true);
    try {
      const { data } = await axios.get(`https://localhost:7161/api/Profile${id}`, {
        // headers: {
        //   //token: localStorage.getItem("token"),
        // },
      });

      setDiscordLink(data.discord || null);
      setFaceLink(data.facebook|| null);
      setTwitterLink(data.twitter|| null);
      setName(data.userName || null);
      setUserImage(data.ownerImage || null);
      setBio(data.Bio || null);
      setPhoneNumber(data.phoneNumber || null);

      return data;
    } catch (error) {
      console.error(`Error fetching user profile for ID ${id}:`, error);
      return null;
    } 
  }

  return (
    <UserContext.Provider
      value={{
        Loading,
        //token,
        getAllUserProfiles,
        getUserProfile,
        facebookLink,
        discordLink,
        twitterLink,
        userImage,
        phoneNumber,
        bio,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;