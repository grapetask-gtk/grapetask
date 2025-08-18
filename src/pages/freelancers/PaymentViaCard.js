import { Button, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import { AcceptOfferRequest } from "../../redux/slices/offersSlice";
import "../../style/paymentCard.scss";

const PaymentViaCard = ({ selectedPackage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Redux state
  const { isLoading, error } = useSelector(state => state.offers || {});

  // Core state
  const [paymentMethod, setPaymentMethod] = useState("fast-checkout");
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  // Form data
  const [paymentFormData, setPaymentFormData] = useState({
    username: "",
    email: "",
    password: "",
    amount: "",
    file: null
  });

  // Extract query parameters
  const sellerId = queryParams.get("seller_id");
  const gig_id = queryParams.get("gig_id");
  const package_id = queryParams.get("package_id");

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      setToast({ show: true, message: error, type: "error" });
    }
  }, [error]);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Form input handler
  const handlePaymentInputChange = useCallback((e) => {
    const { name, type, files, value } = e.target;

    if (type === 'file' && files?.[0]) {
      const selectedFile = files[0];

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setToast({ show: true, message: "File size must be less than 5MB", type: "error" });
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setToast({ show: true, message: "Only images (JPEG, PNG, GIF) and PDF files are allowed", type: "error" });
        return;
      }

      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }

      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImagePreview(imageUrl);
      setPaymentFormData(prev => ({ ...prev, [name]: selectedFile }));
    } else {
      setPaymentFormData(prev => ({ ...prev, [name]: value }));
    }
  }, [selectedImagePreview]);

  // Close modal handler
  const closePaymentModal = useCallback(() => {
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
      setSelectedImagePreview(null);
    }
    // Navigate back or close modal
    navigate(-1);
  }, [selectedImagePreview, navigate]);

  // Success handler for Redux action
  const handleSuccess = useCallback((response) => {
    setToast({ show: true, message: "Transaction completed successfully!", type: "success" });
    
    // Reset form
    setPaymentFormData({
      username: "",
      email: "",
      password: "",
      amount: "",
      file: null
    });
    
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
      setSelectedImagePreview(null);
    }

    // Navigate to success page after a short delay
    setTimeout(() => {
      navigate("/payment/success");
    }, 2000);
  }, [selectedImagePreview, navigate]);

  // Error handler for Redux action
  const handleError = useCallback((error) => {
    const errorMessage = error?.response?.data?.message || error?.message || "An error occurred";
    setToast({ show: true, message: errorMessage, type: "error" });
  }, []);

  // Fast checkout handler
  const handleFastCheckout = async (e) => {
    e.preventDefault();

    if (!paymentFormData.file) {
      setToast({ show: true, message: "Please upload a receipt", type: "error" });
      return;
    }

    if (!sellerId || !gig_id || !package_id) {
      setToast({ show: true, message: "Missing required parameters", type: "error" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('seller_id', sellerId);
      formData.append('gig_id', gig_id);
      formData.append('package_id', package_id);
      formData.append('payment_method', 'bank_transfer');
      formData.append('transfer_receipt', paymentFormData.file);
      formData.append('status', 'pending_verification');

      await dispatch(AcceptOfferRequest(formData, handleSuccess)).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  // Card payment handler
  const handleCardPayment = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = ['username', 'email', 'password', 'amount'];
    const missingFields = requiredFields.filter(field => !paymentFormData[field]?.toString().trim());
    
    if (missingFields.length > 0) {
      setToast({ 
        show: true, 
        message: `Please fill in: ${missingFields.join(', ')}`, 
        type: "error" 
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentFormData.email)) {
      setToast({ show: true, message: "Please enter a valid email address", type: "error" });
      return;
    }

    // Amount validation
    const amount = parseFloat(paymentFormData.amount);
    if (isNaN(amount) || amount <= 0) {
      setToast({ show: true, message: "Please enter a valid amount greater than 0", type: "error" });
      return;
    }

    // PIN validation
    if (paymentFormData.password.length < 4 || paymentFormData.password.length > 6) {
      setToast({ show: true, message: "Card PIN must be 4-6 digits", type: "error" });
      return;
    }

    if (!sellerId || !gig_id || !package_id) {
      setToast({ show: true, message: "Missing required parameters", type: "error" });
      return;
    }

    try {
      const paymentData = {
        paymentMethod: 'card',
        cardDetails: {
          holderName: paymentFormData.username.trim(),
          email: paymentFormData.email.trim(),
          amount: amount,
          pin: paymentFormData.password
        },
        seller_id: sellerId,
        gig_id,
        package_id
      };

      const response = await dispatch(AcceptOfferRequest(paymentData, handleSuccess)).unwrap();

      // Handle payment form HTML response
      if (response?.payment_form_html) {
        const paymentWindow = window.open("", "_blank", "width=800,height=600,scrollbars=yes,resizable=yes");
        if (paymentWindow) {
          paymentWindow.document.open();
          paymentWindow.document.write(response.payment_form_html);
          paymentWindow.document.close();
          
          // Monitor payment window
          const checkClosed = setInterval(() => {
            if (paymentWindow.closed) {
              clearInterval(checkClosed);
              setToast({ show: true, message: "Payment window closed. Please check your payment status.", type: "info" });
            }
          }, 1000);
        } else {
          setToast({ show: true, message: "Please allow popups to complete payment", type: "error" });
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Close toast handler
  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid p-lg-5 p-md-4 p-3 pt-5">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="font-500 cocon byerLine mb-0">Add payment method</h5>
            <Button onClick={closePaymentModal} disabled={isLoading}>
              ✕
            </Button>
          </div>

          <div className="row">
            {/* Payment Method Selection */}
            <div className="col-lg-4 col-md-4 col-12 mb-4">
              <div className="nav flex-column nav-pills Paymentwhite p-3 rounded-3 h-100">
                <button
                  className={`nav-link d-flex align-items-center mb-2 ${paymentMethod === 'fast-checkout' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('fast-checkout')}
                  disabled={isLoading}
                >
                  <div className="payment-span me-3">
                    <div className="rounded-circle bg-primary" style={{ width: '12px', height: '12px' }}></div>
                  </div>
                  <div>
                    <h6 className="mb-0 font-18">Fast Checkout</h6>
                  </div>
                </button>

                <button
                  className={`nav-link d-flex align-items-center mb-2 ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                  disabled={isLoading}
                >
                  <div className="payment-span me-3">
                    <div className="rounded-circle bg-success" style={{ width: '12px', height: '12px' }}></div>
                  </div>
                  <div className="text-start">
                    <h6 className="mb-0 font-18">Payment Card</h6>
                    <p className="mb-0 font-12 text-muted">Visa, Mastercard</p>
                  </div>
                </button>

                <button
                  className={`nav-link d-flex align-items-center ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                  disabled
                >
                  <div className="payment-span me-3">
                    <div className="rounded-circle bg-warning" style={{ width: '12px', height: '12px' }}></div>
                  </div>
                  <div>
                    <h6 className="mb-0 font-18 text-muted">PayPal</h6>
                    <small className="text-muted">(Coming Soon)</small>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <div className="col-lg-8 col-md-8 col-12">
              <div className="Paymentwhite p-4 rounded-3 h-100">
                {/* Fast Checkout Form */}
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
                            Upload Transfer Receipt * <small className="text-muted">(Max 5MB, Images/PDF only)</small>
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            id="transferFile"
                            name="file"
                            accept="image/*,.pdf"
                            onChange={handlePaymentInputChange}
                            disabled={isLoading}
                          />

                          {selectedImagePreview && (
                            <div className="mt-3">
                              <img
                                src={selectedImagePreview}
                                className="rounded border"
                                width={150}
                                height={150}
                                alt="Transfer Receipt Preview"
                                style={{ objectFit: 'cover' }}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => {
                                  URL.revokeObjectURL(selectedImagePreview);
                                  setSelectedImagePreview(null);
                                  setPaymentFormData(prev => ({ ...prev, file: null }));
                                }}
                                disabled={isLoading}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="contained"
                      onClick={handleFastCheckout}
                      disabled={isLoading || !paymentFormData.file}
                      startIcon={isLoading ? <CircularProgress size={20} /> : null}
                      className="btn-stepper"
                    >
                      {isLoading ? 'Processing...' : 'Complete Order'}
                    </Button>
                  </div>
                )}

                {/* Card Payment Form */}
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
                          value={paymentFormData.username}
                          onChange={handlePaymentInputChange}
                          required
                          disabled={isLoading}
                          placeholder="Enter full name as on card"
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
                          value={paymentFormData.email}
                          onChange={handlePaymentInputChange}
                          required
                          disabled={isLoading}
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="col-md-6 col-12 mb-3">
                        <label htmlFor="password" className="form-label">
                          Card PIN * <small className="text-muted">(4-6 digits)</small>
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          value={paymentFormData.password}
                          onChange={handlePaymentInputChange}
                          maxLength={6}
                          minLength={4}
                          pattern="[0-9]{4,6}"
                          required
                          disabled={isLoading}
                          placeholder="Enter PIN"
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
                          value={paymentFormData.amount}
                          onChange={handlePaymentInputChange}
                          min="0.01"
                          step="0.01"
                          required
                          disabled={isLoading}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      startIcon={isLoading ? <CircularProgress size={20} /> : null}
                      className="btn-stepper"
                    >
                      {isLoading ? 'Processing...' : 'Complete Payment'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {toast.show && (
          <div className={`toast show position-fixed top-0 end-0 m-3`} style={{ zIndex: 1055 }}>
            <div className={`toast-header bg-${toast.type === 'success' ? 'success' : toast.type === 'error' ? 'danger' : 'info'} text-white`}>
              <strong className="me-auto">
                {toast.type === 'success' ? '✓ Success' : toast.type === 'error' ? '✗ Error' : 'ℹ Info'}
              </strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleCloseToast}
              ></button>
            </div>
            <div className="toast-body">
              {toast.message}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentViaCard;