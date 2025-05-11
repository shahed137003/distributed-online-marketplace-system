import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loggedUserId, setLoggedUserId] = useState(localStorage.getItem("userId"));

 
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
    }else {
        setToken(null);
    }

    if (storedUserId) {
      setLoggedUserId(storedUserId);
    }
  }, []);

 
  useEffect(() => {
    if (loggedUserId) {
      localStorage.setItem("userId", loggedUserId);
    }
  }, [loggedUserId]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        loggedUserId,
        setLoggedUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
