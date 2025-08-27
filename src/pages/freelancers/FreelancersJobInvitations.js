import {
  Box,
  IconButton,
  Modal,
  Button as MuiButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Offcanvas,
  Spinner,
} from 'react-bootstrap';
import {
  FaCalendarAlt,
  FaCheck,
  FaDollarSign,
  FaEye,
  FaRegEnvelope,
  FaTimes,
} from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

// Components
import Navbar from '../../components/Navbar';
import Chating from '../../components/frelancerChat/Chat/Chating';

// Redux
import searchIcon from '../../assets/searchbar.webp';
import {
  acceptJobInvitation,
  fetchJobInvitations,
  rejectJobInvitation,
} from '../../redux/slices/jobInvitationSlice';
import {
  clearConversationError,
  createOrFindConversation,
  setSelectedConversation,
} from '../../redux/slices/messageSlice';


// Instead of importing from assets
const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=random";

// Constants
const ITEMS_PER_PAGE = 4;
const DEBOUNCE_DELAY = 300;
const STATUS_FILTER_OPTIONS = ['all', 'pending', 'accepted', 'rejected'];

/**
 * Utility function to calculate time duration from a given date
 * @param {Date} createdAt - The date to compare with current time
 * @returns {string} - Formatted duration string
 */
const calculateDuration = (createdAt) => {
  const diffInSeconds = Math.floor((new Date() - new Date(createdAt)) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Returns the appropriate badge variant based on invitation status
 * @param {string} status - The invitation status
 * @returns {string} - Bootstrap badge variant
 */
const getStatusBadgeVariant = (status) => {
  const badgeMap = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'danger',
  };
  return badgeMap[status] || 'secondary';
};

/**
 * StatusFilterTabs component for filtering invitations by status
 */
const StatusFilterTabs = ({ statusFilter, setStatusFilter, statusCounts }) => (
  <div className="col-lg-8 col-12">
    <ul className="nav nav-pills" role="tablist">
      {STATUS_FILTER_OPTIONS.map((status) => (
        <li key={status} className="nav-item d-flex align-items-center ms-lg-3 ms-0" role="presentation">
          <button
            className={`nav-link rounded-0 ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
            type="button"
            aria-label={`Filter by ${status} invitations`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}{' '}
            <span className="badge-count p-1 rounded-2">
              {statusCounts[status]}
            </span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

/**
 * SearchInput component for filtering invitations by keyword
 */
const SearchInput = ({ searchKeyword, onSearchChange }) => (
  <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-lg-0 my-3 pe-lg-0">
    <div className="input-group p-2">
      <span className="input-group-text pt-0 pb-0" id="basic-addon1">
        <img src={searchIcon} width={16} height={16} alt="Search" />
      </span>
      <input
        type="text"
        className="form-control p-0 font-12"
        id="floatingInputGroup1"
        placeholder="Search..."
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search job invitations"
      />
    </div>
  </div>
);

/**
 * Modal for confirming job invitation acceptance
 */
const AcceptConfirmationModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  invitation,
  isProcessing,
}) => (
  <Modal
    open={show}
    onClose={onClose}
    aria-labelledby="accept-modal-title"
    aria-describedby="accept-modal-description"
  >
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '90%', sm: 500 },
      bgcolor: 'background.paper',
      borderRadius: '12px',
      boxShadow: 24,
      p: 4,
    }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="h6" id="accept-modal-title">
          Confirm Job Acceptance
        </Typography>
        <IconButton 
          onClick={onClose} 
          size="small"
          aria-label="Close accept modal"
        >
          <MdClose />
        </IconButton>
      </div>
      
      {invitation && (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to accept this job invitation?
          </Typography>
          
          <div className="confirmation-details p-3 mb-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Job Title:</strong> {invitation.buyer_request?.title || 'N/A'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Client:</strong> {invitation.client?.fname} {invitation.client?.lname}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Price:</strong> ${invitation.buyer_request?.price?.toLocaleString() || 'N/A'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Due Date:</strong> {invitation.buyer_request?.date 
                ? format(new Date(invitation.buyer_request.date), 'MMM dd, yyyy')
                : 'N/A'}
            </Typography>
          </div>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            By accepting, you're committing to complete this job according to the client's requirements.
          </Typography>
        </>
      )}
      
      <div className="d-flex justify-content-end gap-2">
        <MuiButton
          variant="outlined"
          onClick={onClose}
          disabled={isProcessing}
          aria-label="Cancel acceptance"
        >
          Cancel
        </MuiButton>
        <MuiButton
          variant="contained"
          color="success"
          onClick={onConfirm}
          disabled={isProcessing}
          aria-label="Confirm acceptance"
        >
          {isProcessing ? (
            <>
              <Spinner size="sm" className="me-2" />
              Accepting...
            </>
          ) : (
            'Confirm Acceptance'
          )}
        </MuiButton>
      </div>
    </Box>
  </Modal>
);

/**
 * InvitationCard component to display individual job invitation
 */
const InvitationCard = ({ 
  invitation, 
  onAccept, 
  onReject, 
  onStartChat, 
  onViewDetails,
  isProcessing,
}) => {
  const clientName = `${invitation?.client?.fname || ''} ${invitation?.client?.lname || ''}`;
  const bdName = `${invitation?.bd?.fname || ''} ${invitation?.bd?.lname || ''}`;
  const jobTitle = invitation?.buyer_request?.title || 'Untitled Job';
  const jobDescription = invitation?.buyer_request?.description || 'No description provided';
  const jobPrice = invitation?.buyer_request?.price?.toLocaleString() || 'N/A';
  const dueDate = invitation?.buyer_request?.date 
    ? format(new Date(invitation.buyer_request.date), 'MMM dd')
    : 'N/A';

  return (
    <div className="invitation-card p-3 mt-2">
      <div className="d-flex flex-wrap">
        <img
          src={invitation?.client?.image || defaultAvatar}
          width={60}
          height={60}
          className="rounded-circle flex-shrink-0"
          alt={clientName}
          onError={(e) => {
            e.target.src = defaultAvatar;
          }}
        />
        <div className="ms-3 flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="invitation-title fw-semibold mb-1">
                {jobTitle}
              </h5>
              <p className="invitation-description text-muted mb-1">
                {jobDescription}
              </p>
              <div className="invitation-meta">
                <small className="d-block mb-1">
                  <strong>Client:</strong> {clientName}
                </small>
                <small className="d-block mb-1">
                  <strong>Invited By:</strong> {bdName}
                </small>
                <small className="text-muted">
                  {format(new Date(invitation?.created_at), 'MMM dd, yyyy')}
                </small>
              </div>
            </div>
            <div className="ms-3">
              <Badge bg={getStatusBadgeVariant(invitation.status)}>
                {invitation.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-between mt-3 flex-wrap align-items-center">
        <div className="d-flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline-primary"
            className="poppins px-4 fw-normal font-16 w-auto"
            onClick={() => onViewDetails(invitation)}
          >
            <FaEye className="me-1" />
            View Details
          </Button>
          
          <Button
            size="sm"
            variant="outline-secondary"
            className="poppins px-4 fw-normal font-16 w-auto"
            onClick={() => onStartChat(invitation.client, invitation)}
          >
            <FaRegEnvelope className="me-1" />
            Chat
          </Button>
          
          {invitation.status === 'pending' && (
            <>

 <Button
  size="sm"
  variant="success"
  className="poppins px-4 fw-normal font-16 w-auto"
  onClick={() => onAccept(invitation)}  // Passing the whole invitation object
  disabled={isProcessing}
>
  {isProcessing ? (
    <Spinner size="sm" animation="border" />
  ) : (
    <>
      <FaCheck className="me-1" />
      Accept
    </>
  )}
</Button>
              
              <Button
                size="sm"
                variant="danger"
                className="poppins px-4 fw-normal font-16 w-auto"
                onClick={() => onReject(invitation.id)}
                disabled={isProcessing}
              >
                <FaTimes className="me-1" />
                Reject
              </Button>
            </>
          )}
        </div>
        
        <div className="invitation-details d-flex flex-wrap gap-2 mt-2 mt-lg-0">
          <span className="detail-badge">
            <FaDollarSign className="me-1" />
            ${jobPrice}
          </span>
          <span className="detail-badge">
            <FaCalendarAlt className="me-1" />
            Due: {dueDate}
          </span>
          <span className="detail-badge">
            {calculateDuration(invitation?.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal for rejecting a job invitation with reason
 */
const RejectModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  rejectReason, 
  setRejectReason, 
  isProcessing,
}) => (
  <Modal
    open={show}
    onClose={onClose}
    aria-labelledby="reject-modal-title"
    aria-describedby="reject-modal-description"
  >
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '90%', sm: 400 },
      bgcolor: 'background.paper',
      borderRadius: '12px',
      boxShadow: 24,
      p: 4,
    }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="h6" id="reject-modal-title">
          Reject Job Invitation
        </Typography>
        <IconButton 
          onClick={onClose} 
          size="small"
          aria-label="Close reject modal"
        >
          <MdClose />
        </IconButton>
      </div>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} id="reject-modal-description">
        Please provide a reason for rejecting this invitation.
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Reason for Rejection"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        placeholder="e.g., Budget doesn't match my rates, Timeline is too tight..."
        variant="outlined"
        sx={{ mb: 3 }}
        aria-label="Reason for rejection"
      />
      
      <div className="d-flex justify-content-end gap-2">
        <MuiButton
          variant="outlined"
          onClick={onClose}
          disabled={isProcessing}
          aria-label="Cancel rejection"
        >
          Cancel
        </MuiButton>
        <MuiButton
          variant="contained"
          color="error"
          onClick={onSubmit}
          disabled={!rejectReason.trim() || isProcessing}
          aria-label="Submit rejection"
        >
          {isProcessing ? (
            <>
              <Spinner size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            'Submit Rejection'
          )}
        </MuiButton>
      </div>
    </Box>
  </Modal>
);

/**
 * Modal for displaying detailed invitation information
 */
const InvitationDetailsModal = ({ 
  invitation, 
  show, 
  onClose,
}) => {
  if (!invitation) return null;

  const clientName = `${invitation.client?.fname || ''} ${invitation.client?.lname || ''}`;
  const bdName = `${invitation.bd?.fname || ''} ${invitation.bd?.lname || ''}`;
  const jobTitle = invitation.buyer_request?.title || 'N/A';
  const jobDescription = invitation.buyer_request?.description || 'N/A';
  const jobPrice = invitation.buyer_request?.price?.toLocaleString() || 'N/A';
  const dueDate = invitation.buyer_request?.date 
    ? format(new Date(invitation.buyer_request.date), 'MMM dd, yyyy')
    : 'N/A';

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="invitation-details-modal"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', md: '60%' },
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
      }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Typography variant="h5" component="h2">
            Job Invitation Details
          </Typography>
          <IconButton 
            onClick={onClose}
            aria-label="Close details modal"
          >
            <MdClose />
          </IconButton>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <Typography variant="h6" gutterBottom>
              Job Information
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Title:</strong> {jobTitle}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Description:</strong> {jobDescription}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Price:</strong> ${jobPrice}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Due Date:</strong> {dueDate}
            </Typography>
          </div>
          
          <div className="col-md-6">
            <Typography variant="h6" gutterBottom>
              Client Information
            </Typography>
            <div className="d-flex align-items-center mb-3">
              <img
                src={invitation.client?.image || defaultAvatar}
                width={60}
                height={60}
                className="rounded-circle me-3"
                alt={clientName}
                onError={(e) => e.target.src = defaultAvatar}
              />
              <div>
                <Typography variant="body1">
                  {clientName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Invited by: {bdName}
                </Typography>
              </div>
            </div>
            
            <Typography variant="body1" paragraph>
              <strong>Status:</strong> 
              <Badge bg={getStatusBadgeVariant(invitation.status)} className="ms-2">
                {invitation.status}
              </Badge>
            </Typography>
            
            <Typography variant="body1" paragraph>
              <strong>Invitation Date:</strong> {format(new Date(invitation.created_at), 'MMM dd, yyyy hh:mm a')}
            </Typography>
            
            {invitation.status === 'rejected' && invitation.rejectReason && (
              <Typography variant="body1" paragraph>
                <strong>Rejection Reason:</strong> {invitation.rejectReason}
              </Typography>
            )}
          </div>
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          <MuiButton 
            variant="contained" 
            onClick={onClose}
            aria-label="Close details"
          >
            Close
          </MuiButton>
        </div>
      </Box>
    </Modal>
  );
};

/**
 * Main JobInvitationsPage component
 */
const JobInvitationsPage = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const { 
    invitations = [], 
    isLoadingInvitations, 
    error,
  } = useSelector(state => state.jobInvitation);
  const { 
    creatingConversation, 
    error: conversationError,
  } = useSelector(state => state.message);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
const [selectedInvitationForAccept, setSelectedInvitationForAccept] = useState(null);

  // Local state
  const [processingInvitations, setProcessingInvitations] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedInvitationForDetails, setSelectedInvitationForDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Toast notification helper
  const showToast = useCallback((message, type = 'info') => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });
  }, []);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchKeyword);
      setCurrentPage(1);
    }, DEBOUNCE_DELAY);
    
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  // Fetch invitations on mount
  useEffect(() => {
    dispatch(fetchJobInvitations());
  }, [dispatch]);

  // Handle conversation errors
  useEffect(() => {
    if (conversationError) {
      showToast(conversationError, 'error');
      dispatch(clearConversationError());
    }
  }, [conversationError, dispatch, showToast]);

  // Filter and paginate invitations
  const { visibleData, totalPages } = useMemo(() => {
    let filtered = invitations;

    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter(({ buyer_request, client }) => {
        const title = buyer_request?.title?.toLowerCase() || '';
        const description = buyer_request?.description?.toLowerCase() || '';
        const clientName = `${client?.fname || ''} ${client?.lname || ''}`.toLowerCase();
        
        return title.includes(search) || 
               description.includes(search) || 
               clientName.includes(search);
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    
    return {
      visibleData: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [invitations, debouncedSearch, statusFilter, currentPage]);

  // Calculate status counts
  const statusCounts = useMemo(() => ({
    all: invitations.length,
    pending: invitations.filter(inv => inv.status === 'pending').length,
    accepted: invitations.filter(inv => inv.status === 'accepted').length,
    rejected: invitations.filter(inv => inv.status === 'rejected').length,
  }), [invitations]);


const handleAcceptClick = useCallback((invitation) => {
  setSelectedInvitationForAccept(invitation);
  setShowAcceptModal(true);
}, []);

const handleConfirmAccept = useCallback(async () => {
  if (!selectedInvitationForAccept?.id) return;
  
  const invitationId = selectedInvitationForAccept.id;
  if (processingInvitations.includes(invitationId)) return;
  
  setProcessingInvitations(prev => [...prev, invitationId]);
  
  try {
    const result = await dispatch(acceptJobInvitation(invitationId)).unwrap();
    dispatch(fetchJobInvitations());
    showToast(result?.message || 'Job invitation accepted successfully!', 'success');
    setShowAcceptModal(false);
    setSelectedInvitationForAccept(null);
  } catch (error) {
    console.error('Error accepting invitation:', error);
    showToast(error?.message || 'Failed to accept invitation. Please try again.', 'error');
  } finally {
    setProcessingInvitations(prev => prev.filter(id => id !== invitationId));
  }
}, [dispatch, processingInvitations, selectedInvitationForAccept, showToast]);
  // Handle accepting an invitation
  const handleAccept = useCallback(async (invitationId) => {
    if (processingInvitations.includes(invitationId)) return;
    
    setProcessingInvitations(prev => [...prev, invitationId]);
    
    try {
      const result = await dispatch(acceptJobInvitation(invitationId));
      dispatch(fetchJobInvitations());
      showToast(result?.message || 'Job invitation accepted successfully!', 'success');
    } catch (error) {
      console.error('Error accepting invitation:', error);
      showToast(error?.message || 'Failed to accept invitation. Please try again.', 'error');
    } finally {
      setProcessingInvitations(prev => prev.filter(id => id !== invitationId));
    }
  }, [dispatch, processingInvitations, showToast]);

  // Handle rejecting an invitation
  const handleReject = useCallback(async () => {
    if (!selectedInvitationId || !rejectReason.trim()) {
      showToast('Please provide a reason for rejection', 'error');
      return;
    }
    
    setProcessingInvitations(prev => [...prev, selectedInvitationId]);
    
    try {
      const result = await dispatch(rejectJobInvitation({ 
        invitationId: selectedInvitationId, 
        reason: rejectReason.trim(),
      })).unwrap();
      
      showToast(result?.message || 'Job invitation rejected successfully!', 'success');
      setRejectReason('');
      setSelectedInvitationId(null);
      setShowRejectModal(false);
      dispatch(fetchJobInvitations());
    } catch (error) {
      showToast(error?.message || 'Failed to reject invitation', 'error');
    } finally {
      setProcessingInvitations(prev => prev.filter(id => id !== selectedInvitationId));
    }
  }, [dispatch, selectedInvitationId, rejectReason, showToast]);

  // Open reject modal
  const openRejectModal = useCallback((id) => {
    setSelectedInvitationId(id);
    setShowRejectModal(true);
  }, []);

  // Close reject modal
  const closeRejectModal = useCallback(() => {
    setShowRejectModal(false);
    setRejectReason('');
    setSelectedInvitationId(null);
  }, []);

  // Start chat with client
  const handleStartChat = useCallback(async (client, invitation) => {
    if (!client?.id || !invitation?.id) return;
    
    setSelectedClient(client);
    dispatch(clearConversationError());
    
    try {
      const response = await dispatch(createOrFindConversation({
        participantId: client.id,
        jobInvitationId: invitation.id,
        initialMessage: `Hi! I'd like to discuss your job invitation for "${invitation.buyer_request?.title || 'this project'}"`,
      })).unwrap();

      dispatch(setSelectedConversation(response));
      setShowChatModal(true);
      showToast('Chat started successfully!', 'success');
    } catch (error) {
      console.error('Error starting chat:', error);
      showToast('Failed to start conversation. Please try again.', 'error');
    }
  }, [dispatch, showToast]);

  // View invitation details
  const handleViewDetails = useCallback((invitation) => {
    setSelectedInvitationForDetails(invitation);
    setShowDetailsModal(true);
  }, []);

  // Close details modal
  const closeDetailsModal = useCallback(() => {
    setShowDetailsModal(false);
    setSelectedInvitationForDetails(null);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    setSearchKeyword(value);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((_, value) => {
    setCurrentPage(value);
  }, []);

  // Loading state
  if (isLoadingInvitations && !invitations.length) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="success">
          <Alert.Heading>No Invites Yet? Dont't Worry, Good Things Take Time! </Alert.Heading>
         
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Navbar FirstNav="none" />
      
      <main className="container-fluid pt-5 mb-5 userByerMain">
        <h1 className="byerLine font-20 font-500 cocon blackcolor ms-lg-4">
          Job Invitations
        </h1>
        <div className="main-content-card rounded-3 p-4">
          <div className="row mb-4">
            <StatusFilterTabs 
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusCounts={statusCounts}
            />
            <SearchInput 
              searchKeyword={searchKeyword}
              onSearchChange={handleSearchChange}
            />
          </div>

          <hr className="section-divider" />

          <section className="invitations-container" aria-live="polite">
            {visibleData.length === 0 ? (
              <div className="text-center py-5">
                <Typography variant="h6" color="text.secondary">
                  No invitations found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {debouncedSearch ? 'Try adjusting your search terms' : 'You don\'t have any job invitations yet'}
                </Typography>
              </div>
            ) : (
              visibleData.map((invitation) => (
               <InvitationCard
  key={invitation.id}
  invitation={invitation}
  onAccept={handleAcceptClick}  // Changed from handleAccept to handleAcceptClick
  onReject={openRejectModal}
  onStartChat={handleStartChat}
  onViewDetails={handleViewDetails}
  isProcessing={processingInvitations.includes(invitation.id)}
/>
              ))
            )}
          </section>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  shape="rounded"
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  aria-label="Invitations pagination"
                />
              </Stack>
            </div>
          )}
        </div>
      </main>

      {/* Reject Modal */}
      <RejectModal
        show={showRejectModal}
        onClose={closeRejectModal}
        onSubmit={handleReject}
        rejectReason={rejectReason}
        setRejectReason={setRejectReason}
        isProcessing={processingInvitations.includes(selectedInvitationId)}
      />

      {/* Details Modal */}
      <InvitationDetailsModal
        invitation={selectedInvitationForDetails}
        show={showDetailsModal}
        onClose={closeDetailsModal}
      />

      {/* Chat Offcanvas */}
      <Offcanvas 
        show={showChatModal} 
        onHide={() => setShowChatModal(false)}
        placement="end"
        className="chat-offcanvas"
        aria-labelledby="chat-offcanvas-title"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="chat-offcanvas-title">
            Chat with {selectedClient?.fname} {selectedClient?.lname}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 d-flex flex-column">
          <div className="flex-grow-1">
            <Chating />
          </div>
        </Offcanvas.Body>
      </Offcanvas>

{/* Accept Confirmation Modal */}
<AcceptConfirmationModal
  show={showAcceptModal}
  onClose={() => {
    setShowAcceptModal(false);
    setSelectedInvitationForAccept(null);
  }}
  onConfirm={handleConfirmAccept}
  invitation={selectedInvitationForAccept}
  isProcessing={processingInvitations.includes(selectedInvitationForAccept?.id)}
/>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Styles */}
      <style jsx>{`
        .userByerMain {
          background-color: #f8f9fa;
          min-height: calc(100vh - 56px);
        }
        
        .main-content-card {
          background: white;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid #e9ecef;
        }
        
        .nav-pills .nav-link {
          color: #6c757d;
          font-weight: 500;
          padding: 12px 20px;
          border-bottom: 3px solid transparent;
          background: none;
          border-radius: 0;
        }
        
        .nav-pills .nav-link.active {
          background-color: transparent;
          color: #F16336;
          border-bottom-color: #F16336;
        }
        
        .nav-pills .nav-link:hover:not(.active) {
          color: #F16336;
          background-color: rgba(241, 99, 54, 0.1);
        }
        
        .badge-count {
          background-color: #F16336;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: 8px;
          min-width: 20px;
          text-align: center;
        }
        
        .section-divider {
          opacity: 1;
          height: 1px;
          background-color: #e9ecef;
          border: none;
          margin: 2rem 0;
        }
        
        .invitation-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }
        
        .invitation-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          transform: translateY(-2px);
          border-color: #F16336;
        }
        
        .invitation-title {
          color: #2c3e50;
          font-size: 1.125rem;
          line-height: 1.4;
        }
        
        .invitation-description {
          font-size: 0.95rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .invitation-meta small {
          font-size: 0.85rem;
          color: #6c757d;
        }
        
        .detail-badge {
          background-color: #f8f9fa;
          color: #F16336 !important;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }
        
        .chat-offcanvas {
          width: 450px !important;
        }
        
        @media (max-width: 768px) {
          .chat-offcanvas {
            width: 100% !important;
          }
          
          .main-content-card {
            margin: 0 1rem;
          }
          
          .nav-pills .nav-link {
            padding: 8px 12px;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  );
};

export default JobInvitationsPage;