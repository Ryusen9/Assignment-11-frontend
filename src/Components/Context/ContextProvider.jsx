import React, { useEffect, useState } from "react";
import Context from "./Context";
import auth from "../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import axios from "axios";

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
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
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        axios
          .post(
            "https://assignment-11-backend-three.vercel.app/jwt",
            userData,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://assignment-11-backend-three.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then(() => {
            setLoading(false);
          });
      }
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
    logoutUser,
    logInWithGithub,
    logInWithGoogle,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
