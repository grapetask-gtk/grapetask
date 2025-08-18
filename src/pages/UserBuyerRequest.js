import { Box, Button, Modal, Pagination, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "reactstrap";

import search from "../assets/searchbar.webp";
import Navbar from "../components/Navbar";
import { getBdBuyerRequest, getBuyerRequest } from "../redux/slices/buyerRequestSlice";
import { CreateOfferRequest, getExperts, getOfferRequest, getPersonalGigs } from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";
import "../style/userByer.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  overflowY: "auto",
  height: "95vh",
};

const UserBuyerRequest = () => {
  // State management
  const [open, setOpen] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [buyerRequestData, setBuyerRequestData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  

  // Offer creation states
  const [buyerId, setBuyerId] = useState("");
  const [description, setDescription] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [gigRadio, setGigRadio] = useState("");
  const [expertId, setExpertId] = useState("");
  const [offerLoader, setOfferLoader] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);

  // Refs
  const searchTimeoutRef = useRef(null);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const { requestDetail, isLoading } = useSelector((state) => state.buyer);
  const { 
    personalGigs, 
    offerDetail, 
    offerIsLoading, 
    experts, 
    isLoadingExperts, 
    errorExperts 
  } = useSelector((state) => state.offers);

  // Memoized user data to prevent unnecessary re-renders
  const UserData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("UserData")) || {};
    } catch (error) {
      console.error("Error parsing UserData:", error);
      return {};
    }
  }, []);

  const UserRole = UserData?.role;
  const userId = UserData?.id;

  // Constants
  const itemsPerPage = 4;
  const itemsPerPage2 = 4;

  // Memoized calculations
  const calculateRequiredBids = useCallback((price) => {
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.]/g, '')) 
      : price;
    
    if (numericPrice <= 50) return 5;
    if (numericPrice <= 100) return 10;
    if (numericPrice <= 150) return 15;
    if (numericPrice <= 200) return 20;
    if (numericPrice <= 250) return 25;
    if (numericPrice <= 300) return 30;
    if (numericPrice <= 350) return 35;
    if (numericPrice <= 400) return 40;
    if (numericPrice <= 450) return 45;
    if (numericPrice <= 500) return 50;
    return 55;
  }, []);

  // Debounced search handler
  const handleSearchChange = useCallback((value) => {
    setSearchKeyword(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);
  }, []);

  // Pagination calculations
  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      visibleData: offerDetail.slice(startIndex, endIndex),
      totalPages: Math.ceil(offerDetail.length / itemsPerPage)
    };
  }, [offerDetail, currentPage]);

  const paginationData2 = useMemo(() => {
    const startIndex = (currentPage2 - 1) * itemsPerPage2;
    const endIndex = startIndex + itemsPerPage2;
    return {
      visibleData: requestDetail.slice(startIndex, endIndex),
      totalPages: Math.ceil(requestDetail.length / itemsPerPage2)
    };
  }, [requestDetail, currentPage2]);

  // Filtered data with memoization
  const filteredActiveData = useMemo(() => {
    if (!debouncedSearch) return paginationData2.visibleData;
    
    const searchLower = debouncedSearch.toLowerCase();
    return paginationData2.visibleData.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(searchLower);
      const descMatch = item.description?.toLowerCase().includes(searchLower);
      return titleMatch || descMatch;
    });
  }, [paginationData2.visibleData, debouncedSearch]);

  const filteredOfferData = useMemo(() => {
    if (!debouncedSearch) return paginationData.visibleData;
    
    const searchLower = debouncedSearch.toLowerCase();
    return paginationData.visibleData.filter((value) =>
      value.description?.toLowerCase().includes(searchLower)
    );
  }, [paginationData.visibleData, debouncedSearch]);

  // Calculate duration memoized function
  const calculateDuration = useCallback((createdAt, date) => {
    const diffInSeconds = Math.floor(
      (new Date(date) - new Date(createdAt)) / 1000
    );
    
    if (diffInSeconds < 60) return "Duration just now";
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Duration ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Duration ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }
    if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `Duration ${days} ${days === 1 ? "day" : "days"} ago`;
    }
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `Duration ${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(diffInSeconds / 31536000);
    return `Duration ${years} ${years === 1 ? "year" : "years"} ago`;
  }, []);

  // Event handlers with useCallback
  const handleClose = useCallback(() => {
    setOpen(false);
    setInviteModal(false);
    setBuyerRequestData(null);
  }, []);

  const handleCreateOfferClick = useCallback((buyerRequest) => {
    setBuyerId(buyerRequest.id);
    setBuyerRequestData(buyerRequest);
    setOpen(true);
  }, []);



  

  const handleInviteExpertClick = useCallback((buyerRequest) => {
    setBuyerId(buyerRequest.id);
    setBuyerRequestData(buyerRequest);
    setInviteModal(true);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);

  const handlePageChange2 = useCallback((event, value) => {
    setCurrentPage2(value);
  }, []);

  const handlePriceChange = useCallback((e) => {
    let value = e.target.value;
    value = value.replace("$", "");
    value = value.replace(/[^0-9$]/g, "");
    setOfferPrice("$" + value);
  }, []);

  const handleResponseOffer = useCallback((data) => {
    if (data?.status) {
      setOfferLoader(false);
      setOpen(false);
      setInviteModal(false);
      setBuyerRequestData(null);
      toast.success("Offer created successfully!");
    } else {
      setOfferLoader(false);
      const errorMsg = data?.message || "Offer creation failed: Please try again.";
      
      if (data?.message === "Not enough bids! Please purchase more bids to submit an offer.") {
        toast.error(
          <>
            Not enough bids! Please purchase more bids to submit an offer.
            <br />
            <Button onClick={() => navigate("/buy-bids")}>Buy Bids</Button>
          </>
        );
      } else {
        toast.error(errorMsg);
      }
    }
  }, [navigate]);


  // In handleSubmitOffer, ensure gig_id is included in the payload
const handleSubmitOffer = useCallback(async (e) => {
  e.preventDefault();
  
   const offerData = {
  id: buyerId, 
  client_id: buyerRequestData?.client?.id, 
  gig_id: gigRadio || null, 
  description: description.trim(),
  price: offerPrice.replace('$', ''),
  date: offerDate, 
  expert_id: UserRole === "bidder/company representative/middleman" 
    ? (expertId || null) 
    : (buyerRequestData?.expert_id || null) // Use null instead of empty string
};


  setOfferLoader(true);
  
  try {
    // Using callback method
    await dispatch(CreateOfferRequest(offerData, handleResponseOffer)).unwrap();
    // handleResponseOffer will be called automatically
  } catch (error) {
    console.error("Error creating offer:", error);
    // handleResponseOffer will be called with error automatically
  } finally {
    setOfferLoader(false);
  }
},  [
  
  buyerId,
  description,
  offerPrice,
  offerDate,
  gigRadio,
  expertId,
  buyerRequestData,
  UserRole,
  dispatch,
  handleResponseOffer
]);

  const resetForm = useCallback(() => {
    setDescription("");
    setOfferPrice("");
    setOfferDate("");
    setGigRadio("");
    setExpertId("");
    setOpen(false);
    setInviteModal(false);
  }, []);

  // Effects - Optimized to run only when necessary
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Batch API calls
        const promises = [
          dispatch(getBuyerRequest()),
          dispatch(getOfferRequest()),
          dispatch(getExperts())
        ];

        if (UserRole === 'expert/freelancer') {
          promises.push(dispatch(getBdBuyerRequest()));
        }

        if (userId) {
          promises.push(dispatch(getPersonalGigs({ user_id: userId })));
        }

        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, UserRole, userId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid pt-5 mb-5 userByerMain">
        <h4 className="byerLine font-20 font-500 cocon blackcolor ms-lg-4">
          Buyer Request
        </h4>
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0 allgigs-field poppins Revie rounded-3 p-3 pt-3">
          <div className="col-lg-8 col-12">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item d-flex align-items-center" role="presentation">
                <button
                  className="nav-link active rounded-0"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Active{" "}
                  <span className="p-1 rounded-2 font-12 font-500 poppins">
                    {requestDetail?.length || 0}
                  </span>
                </button>
              </li>
              <li className="nav-item d-flex align-items-center ms-l-5" role="presentation">
                <button
                  className="nav-link rounded-0"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Sent Offer{" "}
                  <span className="p-1 rounded-2 font-12 font-500 poppins">
                    {offerDetail?.length || 0}
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-lg-0 my-3 pe-lg-0">
            <div className="input-group p-2">
              <span className="input-group-text pt-0 pb-0" id="basic-addon1">
                <img src={search} width={16} alt="Search" />
              </span>
              <input
                type="text"
                className="form-control p-0 font-12"
                id="floatingInputGroup1"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <hr
                style={{
                  opacity: "1",
                  height: "8px",
                  backgroundColor: "#F5F5FF",
                  border: "none",
                }}
              />
              <div className="tab-content" id="pills-tabContent">
                {/* Active Requests Tab */}
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex={0}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        {isLoading ? (
                          <div className="d-flex justify-content-center p-4">
                            <Spinner color="primary" />
                          </div>
                        ) : (
                          filteredActiveData.map((value, index) => (
                            <div className="p-3 cardrating mt-2" key={value.id || index}>
                              <div className="d-flex flex-wrap">
                                <img
                                  src={value?.client?.image}
                                  width={60}
                                  height={60}
                                  className="rounded-rounded-circle flex-shrink-0"
                                  alt="client"
                                />
                                <div className="ms-2">
                                  <p className="font-18 poppins fw-semibold mb-0">
                                    {value?.title}
                                  </p>
                                  <p className="font-16 poppins takegraycolor mb-0">
                                    {value?.description}
                                  </p>
                                  <p className="mb-0 font-14 poppins">
                                    {new Date(value?.created_at).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between mt-3 flex-wrap align-items-center">
                                <Button
                                  className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                                  onClick={() => handleCreateOfferClick(value)}
                                >
                                  Create Offer
                                </Button>
                                {UserRole === "bidder/company representative/middleman" && (
                                  <Button
                                    className="btn-stepper poppins px-4 fw-normal font-16 w-auto ms-2"
                                    onClick={() => handleInviteExpertClick(value)}
                                  >
                                    Invite Expert
                                  </Button>
                                )}
                                <div className="userByer d-inline-flex mt-lg-0 mt-2 flex-wrap">
                                  <span className="rounded-3">
                                    Offers {value?.offers?.length || 0}
                                  </span>
                                  <span className="rounded-3">
                                    Budget {value?.price}
                                  </span>
                                  <span className="rounded-3">
                                    Bids Needed: {calculateRequiredBids(value?.price)}
                                  </span>
                                  <span className="rounded-3">
                                    {calculateDuration(value?.created_at, value?.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                      <Stack spacing={4}>
                        <Pagination
                          count={paginationData2.totalPages}
                          shape="rounded"
                          page={currentPage2}
                          onChange={handlePageChange2}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>

                {/* Sent Offers Tab */}
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex={0}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <h6 className="font-20 font-500 cocon">Offers</h6>
                      {offerIsLoading ? (
                        <div className="d-flex justify-content-center p-4">
                          <Spinner color="primary" />
                        </div>
                      ) : (
                        filteredOfferData.map((value, index) => (
                          <div className="col-12 mt-3" key={value.id || index}>
                            <div className="cardrating p-3">
                              <h6 className="font-18 font-500 poppins">
                                {value.title}
                              </h6>
                              <p className="font-16 poppins takegraycolor mb-0 mt-2">
                                {value.description}
                              </p>
                              <div className="d-flex mt-3">
                                <p className="font-14 poppins takegraycolor mb-0">
                                  <TiTick size={20} /> Color Grading
                                </p>
                                <p className="mx-3 font-14 poppins takegraycolor mb-0">
                                  <TiTick size={20} /> Color Grading
                                </p>
                                <p className="font-14 poppins takegraycolor mb-0">
                                  <TiTick size={20} /> Color Grading
                                </p>
                              </div>
                              <div className="userByer my-2 mt-3">
                                <span className="rounded-3 font-14 poppins">
                                  Budget {value.price}
                                </span>
                                <span className="rounded-3 font-14 poppins">
                                  {calculateDuration(value?.created_at, value?.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                        <Stack spacing={4}>
                          <Pagination
                            count={paginationData.totalPages}
                            variant="outlined"
                            shape="rounded"
                            page={currentPage}
                            onChange={handlePageChange}
                          />
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Create Offer / Invite Expert */}
      <Modal
        open={open }
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-lg-3 p-md-3 p-2" sx={style}>
          <div className="d-flex justify-content-between">
            <h1 className="font-20 font-500 cocon blackcolor">
              {inviteModal ? "Invite Expert" : `Offer Request ${buyerId}`}
            </h1>
            <button
              type="button"
              onClick={resetForm}
              className="btn-close"
              aria-label="Close"
            />
          </div>
          <div className="container-fluid profileSetting">
            <form onSubmit={handleSubmitOffer} className="row">
              <div className="col-12 prof-fields">
                <label htmlFor="description" className="form-label font-18 poppins blackcolor">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                  className="form-control p-3 textArea border-0 font-16 poppins"
                  required
                  id="description"
                />
                <p className="font-12 text-secondary text-end mt-2">
                  {description.length}/200
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 prof-fields mt-4">
                <label htmlFor="Price" className="form-label font-18 poppins blackcolor">
                  Price
                </label>
                <input
                  type="text"
                  value={offerPrice}
                  onChange={handlePriceChange}
                  placeholder="$0"
                  className="form-control p-3 border-0 font-16 poppins"
                  required
                  id="Price"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12 prof-fields mt-4">
                <label htmlFor="date" className="form-label font-18 poppins blackcolor">
                  Date
                </label>
                <input
                  type="date"
                  value={offerDate}
                  onChange={(e) => setOfferDate(e.target.value)}
                  className="form-control p-3 border-0 font-16 poppins"
                  required
                  id="date"
                />
              </div>
              {UserRole === "bidder/company representative/middleman" && (
                <div className="col-12 prof-fields mt-4">
                  <label htmlFor="expertId" className="form-label font-18 poppins blackcolor">
                    Select Expert (Optional)
                  </label>
                  <select
                    className="form-control p-3 border-0 font-16 poppins"
                    value={expertId}
                    onChange={(e) => setExpertId(e.target.value)}
                    id="expertId"
                  >
                    <option value="">-- Select an Expert --</option>
                    {experts?.length > 0 ? (
                      experts.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.fname} {ex.lname}
                        </option>
                      ))
                    ) : (
                      <option disabled>
                        {isLoadingExperts ? "Loading experts..." : "No experts available"}
                      </option>
                    )}
                  </select>
                  <small className="text-muted">
                    If selected, this will invite the expert and update the order status to "Project Started".
                  </small>
                </div>
              )}
            
<div className="container-fluid">
  <div className="row">
    {personalGigs?.map((innerValue, idx) => (
      <div className="col-lg-3 mt-3" key={innerValue.id || idx}>
        <div
          className="rounded-4 px-2 h-100"
          style={{ backgroundColor: "#f5f5ff" }}
        >
          <input
           
            checked={gigRadio === innerValue.id}
            type="radio"
            value={innerValue.id}
            onChange={() => setGigRadio(innerValue.id)}
            name="gigCheck"
            id={`radio${idx}`}
          />
          <label htmlFor={`radio${idx}`}>
            <img
              height={150}
              src={
                innerValue.media?.image1 || 
                innerValue.media?.image2 || 
                innerValue.media?.image3
              }
              alt="Gig"
              className="w-100 object-fit-cover shadow rounded-4"
            />
            <p className="text-secondary font-12 mt-2">
              {innerValue.title}
            </p>
          </label>
        </div>
      </div>
    ))}
  </div>
</div>

              <div className="mt-4 text-end">
                <Button
                  type="submit"
                  disabled={offerLoader}
                  className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                >
                  {offerLoader ? <Spinner size="sm" color="light" /> : "Send Offer"}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <Modal
        open={inviteModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-lg-3 p-md-3 p-2" sx={style}>
          <div className="d-flex justify-content-between">
            <h1 className="font-20 font-500 cocon blackcolor">
              {inviteModal ? "Invite Expert" : `Offer Request ${buyerId}`}
            </h1>
            <button
              type="button"
              onClick={resetForm}
              className="btn-close"
              aria-label="Close"
            />
          </div>
          <div className="container-fluid profileSetting">
            <form onSubmit={handleSubmitOffer} className="row">
              <div className="col-12 prof-fields">
                <label htmlFor="description" className="form-label font-18 poppins blackcolor">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={200}
                  className="form-control p-3 textArea border-0 font-16 poppins"
                  required
                  id="description"
                />
                <p className="font-12 text-secondary text-end mt-2">
                  {description.length}/200
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-12 prof-fields mt-4">
                <label htmlFor="Price" className="form-label font-18 poppins blackcolor">
                  Price
                </label>
                <input
                  type="text"
                  value={offerPrice}
                  onChange={handlePriceChange}
                  placeholder="$0"
                  className="form-control p-3 border-0 font-16 poppins"
                  required
                  id="Price"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12 prof-fields mt-4">
                <label htmlFor="date" className="form-label font-18 poppins blackcolor">
                  Date
                </label>
                <input
                  type="date"
                  value={offerDate}
                  onChange={(e) => setOfferDate(e.target.value)}
                  className="form-control p-3 border-0 font-16 poppins"
                  required
                  id="date"
                />
              </div>
              {UserRole === "bidder/company representative/middleman" && (
                <div className="col-12 prof-fields mt-4">
                  <label htmlFor="expertId" className="form-label font-18 poppins blackcolor">
                    Select Expert 
                                      </label>
                  <select
                  required
                    className="form-control p-3 border-0 font-16 poppins"
                    value={expertId}
                    onChange={(e) => setExpertId(e.target.value)}
                    id="expertId"
                  >
                    <option value="">-- Select an Expert --</option>
                    {experts?.length > 0 ? (
                      experts.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.fname} {ex.lname}
                        </option>
                      ))
                    ) : (
                      <option disabled>
                        {isLoadingExperts ? "Loading experts..." : "No experts available"}
                      </option>
                    )}
                  </select>
                  <small className="text-muted">
                    If selected, this will invite the expert and update the order status to "Project Started".
                  </small>
                </div>
              )}
            

              <div className="mt-4 text-end">
                <Button
                  type="submit"
                  disabled={offerLoader}
                  className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                >
                  {offerLoader ? <Spinner size="sm" color="light" /> : "Send Offer"}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default UserBuyerRequest;