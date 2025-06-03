import { Button } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import arrow from "../assets/chartArrow.webp";
import user from "../assets/gigsRatingComments.webp";
import imagarrow1 from "../assets/imgarrow.webp";
import imagarrow2 from "../assets/imgarrow1.webp";
import imagarrow from "../assets/imgarrow2.webp";
import timepes from "../assets/time (1).webp";
import Dashboardright from "../components/Dashboardright";
import Navbar from "../components/Navbar";
import { buyerProjects } from "../redux/slices/projectSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const uvValue = payload[0].value;
    const arrowStyle = {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: "100%",
      width: "15px",
      height: "8px",
      background: "black",
      clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
    };
    return (
      <div
        className="custom-tooltip rounded-3 p-1 px-2 border-0"
        style={{ backgroundColor: "black" }}
      >
        <div className="tooltip-arrow" style={arrowStyle} />
        <p className="label mb-0 text-white poppins font-12 fw-semibold">
          <span>
            <img src={arrow} className="me-2" width={18} height={9} alt="w8" />
          </span>
          ${`${uvValue}`}
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

const BuyerDashboard = () => {
  // Sample spending data for the chart
  const spendingData = [
    { name: "Jan", uv: 1200, pv: 2400 },
    { name: "Feb", uv: 1800, pv: 1398 },
    { name: "Mar", uv: 2200, pv: 9800 },
    { name: "Apr", uv: 1600, pv: 3908 },
    { name: "May", uv: 2800, pv: 4800 },
    { name: "Jun", uv: 3200, pv: 3800 },
    { name: "Jul", uv: 2900, pv: 4300 },
    { name: "Aug", uv: 3500, pv: 4300 },
    { name: "Sep", uv: 3100, pv: 4300 },
    { name: "Oct", uv: 2700, pv: 4300 },
    { name: "Nov", uv: 3800, pv: 4300 },
    { name: "Dec", uv: 4200, pv: 4300 },
  ];

  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleCellHover = (index) => {
    setHoverIndex(index);
  };

  const handleCellHoverClear = () => {
    setHoverIndex(-1);
  };

  // Redux state management
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProjects, activeProjects } =  useSelector((state) => state.project?.userProjects) || [];
  const { userDetail } = useSelector((state) => state?.profile)|| [];


  useEffect(() => {
    dispatch(buyerProjects());
  }, [dispatch]);

  // Sample data - replace with actual data from your store
  const totalSpent = 15240;
  const activeProjectsCount = 8;
  const completedProjectsCount = 24;
  const averageRatingGiven = 4.7;

  // Sample freelancer reviews data
  const freelancerReviews = [
    {
      id: 1,
      freelancer: {
        name: "John Smith",
        image: user,
        rating: 5,
        project: "Website Development"
      },
      review: "Excellent work! John delivered the project on time and exceeded expectations. Very professional and responsive.",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      freelancer: {
        name: "Sarah Johnson",
        image: user,
        rating: 4,
        project: "Logo Design"
      },
      review: "Great creative work. Sarah understood our vision perfectly and provided multiple revisions until we were satisfied.",
      created_at: "2024-01-10T14:20:00Z"
    },
    {
      id: 3,
      freelancer: {
        name: "Mike Chen",
        image: user,
        rating: 5,
        project: "Mobile App Development"
      },
      review: "Outstanding developer! The app works flawlessly and Mike was very communicative throughout the process.",
      created_at: "2024-01-05T09:15:00Z"
    }
  ];

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
                  My Projects & Spending
                </h3>
              </div>
              <div>
                <div>
                  <Button className="btn-stepper poppins px-3 font-16">
                    Post New Project
                  </Button>
                </div>
                <Link
                  to="/paymentMethods"
                  className="colordark font-14 text-decoration-underline poppins"
                >
                  Manage payment methods
                </Link>
              </div>
            </div>

            {/* Statistics Cards */}
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
                          Total Spent
                        </p>
                        <h3 className="font-26 font-500 poppins blackcolor">
                          ${totalSpent.toLocaleString()}
                        </h3>
                        <p className="font-12 poppins mb-0">
                          <span className="font-12 font-700 poppins colorgreen">
                            <FaArrowUp /> 12.5%
                          </span>{" "}
                          this month
                        </p>
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
                          Active Projects
                        </p>
                        <h3 className="font-26 font-500 poppins blackcolor">
                          {activeProjectsCount}
                        </h3>
                        <p className="font-12 poppins mb-0">
                          <span className="font-12 font-700 poppins colorgreen">
                            <FaArrowUp /> 3
                          </span>{" "}
                          new this week
                        </p>
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
                          Completed Projects
                        </p>
                        <h3 className="font-26 font-500 poppins blackcolor">
                          {completedProjectsCount}
                        </h3>
                        <p className="font-12 poppins mb-0">
                          <span className="font-12 font-700 poppins colorgreen">
                            <FaArrowUp /> 5
                          </span>{" "}
                          this month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spending Chart */}
              <div className="bgcolor p-4 mt-3">
                <div className="d-flex justify-content-between chart-headings">
                  <div className="poppins">
                    <h5 className="font-20">Spending Overview</h5>
                    <p className="font-14 takegraycolor">Monthly Spending</p>
                  </div>
                  <select
                    className="form-select border-0 font-12"
                    aria-label="Default select example"
                  >
                    <option selected>Quarterly</option>
                    <option value={1}>Monthly</option>
                    <option value={2}>Yearly</option>
                  </select>
                </div>
                <div style={{ width: "100%" }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={150} height={40} data={spendingData}>
                      <Tooltip content={<CustomTooltip />} />
                      <XAxis
                        dataKey="name"
                        tick={<CustomTick />}
                        interval={0}
                        axisLine={false}
                      />
                      <Bar dataKey="uv">
                        {spendingData.map((entry, index) => (
                          <Cell
                            cursor="pointer"
                            fill={hoverIndex === index ? "#F16336" : "#E8F4FD"}
                            onMouseEnter={() => handleCellHover(index)}
                            onMouseLeave={handleCellHoverClear}
                            radius={[10, 10, 10, 10]}
                            key={`cell-${index}`}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-lg-4 mt-md-3 mt-2">
                <h3 className="byerLine font-22 font-500 cocon blackcolor">
                  Reviews Given to Freelancers
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
                          {averageRatingGiven} out of 5
                        </h3>
                        <p className="mt-2 mb-0">Average Rating Given</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-3">
                      <div className="gig-rating-rewies">
                        <div className="row align-items-center">
                          <div className="col-2">
                            <p className="mb-0 font-14 takegraycolor">
                              5&nbsp;Stars
                            </p>
                          </div>
                          <div className="col-10">
                            <div
                              className="progress w-100"
                              style={{ height: "8px" }}
                              role="progressbar"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "70%" }}
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
                              className="progress w-100"
                              style={{ height: "8px" }}
                              role="progressbar"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "25%" }}
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
                              className="progress w-100"
                              style={{ height: "8px" }}
                              role="progressbar"
                            >
                              <div
                                className="progress-bar"
                                style={{ width: "5%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  {freelancerReviews.map((review, index) => (
                    <div className="mt-3" key={index}>
                      <div className="d-flex justify-content-between mt-lg-5 mt-4">
                        <div className="d-flex">
                          <div>
                            <img
                              className="rounded-circle"
                              src={review.freelancer.image}
                              width={50}
                              height={50}
                              alt="Freelancer"
                            />
                          </div>
                          <div className="ms-2">
                            <p className="font-16 fw-medium mb-1">
                              {review.freelancer.name}
                            </p>
                            <p className="font-12 takegraycolor mb-0">
                              Project: {review.freelancer.project}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar
                              key={i}
                              size={16}
                              color={
                                i < review.freelancer.rating
                                  ? "rgba(253, 176, 34, 1)"
                                  : "#E0E0E0"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mb-0 font-16 mt-3 takegraycolor text-capitalize">
                        {review.review}
                      </p>
                      <div className="d-flex justify-content-end align-items-center">
                        <img src={timepes} width={20} height={20} alt="time" />
                        <p className="font-14 ms-1 fw-medium takegraycolor mb-0">
                          {formatDistanceToNow(new Date(review.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboard;