import {
  Box,


  Pagination,
  Stack
} from "@mui/material";
import Navbar from "../../components/Navbar";

import {
  Badge,
  Button,
  Modal,
  Offcanvas,
  Spinner
} from "react-bootstrap";
import {
  FaRegEnvelope
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptJobInvitation,
  fetchJobInvitations,
  rejectJobInvitation
} from "../../redux/slices/jobInvitationSlice";

import Chating from '../../components/frelancerChat/Chat/Chating';

import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaDollarSign,
  FaEye,
  FaTimes
} from "react-icons/fa";

import {
  clearConversationError,
  createOrFindConversation,
  setSelectedConversation
} from "../../redux/slices/messageSlice";

const JobInvitationsPage = () => {
  const dispatch = useDispatch();

  // Redux state
  const { invitations, isLoadingInvitations, error } = useSelector(state => state.jobInvitation);
  const { creatingConversation, error: conversationError } = useSelector(state => state.message);

  // Local state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
const [processingInvitations, setProcessingInvitations] = useState(new Set());
// Optional if you want to show loading spinner
const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 4;

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchKeyword);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  // Fetch job invitations
  useEffect(() => {
    dispatch(fetchJobInvitations());
  }, [dispatch]);

  // Helpers
  const calculateDuration = useCallback((createdAt) => {
    const diffInSeconds = Math.floor((new Date() - new Date(createdAt)) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;

    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  }, []);

  const getStatusBadge = (status) => {
    const badgeMap = {
      pending: "warning",
      accepted: "success",
      rejected: "danger"
    };
    return <Badge bg={badgeMap[status] || "secondary"}>{status}</Badge>;
  };

  const filteredInvitations = useMemo(() => {
    let filtered = invitations;

    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter(({ buyer_request, client }) =>
        buyer_request.title.toLowerCase().includes(search) ||
        buyer_request.description.toLowerCase().includes(search) ||
        `${client.fname} ${client.lname}`.toLowerCase().includes(search)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(inv => inv.status === statusFilter);
    }

    return filtered;
  }, [invitations, debouncedSearch, statusFilter]);

  const paginationData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return {
      visibleData: filteredInvitations.slice(start, end),
      totalPages: Math.ceil(filteredInvitations.length / itemsPerPage)
    };
  }, [filteredInvitations, currentPage]);

  const statusCounts = useMemo(() => ({
    all: invitations.length,
    pending: invitations.filter(inv => inv.status === "pending").length,
    accepted: invitations.filter(inv => inv.status === "accepted").length,
    rejected: invitations.filter(inv => inv.status === "rejected").length
  }), [invitations]);

  // Event Handlers
  const handleAccept = (id) => dispatch(acceptJobInvitation(id));

  const openRejectModal = (id) => {
    setSelectedInvitationId(id);
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (selectedInvitationId) {
      dispatch(rejectJobInvitation({ invitationId: selectedInvitationId, reason: rejectReason }));
      closeRejectModal();
    }
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedInvitationId(null);
  };

  const handleStartChat = async (client, invitation) => {
    setSelectedClient(client);
    dispatch(clearConversationError());
    try {
      const response = await dispatch(createOrFindConversation({
        participantId: client.id,
        jobInvitationId: invitation.id,
        initialMessage: `Hi! I'd like to discuss your job invitation for "${invitation.buyer_request.title}"`
      })).unwrap();

      dispatch(setSelectedConversation(response));
      setShowChatModal(true);
    } catch (error) {
      console.error("Error starting chat:", error);
      alert("Failed to start conversation. Please try again.");
    }
  };

  const closeChatModal = () => {
    setShowChatModal(false);
    setSelectedClient(null);
  };

  const handleSearchChange = useCallback((value) => {
    setSearchKeyword(value);
  }, []);

  const handlePageChange = useCallback((_, value) => {
    setCurrentPage(value);
  }, []);


  // Placeholder Navbar


    if (isLoadingInvitations) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid pt-5 mb-5 userByerMain">
        <h4 className="byerLine font-20 font-500 cocon blackcolor ms-lg-4">
          Job Invitations
        </h4>
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0 allgigs-field poppins Revie rounded-3 p-3 pt-3">
          <div className="col-lg-8 col-12">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item d-flex align-items-center" role="presentation">
                <button
                  className={`nav-link rounded-0 ${statusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                  type="button"
                >
                  All{" "}
                  <span className="p-1 rounded-2 font-12 font-500 poppins">
                    {statusCounts.all}
                  </span>
                </button>
              </li>
              <li className="nav-item d-flex align-items-center ms-l-5" role="presentation">
                <button
                  className={`nav-link rounded-0 ${statusFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('pending')}
                  type="button"
                >
                  Pending{" "}
                  <span className="p-1 rounded-2 font-12 font-500 poppins">
                    {statusCounts.pending}
                  </span>
                </button>
              </li>
              <li className="nav-item d-flex align-items-center ms-l-5" role="presentation">
                <button
                  className={`nav-link rounded-0 ${statusFilter === 'accepted' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('accepted')}
                  type="button"
                >
                  Accepted{" "}
                  <span className="p-1 rounded-2 font-12 font-500 poppins">
                    {statusCounts.accepted}
                  </span>
                </button>
              </li>
              <li className="nav-item d-flex align-items-center ms-l-5" role="presentation">
                <button
                  className={`nav-link rounded-0 ${statusFilter === 'rejected' ? 'active' : ''}`}
                  onClick={() => setStatusFilter('rejected')}
                  type="button"
                >
                  Rejected{" "}
                  <span className="p-1 rounded-2 font-12 font-500 poppins">
                    {statusCounts.rejected}
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-lg-0 my-3 pe-lg-0">
            <div className="input-group p-2">
              <span className="input-group-text pt-0 pb-0" id="basic-addon1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </span>
              <input
                type="text"
                className="form-control p-0 font-12"
                placeholder="Search invitations..."
                value={searchKeyword}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <hr
                style={{
                  opacity: "1",
                  height: "8px",
                  backgroundColor: "#F5F5FF",
                  border: "none",
                }}
              />
              <div className="col-12">
                {isLoading ? (
                  <div className="d-flex justify-content-center p-4">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  paginationData.visibleData.map((invitation, index) => (
                    <div className="p-3 cardrating mt-2" key={invitation.id || index}>
                      <div className="d-flex flex-wrap">
                        <img
                          src={invitation?.client?.image}
                          width={60}
                          height={60}
                          className="rounded-circle flex-shrink-0"
                          alt="client"
                        />
                        <div className="ms-2 flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <p className="font-18 poppins fw-semibold mb-0">
                                {invitation?.buyer_request?.title}
                              </p>
                              <p className="font-16 poppins takegraycolor mb-0">
                                {invitation?.buyer_request?.description}
                              </p>
                              <p className="mb-0 font-14 poppins">
                                Client: {invitation?.client?.fname} {invitation?.client?.lname}
                              </p>
                              <p className="mb-0 font-14 poppins">
                                Invited By: {invitation?.bd?.fname} {invitation?.bd?.lname}
                              </p>
                              <p className="mb-0 font-14 poppins text-muted">
                                {format(new Date(invitation?.created_at), "MMM dd, yyyy")}
                              </p>
                            </div>
                            <div className="ms-3">
                              {getStatusBadge(invitation.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-3 flex-wrap align-items-center">
                        <div className="d-flex gap-2 flex-wrap">
                          <Button
                            className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                            onClick={() => console.log('View details:', invitation.id)}
                          >
                            <FaEye className="me-2" />
                            View Details
                          </Button>
                          <Button
                            className="btn-stepper poppins px-4 fw-normal font-16 w-auto"
                            onClick={() => handleStartChat(invitation.client, invitation)}
                          >
                            <FaRegEnvelope className="me-2" />
                            Chat
                          </Button>
                          {invitation.status === "pending" && (
                            <>
                              <Button
                                className="btn btn-success poppins px-4 fw-normal font-16 w-auto"
                                onClick={() => handleAccept(invitation.id)}
                                disabled={processingInvitations.has(invitation.id)}
                              >
                                {processingInvitations.has(invitation.id) ? (
                                  <Spinner size="sm" color="light" />
                                ) : (
                                  <>
                                    <FaCheck className="me-2" />
                                    Accept
                                  </>
                                )}
                              </Button>
                              <Button
                                className="btn btn-outline-danger poppins px-4 fw-normal font-16 w-auto"
                                onClick={() => openRejectModal(invitation.id)}
                                disabled={processingInvitations.has(invitation.id)}
                              >
                                <FaTimes className="me-2" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                        <div className="userByer d-inline-flex mt-lg-0 mt-2 flex-wrap">
                          <span className="rounded-3">
                            <FaDollarSign />
                            Budget ${invitation?.buyer_request?.price?.toLocaleString()}
                          </span>
                          <span className="rounded-3">
                            <FaCalendarAlt className="me-1" />
                            Due: {format(new Date(invitation?.buyer_request?.date), "MMM dd")}
                          </span>
                          <span className="rounded-3">
                            {calculateDuration(invitation?.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                <Stack spacing={4}>
                  <Pagination
                    count={paginationData.totalPages}
                    shape="rounded"
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        aria-labelledby="reject-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
        }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 id="reject-modal-title">Reject Job Invitation</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowRejectModal(false)}
            />
          </div>
          <p className="text-muted mb-3">
            Please provide a reason for rejecting this invitation.
          </p>
          <div className="mb-3">
            <label className="form-label">Reason for Rejection</label>
            <textarea
              className="form-control"
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Budget doesn't match my rates, Timeline is too tight..."
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button
              className="btn btn-secondary"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-danger"
              onClick={handleReject}
              disabled={processingInvitations.has(selectedInvitationId)}
            >
              {processingInvitations.has(selectedInvitationId) ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                'Submit Rejection'
              )}
            </Button>
          </div>
        </Box>
      </Modal>


        {/* Chat Offcanvas */}
        <Offcanvas 
          show={showChatModal} 
          onHide={closeChatModal}
          placement="end"
          style={{ width: '450px' }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Chat with {selectedClient?.fname} {selectedClient?.lname}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0 d-flex flex-column">
            {/* Render your Chating component */}
            <div className="flex-grow-1">
              <Chating />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      <style jsx>{`
        .userByerMain {
          background-color: #f8f9fa;
        }
        
        .byerLine {
          color: #333;
          font-weight: 500;
        }
        
        .allgigs-field {
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-pills .nav-link {
          color: #666;
          font-weight: 500;
          padding: 12px 20px;
          border-bottom: 3px solid transparent;
        }
        
        .nav-pills .nav-link.active {
          background-color: transparent;
          color: #6c5ce7;
          border-bottom-color: #6c5ce7;
        }
        
        .nav-pills .nav-link span {
          background-color: #6c5ce7;
          color: white;
          margin-left: 8px;
        }
        
        .cardrating {
          background: white;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }
        
        .cardrating:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }
        
        .userByer span {
          background-color: #f5f5ff;
          color: #6c5ce7;
          padding: 6px 12px;
          margin-right: 8px;
          margin-bottom: 4px;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
        }
        
        .btn-stepper {
          background-color: #6c5ce7;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        
        .btn-stepper:hover {
          background-color: #5a4fcf;
          transform: translateY(-1px);
        }
        
        .takegraycolor {
          color: #666;
        }
        
        .font-12 { font-size: 12px; }
        .font-14 { font-size: 14px; }
        .font-16 { font-size: 16px; }
        .font-18 { font-size: 18px; }
        .font-20 { font-size: 20px; }
        
        .font-500 { font-weight: 500; }
        
        .poppins { font-family: 'Poppins', sans-serif; }
        .cocon { font-family: 'Coconut', sans-serif; }
        
        .blackcolor { color: #333; }
        
        .badge {
          padding: 6px 12px;
          font-size: 12px;
          border-radius: 20px;
        }
        
        .ms-l-5 { margin-left: 2rem; }
      `}</style>
    </>
  );
};

export default JobInvitationsPage;