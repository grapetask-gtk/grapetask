import { Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { BsChevronLeft, BsFillPlayCircleFill } from 'react-icons/bs';
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa';
import { TfiReload } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { toast, ToastContainer } from 'react-toastify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import star6 from '../../assets/5star.webp';
import ster from '../../assets/Frame.webp';
import icone from '../../assets/icone.webp';
import Loader from '../../assets/LoaderImg.gif';
import timepes from '../../assets/time (1).webp';

import Card from '../../components/Card';
import Footer from '../../components/Footer';
import Chating from '../../components/frelancerChat/Chat/Chating';
import Navbar from '../../components/Navbar';

import { geAllGigs, getGigDetail } from '../../redux/slices/allGigsSlice';
import {
  clearConversationError,
  createOrFindConversation,
  setSelectedConversation
} from '../../redux/slices/messageSlice';
import { onMessageListener } from '../firebase';

import '../../style/frelancer.scss';
import '../../style/imgSlider.scss';

// Constants for package types
const PACKAGE_TYPES = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium'
};

const FreelancersGigs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gigId } = useParams();
  const UserDetail = JSON.parse(localStorage.getItem('UserData'));

  const { gigsDetail, singleGigDetail, isPreLoading } = useSelector((state) => state.allGigs);
  const { creatingConversation } = useSelector((state) => state.message);

  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [joinedTime, setJoinedTime] = useState({ hours: 0 });
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  // Fetch gig details and all gigs on component mount
  useEffect(() => {
    dispatch(getGigDetail(gigId));
    dispatch(geAllGigs());
    
    onMessageListener()
      .then((payload) => {
        toast.success(payload?.notification?.title, {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch((err) => console.error('Failed to get message: ', err));
  }, [dispatch, gigId]);

  // Calculate joined time
  useEffect(() => {
    if (singleGigDetail?.user?.created_at) {
      const createdAtDate = new Date(singleGigDetail.user.created_at);
      const currentTime = new Date();
      const timeDifference = Math.abs(currentTime - createdAtDate);
      const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      setJoinedTime({ hours });
    }
  }, [singleGigDetail]);

  // Memoized data processing
  const { filteredBasic, filteredStandard, filteredPremium } = useMemo(() => {
    const filterByType = (array, targetType) => 
      array?.filter((obj) => obj.type === targetType) || [];
    
    return {
      filteredBasic: filterByType(singleGigDetail?.packages, PACKAGE_TYPES.BASIC),
      filteredStandard: filterByType(singleGigDetail?.packages, PACKAGE_TYPES.STANDARD),
      filteredPremium: filterByType(singleGigDetail?.packages, PACKAGE_TYPES.PREMIUM)
    };
  }, [singleGigDetail?.packages]);

  // Calculate ratings
  const { overallAverageRating, ratingPercentages } = useMemo(() => {
    const getRatingsArray = () => {
      if (!singleGigDetail?.rating) return [];
      return Array.isArray(singleGigDetail.rating) 
        ? singleGigDetail.rating 
        : [singleGigDetail.rating];
    };

    const ratings = getRatingsArray().map((item) => parseFloat(item.ratings));
    const validRatings = ratings.filter((value) => !isNaN(value));
    
    const average = validRatings.length > 0 
      ? validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length 
      : 0;
    
    const percentages = [5, 4, 3].map((star) => {
      const count = ratings.filter((value) => Math.round(value) === star).length;
      return ratings.length > 0 ? (count / ratings.length) * 100 : 0;
    });

    return {
      overallAverageRating: average,
      ratingPercentages: percentages
    };
  }, [singleGigDetail]);

  // Handle chat initiation
  const handleStartChat = useCallback(async (client) => {
    if (!client?.id) {
      toast.error('Invalid client information');
      return;
    }
    
    setSelectedClient(client);
    dispatch(clearConversationError());
    try {
      const response = await dispatch(createOrFindConversation({ participantId: client.id })).unwrap();
      dispatch(setSelectedConversation(response));
      setShowChatModal(true);
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to start conversation. Please try again.');
    }
  }, [dispatch]);

  const closeChatModal = useCallback(() => {
    setShowChatModal(false);
    setSelectedClient(null);
  }, []);

  // Handle package selection
  const handlePackageSelection = useCallback((packageId) => {
    if (!singleGigDetail?.seller?.id || !singleGigDetail?.id) {
      toast.error('Missing required information for package selection');
      return;
    }
    
    navigate(`/order/payment?seller_id=${singleGigDetail.seller.id}&gig_id=${singleGigDetail.id}&package_id=${packageId}`);
  }, [singleGigDetail, navigate]);

  // Package handlers
  const handleBasic = useCallback(() => {
    if (filteredBasic[0]?.id) {
      handlePackageSelection(filteredBasic[0].id);
    }
  }, [filteredBasic, handlePackageSelection]);

  const handleStandard = useCallback(() => {
    if (filteredStandard[0]?.id) {
      handlePackageSelection(filteredStandard[0].id);
    }
  }, [filteredStandard, handlePackageSelection]);

  const handlePremium = useCallback(() => {
    if (filteredPremium[0]?.id) {
      handlePackageSelection(filteredPremium[0].id);
    }
  }, [filteredPremium, handlePackageSelection]);

  // Slider arrows components
  const NextArrow = useCallback((props) => (
    <div className="arrow-next rounded-5" onClick={props.onClick}><FaAngleRight /></div>
  ), []);

  const PrevArrow = useCallback((props) => (
    <div className="arrow-prev rounded-5" onClick={props.onClick}><FaAngleLeft /></div>
  ), []);

  // Slider settings
  const settingsMain = useMemo(() => ({
    dots: false,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbnailSliderRef.current,
    ref: mainSliderRef
  }), [NextArrow, PrevArrow]);

  const settingsThumbs = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSliderRef.current,
    ref: thumbnailSliderRef
  }), []);

  // Recommended gigs
  const RecomendedGigsArray = useMemo(() => 
    gigsDetail.flatMap((category) => 
      category.gigs?.filter((gig) => gig.category_id === singleGigDetail?.category_id) || []
    ), [gigsDetail, singleGigDetail?.category_id]
  );

  const settings = useMemo(() => ({
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: false },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 3, slidesToScroll: 1, initialSlide: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  }), []);

  // Utility function to strip HTML tags
  const stripHtmlTags = useCallback((html) => {
    if (!html) return '';
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  }, []);

  // Media slider component
  const renderMediaSlider = useCallback(() => {
    const media = singleGigDetail?.media || {};
    const mediaItems = [
      media.image1 && { type: 'image', src: media.image1 },
      media.image2 && { type: 'image', src: media.image2 },
      media.image3 && { type: 'image', src: media.image3 },
      media.video && { type: 'video', src: media.video },
    ].filter(Boolean);

    if (mediaItems.length === 0) return null;

    return (
      <>
        <div className="main-slider-img">
          <Slider {...settingsMain}>
            {mediaItems.map((item, index) => (
              <div key={index} className="inner-slider-img w-100 rounded-4">
                {item.type === 'image' ? (
                  <img 
                    className="w-100 rounded-4 h-100 object-fit-cover" 
                    src={item.src} 
                    alt={`Gig media ${index + 1}`} 
                    loading="lazy"
                  />
                ) : (
                  <video className="w-100 h-100 object-fit-cover rounded-4" controls>
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </Slider>
        </div>
        <div className="main-slider-thumbnail-img mt-2">
          <Slider {...settingsThumbs}>
            {mediaItems.map((item, index) => (
              <div key={index} className="inner-slider-thumbnail-img rounded-3">
                {item.type === 'image' ? (
                  <img 
                    className="w-100 h-100 rounded-3 object-fit-cover cursor-pointer" 
                    src={item.src} 
                    alt={`Thumbnail ${index + 1}`} 
                    loading="lazy"
                  />
                ) : (
                  <div className="inner-slider-thumbnail-img rounded-3 position-relative">
                    <BsFillPlayCircleFill className="thumb-play cursor-pointer" size={20} />
                    <video className="w-100 object-fit-cover h-100 rounded-3 cursor-pointer">
                      <source src={item.src} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </>
    );
  }, [singleGigDetail?.media, settingsMain, settingsThumbs]);

  // Package content component
  const renderPackageContent = useCallback((packageData) => (
    <>
      <div className="d-flex justify-content-between poppins">
        <h6 className="font-16 fw-semibold text-dark">{packageData.type.toUpperCase()} PROMO</h6>
        <h6 className="font-16 fw-semibold text-dark">${packageData.total}</h6>
      </div>
      <div className="mt-3">
        <p className="font-14 inter text-secondary">{stripHtmlTags(packageData.title)}</p>
      </div>
      <div className="d-flex text-secondary mt-2">
        <div className="ms-1 font-14 fw-semibold">
          <p><BiTime className="me-2" size={16} />{packageData.delivery_time} Days Delivery</p>
        </div>
        <div className="ms-4 font-14 fw-semibold">
          <p><TfiReload className="me-2" size={16} />{packageData.ravision} Revision</p>
        </div>
      </div>
      <div>
        {packageData.features?.map((feature, idx) => (
          <p key={idx} className="font-12" style={{ color: feature.included ? '#95979D' : '#D4D4D4' }}>
            <FaCheck className={feature.included ? "text-primary me-3" : "me-3 text-muted"} />
            {feature.description}
          </p>
        ))}
      </div>
    </>
  ), [stripHtmlTags]);

  // Package tab component
  const renderPackageTab = useCallback((type, filteredPackages, handleSelect) => {
    const packageData = filteredPackages[0];
    if (!packageData) return null;

    return (
      <div>
        {renderPackageContent(packageData)}
        <div>
          <Button 
            className="btn-stepper poppins w-100 font-16" 
            data-bs-toggle="offcanvas" 
            data-bs-target={`#offcanvas${type}`} 
            aria-controls={`offcanvas${type}`}
          >
            Continue
          </Button>
          <Button 
            className="btn-stepper-border poppins w-100 mt-3 font-16" 
            onClick={() => handleStartChat(singleGigDetail?.seller)} 
            disabled={creatingConversation}
          >
            Contact with seller
          </Button>
        </div>
      </div>
    );
  }, [renderPackageContent, handleStartChat, singleGigDetail?.seller, creatingConversation]);

  // Package offcanvas component
  const renderPackageOffcanvas = useCallback((type, filteredPackages, handleSelect) => {
    const packageData = filteredPackages[0];
    if (!packageData) return null;

    return (
      <div 
        className="offcanvas offcanvas-end p-3" 
        style={{ width: '45%' }} 
        tabIndex={-1} 
        id={`offcanvas${type}`} 
        aria-labelledby={`offcanvas${type}Label`}
      >
        <div className="offcanvas-header">
          <h5 
            className="offcanvas-title" 
            id="offcanvasRightLabel" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close" 
            style={{ cursor: 'pointer' }}
          >
            <BsChevronLeft className="text-primary" />
          </h5>
        </div>
        <div className="offcanvas-body pe-0">
          <h6 className="font-28 fw-semibold text-dark">Service Details</h6>
          <p className="frelancer-ofcanva-text poppins mt-3 w-100 mb-0 font-18 fw-medium text-center p-3 mt-2">
            {type}
          </p>
          <div className="appept p-3">
            {renderPackageContent(packageData)}
            <div>
              <Button onClick={handleSelect} className="btn-stepper poppins w-100 font-16">
                Proceed to checkout
              </Button>
              <Button 
                className="btn-stepper-border poppins w-100 mt-3 font-16" 
                onClick={() => handleStartChat(singleGigDetail?.seller)} 
                disabled={creatingConversation}
              >
                Contact with seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [renderPackageContent, handleStartChat, singleGigDetail?.seller, creatingConversation]);

  // Format user registration date
  const userRegisterDate = useMemo(() => {
    if (!UserDetail?.created_at) return { month: '', year: '' };
    
    const UserRegister = new Date(UserDetail.created_at);
    return {
      month: UserRegister.toLocaleString('en-us', { month: 'long' }),
      year: UserRegister.getFullYear()
    };
  }, [UserDetail]);

  // Loading state
  if (isPreLoading) {
    return (
      <div className="preloder text-center d-flex align-items-center justify-content-center">
        <div>
          <img src={Loader} width={200} height={200} alt="Loading..." />
          <h2 className="cocon fw-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (!singleGigDetail) {
    return (
      <div className="container mt-5 text-center">
        <h2>No gig data found</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navbar FirstNav="none" />
      
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col-lg-8 col-12">
            <div className="d-flex justify-content-between flex-wrap poppins align-items-center">
              <div className="text-primary d-flex align-items-center">
                <p className="mb-0 font-16">{singleGigDetail?.category?.name}</p>
                <span><img src={icone} className="mx-3" alt="" /></span>
                <p className="mb-0 font-16">{singleGigDetail?.subcategory?.name}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-3 justify-content-center">
          {/* Main Content Column */}
          <div className="col-lg-8 col-12 mt-4">
            <div className="Revie p-3">
              <div><h3 className="font-24 poppins">{singleGigDetail?.title}</h3></div>
              
              {/* Seller Info */}
              <div className="d-flex align-items-lg-center align-items-md-center align-items-start inter mb-lg-0 mb-3">
                <img 
                  src={singleGigDetail?.seller?.image} 
                  className="rounded-circle" 
                  width={30} 
                  height={30} 
                  alt="User" 
                />
                <div className="d-flex ms-2 align-items-center flex-wrap">
                  <div>
                    <h6 
                      className="ms-2 font-14 mb-0 inter cursor-pointer" 
                      onClick={() => navigate(`/profileOtherPerson/${singleGigDetail.seller?.fname}`, 
                        { state: { userId: singleGigDetail.user_id } })}
                    >
                      {singleGigDetail?.seller?.fname}
                    </h6>
                  </div>
                  <div>
                    <p className="text-secondary font-14 ms-2 mb-0">{singleGigDetail?.seller?.role}</p>
                  </div>
                  <div className="d-flex flex-wrap">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={ster} width={14} height={14} className="ms-2" alt="Star" />
                    ))}
                    <p className="ms-2 font-14 text-primary mb-0">0</p>
                  </div>
                </div>
              </div>
              
              {/* Media Slider */}
              <div className="mt-3">{renderMediaSlider()}</div>
              
              {/* Gig Description */}
              <div className="mt-2 poppins">
                <h6 className="font-16 font-700">About This Gig</h6>
                <p className="font-14 mb-1 text-dark">{stripHtmlTags(singleGigDetail?.description)}</p>
                <hr className="border-0 mt-1 mb-1" style={{ height: '1.5px', opacity: '50%', backgroundColor: '#667085' }} />
                
                <p className="font-14 text-secondary mb-0 poppins mt-3">Product type</p>
                <p className="font-14 poppins">{singleGigDetail?.category?.name}</p>
                
                {/* Seller Information */}
                <div className="mt-lg-5">
                  <h3 className="font-20 mt-4 fw-bold">About The Seller</h3>
                  <div className="d-flex">
                    <div>
                      <img 
                        src={singleGigDetail?.seller?.image} 
                        className="rounded-circle" 
                        width={100} 
                        height={100} 
                        alt="User" 
                      />
                    </div>
                    <div className="ms-3">
                      <p className="font-14 fw-bold text-dark mb-2">{singleGigDetail?.seller?.fname}</p>
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar 
                            key={i} 
                            size={22} 
                            color={i < Math.round(overallAverageRating) ? 'rgba(253, 176, 34, 1)' : '#D4D4D4'} 
                          />
                        ))}
                        <p className="ms-2 fw-medium mb-0 text-primary">({overallAverageRating.toFixed(1)})</p>
                      </div>
                      <Button 
                        className="btn-stepper-border poppins px-3 mt-2 font-16" 
                        onClick={() => handleStartChat(singleGigDetail?.seller)} 
                        disabled={creatingConversation}
                      >
                        Contact Me
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Seller Details */}
                <div className="row justify-content-between mt-3">
                  <div className="col-6 text-start">
                    <p className="font-14 text-secondary mb-0">From</p>
<p className="font-14 fw-bold text-dark">
  {singleGigDetail?.seller?.country
    ? singleGigDetail.seller.country.charAt(0).toUpperCase() + singleGigDetail.seller.country.slice(1)
    : "Seller has not added their country"}
</p>

                    <p className="font-14 text-secondary mb-0">Avg. response time</p>
                    <p className="font-14 fw-bold text-dark">
                      {joinedTime.hours > 0 ? `${joinedTime.hours} hour${joinedTime.hours !== 1 ? 's' : ''} ago` : 'Recently'}
                    </p>
                    
                    <p className="font-14 text-secondary mb-0">Languages</p>
                    <p className="font-14 fw-bold text-dark">{singleGigDetail?.seller?.language ?? "English"}</p>
                  </div>
                  <div className="col-6">
                    <p className="font-14 text-secondary mb-0">Member since</p>
                    <p className="font-14 fw-bold text-dark">{singleGigDetail?.seller 
    ? new Date(singleGigDetail?.seller?.created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : ''  }</p>
                    
                    <p className="font-14 text-secondary mb-0">Last delivery</p>

<p className="font-14 fw-bold text-dark">
  {singleGigDetail?.last_delivery 
    ? new Date(singleGigDetail.last_delivery.updated_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'No delivery info'}
</p> </div>
                </div>
                
                <hr className="border-0 mt-1 mb-1" style={{ height: '1.5px', opacity: '50%', backgroundColor: '#667085' }} />
                
                {/* Ratings & Reviews */}
                <h5 className="font-20 fw-bold mt-4 inter">Rating & Reviews</h5>
                <div className="row justify-content-between mt-4">
                  <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                    <div className="cardrating text-center p-4">
                      <img src={star6} alt="Stars" />
                      <h3 className="mt-2 font-28 fw-semibold" style={{ opacity: '50%' }}>
                        {overallAverageRating.toFixed(1)} out of 5
                      </h3>
                      <p className="mt-2 mb-0">Top Rating</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-4">
                    <div className="gig-rating-rewies">
                      {[5, 4, 3].map((stars, index) => (
                        <div key={stars} className="row align-items-center mt-4">
                          <div className="col-2">
                            <p className="mb-0 font-14 text-secondary">{stars}&nbsp;Stars</p>
                          </div>
                          <div className="col-10">
                            <div className="progress w-100" style={{ height: '8px' }} role="progressbar">
                              <div 
                                className="progress-bar" 
                                style={{ width: `${ratingPercentages[index]}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Individual Reviews */}
                {singleGigDetail.rating?.map((value, index) => (
                  <div className="mt-3" key={index}>
                    <div className="d-flex justify-content-between mt-5">
                      <div className="d-flex">
                        <div>
                          <img 
                            src={value.user?.image} 
                            className="rounded-circle" 
                            width={50} 
                            height={50} 
                            alt="Reviewer" 
                          />
                        </div>
                        <p className="ms-2 font-16 fw-medium">{value.user?.name || 'Anonymous'}</p>
                      </div>
                    </div>
                    <p className="mb-0 font-16 mt-3 text-secondary text-capitalize">
                      {value.comments || 'No comment provided'}
                    </p>
                    <div className="d-flex justify-content-end align-items-center">
                      <img src={timepes} width={20} height={20} alt="Time" />
                      <p className="font-14 ms-1 fw-medium text-secondary mb-0">
                        {formatDistanceToNow(new Date(value.created_at || new Date()), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Package Selection Column */}
          <div className="col-lg-4 col-12 mt-4 gigi-tabs poppins">
            <div className="Revie container-fluid pt-0 mt-1">
              <ul className="nav nav-pills mb-3 row" id="pills-tab" role="tablist">
                {['Basic', 'Standard', 'Premium'].map((type, index) => (
                  <li key={type} className="nav-item col-4 px-0" role="presentation">
                    <button
                      className={`nav-link pt-3 pb-3 w-100 ${index === 0 ? 'active' : ''}`}
                      id={`pills-${type.toLowerCase()}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-${type.toLowerCase()}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-${type.toLowerCase()}`}
                      aria-selected={index === 0}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="tab-content" id="pills-tabContent">
                <div 
                  className="tab-pane fade show active" 
                  id="pills-basic" 
                  role="tabpanel" 
                  aria-labelledby="pills-basic-tab" 
                  tabIndex={0}
                >
                  {renderPackageTab('basic', filteredBasic, handleBasic)}
                </div>
                
                <div 
                  className="tab-pane fade" 
                  id="pills-standard" 
                  role="tabpanel" 
                  aria-labelledby="pills-standard-tab" 
                  tabIndex={0}
                >
                  {renderPackageTab('standard', filteredStandard, handleStandard)}
                </div>
                
                <div 
                  className="tab-pane fade" 
                  id="pills-premium" 
                  role="tabpanel" 
                  aria-labelledby="pills-premium-tab" 
                  tabIndex={0}
                >
                  {renderPackageTab('premium', filteredPremium, handlePremium)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended Gigs */}
          {RecomendedGigsArray.length >= 3 && (
            <div className="mt-5">
              <h3 className="font-28 text-secondary cocon">Recommended for you</h3>
              <div className="container position-relative mb-5 gigs-slider mt-4">
                <div className="row">
                  <div className="gigs-slider-bg"></div>
                  <Slider {...settings}>
                    {RecomendedGigsArray.map((innerValue, index) => {
                      const averageRating = innerValue?.rating?.map((value) => value.ratings)
                        .filter((value) => !isNaN(value))
                        .reduce((acc, rating, index, array) => acc + rating / array.length, 0) || 0;
                      
                      return (
                        <div className="mt-4" key={index}>
                          <div className="cursor-pointer h-100">
                            <div className="h-100">
                              <Card
                                gigsImg={innerValue.media?.image1 || innerValue.media?.image2 || innerValue.media?.image3}
                                minHeight="50px"
                                heading={innerValue?.title?.substring(0, 50) + '...'}
                                phara={stripHtmlTags(innerValue?.description?.substring(0, 100) + '...')}
                                star1={parseInt(averageRating) >= 1 ? '#F16336' : '#D4D4D4'}
                                star2={parseInt(averageRating) >= 2 ? '#F16336' : '#D4D4D4'}
                                star3={parseInt(averageRating) >= 3 ? '#F16336' : '#D4D4D4'}
                                star4={parseInt(averageRating) >= 4 ? '#F16336' : '#D4D4D4'}
                                star5={parseInt(averageRating) >= 5 ? '#F16336' : '#D4D4D4'}
                                projectNumber="0"
                                price={innerValue.package?.[0]?.total || '0'}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Package Offcanvases */}
      {['Basic', 'Standard', 'Premium'].map((type) => 
        renderPackageOffcanvas(type.toLowerCase(), 
          type === 'Basic' ? filteredBasic : 
          type === 'Standard' ? filteredStandard : filteredPremium, 
          type === 'Basic' ? handleBasic : 
          type === 'Standard' ? handleStandard : handlePremium)
      )}

      {/* Chat Modal */}
      <Offcanvas show={showChatModal} onHide={closeChatModal} placement="end" style={{ width: '450px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Chat with {selectedClient?.fname} {selectedClient?.lname}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 d-flex flex-column">
          <div className="flex-grow-1"><Chating /></div>
        </Offcanvas.Body>
      </Offcanvas>

      <Footer />

      <style>{`.offcanvas-body::-webkit-scrollbar { width: 20px; }`}</style>
    </>
  );
};

export default FreelancersGigs;