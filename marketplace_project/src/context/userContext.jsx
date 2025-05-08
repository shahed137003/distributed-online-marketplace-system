import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';


export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const {token} = useContext(AuthContext);
    const [Loading,setLoading] = useState(false);
    const [userName,setName] = useState(null);
    const [facebookLink,setFaceLink]=useState(null);
    const [discordLink,setDiscordLink]=useState(null);
    const [twitterLink,setTwitterLink]=useState(null);
    const[userImage,setUserImage]=useState(null);



    async function getLoggedUser(){
        setLoading(true);
        try {
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }
    );

    setLoading(false);
    return data
 } catch (error) {
    console.log(error,"error from get logged user function")
    setLoading(false);
}
}
const navigate = useNavigate();

useEffect(function(){
    if(token !== null){
        getLoggedUser();
       }
},[token]);


async function putUserInfo(){



    
}

     

    

 


    return (
        <UserContext.Provider value={
           {
            Loading,
            token
           }
        }>
           {children}
        </UserContext.Provider>)
}
export default UserContextProvider