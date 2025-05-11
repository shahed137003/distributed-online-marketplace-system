import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);
  const [userName, setName] = useState(null);
  const [facebookLink, setFaceLink] = useState(null);
  const [discordLink, setDiscordLink] = useState(null);
  const [twitterLink, setTwitterLink] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [bio, setBio] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);


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
  async function getUserProfile(id) {
    setLoading(true);
    try {
      const response = await axios.get(`https://localhost:7161/api/Profile/${id}`);
      const data = response.data;

      console.log("Full user profile data:", data);

      setDiscordLink(data.discord ?? "");
      setFaceLink(data.facebook ?? "");
      setTwitterLink(data.twitter ?? "");
      setName(data.userName ?? "");
      setUserImage(data.ownerImage ?? "");
      setBio(data.bio ?? "");
      setPhoneNumber(data.phoneNumber ?? "");

    } catch (error) {
      console.error(`Error fetching user profile for ID ${id}:`, error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        Loading,
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
