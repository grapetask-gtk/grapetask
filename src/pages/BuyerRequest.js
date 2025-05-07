<<<<<<< HEAD
import React from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import Navbar from "../components/Navbar";
import { useState } from "react";
import "../style/multistep.scss";
import "../style/byerRequest.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import {
  CreateBuyerRequest,
  getClientRequest,
} from "../redux/slices/buyerRequestSlice";
import { useNavigate } from "react-router-dom";
import { getCategory, getSubCategory } from "../redux/slices/gigsSlice";
import { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { Spinner } from "reactstrap";
const BuyerRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.allOrder);
  const { userCategory, userSubCategory } = useSelector((state) => state.gig);
  const { requestClientList,isLoadingCreate, isLoadingBuyerList } = useSelector((state) => state.buyer);
  const UserData = JSON.parse(localStorage.getItem("UserData"));

  console.log(requestClientList, "=================client request");
  //  console.log(userCategory);
  const [gigTitle, setGigTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [delivered, setDelivered] = useState("");
  // const [service, setService] = useState('');
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  // console.log(category,'=========cat');
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: gigTitle,
      description: description,
      category_id: category,
      price: budget,
      date: delivered,
    };
    dispatch(CreateBuyerRequest(data, handleResponse));
  };
  const handleResponse = (data) => {
    if (data?.status) {
      navigate("/freelancers");
      //   alert(data?.message)
    } else {
      //   alert(data?.message)
    }
  };
  // ===============Category ==============

  useEffect(() => {
    let data = {
      client_id: UserData.id,
    };
    dispatch(getClientRequest(data));
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);
=======
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "../redux/store/store";
import Navbar from "../components/Navbar";
import "../style/multistep.scss";
import "../style/byerRequest.scss";
import { 
  Button, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography 
} from "@mui/material";
import { CreateBuyerRequest, getClientRequest, getBds } from "../redux/slices/buyerRequestSlice";
import { getCategory, getSubCategory } from "../redux/slices/gigsSlice";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const BuyerRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const { isLoading } = useSelector((state) => state.allOrder);
  const { userCategory, userSubCategory } = useSelector((state) => state.gig);
  const { requestClientList, isLoadingCreate, isLoadingBuyerList, bdList } = useSelector((state) => state.buyer);

  // User data from localStorage
  const UserData = JSON.parse(localStorage.getItem("UserData"));

  // Local states
  const [formState, setFormState] = useState({
    gigTitle: "",
    description: "",
    budget: "",
    delivered: "",
    category: "",
    subCategory: "",
    visibility: "public", // "public" or "inviteOnly"
    inviteBDs: [] // store selected BD IDs when visibility is invite only
  });
  const [formError, setFormError] = useState("");

  // Ref for buyer request list container
  const buyerRequestListRef = useRef(null);

  // Derived state for subcategories
  const filteredSubCategories = userSubCategory.filter(
    (sub) => parseInt(sub.category_id) === parseInt(formState.category)
  );

  // Memoized fetch function
  const fetchInitialData = useCallback(() => {
    if (UserData?.id) {
      dispatch(getClientRequest({ client_id: UserData.id }));
    }
    dispatch(getCategory());
    dispatch(getSubCategory());
    // Dispatch getBds to load BD list
    dispatch(getBds());
  }, [UserData?.id, dispatch]);

  // Handle form field changes
  const handleInputChange = (field) => (e) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    if (formError) setFormError("");
  };

  // Handle budget input with currency formatting
  const handleBudgetChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormState((prev) => ({ ...prev, budget: value ? `$${value}` : "" }));
  };

  // Form validation
  const validateForm = () => {
    if (!formState.category || !formState.subCategory) {
      setFormError("Please select both category and subcategory");
      return false;
    }
    if (!formState.gigTitle || !formState.description || !formState.budget || !formState.delivered) {
      setFormError("Please fill in all required fields");
      return false;
    }
    // If inviteOnly is selected, ensure at least one BD is invited
    if (formState.visibility === "inviteOnly" && formState.inviteBDs.length === 0) {
      setFormError("Please select at least one BD to invite.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      title: formState.gigTitle,
      description: formState.description,
      category_id: parseInt(formState.category),
      sub_category_id: parseInt(formState.subCategory),
      price: formState.budget.replace("$", ""),
      date: formState.delivered,
      visibility: formState.visibility,
      invite_bds: formState.visibility === "inviteOnly" ? formState.inviteBDs : []
    };

    dispatch(CreateBuyerRequest(requestData, handleResponse));
  };

  // Updated handleResponse: scrolls to buyer request list instead of navigating
  const handleResponse = (response) => {
    if (response?.success) {
      // Optionally, reset the form here:
      setFormState({
        gigTitle: "",
        description: "",
        budget: "",
        delivered: "",
        category: "",
        subCategory: "",
        visibility: "public",
        inviteBDs: []
      });
      // Re-fetch buyer requests so the list is updated
      dispatch(getClientRequest({ client_id: UserData.id }));
      // Scroll smoothly to the buyer request list section
      buyerRequestListRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setFormError(response?.error || "Request failed. Please try again.");
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);
>>>>>>> d918fe2 (cahnges by abdul qavi)

  return (
    <div>
      <Navbar FirstNav="none" />
      <div className="container-fluid my-lg-5 my-4 byerRequest">
<<<<<<< HEAD
        <div className="row justify-content-center ">
          <div className="col-11">
            <h1 className="byerLine font-28 cocon blackcolor">Buyer Request</h1>
          </div>
          <div
            className="col-lg-11 col-12 bg-white p-3 rounded-3 mt-4"
            style={{ boxShadow: " 0px -2px 31px 0px #0000001A" }}
          >
            <form
              onSubmit={handleSubmit}
              className="stepOne px-lg-3    pt-4 pb-4  rounded-3"
              style={{ backgroundColor: " #F5F5FF" }}
            >
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3 poppins">
                      <label className="form-label fw-medium font-20 ">
                        Job Title
                      </label>
                      <input
                        onChange={(e) => setGigTitle(e.target.value)}
                        maxLength={80}
                        value={gigTitle}
                        className="form-control fw-medium font-18 p-4 px-3 mt-2"
                        placeholder="I'm Looking for Expert for my project"
                        required
                      />
                      <p className="text-end font-12 mt-2 takegraycolor">
                        {gigTitle.length} / 80 max
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <p className="blackcolor font-18 poppins fw-medium">Category</p>
                <div className="row">
                  <div className="col-lg-5 col-12">
                    <p className="font-14 takegraycolor poppins">
                      Choose the category and sub-category most suitable for
                      your Job.
                    </p>
                  </div>
                  <div className="col-lg-7 col-12 pe-lg-0 ps-lg-2 ps-0 pe-0 ">
                    <div className="container-fluid">
                      <div className="row poppins">
                        <div className="col-lg-6 col-12  pe-lg-2 ">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select takegraycolor font-14  pt-2 pb-2"
                            required
                          >
                            <option selected>Select A Category</option>
                            {userCategory.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-lg-6 col-12  ps-lg-2  mt-lg-0 mt-3">
                          <select
                            className="form-select takegraycolor font-14 pt-2 pb-2"
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            required
                            disabled={!category}
                          >
                            <option selected>Select A Subcategory</option>
                            {userSubCategory
                              .filter((sub) => sub.category_id === category)
                              .map((sub) => (
                                <option key={sub.id} value={sub.id}>
                                  {sub.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="blackcolor font-18 poppins fw-medium mt-4">
                  Description
                </p>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3 poppins">
                      <textarea
                        style={{ resize: "none" }}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={1000}
                        value={description}
                        className="form-control fw-medium font-18 p-4 px-3 mt-2"
                        rows={3}
                        required
                      ></textarea>
                      <p className="text-end font-12 mt-2 takegraycolor">
                        {description.length} / 1000 max
                      </p>
=======
        <div className="row justify-content-center">
          <div className="col-11">
            <Typography variant="h4" className="byerLine cocon blackcolor">
              Buyer Request
            </Typography>
          </div>

          {/* Request Form */}
          <div className="col-lg-11 col-12 bg-white p-3 rounded-3 mt-4 shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="stepOne px-lg-3 pt-4 pb-4 rounded-3 bg-primary-10"
            >
              {formError && (
                <div className="alert alert-danger" role="alert">
                  {formError}
                </div>
              )}

              {/* Job Title */}
              <div className="mb-3">
                <InputLabel htmlFor="gigTitle" className="form-label fw-medium fs-5">
                  Job Title
                </InputLabel>
                <TextField
                  id="gigTitle"
                  value={formState.gigTitle}
                  onChange={handleInputChange("gigTitle")}
                  placeholder="I'm looking for an expert for my project"
                  required
                  fullWidth
                  inputProps={{ maxLength: 80 }}
                />
                <div className="text-end text-muted small mt-1">
                  {formState.gigTitle.length} / 80 max
                </div>
              </div>

              {/* Visibility Option */}
              <div className="mb-3">
                <FormControl fullWidth>
                  <InputLabel id="visibility-label">Request Visibility</InputLabel>
                  <Select
                    labelId="visibility-label"
                    id="visibility"
                    value={formState.visibility}
                    onChange={handleInputChange("visibility")}
                    fullWidth
                  >
                    <MenuItem value="public">Public (All BDs can see)</MenuItem>
                    <MenuItem value="inviteOnly">Invite Only (Selected BDs)</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Conditional BD Invitation (for Invite Only) */}
              {formState.visibility === "inviteOnly" && (
                <div className="mb-3">
                  <FormControl fullWidth>
                    <InputLabel id="invite-bd-label">Invite BD(s)</InputLabel>
                    <Select
                      labelId="invite-bd-label"
                      id="inviteBD"
                      multiple
                      value={formState.inviteBDs}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, inviteBDs: e.target.value }));
                        if (formError) setFormError("");
                      }}
                      renderValue={(selected) =>
                        selected
                          .map((id) => bdList.find((bd) => bd.id === id)?.fname)
                          .join(', ')
                      }
                    >
                      {bdList?.map((bd) => (
                        <MenuItem key={bd.id} value={bd.id}>
                          {bd.fname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              {/* Category Selection */}
              <div className="mb-4">
                <InputLabel className="form-label fw-medium fs-5">Category</InputLabel>
                <div className="row g-3">
                  <div className="col-lg-6">
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Select Category</InputLabel>
                      <Select
                        labelId="category-label"
                        value={formState.category}
                        onChange={handleInputChange("category")}
                        required
                      >
                        <MenuItem value="">
                          <em>Select Category</em>
                        </MenuItem>
                        {userCategory.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-lg-6">
                    <FormControl fullWidth disabled={!formState.category}>
                      <InputLabel id="subCategory-label">Select Subcategory</InputLabel>
                      <Select
                        labelId="subCategory-label"
                        value={formState.subCategory}
                        onChange={handleInputChange("subCategory")}
                        required
                      >
                        <MenuItem value="">
                          <em>Select Subcategory</em>
                        </MenuItem>
                        {filteredSubCategories.map((sub) => (
                          <MenuItem key={sub.id} value={sub.id}>
                            {sub.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <InputLabel htmlFor="description" className="form-label fw-medium fs-5">
                  Description
                </InputLabel>
                <TextField
                  id="description"
                  value={formState.description}
                  onChange={handleInputChange("description")}
                  placeholder="Provide details about your project"
                  multiline
                  rows={4}
                  required
                  fullWidth
                  inputProps={{ maxLength: 1000 }}
                />
                <div className="text-end text-muted small mt-1">
                  {formState.description.length} / 1000 max
                </div>
              </div>

              {/* Job Details: Budget and Delivery Date */}
              <div className="mb-4">
                <InputLabel className="form-label fw-medium fs-5">Job Details</InputLabel>
                <div className="row g-3 bg-white p-3 rounded">
                  <div className="col-md-4">
                    <div className="form-group">
                      <InputLabel htmlFor="budget" className="text-muted fs-6">
                        Budget
                      </InputLabel>
                      <TextField
                        id="budget"
                        type="text"
                        value={formState.budget}
                        onChange={handleBudgetChange}
                        placeholder="$0"
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <InputLabel htmlFor="delivered" className="text-muted fs-6">
                        Delivery Date
                      </InputLabel>
                      <TextField
                        id="delivered"
                        type="date"
                        value={formState.delivered}
                        onChange={handleInputChange("delivered")}
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <InputLabel className="text-muted fs-6">Service</InputLabel>
                      {formState.category && (
                        <Typography variant="body1" className="fs-6 fw-medium">
                          {userCategory.find(c => c.id === parseInt(formState.category))?.name}
                        </Typography>
                      )}
>>>>>>> d918fe2 (cahnges by abdul qavi)
                    </div>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
              <div className="container-fluid ">
                <div className="row poppins ">
                  <div className="col-12 ">
                    <h6 className="blackcolor font-18">
                      Job Price and Duration
                    </h6>
                    <div className="container-fluid mt-2">
                      <div className="row bg-white rounded-1">
                        <div className="col-lg-4 col-md-6 col-12">
                          <div className="p-3">
                            <h6 className="takegraycolor font-18">Budget</h6>
                            <input
                              type="text"
                              value={budget}
                              onChange={(e) => {
                                let value = e.target.value;

                                // Remove dollar sign if it exists
                                value = value.replace("$", "");

                                // Remove non-numeric characters (except the dollar sign)
                                value = value.replace(/[^0-9$]/g, "");

                                // Add dollar sign back
                                setBudget("$" + value);
                              }}
                              className="without-border fw-medium  blackcolor font-18 w-100 "
                              placeholder="$0"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12  buyercards">
                          <div className=" p-3">
                            <h6 className="takegraycolor font-18">
                              Delivered by
                            </h6>
                            <input
                              type="date"
                              value={delivered}
                              onChange={(e) => setDelivered(e.target.value)}
                              className="without-border fw-medium  blackcolor font-18 w-100 "
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12  buyercards">
                          <div className=" p-3">
                            <h6 className="takegraycolor font-18">Service</h6>
                            {/* Display the selected category */}
                            {category && (
                              <h6 className="fw-medium blackcolor font-18">
                                {
                                  userCategory.find(
                                    (cat) => cat.id === parseInt(category, 10)
                                  )?.name
                                }
                              </h6>
                            )}

                            <h6 className="blackcolor font-18"></h6>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-end mt-4">
                        <Button
                          type="submit" loading={true} disabled={isLoadingCreate}
                          className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                        >
                                        {isLoadingCreate ? <Spinner size="sm" color="light" /> : 'Save'}

                          
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {requestClientList && (
            <div className="col-lg-11 col-12 userByerMain ">
              <h3 className="fw-semibold byerLine  my-4  cocon">
                All Buyer Request
              </h3>
              {isLoadingBuyerList && <h3 className="cocon mt-3 ">Loading...</h3>}

              {requestClientList?.map((value, index) => (
                <div
                  className="p-3 cardrating mt-2"
                  
                  key={index}
                >
                  <div className="d-flex  ">
                    <img
                      src={value?.client?.image}
                      width={60}
                      height={60}
                      className="rounded-rounded-circle flex-shrink-0"
                      alt="w8"
                    />
                    <div className="ms-2">
                      <p className="font-18 poppins fw-semibold  mb-0">
                        {value?.title}
                      </p>
                      <p className="font-16 poppins takegraycolor mb-0">
                        {value?.description}
                      </p>
                      <p className="mb-0 font-14 poppins">
                        {new Date(value?.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3 flex-wrap align-items-center ">
                    <Button className="btn-stepper poppins px-4 fw-normal font-16 w-auto" 
                    onClick={() => navigate(`/offerDetail?requestId=${value.id}`, { state: { clientId: value.id } })}>
                      View All Offers
                    </Button>
                    <div className="userByer d-inline-flex mt-lg-0 mt-md-0 mt-sm-0 mt-2 flex-wrap poppins">
                      {/* <span className="rounded-3">Offers 27</span> */}
                      <span className="rounded-3">Budget {value?.price}</span>
                      <span className="rounded-3">
                        {/* Duration {`${Math.floor((new Date(value.date) - new Date(value.created_at)) / (1000 * 60 * 60 * 24))}`} days */}
                        {(() => {
                          const diffInSeconds = Math.floor(
                            (new Date(value?.date) -
                              new Date(value?.created_at)) /
                              1000
                          );

                          if (diffInSeconds < 60) {
                            return "Duration just now";
                          } else if (diffInSeconds < 3600) {
                            const minutes = Math.floor(diffInSeconds / 60);
                            return `Duration ${minutes} ${
                              minutes === 1 ? " minute" : " minutes"
                            } ago`;
                          } else if (diffInSeconds < 86400) {
                            const hours = Math.floor(diffInSeconds / 3600);
                            return `Duration ${hours} ${
                              hours === 1 ? " hour" : " hours"
                            } ago`;
                          } else if (diffInSeconds < 2592000) {
                            const days = Math.floor(diffInSeconds / 86400);
                            return `Duration ${days} ${
                              days === 1 ? " day" : " days"
                            } ago`;
                          } else if (diffInSeconds < 31536000) {
                            const months = Math.floor(diffInSeconds / 2592000);
                            return `Duration ${months} ${
                              months === 1 ? " month" : " months"
                            } ago`;
                          } else {
                            const years = Math.floor(diffInSeconds / 31536000);
                            return `${years} ${
                              years === 1 ? " year" : " years"
                            } ago`;
                          }
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
=======

              <div className="text-end">
                <Button
                  type="submit"
                  disabled={isLoadingCreate}
                  variant="contained"
                  className="px-4 py-2"
                >
                  {isLoadingCreate ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save Request"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Buyer Requests List */}
          <div className="col-lg-11 col-12 mt-5" ref={buyerRequestListRef}>
            <Typography variant="h5" className="fw-semibold mb-4 cocon">
              All Buyer Requests
            </Typography>
            {isLoadingBuyerList ? (
              <div className="text-center py-4">
                <CircularProgress color="primary" />
              </div>
            ) : (
              requestClientList?.map((request) => (
                <div className="card mb-3" key={request.id}>
                  <div className="card-body">
                    <div className="d-flex align-items-start gap-3">
                      <img
                        src={request.client?.image}
                        alt={`${request.client?.name}'s profile`}
                        className="rounded-circle"
                        width="60"
                        height="60"
                      />
                      <div className="flex-grow-1">
                        <Typography variant="h6" className="card-title mb-1">
                          {request.title}
                        </Typography>
                        <Typography variant="body2" className="card-text text-muted mb-2">
                          {request.description}
                        </Typography>
                        <small className="text-muted">
                          Posted {formatDistanceToNow(new Date(request.created_at))} ago
                        </small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/offerDetail/${request.id}`)}
                      >
                        View Offers
                      </Button>
                      <div className="d-flex gap-2">
                        <span className="badge bg-primary">
                          Budget: {request.price}
                        </span>
                        <span className="badge bg-secondary">
                          Delivery: {new Date(request.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
>>>>>>> d918fe2 (cahnges by abdul qavi)
        </div>
      </div>
    </div>
  );
};

export default BuyerRequest;
