import GooglePayButton from '@google-pay/button-react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { paymentRequest } from '../config/googlePayConfig';
import { purchaseBidPackage } from "../redux/slices/bidsSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const BuyBids = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.UserData);

  // State management
  const [amount, setAmount] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('fast-checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    amount: '',
    file: null
  });
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Constants
  const conversionRate = 15;
  const computedBids = amount ? Math.floor(Number(amount) / conversionRate) : 0;

  // Validation functions
  const validateAmount = (value) => {
    const numValue = Number(value);
    if (!value || isNaN(numValue) || numValue <= 0) {
      return "Please enter a valid amount greater than 0";
    }
    if (numValue < 15) {
      return "Minimum amount is PKR 15";
    }
    return null;
  };

  const validateCardForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Cardholder name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Card PIN is required";
    } else if (formData.password.length < 4 || formData.password.length > 6) {
      newErrors.password = "PIN must be 4-6 digits";
    }
    
    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (Number(formData.amount) !== Number(amount)) {
      newErrors.amount = "Amount must match the entered amount";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Adjusted payment request for Google Pay
  const adjustedPaymentRequest = {
    ...paymentRequest,
    transactionInfo: {
      ...paymentRequest.transactionInfo,
      totalPrice: amount ? Number(amount).toFixed(2) : paymentRequest.transactionInfo.totalPrice
    }
  };

  // Main purchase handler
  const handlePurchase = useCallback(async () => {
    setPurchaseLoading(true);
    
    try {
      const response = await dispatch(purchaseBidPackage({ amount: Number(amount) })).unwrap();
      
      if (response.status) {
        // Update user data in Redux store instead of directly manipulating localStorage
        toast.success("Purchase successful! Your bid balance has been updated.");
        setShowPaymentModal(false);
        setAmount("");
        setFormData({
          username: '',
          email: '',
          password: '',
          amount: '',
          file: null
        });
        setSelectedImagePreview(null);
      } else {
        toast.error(response.message || "Purchase failed.");
      }
    } catch (error) {
      toast.error("Purchase failed: " + (error.message || "Unknown error"));
    } finally {
      setPurchaseLoading(false);
      setIsProcessing(false);
    }
  }, [dispatch, amount]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "file") {
      const file = files[0];
      if (file) {
        // Validate file type and size
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!allowedTypes.includes(file.type)) {
          toast.error("Please upload a valid image (JPG, PNG) or PDF file");
          return;
        }
        
        if (file.size > maxSize) {
          toast.error("File size must be less than 5MB");
          return;
        }
        
        setFormData(prev => ({ ...prev, file }));
        setSelectedImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear errors when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  // Fast checkout (Bank Transfer) handler
  const handleFastCheckout = async (e) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast.error("Please upload a transfer receipt before proceeding.");
      return;
    }

    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }

    setIsProcessing(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('amount', amount);
      formDataToSend.append('payment_method', 'bank_transfer');
      formDataToSend.append('transfer_receipt', formData.file, formData.file.name);
      formDataToSend.append('status', 'pending_verification');

      const response = await dispatch(purchaseBidPackage(formDataToSend)).unwrap();
      
      if (response.status) {
        toast.success("Transfer receipt submitted successfully! Your order will be activated after verification.");
        setShowPaymentModal(false);
        setAmount("");
        setFormData(prev => ({ ...prev, file: null }));
        setSelectedImagePreview(null);
      } else {
        toast.error(response.message || "Failed to submit transfer receipt");
      }
    } catch (error) {
      toast.error(error.message || "Failed to process bank transfer. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Card payment handler
  const handleCardPayment = async (e) => {
    e.preventDefault();
    
    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }
    
    if (!validateCardForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real application, you would integrate with a payment processor
      // This is a simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await handlePurchase();
      toast.success("Card payment successful!");
    } catch (error) {
      toast.error("Card payment failed: " + (error.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Google Pay success handler
  const handleGooglePaySuccess = async (paymentData) => {
    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      toast.success("Google Pay successful! Processing purchase...");
      await handlePurchase();
    } catch (error) {
      toast.error("Google Pay processing failed: " + (error.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGooglePayError = (error) => {
    console.error('Google Pay Error:', error);
    toast.error("Google Pay failed. Please try another payment method.");
  };

  // Modal handlers
  const openPaymentModal = () => {
    const amountError = validateAmount(amount);
    if (amountError) {
      toast.error(amountError);
      return;
    }
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setErrors({});
    setIsProcessing(false);
  };

  // Get current user data with fallback
  const currentUserData = userData || JSON.parse(localStorage.getItem("UserData") || '{}');

  return (
    <>
      <Navbar FirstNav="none" />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <ToastContainer position="top-right" autoClose={5000} />
        
        <Typography variant="h4" align="center" gutterBottom>
          Buy Bids
        </Typography>
        
        <Typography variant="h6" align="center" gutterBottom>
          Current Bid Balance: {currentUserData?.total_bids || 0}
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Enter Amount (PKR)"
              variant="outlined"
              fullWidth
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              error={!!validateAmount(amount) && amount !== ""}
              helperText={amount !== "" ? validateAmount(amount) : "Minimum amount: PKR 15"}
              inputProps={{ min: 15, step: 1 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
              You will receive approximately <strong>{computedBids}</strong> bids
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              (1 bid = PKR {conversionRate})
            </Typography>
          </Grid>
          
          <Grid item xs={12} container justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={openPaymentModal}
              disabled={purchaseLoading || !amount || Number(amount) <= 0}
              sx={{ minWidth: 200 }}
            >
              {purchaseLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Modal */}
      <Modal
        open={showPaymentModal}
        onClose={closePaymentModal}
        aria-labelledby="payment-modal-title"
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
            p: 3,
            overflow: 'auto'
          }}
        >
          <Typography id="payment-modal-title" variant="h6" gutterBottom>
            Choose Payment Method
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            Amount: PKR {amount} → {computedBids} bids
          </Alert>

          <Grid container spacing={2}>
            {/* Payment Method Selection */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  fullWidth
                  variant={paymentMethod === 'fast-checkout' ? 'contained' : 'outlined'}
                  onClick={() => setPaymentMethod('fast-checkout')}
                  disabled={isProcessing}
                >
                  Bank Transfer
                </Button>
                <Button
                  fullWidth
                  variant={paymentMethod === 'card' ? 'contained' : 'outlined'}
                  onClick={() => setPaymentMethod('card')}
                  disabled={isProcessing}
                >
                  Card Payment
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  disabled
                  sx={{ opacity: 0.5 }}
                >
                  PayPal (Coming Soon)
                </Button>
              </Box>
            </Grid>

            {/* Payment Forms */}
            <Grid item xs={12} md={8}>
              {paymentMethod === 'fast-checkout' && (
                <Box component="form" onSubmit={handleFastCheckout}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Transfer to: <strong>GrapeTask Private Limited</strong><br/>
                    Account No: 6020306265300019<br/>
                    IBAN: PK88 BPUN 6020 3062 6530 0019
                  </Alert>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Upload your transfer receipt:
                  </Typography>
                  
                  <input
                    type="file"
                    name="file"
                    accept="image/*,.pdf"
                    onChange={handleInputChange}
                    disabled={isProcessing}
                    style={{ marginBottom: '16px' }}
                  />
                  
                  {selectedImagePreview && (
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={selectedImagePreview}
                        alt="Transfer Receipt"
                        style={{ 
                          maxWidth: '200px', 
                          maxHeight: '200px',
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </Box>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isProcessing || !formData.file}
                    fullWidth
                  >
                    {isProcessing ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Submit Transfer Receipt'
                    )}
                  </Button>
                </Box>
              )}

              {paymentMethod === 'card' && (
                <Box component="form" onSubmit={handleCardPayment}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Cardholder Name"
                        name="username"
                        fullWidth
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        error={!!errors.username}
                        helperText={errors.username}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Card PIN"
                        name="password"
                        fullWidth
                        type="password"
                        required
                        inputProps={{ maxLength: 6, minLength: 4 }}
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        error={!!errors.password}
                        helperText={errors.password || "4-6 digits"}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Amount (PKR)"
                        name="amount"
                        fullWidth
                        type="number"
                        required
                        value={formData.amount}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        error={!!errors.amount}
                        helperText={errors.amount || `Must match: ${amount}`}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isProcessing}
                        fullWidth
                        size="large"
                      >
                        {isProcessing ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          `Pay PKR ${amount}`
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Google Pay Button */}
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Or pay with Google Pay:
                </Typography>
                <GooglePayButton
                  environment="TEST"
                  paymentRequest={adjustedPaymentRequest}
                  onLoadPaymentData={handleGooglePaySuccess}
                  onError={handleGooglePayError}
                  buttonColor="black"
                  buttonType="pay"
                />
              </Box>
            </Grid>
          </Grid>

          {/* Close Button */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={closePaymentModal}
              disabled={isProcessing}
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BuyBids;