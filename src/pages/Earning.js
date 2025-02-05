import React, { PureComponent, useState } from "react";
import star6 from "../assets/5star.webp";
import timepes from "../assets/time.webp";
import imagarrow from "../assets/imgarrow2.webp";
import imagarrow1 from "../assets/imgarrow.webp";
import imagarrow2 from "../assets/imgarrow1.webp";
import user from "../assets/gigsRatingComments.webp";
import Dashboardright from "../components/Dashboardright";
import { Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import arrow from "../assets/chartArrow.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../redux/store/store";
import { sellerRating } from "../redux/slices/ratingSlice";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const uvValue = payload[0].value;
    const arrowStyle = {
      position: "absolute",
      left: "50%", // Center the arrow
      transform: "translateX(-50%)", // Center the arrow
      top: "100%", // Adjust this value as needed
      width: "15px",
      height: "8px",
      background: "black", // Arrow color
      clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)", // Arrow shape
    };
    return (
      <div
        className="custom-tooltip  rounded-3 p-1 px-2 border-0 "
        style={{ backgroundColor: "black" }}
      >
        <div className="tooltip-arrow" style={arrowStyle} />
        <p className="label mb-0 text-white poppins font-12 fw-semibold">
          <span>
            <img src={arrow} className="me-2" width={18} height={9} alt="w8 " />
          </span>
          {`${uvValue}`}%
        </p>
      </div>
    );
  }

  return null;
};
const CustomTick = (props) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y + 10}
      fontSize="12"
      className="poppins fw-medium"
      textAnchor="middle"
      fill="#4F4F4F"
    >
      {payload.value}
    </text>
  );
};

const Earning = () => {
  const ALLdata = [
    {
      name: "Jan",
      uv: 20,
      pv: 2400,
    },
    {
      name: "Feb",
      uv: 27,
      pv: 1398,
    },
    {
      name: "Mar",
      uv: 33,
      pv: 9800,
    },
    {
      name: "Apr",
      uv: 26,
      pv: 3908,
    },
    {
      name: "May",
      uv: 17,
      pv: 4800,
    },
    {
      name: "Jun",
      uv: 26,
      pv: 3800,
    },
    {
      name: "Jul",
      uv: 27,
      pv: 4300,
    },
    {
      name: "Aug",
      uv: 35,
      pv: 4300,
    },
    {
      name: "Sep",
      uv: 32,
      pv: 4300,
    },
    {
      name: "Oct",
      uv: 30,
      pv: 4300,
    },
    {
      name: "Nov",
      uv: 25,
      pv: 4300,
    },
    {
      name: "Dec",
      uv: 31,
      pv: 4300,
    },
  ];

  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleCellHover = (index) => {
    setHoverIndex(index);
  };

  const handleCellHoverClear = () => {
    setHoverIndex(-1);
  };
  // ------------------- Rating ---------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRating, allRating } = useSelector((state) => state.rating);
  const { userDetail } = useSelector((state) => state.profile);

  console.log(userDetail, "==========userDetail");
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
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="byerLine font-22 font-500 cocon blackcolor">
                  Earning Orders
                </h3>
              </div>
              <div>
                <div>
                  <Button className="btn-stepper poppins px-3  font-16">
                    Withdraw Balance
                  </Button>
                </div>
                <Link
                  to="/payoutMethod"
                  className="colordark font-14 text-decoration-underline poppins"
                >
                  Manage payout methods
                </Link>
              </div>
            </div>
            <div className="Revie mt-3">
              <div className="container-fluid">
                <div className="row bgcolor p-4">
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <img src={imagarrow} width={80} height={80} alt="" />
                      </div>
                      <div className="ms-2">
                        <p className="font-14 font-500 poppins mb-0 textgray">
                          Total Earning
                        </p>
                        <h3 className="font-26 font-500 poppins blackcolor">
                          ${userDetail?.referral_earning}
                        </h3>
                        {/* <p className='font-12 poppins mb-0'>
                        <span className='font-12 font-700 poppins colorgreen'><FaArrowUp /> 37.8%</span> this month</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <img src={imagarrow1} width={80} height={80} alt="" />
                      </div>
                      <div className="ms-2">
                        <p className="font-14 font-500 poppins mb-0 textgray">
                          Balance
                        </p>
                        <h3 className="font-26 font-500 poppins blackcolor">
                          $0
                        </h3>
                        {/* <p className='font-12 poppins mb-0'><span className='font-12 font-700 poppins colorred'><FaArrowDown /> 2%</span> 2% this month</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <img src={imagarrow2} width={80} height={80} alt="" />
                      </div>
                      <div className="ms-2">
                        <p className="font-14 font-500 poppins mb-0 textgray">
                          Total Sales
                        </p>
                        <h3 className="font-26 font-500 poppins blackcolor">
                          $ 0
                        </h3>
                        {/* <p className='font-12 poppins mb-0'><span className='font-12 font-700 poppins colorgreen'><FaArrowUp /> 11%</span>  this week</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bgcolor p-4 mt-3">
                <div className="d-flex justify-content-between chart-headings ">
                  <div className=" poppins">
                    <h5 className="font-20 ">Overview</h5>
                    <p className="font-14  takegraycolor">Monthly Earning </p>
                  </div>
                  <select
                    className="form-select border-0 font-12"
                    aria-label="Default select example"
                  >
                    <option selected>Quarterly</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div>
                <div style={{ width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={150} height={40} data={ALLdata}>
                      <Tooltip content={<CustomTooltip />} />
                      <XAxis
                        dataKey="name"
                        tick={<CustomTick />}
                        interval={0}
                        axisLine={false}
                      />
                      <Bar dataKey="uv">
                        {ALLdata.map((entry, index) => (
                          <Cell
                            cursor="pointer"
                            fill={hoverIndex === index ? "#F16336" : "white"}
                            onMouseEnter={() => handleCellHover(index)}
                            onMouseLeave={handleCellHoverClear}
                            radius={[10, 10, 10, 10]}
                            key={`cell-${index}`}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  {/* <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p> */}
                </div>
              </div>
              <div className="mt-lg-4 mt-md-3 mt-2">
                <h3 className="byerLine font-22 font-500 cocon blackcolor">
                  Rating & Reviews
                </h3>
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
                  {userRating
                    ? userRating.map((value, index) => (
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
      </div>
    </>
  );
};

export default Earning;
