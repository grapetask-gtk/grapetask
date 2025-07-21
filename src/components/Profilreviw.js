import { Box, Button, CircularProgress, Modal } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Chating from '../components/frelancerChat/Chat/Chating';
import { AllBdOrders } from "../redux/slices/allOrderSlice";
import {
  clearConversationError,
  createOrFindConversation,
  setSelectedConversation
} from "../redux/slices/messageSlice";
import { inviteToJob } from '../redux/slices/offersSlice';

const ProfileReview = ({ expertDetail }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Toast notification function
  const showToast = (message, type = 'info') => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Redux selectors
  const { isAssigning } = useSelector((state) => state.offers);
  const bdOrders = useSelector(state => state.allOrder?.bdOrders || []);
  const isLoadingBdOrders = useSelector(state => state.allOrder?.isLoading ?? true);
  const { creatingConversation } = useSelector((state) => state.message);

  // State management
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignmentFormData, setAssignmentFormData] = useState({
    bdOrderId: '',
    assignmentNotes: ''
  });

  const sellerId = expertDetail?.id;

  // Load BD orders for assignment modal
  useEffect(() => {
    dispatch(AllBdOrders());
  }, [dispatch]);

  // Start chat with expert
  const handleStartChat = async (client) => {
    setSelectedClient(client);
    dispatch(clearConversationError());

    try {
      const response = await dispatch(createOrFindConversation({
        participantId: client.id
      })).unwrap();

      dispatch(setSelectedConversation(response));
      setShowChatModal(true);
      showToast('Chat started successfully!', 'success');
    } catch (error) {
      showToast('Failed to start conversation. Please try again.', 'error');
    }
  };

  const closeChatModal = () => {
    setShowChatModal(false);
    setSelectedClient(null);
  };

  // Open job invitation modal
  const handleJobInvitation = () => {
    setShowAssignModal(true);
  };

  const closeAssignModal = () => setShowAssignModal(false);

  // Handle form input changes
  const handleAssignmentInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setAssignmentFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Assign expert to job
  const handleAssignToExpert = async (e) => {
  e.preventDefault();

  if (!assignmentFormData.bdOrderId) {
    showToast("Please select a BD Order", 'error');
    return;
  }

  const data = {
    bdOrderId: assignmentFormData.bdOrderId,
    assignmentNotes: assignmentFormData.assignmentNotes,
    seller_id: sellerId,
  };

  dispatch(inviteToJob(data))
    .then((res) => {
      showToast(res?.message || "Expert successfully invited", 'success');

      // ✅ Clear form fields
      setAssignmentFormData({
        bdOrderId: '',
        assignmentNotes: ''
      });

      // ✅ Close modal
      // setModalOpen(false); // or whatever controls your modal
setShowAssignModal(false)
    })
    .catch((err) => {
      showToast(err?.message || "Assignment failed", 'error');
    });
};


  

  // Render BD order options
  const renderOrderOptions = () => {
    if (isLoadingBdOrders) {
      return <option disabled>Loading BD orders...</option>;
    }

    if (!bdOrders || bdOrders.length === 0) {
      return <option disabled>No BD orders available</option>;
    }

    return bdOrders.map(order => {
      if (!order) return null;
      
      const bdOrderId = order.bdOrderId || order.id || order._id || 'N/A';
      const orderTitle = order.buyerrequest?.title || order.subject || `BD Order #${bdOrderId}`;
      
      let clientName = 'Unknown Client';
      if (order.client?.fname) clientName = order.client.fname;
      else if (order.buyer?.fname) clientName = order.buyer.fname;
      else if (order.user?.fname) clientName = order.user.fname;
      else if (typeof order.client === 'string') clientName = order.client;

      return (
        <option key={bdOrderId} value={bdOrderId}>
          {orderTitle} (BD Order ID: {bdOrderId}) - {clientName}
        </option>
      );
    });
  };


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {/* Profile Card */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="Hirecard">
              <div className='d-flex p-4 profile-view poppins'>
                <img 
                  src={expertDetail?.image} 
                  style={{ width: '18%' }} 
                  alt="Expert" 
                  className="rounded-circle"
                />
                <div className='ms-3 mt-3'>
                  <h6 className='colororing font-18 font-500 poppins'>
                    {expertDetail?.fname} {expertDetail?.lname}
                  </h6>
                  <p className='colororing mb-0 font-14 poppins'>New Seller</p>
                  <p className='font-12 poppins'>
                    <MdLocationOn className='colororing' />Pakistan
                  </p>
                  <p className='mb-0'>${expertDetail?.hourly_rate}/hour</p>
                  <p>Job Success 0%</p>
                </div>
              </div>

              <div className='d-flex justify-content-between pb-3 px-4'>
                <Button className='btn-stepper poppins px-3 font-16'>
                  Available Now
                </Button>
                <div className='d-flex'>
                  <Button
                    type="button"
                    variant="contained"
                    disabled={isAssigning}
                    startIcon={isAssigning ? <CircularProgress size={20} /> : null}
                    className="btn-stepper"
                    onClick={handleJobInvitation}
                  >
                    {isAssigning ? 'Inviting...' : 'Invite to job'}
                  </Button>
                  <Button
                    onClick={() => handleStartChat(expertDetail)}
                    disabled={creatingConversation}
                    className='btn-stepper-border poppins px-3 font-16 ms-2'
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Details */}
        <div className="row mt-4">
          <div className="col-lg-4 col-12">
            <div className="Hirecard h-100 p-3 pb-5">
              <div className='d-flex justify-content-between'>
                <div>
                  <p className='blackcolor font-18 font-500'>$ 0</p>
                  <p className='blackcolor font-18 font-500'>Total Earnings</p>
                </div>
                <div>
                  <p className='blackcolor font-18 font-500'>0</p>
                  <p className='blackcolor font-18 font-500'>Total Jobs</p>
                </div>
              </div>
              <hr />
              <h6 className='blackcolor font-18 font-500'>Hours per week</h6>
              <p className='font-15 textgray'>More than 30 hrs/week</p>
              <h6 className='blackcolor font-18 font-500'>Language</h6>
              <p className='font-15'>English: <span className='textgray'>Fluent</span></p>
              <h6 className='blackcolor font-18 font-500'>Verifications</h6>
              <p className='font-15'>Phone Number: <span className='textgray'>Verified</span></p>
              <p className='font-15'>ID: <span className='textgray'>Verified</span></p>
              <h6 className='blackcolor font-18 font-500'>Education</h6>
              <p>University of Engineering & Technology, Lahore</p>
              <p className='font-15 textgray'>Bachelor of Science (BS), Computer Science 2015–2019</p>
            </div>
          </div>

          <div className="col-lg-8 col-12">
            <div className="h-100">
              <div className="Hirecard p-3 mb-4">
                <h6>Freelancer</h6>
                <p className='mb-0 textgray'>{expertDetail?.description}</p>
              </div>

              <h6 className='mt-4 cocon'>Work History</h6>
              <div className="Hirecard p-3">
                <h6 className='colororing'>No Work History Found</h6>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="col-12 mt-4">
            <div className='Hirecard p-3'>
              <h4 className='font-18 font-500 poppins blackcolor'>Skills</h4>
              <div className='d-flex flex-wrap poppins gap-2 mt-2'>
                {expertDetail?.skills?.length > 0 ? (
                  expertDetail.skills.map((val, index) => (
                    <div className='rounded-5 owsem px-3 py-1' key={index}>
                      <p className='mb-0 font-15 colorgray'>{val?.skill}</p>
                    </div>
                  ))
                ) : (
                  <p className='text-muted'>No skills added</p>
                )}
              </div>
            </div>
          </div>
        </div>

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
            <div className="flex-grow-1">
              <Chating />
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Assign Modal */}
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
                <Button 
                  onClick={closeAssignModal} 
                  disabled={isAssigning}
                  sx={{ minWidth: 'auto' }}
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleAssignToExpert}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="bdOrderId" className="form-label">Select BD Order *</label>
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
                      {renderOrderOptions()}
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

                <div className="d-flex gap-2 mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isAssigning}
                    startIcon={isAssigning ? <CircularProgress size={20} /> : null}
                    className="btn-stepper"
                    fullWidth
                  >
                    {isAssigning ? 'Assigning...' : 'Assign to Expert'}
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={closeAssignModal}
                    disabled={isAssigning}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ProfileReview;