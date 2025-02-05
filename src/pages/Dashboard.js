import React from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import star6 from "../assets/5star.webp";
import user from "../assets/gigsRatingComments.webp";
import "react-circular-progressbar/dist/styles.css";
import Dashboardright from "../components/Dashboardright";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import timepes from "../assets/time.svg";
import bannerimg from "../assets/bannerimg.webp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { sellerRating } from "../redux/slices/ratingSlice";
import { formatDistanceToNow } from "date-fns";
import { AiFillStar } from "react-icons/ai";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, allRating } = useSelector((state) => state.rating);
  // console.log(allRating ,'all rating');
  useEffect(() => {
    dispatch(sellerRating());
  }, [dispatch]);
  // const ratings = userDetail.map((item) => parseFloat(item.ratings));
  // OUT Of 5
  const filterRating = allRating.filter(
    (value) => value !== null && !isNaN(value)
  );
  const overallAverageRating = parseInt(
    filterRating.reduce((acc, rating) => acc + rating, 0) / filterRating?.length
  );
  // console.log(overallAverageRating,'========alllRating with out Null Rating');
  // Average value 5
  const filterRatingFive = allRating.filter((value) => value == 5);
  const overallAverageFive =
    (filterRatingFive?.length / allRating?.length) * 100;
  // console.log(overallAverageFive,'=====filter 5');
  // Average value 4
  const filterRatingFour = allRating.filter((value) => value == 4);
  const overallAverageFour =
    (filterRatingFour?.length / allRating?.length) * 100;
  // console.log(overallAverageFour,'=====filter 4');
  const filterRatingThree = allRating.filter((value) => value == 3);
  const overallAverageThree =
    (filterRatingThree?.length / allRating?.length) * 100;
  // console.log(overallAverageThree,'=====filter 3');
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid pt-5">
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0">
          <div className="col-lg-4 col-12">
            <Dashboardright />
          </div>
          <div className="col-lg-8 col-12 mt-lg-0 mt-4">
            {/* <h3 className="byerLine font-20 font-500 cocon blackcolor">
              Overview
            </h3> */}
            {/* <div className="Revie">
              <div className="container">
                <div className=" Dashboard-mytab">
                  <ul
                    className="nav nav-pills mb-3 w-100 justify-content-between "
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active p-3"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Web Developer
                      </button>
                    </li>
                    <a href="#Experts" className="nav-item" role="presentation">
                      <button
                        className="nav-link p-3"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Work History
                      </button>
                    </a>
                    <a href="#slider" className="nav-item" role="presentation">
                      <button
                        className="nav-link p-3"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Portfolio
                      </button>
                    </a>
                  </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active poppins"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabIndex={0}
                  >
                    <div>
                      <p className="font-14 poppins textgray">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut turpis duis adipiscing sed risus fames. Vel ultricies
                        duis leo diam purus tristique lectus auctor duis.
                        Suspendisse commodo lobortis ut sit sed nunc id. Quam
                        dolor, eu semper diam, id netus massa nisl nunc. Metus
                        eget integer aliquam adipiscingtortor enim tortor nunc.
                        Quam pharetra augue tellus pellentesque porttitor
                        mattis. Viverra elit non suspendisse lectus facilisi
                        vitae facilisis ultrices.
                      </p>
                      <ul className="font-14 poppins textgray">
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut turpis duis adipiscing sed risus fames. Vel
                          ultricies duis leo diam purus tristique lectus auctor
                          duis. Suspendisse commodo lobortis ut sit sed nunc id.
                          Quam dolor, eu semper diam, id netus massa nisl nunc.
                        </li>
                        <li>
                          Metus eget integer aliquam adipiscing tortor enim
                          tortor nunc. Quam pharetra augue tellus pellentesque
                          porttitor mattis. Viverra elit non suspendisse lectus
                          facilisi vitae facilisis ultrices.
                        </li>
                      </ul>
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/applicants")}
                              className="cursor-pointer  boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">56</h4>
                                <p className="font-14 poppins ">
                                  Application sent
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 px-2 col-md-6 col-12 mt-lg-0 mt-3">
                            <div
                              onClick={() => navigate("/interview")}
                              className="cursor-pointer boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center"
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">10</h4>
                                <p className="font-14 poppins ">
                                  Interview Schedule
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 px-2 col-md-6 col-12 mt-lg-0 mt-3">
                            <div
                              onClick={() => navigate("/profile")}
                              className="cursor-pointer boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center"
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">
                                  150
                                </h4>
                                <p className="font-14 poppins ">
                                  Profile Visited
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    tabIndex={0}
                  >
                    <div>
                      <p className="font-14 poppins textgray">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut turpis duis adipiscing sed risus fames. Vel ultricies
                        duis leo diam purus tristique lectus auctor duis.
                        Suspendisse commodo lobortis ut sit sed nunc id. Quam
                        dolor, eu semper diam, id netus massa nisl nunc. Metus
                        eget integer aliquam adipiscingtortor enim tortor nunc.
                        Quam pharetra augue tellus pellentesque porttitor
                        mattis. Viverra elit non suspendisse lectus facilisi
                        vitae facilisis ultrices.
                      </p>
                      <ul className="font-14 poppins textgray">
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut turpis duis adipiscing sed risus fames. Vel
                          ultricies duis leo diam purus tristique lectus auctor
                          duis. Suspendisse commodo lobortis ut sit sed nunc id.
                          Quam dolor, eu semper diam, id netus massa nisl nunc.
                        </li>
                        <li>
                          Metus eget integer aliquam adipiscing tortor enim
                          tortor nunc. Quam pharetra augue tellus pellentesque
                          porttitor mattis. Viverra elit non suspendisse lectus
                          facilisi vitae facilisis ultrices.
                        </li>
                      </ul>
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/applicants")}
                              className="cursor-pointer  boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">56</h4>
                                <p className="font-14 poppins ">
                                  Application sent
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/interview")}
                              className="cursor-pointer boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center mt-lg-0 mt-3  "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">10</h4>
                                <p className="font-14 poppins ">
                                  Interview Schedule
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/profile")}
                              className="cursor-pointer boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center    mt-lg-0 mt-3  "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">
                                  150
                                </h4>
                                <p className="font-14 poppins ">
                                  Profile Visited
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                    tabIndex={0}
                  >
                    <div>
                      <p className="font-14 poppins textgray">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut turpis duis adipiscing sed risus fames. Vel ultricies
                        duis leo diam purus tristique lectus auctor duis.
                        Suspendisse commodo lobortis ut sit sed nunc id. Quam
                        dolor, eu semper diam, id netus massa nisl nunc. Metus
                        eget integer aliquam adipiscingtortor enim tortor nunc.
                        Quam pharetra augue tellus pellentesque porttitor
                        mattis. Viverra elit non suspendisse lectus facilisi
                        vitae facilisis ultrices.
                      </p>
                      <ul className="font-14 poppins textgray">
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut turpis duis adipiscing sed risus fames. Vel
                          ultricies duis leo diam purus tristique lectus auctor
                          duis. Suspendisse commodo lobortis ut sit sed nunc id.
                          Quam dolor, eu semper diam, id netus massa nisl nunc.
                        </li>
                        <li>
                          Metus eget integer aliquam adipiscing tortor enim
                          tortor nunc. Quam pharetra augue tellus pellentesque
                          porttitor mattis. Viverra elit non suspendisse lectus
                          facilisi vitae facilisis ultrices.
                        </li>
                      </ul>
                      <div className="container-fluid">
                        <div className="row ">
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/applicants")}
                              className="cursor-pointer  boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">56</h4>
                                <p className="font-14 poppins ">
                                  Application sent
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/interview")}
                              className="cursor-pointer boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center mt-lg-0 mt-3  "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">10</h4>
                                <p className="font-14 poppins ">
                                  Interview Schedule
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 px-2 col-md-6 col-12">
                            <div
                              onClick={() => navigate("/profile")}
                              className="cursor-pointer boxapplaction h-100 pt-4 pb-4 text-center d-flex align-items-center  justify-content-center    mt-lg-0 mt-3  "
                            >
                              <div>
                                <h4 className="font-45 font-600 poppins">
                                  150
                                </h4>
                                <p className="font-14 poppins ">
                                  Profile Visited
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="mt-5">
              <h3 className="font-20 byerLine mt-4 cocon">Rating & Reviews</h3>
              <div className="Revie">
                <div className="row justify-content-between mt-4 poppins">
                  <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                    <div className="cardrating text-center p-4">
                      <div>
                        <AiFillStar size={24} color="rgba(253, 176, 34, 1)" />
                        <AiFillStar size={24} color="rgba(253, 176, 34, 1)" />
                        <AiFillStar size={24} color="rgba(253, 176, 34, 1)" />
                        <AiFillStar size={24} color="rgba(253, 176, 34, 1)" />
                        <AiFillStar size={24} color="rgba(253, 176, 34, 1)" />
                      </div>
                      <h3
                        className="mt-2 font-28 fw-semibold"
                        style={{ opacity: "50%" }}
                      >
                        {overallAverageRating} out of 5
                      </h3>
                      <p className="mt-2 mb-0">Top Raiting</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-3 ">
                    <div className=" gig-rating-rewies">
                      <div className="row align-items-center">
                        <div className="col-2">
                          <p className="mb-0 font-14 takegraycolor">
                            5&nbsp;Stars
                          </p>
                        </div>
                        <div className="col-10">
                          <div
                            className="progress w-100 "
                            style={{ height: "8px" }}
                            role="progressbar"
                            aria-label="Warning example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar"
                              style={{ width: `${overallAverageFive}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center mt-4">
                        <div className="col-2">
                          <p className="mb-0 font-14 takegraycolor">
                            4&nbsp;Stars
                          </p>
                        </div>
                        <div className="col-10">
                          <div
                            className="progress w-100 "
                            style={{ height: "8px" }}
                            role="progressbar"
                            aria-label="Warning example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar"
                              style={{ width: `${overallAverageFour}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-center mt-4">
                        <div className="col-2">
                          <p className="mb-0 font-14 takegraycolor">
                            3&nbsp;Stars
                          </p>
                        </div>
                        <div className="col-10">
                          <div
                            className="progress w-100 "
                            style={{ height: "8px" }}
                            role="progressbar"
                            aria-label="Warning example"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="progress-bar "
                              style={{ width: `${overallAverageThree}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {userDetail
                  ? userDetail.map((value, index) => (
                      <div className="mt-3" key={index}>
                        <div className="d-flex justify-content-between mt-lg-5 mt-4">
                          <div className="d-flex">
                            <div>
                              <img
                                className="rounded-circle"
                                src={value.user ? value.user.image : ""}
                                width={50}
                                height={50}
                                alt="W8"
                              />
                            </div>
                            <p className="ms-2 font-16 fw-medium">
                              {value.user ? value.user.fname : "Name not found"}
                            </p>
                          </div>
                        </div>
                        <p className="mb-0 font-16 mt-3 takegraycolor text-capitalize ">
                          {value.comments}
                        </p>
                        <div className="d-flex justify-content-end align-items-center">
                          <img src={timepes} width={20} height={20} alt="w8" />
                          <p className="font-14 ms-1 fw-medium takegraycolor mb-0">
                            {formatDistanceToNow(new Date(value.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  : "Not Comments"}

                {/* <div className='mt-2 mb-5'>
                  <div className='d-flex justify-content-between mt-lg-5 mt-4'>
                    <div className='d-flex'>
                      <div><img src={user} width={50} height={50} alt="w8" /></div>
                      <p className='ms-2 font-16 fw-medium'>Lina</p>

                    </div>

                  </div>
                  <p className='mb-0 font-16 mt-3 takegraycolor'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen,integrates exclusively...</p>
                  <div className='d-flex justify-content-end align-items-center'>
                    <img src={timepes} width={20} height={20} alt="w8" />
                    <p className='font-14 ms-1 fw-medium takegraycolor mb-0'>3 Month</p>
                  </div>
                </div>
                <div className='mt-2 mb-5'>
                  <div className='d-flex justify-content-between mt-lg-5 mt-4'>
                    <div className='d-flex'>
                      <div><img src={user} width={50} height={50} alt="w8" /></div>
                      <p className='ms-2 font-16 fw-medium'>Lina</p>

                    </div>

                  </div>
                  <p className='mb-0 font-16 mt-3 takegraycolor'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen,integrates exclusively...</p>
                  <div className='d-flex justify-content-end align-items-center'>
                    <img src={timepes} width={20} height={20} alt="w8" />
                    <p className='font-14 ms-1 fw-medium takegraycolor mb-0'>3 Month</p>
                  </div>
                </div>
                <div className='mt-2 mb-5'>
                  <div className='d-flex justify-content-between mt-lg-5 mt-4'>
                    <div className='d-flex'>
                      <div><img src={user} width={50} height={50} alt="w8" /></div>
                      <p className='ms-2 font-16 fw-medium'>Lina</p>

                    </div>

                  </div>
                  <p className='mb-0 font-16 mt-3 takegraycolor'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen,integrates exclusively...</p>
                  <div className='d-flex justify-content-end align-items-center'>
                    <img src={timepes} width={20} height={20} alt="w8" />
                    <p className='font-14 ms-1 fw-medium takegraycolor mb-0'>3 Month</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-lg-5 p-md-4 p-3 mt-lg-5 mt-md-4 mt-3  poppins  ">
        <img src={bannerimg} className="w-100 rounded-3" alt="" />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
