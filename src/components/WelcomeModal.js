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
        <Modal.Title>Welcome to GrapeTask!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please bear with us as the website is currently under development. Our
          team of developers is diligently working on it. You may encounter
          errors while using the system or find that some functions appear
          incomplete. We appreciate your patience and understanding. Please subscribe to our newsletter to stay informed.
          <br/><a onClick={()=>handleClose()} href="#subscribe">Subscribe Now</a>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;
