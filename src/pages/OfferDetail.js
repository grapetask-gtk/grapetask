import { Alert, Box, Button, CircularProgress, Modal, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
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
  const navigate = useNavigate();
  const location = useLocation();
const [selectedImagePreview, setSelectedPreview] = useState(null);


 // ----------------- image upload --------------

  const [imgPreview, setImgPreview] = useState(null);
    const [isImageSelected, setImageSelected] = useState(false);
  // State management
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("fast-checkout");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    amount: "",
    file: null
  });

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const sellerId = queryParams.get("seller_id");
  const gig_id = queryParams.get("gig_id");
  const package_id = queryParams.get("package_id");

  // Load offers on component mount
  useEffect(() => {
    if (id) {
      dispatch(getBuyerOfferRequest({ requestId: id }));
    }
  }, [dispatch, id]);

  // Utility function to calculate duration
  const getDuration = (created, due) => {
    const diffInMs = new Date(due) - new Date(created);
    const diffInSeconds = Math.floor(diffInMs / 1000);
    
    if (diffInSeconds < 60) return "Duration: Just now";
    if (diffInSeconds < 3600) return `Duration: ${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `Duration: ${Math.floor(diffInSeconds / 3600)} hours`;
    if (diffInSeconds < 2592000) return `Duration: ${Math.floor(diffInSeconds / 86400)} days`;
    if (diffInSeconds < 31536000) return `Duration: ${Math.floor(diffInSeconds / 2592000)} months`;
    return `Duration: ${Math.floor(diffInSeconds / 31536000)} years`;
  };

  // Open payment modal 
  const openPaymentModal = (offerId) => {
    setSelectedOfferId(offerId);
    setPaymentMethod("fast-checkout");
    setShowPaymentModal(true);
    // Reset form data
    setFormData({
      username: "",
      email: "",
      password: "",
      amount: "",
      file: null
    });
  };

  // Close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedOfferId(null);
    setIsProcessing(false);
  };

  // Handle form input changes
  
   const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    
    // Handle file inputs
    if (type === 'file' && files && files[0]) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedPreview(imageUrl);
      setImageSelected(true);
      
      // Update form data with file
      setFormData(prev => ({ ...prev, [name]: selectedFile }));
    } 
    // Handle non-file inputs
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

const handleFastCheckout = async (e) => {
  e.preventDefault();
  
  if (!formData.file) {
    setToast({ 
      show: true, 
      message: "Please upload a transfer receipt before proceeding.", 
      type: "error" 
    });
    return;
  }

  setIsProcessing(true);

  try {
    // Use FormData for file uploads
    const formDataToSend = new FormData();
    formDataToSend.append('seller_id', sellerId);
    formDataToSend.append('gig_id', gig_id);
    formDataToSend.append('package_id', package_id);
    formDataToSend.append('offerId', selectedOfferId);
    formDataToSend.append('payment_method', 'bank_transfer');
    formDataToSend.append('transfer_receipt', formData.file, formData.file.name);
    formDataToSend.append('status', 'pending_verification');

    // Send FormData instance to thunk
    await dispatch(AcceptOfferRequest(formDataToSend));

    // Only executed if server returns status:true
    swal("Success", "Your transfer receipt has been submitted for verification", "success");
    setToast({ 
      show: true, 
      message: "Transfer receipt submitted successfully! Your order will be activated after verification.", 
      type: "success" 
    });
    
    dispatch(getBuyerOfferRequest({ requestId: id }));
    closePaymentModal();
  } catch (error) {
    setToast({ 
      show: true, 
      message: error.message || "Failed to process bank transfer. Please try again.", 
      type: "error" 
    });
  } finally {
    setIsProcessing(false);
  }
};

  // Handle card payment
  const handleCardPayment = async (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['username', 'email', 'password', 'amount'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setToast({ 
        show: true, 
        message: `Please fill in all required fields: ${missingFields.join(', ')}`, 
        type: "error" 
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({ 
        show: true, 
        message: "Please enter a valid email address.", 
        type: "error" 
      });
      return;
    }

    // Validate amount
    if (parseFloat(formData.amount) <= 0) {
      setToast({ 
        show: true, 
        message: "Please enter a valid amount greater than 0.", 
        type: "error" 
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment data
      const paymentData = {
        offerId: selectedOfferId,
        paymentMethod: 'card',
        cardDetails: {
          holderName: formData.username,
          email: formData.email,
          amount: parseFloat(formData.amount),
          // Note: In real implementation, card details should be tokenized
          // and PIN should never be sent in plain text
        },
        seller_id: sellerId,
        gig_id: gig_id,
        package_id: package_id
      };

      // Process card payment through your payment gateway
      const response = await dispatch(
        AcceptOfferRequest(paymentData)
      );

      if (response?.payload?.status || response?.status) {
        // Check if payment gateway response is included
        if (response?.payload?.payment_form_html || response?.data?.payment_form_html) {
          // Open payment gateway in new window
          const win = window.open("", "_blank");
          if (win) {
            win.document.open();
            win.document.write(response.payload?.payment_form_html || response.data?.payment_form_html);
            win.document.close();
          }
        }

        swal("Success", "Payment initiated successfully", "success");
        setToast({ 
          show: true, 
          message: "Payment processed successfully!", 
          type: "success" 
        });
        
        // Refresh the offer list
        dispatch(getBuyerOfferRequest({ requestId: id }));
        closePaymentModal();
        
        // Navigate to success page if no payment form
        if (!response?.payload?.payment_form_html && !response?.data?.payment_form_html) {
          navigate("/payment/success");
        }
      } else {
        throw new Error(response?.payload?.message || response?.message || "Payment processing failed");
      }
    } catch (error) {
      console.error('Card payment error:', error);
      setToast({ 
        show: true, 
        message: error.message || "Payment failed. Please check your card details and try again.", 
        type: "error" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Confirm payment based on selected method
  const confirmPayment = async () => {
    if (!paymentMethod) {
      setToast({ 
        show: true, 
        message: "Please select a payment method.", 
        type: "error" 
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment data based on method
      let paymentData = {
        offerId: selectedOfferId,
        paymentMethod,
        seller_id: sellerId,
        gig_id: gig_id,
        package_id: package_id
      };

      // Add method-specific data
      if (paymentMethod === 'bank_transfer' && formData.file) {
        paymentData.transferReceipt = formData.file;
      } else if (paymentMethod === 'card') {
        paymentData.cardDetails = {
          holderName: formData.username,
          email: formData.email,
          amount: parseFloat(formData.amount)
        };
      }

      const response = await dispatch(AcceptOfferRequest(paymentData));

      if (response?.payload?.status || response?.status) {
        setToast({ 
          show: true, 
          message: "Offer accepted successfully!", 
          type: "success" 
        });

        // Handle payment form if provided (for card payments)
        const paymentFormHtml = response?.payload?.payment_form_html || response?.data?.payment_form_html;
        if (paymentFormHtml) {
          const win = window.open("", "_blank");
          if (win) {
            win.document.open();
            win.document.write(paymentFormHtml);
            win.document.close();
          }
        }

        // Refresh offer list
        dispatch(getBuyerOfferRequest({ requestId: id }));
        closePaymentModal();
      } else {
        throw new Error(response?.payload?.message || response?.message || "Offer acceptance failed");
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      setToast({
        show: true,
        message: error.message || "Offer acceptance failed! Please try again.",
        type: "error"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle offer rejection
  const handleReject = async (offerId) => {
    const result = await swal({
      title: "Are you sure?",
      text: "You want to reject this offer?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (!result) return;

    setIsProcessing(true);
    
    try {
      const response = await dispatch(RejectOfferRequest({ offerId }));
      
      if (response?.payload?.status || response?.type?.includes('fulfilled')) {
        setToast({ 
          show: true, 
          message: "Offer rejected successfully!", 
          type: "success" 
        });
        dispatch(getBuyerOfferRequest({ requestId: id }));
      } else {
        throw new Error(response?.payload?.message || "Failed to reject offer");
      }
    } catch (error) {
      console.error('Reject offer error:', error);
      setToast({ 
        show: true, 
        message: error.message || "Failed to reject offer. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Close toast notification
  const handleCloseToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };


  return (
    <>
      <Navbar FirstNav="none" />

      {/* Toast Notification */}
      <Snackbar
        open={toast.show}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseToast} 
          severity={toast.type} 
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>

      <div className="container-fluid pt-5 mb-5 userByerMain">
        <h4 className="byerLine font-20 font-500 cocon blackcolor ms-lg-4">
          Offer Requests ({buyerOfferlist?.length || 0})
        </h4>

        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0 allgigs-field poppins Revie rounded-3 p-3 pt-3">
          {isLoadingOffer ? (
            <div className="col-12 text-center py-5">
              <CircularProgress />
              <Typography variant="h6" className="mt-3">Loading offers...</Typography>
            </div>
          ) : buyerOfferlist?.length > 0 ? (
            buyerOfferlist.map((offer, index) => (
              <div className="col-12 mt-3" key={offer.id || index}>
                <div className="cardrating p-3 shadow-sm">
                  <div className="d-flex">
                    <img
                      src={offer.business?.image || '/default-avatar.png'}
                      width={60}
                      height={60}
                      className="rounded-circle flex-shrink-0"
                      alt={`${offer.business?.fname} ${offer.business?.lname}`}
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="font-18 font-500 poppins mb-2">
                        {offer.business?.fname} {offer.business?.lname}
                      </h6>
                      <p className="font-16 poppins takegraycolor mb-0">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                  
                 <div className="userByer my-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
  {/* Offer Info Section */}
  <div className="d-flex flex-column flex-sm-row gap-2">
    <span className="badge bg-light text-dark border font-14 poppins px-3 py-2 rounded-3">
      Budget: ${offer.price}
    </span>
    <span className="badge bg-light text-dark border font-14 poppins px-3 py-2 rounded-3">
      {getDuration(offer.created_at, offer.date)}
    </span>
  </div>

  {/* Action Buttons Section */}
  <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
    <button
      className="btn btn-success px-4"
      onClick={() => openPaymentModal(offer.id)}
    >
      Accept
    </button>
    <button
      className="btn btn-danger px-4"
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
            <div className="col-12 text-center py-5">
              <Typography variant="h6" className="cocon text-muted">
                No offers found
              </Typography>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        open={showPaymentModal}
        onClose={closePaymentModal}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' },
            maxWidth: '1000px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            overflow: 'auto',
            p: 0
          }}
        >
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="font-500 cocon byerLine mb-0">Add a payment method</h5>
              <Button
                onClick={closePaymentModal}
                sx={{ minWidth: 'auto', p: 1 }}
                disabled={isProcessing}
              >
                ✕
              </Button>
            </div>

            <div className="row">
              {/* Payment Method Selection */}
              <div className="col-lg-4 col-md-4 col-12 mb-4">
                <div className="nav flex-column nav-pills Paymentwhite p-3 rounded-3 h-100">
                  <button
                    className={`nav-link d-flex align-items-center mb-2 ${
                      paymentMethod === 'fast-checkout' ? 'active' : ''
                    }`}
                    onClick={() => setPaymentMethod('fast-checkout')}
                    disabled={isProcessing}
                  >
                    <div className="payment-span me-3">
                      <div className="rounded-circle bg-primary" style={{width: '12px', height: '12px'}}></div>
                    </div>
                    <div>
                      <h6 className="mb-0 font-18">Fast Checkout</h6>
                    </div>
                  </button>

                  <button
                    className={`nav-link d-flex align-items-center mb-2 ${
                      paymentMethod === 'card' ? 'active' : ''
                    }`}
                    onClick={() => setPaymentMethod('card')}
                    disabled={isProcessing}
                  >
                    <div className="payment-span me-3">
                      <div className="rounded-circle bg-success" style={{width: '12px', height: '12px'}}></div>
                    </div>
                    <div className="text-start">
                      <h6 className="mb-0 font-18">Payment Card</h6>
                      <p className="mb-0 font-12 text-muted">Visa, Mastercard</p>
                    </div>
                  </button>

                  <button
                    className={`nav-link d-flex align-items-center ${
                      paymentMethod === 'paypal' ? 'active' : ''
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                    disabled
                  >
                    <div className="payment-span me-3">
                      <div className="rounded-circle bg-warning" style={{width: '12px', height: '12px'}}></div>
                    </div>
                    <div>
                      <h6 className="mb-0 font-18 text-muted">PayPal</h6>
                      <small className="text-muted">(Coming Soon)</small>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Content */}
              <div className="col-lg-8 col-md-8 col-12">
                <div className="Paymentwhite p-4 rounded-3 h-100">
                  {paymentMethod === 'fast-checkout' && (
                    <div>
                      <h6 className="font-600 font-20 blackcolor poppins mb-4">
                        Fast Checkout - Bank Transfer
                      </h6>
                      
                      <div className="row mb-4">
                        <div className="col-md-4 col-12">
                          <div className="mb-3">
                            <strong>Title of Account:</strong>
                            <div className="mt-1">GrapeTask Private Limited</div>
                          </div>
                          <div className="mb-3">
                            <strong>Account No:</strong>
                            <div className="mt-1">6020306265300019</div>
                          </div>
                          <div className="mb-3">
                            <strong>IBAN:</strong>
                            <div className="mt-1">PK88 BPUN 6020 3062 6530 0019</div>
                          </div>
                        </div>
                        
                        <div className="col-md-8 col-12">
                          <div className="mb-3">
                            <label htmlFor="transferFile" className="form-label">
                              Upload Transfer Receipt
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              id="transferFile"
                              name="file"
                              accept="image/*,.pdf"
                              onChange={handleInputChange}
                              disabled={isProcessing}
                            />

                            <img
                        src={selectedImagePreview}
                        className="mt-3 rounded-circle "
                        width={150}
                        height={150}
                        alt="w8"
                      />
                          </div>
                        </div>
                        
                      </div>

                      <Button
                        variant="contained"
                        onClick={handleFastCheckout}
                        disabled={isProcessing}
                        startIcon={isProcessing ? <CircularProgress size={20} /> : null}
                        className="btn-stepper"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </Button>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <form onSubmit={handleCardPayment}>
                      <h6 className="font-600 font-20 blackcolor poppins mb-4">
                        Payment Card Details
                      </h6>

                      <div className="row">
                        <div className="col-md-6 col-12 mb-3">
                          <label htmlFor="username" className="form-label">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            disabled={isProcessing}
                          />
                        </div>

                        <div className="col-md-6 col-12 mb-3">
                          <label htmlFor="email" className="form-label">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isProcessing}
                          />
                        </div>

                        <div className="col-md-6 col-12 mb-3">
                          <label htmlFor="password" className="form-label">
                            Card PIN *
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleInputChange}
                            maxLength={6}
                            minLength={4}
                            required
                            disabled={isProcessing}
                          />
                        </div>

                        <div className="col-md-6 col-12 mb-3">
                          <label htmlFor="amount" className="form-label">
                            Amount *
                          </label>
                          <input
                            type="number"
                            id="amount"
                            name="amount"
                            className="form-control"
                            value={formData.amount}
                            onChange={handleInputChange}
                            min="1"
                            step="0.01"
                            required
                            disabled={isProcessing}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isProcessing}
                        startIcon={isProcessing ? <CircularProgress size={20} /> : null}
                        className="btn-stepper"
                      >
                        {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default OfferDetail;