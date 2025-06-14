import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the message has been displayed before
    const hasDisplayedMessage = localStorage.getItem('hasDisplayedMessage');
    setShowModal(true);
    // If not, show the modal and mark the message as displayed
    
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>GrapeTask is Now Live!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        
Our platform has officially launched! Explore all features, and let us know your feedback. We’re committed to continuously improving your experience.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;
