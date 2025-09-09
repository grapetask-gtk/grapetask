import { Alert, Box, Button, CircularProgress, Modal, Skeleton, TextField } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
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
import imagarrow1 from "../assets/imgarrow.webp";
import imagarrow2 from "../assets/imgarrow1.webp";
import imagarrow from "../assets/imgarrow2.webp";
import timepes from "../assets/time (1).webp";
import Dashboardright from "../components/Dashboardright";
import Navbar from "../components/Navbar";
import { fetchUserStats } from "../redux/slices/dashboardSlice";
import { sellerRating } from "../redux/slices/ratingSlice";
import { useDispatch, useSelector } from "../redux/store/store";
import axios from "../utils/axios";

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
      <div className="custom-tooltip rounded-3 p-1 px-2 border-0" style={{ backgroundColor: "black" }}>
        <div className="tooltip-arrow" style={arrowStyle} />
        <p className="label mb-0 text-white poppins font-12 fw-semibold">
          <span><img src={arrow} className="me-2" width={18} height={9} alt="w8" /></span>
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
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' or 'fast'
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [summaryData, setSummaryData] = useState({
    referral_earning: 0,
    balance: 0,
    gross_earnings: 0,
    net_earnings: 0,
    total_sales: 0
  });
  const [chartData, setChartData] = useState([]);

  // Withdraw Modal States
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawNote, setWithdrawNote] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRating, allRating } = useSelector((state) => state.rating);
  const { userDetail } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(sellerRating());
  }, [dispatch]);

  useEffect(() => {
    console.log('🚀 Component mounted, dispatching API calls...');
    
    const data = {
      device_token: "123456789",
    };
    
    dispatch(fetchUserStats()).then((result) => {
      console.log('🎉 fetchUserStats completed:', result);
    }).catch((error) => {
      console.error('💥 fetchUserStats failed:', error);
    });
    
    
  }, [dispatch]);

  // Fetch summary data
