import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  AcceptOfferRequest,
  getBuyerOfferRequest,
  RejectOfferRequest,
} from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const OfferDetail = () => {
  const dispatch = useDispatch();
  const { buyerOfferlist, isLoadingOffer } = useSelector((state) => state.offers);
  const { id } = useParams();
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    if (id) {
      dispatch(getBuyerOfferRequest({ requestId: id }));
    }
  }, [dispatch, id]);

const handleAccept = (offerId) => {
  // 🪟 Open window early to avoid popup blockers
  const win = window.open('', '_blank');

  dispatch(
    AcceptOfferRequest({ offerId }, (res) => {
      if (res?.status) {
        setToast({ show: true, message: "Offer accepted successfully!" });

        // ✅ Now safe to write to the window
        if (res.data?.payment_form_html && win) {
          win.document.open();
          win.document.write(res.data.payment_form_html);
          win.document.close();
        }

        // 🔄 Refresh offers
        dispatch(getBuyerOfferRequest({ requestId: id }));
      } else {
        setToast({ show: true, message: res?.message || "Offer acceptance failed!" });
        if (win) win.close(); // Close empty tab if failed
      }
    })
  );
};



const handleReject = (offerId) => {
  dispatch(
    RejectOfferRequest({ offerId }, () => {
      setToast({ show: true, message: "Offer rejected successfully!" });
      // Refresh list after reject
      dispatch(getBuyerOfferRequest({ requestId: id }));
    })
  );
};


  const handleClose = () => {
    setToast({ show: false, message: "" });
  };

  return (
    <>
      <Navbar FirstNav="none" />

      {toast.show && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {toast.message}
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
      )}

      <div className="container-fluid pt-5 mb-5 userByerMain">
        <h4 className="byerLine font-20 font-500 cocon blackcolor ms-lg-4">
          Offer Request ({buyerOfferlist.length})
        </h4>
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0 allgigs-field poppins Revie rounded-3 p-3 pt-3">
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
                            (new Date(offer?.date) - new Date(offer?.created_at)) /
                              1000
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
                      <button
                        style={{ marginLeft: 5 }}
                        className="btn btn-danger"
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
        </div>
      </div>
    </>
  );
};

export default OfferDetail;
