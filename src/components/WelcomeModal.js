<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
=======
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
>>>>>>> d918fe2 (cahnges by abdul qavi)

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the message has been displayed before
<<<<<<< HEAD
    const hasDisplayedMessage = localStorage.getItem("hasDisplayedMessage");
    setShowModal(true);
    // If not, show the modal and mark the message as displayed
=======
    const hasDisplayedMessage = localStorage.getItem('hasDisplayedMessage');
    setShowModal(true);
    // If not, show the modal and mark the message as displayed
    
>>>>>>> d918fe2 (cahnges by abdul qavi)
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
<<<<<<< HEAD
        <Modal.Title>
          Welcome to GrapeTask! Website Under Development 🚀
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We’re working hard behind the scenes to bring you an amazing
          experience! Our team is diligently developing and refining the website
          to ensure everything runs smoothly. You may encounter some incomplete
          features or occasional glitches, but rest assured, we’re on it! Stay
          tuned for updates, and don’t forget to subscribe to our newsletter to
          be the first to know when we launch. Thank you for your patience and
          support! 🙌
          <br />
          <a onClick={() => handleClose()} href="#subscribe">
            Subscribe Now
          </a>
=======
        <Modal.Title>Welcome to GrapeTask!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please bear with us as the website is currently under development. Our
          team of developers is diligently working on it. You may encounter
          errors while using the system or find that some functions appear
          incomplete. We appreciate your patience and understanding. Please subscribe to our newsletter to stay informed.
          <br/><a onClick={()=>handleClose()} href="#subscribe">Subscribe Now</a>
>>>>>>> d918fe2 (cahnges by abdul qavi)
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomeModal;
