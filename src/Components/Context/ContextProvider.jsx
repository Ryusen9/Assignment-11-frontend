import React, { useEffect, useState } from 'react'
import Context from './Context'
import auth from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }, [theme]);
      const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
      }
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser) {
            setUser(authUser);
          } else {
            setUser(null);
          }
          setLoading(false)
        })
        return () => unsubscribe();
      }, [])
    const value = {
        theme, setTheme, user, loading, createUser,
    }
  return (
    <Context.Provider value={value} >
        {children}
    </Context.Provider>
  )
}

export default ContextProvider