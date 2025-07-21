import { Alert, Box, Button, CircularProgress, Modal, Snackbar, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../components/Navbar";
import { AllBdOrders } from "../redux/slices/allOrderSlice";
import {
  AcceptOfferRequest,
  AssignToExpertRequest,
  getBuyerOfferRequest,
  RejectOfferRequest
} from "../redux/slices/offersSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const OfferDetail = () => {
  const dispatch = useDispatch();
  const { 
    buyerOfferlist, 
    isLoadingOffer,
    isAssigning,
    assignSuccess,
    assignError
  } = useSelector((state) => state.offers);
  
  const bdOrders = useSelector(state => state.allOrder?.bdOrders || []);
  const isLoadingBdOrders = useSelector(state => state.allOrder?.isLoading ?? true);
  const auth = useSelector((state) => state.auth);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // User state management
  const [user, setUser] = useState({});
  const [isBusinessDeveloper, setIsBusinessDeveloper] = useState(false);

  // Image preview state
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  // Modal states
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("fast-checkout");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [paymentFormData, setPaymentFormData] = useState({
    username: "",
    email: "",
    password: "",
    amount: "",
    file: null
  });

  const [assignmentFormData, setAssignmentFormData] = useState({
    bdOrderId: "",
    assignmentNotes: ""
  });

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const sellerId = queryParams.get("seller_id");
  const gig_id = queryParams.get("gig_id");
  const package_id = queryParams.get("package_id");

  // Initialize user data
  useEffect(() => {
    try {
      if (auth?.user) {
        setUser(auth.user);
      } else {
        const userData = localStorage.getItem("UserData");
        if (userData) setUser(JSON.parse(userData));
      }
    } catch (error) {
      setUser({});
    }
  }, [auth?.user]);

  // Set business developer status
  useEffect(() => {
    setIsBusinessDeveloper(
      user?.role === 'bidder/company representative/middleman' || 
      user?.user_type === 'business_developer'
    );
  }, [user]);

  // Load offers
  useEffect(() => {
    if (id) {
      dispatch(getBuyerOfferRequest({ requestId: id }));
    }
  }, [dispatch, id]);

  // Load BD orders for assignment modal
  useEffect(() => {
    dispatch(AllBdOrders());
  }, [dispatch]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  // Handle assignment status changes
  useEffect(() => {
    if (assignSuccess) {
      setToast({
        show: true,
        message: "Offer assigned successfully!",
        type: "success"
      });
      // Close modal after successful assignment
      setShowAssignModal(false);
      // Refresh offers list
      dispatch(getBuyerOfferRequest({ requestId: id }));
    }

    if (assignError) {
      setToast({
        show: true,
        message: assignError,
        type: "error"
      });
    }
  }, [assignSuccess, assignError, dispatch, id]);

  // Utility function to calculate duration
  const getDuration = useCallback((created, due) => {
    const diffInMs = new Date(due) - new Date(created);
    const diffInSeconds = Math.floor(diffInMs / 1000);
    
    if (diffInSeconds < 60) return "Duration: Just now";
    if (diffInSeconds < 3600) return `Duration: ${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `Duration: ${Math.floor(diffInSeconds / 3600)} hours`;
    if (diffInSeconds < 2592000) return `Duration: ${Math.floor(diffInSeconds / 86400)} days`;
    if (diffInSeconds < 31536000) return `Duration: ${Math.floor(diffInSeconds / 2592000)} months`;
    return `Duration: ${Math.floor(diffInSeconds / 31536000)} years`;
  }, []);

  // Modal management functions
  const openPaymentModal = useCallback((offerId) => {
    setSelectedOfferId(offerId);
    setPaymentMethod("fast-checkout");
    setShowPaymentModal(true);
    setPaymentFormData({
      username: "",
      email: "",
      password: "",
      amount: "",
      file: null
    });
    setSelectedImagePreview(null);
  }, []);

  const openAssignModal = useCallback((offerId) => {
    setSelectedOfferId(offerId);
    setShowAssignModal(true);
    setAssignmentFormData({
      bdOrderId: "",
      assignmentNotes: ""
    });
  }, []);

  const closePaymentModal = useCallback(() => {
    setShowPaymentModal(false);
    setSelectedOfferId(null);
    setIsProcessing(false);
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
      setSelectedImagePreview(null);
    }
  }, [selectedImagePreview]);

  const closeAssignModal = useCallback(() => {
    setShowAssignModal(false);
    setSelectedOfferId(null);
  }, []);

  // Form handlers
  const handlePaymentInputChange = useCallback((e) => {
    const { name, type, files, value } = e.target;
    
    if (type === 'file' && files?.[0]) {
      const selectedFile = files[0];
      
      if (selectedImagePreview) URL.revokeObjectURL(selectedImagePreview);
      
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImagePreview(imageUrl);
      
      setPaymentFormData(prev => ({ ...prev, [name]: selectedFile }));
    } else {
      setPaymentFormData(prev => ({ ...prev, [name]: value }));
    }
  }, [selectedImagePreview]);

  const handleAssignmentInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setAssignmentFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle assign to expert
  const handleAssignToExpert = async (e) => {
    e.preventDefault();
    
    if (!assignmentFormData.bdOrderId) {
      setToast({ show: true, message: "Please select a BD Order", type: "error" });
      return;
    }

    try {
      await dispatch(AssignToExpertRequest({
        offerId: selectedOfferId,
        bdOrderId: assignmentFormData.bdOrderId,
        assignmentNotes: assignmentFormData.assignmentNotes,
        seller_id: sellerId,
        gig_id,
        package_id
      })).unwrap();
    } catch (error) {
      // Error is handled by Redux and shown in useEffect
    }
  };

  // Handle fast checkout
  const handleFastCheckout = async (e) => {
    e.preventDefault();
    
    if (!paymentFormData.file) {
      setToast({ show: true, message: "Please upload a receipt", type: "error" });
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('seller_id', sellerId);
      formData.append('gig_id', gig_id);
      formData.append('package_id', package_id);
      formData.append('offerId', selectedOfferId);
      formData.append('payment_method', 'bank_transfer');
      formData.append('transfer_receipt', paymentFormData.file);
      formData.append('status', 'pending_verification');

      await dispatch(AcceptOfferRequest(formData)).unwrap();

      setToast({ show: true, message: "Receipt submitted successfully!", type: "success" });
      await dispatch(getBuyerOfferRequest({ requestId: id }));
      closePaymentModal();
    } catch (error) {
      setToast({ show: true, message: error.message || "Transfer failed", type: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle card payment
  const handleCardPayment = async (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['username', 'email', 'password', 'amount'];
    if (requiredFields.some(field => !paymentFormData[field])) {
      setToast({ show: true, message: "Please fill all fields", type: "error" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentFormData.email)) {
      setToast({ show: true, message: "Invalid email", type: "error" });
      return;
    }

    if (parseFloat(paymentFormData.amount) <= 0) {
      setToast({ show: true, message: "Invalid amount", type: "error" });
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = {
        offerId: selectedOfferId,
        paymentMethod: 'card',
        cardDetails: {
          holderName: paymentFormData.username,
          email: paymentFormData.email,
          amount: parseFloat(paymentFormData.amount),
        },
        seller_id: sellerId,
        gig_id,
        package_id
      };

      const response = await dispatch(AcceptOfferRequest(paymentData)).unwrap();

      if (response?.payment_form_html) {
        const win = window.open("", "_blank");
        if (win) {
          win.document.open();
          win.document.write(response.payment_form_html);
          win.document.close();
        }
      }

      setToast({ show: true, message: "Payment processed!", type: "success" });
      await dispatch(getBuyerOfferRequest({ requestId: id }));
      closePaymentModal();
      
      if (!response?.payment_form_html) {
        navigate("/payment/success");
      }
    } catch (error) {
      setToast({ show: true, message: error.message || "Payment failed", type: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle offer rejection
  const handleReject = async (offerId) => {
    const result = await swal({
      title: "Are you sure?",
      text: "Reject this offer?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (!result) return;

    setIsProcessing(true);
    
    try {
      await dispatch(RejectOfferRequest({ offerId })).unwrap();
      setToast({ show: true, message: "Offer rejected!", type: "success" });
      await dispatch(getBuyerOfferRequest({ requestId: id }));
    } catch (error) {
      setToast({ show: true, message: error.message || "Rejection failed", type: "error" });
    } finally {
      setIsProcessing(false);
    }
  };

  // Close toast
  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  // Render BD orders in dropdown
  const renderOrderOptions = () => {
    if (isLoadingBdOrders) {
      return <option disabled>Loading BD orders...</option>;
    }

    const ordersArray = bdOrders || [];
    
    if (ordersArray.length === 0) {
      return <option disabled>No BD orders available</option>;
    }

    return ordersArray.map(order => {
      if (!order) return null;
      
      const bdOrderId = order.bdOrderId || order.id || order._id || 'N/A';
      const orderTitle = order.buyerrequest?.title || order.subject || `BD Order #${bdOrderId}`;
      
      let clientName = 'Unknown Client';
      if (order.client?.fname) clientName = order.client.fname;
      else if (order.buyer?.fname) clientName = order.buyer.fname;
      else if (order.user?.fname) clientName = order.user.fname;
      else if (typeof order.client === 'string') clientName = order.client;

      return (
        <option key={bdOrderId} value={bdOrderId}>
          {orderTitle} (BD Order ID: {bdOrderId}) - {clientName}
        </option>
      );
    });
  };

  return (
    <>
      <Navbar FirstNav="none" />

      <Snackbar
        open={toast.show}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.type} sx={{ width: '100%' }}>
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
                      alt={`${offer.business?.fname || ''} ${offer.business?.lname || ''}`}
                      onError={(e) => e.target.src = '/default-avatar.png'}
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
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      <span className="badge bg-light text-dark border font-14 poppins px-3 py-2 rounded-3">
                        Budget: ${offer.price}
                      </span>
                      <span className="badge bg-light text-dark border font-14 poppins px-3 py-2 rounded-3">
                        {getDuration(offer.created_at, offer.date)}
                      </span>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
                      {isBusinessDeveloper ? (
                        <button
                          className="btn btn-primary px-4"
                          onClick={() => openAssignModal(offer.id)}
                          disabled={isAssigning}
                        >
                          Assign to Expert
                        </button>
                      ) : (
                        <button
                          className="btn btn-success px-4"
                          onClick={() => openPaymentModal(offer.id)}
                          disabled={isProcessing}
                        >
                          Accept
                        </button>
                      )}
                      
                      <button
                        className="btn btn-danger px-4"
                        onClick={() => handleReject(offer.id)}
                        disabled={isProcessing || isAssigning}
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
              <h5 className="font-500 cocon byerLine mb-0">Add payment method</h5>
              <Button onClick={closePaymentModal} disabled={isProcessing}>
                ✕
              </Button>
            </div>

            <div className="row">
              <div className="col-lg-4 col-md-4 col-12 mb-4">
                <div className="nav flex-column nav-pills Paymentwhite p-3 rounded-3 h-100">
                  <button
                    className={`nav-link d-flex align-items-center mb-2 ${paymentMethod === 'fast-checkout' ? 'active' : ''}`}
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
                    className={`nav-link d-flex align-items-center mb-2 ${paymentMethod === 'card' ? 'active' : ''}`}
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
                    className={`nav-link d-flex align-items-center ${paymentMethod === 'paypal' ? 'active' : ''}`}
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
                              Upload Transfer Receipt *
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              id="transferFile"
                              name="file"
                              accept="image/*,.pdf"
                              onChange={handlePaymentInputChange}
                              disabled={isProcessing}
                            />

                            {selectedImagePreview && (
                              <img
                                src={selectedImagePreview}
                                className="mt-3 rounded"
                                width={150}
                                height={150}
                                alt="Transfer Receipt Preview"
                                style={{ objectFit: 'cover' }}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="contained"
                        onClick={handleFastCheckout}
                        disabled={isProcessing || !paymentFormData.file}
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
                            value={paymentFormData.username}
                            onChange={handlePaymentInputChange}
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
                            value={paymentFormData.email}
                            onChange={handlePaymentInputChange}
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
                            value={paymentFormData.password}
                            onChange={handlePaymentInputChange}
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
                            value={paymentFormData.amount}
                            onChange={handlePaymentInputChange}
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
                        {isProcessing ? 'Processing...' : 'Complete Payment'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Assign to Expert Modal */}
      <Modal
        open={showAssignModal}
        onClose={closeAssignModal}
        aria-labelledby="assign-modal-title"
        aria-describedby="assign-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '90%', md: '70%', lg: '60%' },
            maxWidth: '800px',
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
              <h5 className="font-500 cocon byerLine mb-0">Assign to Expert</h5>
              <Button onClick={closeAssignModal} disabled={isAssigning}>
                ✕
              </Button>
            </div>

            <form onSubmit={handleAssignToExpert}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="bdOrderId" className="form-label">
                    Select BD Order *
                  </label>
                  <select
                    id="bdOrderId"
                    name="bdOrderId"
                    className="form-select"
                    value={assignmentFormData.bdOrderId}
                    onChange={handleAssignmentInputChange}
                    required
                    disabled={isAssigning}
                  >
                    <option value="">Select a BD Order</option>
                    {renderOrderOptions()}
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="assignmentNotes" className="form-label">
                    Assignment Notes (Optional)
                  </label>
                  <textarea
                    id="assignmentNotes"
                    name="assignmentNotes"
                    className="form-control"
                    rows="4"
                    value={assignmentFormData.assignmentNotes}
                    onChange={handleAssignmentInputChange}
                    placeholder="Add instructions for the expert..."
                    disabled={isAssigning}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isAssigning}
                  startIcon={isAssigning ? <CircularProgress size={20} /> : null}
                  className="btn-stepper"
                >
                  {isAssigning ? 'Assigning...' : 'Assign to Expert'}
                </Button>
                
                <Button
                  type="button"
                  variant="outlined"
                  onClick={closeAssignModal}
                  disabled={isAssigning}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default OfferDetail;