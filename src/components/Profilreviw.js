import { Button } from '@mui/material';
import { useState } from "react";
import {
    Offcanvas
} from "react-bootstrap";
import { MdLocationOn } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Chating from '../components/frelancerChat/Chat/Chating';
import {
    clearConversationError,
    createOrFindConversation,
    setSelectedConversation
} from "../redux/slices/messageSlice";
import { inviteToJob } from '../redux/slices/offersSlice';



const Profilreviw = ({ expertDetail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    // Chat modal/offcanvas state
    const [showChatModal, setShowChatModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    // Message state
    const { creatingConversation, error: conversationError } = useSelector(
        (state) => state.message
    );
    // Handle chat opening
    const handleStartChat = async (client, invitation) => {
        setSelectedClient(client);

        // Clear any previous errors
        dispatch(clearConversationError());

        try {
            // Create or find existing conversation with this client
          
            const response = await dispatch(createOrFindConversation({
                participantId: client.id
                // Link to job context
               
            })).unwrap();
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


    const handleJobInvitation = () => {
        let data = {
            invited_to: expertDetail?.id
        }
        dispatch(inviteToJob(data, handleResponse))
    }
    const handleResponse = (data) => {

    }
    return (
        <>

            <div className="container">
                <div className="row ">
                    <div className="col-12">
                        <div className="Hirecard">
                            <div className='d-flex p-4 profile-view poppins'>
                                <img src={expertDetail?.image} style={{ width: '18%' }} alt="" />
                                <div className='ms-3 mt-3'>
                                    <h6 className='colororing font-18 font-500 poppins'>{expertDetail?.fname + " " + expertDetail?.lname}</h6>
                                    <p className='colororing mb-0 font-14 poppins'>New Seller</p>
                                    <p className='font-12 poppins'><MdLocationOn className='colororing ' />Pakistan</p>
                                    <div className=' mt-2'>
                                        <div className='d-flex'>
                                            <div><p className='mb-0'>${expertDetail?.hourly_rate}/hour</p></div>
                                            {/* <div><p className='mb-0 ms-5'>$100+ earned</p></div> */}
                                        </div>
                                        <div className="progress w-100 mt-2" style={{ height: '6px' }} role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar bg-warning" style={{ width: '80%' }}></div>
                                        </div>
                                        <p>Job Success 0 % </p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between pb-3 px-4'>
                                <div>

                                    <Button className='btn-stepper poppins px-3  font-16'>Available Now</Button>
                                </div>
                                <div className='d-flex '>
                                    <Button className='btn-stepper poppins px-3 me-3 font-16' onClick={handleJobInvitation}>Invite to job</Button>
                                    <Button onClick={() => handleStartChat(expertDetail)}
                                        disabled={creatingConversation} className='btn-stepper-border poppins px-3  font-16'>Send Message </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 mt-4  poppins">
                        <div className="Hirecard h-100 p-3 pb-5 ">
                            <div className='d-flex justify-content-between '>
                                <div><p className='blackcolor font-18 font-500'>$ 0</p><p className='blackcolor font-18 font-500'>Total Earnings</p></div>
                                <div><p className='blackcolor font-18 font-500'>0</p><p className='blackcolor font-18 font-500'>Total Jobs</p></div>
                            </div>
                            <hr />
                            <h6 className='blackcolor font-18 font-500'>Hours per week</h6>
                            <p className='font-15 textgray'>More than 30 hrs/week</p>
                            <h6 className='blackcolor font-18 font-500'>Language</h6>
                            <p className='font-15'>English: <span className=' textgray'>Fluent</span> </p>
                            <h6 className='blackcolor font-18 font-500'>Verifications</h6>
                            <p className='font-15'>Phone Number: <span className=' textgray'>Verified</span> </p>
                            <p className='font-15'>ID: <span className=' textgray'>Fluent</span> Verified</p>
                            <h6 className='blackcolor font-18 font-500'>Education</h6>
                            <p>University of Engineering & Technology, Lahore</p>
                            <p className='font-15 textgray'>Bachelor of Science (BS),
                                Computer science 2015-2019
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12 mt-4 poppins">
                        <div className="h-100">

                            <div className="Hirecard p-3">
                                <h6>Freelancer</h6>
                                <p className='mb-0 textgray'>{expertDetail?.description} </p>
                                {/* <p className='colororing mb-0'>more</p> */}
                            </div>
                            <h6 className='mt-4 cocon'>Work History</h6>
                            <div className="Hirecard mt-3 p-3">
                                <div className='d-flex justify-content-between'>
                                    <div><h6 className='colororing'>No Work History Found</h6>
                                        {/* <div className='d-flex '>
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                        </div> */}
                                        {/* <p className='mb-0 textgray'>"Amazing worker. <br /> Thanks!"</p>
                                        <p className='mb-0 mt-2'>$20.00</p> */}
                                    </div>
                                    {/* <div><p>5.00 May 3, 2023 - May 4, 2023</p></div> */}
                                </div>
                                <hr />
                                {/* <div className='d-flex justify-content-between'>
                                    <div><h6 className='colororing'>Virtual Assistance</h6>
                                        <div className='d-flex'>
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                            <img src={ster} className='ms-2' alt="" />
                                        </div>
                                        <p className='mb-0 textgray'>"Amazing worker. <br /> Thanks!"</p>
                                        <p className='mb-0 mt-2'>$20.00</p>
                                    </div>
                                    <div><p>5.00 May 3, 2023 - May 4, 2023</p></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="container-fluid">
                        <div className='d-flex justify-content-end hireexpert mt-3 mb-3'>
                            <Stack spacing={4}>
                                <Pagination count={99} variant="outlined" shape="rounded" />
                            </Stack>
                        </div>
                    </div> */}
                    {/* <Owesome /> */}
                    <div className="col-12">
                        <div className='Hirecard p-3'>
                            <h4 className=' font-18 font-500 poppins blackcolor'>Skills</h4>
                            <div className=' d-flex flex-wrap poppins'>
                                {expertDetail?.skills?.length > 0 ?
                                    expertDetail?.skills.map((val, index) => {
                                        return (
                                            <div className='rounded-5 owsem'><p className='mb-0 font-15 colorgray'>{val?.skill}</p> </div>
                                        )
                                    })
                                    : <h2>Skills not added</h2>
                                }
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
                        {/* Render your Chating component */}
                        <div className="flex-grow-1">
                            <Chating />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default Profilreviw
