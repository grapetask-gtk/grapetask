import React from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import Navbar from "../components/Navbar";
// import pen from "../assets/pen.webp";
import { CircularProgressbar } from "react-circular-progressbar";
import doubl from "../assets/doubletick.webp";
import doube from "../assets/duble.webp";
import { Button } from "@mui/material";
import { FaFacebookSquare } from "react-icons/fa";
import emptyProfile from "../assets/emptyProfileModal.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserGigs } from "../redux/slices/offersSlice";
import { useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import Card from "../components/Card";
import { AiFillStar } from "react-icons/ai";
import { UserRating } from "../redux/slices/ratingSlice";
import { formatDistanceToNow } from "date-fns";
import timepes from "../assets/time (1).webp";

const ProfileOtherPerson = () => {
  const location = useLocation();
  const userId = location?.state?.userId;
  console.log(userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userGigs } = useSelector((state) => state.offers);
  const { userRatingDetain, userallRating } = useSelector(
    (state) => state.rating
  );
  const percentage1 = 50;
  const percentage2 = 50;
  const percentage3 = 50;

  // =================Personal Gigs===========
  useEffect(() => {
    let data = {
      id: userId,
    };
    dispatch(getUserGigs(data));
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(UserRating());
  }, [dispatch]);
  console.log(userGigs);
  // const Gigs = userGigs.flatMap(function(object) {
  //   return object.gigs;
  // });
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
  // ================Rating============

  // console.log(allRating ,'all rating');

  // OUT Of 5
  const filterRating = userallRating.filter(
    (value) => value !== null && !isNaN(value)
  );
  const overallAverageRating = parseInt(
    filterRating.reduce((acc, rating) => acc + rating, 0) / filterRating?.length
  );
  // console.log(overallAverageRating,'========alllRating with out Null Rating');
  // Average value 5
  const filterRatingFive = userallRating.filter((value) => value === 5);
  const overallAverageFive =
    (filterRatingFive?.length / userallRating?.length) * 100;
  // console.log(overallAverageFive,'=====filter 5');
  // Average value 4
  const filterRatingFour = userallRating.filter((value) => value === 4);
  const overallAverageFour =
    (filterRatingFour?.length / userallRating?.length) * 100;
  // console.log(overallAverageFour,'=====filter 4');
  const filterRatingThree = userallRating.filter((value) => value === 3);
  const overallAverageThree =
    (filterRatingThree?.length / userallRating?.length) * 100;
  // console.log(overallAverageThree,'=====filter 3');
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid pt-5">
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0">
          <div className="col-lg-4 col-12">
            <div className="container">
              <div className="row">
                <div className="Revie">
                  <div className="text-center">
                    <img
                      src={userGigs?.image ? userGigs.image : emptyProfile}
                      className="rounded-circle "
                      width={120}
                      height={120}
                      alt="w8"
                    />

                    <div>
                      <a href={userGigs?.fname}>
                        <h6 className="font-22 font-500 poppins mt-3">
                          {userGigs?.fname}
                        </h6>
                      </a>
                    </div>
                    <p className="font-14 poppins">{userGigs?.role}</p>
<<<<<<< HEAD
=======
                    <p className="font-14 poppins">Level{userGigs?.level}</p>
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </div>
                  <div className="d-flex mt-5 pb-5 text-center poppins">
                    <div className="loader1">
                      <CircularProgressbar
                        className="w-75"
                        value={percentage1}
                        text={`${percentage1}%`}
                      />
                      <h6 className="mt-3 font-14 poppins blackcolor">
                        Project Success Ratio
                      </h6>
                    </div>
                    <div className="loader2">
                      <CircularProgressbar
                        className="w-75"
                        value={percentage2}
                        text={`${percentage2}%`}
                      />
                      <h6 className="mt-3 font-14 poppins blackcolor">
                        Total Order
                      </h6>
                    </div>
                    <div className="loader3">
                      <CircularProgressbar
                        className="w-75"
                        value={percentage3}
                        text={`${percentage3}%`}
                      />
                      <h6 className="mt-3 font-14 poppins blackcolor">
                        Complete <br />
                        Order
                      </h6>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="font-18 font-500 poppins blackcolor">
                        Last Activites
                      </h6>
                    </div>
                    <div>
                      <p className="font-16 poppins colororing">See All</p>
                    </div>
                  </div>
                  <div
                    className="d-flex rounded-4 px-3 mt-2 p-2 align-items-center"
                    style={{ border: "1.5px solid #AC9E9E" }}
                  >
                    <div>
                      <img src={doubl} width={45} height={45} alt="w8" />
                    </div>
                    <div>
                      <h6 className=" ms-2 font-14 poppins mb-0">
                        <span className="takegraycolor">
                          Your Application has
                        </span>{" "}
                        accept <br className="d-lg-block d-none" />3 Companies
                      </h6>
                    </div>
                  </div>
                  <div
                    className="d-flex rounded-4 px-3 p-2 mt-4 align-items-center"
                    style={{ border: "1.5px solid #AC9E9E" }}
                  >
                    <div>
                      <img src={doube} width={45} height={45} alt="w8" />
                    </div>
                    <div>
                      <h6 className=" ms-2 font-14 poppins mb-0">
                        <span className="takegraycolor">
                          Your Application has
                        </span>{" "}
                        accept <br className="d-lg-block d-none" />3 Companies
                      </h6>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h6 className="font-18 font-500 poppins">About me</h6>
                    <p className="font-14 poppins textgray">
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual.
                    </p>
                  </div>
                </div>
              </div>
              {/* ==============
        Skills
        ================ */}
              <div className="mt-lg-5 mt-md-3 mt-2">
                <h4 className="byerLine font-22 font-500 cocon blackcolor">
                  Skills
                </h4>
                <div className=" Revie p-3 mt-lg-4 mt-md-3 mt-2">
                  <div className="text-end"></div>

                  <>
                    {userGigs.skills?.length > 0 ? (
                      userGigs.skills.map((value, index) => (
                        <span
                          className="poppins m-1 rounded-4 haifwhite d-inline-flex"
                          key={index}
                        >
                          <span className="mb-0 font-10 colorgray">
                            {" "}
                            {value.skill}
                          </span>
                        </span>
                      ))
                    ) : (
                      <p className="font-14">Skills Not Found</p>
                    )}
                  </>
                </div>
              </div>
              <div className="mt-lg-5 mt-md-3 mt-2">
                <h6 className="byerLine font-20 font-500 cocon blackcolor">
                  Orders
                </h6>
                <div className="Revie mt-lg-4 mt-md-3 mt-2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="font-18 font-500 poppins blackcolor">
                        {" "}
                        Active orders{" "}
                      </p>
                    </div>
                    <div>
                      <p className="font-18 font-500 poppins">4</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="font-18 font-500 poppins">Earned in May </p>
                    </div>
                    <div>
                      <p className="font-18 font-500 poppins">$300 </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-lg-5 mt-md-3 mt-2">
                <h6 className="byerLine font-20 font-500 cocon blackcolor">
                  On the web
                </h6>
                <div className="mt-lg-4 mt-md-3 mt-2">
                  <Button className=" btn-stepper poppins me-3 px-3 p-2 rounded-2 font-16 w-100">
                    <FaFacebookSquare className="me-2" size={20} /> facebook
                  </Button>
                  <Button className="btn-stepper-border poppins mt-3 px-3 p-2 rounded-2  font-16 w-100">
                    <BsInstagram className="me-2" size={20} /> Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-12 mt-lg-0 mt-4">
            <div className="container-fluid">
              <div className="row">
                {userGigs.gigs?.length > 0 ? (
                  userGigs.gigs?.map((value, index) => (
                    <div
                      className="col-lg-4 col-md-4 col-sm-6 col-12  mt-4"
                      onClick={() => navigate(`/freelancersGigs/${value.id}`)}
                      key={index}
                    >
                      <div className="cursor-pointer h-100">
                        <div className="h-100">
                          <Card
                            gigsImg={
                              value.media &&
                              (value.media.image1 == null
                                ? value.media.image2 == null
                                  ? value.media.image3
                                  : value.media.image2
                                : value.media.image1)
                            }
                            heading={value.title}
                            phara={stripHtmlTags(value.description)}
                            star1={
                              parseInt(
                                value.rating
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
                                value.rating
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
                                value.rating
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
                                value.rating
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
                                value.rating
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
                            price={value.package[0]?.total}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h3 className="cocon mt-4 text-center">Not Found Gigs</h3>
                )}
                <div className="mt-5">
                  <h3 className="font-20 byerLine mt-4 cocon">
                    Rating & Reviews
                  </h3>
                  <div className="Revie">
                    <div className="row justify-content-between mt-4 poppins">
                      <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                        <div className="cardrating text-center p-4">
                          <div>
                            <AiFillStar
                              size={24}
                              color="rgba(253, 176, 34, 1)"
                            />
                            <AiFillStar
                              size={24}
                              color="rgba(253, 176, 34, 1)"
                            />
                            <AiFillStar
                              size={24}
                              color="rgba(253, 176, 34, 1)"
                            />
                            <AiFillStar
                              size={24}
                              color="rgba(253, 176, 34, 1)"
                            />
                            <AiFillStar
                              size={24}
                              color="rgba(253, 176, 34, 1)"
                            />
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
                    {userRatingDetain.length > 0 ? (
                      userRatingDetain.map((value, index) => (
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
                                {value.user
                                  ? value.user.fname
                                  : "Name not found"}
                              </p>
                            </div>
                          </div>
                          <p className="mb-0 font-16 mt-3 takegraycolor text-capitalize ">
                            {value.comments}
                          </p>
                          <div className="d-flex justify-content-end align-items-center">
                            <img
                              src={timepes}
                              width={20}
                              height={20}
                              alt="w8"
                            />
                            <p className="font-14 ms-1 fw-medium takegraycolor mb-0">
                              {formatDistanceToNow(new Date(value.created_at), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h3 className="cocon mt-4 text-center">
                        Not Found Comments
                      </h3>
                    )}

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
        </div>
      </div>
    </>
  );
};

export default ProfileOtherPerson;
