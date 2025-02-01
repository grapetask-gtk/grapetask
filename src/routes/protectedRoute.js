import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import NavbarComponent from "../components/NavbarComponent";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken"); 
 
  return token ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
