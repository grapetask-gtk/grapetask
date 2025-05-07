import React from "react";
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import lines from "../assets/line.webp";

const Story = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <h2 className="font-40 font-500 cocon">Our Story</h2>
          <div className="d-flex justify-content-center mb-4">
            <img src={lines} className="text-center" alt="freelance marketplace" />
          </div>
          <p className="font-18" style={{ color: "rgba(102, 112, 133, 1)" }}>
          Grapetask was founded on a desire to change the way people work and communicate. As a revolutionary freelance marketplace, we enable businesses and freelancers to work together smoothly. We saw the growing  demand for outsourcing services and wanted to build a platform that effectively bridges this gap.
          <br /> Our journey began with the goal of creating the greatest online marketplace for businesses to hire freelancers and for individuals to find self-employment opportunities. Grapetask is now a leading online freelancing platform that connects talent with opportunities. From startups to established businesses, we offer an environment where activities get done efficiently and goals are met.
          <br /> Whether you are looking for freelance work online or want to post jobs on freelance platform, we have you covered. Our platform offers flexibility and freedom.
          </p>
          <div className="col-lg-4 col-md-6 col-12 mt-5">
            <img src={image1} className="w-100 rounded-4" alt="best online marketplace" />
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-5">
            <img src={image2} className="w-100 rounded-4" alt="freelance online" />
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-5">
            <img src={image3} className="w-100 rounded-4" alt="freelance talent" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Story;
