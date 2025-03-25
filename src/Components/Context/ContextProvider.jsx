import React, { useEffect, useState } from "react";
import Context from "./Context";
import auth from "../Firebase/firebase.init";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const value = {
    theme,
    setTheme,
    user,
    loading,
    createUser,
    loginUser,
    logoutUser
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
