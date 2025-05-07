import React from "react";
import line from "../assets/line.webp";
import Testomonial from "./Testomonial";

const Team = () => {
  return (
    <>
      <div className="container ">
        <div className="row  justify-content-center">
          <h3 className="text-center font-40 font-500 cocon">
           Client Feedback That Speaks Volumes
          </h3>
          <div className="d-flex justify-content-center">
            <img src={line} className="text-center" alt="grapetask" />
          </div>
          <Testomonial />
        </div>
      </div>
    </>
  );
};

export default Team;
