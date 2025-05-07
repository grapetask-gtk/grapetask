<<<<<<< HEAD
import React, { useEffect } from "react";
import busnis from "../assets/busnis.webp";
import loptop from "../assets/laptop.webp";
=======
// src/pages/Blog.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import busnis from "../assets/busnis.webp";
>>>>>>> d918fe2 (cahnges by abdul qavi)
import img1 from "../assets/Client-logo1.webp";
import img2 from "../assets/Client-logo2.webp";
import img3 from "../assets/Client-logo3.webp";
import img4 from "../assets/Client-logo4.webp";
import img5 from "../assets/Client-logo5.webp";
<<<<<<< HEAD
import CommonHelmet from "./CommonHelmet.js";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import line from "../assets/line.webp";
import video1 from "../assets/video/Freelance9.mp4";
import video2 from "../assets/video/Freelance3.mp4";
import video3 from "../assets/video/Freelance8.mp4";
import videoImg from "../assets/blogVideoImg.webp";
import videoPlay from "../assets/VideoPlay.webp";

const Blog = () => {
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
      <CommonHelmet
        title=" Blog | GrapeTask Connecting World's Businesses and Talent"
        name="description"
        content="Grapetask mission is to change how the world works together. We connect businesses with freelancers offering life-changing digital services in 500+ categories."
        keywords="blog, Grapetask, hire freelancers, freelance marketplace, online marketplace"
        canonical="https://www.grapetask.co/blog"
      />
      <Navbar SecondNav="none" />
      <div>
        <div className="container-fluid blogVideoSection py-lg-0 py-md-0 py-5">
          {/* <video width={'100%'}  muted loop autoPlay style={{ objectFit: 'cover', position: 'absolute', zIndex: '-1',objectPosition: 'center',height:'inherit'
      }}>
          <source src={videoHerosection} type="video/mp4" />
        </video> */}
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade w-100 h-100 d-lg-block d-md-block d-none"
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
          <h1 className="text-center fw-semibold font-38 poppins">
            Freelance Marketplace Blog!
            <br /> Insights, Tips & Trends from GrapeTask
          </h1>
        </div>
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
      {/* 
      <div className="container-fluid imagesbackground poppins">
        <h3 className='font-38 fw-semibold text-center'>Empowering Business to thrive through <br />
          Innovative Solutions.</h3>
      </div> */}
      <div className="container-fluid px-lg-5 px-md-5 px-sm-4 px-3 pt-lg-5 pt-md-4 pt-2 mt-lg-5 mt-md-4 mt-3 poppins  mb-lg-5 mb-md-4 mb-3">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <img src={blogs} className="w-100 rounded-4" alt="" />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <p className="colororing font-16">
              {" "}
              Article | Sunday, March 3, 2025{" "}
            </p>
            <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
            <h1 className="font-28 font-600">
            The Best Fiverr Alternative: Why GrapeTask is <br />
            the Future of Freelancing.
            </h1>
            <p className="font-18 takegraycolor">
            Freelancing has transformed how businesses and individuals connect
              with talent worldwide. With platforms like Fiverr and Upwork
              dominating the industry, freelancers are always looking for better
              opportunities with lower fees, while clients seek reliable
              professionals without overpaying.
            </p>
            <a href="/" className="colororing font-16">
              Read More
            </a>
          </div>
        </div>
      </div>
      <div className="container-fluid px-lg-5 px-md-5 px-sm-4 px-3">
        <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
      </div>
      <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3  poppins  ">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-12">
            <img src={blogs} className="w-100 rounded-3" alt="" />
            <div className=" mt-3 mb-3 d-flex justify-content-between colororing">
              <p className="mb-0 font-16">
              Article|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Sunday, March 3, 2025
              </p>
            </div>

            <div className="">
              <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
              <h1 className="font-20 font-600">
              The Best Fiverr Alternative: Why GrapeTask is <br />
              the Future of Freelancing.
              </h1>
              <p>
                There are of Lorem Ipsum available, but the majority have su
                alteration in some form, by injected oir which don't look even
                slightly believable.
              </p>
              <Link to="/Blogopen">
                <p className="colororing font-16">Read More</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <img src={loptop} className="w-100 rounded-3" alt="" />
            <div className=" mt-3 mb-3 d-flex justify-content-between colororing">
              <p className="mb-0 font-16">
                Legal Advice&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Sunday, July
                24, 2022
              </p>
            </div>

            <div className="">
              <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
              <h6 className="font-20 font-600">
                An Independent Examination Of <br />
                Charity Accounts
              </h6>
              <p>
                There are of Lorem Ipsum available, but the majority have su
                alteration in some form, by injected oir which don't look even
                slightly believable.
              </p>
              <Link to="/Blogopen">
                <p className="colororing font-16">Read More</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <img src={loptop} className="w-100 rounded-3" alt="" />
            <div className=" mt-3 mb-3 d-flex justify-content-between colororing">
              <p className="mb-0 font-16">
                Legal Advice&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Sunday, July
                24, 2022
              </p>
            </div>

            <div className="">
              <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
              <h6 className="font-20 font-600">
                An Independent Examination Of <br />
                Charity Accounts
              </h6>
              <p>
                There are of Lorem Ipsum available, but the majority have su
                alteration in some form, by injected oir which don't look even
                slightly believable.
              </p>
              <Link to="/Blogopen">
                <p className="colororing font-16">Read More</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <img src={loptop} className="w-100 rounded-3" alt="" />
            <div className=" mt-3 mb-3 d-flex justify-content-between colororing">
              <p className="mb-0 font-16">
                Legal Advice&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Sunday, July
                24, 2022
              </p>
            </div>

            <div className="">
              <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
              <h6 className="font-20 font-600">
                An Independent Examination Of <br />
                Charity Accounts
              </h6>
              <p>
                There are of Lorem Ipsum available, but the majority have su
                alteration in some form, by injected oir which don't look even
                slightly believabl.
              </p>
              <Link to="/Blogopen">
                <p className="colororing font-16">Read More</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <img src={loptop} className="w-100 rounded-3" alt="" />
            <div className=" mt-3 mb-3 d-flex justify-content-between colororing">
              <p className="mb-0 font-16">
                Legal Advice&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Sunday, July
                24, 2022
              </p>
            </div>

            <div className="">
              <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
              <h6 className="font-20 font-600">
                An Independent Examination Of <br />
                Charity Accounts
              </h6>
              <p>
                There are of Lorem Ipsum available, but the majority have su
                alteration in some form, by injected oir which don't look even
                slightly believable.
              </p>
              <Link to="/Blogopen">
                <p className="colororing font-16">Read More</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <img src={loptop} className="w-100 rounded-3" alt="" />
            <div className=" mt-3 mb-3 d-flex justify-content-between colororing">
              <p className="mb-0 font-16">
                Legal Advice&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Sunday, July
                24, 2022
              </p>
            </div>

            <div className="">
              <hr style={{ opacity: "1", backgroundColor: "#3A4553" }} />
              <h6 className="font-20 font-600">
                An Independent Examination Of <br />
                Charity Accounts
              </h6>
              <p>
                There are of Lorem Ipsum available, but the majority have su
                alteration in some form, by injected oir which don't look even
                slightly believable.
              </p>
              <Link to="/Blogopen">
                <p className="colororing font-16">Read More</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-lg-5 p-md-4 p-3 mt-lg-5 mt-md-4 mt-3  poppins  ">
        <h3 className="font-40 cocon font-500 text-center">
          Meet The Partners
        </h3>
        <div className="d-flex justify-content-center">
          <img src={line} className="text-center" alt="" />
        </div>
        <div className="row justify-content-around mt-4">
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-lg-2 mt-md-2 mt-sm-4 mt-5">
            <img src={img1} className="w-100" alt="w8" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-lg-2 mt-md-2 mt-sm-4 mt-5">
            <img src={img2} className="w-100" alt="w8" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-lg-2 mt-md-2 mt-sm-4 mt-5">
            <img src={img3} className="w-100" alt="w8" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-lg-2 mt-md-2 mt-sm-4 mt-5">
            <img src={img4} className="w-100" alt="w8" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-lg-2 mt-md-2 mt-sm-4 mt-5">
            <img src={img5} className="w-100" alt="w8" />
          </div>
        </div>
      </div>
      {/* footer */}
=======
import loptop from "../assets/laptop.webp";
import line from "../assets/line.webp";
import video2 from "../assets/video/Freelance3.mp4";
import video3 from "../assets/video/Freelance8.mp4";
import video1 from "../assets/video/Freelance9.mp4";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchBlogs } from "../redux/slices/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const { list: blogs, isLoading, error } = useSelector((state) => state.blogs);

  // Carousel autoplay
  const handleCarouselAutoplay = () => {
    const nextButton = document.querySelector('[data-bs-slide="next"]');
    nextButton?.click();
  };

  useEffect(() => {
    dispatch(fetchBlogs());
    const interval = setInterval(handleCarouselAutoplay, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <Navbar SecondNav="none" />

      {/* Hero Video Section */}
      <div className="container-fluid blogVideoSection py-lg-0 py-md-0 py-5">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade w-100 h-100 d-lg-block d-md-block d-none"
          style={{
            objectFit: "cover",
            position: "absolute",
            zIndex: "-1",
            objectPosition: "center",
            height: "inherit",
          }}
        >
          <div className="carousel-inner h-100">
            {[video1, video2, video3].map((src, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""} h-100`}
              >
                <div className="container-fluid p-0 poppins h-100">
                  <video
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    muted
                    loop
                    autoPlay
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev d-none" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next d-none" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h1 className="text-center fw-semibold font-38 poppins">
          Freelance Marketplace Blog!<br />Insights, Tips & Trends from GrapeTask
        </h1>
      </div>

      {/* Blog Content */}
      <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 poppins">
        {isLoading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <p className="text-danger">Error loading blogs: {error}</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <> 
            {/* Featured Blog */}
            <div className="row mb-5">
              <div className="col-lg-6 col-md-6 col-12">
                <img
                  src={blogs[0].imageUrl || busnis}
                  className="w-100 rounded-4"
                  alt={blogs[0].title}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <p className="colororing font-16">
                  {blogs[0].category} | {new Date(blogs[0].created_at).toLocaleDateString()}
                </p>
                <hr style={{ opacity: 1, backgroundColor: "#3A4553" }} />
                <h4 className="font-28 font-600">{blogs[0].title}</h4>
                <p className="font-18 takegraycolor">{blogs[0].excerpt}</p>
                <Link to={`/blog/${blogs[0].id}`} className="colororing font-16">
                  Read More
                </Link>
              </div>
            </div>

            {/* Remaining Blogs Grid */}
            <div className="row justify-content-center">
              {blogs.slice(1).map((blog) => (
                <div key={blog.id} className="col-lg-4 col-md-6 col-12 mb-4">
                  <img
                    src={blog.imageUrl || loptop}
                    className="w-100 rounded-3"
                    alt={blog.title}
                  />
                  <div className="mt-3 mb-3 d-flex justify-content-between colororing">
                    <p className="mb-0 font-16">
                      {blog.category} | {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <hr style={{ opacity: 1, backgroundColor: "#3A4553" }} />
                  <h6 className="font-20 font-600">{blog.title}</h6>
                  <p>{blog.excerpt}</p>
                  <Link to={`/blog/${blog.id}`} className="colororing font-16">
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Partners Section */}
      <div className="container-fluid p-lg-5 p-md-4 p-3 mt-lg-5 mt-md-4 mt-3 poppins">
        <h3 className="font-40 cocon font-500 text-center">Meet The Partners</h3>
        <div className="d-flex justify-content-center">
          <img src={line} className="text-center" alt="divider" />
        </div>
        <div className="row justify-content-around mt-4">
          {[img1, img2, img3, img4, img5].map((src, idx) => (
            <div key={idx} className="col-lg-2 col-md-4 col-sm-6 col-12 d-flex align-items-center justify-content-center mt-5">
              <img src={src} className="w-100" alt={`Partner ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>

>>>>>>> d918fe2 (cahnges by abdul qavi)
      <Footer />
    </>
  );
};

export default Blog;
