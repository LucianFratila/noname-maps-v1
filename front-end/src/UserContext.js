import React, { createContext, useState, useEffect } from "react";
import firebaseConfig from "./config/firebase-config";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ email: null, metadata: null });
  const [loading, isLoading] = useState(true);
  const [refreshToken,setRefreshToken] = useState()
  useEffect(() => {
    const unsuscribe = firebaseConfig.auth().onAuthStateChanged((user) => {
      setUser(user);
      isLoading(false);
      if (user) {
        user.getIdToken().then(function (idToken) {
          setToken(idToken);
        });
      }
    });

    return () => unsuscribe();
  }, [refreshToken]);
  // console.log(token);
  const refresTokenFunc = (data)=>{
    setRefreshToken(data)
  }
  const values = {
    token,
    user,
    loading,
    refresTokenFunc
    // allCat
  };
  return <UserContext.Provider value={values} >{!loading && children}</UserContext.Provider>;
};
