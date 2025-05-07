<<<<<<< HEAD
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { getBuyerOfferRequest } from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";
import { TiTick } from "react-icons/ti";

const OfferDetail = () => {
  const location = useLocation();
  const clientId = location.state.clientId;
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const requestId = queryParams.get('requestId');

  const { buyerOfferlist, isLoadingOffer } = useSelector((state) => state.offers);
  useEffect(() => {
    let data = {
      requestId: requestId
    };
    dispatch(getBuyerOfferRequest(data));
    console.log(buyerOfferlist);
  }, [dispatch]);
=======
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AcceptOfferRequest, getBuyerOfferRequest, RejectOfferRequest } from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const OfferDetail = () => {
  const dispatch = useDispatch();
  const { buyerOfferlist, isLoadingOffer } = useSelector((state) => state.offers);
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getBuyerOfferRequest({ requestId: id }));
    }
  }, [dispatch, id]);

  const handleAccept = async (offerId) => {
    dispatch(AcceptOfferRequest({ offerId }, () => setShowSuccess(true)));
  };

  const handleReject = (offerId) => {
    dispatch(RejectOfferRequest({ offerId }, () => setShowSuccess(true)));
  };


  const handleClose = () => {
    setShowSuccess(false);
  };
>>>>>>> d918fe2 (cahnges by abdul qavi)

  return (
    <>
      <Navbar FirstNav="none" />
<<<<<<< HEAD
=======

      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Offer accepted successfully!
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
      )}

>>>>>>> d918fe2 (cahnges by abdul qavi)
      <div className="container-fluid pt-5 mb-5 userByerMain">
        <h4 className="byerLine font-20 font-500 cocon blackcolor ms-lg-4">
          Offer Request ({buyerOfferlist.length})
        </h4>
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0 allgigs-field poppins Revie rounded-3 p-3 pt-3">
<<<<<<< HEAD
          {isLoadingOffer && <h3 className="cocon ">Loading...</h3>}
          {buyerOfferlist.length > 0 ? buyerOfferlist.map((value, index) => (
            <div className="col-12 mt-3" key={index}>
              <div className="cardrating p-3">
                <div className="d-flex">
                  <img
                    src={value.business?.image}
                    width={60}
                    height={60}
                    className="rounded-rounded-circle flex-shrink-0"
                    alt="w8"
                  />
                  <div className="ms-2">
                    <h6 className="font-18 font-500 poppins">{value.business?.fname + " " + value?.business?.lname}</h6>
                    <p className="font-16 poppins takegraycolor mb-0 mt-2">
                      {value.description}
                    </p>
                  </div>
                </div>
                {/* <div className="d-flex mt-3">
                  <p className="font-14 poppins takegraycolor mb-0">
                    <TiTick size={20} /> Color Grading
                  </p>
                  <p className="mx-3 font-14 poppins takegraycolor mb-0">
                    <TiTick size={20} /> Color Grading
                  </p>
                  <p className="font-14 poppins takegraycolor mb-0">
                    <TiTick size={20} /> Color Grading
                  </p>
                </div> */}
                <div className="userByer my-2 mt-3 d-flex justify-content-between">
                  <div>
                    <span className="rounded-3 font-14 poppins">
                      Budget ${value.price}
                    </span>
                    <span className="rounded-3 font-14 poppins">
                      {(() => {
                        const diffInSeconds = Math.floor(
                          (new Date(value?.date) - new Date(value?.created_at)) /
                          1000
                        );

                        if (diffInSeconds < 60) {
                          return "Duration Just now";
                        } else if (diffInSeconds < 3600) {
                          const minutes = Math.floor(diffInSeconds / 60);
                          return `Duration ${minutes} ${minutes === 1 ? "minute" : "minutes"
                            }`;
                        } else if (diffInSeconds < 86400) {
                          const hours = Math.floor(diffInSeconds / 3600);
                          return `Duration ${hours} ${hours === 1 ? "hour" : "hours"
                            }`;
                        } else if (diffInSeconds < 2592000) {
                          const days = Math.floor(diffInSeconds / 86400);
                          return `Duration ${days} ${days === 1 ? "day" : "days"
                            }`;
                        } else if (diffInSeconds < 31536000) {
                          const months = Math.floor(diffInSeconds / 2592000);
                          return `Duration ${months} ${months === 1 ? "month" : "months"
                            }`;
                        } else {
                          const years = Math.floor(diffInSeconds / 31536000);
                          return `Duration ${years} ${years === 1 ? "year" : "years"
                            }`;
                        }
                      })()}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-success"
                    >
                      Accept
                    </button>
                    <button
                      style={{ marginLeft: 5 }}
                      className="btn btn-danger"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )) : <h6 className="cocon ">Not Found</h6>}
=======
          {isLoadingOffer ? (
            <h3 className="cocon">Loading...</h3>
          ) : buyerOfferlist.length > 0 ? (
            buyerOfferlist.map((offer, index) => (
              <div className="col-12 mt-3" key={index}>
                <div className="cardrating p-3">
                  <div className="d-flex">
                    <img
                      src={offer.business?.image}
                      width={60}
                      height={60}
                      className="rounded-circle flex-shrink-0"
                      alt="Business"
                    />
                    <div className="ms-2">
                      <h6 className="font-18 font-500 poppins">
                        {offer.business?.fname} {offer.business?.lname}
                      </h6>
                      <p className="font-16 poppins takegraycolor mb-0 mt-2">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                  <div className="userByer my-2 mt-3 d-flex justify-content-between">
                    <div>
                      <span className="rounded-3 font-14 poppins">
                        Budget ${offer.price}
                      </span>
                      <span className="rounded-3 font-14 poppins ms-2">
                        {(() => {
                          const diffInSeconds = Math.floor(
                            (new Date(offer?.date) - new Date(offer?.created_at)) / 1000
                          );
                          if (diffInSeconds < 60) return "Duration Just now";
                          if (diffInSeconds < 3600)
                            return `Duration ${Math.floor(diffInSeconds / 60)} minutes`;
                          if (diffInSeconds < 86400)
                            return `Duration ${Math.floor(diffInSeconds / 3600)} hours`;
                          if (diffInSeconds < 2592000)
                            return `Duration ${Math.floor(diffInSeconds / 86400)} days`;
                          if (diffInSeconds < 31536000)
                            return `Duration ${Math.floor(diffInSeconds / 2592000)} months`;
                          return `Duration ${Math.floor(diffInSeconds / 31536000)} years`;
                        })()}
                      </span>
                    </div>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(offer.id)}
                      >
                        Accept
                      </button>
                      <button style={{ marginLeft: 5 }} className="btn btn-danger"
                                              onClick={() => handleReject(offer.id)}

                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h6 className="cocon">Not Found</h6>
          )}
>>>>>>> d918fe2 (cahnges by abdul qavi)
        </div>
      </div>
    </>
  );
};

export default OfferDetail;
