// BuyerDashboard.jsx
import { Button, CircularProgress, Skeleton } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// Assets
import arrow from "../assets/chartArrow.webp";
import user from "../assets/gigsRatingComments.webp";
import imagarrow1 from "../assets/imgarrow.webp";
import imagarrow2 from "../assets/imgarrow1.webp";
import imagarrow from "../assets/imgarrow2.webp";
import timepes from "../assets/time (1).webp";

// Components
import Dashboardright from "../components/Dashboardright";
import Navbar from "../components/Navbar";

// Redux
import { fetchUserActivities, fetchUserStats } from "../redux/slices/dashboardSlice";
import { useDispatch, useSelector } from "../redux/store/store";

// Constants
const RATING_COLORS = {
  FILLED: "rgba(253, 176, 34, 1)",
  EMPTY: "rgba(200, 200, 200, 1)"
};

const CHART_COLORS = {
  HOVER: "#F16336",
  DEFAULT: "#E8F4FD"
};

// Tooltip Component
const CustomTooltip = React.memo(({ active, payload }) => {
  if (!active || !payload?.length) return null;

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
    <div className="custom-tooltip rounded-3 p-1 px-2 border-0" style={{ backgroundColor: "black" }}>
      <div className="tooltip-arrow" style={arrowStyle} />
      <p className="label mb-0 text-white poppins font-12 fw-semibold">
        <img src={arrow} className="me-2" width={18} height={9} alt="Arrow" />
        ${uvValue}
      </p>
    </div>
  );
});
CustomTooltip.displayName = 'CustomTooltip';

// XAxis Tick Component
const CustomTick = React.memo(({ x, y, payload }) => (
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
));
CustomTick.displayName = 'CustomTick';

// Star Rating Component
const StarRating = React.memo(({ rating = 0, size = 16, maxStars = 5 }) => (
  <div className="d-flex">
    {[...Array(maxStars)].map((_, index) => (
      <AiFillStar
        key={index}
        size={size}
        color={index < Math.floor(rating) ? RATING_COLORS.FILLED : RATING_COLORS.EMPTY}
      />
    ))}
  </div>
));
StarRating.displayName = 'StarRating';

// Stats Card Component
const StatsCard = React.memo(({ 
  image, 
  title, 
  value = 0, 
  change, 
  period, 
  isLoading, 
  isSpent = false 
}) => (
  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
    <div className="d-flex align-items-center">
      {isLoading ? (
        <Skeleton variant="rectangular" width={80} height={80} />
      ) : (
        <>
          <div>
            <img 
              src={image} 
              width={80} 
              height={80} 
              alt={title}
              onError={(e) => e.target.src = user}
            />
          </div>
          <div className="ms-2">
            <p className="font-14 font-500 poppins mb-0 textgray">{title}</p>
            <h3 className="font-26 font-500 poppins blackcolor">
              {isSpent ? `$${Number(value).toLocaleString()}` : value}
            </h3>
            {change && period && (
              <p className="font-12 poppins mb-0">
                <span className="font-12 font-700 poppins colorgreen">
                  <FaArrowUp /> {change}
                </span>{" "}
                {period}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  </div>
));
StatsCard.displayName = 'StatsCard';

// Progress Bar Component
const ProgressBar = React.memo(({ stars, percentage = 0 }) => (
  <div className="row align-items-center mt-4">
    <div className="col-2">
      <p className="mb-0 font-14 takegraycolor">{stars}&nbsp;Stars</p>
    </div>
    <div className="col-10">
      <div className="progress w-100" style={{ height: "8px" }}>
        <div
          className="progress-bar"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: RATING_COLORS.FILLED 
          }}
        />
      </div>
    </div>
  </div>
));
ProgressBar.displayName = 'ProgressBar';

// Review Item Component
const ReviewItem = React.memo(({ review }) => {
  const formatReviewDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? 'some time ago' 
        : formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'some time ago';
    }
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mt-lg-5 mt-4">
        <div className="d-flex">
          <div>
            <img
              className="rounded-circle"
              src={review.freelancer?.image || user}
              width={50}
              height={50}
              alt={review.freelancer?.name || "Freelancer"}
              onError={(e) => e.target.src = user}
            />
          </div>
          <div className="ms-2">
            <p className="font-16 fw-medium mb-1">
              {review.freelancer?.name || "Freelancer"}
            </p>
            <p className="font-12 takegraycolor mb-0">
              Project: {review.project?.title || "Completed Project"}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mb-0 font-16 mt-3 takegraycolor">
        {review.comment || "No comment provided"}
      </p>
      <div className="d-flex justify-content-end align-items-center">
        <img 
          src={timepes} 
          width={20} 
          height={20} 
          alt="Time" 
          onError={(e) => e.target.src = timepes}
        />
        <p className="font-14 ms-1 fw-medium takegraycolor mb-0">
          {formatReviewDate(review.createdAt)}
        </p>
      </div>
    </div>
  );
});
ReviewItem.displayName = 'ReviewItem';

// Main Component
const BuyerDashboard = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [userStatsLoading, setUserStatsLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState("monthly");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userStats } = useSelector((state) => state.dashboard);

  // Calculate derived data
  const overallAverageRating = useMemo(() => 
    Number(userStats?.averageRating) || 0, 
    [userStats?.averageRating]
  );

  const spendingData = useMemo(() => {
    if (!userStats?.spending?.length) return [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return userStats.spending.map(spent => ({
      name: `${monthNames[spent.month - 1]} ${spent.year}`,
      uv: Number(spent.total_spent) || 0
    }));
  }, [userStats?.spending]);

  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const reviewsGiven = Number(userStats?.reviewsGiven) || 0;
    
    if (userStats?.ratingDistribution?.length && reviewsGiven > 0) {
      userStats.ratingDistribution.forEach(item => {
        const rating = Number(item.rating);
        if (rating >= 1 && rating <= 5) {
          distribution[rating] = (Number(item.count) / reviewsGiven) * 100;
        }
      });
    }
    return distribution;
  }, [userStats]);

  // Handlers
  const handleCellHover = useCallback(index => setHoverIndex(index), []);
  const handleCellHoverClear = useCallback(() => setHoverIndex(-1), []);
  const handlePostProject = useCallback(() => navigate('/buyerRequest'), [navigate]);
  const handleTimePeriodChange = useCallback(e => setTimePeriod(e.target.value), []);

  // Data fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setUserStatsLoading(true);
        setChartLoading(true);
        
        await Promise.allSettled([
          dispatch(fetchUserStats()),
          dispatch(fetchUserActivities(timePeriod)),
        ]);
      } catch (error) {
        console.error('Dashboard data loading error:', error);
      } finally {
        setLoading(false);
        setUserStatsLoading(false);
        setChartLoading(false);
      }
    };
    
    loadData();
  }, [dispatch, timePeriod]);

  // Safe stats data
  const safeUserStats = useMemo(() => ({
    totalSpent: Number(userStats?.totalSpent) || 0,
    monthlySpent: Number(userStats?.monthlySpent) || 0,
    activeProjects: Number(userStats?.activeProjects) || 0,
    completedProjects: Number(userStats?.completedProjects) || 0,
    projectsPosted: Number(userStats?.projectsPosted) || 0,
    averageRating: Number(userStats?.averageRating) || 0,
    reviewsGiven: Number(userStats?.reviewsGiven) || 0,
    ratingDistribution,
    buyerReviews: Array.isArray(userStats?.buyerReviews) 
      ? userStats.buyerReviews 
      : []
  }), [userStats, ratingDistribution]);

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid pt-5">
        <div className="row mx-lg-4 mx-md-3 mx-0">
          <div className="col-lg-4 col-12">
            <Dashboardright />
          </div>

          <div className="col-lg-8 col-12 mt-lg-0 mt-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="byerLine font-22 font-500 cocon blackcolor mb-0">
                My Projects & Spending
              </h3>
              <div className="d-flex flex-column align-items-end">
                <Button 
                  className="btn-stepper poppins px-3 font-16 mb-2"
                  onClick={handlePostProject}
                >
                  Post New Project
                </Button>
                <Link 
                  to="/paymentMethods" 
                  className="colordark font-14 text-decoration-underline poppins"
                >
                  Manage payment methods
                </Link>
              </div>
            </div>

            {/* Stats Cards Section */}
            <div className="Revie mt-3">
              <div className="container-fluid">
                <div className="row bgcolor p-4 rounded-3">
                  <StatsCard 
                    image={imagarrow} 
                    title="Total Spent" 
                    value={safeUserStats.totalSpent}
                    change={safeUserStats.totalSpent > 0 
                      ? `${((safeUserStats.monthlySpent / safeUserStats.totalSpent) * 100).toFixed(1)}%`
                      : undefined}
                    period="this month" 
                    isLoading={userStatsLoading} 
                    isSpent 
                  />
                  <StatsCard 
                    image={imagarrow1} 
                    title="Active Projects" 
                    value={safeUserStats.activeProjects} 
                    isLoading={userStatsLoading} 
                  />
                  <StatsCard 
                    image={imagarrow2} 
                    title="Completed Projects" 
                    value={safeUserStats.completedProjects} 
                    isLoading={userStatsLoading} 
                  />
                </div>
              </div>

              {/* Spending Chart Section */}
              <div className="bgcolor p-4 mt-3 rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="font-20 mb-1">Spending Overview</h5>
                    <p className="font-14 takegraycolor mb-0">
                      {timePeriod === 'monthly' ? 'Monthly' : 
                       timePeriod === 'quarterly' ? 'Quarterly' : 'Yearly'} Spending
                    </p>
                  </div>
                  <select 
                    className="form-select border-0 font-12 shadow-none"
                    value={timePeriod} 
                    onChange={handleTimePeriodChange}
                    style={{ width: '120px' }}
                  >
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div style={{ width: "100%", height: "300px" }}>
                  {chartLoading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <CircularProgress />
                    </div>
                  ) : spendingData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={spendingData}>
                        <Tooltip content={<CustomTooltip />} />
                        <XAxis 
                          dataKey="name" 
                          tick={<CustomTick />} 
                          interval={0} 
                          axisLine={false} 
                        />
                        <Bar 
                          dataKey="uv" 
                          radius={[10, 10, 10, 10]}
                          onMouseEnter={handleCellHover}
                          onMouseLeave={handleCellHoverClear}
                        >
                          {spendingData.map((_, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              cursor="pointer"
                              fill={hoverIndex === index ? CHART_COLORS.HOVER : CHART_COLORS.DEFAULT}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <p className="text-muted">No spending data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-4">
                <h3 className="byerLine font-22 font-500 cocon blackcolor">
                  Reviews Given to Freelancers
                </h3>
                <div className="Revie bgcolor p-4 mt-3 rounded-3">
                  <div className="row justify-content-between">
                    <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                      <div className="cardrating text-center p-4 rounded-3">
                        <StarRating rating={overallAverageRating} size={24} />
                        <h3 className="mt-2 font-28 fw-semibold" style={{ opacity: "0.5" }}>
                          {overallAverageRating.toFixed(1)} out of 5
                        </h3>
                        <p className="mt-2 mb-0">
                          {safeUserStats.reviewsGiven} Review{safeUserStats.reviewsGiven !== 1 ? 's' : ''} Given
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-3">
                      <div className="gig-rating-rewies">
                        {[5, 4, 3, 2, 1].map(star => (
                          <ProgressBar 
                            key={star} 
                            stars={star} 
                            percentage={safeUserStats.ratingDistribution[star]} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <div className="text-center py-4">
                      <CircularProgress />
                    </div>
                  ) : safeUserStats.buyerReviews.length > 0 ? (
                    safeUserStats.buyerReviews.map((review) => (
                      <ReviewItem 
                        key={review.id} 
                        review={{
                          ...review,
                          rating: review.ratings || review.rating || 0,
                          comment: review.comments || review.comment || '',
                          createdAt: review.createdAt || review.created_at || new Date().toISOString(),
                          freelancer: {
                            ...review.freelancer,
                            image: review.freelancer?.image || user,
                            name: review.freelancer?.name || 'Freelancer'
                          },
                          project: {
                            ...review.project,
                            title: review.project?.title || 'Completed Project'
                          }
                        }} 
                      />
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted">No reviews given yet</p>
                    </div>
                  )}
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