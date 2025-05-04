import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {


const [token,setToken] = useState(null);

useEffect(function(){
 if(localStorage.getItem("token")!=null){
 setToken(localStorage.getItem("token"));
    
 }
},[]);


return (

<div>
 <AuthContext.Provider value={
    {
        token,
        setToken
    }
 }>
 {children}   
</AuthContext.Provider>
</div>



)

}

export default AuthContextProvider
