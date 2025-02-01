import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import Navbar from "../components/Navbar";
import heroImg1 from "../assets/heroSlider-img-1.png";
import img from "../assets/img.svg";
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import post from "../assets/post.png";
import done from "../assets/done.png";
import hire from "../assets/hire.png";
import get from "../assets/getwork.png";
import make from "../assets/make.png";
import line from "../assets/line.png";
import client from "../assets/client.png";
import cheack from "../assets/cheack.png";
import goodcmpny from "../assets/goodcmpny.svg";
import choose from "../assets/choose.png";
import pic1 from "../assets/people.svg";
import pic2 from "../assets/heand.svg";
import pic3 from "../assets/massage.svg";
import vocter from "../assets/Vector.svg";
import real from "../assets/real.png";
import Grapetask from "../components/Grapetask";
import Freelancer from "../components/Freelancer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import Testomonial from "../components/Testomonial";
import Highest from "../components/Highest";
import Treusted from "../components/Treusted";
import { RiSearchLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import Line from "../assets/hero-search-line.png";
import {
  FaFolderOpen,
  FaPenNib,
  FaStar,
  FaHandshake,
  FaPalette,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { AiFillNotification, AiFillDollarCircle } from "react-icons/ai";
import { MdOutlineWeb, MdVideoLibrary } from "react-icons/md";
import quality from "../assets/quality.png";
import cost from "../assets/Cost.png";
import Secure from "../assets/Secure.png";
import UserCheck from "../assets/UserCheck.png";
import videoHerosection from "../assets/video/Freelance1.mp4";
import video1 from "../assets/video/Freelance5.mp4";
import video2 from "../assets/video/Freelance2.mp4";
import video3 from "../assets/video/Freelance4.mp4";
import { Button } from "@mui/material";
import TopRatedSaller from "../components/TopRatedSaller";
import videoPlay from "../assets/VideoPlay.png";
import videoImg from "../assets/VideiImgMbl.png";
import { useNavigate } from "react-router-dom";
import { geAllGigs } from "../redux/slices/allGigsSlice";
import Slider from "react-slick";
import WelcomeModal from "../components/WelcomeModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import GigCard from "../components/GigCard";
const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gigsDetail, isLoading } = useSelector((state) => state.allGigs);
  const handleCarouselAutoplay = () => {
    const nextButton = document.querySelector('[data-bs-slide="next"]');
    if (nextButton) {
      nextButton.click(); // Simulate a click on the next button to move to the next slide
    }
  };
  // Start autoplay when the component mounts
  useEffect(() => {
    const interval = setInterval(handleCarouselAutoplay, 5000);
    return () => clearInterval(interval);
  }, []);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const searchData = {
      search: search,
      location: location,
    };
    navigate("/search/gigs", { state: { data: searchData } });
  };

  //  ============= Make it Real with Freelancer. ===============

  useEffect(() => {
    dispatch(geAllGigs());
  }, [dispatch]);
  const Real_Freelancer = gigsDetail.flatMap(function (object) {
    return object.gigs;
  });
  console.log(Real_Freelancer, "=========real freelancer");
  // ============== TOP RATED FREELANCER ================
  const [topRated, setTopRated] = useState("");
  const handleTopRatedFreelancer = () => {
    navigate("/MeetTopRatedFreelancer", { state: { dataTopRated: topRated } });
  };

  const [showLess, setShowLess] = useState(false);
  const handleShowLess = () => {
    setShowLess(!showLess);
  };

  const settings = {
    dots: false,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
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

  const [email, setEmail] = useState(null);
  const [subscribeLoader, setSubscribeLoader] = useState(null);

  const submitNewsLetter = () => {
    setSubscribeLoader(true);
    let data = JSON.stringify({
      email: email,
    });
    let config = {
      method: "post",
      redirect: "follow",
      url: "https://script.google.com/macros/s/AKfycbw8B3MLphi7MrtKxCHaceDoRLNlREzyqt1trDdva2c9uUeq4B8wDpSuA4t0-n9lQn71/exec",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSubscribeLoader(false);
        setEmail(null);
        toast.success("Thank you for Subscribing GrapeTask", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
        setSubscribeLoader(false);
      });
  };
  return (
    <>
      <WelcomeModal />
      <Navbar SecondNav="none" />
      <section className="herosection d-flex align-items-center py-lg-0 py-md-0 py-5">
        {/* ================== MOBILE VERSION VIDEO SLIDER START=============== */}

        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade h-100 w-100 d-lg-block d-md-block d-none"
          style={{ objectFit: "cover", position: "absolute", zIndex: "-1" }}
        >
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100">
              <div className="container-fluid p-0 poppins h-100">
                <video
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                  muted
                  loop
                  autoPlay
                >
                  <source src={video1} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="carousel-item h-100">
              <div className="container-fluid p-0 poppins h-100">
                <video
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                  muted
                  loop
                  autoPlay
                >
                  <source src={video2} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="carousel-item  h-100">
              <div className="container-fluid p-0 poppins h-100">
                <video
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover" }}
                  muted
                  loop
                  autoPlay
                >
                  <source src={video3} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev d-none"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next d-none"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* ================== MOBILE VERSION VIDEO SLIDER END =============== */}

        <div className="container-fluid  p-lg-5 p-md-4 p-3">
          {/* hero-section */}
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-12">
              <h3 className="font-70 font-500 cocon" style={{ color: "white" }}>
                Find the <span className="colororing"> Business </span><br/>
                of your <span className="colororing">Dreams</span>{" "}
              </h3>
              <p className=" font-18 text-white poppins">
                Find You New Job Today! New Job Postings Everyday just for you,
                browse the job you want and apply wherever you want
              </p>
              <div
                className="row  justify-conten-center mt-2 poppins position-relative "
                style={{ zIndex: "99" }}
              >
                <form
                  className="col-12 border-box pt-3 align-items-center  justify-content-around pb-3  hero-input"
                  onSubmit={handleSearch}
                >
                  <div className=" d-flex align-items-center hero_Search_Field">
                    <div>
                      <RiSearchLine size={20} color="#F16336" />
                    </div>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-0 ms-2 w-100 font-16 poppins"
                      placeholder="Job title or keyword"
                      required
                    />
                  </div>
                  <img
                    src={Line}
                    width={4}
                    height={30}
                    className="d-lg-flex d-md-flex d-sm-flex d-none"
                    alt="w8"
                  />
                  <div className=" d-flex align-items-center hero_Search_Field mt-lg-0 mt-md-0 mt-sm-0 mt-3">
                    <div>
                      <GoLocation size={20} color="#F16336" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border-0 ms-3 w-100 font-16"
                      placeholder="Canada, Ontario"
                      required
                    />
                  </div>
                  <div className=" mt-lg-0 mt-md-0 mt-sm-0 mt-3">
                    <Button
                      type="submit"
                      className="btn-stepper  rounded-5 poppins px-3  font-16"
                    >
                      Search
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================== MOBILE VERSION VIDEO SLIDER =============== */}
      <div className="container-fluid d-lg-none d-md-none d-block">
        <div className="row justify-content-center p-0">
          <Slider {...settings}>
            <div
              className="col-sm-10 col-12 mbl-videoModal position-relative p-0"
              data-bs-toggle="modal"
              data-bs-target="#videoModal"
            >
              <video
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "cover" }}
                controls
                loop
                autoPlay
              >
                <source src={video1} type="video/mp4" />
              </video>
            </div>
            <div
              className="col-sm-10 col-12 mbl-videoModal position-relative p-0"
              data-bs-toggle="modal"
              data-bs-target="#videoModal"
            >
              <video
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "cover" }}
                controls
                loop
                autoPlay
              >
                <source src={video2} type="video/mp4" />
              </video>
            </div>
            <div
              className="col-sm-10 col-12 mbl-videoModal position-relative p-0"
              data-bs-toggle="modal"
              data-bs-target="#videoModal"
            >
              <video
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "cover" }}
                controls
                loop
                autoPlay
              >
                <source src={video3} type="video/mp4" />
              </video>
            </div>
          </Slider>
          {/* Modal */}
          <div
            className="modal fade"
            id="videoModal"
            tabIndex={-1}
            aria-labelledby="videoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content"
                style={{ background: "bg-transparent " }}
              >
                <div className="modal-body">
                  <video
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover" }}
                    controls
                    loop
                    autoPlay
                  >
                    <source src={video1} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================== MOBILE VERSION VIDEO SLIDER END =============== */}

      {/* Get Work Done on GrapeTask section */}
      <div
        div
        className="container-fluid esaysection position-relative pt-lg-5 pt-md-4 pt-3"
      >
        <img src={done} className="w-100 position-absolute doneimg" alt="" />

        <div className="d-flex justify-content-center flex-column mt-5">
          <h3 className="text-center font-28 cocon">
            GrapeTask simplifies the process of task completion.
          </h3>
          <div className="d-flex justify-content-center">
            <img src={line} className="text-center" alt="" />
          </div>
        </div>
        <div className="row justify-content-center mt-5 px-3 pb-lg-0 p-md-0 p-0  poppins">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <Grapetask
              imges={post}
              heading="Make a Job Posting"
              para="There are many variations of 
            passagesof Lorem Ipsum,"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-lg-5 mt-md-5 mt-4">
            <Grapetask
              imges={hire}
              heading="Hire FreeLancers"
              para="There are many variations of 
           passagesof Lorem Ipsum,"
            />
          </div>
        </div>
        <div className="row justify-content-center  px-3 pb-lg-0 p-md-0 p-0 poppins">
          <div className="col-lg-4 col-md-4 col-sm-6 mt-lg-0 mt-md-0 mt-sm-0 mt-4 col-12">
            <Grapetask
              imges={get}
              heading="Accomplish Tasks"
              para="There are many variations of 
            passagesof Lorem Ipsum,"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12  mt-lg-5 mt-md-5 mt-4">
            <Grapetask
              imges={make}
              heading="Payment Assurance"
              para="There are many variations of passagesof Lorem Ipsum,"
            />
          </div>
        </div>
      </div>
      <br />
      <br className="d-lg-block d-none" />
      <br className="d-lg-block d-none" />
      <br className="d-lg-block d-none" />
      {/*How Good Companies section  */}
      <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 ">
        <div className="row poppins justify-content-center ">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center justify-content-center">
            <img src={goodcmpny} className="w-75" alt="" />
          </div>
          <div className="col-lg-6 col-md-6 col-12 align-self-center">
            <h1 className="fw-normal font-38">
              This is How{" "}
              <span className="colororing">
                {" "}
                Good Companies Find Good Company.
              </span>
            </h1>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10 col-12 mt-4">
                  <div className="row">
                    <div className="col-2 d-flex justify-content-center">
                      <img src={pic1} className="w-100" alt="w8" />
                    </div>

                    <div className="col-10">
                      <p
                        className="font-18 mb-0"
                        style={{ color: "rgba(102, 112, 133, 1)" }}
                      >
                        Access expert talent to fill your skill gaps
                      </p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-2 d-flex justify-content-center">
                      <img src={pic2} className="w-75" alt="w8" />
                    </div>
                    <div className="col-10">
                      <p
                        className="font-18 mb-0"
                        style={{ color: "rgba(102, 112, 133, 1)" }}
                      >
                        Control your workflow: hire, classify and pay your
                        talent
                      </p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-2 d-flex justify-content-center">
                      <img src={pic3} className="w-75" alt="w8" />
                    </div>
                    <div className="col-10">
                      <p
                        className="font-18 mb-0"
                        style={{ color: "rgba(102, 112, 133, 1)" }}
                      >
                        Partner with Companies for end-to-end support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button "
              onClick={() => navigate("/aboutus")}
              className="btn-fill mt-4 ms-lg-2 ms-md-2 ms-sm-2 ms-0 font-16"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>
      {/* ------------TOP--RATED---SALLER------------ */}
      <section className="container-fluid top-rated-saler d-flex align-items-center  position-relative px-lg-3 px-0">
        <div className="container h-100">
          <div className="row justify-content-between  h-100 ">
            <div className="col-lg-6 mt-lg-0 mt-4 col-12 d-flex align-items-center h-100">
              <div className="w-100">
                <h1 className="cocon font-30  fw-semibold text-white">
                  Meet Our <span className="colororing"> Top-Rated</span>{" "}
                  Freelancers
                </h1>
                <form className="border-box px-3 pt-3 align-items-center d-flex justify-content-between pb-3  hero-input">
                  <input
                    type="text"
                    value={topRated}
                    onChange={(e) => setTopRated(e.target.value)}
                    className="border-0 ms-2 w-100 font-16 poppins"
                    required
                    placeholder="What are you looking for?"
                  />
                  <div className="">
                    <Button
                      type="submit"
                      onClick={handleTopRatedFreelancer}
                      className="btn-stepper  rounded-5 poppins px-3  font-16"
                    >
                      Search
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-12  mt-lg-0 mt-4 top-rated-saller-cards h-100 px-lg-3 px-0">
              <TopRatedSaller />
            </div>
          </div>
        </div>
      </section>
      {/*Choose Categories section*/}
      <div className="container-fluid  position-relative mt-5 p-lg-5 p-md-5 p-sm-4 p-3">
        <img
          src={choose}
          className=" position-absolute chooseimg end-0"
          alt=""
        />
        <h3 className="font-28 text-center cocon ">Choose Categories</h3>
        {/* =========== DESKTOP VERSION CATEGORY SLIDER ============= */}

        <div className="row justify-content-center poppins d-lg-flex d-md-flex d-sm-flex d-none">
          <div className="d-flex justify-content-center mb-lg-0 mb-3">
            <img src={line} className="text-center" alt="" />
          </div>

          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center">
                  <AiFillNotification size={30} />
                </div>
                <div className="col-9">
                  <h6 className="font-20">
                    Marketing &<br />
                    Communication
                  </h6>
                  <p className="mb-0 font-14">58 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <FaPenNib size={35} />
                </div>
                <div className="col-9 ">
                  <h6 className="font-20">
                    UI / UX <br />
                    Design
                  </h6>
                  <p className="mb-0 font-14">120 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <AiFillDollarCircle size={35} />
                </div>
                <div className="col-9 ">
                  <h6 className="font-20">
                    Finance <br />
                    Management
                  </h6>
                  <p className="mb-0 font-14">230 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <MdOutlineWeb size={35} />
                </div>
                <div className="col-9   ">
                  <h6 className="font-20">
                    Web
                    <br />
                    Development
                  </h6>
                  <p className="mb-0 font-14">100 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <FaFolderOpen size={35} />
                </div>
                <div className="col-9">
                  <h6 className="font-20">
                    {" "}
                    Project
                    <br />
                    Management
                  </h6>
                  <p className="mb-0 font-14">87 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <FaHandshake size={35} />
                </div>
                <div className="col-9">
                  <h6 className="font-20">
                    Business &
                    <br />
                    Consulting
                  </h6>
                  <p className="mb-0 font-14">23 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <FaPalette size={35} />
                </div>
                <div className="col-9">
                  <h6 className="font-20">
                    Graphic
                    <br />
                    Designer
                  </h6>
                  <p className="mb-0 font-14">65 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
            <div className="container-fluid h-100">
              <div className="row mycard p-3 align-items-center h-100">
                <div className="col-3 text-center h-100">
                  <MdVideoLibrary size={35} />
                </div>
                <div className="col-9">
                  <h6 className="font-20">
                    Video
                    <br />
                    Editor
                  </h6>
                  <p className="mb-0 font-14">120 Jobs Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* =========== DESKTOP VERSION CATEGORY SLIDER END============= */}
        {/* =========== MOBILE VERSION CATEGORY SLIDER START============= */}
        <div className="container-fluid d-lg-none d-md-none d-sm-none d-block index-bootstrap-carousel  bootstrap-carousel ">
          <div class="row">
            <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center">
                    <AiFillNotification size={30} />
                  </div>
                  <div className="col-9">
                    <h6 className="font-20">
                      Marketing &<br />
                      Communication
                    </h6>
                    <p className="mb-0 font-14">58 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <FaPenNib size={35} />
                  </div>
                  <div className="col-9 ">
                    <h6 className="font-20">
                      UI / UX <br />
                      Design
                    </h6>
                    <p className="mb-0 font-14">120 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <AiFillDollarCircle size={35} />
                  </div>
                  <div className="col-9 ">
                    <h6 className="font-20">
                      Finance <br />
                      Management
                    </h6>
                    <p className="mb-0 font-14">230 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2"
              style={showLess ? { display: "block" } : { display: "none" }}
            >
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <MdOutlineWeb size={35} />
                  </div>
                  <div className="col-9   ">
                    <h6 className="font-20">
                      Web
                      <br />
                      Development
                    </h6>
                    <p className="mb-0 font-14">100 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2"
              style={showLess ? { display: "block" } : { display: "none" }}
            >
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <FaFolderOpen size={35} />
                  </div>
                  <div className="col-9">
                    <h6 className="font-20">
                      {" "}
                      Project
                      <br />
                      Management
                    </h6>
                    <p className="mb-0 font-14">87 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2"
              style={showLess ? { display: "block" } : { display: "none" }}
            >
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <FaHandshake size={35} />
                  </div>
                  <div className="col-9">
                    <h6 className="font-20">
                      Business &
                      <br />
                      Consulting
                    </h6>
                    <p className="mb-0 font-14">23 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2"
              style={showLess ? { display: "block" } : { display: "none" }}
            >
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <FaPalette size={35} />
                  </div>
                  <div className="col-9">
                    <h6 className="font-20">
                      Graphic
                      <br />
                      Designer
                    </h6>
                    <p className="mb-0 font-14">65 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2"
              style={showLess ? { display: "block" } : { display: "none" }}
            >
              <div className="container-fluid h-100">
                <div className="row mycard p-3 align-items-center h-100">
                  <div className="col-3 text-center h-100">
                    <MdVideoLibrary size={35} />
                  </div>
                  <div className="col-9">
                    <h6 className="font-20">
                      Video
                      <br />
                      Editor
                    </h6>
                    <p className="mb-0 font-14">120 Jobs Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2 text-center">
              <h4 onClick={handleShowLess} style={{ cursor: "pointer" }}>
                {showLess ? "Show less" : "Show more"}
              </h4>
            </div>
          </div>
        </div>
        {/* =========== MOBILE VERSION CATEGORY SLIDER END ============= */}
      </div>

      {/*Make it Real with Freelancer section*/}
      <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 mt-4 position-relative overflow-hidden">
        <img src={real} className=" position-absolute realimg start-0" alt="" />
        <h3 className="text-center font-28 font-500 cocon">
          Make it Real with Freelancer.
        </h3>
        <div className="d-flex justify-content-center">
          <img src={line} className="text-center" alt="" />
        </div>
        <div className="row  mt-4">
          {Real_Freelancer.slice(0, 8).map((value, index) => (
            <GigCard gig={value} />
          ))}
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              <div className=" col-lg-2 col-md-3 col-sm-4 col-10  poppins">
                <Button
                  type="button "
                  onClick={() => navigate("/search/gigs")}
                  className="btn-stepper mt-lg-5 mt-md-4 mt-3 px-4 py-2"
                >
                  View all
                </Button>
                {/* <button type='button 'className='btn-fill mt-lg-5 mt-md-4 mt-3 w-100'>View all</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*A whole world of freelance section   */}
      <div
        className="container-fluid text-white  mt-lg-5 mt-md-4 mt-3  poppins"
        style={{ backgroundColor: "#F16336" }}
      >
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center">
              <div>
                <h3 className="font-28 font-500 cocon">
                  A whole world of freelance talent at your fingertips
                </h3>
                <div className="mt-3">
                  <div className="mt-4 d-flex ">
                    <img src={quality} width={30} height={39} alt="" />
                    <div className="ms-3">
                      <h5 className="font-20">
                        <span></span>Proof of Quality
                      </h5>
                      <p className="font-16">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 d-flex">
                    <img src={cost} width={30} height={30} alt="" />
                    <div className="ms-3">
                      <h5 className="font-20">
                        <span></span>No cost until you hire
                      </h5>
                      <p className="font-16">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 d-flex">
                    <img src={Secure} width={30} height={30} alt="" />
                    <div className="ms-3">
                      <h5 className="font-20">
                        <span></span>Safe and secure
                      </h5>
                      <p className="font-16">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 d-flex">
                    <img src={UserCheck} width={30} height={30} alt="" />
                    <div className="ms-3">
                      <h5 className="font-20">
                        <span></span>Freelancer-friendly interface
                      </h5>
                      <p className="font-16">
                        Check any pro’s work samples, client reviews, and
                        identity verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 position-relative">
              <div className="text-end">
                <img
                  src={client}
                  className="imgwhrd"
                  width={"70%"}
                  alt="w8 not found"
                />
              </div>
              <div className="chakimgesbox">
                <div className="d-flex ">
                  <img
                    src={cheack}
                    width={20}
                    height={20}
                    className="me-4"
                    alt="w8 not found"
                  />
                  <p className="font-16">The best for every budget</p>
                </div>
                <div className="d-flex ">
                  <img
                    src={cheack}
                    width={20}
                    height={20}
                    className="me-4"
                    alt="w8 not found"
                  />
                  <p className="font-16">Quality work done quickly</p>
                </div>
                <div className="d-flex ">
                  <img
                    src={cheack}
                    width={20}
                    height={20}
                    className="me-4"
                    alt="w8 not found"
                  />
                  <p className="font-16">Protected payments, every time </p>
                </div>
                <div className="d-flex ">
                  <img
                    src={cheack}
                    width={20}
                    height={20}
                    className="me-4"
                    alt="w8 not found"
                  />
                  <p className="font-16">24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Highest />
      {/* TESTIMONIAL */}
      <Testomonial />
      <ToastContainer />
      <div
        className="container subrib d-flex align-items-center"
        id="subscribe"
      >
        <div className="row px-4">
          <div className="col-lg-6 col-md-6 col-12 px-lg-4 px-3">
            <h1 className="poppins font-40 text-white fw-semibold">
              Never Want to Miss Any Job News?
            </h1>
          </div>
          <div className="col-lg-6 col-md-6 col-12 px-3">
            <div className="row justify-conten-center mt-2 poppins position-relative ">
              <div className="col-lg-10 col-md-12 border-box pt-3 align-items-center d-flex justify-content-around pb-3  hero-input">
                <div className=" d-flex align-items-center w-100">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0  w-100 font-16"
                    placeholder="Enter your email address here..."
                  />
                </div>
                <img src={Line} width={4} height={30} alt="w8" />

                <div className="ms-3">
                  <button
                    type="button"
                    disabled={subscribeLoader}
                    onClick={submitNewsLetter}
                    className="btn-circl rounded-5 font-16"
                  >
                    {subscribeLoader ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* treusted-section */}
      <Treusted />
      <Footer />
    </>
  );
};

export default Index;
