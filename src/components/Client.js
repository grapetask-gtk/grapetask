import React from "react";
import imges1 from "../assets/imge4.webp";
import imges2 from "../assets/imge5.webp";
import imges3 from "../assets/imge6.webp";
import line from "../assets/line.webp";
import { FiInstagram } from "react-icons/fi";
import { BsPinterest } from "react-icons/bs";
import { FaFacebook, FaTwitter } from "react-icons/fa";
// import lines from "../assets/line.webp";

const Client = () => {
  return (
    <>
      <div className="container ">
        <div className="row justify-content-center text-center">
          <h3 className="font-40 font-500 cocon">
          Our Experts Are Here {" "}
            <br className="d-lg-block d-md-block d-none" />
            Ask Your Questions Now
          </h3>
          <div className="d-flex justify-content-center">
            <img src={line} className="text-center" alt="" />
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
            <div className="position-relative about-expert-befor">
              <img src={imges1} className="w-100 rounded-2" alt="grapetask freelancer" />
              <div className="about-expert-images px-2 p-3">
                <FiInstagram color="#1F2732" size={22} />
                <FaFacebook className="mx-4" color="#1F2732" size={22} />
                <FaTwitter color="#1F2732" size={22} />
                <BsPinterest color="#1F2732" className="ms-4" size={22} />
              </div>
            </div>
            <h4 className="font-28 font-Garamond fw-bold mt-4">Emily Roberts</h4>
            <p className="font-18 colororing">Project Lead, Creative Agency</p>
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
            <div className="position-relative about-expert-befor">
              <img src={imges2} className="w-100 rounded-2" alt="grapetask freelancer" />
              <div className="about-expert-images px-2 p-3">
                <FiInstagram color="#1F2732" size={22} />
                <FaFacebook className="mx-4" color="#1F2732" size={22} />
                <FaTwitter color="#1F2732" size={22} />
                <BsPinterest color="#1F2732" className="ms-4" size={22} />
              </div>
            </div>
            <h4 className="font-28 font-Garamond fw-bold mt-4">
            David Thompson
            </h4>
            <p className="font-18 colororing">CEO, Tech Solutions</p>
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
            <div className="position-relative about-expert-befor">
              <img src={imges3} className="w-100 rounded-2" alt="grapetask freelancer" />
              <div className="about-expert-images px-2 p-3">
                <FiInstagram color="#1F2732" size={22} />
                <FaFacebook className="mx-4" color="#1F2732" size={22} />
                <FaTwitter color="#1F2732" size={22} />
                <BsPinterest color="#1F2732" className="ms-4" size={22} />
              </div>
            </div>
            <h4 className="font-28 font-Garamond fw-bold mt-4">
            Sarah Ahmed
            </h4>
            <p className="font-18 colororing">Marketing Manager</p>
          </div>
          <div className=" mt-lg-5 mt-md-4 mt-3">
            <button className="btn-with-border px-5 font-20 fw-medium">
              Meet Expert
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
