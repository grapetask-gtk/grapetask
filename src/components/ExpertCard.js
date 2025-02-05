import React from "react";
import icone from "../assets/icone.webp";
import studio from "../assets/studio.webp";
import ster from "../assets/Frame.webp";
import star6 from "../assets/5star.webp";
import timepes from "../assets/time.webp";
import user from "../assets/gigsRatingComments.webp";
import amazing from "../assets/amazon.webp";
import "../style/imgSlider.scss";
import { BiTime } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import Navbar from "./Navbar";
import ImgSlider from "./ImgSlider";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaCheck, FaStar } from "react-icons/fa";
import Card from "./Card";
import { MdLocationOn } from "react-icons/md";

const ExpertCard = ({ user, showExpertDetail }) => {
  return (
    <div className="mt-3 p-2" onClick={() => showExpertDetail(user)}>
      <div className="d-flex mt-2 ms-3">
        <div>
          <img src={user?.image} width={70} height={70} alt="" />
        </div>
        <div className="ms-3">
          <h6 className="colororing font-18 font-500 poppins">
            {user?.fname + " " + user?.lname}
          </h6>
          <p className="colororing mb-0 font-14 poppins">New Seller </p>
          <p className="font-12 poppins">
            <MdLocationOn className="colororing " />
            Pakistan
          </p>
        </div>
      </div>
      <div className="d-flex flex-wrap mt-2">
        <div>
          <button
            type="button "
            className="btn-circl rounded-2 me-5 font-10 font-500 poppins"
          >
            Available Now
          </button>
        </div>
        <div>
          <p className="font-15 poppins">${user?.hourly_rate}/hour</p>
        </div>
        {/* <div className='ms-3'><p className='font-15 poppins'>$100+ earned</p></div> */}
      </div>
      <div className="mt-2">
        <p className="font-15 poppins textgray">{user?.description}</p>
      </div>
    </div>
  );
};

export default ExpertCard;
