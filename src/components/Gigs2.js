<<<<<<< HEAD
import React from "react";
import figma from "../assets/figma.webp";
import animation from "../assets/baner.webp";
import CardImg from "../assets/GigCradImg.webp";
import Dashboardright from "./Dashboardright";
import {
  BsFillPencilFill,
  BsInstagram,
  BsPlusLg,
  BsThreeDotsVertical,
} from "react-icons/bs";
import Navbar from "./Navbar";
import { Button } from "@mui/material";
import { FaEdit, FaFacebookSquare, FaStar } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { getPersonalGigs } from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";
import { useEffect } from "react";
import { MdDeleteForever, MdDeleteSweep, MdEditNote } from "react-icons/md";
import { GigDelete } from "../redux/slices/gigsSlice";
import { useState } from "react";
import { geAllGigs } from "../redux/slices/allGigsSlice";
import Freelancer from "./Freelancer";
import { titleToSlug } from "../utils/helpers";
=======
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BsPlusLg,
  BsThreeDotsVertical
} from "react-icons/bs";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import animation from "../assets/baner.webp";
import { geAllGigs } from "../redux/slices/allGigsSlice";
import { GigDelete } from "../redux/slices/gigsSlice";
import { getPersonalGigs } from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";
import { titleToSlug } from "../utils/helpers";
import Card from "./Card";
import Dashboardright from "./Dashboardright";
import Freelancer from "./Freelancer";
import Navbar from "./Navbar";
>>>>>>> d918fe2 (cahnges by abdul qavi)
const Gigs2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { personalGigs } = useSelector((state) => state.offers);
  const { gigsDetail, isLoading } = useSelector((state) => state.allGigs);
  const [editGigId, setEditGigId] = useState("");
  const UserData = JSON.parse(localStorage.getItem("UserData"));

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // =================Personal Gigs===========
  useEffect(() => {
    let data = {
      user_id: UserData?.id,
    };
    dispatch(getPersonalGigs(data));
    console.log(personalGigs);
  }, [dispatch]);

  useEffect(() => {
    dispatch(geAllGigs());
  }, [dispatch]);
  const Real_Freelancer = gigsDetail.flatMap(function (object) {
    return object.gigs;
  });
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
  // ============  GIG DELETE ========
  const handleGigDelete = (id) => {
    dispatch(GigDelete(id));
  };

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid pt-5 pb-5">
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0">
          <div className="col-lg-4 col-12">
            <Dashboardright />
          </div>
          <div className="col-lg-8 col-12 mt-lg-0 mt-4">