// Fetch summary data
useEffect(() => {
  const fetchSummary = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get("/earnings/summary", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // ✅ force balance into number
      setSummaryData({
        referral_earning: res.data.referral_earning || 0,
        balance: parseFloat(res.data.balance) || 0,
        gross_earnings: res.data.gross_earnings || 0,
        net_earnings: res.data.net_earnings || 0,
        total_sales: res.data.total_sales || 0
      });

    } catch (err) {
      console.error("Error fetching earnings summary:", err);
    } finally {
      setLoadingSummary(false);
    }
  };
  fetchSummary();
}, []);


  // Fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get("/earnings/monthly", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setChartData(res.data);
      } catch (err) {
        console.error("Error fetching monthly earnings:", err);
      } finally {
        setLoadingChart(false);
      }
    };
    fetchChartData();
  }, []);

  const handleCellHover = (index) => setHoverIndex(index);
  const handleCellHoverClear = () => setHoverIndex(-1);

  // Withdraw Modal Functions
  const openWithdrawModal = () => {
    setShowWithdrawModal(true);
    setWithdrawError('');
    setWithdrawSuccess('');
    setWithdrawAmount('');
    setWithdrawNote('');
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
    setWithdrawError('');
    setWithdrawSuccess('');
    setWithdrawAmount('');
    setWithdrawNote('');
  };

  const handleWithdrawSubmit = async () => {
    // Reset states
    setWithdrawError('');
    setWithdrawSuccess('');

    // Validation
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      setWithdrawError('Please enter a valid amount');
      return;
    }

    if (amount > summaryData.balance) {
      setWithdrawError('Withdrawal amount cannot exceed available balance');
      return;
    }

    if (amount < 10) { // Minimum withdrawal amount
      setWithdrawError('Minimum withdrawal amount is $10');
      return;
    }

    // Validate bank details if bank transfer is selected
    if (paymentMethod === 'bank' && (!bankAccountNumber || !routingNumber || !accountHolderName)) {
      setWithdrawError('Please provide all required bank details');
      return;
    }

    setIsWithdrawing(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post("/withdraw/request", {
        amount: amount,
        note: withdrawNote || 'Withdrawal request',
        paymentMethod,
        ...(paymentMethod === 'bank' && {
          bankAccountNumber,
          routingNumber,
          accountHolderName
        }),
        isFast: paymentMethod === 'fast'
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setWithdrawSuccess(
        paymentMethod === 'fast'
          ? 'Fast withdrawal request submitted! You will receive your funds within 24 hours.'
          : 'Withdrawal request submitted successfully! We will process it within 2-3 business days.'
      );

   
// Update the balance locally
setSummaryData(prev => ({
  ...prev,
  balance: parseFloat(prev.balance) - amount
}));

      // Clear form
      setWithdrawAmount('');
      setWithdrawNote('');

      // Auto close modal after 3 seconds
      setTimeout(() => {
        closeWithdrawModal();
      }, 3000);

    } catch (error) {
      console.error("Withdrawal error:", error);
      setWithdrawError(
        error.response?.data?.message ||
        'Failed to submit withdrawal request. Please try again.'
      );
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Calculate ratings
  const filterRating = allRating.filter(value => value !== null && !isNaN(value));
  const overallAverageRating = filterRating.length
    ? (filterRating.reduce((acc, rating) => acc + rating, 0) / filterRating.length).toFixed(1)
    : 0;

  const filterRatingFive = allRating.filter(value => value == 5);
  const overallAverageFive = filterRatingFive.length
    ? (filterRatingFive.length / allRating.length) * 100
    : 0;

  const filterRatingFour = allRating.filter(value => value == 4);
  const overallAverageFour = filterRatingFour.length
    ? (filterRatingFour.length / allRating.length) * 100
    : 0;

  const filterRatingThree = allRating.filter(value => value == 3);
  const overallAverageThree = filterRatingThree.length
    ? (filterRatingThree.length / allRating.length) * 100
    : 0;

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
                  <Button
                    className="btn-stepper poppins px-3 font-16"
                    onClick={openWithdrawModal}
                    disabled={!summaryData.balance || summaryData.balance < 10}
                  >
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

                  {/* Total Earning Card */}
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
                    <div className="d-flex align-items-center">
                      {loadingSummary ? (
                        <Skeleton variant="rectangular" width={80} height={80} />
                      ) : (
                        <>
                          <img src={imagarrow} width={80} height={80} alt="" />
                          <div className="ms-2">
                            <p className="font-14 font-500 poppins mb-0 textgray">
                              Gross Earnings
                            </p>
                            <h3 className="font-26 font-500 poppins blackcolor">
                              ${Number(summaryData.gross_earnings || 0).toFixed(2)}
                            </h3>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Net Earnings Card */}
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
                    <div className="d-flex align-items-center">
                      {loadingSummary ? (
                        <Skeleton variant="rectangular" width={80} height={80} />
                      ) : (
                        <>
                          <img src={imagarrow1} width={80} height={80} alt="" />
                          <div className="ms-2">
                            <p className="font-14 font-500 poppins mb-0 textgray">
                              Net Earnings
                            </p>
                            <h3 className="font-26 font-500 poppins blackcolor">
                              ${Number(summaryData.net_earnings || 0).toFixed(2)}
                            </h3>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Wallet Balance Card */}
                  <div className="col-lg-4 col-md-4 col-sm-4 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 px-2">
                    <div className="d-flex align-items-center">
                      {loadingSummary ? (
                        <Skeleton variant="rectangular" width={80} height={80} />
                      ) : (
                        <>
                          <img src={imagarrow2} width={80} height={80} alt="" />
                          <div className="ms-2">
                            <p className="font-14 font-500 poppins mb-0 textgray">
                              Wallet Balance
                            </p>
                            <h3 className="font-26 font-500 poppins blackcolor">
                              ${Number(summaryData.balance || 0).toFixed(2)}
                            </h3>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Chart Section */}
              <div className="bgcolor p-4 mt-3">
                <div className="d-flex justify-content-between chart-headings">
                  <div className="poppins">
                    <h5 className="font-20">Overview</h5>
                    <p className="font-14 takegraycolor">Monthly Earning</p>
                  </div>
                  <select className="form-select border-0 font-12">
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div style={{ width: "100%", height: "300px" }}>
                  {loadingChart ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <CircularProgress />
                    </div>
                  ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <Tooltip content={<CustomTooltip />} />
                        <XAxis
                          dataKey="month"
                          tick={<CustomTick />}
                          interval={0}
                          axisLine={false}
                        />
                        <Bar dataKey="earnings">
                          {chartData.map((entry, index) => (
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
                  ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <p>No earnings data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ratings Section */}
              <div className="mt-lg-4 mt-md-3 mt-2">
                <h3 className="byerLine font-22 font-500 cocon blackcolor">
                  Rating & Reviews
                </h3>
                <div className="Revie">
                  <div className="row justify-content-between mt-4 poppins">
                    <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                      <div className="cardrating text-center p-4">
                        <div>
                          {[...Array(5)].map((_, i) => (
                            <AiFillStar
                              key={i}
                              size={24}
                              color={i < Math.floor(overallAverageRating)
                                ? "rgba(253, 176, 34, 1)"
                                : "rgba(200, 200, 200, 1)"}
                            />
                          ))}
                        </div>
                        <h3 className="mt-2 font-28 fw-semibold" style={{ opacity: "50%" }}>
                          {overallAverageRating} out of 5
                        </h3>
                        <p className="mt-2 mb-0">Top Rating</p>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-3">
                      <div className="gig-rating-rewies">
                        {/* Rating bars */}
                        {[5, 4, 3].map((stars, idx) => (
                          <div key={stars} className={`row align-items-center ${idx > 0 ? "mt-4" : ""}`}>
                            <div className="col-2">
                              <p className="mb-0 font-14 takegraycolor">
                                {stars} Stars
                              </p>
                            </div>
                            <div className="col-10">
                              <div className="progress w-100" style={{ height: "8px" }}>
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${{
                                      5: overallAverageFive,
                                      4: overallAverageFour,
                                      3: overallAverageThree
                                    }[stars]}%`
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews */}
                  {userRating?.length > 0 ? (
                    userRating.map((value, index) => (
                      <div className="mt-3" key={index}>
                        <div className="d-flex justify-content-between mt-lg-5 mt-4">
                          <div className="d-flex">
                            <img
                              className="rounded-circle"
                              src={value.user?.image || ""}
                              width={50}
                              height={50}
                              alt="W8"
                              onError={(e) => e.target.src = '/default-avatar.png'}
                            />
                            <p className="ms-2 font-16 fw-medium">
                              {value.user?.fname || "Anonymous"}
                            </p>
                          </div>
                        </div>
                        <p className="mb-0 font-16 mt-3 takegraycolor text-capitalize">
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
                  ) : (
                    <p className="text-center py-4">No reviews yet</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      <Modal
  open={showWithdrawModal}
  onClose={closeWithdrawModal}
  aria-labelledby="withdraw-modal-title"
  aria-describedby="withdraw-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '95%', sm: '90%', md: '800px' },
      maxWidth: '900px',
      maxHeight: { xs: '90vh', md: '85vh' },
      overflowY: 'auto',
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 0
    }}
  >
    <div className="p-3 p-md-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="font-500 cocon byerLine mb-0 fs-5 fs-md-4">Withdraw Balance</h5>
        <Button
          onClick={closeWithdrawModal}
          disabled={isWithdrawing}
          sx={{ minWidth: 'auto', padding: '4px 8px' }}
        >
          ✕
        </Button>
      </div>

            {/* Available Balance Display */}
            <div className="bg-light p-3 rounded mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="font-14 text-muted">Available Balance:</span>
                <span className="font-18 fw-bold text-success">
                  ${Number(summaryData.balance || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Success Message */}
            {withdrawSuccess && (
              <Alert severity="success" className="mb-3">
                {withdrawSuccess}
              </Alert>
            )}

            {/* Error Message */}
            {withdrawError && (
              <Alert severity="error" className="mb-3">
                {withdrawError}
              </Alert>
            )}

            {/* Payment Method Selection */}
            <div className="mb-4">
              <label className="form-label font-14 fw-medium">
                Payment Method
              </label>
              <div className="border rounded p-2">
                {/* Bank Transfer Option */}
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="bankTransfer"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    disabled={isWithdrawing}
                  />
                  <label className="form-check-label d-flex justify-content-between w-100" htmlFor="bankTransfer">
                    <div>
                      <span className="fw-medium">Bank Transfer</span>
                      <small className="text-muted d-block">2-3 business days</small>
                    </div>
                    {paymentMethod === 'bank' && (
                      <span className="badge bg-primary">Default</span>
                    )}
                  </label>
                </div>

                {/* Show bank account details when bank transfer is selected */}
                {paymentMethod === 'bank' && (
                  <div className="ps-4 mb-3">
                    <div className="mb-2">
                      <label className="form-label font-14">Bank Account Number</label>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter your account number"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        disabled={isWithdrawing}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label font-14">Routing Number</label>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter your routing number"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        disabled={isWithdrawing}
                      />
                    </div>
                    <div>
                      <label className="form-label font-14">Account Holder Name</label>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Enter account holder name"
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        disabled={isWithdrawing}
                      />
                    </div>
                  </div>
                )}

              
                {/* Coming Soon Options */}
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    disabled
                  />
                  <label className="form-check-label text-muted" htmlFor="paypal">
                    PayPal (Coming Soon)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="crypto"
                    disabled
                  />
                  <label className="form-check-label text-muted" htmlFor="crypto">
                    Crypto (Coming Soon)
                  </label>
                </div>
              </div>
            </div>

            {/* Withdraw Amount Input */}
            <div className="mb-3">
              <label className="form-label font-14 fw-medium">
                Withdrawal Amount ($)
              </label>
              <TextField
                fullWidth
                type="number"
                placeholder="Enter amount to withdraw"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                disabled={isWithdrawing}
                inputProps={{
                  min: 10,
                  max: summaryData.balance,
                  step: 0.01
                }}
                helperText={
                  paymentMethod === 'fast'
                    ? `Minimum withdrawal: $10.00 | Available: $${Number(summaryData.balance || 0).toFixed(2)} | Fee: 5%`
                    : `Minimum withdrawal: $10.00 | Available: $${Number(summaryData.balance || 0).toFixed(2)}`
                }
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-3">
              <div className="d-flex gap-2 flex-wrap">
                {[25, 50, 100].map(amount => (
                  <Button
                    key={amount}
                    size="small"
                    variant="outlined"
                    onClick={() => setWithdrawAmount(amount.toString())}
                    disabled={isWithdrawing || amount > summaryData.balance}
                    sx={{ fontSize: '12px' }}
                  >
                    ${amount}
                  </Button>
                ))}
               <Button
  size="small"
  variant="outlined"
  onClick={() => setWithdrawAmount(summaryData.balance.toString())}
  disabled={isWithdrawing || summaryData.balance < 10}
  sx={{ fontSize: '12px' }}
>
  Max
</Button>

              </div>
            </div>

            {/* Amount Summary */}
            {withdrawAmount && parseFloat(withdrawAmount) > 0 && (
              <div className="mb-3 p-2 bg-light rounded">
                <div className="d-flex justify-content-between">
                  <span>Amount:</span>
                  <span>${parseFloat(withdrawAmount).toFixed(2)}</span>
                </div>
                {paymentMethod === 'fast' && (
                  <div className="d-flex justify-content-between">
                    <span>Fee (5%):</span>
                    <span>${(parseFloat(withdrawAmount) * 0.05).toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between fw-bold">
                  <span>You'll receive:</span>
                  <span>
                    $
                    {paymentMethod === 'fast'
                      ? (parseFloat(withdrawAmount) * 0.95).toFixed(2)
                      : parseFloat(withdrawAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Note Input */}
            <div className="mb-4">
              <label className="form-label font-14 fw-medium">
                Note (Optional)
              </label>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add a note for this withdrawal..."
                value={withdrawNote}
                onChange={(e) => setWithdrawNote(e.target.value)}
                disabled={isWithdrawing}
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="outlined"
                onClick={closeWithdrawModal}
                disabled={isWithdrawing}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleWithdrawSubmit}
                disabled={
                  isWithdrawing ||
                  !withdrawAmount ||
                  parseFloat(withdrawAmount) <= 0 ||
                  (paymentMethod === 'bank' && (!bankAccountNumber || !routingNumber || !accountHolderName))
                }
                sx={{
                  backgroundColor: '#F16336',
                  '&:hover': {
                    backgroundColor: '#d4532a'
                  }
                }}
              >
                {isWithdrawing ? (
                  <>
                    <CircularProgress size={16} color="inherit" className="me-2" />
                    Processing...
                  </>
                ) : (
                  'Submit Withdrawal'
                )}
              </Button>
            </div>

            {/* Withdrawal Info */}
            <div className="mt-3 p-3 bg-light rounded">
              <p className="font-12 text-muted mb-1">
                <strong>Processing Time:</strong>
                {paymentMethod === 'fast' ? ' Within 24 hours' : ' 2-3 business days'}
              </p>
              <p className="font-12 text-muted mb-0">
                <strong>Note:</strong> {paymentMethod === 'fast'
                  ? 'Fast withdrawals incur a 5% processing fee.'
                  : 'Standard bank transfers have no additional fees.'}
              </p>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Earning;