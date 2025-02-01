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

  return (
    <div>
      <Navbar FirstNav="none" />
      <div className="container-fluid my-lg-5 my-4 byerRequest">
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
                    </div>
                  </div>
                </div>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default BuyerRequest;
