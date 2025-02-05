import React from "react";
import Navbar from "../../components/Navbar";
import "../../style/paymentCard.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { OrderCreate } from "../../redux/slices/allOrderSlice";

const PaymentViaCard = ({ selectedPackage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleCard = (e) => {
    e.preventDefault();
    // navigate('/frelancerChat')
    swal("Successfully", "Your order has been completed", "success");
  };
  const sellerId = queryParams.get("seller_id");
  const gig_id = queryParams.get("gig_id");
  const package_id = queryParams.get("package_id");
  const handleFastCheckout = (e) => {
    e.preventDefault();
    let data = {
      seller_id: sellerId,
      gig_id: gig_id,
      package_id: package_id,
      status: "Active",
    };
    dispatch(OrderCreate(data, handleResponse));
    // navigate('/frelancerChat')
  };
  const handleResponse = (data) => {
    if (data?.status) {
      console.log(data);
      window.location.href = data?.checkout;
    } else {
      //   alert(data?.message)
    }
  };
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid p-lg-5 p-md-4 p-3 pt-5">
        <h6 className="font-30 font-500 cocon byerLine">Add a payout method</h6>
        <div class="row justify-content-center payment-cards mt-4">
          <div className="col-lg-3 col-md-3 col-12 poppins">
            <div
              class="nav flex-column nav-pills me-3 p-4 rounded-3  Paymentwhite h-100"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link active ps-0 d-flex align-items-center"
                id="v-pills-fast-checkout"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-fastcheckout"
                type="button"
                role="tab"
                aria-controls="v-pills-fastcheckout"
                aria-selected="true"
              >
                <div className="payment-span">
                  <div></div>
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 font-20">Fast Checkout</h6>
                </div>
              </button>
              <button
                disabled
                class="nav-link d-flex align-items-center ps-0"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="false"
              >
                <div className="payment-span">
                  <div></div>
                </div>
                <div className="ms-3 text-start">
                  <h6 className="mb-0 font-20">Payment card</h6>
                  <p className="mb-0 font-12 takegraycolor">Visa, Mastercard</p>
                </div>
              </button>
              <button
                disabled
                class="nav-link ps-0 d-flex align-items-center"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                <div className="payment-span">
                  <div></div>
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 font-20">Paypal</h6>
                </div>
              </button>
            </div>
          </div>
          <div className="col-lg-9 col-md-9 col-12 mt-lg-0 mt-0 mt-4">
            <div
              class="tab-content Paymentwhite p-lg-4 p-md-4 p-sm-3 p-2 pb-5 rounded-3"
              id="v-pills-tabContent"
            >
              <div
                class="tab-pane fade show active pt-2 pb-2"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
                tabindex="0"
              >
                {/* <form className="row" onSubmit={handleCard}>
                                    <h6 className='font-600 font-20 blackcolor poppins'>Payment Card</h6>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                        <label htmlFor="card" className='font-16 poppins'>CARD NUMBER</label>
                                        <div className='bgcard rounded-3 mt-1'>
                                            <input type="text" id='card' className="form-control orderinput border-0 p-2 poppins" style={{ backgroundColor: 'transparent' }} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                        <label htmlFor="" className='font-16 poppins'>SECURITY CODE</label>
                                        <div className='bgcard rounded-3 mt-1'>
                                            <select className="form-select font-16 border-0 p-2" required style={{ backgroundColor: 'transparent' }} aria-label="Default select example">
                                                <option selected value=""></option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                        <label htmlFor="fname" className='font-16 poppins'>FIRST NAME</label>
                                        <div className='bgcard rounded-3 mt-1'>
                                            <input type="text" id='fname' className="form-control orderinput border-0 border-0 p-2 poppins" style={{ backgroundColor: 'transparent' }} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                        <label htmlFor="lname" className='font-16 poppins'>LAST NAME</label>
                                        <div className='bgcard rounded-3 mt-1'>
                                            <input type="text" id='lname' className="form-control orderinput border-0 p-2 poppins" style={{ backgroundColor: 'transparent' }} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                        <label htmlFor="month" className='font-16 poppins'>EXPIRATION MONTH</label>
                                        <div className='bgcard rounded-3 mt-1'>

                                            <input type="text" id='month' className="form-control orderinput border-0 border-0 p-2 poppins" style={{ backgroundColor: 'transparent' }} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                        <label htmlFor="year" className='font-16 poppins'>EXPIRATION YEAR</label>
                                        <div className='bgcard rounded-3 mt-1'>
                                            <input type="text" id='year' className="form-control orderinput border-0 p-2 poppins" style={{ backgroundColor: 'transparent' }} required />
                                        </div>
                                    </div>
                                    <div className='mt-4 '>
                                        <Button type='submit' className='btn-stepper poppins px-3  font-16' >Complete Order</Button>
                                    </div>
                                </form> */}
                <div className="row ">
                  <div className="col-3">
                    <h6 className="font-500 font-18 blackcolor poppins">
                      Title of Account:
                    </h6>
                    <h6 className="font-500 font-18 blackcolor poppins mt-3">
                      {" "}
                      Account No.{" "}
                    </h6>
                    <h6 className="font-500 font-18 blackcolor poppins mt-3">
                      IBAN:
                    </h6>
                  </div>
                  <div className="col-8">
                    <h6 className="font-600 font-18 blackcolor poppins text-uppercase">
                      GrapeTask private limited
                    </h6>
                    <h6 className="font-600 font-18 blackcolor poppins mt-3">
                      6020306265300019
                    </h6>
                    <h6 className="font-600 font-18 blackcolor poppins mt-3">
                      PK88 BPUN 6020 3062 6530 0019
                    </h6>
                  </div>
                  <div className="col-12">
                    <div class="mb-3">
                      <label for="formFile" className="form-label">
                        Default file input example
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                    <div className="">
                      <Button
                        type="button"
                        onClick={() => navigate("/payment/success")}
                        className="btn-stepper  rounded-2 poppins px-5  font-16"
                      >
                        Completed Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade pt-2 pb-2"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                <form className="row">
                  <h6 className="font-600 font-20 blackcolor poppins">
                    Payment Card
                  </h6>
                  <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                    <label htmlFor="Uname" className="font-16 poppins">
                      Enter USERNAME
                    </label>
                    <div className="bgcard rounded-3 mt-1">
                      <input
                        type="text"
                        id="Uname"
                        className="form-control orderinput border-0 border-0 p-2 poppins"
                        style={{ backgroundColor: "transparent" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                    <label htmlFor="email" className="font-16 poppins">
                      ENTER EMAIL
                    </label>
                    <div className="bgcard rounded-3 mt-1">
                      <input
                        type="email"
                        id="email"
                        className="form-control orderinput border-0 p-2 poppins"
                        style={{ backgroundColor: "transparent" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                    <label htmlFor="password" className="font-16 poppins">
                      PASSWORD
                    </label>
                    <div className="bgcard rounded-3 mt-1">
                      <input
                        type="password"
                        id="password"
                        maxLength={7}
                        minLength={5}
                        className="form-control orderinput border-0 border-0 p-2 poppins"
                        style={{ backgroundColor: "transparent" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                    <label htmlFor="amount" className="font-16 poppins">
                      AMOUNT
                    </label>
                    <div className="bgcard rounded-3 mt-1">
                      <input
                        type="text"
                        id="amount"
                        className="form-control orderinput border-0 p-2 poppins"
                        style={{ backgroundColor: "transparent" }}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4 ">
                    <Button
                      type="button"
                      onClick={() => navigate("/payment/success")}
                      className="btn-stepper poppins px-3  font-16"
                    >
                      Completed Order
                    </Button>
                  </div>
                </form>
              </div>
              <div
                class="tab-pane fade pt-2 pb-2"
                id="v-pills-fastcheckout"
                role="tabpanel"
                aria-labelledby="v-pills-fast-checkout"
                tabindex="0"
              >
                {/* <form className="row" onSubmit={handleFastCheckout}>
                                    <h6 className='font-600 font-20 blackcolor poppins'>Fast Checkout Powered by bSecure</h6>
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-4 mt-md-3 mt-3">
                                       <img src="https://bsecure-prod-images.imgix.net/prod/merchants/branding/3952/checkout_button_9498.webp?auto=compress" alt='Fast Checkout Button' className='img-fluid'/>
                                    </div>
                                    <div className='mt-4 '>
                                        <Button type='submit' className='btn-stepper poppins px-3  font-16' >Completed Order</Button>
                                    </div>
                                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentViaCard;
