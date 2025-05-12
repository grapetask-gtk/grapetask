import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Modal,
  Spinner
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptJobInvitation,
  fetchJobInvitations,
  rejectJobInvitation
} from "../../redux/slices/jobInvitationSlice";

import Navbar from "../../components/Navbar";
const JobInvitationsPage = () => {
  const dispatch = useDispatch();

  // ↓ pull in loading & error flags along with invitations
  const { invitations, isLoadingInvitations, error } = useSelector(
    (state) => state.jobInvitation
  );

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedInvitationId, setSelectedInvitationId] = useState(null);

  useEffect(() => {
    dispatch(fetchJobInvitations());
  }, [dispatch]);

  // ... rest of your handlers & JSX unchanged


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
            <>  <Navbar FirstNav="none" />
    <div className="container my-4">
      <h1 className="mb-4">Job Invitations</h1>
      
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
                  <strong>Client</strong>{invitation.client.fname}  {invitation.client.lname}
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
                      ? `${invitation.job.description.substring(0, 150)}...`
                      : invitation.buyer_request.description}
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <Link to={`/job-invitations/${invitation.id}`} className="btn btn-outline-primary">
                      View Details
                    </Link>
                    
                    {invitation.status === "pending" && (
                      <div className="action-buttons">
                        <Button 
                          variant="success" 
                          className="me-2" 
                          onClick={() => handleAccept(invitation.id)}
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={() => openRejectModal(invitation.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  {/* Skills: {invitation.job.skills.join(", ")} */}
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
    </div>
    </>
  );
};

export default JobInvitationsPage;