import { Download, FileDownload, Handshake } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Modal, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import pLimit from 'p-limit';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoMdAttach } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import userImg from "../../../assets/chatImg.webp";
import echo from "../../../echo";
import {
  downloadAuthenticatedFile,
  downloadFileDirect,
  downloadFileDirectSimple,
  downloadWithIframe,
  downloadWithNewWindow,
  fetchMessages,
  sendMessage,
} from "../../../redux/slices/messageSlice";
// import axios from "./../";
import axios from '../../../utils/axios';

import {
  AcceptOfferRequest,
  AssignToExpertRequest,
  CreateOfferRequest,
  RejectOfferRequest,
  getExperts,
  getOfferRequest,
  getPersonalGigs
} from "../../../redux/slices/offersSlice";

import {
  OrderComplete,
  OrderSubmit,
  ReviewSubmit
} from "../../../redux/slices/allOrderSlice";

const Chatting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { selectedConversation, messages, loading, typingUsers } = useSelector((s) => s.message);
  const { offers } = useSelector((s) => s.offers);
  const currentUser = JSON.parse(localStorage.getItem("UserData") || "{}");
  const {
    personalGigs,
    experts,
    isLoadingExperts
  } = useSelector((state) => state.offers);

  // Memoized user data to prevent unnecessary re-renders
  const UserData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("UserData")) || {};
    } catch (error) {
      console.error("Error parsing UserData:", error);
      return {};
    }
  }, []);

  const UserRole = UserData?.role;
  const userId = UserData?.id;

  const [inputVal, setInputVal] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [downloadingFileId, setDownloadingFileId] = useState(null);

  // Offer modal state
  const [buyerId, setBuyerId] = useState(null);
  const [description, setDescription] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [expertId, setExpertId] = useState("");
  const [gigRadio, setGigRadio] = useState("");
  const [offerLoader, setOfferLoader] = useState(false);
  const [open, setOpen] = useState(false);

  // Order submission state
  const [orderSubmissionModal, setOrderSubmissionModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderFiles, setOrderFiles] = useState([]);
  const [orderDescription, setOrderDescription] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState({});
  // const [submittingOrder, setSubmittingOrder] = useState(false);

  // Order completion state - ADDED
  const [orderCompletionModal, setOrderCompletionModal] = useState(false);
  const [completingOrder, setCompletingOrder] = useState(false);

  // Offer details modal
  const [offerDetailsModal, setOfferDetailsModal] = useState(false);
  const [offerDetails, setOfferDetails] = useState(null);

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('fast-checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    username: '',
    email: '',
    password: '',
    amount: '',
    file: null
  });
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});

  // Assign modal state
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignmentFormData, setAssignmentFormData] = useState({
    bdOrderId: '',
    assignmentNotes: ''
  });

  // review modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);


  // Toast state
  const [toastState, setToastState] = useState({ show: false, message: '', type: 'success' });
  // const [submissionStage, setSubmissionStage] = useState<'idle' | 'uploading' | 'submitting' | 'done'>('idle');

  const receiver = selectedConversation?.user ||
    selectedConversation?.users?.find((u) => u.id !== currentUser.id);
  const receiverId = receiver?.id;

  // User role checks
  const isFreelancer = currentUser.role?.toLowerCase().includes('expert/freelancer') ||
    currentUser.role?.toLowerCase().includes('freelancer');

  const isBd = currentUser.role?.toLowerCase().includes('bidder/company representative/middleman') ||
    currentUser.role?.toLowerCase().includes('middleman') ||
    currentUser.role?.toLowerCase().includes('company representative');

  const isBuyer = currentUser.role?.toLowerCase().includes('client') ||
    currentUser.user_type?.toLowerCase().includes('client');

  const isSeller = isFreelancer || isBd;

  // Effects - Optimized to run only when necessary
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [dispatch(getOfferRequest())];
        if (userId) {
          promises.push(dispatch(getPersonalGigs({ user_id: userId })));
        }
        if (isBd) {
          promises.push(dispatch(getExperts()));
        }
        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, UserRole, userId, isBd]);

  // Fetch messages periodically
  useEffect(() => {
    if (!selectedConversation?.id || !receiverId) return;
    const interval = setInterval(() => {
      dispatch(fetchMessages({ receiverId, silent: true }));
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch, selectedConversation?.id, receiverId]);

  // Scroll to bottom on new messages
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);


  const openReviewModal = () => setShowReviewModal(true);
  const closeReviewModal = () => {
    setReviewFormData({ rating: 0, comment: '' });
    setShowReviewModal(false);
  };

  const handleReviewInputChange = (e) => {
    setReviewFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  setIsSubmittingReview(true);

  const formData = new FormData();
  formData.append('rating', reviewFormData.rating);
  formData.append('comment', reviewFormData.comment);
  formData.append('offer_id', selectedOffer?.id);
  formData.append('order_id', selectedOffer?.order?.id);

  try {
    await dispatch(ReviewSubmit(formData)).unwrap();
    toast.success("Review submitted successfully!");
    closeReviewModal();
  } catch (error) {
    console.error(error);
    toast.error(error?.message || "Failed to submit review.");
  } finally {
    setIsSubmittingReview(false);
  }
};



  const handleClose = () => {
    setOpen(false);
    setOfferDetailsModal(false);
    setOrderSubmissionModal(false);
    setOrderCompletionModal(false); // ADDED
    setShowPaymentModal(false);
    setShowAssignModal(false);
    resetOfferForm();
  };

  // Typing whisper logic
  const handleTypingWhisper = useCallback((isTyping) => {
    if (!selectedConversation?.id || !echo) return;
    echo.private(`conversation.${selectedConversation.id}`)
      .whisper("typing", { userId: currentUser.id, isTyping });
  }, [selectedConversation?.id, currentUser.id]);

  // Input change + typing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputVal(value);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (value.length > 0) {
      handleTypingWhisper(true);
      typingTimeoutRef.current = setTimeout(() => handleTypingWhisper(false), 1000);
    } else {
      handleTypingWhisper(false);
    }
  };

  // Send text or file message
  const handleSend = useCallback(() => {
    if ((!inputVal.trim() && !selectedFile) || !receiverId) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    handleTypingWhisper(false);

    dispatch(sendMessage({
      receiver_id: receiverId,
      message_type: selectedFile ? "file" : "text",
      message: inputVal.trim(),
      file: selectedFile || null
    }))
      .then(() => {
        setInputVal("");
        setSelectedFile(null);
        setFilePreview(null);
        inputRef.current?.focus();
        dispatch(fetchMessages({ receiverId, silent: true }));
      })
      .catch(error => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      });
  }, [inputVal, selectedFile, receiverId, dispatch, handleTypingWhisper]);

  // File selection handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const isPreviewable = file.type.startsWith("image/") || file.type.startsWith("video/") || file.type === "application/pdf";
    if (isPreviewable) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result || "");
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  // File download handler with fallback strategy
  const handleDownload = async (filePath, fileName, msgId) => {
    setDownloadingFileId(msgId);
    try {
      await dispatch(downloadAuthenticatedFile({ filePath, fileName })).unwrap();
    } catch {
      try { await downloadFileDirectSimple(filePath); }
      catch {
        try { downloadFileDirect(filePath); }
        catch {
          try { downloadWithIframe(filePath); }
          catch {
            try { downloadWithNewWindow(filePath); }
            catch { alert('All download methods failed.'); }
          }
        }
      }
    } finally {
      setDownloadingFileId(null);
    }
  };

  // Offer modal control
  const openOfferModal = useCallback((buyerReq) => {
    setBuyerId(buyerReq.id);
    setOpen(true);
  }, []);

  const resetOfferForm = () => {
    setDescription("");
    setOfferPrice("");
    setOfferDate("");
    setExpertId("");
    setGigRadio("");
    setOpen(false);
  };

  const handleResponseOffer = useCallback((data) => {
    if (data?.status) {
      setOfferLoader(false);
      setOpen(false);
      resetOfferForm();
      toast.success("Offer created successfully!");
    } else {
      setOfferLoader(false);
      const errorMsg = data?.message || "Offer creation failed: Please try again.";

      if (data?.message === "Not enough bids! Please purchase more bids to submit an offer.") {
        toast.error(
          <>
            Not enough bids! Please purchase more bids to submit an offer.
            <br />
            <Button onClick={() => navigate("/buy-bids")}>Buy Bids</Button>
          </>
        );
      } else {
        toast.error(errorMsg);
      }
    }
  }, [navigate]);

  // Submit custom offer
  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    setOfferLoader(true);

    const payload = {
      client_id: receiverId,
      description,
      price: offerPrice,
      date: offerDate,
      expert_id: currentUser.id,
      gig_id: gigRadio || null
    };

    try {
      const response = await dispatch(CreateOfferRequest(payload));

      // Consistent status checking
      if (response?.status === true || response?.status === "true") {
        // Send the offer as a chat message
        await dispatch(sendMessage({
          receiver_id: receiverId,
          offer_id: response.data?.id || response.id,
          message_type: "offer",
          message: "Custom offer",
        }));

        // Success actions
        setOpen(false);
        resetOfferForm();
        toast.success("Offer created successfully!");
        dispatch(fetchMessages({ receiverId, silent: true }));

      } else {
        // Handle specific error cases
        const errorMsg = response?.message || "Offer creation failed: Please try again.";

        if (response?.message === "Not enough bids! Please purchase more bids to submit an offer.") {
          toast.error(
            <>
              Not enough bids! Please purchase more bids to submit an offer.
              <br />
              <Button onClick={() => navigate("/buy-bids")}>Buy Bids</Button>
            </>
          );
        } else {
          toast.error(errorMsg);
        }
      }
    } catch (err) {
      console.error("Error creating offer:", err);
      toast.error("Error creating offer. Please try again.");
    } finally {
      setOfferLoader(false);
    }
  };

  // Handle offer decline
  const handleDeclineOffer = async (offerId) => {
    try {
      await dispatch(RejectOfferRequest({ offer_id: offerId })).unwrap();

      // Send decline message
      await dispatch(sendMessage({
        receiver_id: receiverId,
        message_type: "offer_declined",
        message: "Offer declined",
        offer_id: offerId
      }));

      toast.info("Offer declined");
      dispatch(fetchMessages({ receiverId, silent: true }));
    } catch (err) {
      console.error("Decline offer error", err);
      toast.error("Failed to decline offer");
    }
  };
  // CORRECTED: Handle order completion
  const handleCompleteOrder = async (orderId) => {
    if (!orderId) {
      toast.error("Order ID is required");
      return;
    }
console.log("order is :",orderId );
    setCompletingOrder(true);

    try {
      const formData = new FormData();
      formData.append('status', "completed");
      formData.append('order_id', orderId);

      const result =  await dispatch(OrderComplete({
    orderId: orderId,
    payload: formData  // Contains status: "completed"
  }));

      if (OrderComplete.fulfilled.match(result)) {
        toast.success("Order completed successfully!");
        setOrderCompletionModal(false);
        dispatch(fetchMessages({ receiverId, silent: true }));
      } else {
        toast.error(result.payload || "Failed to complete order");
      }

    } catch (err) {
      console.error("Complete order error", err);
      toast.error("Unexpected error occurred while completing order");
    } finally {
      setCompletingOrder(false);
    }
  };



  const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB
  const CONCURRENCY_LIMIT = 4;

  const uploadFileInChunks = async (file, offerId) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const accessToken = localStorage.getItem("accessToken");
    const limit = pLimit(CONCURRENCY_LIMIT);

    const uploadChunk = async (chunk, index) => {
      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("chunk_index", index);
      formData.append("total_chunks", totalChunks);
      formData.append("file_name", file.name);
      formData.append("offer_id", offerId);

      try {
        const response = await axios.post(`/order/submit`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            const overallPercent = Math.round(((index + percent / 100) / totalChunks) * 100);

            setUploadProgress(prev => ({
              ...prev,
              [file.name]: overallPercent,
            }));
          }
        });

        console.log(`Chunk ${index + 1}/${totalChunks} uploaded. Status: ${response.status}`);
      } catch (err) {
        console.error(`Error uploading chunk ${index + 1}:`, err);
        throw err;
      }
    };

    const uploadPromises = [];

    for (let index = 0; index < totalChunks; index++) {
      const chunkStart = index * CHUNK_SIZE;
      const chunkEnd = (index + 1) * CHUNK_SIZE;
      const chunk = file.slice(chunkStart, chunkEnd);
      uploadPromises.push(limit(() => uploadChunk(chunk, index)));
    }

    await Promise.all(uploadPromises);

    console.log(`File "${file.name}" upload complete.`);
  };

  const handleSubmitOrder = async () => {
    if (!selectedOffer || !orderDescription.trim()) {
      toast.error("Please provide order description");
      return;
    }

    setSubmittingOrder(true);
    //  setSubmissionStage('uploading');
    try {
      // Step 1: Upload all files first (if any)
      if (orderFiles && orderFiles.length > 0) {
        console.log("Starting file uploads...");
        console.log("Files to upload:", orderFiles);

        for (const file of orderFiles) {
          console.log("Uploading file:", file.name, "size:", file.size);
          await uploadFileInChunks(file, selectedOffer.id);
        }
        console.log("All files uploaded successfully");
      }

      // setSubmissionStage('submitting');
      // Step 2: Submit order metadata (this will finalize the order)
      const metadataForm = new FormData();
      metadataForm.append('delivery_message', orderDescription);
      metadataForm.append('offer_id', selectedOffer.id);

      console.log("Submitting order metadata...");

      const metadataResponse = await dispatch(OrderSubmit({
        orderId: selectedOffer.id,
        payload: metadataForm,
      }));

      if (metadataResponse.payload && metadataResponse.meta.requestStatus === 'fulfilled') {
        toast.success("Order submitted successfully!");
        setOrderSubmissionModal(false);
        setOrderDescription("");
        setOrderFiles([]);
        setSelectedOffer(null);
        setUploadProgress({});
        //  setSubmissionStage('done');
        dispatch(fetchMessages({ receiverId, silent: true }));
      } else {
        throw new Error("Failed to submit order metadata");
      }

    } catch (err) {
      console.error("Submit order error", err);
      toast.error("Error submitting order");
    } finally {
      setSubmittingOrder(false);
    }
  };

  // File size validation
  const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

  const handleOrderFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    // Validate file sizes
    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(`These files exceed 5GB: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    setOrderFiles(prev => [...prev, ...files]);
  };

  const removeOrderFile = (index) => {
    setOrderFiles(prev => prev.filter((_, i) => i !== index));
  };






  // View offer details
  const viewOfferDetails = (offer) => {
    setOfferDetailsModal(true);
    setOfferDetails(offer);
  };

  const calculateDeliveryDays = (dateString) => {
    if (!dateString) return 0;

    try {
      const deliveryDate = new Date(dateString);
      const today = new Date();
      const diffTime = Math.max(0, deliveryDate - today);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (e) {
      console.error("Invalid date format", e);
      return 0;
    }
  };

  // Payment modal control
  const openPaymentModal = useCallback((offer) => {
    setSelectedOfferId(offer.id);
    setPaymentMethod("fast-checkout");
    setShowPaymentModal(true);
    setPaymentFormData({
      username: "",
      email: "",
      password: "",
      amount: offer.price || "",
      file: null
    });
    setSelectedImagePreview(null);
  }, []);

  const openAssignModal = useCallback((offer) => {
    setSelectedOfferId(offer.id);
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
      setToastState({ show: true, message: "Please select a BD Order", type: "error" });
      return;
    }

    setIsAssigning(true);
    try {
      await dispatch(AssignToExpertRequest({
        offerId: selectedOfferId,
        bdOrderId: assignmentFormData.bdOrderId,
        assignmentNotes: assignmentFormData.assignmentNotes,
      })).unwrap();

      setToastState({ show: true, message: "Assigned to expert successfully!", type: "success" });
      closeAssignModal();
    } catch (error) {
      setToastState({
        show: true,
        message: error.message || "Assignment failed",
        type: "error"
      });
    } finally {
      setIsAssigning(false);
    }
  };

  // Handle fast checkout
  const handleFastCheckout = async (e) => {
    e.preventDefault();

    if (!paymentFormData.file) {
      toast.error("Please upload a receipt");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append('offerId', selectedOfferId);
      formData.append('payment_method', 'bank_transfer');
      formData.append('transfer_receipt', paymentFormData.file);
      formData.append('status', 'pending_verification');

      const res = await dispatch(AcceptOfferRequest(formData));
      setTimeout(() => closePaymentModal(), 300);
      toast.success(res?.message || "Receipt submitted successfully!");

    } catch (error) {
      toast.error(error.message || "Transfer failed");
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
      setToastState({ show: true, message: "Please fill all fields", type: "error" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentFormData.email)) {
      setToastState({ show: true, message: "Invalid email", type: "error" });
      return;
    }

    if (parseFloat(paymentFormData.amount) <= 0) {
      setToastState({ show: true, message: "Invalid amount", type: "error" });
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
        }
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

      setToastState({ show: true, message: "Payment processed!", type: "success" });
      closePaymentModal();

      if (!response?.payment_form_html) {
        navigate("/payment/success");
      }
    } catch (error) {
      setToastState({
        show: true,
        message: error.message || "Payment failed",
        type: "error"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle offer rejection
  const handleReject = async (offerId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Reject this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    setIsProcessing(true);

    try {
      await dispatch(RejectOfferRequest({ offerId })).unwrap();
      setToastState({ show: true, message: "Offer rejected!", type: "success" });
    } catch (error) {
      setToastState({
        show: true,
        message: error.message || "Rejection failed",
        type: "error"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // CORRECTED: Handle reject delivery
  const handleRejectDelivery = async (offerId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Reject this order submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel"
    });

    if (!result.isConfirmed) return;

    setIsProcessing(true);

    try {
      // This should be a different action for rejecting delivery
      await dispatch(RejectOfferRequest({ offerId })).unwrap();
      setToastState({ show: true, message: "Delivery rejected!", type: "success" });
      dispatch(fetchMessages({ receiverId, silent: true }));
    } catch (error) {
      setToastState({
        show: true,
        message: error.message || "Rejection failed",
        type: "error"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Close toast
  const handleCloseToast = useCallback(() => {
    setToastState(prev => ({ ...prev, show: false }));
  }, []);

  const DownloadAttachments = ({ offer, hasDeliveryAttachment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isOpen]);

    // Helper function to get auth token (adjust based on your auth implementation)
    const getAuthToken = () => {
      // This should return your authentication token
      // Common approaches:
      // return localStorage.getItem('auth_token');
      // return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      // return cookies.get('sanctum_token');
      // Adjust this based on your authentication setup
      return localStorage.getItem('accessToken'); // Example - replace with your method
    };

    // Helper function to construct secure file URL
    const constructFileUrl = (filePath, fileName) => {
      // Extract folder from file path or determine based on context
      // You might need to adjust this based on how your file paths are structured
      const folder = 'uploads'; // Default folder, you may need to determine this dynamically

      // If filePath contains folder info, extract it
      const pathParts = filePath.split('/');
      const actualFolder = pathParts.length > 1 ? pathParts[pathParts.length - 2] : folder;

      // Clean filename to match backend sanitization
      const cleanFileName = fileName.split('/').pop(); // Remove any path info

      return `/files/${actualFolder}/${cleanFileName}`;
    };

    // Secure download function
    const downloadFile = async (file) => {
      try {
        const token = getAuthToken();
        const fileUrl = constructFileUrl(file.path, file.name);

        const response = await axios.get(fileUrl, {
          responseType: 'blob', // IMPORTANT: tell axios to treat the response as binary
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/octet-stream',
            // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          }
        });

        if (response.status !== 200) {
          if (response.status === 401) {
            throw new Error('Authentication required');
          } else if (response.status === 403) {
            throw new Error('Access denied');
          } else if (response.status === 404) {
            throw new Error('File not found');
          } else {
            throw new Error('Download failed');
          }
        }

        // Use response.data directly as it's already a Blob
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        console.error('Download error:', error);
        alert(`Download failed: ${error.message}`);
      }
    };


    const handleDownloadAll = async () => {
      for (const file of offer.order.delivery_attachments) {
        await downloadFile(file);
        // Add small delay between downloads to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    const formatFileName = (name, maxLength = 30) => {
      if (name.length <= maxLength) return name;
      const extension = name.split('.').pop();
      const nameWithoutExt = name.slice(0, name.lastIndexOf('.'));
      const truncated = nameWithoutExt.slice(0, maxLength - extension.length - 4);
      return `${truncated}...${extension}`;
    };

    const getFileIcon = (fileName) => {
      const ext = fileName.split('.').pop()?.toLowerCase();
      const iconMap = {
        pdf: '📄',
        doc: '📝',
        docx: '📝',
        txt: '📄',
        jpg: '🖼️',
        jpeg: '🖼️',
        png: '🖼️',
        gif: '🖼️',
        zip: '📦',
        rar: '📦',
      };
      return iconMap[ext] || '📄';
    };

    if (!hasDeliveryAttachment || !offer.order?.delivery_attachments?.length) {
      return null;
    }

    const attachments = offer.order.delivery_attachments;
    const multipleFiles = attachments.length > 1;

    return (
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Button
          ref={buttonRef}
          variant="outlined"
          size="small"
          startIcon={<FileDownload />}
          endIcon={multipleFiles ? <ExpandMoreIcon
            sx={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          /> : null}
          onClick={() => {
            if (multipleFiles) {
              setIsOpen(!isOpen);
            } else {
              // Secure download for single file
              downloadFile(attachments[0]);
            }
          }}
          sx={{
            borderColor: '#6B7280',
            color: '#374151',
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#F9FAFB',
              borderColor: '#9CA3AF',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            },
            '&:active': {
              transform: 'translateY(0px)'
            }
          }}
          aria-label={multipleFiles ? "Download files menu" : `Download ${attachments[0].name}`}
          aria-expanded={multipleFiles ? isOpen : undefined}
          aria-haspopup={multipleFiles ? "true" : undefined}
        >
          Download {multipleFiles ? 'Files' : 'File'}
        </Button>

        {multipleFiles && (
          <Paper
            ref={dropdownRef}
            sx={{
              display: isOpen ? 'block' : 'none',
              position: 'absolute',
              top: '110%',
              left: 0,
              zIndex: 1000,
              backgroundColor: '#ffffff',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: '250px',
              maxWidth: '350px',
              maxHeight: '300px',
              overflowY: 'auto',
              padding: 0,
              animation: isOpen ? 'slideDown 0.2s ease' : undefined,
              '@keyframes slideDown': {
                from: { opacity: 0, transform: 'translateY(-10px)' },
                to: { opacity: 1, transform: 'translateY(0)' }
              }
            }}
            role="menu"
            aria-label="Download options"
          >
            {/* Header with download all option */}
            <Box sx={{
              padding: '12px 16px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151' }}>
                {attachments.length} Files Available
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  size="small"
                  variant="text"
                  onClick={handleDownloadAll}
                  sx={{
                    fontSize: '0.75rem',
                    textTransform: 'none',
                    color: '#3B82F6',
                    '&:hover': { backgroundColor: '#EFF6FF' }
                  }}
                >
                  Download All
                </Button>
                <IconButton
                  size="small"
                  onClick={() => setIsOpen(false)}
                  sx={{
                    color: '#6B7280',
                    '&:hover': { backgroundColor: '#F3F4F6' }
                  }}
                  aria-label="Close menu"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* File list */}
            <Box sx={{ padding: '8px 0' }}>
              {attachments.map((file, index) => (
                <Box
                  key={index}
                  component="button"
                  onClick={() => downloadFile(file)}
                  role="menuitem"
                  tabIndex={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    padding: '10px 16px',
                    fontSize: '0.875rem',
                    color: '#374151',
                    backgroundColor: 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: '#F9FAFB',
                      color: '#1F2937'
                    },
                    '&:focus': {
                      backgroundColor: '#EFF6FF',
                      outline: '2px solid #3B82F6',
                      outlineOffset: '-2px'
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      downloadFile(file);
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem', minWidth: '20px' }}>
                    {getFileIcon(file.name)}
                  </span>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formatFileName(file.name)}
                    </Typography>
                    {file.size && (
                      <Typography
                        variant="caption"
                        sx={{ color: '#6B7280', display: 'block' }}
                      >
                        {(file.size / 1024).toFixed(1)} KB
                      </Typography>
                    )}
                  </Box>
                  <Download sx={{ fontSize: '1rem', color: '#9CA3AF' }} />
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    );
  };

  const renderOfferMessage = (msg) => {
    // Enhanced renderOfferMessage function with improved logic and UI
    const offer = msg?.offer || offers?.find(o => o.id === msg.offer_id);

    // Loading state
    if (!offer) {
      return (
        <Box sx={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
          borderRadius: '16px',
          p: 3,
          mb: 2,
          border: '1px solid #e1e8ed',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={20} sx={{ color: '#FF6B35' }} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              Loading offer details...
            </Typography>
          </Box>
        </Box>
      );
    }
    console.log("offers:", offer.status);

    // Enhanced status and role checks
    const offerStatus = (offer.status).toLowerCase();
    const isOfferSent = msg.sender_id === currentUser.id;
    const isClient = currentUser.id === offer.buyer_id;
    const isSeller = currentUser.id === offer.seller_id || currentUser.id === offer.expert_id;
    const hasOrderId = offer.order_id || offer.order?.id;

    // Improved logic for action availability
    const canAcceptOffer = !isOfferSent && offerStatus === 'pending' && isClient;
    const canDeclineOffer = !isOfferSent && offerStatus === 'pending' && isClient;
    const canSubmitOrder = (isOfferSent || isSeller) && offerStatus === 'accepted';
    const canAcceptDelivery = isClient && offerStatus === 'delivered' && hasOrderId;
    const canRejectDelivery = isClient && offerStatus === 'delivered' && hasOrderId;
    const canWriteReview = isClient && offerStatus === 'completed' && !offer.review_submitted;
    const hasDeliveryAttachment = (offerStatus === 'delivered' || offerStatus === 'completed') &&
      (offer.attachment || offer.order?.delivery_attachments);

    console.log("isOfferSent ", isOfferSent);
    console.log("isSeller ", isSeller);
    console.log("offerStatus ", offerStatus);
    console.log("isClient ", isClient);
    console.log("canAcceptDelivery:", canAcceptDelivery);
    console.log("hasOrderId ", hasOrderId);

    // Enhanced status configuration
    const statusConfig = {
      pending: {
        background: '#FFF3CD',
        color: '#856404',
        border: '#FFEAA7',
        icon: '⏳',
        label: 'Pending'
      },
      accepted: {
        background: '#D4EDDA',
        color: '#155724',
        border: '#C3E6CB',
        icon: '✅',
        label: 'Accepted'
      },
      declined: {
        background: '#F8D7DA',
        color: '#721C24',
        border: '#F5C6CB',
        icon: '❌',
        label: 'Declined'
      },
      rejected: {
        background: '#F8D7DA',
        color: '#721C24',
        border: '#F5C6CB',
        icon: '❌',
        label: 'Rejected'
      },
      delivered: {
        background: '#CCE7FF',
        color: '#004085',
        border: '#B8DAFF',
        icon: '📦',
        label: 'Delivered'
      },
      completed: {
        background: '#E2E3FF',
        color: '#383874',
        border: '#C8C9FA',
        icon: '🎉',
        label: 'Completed'
      },
      expired: {
        background: '#FADBD8',
        color: '#A93226',
        border: '#F1948A',
        icon: '⏰',
        label: 'Expired'
      }
    };

    const currentStatus = statusConfig[offerStatus] || statusConfig.pending;

    // Helper function to calculate delivery time
    const getDeliveryInfo = () => {
      if (offer.delivery_days) {
        return `${offer.delivery_days} days`;
      }
      if (offer.date) {
        const days = calculateDeliveryDays(offer.date);
        return `${days} days`;
      }
      return 'Not specified';
    };

    // Helper function to get expiry info
    const getExpiryInfo = () => {
      if (!offer.expires_at) return null;

      const expiryDate = new Date(offer.expires_at);
      const now = new Date();
      const isExpired = expiryDate < now;

      return {
        date: expiryDate.toLocaleDateString(),
        isExpired,
        timeLeft: isExpired ? null : Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
      };
    };

    const expiryInfo = getExpiryInfo();

    return (
      <Box sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        borderRadius: '20px',
        p: 3,
        mb: 2,
        border: `2px solid ${currentStatus.border}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {/* Decorative background element */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: `linear-gradient(45deg, ${currentStatus.background}40, transparent)`,
          borderRadius: '50%',
          transform: 'translate(30px, -30px)'
        }} />

        {/* Header with improved status display */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{
              color: '#2D3748',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Handshake size={20} color="#FF6B35" />
              Custom Offer
            </Typography>
            {offer.gig_id && (
              <Chip
                label="Gig-based"
                size="small"
                sx={{
                  backgroundColor: '#E3F2FD',
                  color: '#1565C0',
                  fontSize: '0.7rem',
                  height: '20px'
                }}
              />
            )}
          </Box>

          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span>{currentStatus.icon}</span>
                <span>{currentStatus.label}</span>
              </Box>
            }
            size="small"
            sx={{
              backgroundColor: currentStatus.background,
              color: currentStatus.color,
              border: `1px solid ${currentStatus.border}`,
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '28px'
            }}
          />
        </Box>

        {/* Enhanced description */}
        <Typography variant="body1" sx={{
          color: '#4A5568',
          mb: 3,
          lineHeight: 1.6,
          fontSize: '0.95rem',
          fontWeight: 500
        }}>
          {offer.description || 'Custom offer for your project requirements'}
        </Typography>

        {/* Enhanced price and delivery info */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          p: 2.5,
          backgroundColor: '#f7fafc',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.85rem' }}>
                Price:
              </Typography>
              <Typography variant="h6" sx={{
                color: '#10B981',
                fontWeight: 700,
                fontSize: '1.3rem'
              }}>
                ${offer.price || '0'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.85rem' }}>
                Delivery:
              </Typography>
              <Typography variant="body2" sx={{
                color: '#374151',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {getDeliveryInfo()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Expiry information */}
        {expiryInfo && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
            p: 1.5,
            backgroundColor: expiryInfo.isExpired ? '#FEF2F2' : '#F0F9FF',
            borderRadius: '12px',
            border: `1px solid ${expiryInfo.isExpired ? '#FECACA' : '#BFDBFE'}`
          }}>
            <Typography variant="caption" sx={{
              color: expiryInfo.isExpired ? '#DC2626' : '#1D4ED8',
              fontWeight: 500
            }}>
              {expiryInfo.isExpired ?
                `⏰ Expired on ${expiryInfo.date}` :
                `⏳ Expires on ${expiryInfo.date} (${expiryInfo.timeLeft} days left)`
              }
            </Typography>
          </Box>
        )}

        {/* Enhanced action buttons */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {/* View Details - Always available */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => viewOfferDetails(offer)}
            sx={{
              borderColor: '#E2E8F0',
              color: '#4A5568',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#CBD5E0',
                backgroundColor: '#F7FAFC',
                transform: 'translateY(-1px)'
              }
            }}
          >
            👁️ View Details
          </Button>

          {/* Accept Offer */}
          {canAcceptOffer && (
            <Button
              variant="contained"
              size="small"
              onClick={() => openPaymentModal(offer)}
              sx={{
                backgroundColor: '#10B981',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  backgroundColor: '#059669',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                }
              }}
            >
              ✅ Accept ${offer.price}
            </Button>
          )}

          {/* Decline Offer */}
          {canDeclineOffer && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleDeclineOffer(offer.id)}
              sx={{
                borderColor: '#FCA5A5',
                color: '#EF4444',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#F87171',
                  backgroundColor: '#FEF2F2',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              ❌ Decline
            </Button>
          )}

          {/* Submit Order */}
          {canSubmitOrder && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setSelectedOffer(offer);
                setOrderSubmissionModal(true);
              }}
              sx={{
                backgroundColor: '#3B82F6',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  backgroundColor: '#2563EB',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                }
              }}
            >
              📤 Submit Order
            </Button>
          )}

          {/* Accept Delivery */}
          {canAcceptDelivery && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setSelectedOffer(offer);
                setOrderCompletionModal(true);
              }}
              sx={{
                backgroundColor: '#10B981',
                color: '#fff',
                fontWeight: 600,
                borderRadius: '10px',
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  backgroundColor: '#059669',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                }
              }}
            >
              ✅ Accept Delivery
            </Button>
          )}

          {/* Reject Delivery */}
          {canRejectDelivery && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleRejectDelivery(offer.id)}
              sx={{
                borderColor: '#EF4444',
                color: '#EF4444',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#FEF2F2',
                  borderColor: '#DC2626',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              ❌ Reject Delivery
            </Button>
          )}

          {/* Enhanced Download Attachments Component */}
          <DownloadAttachments
            offer={offer}
            hasDeliveryAttachment={hasDeliveryAttachment}
          />

          {/* Write Review */}
          {canWriteReview && (
            <Button
              variant="outlined"
              size="small"
                            onClick={() => {
                setSelectedOffer(offer);
                openReviewModal(offer);
              }}
              
              
              sx={{
                borderColor: '#8B5CF6',
                color: '#8B5CF6',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#F3E8FF',
                  borderColor: '#7C3AED',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              ⭐ Write Review
            </Button>
          )}

          {/* BD Assignment (if applicable) */}
          {canSubmitOrder && isBd && offerStatus === 'accepted' && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => openAssignModal(offer)}
              sx={{
                borderColor: '#F59E0B',
                color: '#D97706',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#FFFBEB',
                  borderColor: '#F59E0B',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              👨‍💼 Assign to Expert
            </Button>
          )}
        </Box>

        {/* Loading overlay for actions */}
        {(offerLoader || isProcessing) && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            zIndex: 1
          }}>
            <CircularProgress size={24} sx={{ color: '#FF6B35' }} />
          </Box>
        )}
      </Box>
    );
  };


  const typingUserIds = typingUsers?.[selectedConversation?.id] || {};
  const isSomeoneTyping = Object.entries(typingUserIds)
    .some(([uid, t]) => t && uid !== currentUser.id.toString());

  if (!selectedConversation) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7FAFC'
      }}>
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h5" sx={{
            color: '#2D3748',
            fontWeight: 600,
            mb: 2
          }}>
            Select a conversation to start chatting
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096' }}>
            Choose a contact from the sidebar to begin messaging
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* Chat header */}
      <div className="chat-container d-flex flex-column h-100">
        <div className="chat-header p-3 bg-light rounded-top d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={receiver.image || userImg}
              alt="user"
              onError={(e) => e.target.src = userImg}
              width={40}
              height={40}
              className="rounded-circle me-3"
            />
            <div>
              <p className="mb-0 fw-medium">{receiver.fname || receiver.name || "User"}</p>
              <small className="text-muted">{isSomeoneTyping ? "Typing..." : "Online"}</small>
            </div>
          </div>


        </div>

        {/* Messages */}
        <div className="flex-grow-1 overflow-auto p-3">
          {loading ? (
            <div className="text-center py-3">
              <CircularProgress size={20} />
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg, i) => {
              const isSender = msg.sender_id === currentUser.id;
              const time = new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
                <div key={msg.id || i}
                  className={`d-flex mb-3 ${isSender ? "justify-content-end" : "justify-content-start"}`}>
                  <div className={`p-3 rounded-3 position-relative ${isSender ? "text-dark" : "bg-light text-dark"}`}
                    style={{
                      backgroundColor: isSender ? 'bg-white' : undefined,
                    }}
                  >

                    {/* Regular message */}
                    {msg.message && msg.message_type !== 'offer' && (
                      <div className="mb-1">{msg.message}</div>
                    )}

                    {/* File attachment */}
                    {msg.file_path && (
                      <div className="mt-2">
                        <button
                          className="btn btn-sm btn-link text-decoration-none"
                          disabled={downloadingFileId === msg.id}
                          onClick={() => handleDownload(msg.file_path, msg.file_name, msg.id)}
                        >
                          {downloadingFileId === msg.id ?
                            <CircularProgress size={20} /> :
                            <>📎 {msg.file_name}</>
                          }
                        </button>
                        <small className="d-block text-muted">
                          {msg.file_name} • {msg.file_size ? `${(msg.file_size / 1024).toFixed(1)} KB` : 'Unknown'}
                        </small>
                      </div>
                    )}

                    {/* Offer message */}
                    {msg.message_type === 'offer' && renderOfferMessage(msg)}

                    {/* Status messages */}
                    {(msg.message_type === 'offer_accepted' ||
                      msg.message_type === 'offer_declined' ||
                      msg.message_type === 'order_submitted') && (
                        <div className="alert alert-info mb-1 py-2">
                          <small>{msg.message}</small>
                        </div>
                      )}

                    <div className="text-end mt-2">
                      <small className={isSender ? "text-dark-50" : "text-muted"}>{time}</small>
                      {isSender && (
                        <span className="ms-1 text-dark-50">
                          {msg.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-5 text-muted">
              No messages yet. Start the conversation!
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Send input */}
        <div className="chat-input p-3 bg-light rounded-bottom">
          <div className="input-group">
            {(isFreelancer || isBd) && (
              <Button
                variant="contained"
                size="small"
                onClick={() => openOfferModal(receiver)}
                className="p-2 text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors"
                title="Create custom offer"
              >
                <Handshake size={20} color="#FF6B35" />
              </Button>
            )}
            <input
              ref={inputRef}
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              disabled={!receiverId || loading}
              className="form-control"
              placeholder="Type here..."
            />
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={(!inputVal.trim() && !selectedFile) || !receiverId || loading}
            >
              <RiSendPlaneFill />
            </button>
            <label htmlFor="fileInput" className="ms-2 cursor-pointer">
              <IoMdAttach className="text-primary" size={24} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <div className="mt-2 d-flex align-items-center p-2 bg-white rounded">
              {filePreview && selectedFile.type.startsWith("image/") ? (
                <img src={filePreview} alt="preview" width={60} height={60} className="me-2 object-cover rounded" />
              ) : (
                <div className="me-2 p-2 bg-light rounded">
                  <small>{selectedFile.name}</small>
                </div>
              )}
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => { setSelectedFile(null); setFilePreview(null); }}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Offer Modal */}
      <Modal open={open} onClose={resetOfferForm}>
        <Box sx={{
          p: 4,
          maxWidth: 600,
          margin: 'auto',
          mt: 8,
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <h4 className="mb-3">Send Custom Offer</h4>
          <form onSubmit={handleSubmitOffer}>
            <div className="mb-3">
              <label className="form-label">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you'll deliver..."
                maxLength={500}
                required
                rows={4}
                className="form-control"
              />
              <small className="text-muted">{description.length}/500 characters</small>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Delivery Date *</label>
                <input
                  type="date"
                  value={offerDate}
                  onChange={(e) => setOfferDate(e.target.value)}
                  required
                  className="form-control"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Price (USD) *</label>
                <input
                  type="text"
                  value={offerPrice}
                  placeholder="0.00"
                  onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setOfferPrice(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
            </div>

            {UserRole === "bidder/company representative/middleman" && (
              <div className="col-12 prof-fields mt-4">
                <label htmlFor="expertId" className="form-label font-18 poppins blackcolor">
                  Select Expert (Optional)
                </label>
                <select
                  className="form-control p-3 border-0 font-16 poppins"
                  value={expertId}
                  onChange={(e) => setExpertId(e.target.value)}
                  id="expertId"
                >
                  <option value="">-- Select an Expert --</option>
                  {experts?.length > 0 ? (
                    experts.map((ex) => (
                      <option key={ex.id} value={ex.id}>
                        {ex.fname} {ex.lname}
                      </option>
                    ))
                  ) : (
                    <option disabled>
                      {isLoadingExperts ? "Loading experts..." : "No experts available"}
                    </option>
                  )}
                </select>
                <small className="text-muted">
                  If selected, this will invite the expert and update the order status to "Project Started".
                </small>
              </div>
            )}

            <div className="container-fluid mt-3">
              <div className="row">
                {personalGigs?.map((gig, idx) => (
                  <div className="col-lg-3 mt-3" key={gig.id || idx}>
                    <div
                      className="rounded-4 px-2 h-100"
                      style={{ backgroundColor: "#f5f5ff" }}
                    >
                      <input
                        required
                        checked={gigRadio === gig.id}
                        type="radio"
                        value={gig.id}
                        onChange={() => setGigRadio(gig.id)}
                        name="gigCheck"
                        id={`radio${idx}`}
                      />
                      <label htmlFor={`radio${idx}`} className="d-block">
                        <img
                          height={150}
                          src={
                            gig.media?.image1 ||
                            gig.media?.image2 ||
                            gig.media?.image3 ||
                            userImg
                          }
                          alt="Gig"
                          className="w-100 object-fit-cover shadow rounded-4"
                          onError={(e) => e.target.src = userImg}
                        />
                        <p className="text-secondary font-12 mt-2">
                          {gig.title}
                        </p>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="outlined" onClick={resetOfferForm}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={offerLoader || !description.trim() || !offerPrice || !offerDate}
              >
                {offerLoader ? <CircularProgress size={20} /> : "Send Offer"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Order Submission Modal */}
      <Dialog
        open={orderSubmissionModal}
        onClose={() => setOrderSubmissionModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Submit Order</DialogTitle>
        <DialogContent>
          <div className="mb-3">
            <label className="form-label">Order Description *</label>
            <textarea
              value={orderDescription}
              onChange={(e) => setOrderDescription(e.target.value)}
              placeholder="Describe your completed work..."
              rows={4}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Attach Files</label>
            <input
              type="file"
              multiple
              onChange={handleOrderFileChange}
              className="form-control"
            />
            <small className="text-muted">Upload your deliverables</small>
          </div>

          {orderFiles.length > 0 && (
            <div className="mb-3">
              <h6>Selected Files:</h6>

              {orderFiles.map((file, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between p-2 border rounded mb-2">
                  <span className="me-2">{file.name}</span>

                  <div className="flex-grow-1 me-2">
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress[file.name] || 0}
                    />
                  </div>

                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeOrderFile(index)}
                    disabled={submittingOrder}
                  >
                    Remove
                  </Button>
                </div>
              ))}

            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderSubmissionModal(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitOrder}
            variant="contained"
            disabled={submittingOrder || !orderDescription.trim()}
          >
            submit
          </Button>

        </DialogActions>
      </Dialog>

      {/* Offer Details Modal */}
      <Dialog
        open={offerDetailsModal}
        onClose={() => setOfferDetailsModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Offer Details</DialogTitle>
        <DialogContent>
          {offerDetails ? (
            <div>
              <p><strong>Description:</strong> {offerDetails.description}</p>
              <p><strong>Price:</strong> ${offerDetails.price}</p>
              <p><strong>Delivery:</strong> {calculateDeliveryDays(offerDetails.date)} days</p>
              <p><strong>Status:</strong>
                <Chip
                  label={offerDetails.status}
                  color={
                    offerDetails.status === 'accepted' ? 'success' :
                      offerDetails.status === 'declined' ? 'error' : 'warning'
                  }
                  size="small"
                  className="ms-2"
                />
              </p>
              <p><strong>Created:</strong> {new Date(offerDetails.created_at).toLocaleString()}</p>
              {offerDetails.expires_at && (
                <p><strong>Expires:</strong> {new Date(offerDetails.expires_at).toLocaleString()}</p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <CircularProgress />
              <p>Loading offer details...</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOfferDetailsModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

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
                      <div className="rounded-circle bg-primary" style={{ width: '12px', height: '12px' }}></div>
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

{/* Order Completion Modal - ADDED */}
<Dialog
  open={orderCompletionModal}
  onClose={() => setOrderCompletionModal(false)}
>
  <DialogTitle>Complete Order</DialogTitle>
  <DialogContent>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Are you sure you want to mark this order as completed?
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOrderCompletionModal(false)}>Cancel</Button>
    <Button
      onClick={() => handleCompleteOrder(selectedOffer.order.id)}
      variant="contained"
      disabled={completingOrder}
    >
      {completingOrder ? 'Completing...' : 'Complete Order'}
    </Button>
  </DialogActions>
</Dialog>


      <Modal
        open={showReviewModal}
        onClose={closeReviewModal}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '70%', md: '50%' },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            overflow: 'auto',
            p: 4
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0 font-500 cocon">Write a Review</h5>
            <Button onClick={closeReviewModal}>✕</Button>
          </div>

          <form onSubmit={handleReviewSubmit}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating (1 to 5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                className="form-control"
                min="1"
                max="5"
                value={reviewFormData.rating}
                onChange={handleReviewInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea
                id="comment"
                name="comment"
                className="form-control"
                rows="4"
                value={reviewFormData.comment}
                onChange={handleReviewInputChange}
                placeholder="Share your experience..."
                required
              />
            </div>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmittingReview}
                startIcon={isSubmittingReview ? <CircularProgress size={20} /> : null}
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </Button>

              <Button type="button" variant="outlined" onClick={closeReviewModal}>
                Cancel
              </Button>
            </div>
          </form>
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
                    {/* Replace with actual BD orders */}
                    <option value="1">BD Order #1</option>
                    <option value="2">BD Order #2</option>
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

      {/* Toast Notification */}
      {toastState.show && (
        <div className={`toast toast-${toastState.type}`} style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          padding: '10px 20px',
          borderRadius: '4px',
          color: 'white',
          backgroundColor: toastState.type === 'success' ? '#4caf50' : '#f44336'
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <span>{toastState.message}</span>
            <button
              onClick={handleCloseToast}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                marginLeft: '15px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatting;