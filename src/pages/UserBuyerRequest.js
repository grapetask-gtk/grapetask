import React from "react";
import search from "../assets/searchbar.webp";
import Navbar from "../components/Navbar";
import "../style/userByer.scss";
import SentOffer from "../components/SentOffer";
import activimg from "../assets/activpic.webp";
import {
  Box,
  Button,
  Modal,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { getBuyerRequest } from "../redux/slices/buyerRequestSlice";
import { useDispatch, useSelector } from "../redux/store/store";
import { useEffect } from "react";
import {
  CreateOfferRequest,
  getOfferRequest,
  getPersonalGigs,
} from "../redux/slices/offersSlice";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { Spinner } from "reactstrap";
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const { requestDetail, isLoading } = useSelector((state) => state.buyer);
  const { personalGigs, offerDetail, offerIsLoading } = useSelector(
    (state) => state.offers
  );
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(getBuyerRequest());
  }, [dispatch]);
  // ================== OFFERS CREATE ================
  const [buyerId, setBuyerId] = useState("");
  const [description, setDescription] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [gigRadio, setGigRadio] = useState("");
  const [offerLoader, setOfferLoader] = useState(false);
  console.log(offerLoader, "====================offerLoader");
  const handleSubmitOffer = (e) => {
    e.preventDefault();
    let data = {
      buyer_request_id: buyerId,
      buyer_id: buyerId,
      gig_id: gigRadio,
      description: description,
      price: offerPrice,
      date: offerDate,
    };
    dispatch(CreateOfferRequest(data, handleResponseOffer));
    setOfferLoader(true);
  };
  const handleResponseOffer = (data) => {
    if (data?.status) {
      //   alert(data?.message)
      if (data?.status == true) {
        setOfferLoader(false);

        setOpen(false);
      }
    } else {
      setOfferLoader(false);

      //   alert(data?.message)
    }
  };
  console.log(offerLoader, "=================isLoadingCreate");
  // =================Personal Gigs===========
  console.log();
  useEffect(() => {
    let data = {
      user_id: UserData.id,
    };
    dispatch(getPersonalGigs(data));
  }, [dispatch]);

  // =================Offer Request===========
  useEffect(() => {
    dispatch(getOfferRequest());
  }, [dispatch]);
  // pagination--1--------
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1); // Material-UI Pagination starts from 1

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = offerDetail.slice(startIndex, endIndex);
  // pagination--2--------
  const itemsPerPage2 = 4;
  const [currentPage2, setCurrentPage2] = useState(1); // Material-UI Pagination starts from 1

  const handlePageChange2 = (event, value) => {
    setCurrentPage2(value);
  };

  const startIndex2 = (currentPage2 - 1) * itemsPerPage2;
  const endIndex2 = startIndex2 + itemsPerPage2;
  const visibleData2 = requestDetail.slice(startIndex2, endIndex2);
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
              <li
                className="nav-item d-flex align-items-center"
                role="presentation"
              >
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
                    {requestDetail?.length}
                  </span>{" "}
                </button>
              </li>
              <li
                className="nav-item d-flex align-items-center ms-l-5"
                role="presentation"
              >
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
                    {offerDetail?.length}
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-lg-0 my-3 pe-lg-0">
            <div class="input-group p-2">
              <span class="input-group-text pt-0 pb-0" id="basic-addon1">
                <img src={search} width={16} alt="" />
              </span>
              <input
                type="text"
                className="form-control p-0 font-12"
                id="floatingInputGroup1"
                placeholder="Username"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
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
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex={0}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 ">
                        {isLoading
                          ? "isLoading"
                          : visibleData2
                              .filter(
                                (innerValue) =>
                                  (innerValue.title &&
                                    innerValue.title
                                      .toLowerCase()
                                      .includes(searchKeyword.toLowerCase())) || // Filter by title
                                  (innerValue.description &&
                                    innerValue.description
                                      .toLowerCase()
                                      .includes(searchKeyword.toLowerCase()))
                              )
                              .map((value, index) => (
                                <div
                                  className="p-3 cardrating mt-2"
                                  key={index}
                                >
                                  <div className="d-flex flex-wrap ">
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
                                        {new Date(
                                          value?.created_at
                                        ).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}{" "}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between mt-3 flex-wrap align-items-center ">
                                    <Button
                                      className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                                      onClick={() => {
                                        setBuyerId(value?.id);
                                        setOpen(true);
                                      }}
                                    >
                                      Create Offer
                                    </Button>
                                    <div className="userByer d-inline-flex mt-lg-0 mt-md-0 mt-sm-0 mt-2 flex-wrap ">
                                      <span className="rounded-3">
                                        Offers {value?.offers?.length}
                                      </span>
                                      <span className="rounded-3">
                                        Budget {value?.price}
                                      </span>
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
                                            const minutes = Math.floor(
                                              diffInSeconds / 60
                                            );
                                            return `Duration ${minutes} ${
                                              minutes === 1
                                                ? " minute"
                                                : " minutes"
                                            } ago`;
                                          } else if (diffInSeconds < 86400) {
                                            const hours = Math.floor(
                                              diffInSeconds / 3600
                                            );
                                            return `Duration ${hours} ${
                                              hours === 1 ? " hour" : " hours"
                                            } ago`;
                                          } else if (diffInSeconds < 2592000) {
                                            const days = Math.floor(
                                              diffInSeconds / 86400
                                            );
                                            return `Duration ${days} ${
                                              days === 1 ? " day" : " days"
                                            } ago`;
                                          } else if (diffInSeconds < 31536000) {
                                            const months = Math.floor(
                                              diffInSeconds / 2592000
                                            );
                                            return `Duration ${months} ${
                                              months === 1
                                                ? " month"
                                                : " months"
                                            } ago`;
                                          } else {
                                            const years = Math.floor(
                                              diffInSeconds / 31536000
                                            );
                                            return `${years} ${
                                              years === 1 ? " year" : " years"
                                            }`;
                                          }
                                        })()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                      <Stack spacing={4}>
                        <Pagination
                          count={Math.ceil(
                            requestDetail.length / itemsPerPage2
                          )}
                          // variant="outlined2"
                          shape="rounded"
                          page={currentPage2}
                          onChange={handlePageChange2}
                        />
                      </Stack>
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
                  {/* <SentOffer /> */}
                  <div className="container-fluid">
                    <div className="row">
                      <h6 className=" font-20 font-500 cocon">Offers</h6>
                      {offerIsLoading && <h5 className="cocon">Loading...`</h5>}
                      {visibleData
                        .filter(
                          (value) =>
                            value.description &&
                            value.description
                              .toLowerCase()
                              .includes(searchKeyword.toLowerCase())
                        )
                        .map((value, index) => (
                          <div className="col-12 mt-3" key={index}>
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
                                  {(() => {
                                    const diffInSeconds = Math.floor(
                                      (new Date(value?.date) -
                                        new Date(value?.created_at)) /
                                        1000
                                    );

                                    if (diffInSeconds < 60) {
                                      return "Duration Just now";
                                    } else if (diffInSeconds < 3600) {
                                      const minutes = Math.floor(
                                        diffInSeconds / 60
                                      );
                                      return `Duration ${minutes} ${
                                        minutes === 1 ? "minute" : "minutes"
                                      } ago`;
                                    } else if (diffInSeconds < 86400) {
                                      const hours = Math.floor(
                                        diffInSeconds / 3600
                                      );
                                      return `Duration ${hours} ${
                                        hours === 1 ? "hour" : "hours"
                                      } ago`;
                                    } else if (diffInSeconds < 2592000) {
                                      const days = Math.floor(
                                        diffInSeconds / 86400
                                      );
                                      return `Duration ${days} ${
                                        days === 1 ? "day" : "days"
                                      } ago`;
                                    } else if (diffInSeconds < 31536000) {
                                      const months = Math.floor(
                                        diffInSeconds / 2592000
                                      );
                                      return `Duration ${months} ${
                                        months === 1 ? "month" : "months"
                                      } ago`;
                                    } else {
                                      const years = Math.floor(
                                        diffInSeconds / 31536000
                                      );
                                      return `Duration ${years} ${
                                        years === 1 ? "year" : "years"
                                      } ago`;
                                    }
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                        <Stack spacing={4}>
                          <Pagination
                            count={Math.ceil(offerDetail.length / itemsPerPage)}
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="p-lg-3 p-md-3 p-2" sx={style}>
            <div className="d-flex justify-content-between ">
              <h1 className="font-20 font-500 cocon blackcolor">
                Offer Request{buyerId}
              </h1>
              <button
                type="button"
                onClick={() => {
                  setDescription("");
                  setOfferPrice("");
                  setOfferDate("");
                  setGigRadio("");
                  setOpen(false);
                }}
                className="btn-close"
              />
            </div>
            <div className="container-fluid profileSetting">
              <form onSubmit={handleSubmitOffer} className="row">
                <div className=" col-12 prof-fields">
                  <label
                    for="Price"
                    class="form-label font-18 poppins blackcolor"
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={200}
                    className="form-control p-3 textArea border-0  font-16 poppins"
                    required
                  ></textarea>
                  <p className="font-12 text-secondary text-end mt-2">
                    {description.length}/80
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-12 prof-fields mt-4">
                  <label
                    for="Price"
                    class="form-label font-18 poppins blackcolor"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    value={offerPrice}
                    onChange={(e) => {
                      let value = e.target.value;

                      // Remove dollar sign if it exists
                      value = value.replace("$", "");

                      // Remove non-numeric characters (except the dollar sign)
                      value = value.replace(/[^0-9$]/g, "");

                      // Add dollar sign back
                      setOfferPrice("$" + value);
                    }}
                    placeholder="$0"
                    className="form-control p-3  border-0  font-16 poppins"
                    required
                    id="Price"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12 prof-fields  mt-4">
                  <label
                    for="date"
                    class="form-label font-18 poppins blackcolor"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={offerDate}
                    onChange={(e) => setOfferDate(e.target.value)}
                    className="form-control p-3  border-0  font-16 poppins"
                    required
                    id="date"
                  />
                </div>
                <div className="container-fluid">
                  <div className="row">
                    {personalGigs.map((innerValue, idx) => (
                      <div className="col-lg-3 mt-3" key={idx}>
                        <div
                          className="rounded-4 px-2 h-100"
                          style={{
                            backgroundColor: "#f5f5ff",
                          }}
                        >
                          <input
                            required
                            checked={gigRadio === innerValue.id} // Compare the checked value to the innerValue.id
                            type="radio"
                            value={gigRadio}
                            onChange={() => setGigRadio(innerValue.id)}
                            name="gigCheck"
                            id={`radio${idx}`}
                          />
                          <label htmlFor={`radio${idx}`}>
                            {" "}
                            {/* Use htmlFor instead of for */}
                            <img
                              height={150}
                              src={
                                innerValue.media?.image1 == null
                                  ? innerValue.media?.image2 == null
                                    ? innerValue.media?.image3
                                    : innerValue?.media.image2
                                  : innerValue.media?.image1
                              }
                              alt="w9"
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
                    loading={true}
                    disabled={offerLoader}
                    className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                  >
                    {offerLoader ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      "Save Offer"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default UserBuyerRequest;
