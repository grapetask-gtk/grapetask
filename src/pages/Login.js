<<<<<<< HEAD
import React from "react";
import Loginleft from "../components/Loginleft";
import Login1 from "../components/Login1";
import CommonHelmet from "./CommonHelmet.js";

const Login = () => {
  return (
    <>
      <CommonHelmet
        title="Grapetask Login"
        name="description"
        content="GrapeTask is the go-to freelancing platform for businesses to grow and succeed with affordable, reliable freelance services"
        canonical="https://www.grapetask.co/login"
      />
      {/*  */}

=======
import React, { useState } from "react";
import Loginleft from "../components/Loginleft";
import Login1 from "../components/Login1";


const Login = () => {
 

  return (
    <>
      {/*  */}
    
>>>>>>> d918fe2 (cahnges by abdul qavi)
      <div className="container-fluid poppins min-100vh">
        <div className="row min-100vh">
          <Loginleft />
          <Login1 />
        </div>
      </div>
    </>
  );
};

export default Login;
