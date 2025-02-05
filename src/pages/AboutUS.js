import React, { useEffect, useState } from "react";
import Experienced from "../assets/Experienced.webp";
import Navbar from "../components/Navbar";
import Slider from "@mui/material/Slider";
import Story from "../components/Story";
import Client from "../components/Client";
import Team from "../components/Team";
import Footer from "../components/Footer";
import { FiCheckCircle } from "react-icons/fi";
import ourMission from "../assets/OurMission.webp";
import line from "../assets/line.webp";
import videoImg from "../assets/aboutSlideImg.webp";
import videoPlay from "../assets/VideoPlay.webp";

import skill from "../assets/skillProvider.webp";
import support from "../assets/support.webp";
import video1 from "../assets/video/Freelance1.mp4";
import video2 from "../assets/video/Freelance6.mp4";
import video3 from "../assets/video/Freelance7.mp4";
// import videoHerosection from '../assets/video/Freelance1.mp4'

const AboutUS = () => {
  const [sliderOne, setSliderOne] = useState(75);
  const [sliderTwo, setSliderTwo] = useState(80);
  const [sliderThree, setSliderThree] = useState(75);
  const [sliderFour, setSliderFour] = useState(90);
  const handleCarouselAutoplay = () => {
    const nextButton = document.querySelector('[data-bs-slide="next"]');
    if (nextButton) {
      nextButton.click(); // Simulate a click on the next button to move to the next slide
    }
  };

  // Start autoplay when the component mounts
  useEffect(() => {
    const interval = setInterval(handleCarouselAutoplay, 5000); // Set the interval to 5 seconds (5000ms)
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);
  return (
    <>
      <Navbar SecondNav="none" />
      {/* <div className="container-fluid Innovativesection"> */}
      <div className="container-fluid Innovativesection py-lg-0 py-md-0 py-5">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade h-100 w-100 d-lg-block d-md-block d-none"
          style={{
            objectFit: "cover",
            position: "absolute",
            zIndex: "-1",
            objectPosition: "center",
            height: "inherit",
          }}
        >
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100">
              <div className="container-fluid p-0 poppins h-100">
                <video
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  muted
                  loop
                  autoPlay
                >
                  <source src={video1} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="carousel-item h-100 ">
              <div className="container-fluid p-0 poppins h-100 ">
                <video
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  muted
                  loop
                  autoPlay
                >
                  <source src={video2} type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="carousel-item h-100">
              <div className="container-fluid p-0 poppins h-100">
                <video
                  width={"100%"}
                  height={"100%"}
                  style={{ objectFit: "cover", objectPosition: "center" }}
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

        <h3 className="text-center fw-semibold font-38 poppins">
          Empowering Business to thrive through
          <br /> Innovative Solutions.
        </h3>
      </div>
      {/* ================== MOBILE VERSION VIDEO SLIDER =============== */}
      <div className="container-fluid mt-4 d-lg-none d-md-none d-block">
        <div className="row justify-content-center ">
          <div
            className="col-sm-10 col-12 mbl-videoModal position-relative mb-4 "
            data-bs-toggle="modal"
            data-bs-target="#videoModal"
          >
            <img
              src={videoPlay}
              className="video-play"
              width={80}
              height={80}
              alt="w8"
            />
            <img src={videoImg} alt="w8" className="w-100 rounded-4" />
          </div>

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
      <div className="container-fluid poppins">
        <div className="row justify-content-center">
          <div className="col-9  Reviews ">
            <div className="d-flex justify-content-between mytab">
              <ul
                className="nav nav-pills w-100 justify-content-around  px-1"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active font-28"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Our Story
                  </button>
                </li>
                <a href="#Experts" className="nav-item" role="presentation">
                  <button
                    className="nav-link font-28"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Our Team
                  </button>
                </a>
                <a href="#slider" className="nav-item" role="presentation">
                  <button
                    className="nav-link font-28"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Client Reviews
                  </button>
                </a>
              </ul>
            </div>
          </div>
          <div className="tab-content mt-4" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex={0}
            >
              <Story />{" "}
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex={0}
            >
              <div className="poppins">
                <Client />
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
              tabIndex={0}
            >
              <div className="poppins">
                <Team />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------------OUR MISSION---------------- */}

      <div className="container mt-4 pb-4 mb-4">
        <h3 className="font-40 text-center fw-semibold specialized-line cocon">
          {" "}
          Our Missions
        </h3>
        <div className="d-flex justify-content-center">
          <img src={line} className="text-center" alt="" />
        </div>
        <div className="row mt-5  ">
          <div className="col-lg-6 col-12 poppins">
            <br className="d-lg-none   d-block" />
            <br className="d-lg-none   d-block" />
            <br className="d-lg-none   d-block" />
            <br className="d-lg-none d-md-block d-sm-block  d-none" />

            <h2 className="font-28 blackcolor">We are hired to provide</h2>
            <div className="d-flex align-items-center mt-3">
              <FiCheckCircle className="colororing flex-shrink-0" size={16} />
              <p className="mb-0 font-16 takegraycolor ms-3 ">
                Empowering Youth To Make Money online sitting at home
              </p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <FiCheckCircle className="colororing flex-shrink-0" size={16} />
              <p className="mb-0 font-16 takegraycolor ms-3 ">
                Empowering Women to be financially stable & independent{" "}
              </p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <FiCheckCircle className="colororing flex-shrink-0" size={16} />
              <p className="mb-0 font-16 takegraycolor ms-3 ">
                Make a digital world place where you can interact with thousands
                of intellectuals daily
              </p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <FiCheckCircle className="colororing flex-shrink-0" size={16} />
              <p className="mb-0 font-16 takegraycolor ms-3">
                Where You can get orders & get paid digitally without any scam
                frustration
              </p>
            </div>
            <div className="d-flex mt-3">
              <FiCheckCircle className="colororing flex-shrink-0" size={16} />
              <p className="mb-0 font-16 takegraycolor ms-3 ">
                GrapeTask is a place where you find such a level of experts who
                will convert your dream works into reality with highly super
                best quality
              </p>
            </div>
            <div className="container-fluid mt-3">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 d-flex align-items-center">
                  <img
                    src={skill}
                    className="flex-shrink-0"
                    width={50}
                    height={50}
                    alt="w8"
                  />
                  <p className="ms-3 fw-semibold mb-0 font-16">
                    Provide Skills{" "}
                    <br className="d-xl-none d-lg-block d-none" />
                    Services
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 align-items-center d-flex">
                  <img
                    src={support}
                    className="flex-shrink-0"
                    width={50}
                    height={50}
                    alt="w8"
                  />
                  <p className="ms-3 fw-semibold mb-0 font-16">
                    Urgent Support For Clients{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 mt-lg-0 mt-4 d-flex align-items-center">
            <img src={ourMission} className="w-100" alt="w8" />
          </div>
        </div>
      </div>

      <div className="container-fluid poppins  mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12 p-0">
            <img src={Experienced} className="w-100" alt="" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12 oringwhite ps-lg-5 ps-md-4">
            <h3 className=" font-40 fw-semibold specialized-line font-Garamond">
              We Are Specialised <br />
              And Experienced
            </h3>
            <p className="font-18  mt-lg-5 mt-md-4 mt-2">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium deleniti atque corrupti quosxcepturi odio
              dignissimos ducimus qui blanditiis sint occaecati .
            </p>
            <div className="row pt-lg-5 pt-md-4 pt-3 ">
              <div className="col-lg-8 col-md-9 col-12">
                <div className="d-flex justify-content-between">
                  <div>
                    <p>Project Success Ratio</p>
                  </div>
                  <div>
                    <p>{sliderOne}%</p>
                  </div>
                </div>
                <div className="about-slider">
                  <Slider
                    value={sliderOne}
                    onChange={(e) => setSliderOne(e.target.value)}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-9 col-12 mt-3">
                <div className="d-flex justify-content-between">
                  <div>Client Satifaction</div>
                  <div>{sliderTwo}%</div>
                </div>
                <div className="about-slider">
                  <Slider
                    value={sliderTwo}
                    onChange={(e) => setSliderTwo(e.target.value)}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-9 col-12 mt-3">
                <div className="d-flex justify-content-between">
                  <div>Client and Freelancers Relation</div>
                  <div>{sliderThree}%</div>
                </div>
                <div className="about-slider">
                  <Slider
                    value={sliderThree}
                    onChange={(e) => setSliderThree(e.target.value)}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-9 col-12 mt-3">
                <div className="d-flex justify-content-between">
                  <div>Expert Team </div>
                  <div>{sliderFour}%</div>
                </div>
                <div className="about-slider">
                  <Slider
                    value={sliderFour}
                    onChange={(e) => setSliderFour(e.target.value)}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUS;
