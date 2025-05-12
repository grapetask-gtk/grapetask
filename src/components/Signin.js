import React from "react";
import Loginright from "./Loginright";
import Loginleft from "./Loginleft";

const Signin = () => {
  return (
    <>
      <div className="container-fluid min-100vh">
        <div className="row justify-content-center poppins min-100vh">
          <Loginleft />
          <Loginright />
        </div>
      </div>
    </>
  );
};

export default Signin;
