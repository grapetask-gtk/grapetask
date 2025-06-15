import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Offcanvas,
  Spinner
} from "react-bootstrap";
import {
  FaRegEnvelope
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptJobInvitation,
  fetchJobInvitations,
  rejectJobInvitation
} from "../../redux/slices/jobInvitationSlice";

import Chating from '../../components/frelancerChat/Chat/Chating';
import {
  clearConversationError,
  createOrFindConversation,
  setSelectedConversation
} from "../../redux/slices/messageSlice";

import Navbar from "../../components/Navbar";

const JobInvitationsPage = () => {
  const dispatch = useDispatch();

  // Job invitation state
  const { invitations, isLoadingInvitations, error } = useSelector(
    (state) => state.jobInvitation
  );

  // Message state
  const { creatingConversation, error: conversationError } = useSelector(
    (state) => state.message
  );

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);
  
  // Chat modal/offcanvas state
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    dispatch(fetchJobInvitations());
  }, [dispatch]);

  const handleAccept = (invitationId) => {
    dispatch(acceptJobInvitation(invitationId));
  };

  const openRejectModal = (invitationId) => {
    setSelectedInvitationId(invitationId);
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (selectedInvitationId) {
      dispatch(rejectJobInvitation({ 
        invitationId: selectedInvitationId, 
        reason: rejectReason 
      }));
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedInvitationId(null);
    }
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectReason("");
    setSelectedInvitationId(null);
  };

  // Handle chat opening
  const handleStartChat = async (client, invitation) => {
    setSelectedClient(client);
    
    // Clear any previous errors
    dispatch(clearConversationError());
    
    try {
      // Create or find existing conversation with this client
      // console.log('strated to find conversation for client id:',client.id);
      const response = await dispatch(createOrFindConversation({
        participantId: client.id,
        jobInvitationId: invitation.id, // Link to job context
        initialMessage: `Hi! I'd like to discuss your job invitation for "${invitation.buyer_request.title}"`
      })).unwrap();
      // console.log('got response back in job invitaion page:',response);
        //  console.log('slecting conv in job invitation page:',response);
        dispatch(setSelectedConversation(response));
        
      // Show chat modal after conversation is ready
      setShowChatModal(true);
    } catch (error) {
      console.error('Error creating conversation:', error);
      // You might want to show an error toast here
      alert('Failed to start conversation. Please try again.');
    }
  };

  const closeChatModal = () => {
    setShowChatModal(false);
    setSelectedClient(null);
    // Optionally clear selected conversation
    // dispatch(setSelectedConversation(null));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "accepted":
        return <Badge bg="success">Accepted</Badge>;
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (isLoadingInvitations) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container my-4">
        <h1 className="mb-4">Job Invitations</h1>
        
        {/* Show conversation error if any */}
        {conversationError && (
          <Alert variant="danger" dismissible onClose={() => dispatch(clearConversationError())}>
            Failed to start conversation: {conversationError}
          </Alert>
        )}
        
        {invitations.length === 0 ? (
          <div className="alert alert-info">
            You don't have any job invitations yet.
          </div>
        ) : (
          <div className="row">
            {invitations?.map((invitation) => (
              <div className="col-md-6 mb-4" key={invitation.id}>
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{invitation.buyer_request.title}</h5>
                    {getStatusBadge(invitation.status)}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <strong>Client:</strong> {invitation.client.fname} {invitation.client.lname}
                    </Card.Title>
                    <Card.Text>
                      <strong>Budget:</strong> ${invitation.buyer_request.price}
                      <br />
                      <strong>Invited:</strong> {format(new Date(invitation.created_at), "MMM dd, yyyy")}
                      <br />
                      <strong>Deadline:</strong> {format(new Date(invitation.buyer_request.date), "MMM dd, yyyy")}
                    </Card.Text>
                    
                    <div className="description-preview mb-3">
                      {invitation.buyer_request.description.length > 150
                        ? `${invitation.buyer_request.description.substring(0, 150)}...`
                        : invitation.buyer_request.description}
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <Link to={`/job-invitations/${invitation.id}`} className="btn btn-outline-primary">
                        View Details
                      </Link>
                      
                      {/* Chat button */}
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleStartChat(invitation.client, invitation)}
                        disabled={creatingConversation}
                        className="d-flex align-items-center"
                      >
                        {creatingConversation ? (
                          <>
                            <Spinner size="sm" className="me-2" />
                            Starting...
                          </>
                        ) : (
                          <>
                            <FaRegEnvelope className="me-2" />
                            Chat
                          </>
                        )}
                      </Button>
                      
                      {invitation.status === "pending" && (
                        <div className="action-buttons d-flex gap-2">
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => handleAccept(invitation.id)}
                          >
                            Accept
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => openRejectModal(invitation.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Job ID: {invitation.buyer_request.id}
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Reject Modal */}
        <Modal show={showRejectModal} onHide={closeRejectModal}>
          <Modal.Header closeButton>
            <Modal.Title>Reject Job Invitation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Reason for Rejection (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejecting this invitation..."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeRejectModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleReject}>
              Submit
            </Button>
          </Modal.Footer>
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
      </div>
    </>
  );
};

export default JobInvitationsPage;