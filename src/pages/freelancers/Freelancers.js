import React, { useState } from "react";
import { useDispatch, useSelector } from "../../redux/store/store";
import search from "../../assets/searchbar.webp";
import NewWay from "../../assets/NewWay.webp";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { geAllGigs } from "../../redux/slices/allGigsSlice";
import { useEffect } from "react";
import { getCategory } from "../../redux/slices/gigsSlice";
import Loader from "../../assets/LoaderImg.gif";
import video1 from "../../assets/video/Freelance9.mp4";
import video2 from "../../assets/video/Freelance3.mp4";
import video3 from "../../assets/video/Freelance8.mp4";
import videoImg from "../../assets/blogVideoImg.webp";
import videoPlay from "../../assets/VideoPlay.webp";
import GigCard from "../../components/GigCard";
const Freelancers = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectCategory, setSelectCategory] = useState("");
  const dispatch = useDispatch();
  const { gigsDetail, isLoading } = useSelector((state) => state.allGigs);
  const { userCategory } = useSelector((state) => state.gig);

  const navigate = useNavigate();
  // =================
  // GET DATA IN APIS
  // ================

  useEffect(() => {
    dispatch(geAllGigs());
    dispatch(getCategory());
  }, [dispatch]);
  // console.log(gigsDetail, '===============allGigs');
  // get the text ---and finish the style -----
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
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
      <Navbar FirstNav="none" />
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
          <h3 className="text-center fw-semibold font-38 poppins">
            Empowering Business to thrive through
            <br /> Innovative Solutions.
          </h3>
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
      <div className="container my-4">
        <div className="row justify-content-end  allgigs-field poppins">
          <div className="col-lg-3 col-md-4 col-sm-5 col-12 ">
            <select
              className="form-select p-2 font-16 h-100 me-le-3"
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option selected>All Categories</option>
              {userCategory.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-4 pe-lg-0">
            <form class="input-group p-2 h-100" role="search">
              <span class="input-group-text pt-0 pb-0" id="basic-addon1">
                <img src={search} width={16} alt="" />
              </span>
              <input
                type="search"
                className="form-control p-0 font-12"
                id="floatingInputGroup1"
                placeholder="Search"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="text-center">
          <img src={Loader} width={200} height={200} />
        </div>
      )}
      {gigsDetail.map((outerValue, index) => (
        <div
          className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5"
          key={index}
        >
          <div className="row ">
            {selectCategory === "" || selectCategory === "All Categories" ? (
              <>
                <h4 className="font-24 poppins fw-bold pb-2">
                  Most popular Gigs in{" "}
                  <span className="colororing">{outerValue.name}</span>
                </h4>
                {outerValue.gigs
                  .filter(
                    (innerValue) =>
                      (innerValue.title &&
                        innerValue.title
                          .toLowerCase()
                          .includes(searchKeyword.toLowerCase())) || // Filter by title
                      (innerValue.description &&
                        innerValue.description
                          .toLowerCase()
                          .includes(searchKeyword.toLowerCase())) // Filter by description
                  )
                  .map((innerValue) => (
                    <GigCard gig={innerValue} />
                  ))}
              </>
            ) : (
              <>
                <h4 className="font-24 poppins fw-bold pb-2">
                  Most popular Gigs in{" "}
                  <span className="colororing">{outerValue.name}</span>
                </h4>
                {outerValue.gigs
                  // .filter((innerValue) => !selectCategory || innerValue.category_id === selectCategory)
                  .filter(
                    (innerValue) =>
                      innerValue.category_id === selectCategory && // Filter by selected category
                      ((innerValue.title &&
                        innerValue.title
                          .toLowerCase()
                          .includes(searchKeyword.toLowerCase())) ||
                        (innerValue.description &&
                          innerValue.description
                            .toLowerCase()
                            .includes(searchKeyword.toLowerCase())))
                  )

                  .map((innerValue) => (
                    <GigCard gig={innerValue} />
                  ))}
              </>
            )}
            {((selectCategory === "" || selectCategory === "All Categories") &&
              outerValue.gigs.filter(
                (innerValue) =>
                  (innerValue.title &&
                    innerValue.title
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase())) ||
                  (innerValue.description &&
                    innerValue.description
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase()))
              ).length === 0) ||
            (selectCategory !== "" &&
              selectCategory !== "All Categories" &&
              outerValue.gigs.filter(
                (innerValue) =>
                  innerValue.category_id === selectCategory &&
                  ((innerValue.title &&
                    innerValue.title
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase())) ||
                    (innerValue.description &&
                      innerValue.description
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())))
              ).length === 0) ? (
              <div className="col-12 mt-4">
                <p className="text-center font-24 poppins fw-semibold">
                  Not Found
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
      <div className="container justify-content-center px-0  p-5">
        <img src={NewWay} className="w-100 rounded-3" alt="w8" />
      </div>
    </>
  );
};

export default Freelancers;
