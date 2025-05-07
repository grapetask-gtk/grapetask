import GooglePayButton from '@google-pay/button-react';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { paymentRequest } from '../config/googlePayConfig';
import { purchaseBidPackage } from "../redux/slices/bidsSlice";
import { useDispatch, useSelector } from "../redux/store/store";

const BuyBids = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.UserData) || JSON.parse(localStorage.getItem("UserData"));
  
  const [amount, setAmount] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const conversionRate = 15;
  const computedBids = amount ? Math.floor(Number(amount) / conversionRate) : 0;

  // Adjust paymentRequest transaction info dynamically using the entered amount
  const adjustedPaymentRequest = {
    ...paymentRequest,
    transactionInfo: {
      ...paymentRequest.transactionInfo,
      totalPrice: amount ? Number(amount).toFixed(2) : paymentRequest.transactionInfo.totalPrice
    }
  };

  const handlePurchase = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
  
    setPurchaseLoading(true);
  
    dispatch(purchaseBidPackage({ amount: Number(amount) }))
      .unwrap()
      .then((response) => {
        console.log('HandlePurchase response:', response);
  
        if (response.status) {
          // Update localStorage
          const userData = JSON.parse(localStorage.getItem('UserData')) || {};
  
          if (response.data?.total_bids !== undefined) {
            userData.total_bids = response.data.total_bids;
            localStorage.setItem('UserData', JSON.stringify(userData));
          }
  
          // Refresh to update all places
          window.location.reload();
  
          toast.success("Purchase successful! Your bid balance has been updated.");
        } else {
          toast.error(response.message || "Purchase failed.");
        }
      })
      .catch((error) => {
        toast.error("Purchase failed: " + error.message);
      })
      .finally(() => {
        setPurchaseLoading(false);
      });
  };
  
  

  const handleGooglePaySuccess = (paymentData) => {
    const token = paymentData.paymentMethodData.tokenizationData.token;
    toast.success("Google Pay successful! Processing your purchase...");
    console.log("Google Pay Token:", token);
    
    // TODO: send token to your backend and process payment
    // After successful backend processing, optionally call:
    handlePurchase();
  };

  return (
    <>
      <Navbar FirstNav="none" />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <ToastContainer position="top-right" autoClose={5000} />
        <Typography variant="h4" align="center" gutterBottom>
          Buy Bids
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Current Bid Balance: {userData?.total_bids || 0}
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
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              You will receive approximately {computedBids} bids.
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button
              variant="contained"
              onClick={handlePurchase}
              disabled={purchaseLoading}
              sx={{ mr: 2 }}
            >
              {purchaseLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Purchase Bids"
              )}
            </Button>
            <GooglePayButton
              environment="TEST" // Change to 'PRODUCTION' when ready
              paymentRequest={adjustedPaymentRequest}
              onLoadPaymentData={handleGooglePaySuccess}
              onError={(err) => console.error("Google Pay Error:", err)}
              buttonColor="black"
              buttonType="buy"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BuyBids;
