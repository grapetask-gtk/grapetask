import React, { useState } from "react";
import Loginleft from "../components/Loginleft";
import Login1 from "../components/Login1";


const Login = () => {
 

  return (
    <>
      {/*  */}
    
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
