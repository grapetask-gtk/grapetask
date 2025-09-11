import { Button } from "@mui/material";
import axios from "axios";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  AiFillDollarCircle,
  AiFillNotification,
} from "react-icons/ai";
import {
  FaFolderOpen,
  FaHandshake,
  FaPalette,
  FaPenNib
} from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { MdOutlineWeb, MdVideoLibrary } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Assets
import cheack from "../assets/cheack.webp";
import choose from "../assets/choose.webp";
import client from "../assets/client.webp";
import cost from "../assets/Cost.webp";
import done from "../assets/done.webp";
import get from "../assets/getwork.webp";
import goodcmpny from "../assets/goodcmpny.webp";
import pic2 from "../assets/heand.webp";
import Line from "../assets/hero-search-line.webp";
import hire from "../assets/hire.webp";
import line from "../assets/line.webp";
import make from "../assets/make.webp";
import pic3 from "../assets/massage.webp";
import pic1 from "../assets/people.webp";
import post from "../assets/post.webp";
import quality from "../assets/quality.webp";
import real from "../assets/real.webp";
import Secure from "../assets/Secure.webp";
import UserCheck from "../assets/UserCheck.webp";
import video2 from "../assets/video/Freelance2.mp4";
import video3 from "../assets/video/Freelance4.mp4";
import video1 from "../assets/video/Freelance5.mp4";

import { geAllGigs } from "../redux/slices/allGigsSlice";
import { useDispatch, useSelector } from "../redux/store/store";


// Lazy load components
const WelcomeModal = lazy(() => import("../components/WelcomeModal"));
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const GigCard = lazy(() => import("../components/GigCard"));
const Grapetask = lazy(() => import("../components/Grapetask"));
const TopRatedSaller = lazy(() => import("../components/TopRatedSaller"));
const Highest = lazy(() => import("../components/Highest"));
const Testomonial = lazy(() => import("../components/Testomonial"));
const Treusted = lazy(() => import("../components/Treusted"));


