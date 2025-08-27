import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineCalendar,
  AiOutlineMessage,
  AiOutlineProject,
  AiOutlineRise,
  AiOutlineTeam,
  AiOutlineWallet
} from "react-icons/ai";
import { BiTime, BiTrendingUp } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../redux/store/store";

// Components
import Dashboardright from "../components/Dashboardright";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Assets
import bannerimg from "../assets/bannerimg.webp";
import timepes from "../assets/time (1).webp";

// Redux actions
import { sellerRating } from "../redux/slices/ratingSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, allRating } = useSelector((state) => state.rating);
  const { userStats } = useSelector((state) => state.dashboard);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get user role from userDetail or localStorage
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  const userRole = userDetail?.role || UserData?.role || "Client";

  useEffect(() => {
    dispatch(sellerRating());
    setActiveTab("ratings");
  }, [dispatch]);

  // Calculate ratings
  const filterRating = allRating.filter(
    (value) => value !== null && !isNaN(value)
  );
  const overallAverageRating = parseInt(
    filterRating.reduce((acc, rating) => acc + rating, 0) / filterRating?.length
  );
  
  const filterRatingFive = allRating.filter((value) => value == 5);
  const overallAverageFive =
    (filterRatingFive?.length / allRating?.length) * 100;
    
  const filterRatingFour = allRating.filter((value) => value == 4);
  const overallAverageFour =
    (filterRatingFour?.length / allRating?.length) * 100;
    
  const filterRatingThree = allRating.filter((value) => value == 3);
  const overallAverageThree =
    (filterRatingThree?.length / allRating?.length) * 100;

  // Role-based quick actions
  const getQuickActions = () => {
    switch (userRole.toLowerCase()) {
      case "expert/freelancer":
        return [
          { label: "Create Gig", icon: <AiOutlineProject />, path: "/multiSteps" },
          { label: "Messages", icon: <AiOutlineMessage />, path: "/inbox" },
          { label: "Earnings", icon: <AiOutlineWallet />, path: "/earning" },
          { label: "Portfolio", icon: <AiOutlineTeam />, path: "/portfolio" }
        ];
      case "bd":
      case "bidder/company representative/middleman":
        return [
          { label: "New Lead", icon: <AiOutlineTeam />, path: "/userBuyerRequest" },
          { label: "Messages", icon: <AiOutlineMessage />, path: "/inbox" },
          { label: "Performance", icon: <BiTrendingUp />, path: "/performance" },
          { label: "Schedule", icon: <AiOutlineCalendar />, path: "/schedule" }
        ];
      case "client":
      default:
        return [
          { label: "Post Project", icon: <AiOutlineProject />, path: "/buyerRequest" },
          { label: "Messages", icon: <AiOutlineMessage />, path: "/inbox" },
          { label: "My Projects", icon: <AiOutlineWallet />, path: "/order" },
          { label: "Find Talent", icon: <AiOutlineTeam />, path: "/freelancers" }
        ];
    }
  };

  // Role-based metrics cards
  const getMetricsCards = () => {
    if (!userStats) return [];
    
    switch (userRole.toLowerCase()) {
      case "expert/freelancer":
        return [
          { title: "Response Rate", value: `${userStats.responseRate || 0}%`, icon: <AiOutlineMessage />, trend: userStats.responseTrend || "up" },
          { title: "Avg. Delivery Time", value: `${userStats.avgDeliveryTime || 0} days`, icon: <BiTime />, trend: userStats.deliveryTrend || "steady" },
          { title: "Repeat Clients", value: userStats.repeatClients || 0, icon: <AiOutlineTeam />, trend: userStats.clientTrend || "up" },
          { title: "Profile Views", value: userStats.profileViews || 0, icon: <AiOutlineRise />, trend: userStats.viewsTrend || "up" }
        ];
      case "bd":
      case "bidder/company representative/middleman":
        return [
          { title: "Response Time", value: `${userStats.avgResponseTime || 0}h`, icon: <BiTime />, trend: userStats.responseTrend || "up" },
          { title: "Lead Conversion", value: `${userStats.leadConversion || 0}%`, icon: <BiTrendingUp />, trend: userStats.conversionTrend || "up" },
          { title: "Client Satisfaction", value: `${userStats.clientSatisfaction || 0}/5`, icon: <AiFillStar />, trend: userStats.satisfactionTrend || "up" },
          { title: "New Contacts", value: userStats.newContacts || 0, icon: <AiOutlineTeam />, trend: userStats.contactsTrend || "up" }
        ];
      case "client":
      default:
        return [
          { title: "Avg. Project Cost", value: `$${userStats.avgProjectCost || 0}`, icon: <AiOutlineWallet />, trend: userStats.costTrend || "steady" },
          { title: "Project Completion", value: `${userStats.projectCompletion || 0}%`, icon: <AiOutlineProject />, trend: userStats.completionTrend || "up" },
          { title: "Freelancer Rating", value: `${userStats.freelancerRating || 0}/5`, icon: <AiFillStar />, trend: userStats.ratingTrend || "up" },
          { title: "Active Contracts", value: userStats.activeContracts || 0, icon: <AiOutlineTeam />, trend: userStats.contractsTrend || "up" }
        ];
    }
  };

  return (
    <>
      <Navbar FirstNav="none" />
      
      <div className="container-fluid pt-5">
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0">
          {/* Left Sidebar - Your existing Dashboardright component */}
          <div className="col-lg-4 col-12">
            <Dashboardright />
          </div>
          
          {/* Main Content Area */}
          <div className="col-lg-8 col-12 mt-lg-0 mt-4">
            {/* Quick Actions Section */}
            <div className="card mb-4 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Quick Actions</h5>
                <div className="row">
                  {getQuickActions().map((action, index) => (
                    <div key={index} className="col-6 col-md-3 mb-3">
                      <div 
                        className="text-center p-3 rounded-3 cursor-pointer hover-card"
                        onClick={() => navigate(action.path)}
                        style={{ backgroundColor: '#f8f9fa' }}
                      >
                        <div className="fs-4 mb-2"  style={{ color: 'rgba(241, 99, 54, 1)' }}>{action.icon}</div>
                        <div className="small fw-medium">{action.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="row mb-4">
              {getMetricsCards().map((metric, index) => (
                <div key={index} className="col-md-6 col-lg-3 mb-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
<div className="icon-shape bg-light-primary  rounded p-2" style={{ color: 'rgba(241, 99, 54, 1)' }}>
  {metric.icon}
</div>
                        <span className={`badge bg-light-${metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'danger' : 'warning'}`}>
                          {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                        </span>
                      </div>
                      <div className="mt-3">
                        <h6 className="card-title mb-1">{metric.title}</h6>
                        <h4 className="fw-bold">{metric.value}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Tabs */}
            <ul className="nav nav-tabs mb-4" id="dashboardTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link text-dark ${activeTab === 'ratings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ratings')}
                >
                  <AiFillStar className="me-1"  style={{ color: 'rgba(241, 99, 54, 1)' }} /> Ratings & Reviews
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link text-dark ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  <BiTrendingUp className="me-1"  style={{ color: 'rgba(241, 99, 54, 1)' }} /> Analytics
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="dashboardTabContent">
              {/* Ratings Tab */}
              {activeTab === 'ratings' && (
                <div className="tab-pane fade show active">
                  <div className="mt-5">
                    <h3 className="font-20 byerLine mt-4 cocon">Rating & Reviews</h3>
                    <div className="Revie">
                      <div className="row justify-content-between mt-4 poppins">
                        <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                          <div className="cardrating text-center p-4">
                            <div>
                              {[...Array(5)].map((_, i) => (
                                <AiFillStar 
                                  key={i} 
                                  size={24} 
                                  color={i < overallAverageRating ? "rgba(253, 176, 34, 1)" : "#e0e0e0"} 
                                />
                              ))}
                            </div>
                            <h3 className="mt-2 font-28 fw-semibold" style={{ opacity: "50%" }}>
                              {overallAverageRating} out of 5
                            </h3>
                            <p className="mt-2 mb-0">Top Rating</p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-3 ">
                          <div className="gig-rating-rewies">
                            {[5, 4, 3].map((star) => {
                              const filterRatingStar = allRating.filter((value) => value == star);
                              const percentage = (filterRatingStar?.length / allRating?.length) * 100;
                              
                              return (
                                <div key={star} className="row align-items-center mb-3">
                                  <div className="col-3">
                                    <p className="mb-0 font-14 takegraycolor">
                                      {star} Stars
                                    </p>
                                  </div>
                                  <div className="col-7">
                                    <div className="progress w-100" style={{ height: "8px" }}>
                                      <div
                                        className="progress-bar"
                                        style={{ width: `${percentage}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="col-2 text-end">
                                    <span className="font-14 takegraycolor">
                                      {Math.round(percentage)}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {userDetail && userDetail.length > 0 ? (
                        userDetail.map((value, index) => (
                          <div className="mt-4 p-3 border-bottom" key={index}>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex align-items-center">
                                <img
                                  className="rounded-circle"
                                  src={value.user ? value.user.image : ""}
                                  width={50}
                                  height={50}
                                  alt="User"
                                />
                                <div className="ms-3">
                                  <p className="mb-0 fw-medium">
                                    {value.user ? value.user.fname : "Name not found"}
                                  </p>
                                  <div className="d-flex align-items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <AiFillStar 
                                        key={i} 
                                        size={16} 
                                        color={i < value.ratings ? "rgba(253, 176, 34, 1)" : "#e0e0e0"} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <img src={timepes} width={16} height={16} alt="time" className="me-1" />
                                <p className="font-14 fw-medium takegraycolor mb-0">
                                  {formatDistanceToNow(new Date(value.created_at), {
                                    addSuffix: true,
                                  })}
                                </p>
                              </div>
                            </div>
                            <p className="mt-3 mb-0 font-16 takegraycolor text-capitalize">
                              {value.comments}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-5">
                          <AiFillStar size={48} color="#e0e0e0" />
                          <p className="mt-3 text-muted">No reviews yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="tab-pane fade show active">
                  <h5 className="mb-4">Performance Analytics</h5>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white">
                          <h6 className="mb-0">Earnings Overview</h6>
                        </div>
                        <div className="card-body">
                          <div className="chart-placeholder" style={{height: '250px'}}>
                            <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                              Earnings chart visualization
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white">
                          <h6 className="mb-0">Engagement Metrics</h6>
                        </div>
                        <div className="card-body">
                          <div className="chart-placeholder" style={{height: '250px'}}>
                            <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                              Engagement metrics chart
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white">
                      <h6 className="mb-0">Recent Performance</h6>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Metric</th>
                              <th scope="col">Current</th>
                              <th scope="col">Previous</th>
                              <th scope="col">Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Response Rate</td>
                              <td>95%</td>
                              <td>89%</td>
                              <td className="text-success">+6%</td>
                            </tr>
                            <tr>
                              <td>Completed Projects</td>
                              <td>24</td>
                              <td>18</td>
                              <td className="text-success">+6</td>
                            </tr>
                            <tr>
                              <td>Client Satisfaction</td>
                              <td>4.8/5</td>
                              <td>4.6/5</td>
                              <td className="text-success">+0.2</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-lg-5 p-md-4 p-3 mt-lg-5 mt-md-4 mt-3 poppins">
        <img src={bannerimg} className="w-100 rounded-3" alt="Promotional Banner" />
      </div>
      
      <Footer />
    </>
  );
};

export default Dashboard;