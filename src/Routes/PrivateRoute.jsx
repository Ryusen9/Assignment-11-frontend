import React, { useContext } from "react";
import Context from "../Components/Context/Context";
import Loader from "../Components/Loader.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Context);
  if(loading) {
    return <Loader/>
  }
  if(user) {
    return children
  }
  return (
    <Navigate to={"/login"}></Navigate>
  )
};

export default PrivateRoute;