const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gigsDetail, isLoading } = useSelector((state) => state.allGigs);
  
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [topRated, setTopRated] = useState("");
  const [showLess, setShowLess] = useState(false);
  const [email, setEmail] = useState(null);
  const [subscribeLoader, setSubscribeLoader] = useState(null);
  const [videosLoaded, setVideosLoaded] = useState(false);

  const handleSearch = useCallback((e) => {
    if (e) e.preventDefault();
    const searchData = {
      search: search,
      location: location,
    };
    navigate("/search/gigs", { state: { data: searchData } });
  }, [search, location, navigate]);

  const handleTopRatedFreelancer = useCallback((e) => {
    if (e) e.preventDefault();
    navigate("/MeetTopRatedFreelancer", { state: { dataTopRated: topRated } });
  }, [topRated, navigate]);

  const handleShowLess = useCallback(() => {
    setShowLess(!showLess);
  }, [showLess]);

  useEffect(() => {
    dispatch(geAllGigs());
    
    // Delay video loading for better initial page load
    const videoTimer = setTimeout(() => {
      setVideosLoaded(true);
    }, 2000);
    
    return () => clearTimeout(videoTimer);
  }, [dispatch]);

  const submitNewsLetter = useCallback(() => {
    if (!email) return;
    
    setSubscribeLoader(true);
    let data = JSON.stringify({
      email: email,
    });
    
    axios.post(
      "https://script.google.com/macros/s/AKfycbw8B3MLphi7MrtKxCHaceDoRLNlREzyqt1trDdva2c9uUeq4B8wDpSuA4t0-n9lQn71/exec",
      data,
      {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    )
    .then((response) => {
      setSubscribeLoader(false);
      setEmail(null);
      toast.success("Thank you for Subscribing GrapeTask", {
        position: "top-right",
        autoClose: 2000,
      });
    })
    .catch((error) => {
      console.error("Subscription error:", error);
      setSubscribeLoader(false);
    });
  }, [email]);

  const Real_Freelancer = gigsDetail.flatMap(object => object.gigs || []);

  // Simple image with loading state
  const OptimizedImage = ({ src, alt, className, style, width, height }) => {
    const [loaded, setLoaded] = useState(false);
    
    return (
      <>
        {!loaded && (
          <div 
            className={`${className} loading-placeholder`} 
            style={style}
          ></div>
        )}
        <img 
          src={src} 
          alt={alt} 
          className={className} 
          style={{ ...style, display: loaded ? 'block' : 'none' }}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </>
    );
  };
  const LoadingSpinner = ({ message = "Loading...", size = "default" }) => {
  const sizeClass = size === "small" ? "spinner-border-sm" : "";
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );
};

  // Video Player Component without external dependencies
  const VideoPlayer = ({ src, className, style, controls = false }) => {
    return (
      <video
        width={"100%"}
        height={"100%"}
        style={{ ...style, objectFit: "cover" }}
        muted
        loop
        autoPlay={!controls}
        controls={controls}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  };

  return (
    <>
           <Suspense fallback={
 <LoadingSpinner message="Loading GrapeTask..." />
}>
        <WelcomeModal />
        <Navbar SecondNav="none" />
        
        {/* Hero Section */}
       {/* Hero Section */}
<section className="herosection d-flex flex-column align-items-center justify-content-center py-lg-0 py-md-0 py-5">

  {/* Desktop Video Background */}
  {videosLoaded && (
    <div
      className="carousel slide carousel-fade h-100 w-100 d-lg-block d-md-block d-none"
      style={{ objectFit: "cover", position: "absolute", zIndex: "-1" }}
    >
      <div className="carousel-inner h-100">
        <div className="carousel-item active h-100">
          <VideoPlayer
            src={video1}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item h-100">
          <VideoPlayer
            src={video2}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item h-100">
          <VideoPlayer
            src={video3}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  )}

  {/* Hero Content */}
  <div className="container-fluid p-lg-5 p-md-4 p-3">
    <div className="row justify-content-center text-center">
      <div className="col-lg-8 col-12">
        <h2 className="font-70 font-500 cocon text-white">
          Find the Business,<span className="colororing"> Get Paid, </span>
          <br />
          Grow Your <span className="colororing">Career </span>
        </h2>
        <p className="font-18 text-white poppins">
          Join a top freelance marketplace and connect with clients worldwide.
          New job postings every day—browse, apply, and start earning.
          Work from anytime, anywhere.
        </p>

        {/* Search Form */}
        <div className="row justify-content-center mt-2 poppins position-relative" style={{ zIndex: "99" }}>
          <form
            className="col-12 border-box pt-3 align-items-center justify-content-around pb-3 hero-input"
            onSubmit={handleSearch}
          >
            {/* Job Title Field */}
            <div className="d-flex align-items-center hero_Search_Field">
              <RiSearchLine size={20} color="#F16336" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 ms-2 w-100 font-16 poppins"
                placeholder="Job title or keyword"
                required
                aria-label="Job title or keyword"
              />
            </div>

            {/* Divider (Desktop only) */}
            <OptimizedImage
              src={Line}
              width={4}
              height={30}
              className="d-lg-flex d-md-flex d-sm-flex d-none"
              alt="Divider line"
            />

            {/* Location Field */}
            <div className="d-flex align-items-center hero_Search_Field mt-lg-0 mt-md-0 mt-sm-0 mt-3">
              <GoLocation size={20} color="#F16336" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-0 ms-3 w-100 font-16"
                placeholder="Canada, Ontario"
                required
                aria-label="Location"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-lg-0 mt-md-0 mt-sm-0 mt-3">
              <Button
                type="submit"
                className="btn-stepper rounded-5 poppins px-3 font-16"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  {/* Mobile Video Section */}
  <div className="container-fluid d-lg-none d-md-none d-block">
    <div className="row justify-content-center p-0">
      <div className="col-12 mbl-videoModal position-relative p-0">
        <VideoPlayer
          src={video1}
          className="w-100"
          style={{ height: "auto", objectFit: "cover" }}
          controls={true}
        />
      </div>
    </div>
  </div>
</section>

        {/* Get Work Done Section */}
        <div className="container-fluid esaysection position-relative pt-lg-5 pt-md-4 pt-3">
          <OptimizedImage 
            src={done} 
            className="w-100 position-absolute doneimg" 
            alt="Outsourcing" 
          />

          <div className="d-flex justify-content-center flex-column mt-5">
            <h1 className="text-center font-28 cocon">
              GrapeTask World's No. 1 Outsourcing Freelance Marketplace
            </h1>
            <div className="d-flex justify-content-center">
              <OptimizedImage src={line} alt="" />
            </div>
          </div>
          
          <Suspense fallback={<div>Loading GrapeTask...</div>}>
            <div className="row justify-content-center mt-5 px-3 pb-lg-0 p-md-0 p-0 poppins">
              <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                <Grapetask
                  imges={post}
                  heading="Post a Job & Hire Top Talent"
                  para="GrapeTask connects you with top freelancers. Post your job, review proposals, and hire the best in minutes"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-lg-5 mt-md-5 mt-4">
                <Grapetask
                  imges={hire}
                  heading="Find Experts, Get Work Done"
                  para="Connect with skilled freelancers across various industries. Hire experts who deliver quality work on time"
                />
              </div>
            </div>
            <div className="row justify-content-center px-3 pb-lg-0 p-md-0 p-0 poppins">
              <div className="col-lg-4 col-md-4 col-sm-6 mt-lg-0 mt-md-0 mt-sm-0 mt-4 col-12">
                <Grapetask
                  imges={get}
                  heading="Accomplish Tasks"
                  para="Browse skilled freelancers, place an order, and get your work delivered on time guaranteed"
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-lg-5 mt-md-5 mt-4">
                <Grapetask
                  imges={make}
                  heading="Payment Assurance"
                  para="Pay confidently with our secure payment system and enjoy risk-free transactions every time"
                />
              </div>
            </div>
          </Suspense>
        </div>
        
        <br />
        <br className="d-lg-block d-none" />
        <br className="d-lg-block d-none" />
        <br className="d-lg-block d-none" />
        
        {/* How Good Companies Section */}
        <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 ">
          <div className="row poppins justify-content-center ">
            <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-center justify-content-center">
              <OptimizedImage 
                src={goodcmpny} 
                className="w-75" 
                alt="hire freelancers with grapetask" 
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 align-self-center">
              <h2 className="fw-normal font-38">
                Success Happens{" "}
                <span className="colororing">When The Right People Connect</span>
              </h2>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-10 col-12 mt-4">
                    <div className="row">
                      <div className="col-2 d-flex justify-content-center">
                        <OptimizedImage src={pic1} className="w-100" alt="Connect with professionals" />
                      </div>
                      <div className="col-10">
                        <p className="font-18 mb-0" style={{ color: "rgba(102, 112, 133, 1)" }}>
                          Connect with skilled professionals ready to take on your next big project
                        </p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-2 d-flex justify-content-center">
                        <OptimizedImage src={pic2} className="w-75" alt="Manage contracts" />
                      </div>
                      <div className="col-10">
                        <p className="font-18 mb-0" style={{ color: "rgba(102, 112, 133, 1)" }}>
                          Manage contracts, track progress, and pay securely all in one simple platform
                        </p>
                      </div>
                    </div>
                    
                    <div className="row mt-3">
                      <div className="col-2 d-flex justify-content-center">
                        <OptimizedImage src={pic3} className="w-75" alt="Reliable outsourcing" />
                      </div>
                      <div className="col-10">
                        <p className="font-18 mb-0" style={{ color: "rgba(102, 112, 133, 1)" }}>
                          A reliable outsourcing website to find skilled experts and scale your business
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate("/aboutus")}
                className="btn-fill mt-4 ms-lg-2 ms-md-2 ms-sm-2 ms-0 font-16"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        
        {/* Top Rated Freelancers Section */}
        <section className="container-fluid top-rated-saler d-flex align-items-center position-relative px-lg-3 px-0">
          <div className="container h-100">
            <div className="row justify-content-between h-100 ">
              <div className="col-lg-6 mt-lg-0 mt-4 col-12 d-flex align-items-center h-100">
                <div className="w-100">
                  <h5 className="cocon font-30 fw-semibold text-white">
                    Meet Our <span className="colororing"> Top-Rated</span> Freelancers
                  </h5>
                  <form 
                    className="border-box px-3 pt-3 align-items-center d-flex justify-content-between pb-3 hero-input"
                    onSubmit={handleTopRatedFreelancer}
                  >
                    <input
                      type="text"
                      value={topRated}
                      onChange={(e) => setTopRated(e.target.value)}
                      className="border-0 ms-2 w-100 font-16 poppins"
                      required
                      placeholder="What are you looking for?"
                      aria-label="Search top rated freelancers"
                    />
                    <div className="">
                      <Button
                        type="submit"
                        className="btn-stepper rounded-5 poppins px-3 font-16"
                      >
                        Search
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-12 mt-lg-0 mt-4 top-rated-saller-cards h-100 px-lg-3 px-0">
                <Suspense fallback={<div>Loading freelancers...</div>}>
                  <TopRatedSaller />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
        
        {/* Choose Categories Section */}
        <div className="container-fluid position-relative mt-5 p-lg-5 p-md-5 p-sm-4 p-3">
          <OptimizedImage
            src={choose}
            className="position-absolute chooseimg end-0"
            alt=""
          />
          <h3 className="font-28 text-center cocon">Browse & Choose Categories</h3>
          
          {/* Categories List */}
          <div className="row justify-content-center poppins">
            <div className="d-flex justify-content-center mb-lg-0 mb-3">
              <OptimizedImage src={line} alt="" />
            </div>

            {/* Category Items */}
            {[
              { icon: <AiFillNotification size={30} />, title: "Marketing & Communication", jobs: "58" },
              { icon: <FaPenNib size={35} />, title: "UI / UX Design", jobs: "120" },
              { icon: <AiFillDollarCircle size={35} />, title: "Finance Management", jobs: "230" },
              { icon: <MdOutlineWeb size={35} />, title: "Web Development", jobs: "100" },
              { icon: <FaFolderOpen size={35} />, title: "Project Management", jobs: "87" },
              { icon: <FaHandshake size={35} />, title: "Business & Consulting", jobs: "23" },
              { icon: <FaPalette size={35} />, title: "Graphic Designer", jobs: "65" },
              { icon: <MdVideoLibrary size={35} />, title: "Video Editor", jobs: "120" },
            ].slice(0, showLess ? 8 : 4).map((category, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-12 mt-lg-5 mt-md-4 mt-sm-3 mt-2">
                <div className="container-fluid h-100">
                  <div className="row mycard p-3 align-items-center h-100">
                    <div className="col-3 text-center">
                      {category.icon}
                    </div>
                    <div className="col-9">
                      <h4 className="font-20">{category.title}</h4>
                      <p className="mb-0 font-14">{category.jobs} Jobs Available</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="col-12 mt-3 text-center">
              <button 
                onClick={handleShowLess} 
                className="btn btn-link text-decoration-none"
                aria-expanded={showLess}
                aria-controls="categories-list"
              >
                {showLess ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>

        {/* Make it Real with Freelancer Section */}
        <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 mt-4 position-relative overflow-hidden">
          <OptimizedImage 
            src={real} 
            className="position-absolute realimg start-0" 
            alt="" 
          />
          <h3 className="text-center font-28 font-500 cocon">
            Get It Done with Expert Freelancers
          </h3>
          <div className="d-flex justify-content-center">
            <OptimizedImage src={line} alt="" />
          </div>
          
          <div className="row mt-4">
            <Suspense fallback={<div>Loading gigs...</div>}>
              {Real_Freelancer.slice(0, 8).map((value, index) => (
                <GigCard key={index} gig={value} />
              ))}
            </Suspense>
            
            <div className="container-fluid">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-2 col-md-3 col-sm-4 col-10 poppins">
                  <Button
                    type="button"
                    onClick={() => navigate("/search/gigs")}
                    className="btn-stepper mt-lg-5 mt-md-4 mt-3 px-4 py-2"
                  >
                    View all
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Section */}
        <div className="container-fluid text-white mt-lg-5 mt-md-4 mt-3 poppins" style={{ backgroundColor: "#F16336" }}>
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center">
                <div>
                  <h3 className="font-28 font-500 cocon">
                    Why Businesses Trust GrapeTask
                  </h3>
                  <div className="mt-3">
                    {[
                      { icon: quality, title: "Verified Professionals", text: "Review expert portfolios, client feedback, and credentials before hiring." },
                      { icon: cost, title: "No start-up costs", text: "Post your job, interview candidates, and only pay when you're satisfied." },
                      { icon: Secure, title: "Secure Transactions", text: "We protect your payments and data with trusted security measures." },
                      { icon: UserCheck, title: "Hassle-Free Hiring", text: "A simple, intuitive platform designed for smooth collaboration." },
                    ].map((item, index) => (
                      <div key={index} className="mt-4 d-flex">
                        <OptimizedImage src={item.icon} width={30} height={39} alt="" />
                        <div className="ms-3">
                          <h5 className="font-20">{item.title}</h5>
                          <p className="font-16">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 position-relative">
                <div className="text-end">
                  <OptimizedImage
                    src={client}
                    className="imgwhrd"
                    width={"70%"}
                    alt="Client illustration"
                  />
                </div>
                <div className="chakimgesbox">
                  {[
                    "The best for every budget",
                    "Quality work done quickly",
                    "Protected payments, every time",
                    "24/7 support"
                  ].map((text, index) => (
                    <div key={index} className="d-flex">
                      <OptimizedImage
                        src={cheack}
                        width={20}
                        height={20}
                        className="me-4"
                        alt="Checkmark"
                      />
                      <p className="font-16">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Sections */}
             <Suspense fallback={
  <div className="trusted-section-loading">
    <div className="loading-spinner"></div>
    <p>Loading  testomonials...</p>
  </div>
}>
          <Highest />
          <Testomonial />
        </Suspense>
        
        {/* Newsletter Section */}
        <div className="container subrib d-flex align-items-center" id="subscribe">
          <div className="row px-4">
            <div className="col-lg-6 col-md-6 col-12 px-lg-4 px-3">
              <h6 className="poppins font-40 text-white fw-semibold">
                Never Want to Miss Any Job News?
              </h6>
            </div>
            <div className="col-lg-6 col-md-6 col-12 px-3">
              <div className="row justify-conten-center mt-2 poppins position-relative">
                <div className="col-lg-10 col-md-12 border-box pt-3 align-items-center d-flex justify-content-around pb-3 hero-input">
                  <div className="d-flex align-items-center w-100">
                    <input
                      type="email"
                      value={email || ''}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 w-100 font-16"
                      placeholder="Enter your email address here..."
                      aria-label="Email for newsletter"
                    />
                  </div>
                  <OptimizedImage src={Line} width={4} height={30} alt="Divider" />

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
        
        {/* Trusted Section */}
       <Suspense fallback={
  <div className="trusted-section-loading">
    <div className="loading-spinner"></div>
    <p>Loading trusted companies...</p>
  </div>
}>
  <Treusted />
</Suspense>
        
        <Footer />
        <ToastContainer />
      </Suspense>
    </>
  );
};

export default Index;