<<<<<<< HEAD
            <div className="d-flex flex-wrap justify-content-between">
              <div>
                <h6 className="font-22 byerLine font-500 cocon">Gigs</h6>
              </div>
              <div>
                <Button
                  onClick={() => navigate("/multiSteps")}
                  className="btn-stepper poppins px-3  font-16"
                >
                  <BsPlusLg className="me-2" /> Create new gig
                </Button>
              </div>
            </div>
            <div className="row ">
              {personalGigs.length > 0 ? (
                personalGigs.map((innerValue, index) => (
                  <div
                    className="col-lg-4 col-md-4 col-sm-6 col-12  mt-4"
                    key={index}
                  >
                    <div className="cursor-pointer h-100">
                      <div className="h-100">
                        <Card
                          gigsImg={
                            innerValue.media &&
                            (innerValue.media.image1 == null
                              ? innerValue.media.image2 == null
                                ? innerValue.media.image3
                                : innerValue.media.image2
                              : innerValue.media.image1)
                          }
                          heading={innerValue.title}
                          // phara={stripHtmlTags(innerValue.description)}
                          star1={
                            parseInt(
                              innerValue.rating
                                .map((value) => value.ratings)
                                .filter((value) => !isNaN(value))
                                .reduce(
                                  (acc, rating, index, array) =>
                                    acc + rating / array.length,
                                  0
                                )
                            ) >= 1
                              ? "#F16336"
                              : "#D4D4D4"
                          }
                          star2={
                            parseInt(
                              innerValue.rating
                                .map((value) => value.ratings)
                                .filter((value) => !isNaN(value))
                                .reduce(
                                  (acc, rating, index, array) =>
                                    acc + rating / array.length,
                                  0
                                )
                            ) >= 2
                              ? "#F16336"
                              : "#D4D4D4"
                          }
                          star3={
                            parseInt(
                              innerValue.rating
                                .map((value) => value.ratings)
                                .filter((value) => !isNaN(value))
                                .reduce(
                                  (acc, rating, index, array) =>
                                    acc + rating / array.length,
                                  0
                                )
                            ) >= 3
                              ? "#F16336"
                              : "#D4D4D4"
                          }
                          star4={
                            parseInt(
                              innerValue.rating
                                .map((value) => value.ratings)
                                .filter((value) => !isNaN(value))
                                .reduce(
                                  (acc, rating, index, array) =>
                                    acc + rating / array.length,
                                  0
                                )
                            ) >= 4
                              ? "#F16336"
                              : "#D4D4D4"
                          }
                          star5={
                            parseInt(
                              innerValue.rating
                                .map((value) => value.ratings)
                                .filter((value) => !isNaN(value))
                                .reduce(
                                  (acc, rating, index, array) =>
                                    acc + rating / array.length,
                                  0
                                )
                            ) >= 5
                              ? "#F16336"
                              : "#D4D4D4"
                          }
                          projectNumber="0"
                          price={innerValue.package[0]?.total}
                          arrow={
                            <div className="dropdown gig-editable">
                              <span
                                className=" dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <BsThreeDotsVertical />
                              </span>
                              <ul className="dropdown-menu poppins">
                                <li>
                                  <a
                                    className="dropdown-item textgray font-12 fw-semibold"
                                    onClick={() =>
                                      navigate("/multiSteps", {
                                        state: { gigData: innerValue },
                                      })
                                    }
                                  >
                                    <MdEditNote
                                      size={20}
                                      className="textgray"
                                    />{" "}
                                    Edit{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item textgray font-12 fw-semibold"
                                    onClick={() =>
                                      handleGigDelete(innerValue.id)
                                    }
                                  >
                                    <MdDeleteSweep
                                      size={20}
                                      className="textgray"
                                    />{" "}
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="cocon">Not Found</h3>
              )}
            </div>

            <h4 className="font-22 byerLine font-500 cocon mt-4">
              Most popular Gigs
            </h4>
            <div className="container position-relative  mb-5 gigs-slider mt-4">
=======
            {/* Personal gigs section: only visible to experts/freelancers */}
            {(UserData?.role === "expert/freelancer" || UserData?.role === "bidder/company representative/middleman") && (
              <>
                <div className="d-flex flex-wrap justify-content-between">
                  <div>
                    <h6 className="font-22 byerLine font-500 cocon">Gigs</h6>
                  </div>
                  <div>
                    <Button
                      onClick={() => navigate("/multiSteps")}
                      className="btn-stepper poppins px-3 font-16"
                    >
                      <BsPlusLg className="me-2" /> Create new gig
                    </Button>
                  </div>
                </div>
                <div className="row ">
                  {personalGigs.length > 0 ? (
                    personalGigs.map((innerValue, index) => (
                      <div
                        className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4"
                        key={index}
                      >
                        <div className="cursor-pointer h-100">
                          <div className="h-100">
                            <Card
                              gigsImg={
                                innerValue.media &&
                                (innerValue.media.image1 == null
                                  ? innerValue.media.image2 == null
                                    ? innerValue.media.image3
                                    : innerValue.media.image2
                                  : innerValue.media.image1)
                              }
                              heading={innerValue.title}
                              // phara={stripHtmlTags(innerValue.description)}
                              star1={
                                parseInt(
                                  innerValue.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                      (acc, rating, index, array) =>
                                        acc + rating / array.length,
                                      0
                                    )
                                ) >= 1
                                  ? "#F16336"
                                  : "#D4D4D4"
                              }
                              star2={
                                parseInt(
                                  innerValue.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                      (acc, rating, index, array) =>
                                        acc + rating / array.length,
                                      0
                                    )
                                ) >= 2
                                  ? "#F16336"
                                  : "#D4D4D4"
                              }
                              star3={
                                parseInt(
                                  innerValue.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                      (acc, rating, index, array) =>
                                        acc + rating / array.length,
                                      0
                                    )
                                ) >= 3
                                  ? "#F16336"
                                  : "#D4D4D4"
                              }
                              star4={
                                parseInt(
                                  innerValue.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                      (acc, rating, index, array) =>
                                        acc + rating / array.length,
                                      0
                                    )
                                ) >= 4
                                  ? "#F16336"
                                  : "#D4D4D4"
                              }
                              star5={
                                parseInt(
                                  innerValue.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                      (acc, rating, index, array) =>
                                        acc + rating / array.length,
                                      0
                                    )
                                ) >= 5
                                  ? "#F16336"
                                  : "#D4D4D4"
                              }
                              projectNumber="0"
                              price={innerValue.package[0]?.total}
                              arrow={
                                <div className="dropdown gig-editable">
                                  <span
                                    className="dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <BsThreeDotsVertical />
                                  </span>
                                  <ul className="dropdown-menu poppins">
                                    <li>
                                      <a
                                        className="dropdown-item textgray font-12 fw-semibold"
                                        onClick={() =>
                                          navigate("/multiSteps", {
                                            state: { gigData: innerValue },
                                          })
                                        }
                                      >
                                        <MdEditNote size={20} className="textgray" /> Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item textgray font-12 fw-semibold"
                                        onClick={() =>
                                          handleGigDelete(innerValue.id)
                                        }
                                      >
                                        <MdDeleteSweep size={20} className="textgray" /> Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3 className="cocon">Not Found</h3>
                  )}
                </div>
              </>
            )}
  
            {/* Most popular gigs: visible to all users */}
            <h4 className="font-22 byerLine font-500 cocon mt-4">
              Most popular Gigs
            </h4>
            <div className="container position-relative mb-5 gigs-slider mt-4">
>>>>>>> d918fe2 (cahnges by abdul qavi)
              <div className="gigs-slider-bg" style={{ height: "100%" }}></div>
              <div className="row">
                <Slider {...settings}>
                  {Real_Freelancer.slice(0, 8).map((value, index) => (
                    <div className="col-lg-3 col-md-6 col-12" key={index}>
                      <Freelancer
                        handleNavigate={() =>
                          navigate(
<<<<<<< HEAD
                            `/g/${titleToSlug(value?.title)}/${
                              value?.seller?.username
                            }/${value?.id}`
=======
                            `/g/${titleToSlug(value?.title)}/${value?.seller?.username}/${value?.id}`
>>>>>>> d918fe2 (cahnges by abdul qavi)
                          )
                        }
                        imges={
                          value.media &&
                          (value.media.image1 == null
                            ? value.media.image2 == null
                              ? value.media.image3
                              : value.media.image2
                            : value.media.image1)
                        }
                        heading={value?.title}
                        price={value.package[0]?.total}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
<<<<<<< HEAD

=======
  
>>>>>>> d918fe2 (cahnges by abdul qavi)
            <div className="mt-5">
              <img src={animation} className="w-100 mt-3" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
<<<<<<< HEAD
=======
  
>>>>>>> d918fe2 (cahnges by abdul qavi)
};

export default Gigs2;
