import { Button } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import {
  Offcanvas
} from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsChevronLeft, BsFillPlayCircleFill } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight, FaCheck } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import star6 from "../../assets/5star.webp";
import ster from "../../assets/Frame.webp";
import icone from "../../assets/icone.webp";
import Loader from "../../assets/LoaderImg.gif";
import timepes from "../../assets/time (1).webp";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Chating from '../../components/frelancerChat/Chat/Chating';
import Navbar from "../../components/Navbar";
import { geAllGigs, getGigDetail } from "../../redux/slices/allGigsSlice";
import {
  clearConversationError,
  createOrFindConversation,
  setSelectedConversation
} from "../../redux/slices/messageSlice";
import { useDispatch, useSelector } from "../../redux/store/store";
import "../../style/frelancer.scss";
import "../../style/imgSlider.scss";
import { onMessageListener } from "../firebase";


const FreelancersGigs = ({ onSelectPkg }) => {
  const UserDetail = JSON.parse(localStorage.getItem("UserData"));

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

  //
  const navigate = useNavigate();

  // ---------- fetching --------------
  const { gigId } = useParams();
  // const location = useLocation();
  // const gigDetail = location.state?.gigDetail;
  // console.log(gigDetail,'================================on');
  // ---------- fetching --------------
 
  const { gigsDetail, singleGigDetail, isPreLoading } = useSelector(
    (state) => state.allGigs
  );

  console.log(singleGigDetail, "====================freelancerGig");

  useEffect(() => {
    dispatch(getGigDetail(gigId));
  }, [dispatch, gigId]);

  // Handle chat opening
  const handleStartChat = async (client) => {
    setSelectedClient(client);
    
    // Clear any previous errors
    dispatch(clearConversationError());
    
    try {
      // Create or find existing conversation with this client
      console.log('strated to find conversation for client id:',client.id);
      const response = await dispatch(createOrFindConversation({
        participantId: client.id
         
      
      })).unwrap();
      console.log('got response back in job invitaion page:',response);
         console.log('slecting conv in job invitation page:',response);
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
  // ============FILTRT PACKEGS ================
  // debugger
  const filterByType = (array, targetType) => {
    // return array.filter((obj) => obj.type === targetType);
    return array?.filter((obj) => obj.type === targetType) || [];
  };

  const filteredBasic = filterByType(singleGigDetail?.package, "basic");
  const filteredStandard = filterByType(singleGigDetail?.package, "standard");
  const filteredPremium = filterByType(singleGigDetail?.package, "premium");

  // ----------Filter Rating ==========
  const ratings = singleGigDetail?.rating?.map((item) =>
    parseFloat(item.ratings)
  );
  // OUT Of 5
  const filterRating = ratings?.filter(
    (value) => value !== null && !isNaN(value)
  );
  const overallAverageRatingWithOutDecimal = parseInt(
    filterRating?.reduce((acc, rating) => acc + rating, 0) /
      filterRating?.length
  );
  const overallAverageRatingWithDecimal = parseFloat(
    filterRating?.reduce((acc, rating) => acc + rating, 0) /
      filterRating?.length
  );
  // console.log(
  //   overallAverageRatingWithOutDecimal,
  //   "========alllRating with out Null Rating Gig"
  // );
  // console.log(
  //   overallAverageRatingWithDecimal.toFixed(1),
  //   "========alllRating with out Null Rating Gig"
  // );
  // Average value 5
  const filterRatingFive = ratings?.filter((value) => value == 5);
  const overallAverageFive = (filterRatingFive?.length / ratings?.length) * 100;
  // console.log(overallAverageFive, "=====filter 5 Gig");
  // Average value 4
  const filterRatingFour = ratings?.filter((value) => value == 4);
  const overallAverageFour = (filterRatingFour?.length / ratings?.length) * 100;
  // console.log(overallAverageFour, "=====filter 4 Gig");
  const filterRatingThree = ratings?.filter((value) => value == 3);
  const overallAverageThree =
    (filterRatingThree?.length / ratings?.length) * 100;
  // console.log(overallAverageThree, "=====filter 3 Gig");

  onMessageListener()
    .then((payload) => {
      console.log(payload?.notification?.title, "haschxavsva");
      console.log(payload, "payload");
      toast.success(payload?.notification?.title, {
        position: "top-right",
        autoClose: 2000,
      });
    })
    .catch((err) => console.log("failed: ", err));
  // ============ Slider ======= Gig ============
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow-next rounded-5" onClick={onClick}>
        <FaAngleRight />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="arrow-prev rounded-5" onClick={onClick}>
        <FaAngleLeft />
      </div>
    );
  };
  const settingsMain = {
    dots: false,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
  };

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToShow: (() => {
    // const hasVideo = singleGigDetail.media.video;
    // const hasImage3 = singleGigDetail.media.image3;
    // const hasImage2 = singleGigDetail.media.image2;
    // const hasImage1 = singleGigDetail.media.image1;

    // if((hasImage2 == null) && (hasImage3 == null) && (hasVideo && null)) {
    // return 1;
    // } else if ((hasImage2 == null) && (hasImage3 == null) && (hasVideo && null)) {
    // return 2;
    // } else if (hasImage3) {
    // return 3;
    // } else if (hasVideo) {
    // return 3;
    // } else {
    // return 0;
    // }
    // })(),
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1,
  };

  // ==========find Seller Detail ============
  const [joinedTime, setJoinedTime] = useState({ hours: 0 });
  const createdAtDate = new Date(singleGigDetail?.user?.created_at);

  const UserRegister = new Date(UserDetail?.created_at);
  const currentTime = new Date();

  // Get month and year
  const month = UserRegister.toLocaleString("en-us", { month: "long" });
  const year = UserRegister.getFullYear();

  useEffect(() => {
    // Get hours
    const timeDifference = Math.abs(currentTime - createdAtDate);
    // const joinedMonth = createdAtDate.getMonth();
    // const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    // const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

    setJoinedTime({ hours });
  }, []);

  // ------------- Order Active ----------------

  const handleResponse = (data) => {
    if (data?.status) {
      navigate("/frelancerPaymentViaCard");
      //   alert(data?.message)
    } else {
      //   alert(data?.message)
    }
  };
  const basicId = filteredBasic.map((value) => value.id);
  const standardId = filteredStandard.map((value) => value.id);
  const premiumId = filteredPremium.map((value) => value.id);
  const handleBasic = () => {
    let data = {
      seller_id: singleGigDetail?.user?.id,
      gig_id: singleGigDetail?.id,
      package_id: basicId[0],
      status: "Active",
    };
    navigate(
      "/order/payment?seller_id=" +
        singleGigDetail?.user?.id +
        "&gig_id=" +
        singleGigDetail?.id +
        "&package_id=" +
        basicId[0]
    );
    // dispatch(OrderCreate(data, handleResponse))
  };
  const handleStandard = () => {
    let data = {
      seller_id: singleGigDetail?.user?.id,
      gig_id: singleGigDetail?.id,
      package_id: standardId[0],
      status: "Active",
    };
    navigate(
      "/order/payment?seller_id=" +
        singleGigDetail?.user?.id +
        "&gig_id=" +
        singleGigDetail?.id +
        "&package_id=" +
        standardId[0]
    );

    // dispatch(OrderCreate(data, handleResponse))
  };
  const handlePremium = () => {
    let data = {
      seller_id: singleGigDetail?.user?.id,
      gig_id: singleGigDetail?.id,
      package_id: premiumId[0],
      status: "Active",
    };
    navigate(
      "/order/payment?seller_id=" +
        singleGigDetail?.user?.id +
        "&gig_id=" +
        singleGigDetail?.id +
        "&package_id=" +
        premiumId[0]
    );

    // dispatch(OrderCreate(data, handleResponse))
  };

  // ============ Recomended for you ================
  useEffect(() => {
    dispatch(geAllGigs());
  }, [dispatch]);
  console.log(gigsDetail, "=====================recommended gig");
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
  // const RecomendedGigs = gigsDetail.map((category) => category.gigs.filter((innerValue)=> innerValue.category_id === singleGigDetail.category_id))

  const RecomendedGigsArray = gigsDetail.flatMap(function (object) {
    return object.gigs.filter(function (gig) {
      // Yahan aap apni filtering logic add kar sakte hain, jaise category_id ke adhar par filter karna.
      return gig.category_id === singleGigDetail.category_id; // Is example mein, category_id 2 ke liye filter kiya gaya hai.
    });
  });
  console.log(RecomendedGigsArray);
  const settings = {
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
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {isPreLoading ? (
        <div className="preloder text-center d-flex  align-items-center justify-content-center ">
          <div>
            <img src={Loader} width={200} height={200} />
            <h2 className="cocon fw-bold ">Loading..</h2>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          <Navbar FirstNav="none" />
          <div className="container mt-5 ">
            <div className="row mt-5">
              <div className="col-lg-8 col-12">
                <div className="d-flex justify-content-between flex-wrap poppins align-items-center">
                  <div className="colororing d-flex align-items-center">
                    <p className="mb-0 font-16">
                      {singleGigDetail?.category?.name}
                    </p>
                    <span>
                      {" "}
                      <img src={icone} className="mx-3" alt="" />
                    </span>
                    <p className=" mb-0 font-16">
                      {singleGigDetail?.subcategory?.name}
                    </p>
                  </div>
                  {/* <div className="text-end">
                    <Button className="btn-stepper poppins px-3 mt-lg-0 mt-md-0 mt-sm-0 mt-3  font-16">
                      Invite to Job
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="row  mt-3 justify-content-center">
              <div className="col-lg-8 col-12 mt-4">
                <div className="Revie p-3 ">
                  <div>
                    <h3 className="font-24 poppins">
                      {singleGigDetail?.title}
                    </h3>
                  </div>
                  <div className="d-flex align-items-lg-center align-items-md-center align-items-start inter mb-lg-0 mb-3">
                    <img
                      src={singleGigDetail?.user?.image}
                      className="rounded-circle "
                      width={30}
                      height={30}
                      alt="w8"
                    />
                    <div className="d-flex ms-2 align-items-center flex-wrap">
                      <div>
                        <h6
                          className="ms-2 font-14 mb-0 inter cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/profileOtherPerson/${singleGigDetail.user?.fname}`,
                              { state: { userId: singleGigDetail.user_id } }
                            )
                          }
                        >
                          {singleGigDetail?.user?.fname}
                        </h6>
                      </div>
                      <div>
                        <p className="graycolor font-14 ms-2 mb-0">
                          New Seller |
                        </p>
                      </div>

                      <div className="d-flex  flex-wrap">
                        <img
                          src={ster}
                          width={14}
                          height={14}
                          className="ms-2"
                          alt=""
                        />
                        <img
                          src={ster}
                          width={14}
                          height={14}
                          className="ms-2"
                          alt=""
                        />
                        <img
                          src={ster}
                          width={14}
                          height={14}
                          className="ms-2"
                          alt=""
                        />
                        <img
                          src={ster}
                          width={14}
                          height={14}
                          className="ms-2"
                          alt=""
                        />
                        <img
                          src={ster}
                          width={14}
                          height={14}
                          className="ms-2"
                          alt=""
                        />
                        <p className="ms-2 font-14 colororing  mb-0">0</p>
                        <p className="ms-2 font-14  graycolor mb-0">
                          {/* <span>3 Orders in Queue</span> */}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="main-slider-img">
                      <Slider
                        {...settingsMain}
                        ref={(slider) => setNav1(slider)}
                      >
                        <div className="inner-slider-img w-100 rounded-4">
                          <img
                            className="w-100 rounded-4 h-100 object-fit-cover"
                            src={singleGigDetail?.media?.image1}
                            alt="w8"
                          />
                        </div>
                        <div className="inner-slider-img w-100 rounded-4">
                          <img
                            className="w-100 rounded-4 h-100 object-fit-cover"
                            src={singleGigDetail?.media?.image2}
                            alt="w8"
                          />
                        </div>
                        {/* {singleGigDetail.media.image3 && */}
                        <div className="inner-slider-img w-100 rounded-4">
                          <img
                            className="w-100 rounded-4 h-100 object-fit-cover"
                            src={singleGigDetail?.media?.image3}
                            alt="w8"
                          />
                        </div>
                        {/* } */}

                        <div className="inner-slider-img w-100 rounded-4">
                          <video
                            className="w-100 h-100 object-fit-cover rounded-4"
                            controls
                          >
                            <source
                              src={singleGigDetail?.media?.video}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </Slider>
                    </div>
                    <div className="main-slider-thumbnail-img mt-2 ">
                      <Slider
                        {...settingsThumbs}
                        ref={(slider) => setNav2(slider)}
                      >
                        <div className="inner-slider-thumbnail-img   rounded-3">
                          <img
                            className="w-100 h-100 rounded-3 object-fit-cover  cursor-pointer
                        "
                            src={singleGigDetail?.media?.image1}
                            alt="w8"
                          />
                        </div>
                        <div className="inner-slider-thumbnail-img   rounded-3">
                          <img
                            className="w-100 h-100 rounded-3 object-fit-cover  cursor-pointer"
                            src={singleGigDetail?.media?.image2}
                            alt="w8"
                          />
                        </div>
                        {/* {singleGigDetail.media.image3 && */}
                        <div className="inner-slider-thumbnail-img   rounded-3">
                          <img
                            className="w-100 h-100 rounded-3 object-fit-cover cursor-pointer"
                            src={singleGigDetail?.media?.image3}
                            alt="w8"
                          />
                        </div>
                        {/* } */}

                        <div className="inner-slider-thumbnail-img rounded-3 position-relative">
                          <BsFillPlayCircleFill
                            className="thumb-play cursor-pointer"
                            size={20}
                          />
                          <video className="w-100 object-fit-cover h-100 rounded-3  cursor-pointer">
                            <source
                              src={singleGigDetail?.media?.video}
                              type="video/mp4"
                            />
                          </video>
                        </div>
                      </Slider>
                    </div>
                  </div>
                  <div className="mt-2 poppins">
                    <h6 className="font-16 font-700 ">About This Gig</h6>
                    <p className="font-14 mb-1 dark-gray ">
                      {(function (html) {
                        const tempElement = document.createElement("div");
                        tempElement.innerHTML = html;
                        return (
                          tempElement.textContent || tempElement.innerText || ""
                        );
                      })(singleGigDetail?.description)}
                    </p>
                    {/* <p className="font-14 dark-gray ">
                  We create Basic to High-End Promotion Videos , delivering the
                  highest quality work.
                </p>
                <p className="font-14 dark-gray ">
                  We can create all kinds of promotion videos .. We create the
                  video according to your requirements. we can discuss
                  everything and can arrange things according to your
                  requirements.
                </p>
                <p className="font-14 dark-gray ">
                  Our main focus is customer satisfaction, We will ensure 100%
                  customer satisfaction. We highly concerned with the Premium
                  Quality while providing the affordable service.
                </p>
                <p className="font-14 fw-bold dark-gray ">
                  We consider each project as a project for us and deliver the
                  highest quality work.
                </p>
                <p className="font-14 dark-gray fw-bold ">
                  {" "}
                  So why are you still waiting, contact us and we can start the
                  work.
                </p>
                <p className="font-14 dark-gray fw-bold ">
                  What do I need in order to start work?
                </p>
                <p className="font-14 ">Logo</p>
                <p className="font-14 ">Text Descriptions</p>
                <p className="font-14 ">
                  Video (If any related stock videos if you have only )
                </p>
                <p className="font-14 ">Website Address</p>
                <p className="font-14 fw-bold dark-gray">FOR CUSTOM ORDERS</p>
                <p className="font-14">
                  If you want to create totally unique Customized video with
                  Voice over (men/women voice)..Prices Vary. Just Contact US to
                  discuss further.
                </p>
                <p className="font-14 fw-bold dark-gray">
                  Don't Search any more gigs, you will not find this kind of
                  service anywhere. <br /> Just contact us and see the
                  difference
                </p> */}
                    <hr
                      className="border-0 mt-1 mb-1"
                      style={{
                        height: "1.5px",
                        opacity: "50%",
                        backgroundColor: "#667085",
                      }}
                    />{" "}
                    <p className="font-14 takegraycolor mb-0 poppins mt-3">
                      Product type
                    </p>
                    <p className="font-14 poppins ">Website</p>
                    <div className=" mt-lg-5">
                      <h3 className="font-20 mt-4 fw-bold">About The Seller</h3>
                      <div className="d-flex">
                        <div>
                          <img
                            src={singleGigDetail?.user?.image}
                            className="rounded-circle "
                            width={100}
                            height={100}
                            alt="w8"
                          />
                        </div>
                        <div className="ms-3">
                          <p className=" font-14 fw-bold dark-gray mb-2">
                            {singleGigDetail?.user?.fname}
                          </p>
                          {/* <p className="font-14 takegraycolor mb-0">
                            Freelancer
                          </p> */}
                          <div className="d-flex">
                            <div>
                              <AiFillStar
                                size={22}
                                color="rgba(253, 176, 34, 1)"
                              />
                              <AiFillStar
                                size={22}
                                color="rgba(253, 176, 34, 1)"
                              />
                              <AiFillStar
                                size={22}
                                color="rgba(253, 176, 34, 1)"
                              />
                              <AiFillStar
                                size={22}
                                color="rgba(253, 176, 34, 1)"
                              />
                              <AiFillStar
                                size={22}
                                color="rgba(253, 176, 34, 1)"
                              />
                            </div>
                            <p className="ms-2 fw-medium mb-0 colororing ">
                              (0)
                            </p>
                            {/* )} */}
                            {/* <p className="ms-2 mb-0 takegraycolor">(974)</p> */}
                          </div>
                          <Button className="btn-stepper-border poppins px-3 mt-2  font-16"
                           onClick={() => handleStartChat(singleGigDetail?.user)}
                          >
                            Contact Me
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-between ">
                      <div className="col-6 text-start">
                        <p className="font-14 takegraycolor mb-0">From</p>
                        <p className="font-14 fw-bold dark-gray">
                          {singleGigDetail?.user?.country}
                        </p>
                        <p className="font-14 takegraycolor mb-0">
                          Avg. response time
                        </p>
                        <p className="font-14 fw-bold dark-gray">
                          {/* {joinedTime.days > 0 && `${joinedTime.days} day${joinedTime.days !== 1 ? 's' : ''} `} */}
                          {joinedTime.hours > 0 &&
                            `${joinedTime.hours} hour${
                              joinedTime.hours !== 1 ? "s" : ""
                            } `}
                          {/* {joinedTime.minutes > 0 && `${joinedTime.minutes} minute${joinedTime.minutes !== 1 ? 's' : ''}`} */}
                          ago
                        </p>
                        <p className="font-14 takegraycolor mb-0">Languages</p>
                        <p className="font-14 fw-bold dark-gray">English</p>
                      </div>
                      <div className="col-6">
                        <p className="font-14 takegraycolor mb-0">
                          Member since
                        </p>
                        <p className="font-14 fw-bold dark-gray">
                          {month} {year}
                        </p>
                        <p className="font-14 takegraycolor mb-0">
                          Last delivery
                        </p>
                        <p className="font-14 fw-bold dark-gray">
                          about 3 hours
                        </p>
                      </div>
                    </div>
                    <hr
                      className="border-0 mt-1 mb-1"
                      style={{
                        height: "1.5px",
                        opacity: "50%",
                        backgroundColor: "#667085",
                      }}
                    />{" "}
                    {/* <div>
                      <p className="font-14 takegraycolor">
                        At Airbluesoft Premium Digital Studio we create all
                        kinds of creative videos, specializing in Creating
                        Promos( Website, Apps, Fashion, Real Estate, Youtube,
                        NFT) and all other promos and all instructional videos.
                      </p>
                      <p className="font-14 takegraycolor">
                        We Create Basic To High-End Videos.
                      </p>
                      <p className="font-14 takegraycolor mb-0">
                        {" "}
                        Creativity Beyond the Limits.
                      </p>
                      <p className="font-14 takegraycolor">
                        {" "}
                        -Airbluesoft Premium Digital
                      </p>
                    </div> */}
                    <h5 className="font-20 fw-bold mt-4 inter">
                      Rating & Reviews
                    </h5>
                    <div className="row justify-content-between mt-4">
                      <div className="col-lg-5 col-md-5 col-sm-6 col-12 pe-lg-4">
                        <div className="cardrating text-center p-4">
                          <img src={star6} alt="" />
                          <h3
                            className="mt-2 font-28 fw-semibold"
                            style={{ opacity: "50%" }}
                          >
                            {0} out of 5
                          </h3>
                          <p className="mt-2 mb-0">Top Raiting</p>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-4">
                        <div className=" gig-rating-rewies">
                          <div className="row align-items-center">
                            <div className="col-2">
                              <p className="mb-0 font-14 takegraycolor">
                                5&nbsp;Stars
                              </p>
                            </div>
                            <div className="col-10">
                              <div
                                className="progress w-100 "
                                style={{ height: "8px" }}
                                role="progressbar"
                                aria-label="Warning example"
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: `${overallAverageFive}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center mt-4">
                            <div className="col-2">
                              <p className="mb-0 font-14 takegraycolor">
                                4&nbsp;Stars
                              </p>
                            </div>
                            <div className="col-10">
                              <div
                                className="progress w-100 "
                                style={{ height: "8px" }}
                                role="progressbar"
                                aria-label="Warning example"
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: `${overallAverageFour}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center mt-4">
                            <div className="col-2">
                              <p className="mb-0 font-14 takegraycolor">
                                3&nbsp;Stars
                              </p>
                            </div>
                            <div className="col-10">
                              <div
                                className="progress w-100 "
                                style={{ height: "8px" }}
                                role="progressbar"
                                aria-label="Warning example"
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                <div
                                  className="progress-bar "
                                  style={{ width: `${overallAverageThree}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {singleGigDetail?.rating?.map((value, index) => (
                      <div className="mt-3" key={index}>
                        <div className="d-flex justify-content-between mt-5">
                          <div className="d-flex">
                            <div>
                              <img
                                src={value.user.image}
                                className="rounded-circle "
                                width={50}
                                height={50}
                                alt="w8"
                              />
                            </div>
                            <p className="ms-2 font-16 fw-medium">
                              {value.user.name}
                            </p>
                          </div>
                        </div>
                        <p className="mb-0 font-16 mt-3 takegraycolor text-capitalize">
                          {value.comments}
                        </p>
                        <div className="d-flex justify-content-end align-items-center">
                          <img src={timepes} width={20} height={20} alt="w8" />
                          <p className="font-14 ms-1 fw-medium takegraycolor mb-0  ">
                            {formatDistanceToNow(
                              new Date(value.user.created_at),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12 mt-4 gigi-tabs poppins">
                <div className="Revie container-fluid pt-0 mt-1">
                  <ul
                    className="nav nav-pills mb-3 row"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item col-4 px-0" role="presentation">
                      <button
                        className="nav-link pt-3 pb-3 active w-100"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Basic
                      </button>
                    </li>
                    <li className="nav-item col-4 px-0" role="presentation">
                      <button
                        className="nav-link  pt-3 pb-3 w-100"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Standard
                      </button>
                    </li>
                    <li className="nav-item col-4 px-0" role="presentation">
                      <button
                        className="nav-link w-100   pt-3 pb-3"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Premium
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                      tabIndex={0}
                    >
                      <div>
                        <div className="d-flex justify-content-between poppins">
                          <div>
                            <h6
                              className="font-16 fw-semibold"
                              style={{ color: "#404145" }}
                            >
                              BASIC PROMO
                            </h6>
                          </div>
                          <div>
                            <h6
                              className="graycolor font-16 fw-semibold"
                              style={{ color: "#404145" }}
                            >
                              {filteredBasic.map((value) => value.total)}
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="font-14 inter takegraycolor">
                            {(function (html) {
                              const tempElement = document.createElement("div");
                              tempElement.innerHTML = html;
                              return (
                                tempElement.textContent ||
                                tempElement.innerText ||
                                ""
                              );
                            })(filteredBasic.map((value) => value.title))}
                          </p>
                        </div>
                        <div className="d-flex graycolor mt-2">
                          <div className="ms-1 takegraycolor font-14 fw-semibold">
                            <p>
                              <BiTime className="me-2" size={16} />
                              {filteredBasic.map(
                                (value) => value.delivery_time
                              )}{" "}
                              Days Delivery
                            </p>
                          </div>
                          <div className="ms-4 takegraycolor font-14 fw-semibold">
                            <p>
                              <TfiReload className="me-2" size={16} />
                              {filteredBasic.map(
                                (value) => value.ravision
                              )}{" "}
                              Revision
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 8 captions
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 5
                            screenshots
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className=" me-3" color="#95979D" /> Screen
                            recording
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> Add logo
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className=" me-3" color="#95979D" />{" "}
                            Dynamic transitions
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 30 seconds
                            running time
                          </p>
                        </div>
                        <div>
                          <Button
                            className="btn-stepper poppins w-100 font-16"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasBasic"
                            aria-controls="offcanvasBasic"
                          >
                            {" "}
                            Continue
                          </Button>

                          <Button className="btn-stepper-border poppins w-100 mt-3 font-16"
                              onClick={() => handleStartChat(singleGigDetail?.user)}
                        disabled={creatingConversation}
                          >
                            Contact with sellar
                          </Button>
                          <div
                            className="offcanvas offcanvas-end p-3"
                            style={{ width: "45%" }}
                            tabIndex={-1}
                            id="offcanvasBasic"
                            aria-labelledby="offcanvasBasicLabel"
                          >
                            <div className="offcanvas-header">
                              <h5
                                class="offcanvas-title"
                                id="offcanvasRightLabel"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                                style={{ cursor: "pointer" }}
                              >
                                <BsChevronLeft className="colororing" />
                              </h5>
                            </div>
                            <div className="offcanvas-body pe-0 ">
                              <h6
                                className="font-28 fw-semibold"
                                style={{ color: "#404145" }}
                              >
                                Service Details
                              </h6>
                              <p className="frelancer-ofcanva-text poppins mt-3 w-100 mb-0 font-18 fw-medium text-center p-3 mt-2">
                                Basic
                              </p>
                              <div className="appept p-3">
                                <div className="d-flex justify-content-between poppins mt-2 mb-0">
                                  <div>
                                    <h6
                                      className="font-16 fw-semibold"
                                      style={{ color: "#404145" }}
                                    >
                                      BASIC PROMO
                                    </h6>
                                  </div>
                                  <div>
                                    <h6
                                      className="graycolor font-16 fw-semibold"
                                      style={{ color: "#404145" }}
                                    >
                                      {filteredBasic.map(
                                        (value) => value.total
                                      )}
                                    </h6>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="font-14 inter takegraycolor">
                                    {(function (html) {
                                      const tempElement =
                                        document.createElement("div");
                                      tempElement.innerHTML = html;
                                      return (
                                        tempElement.textContent ||
                                        tempElement.innerText ||
                                        ""
                                      );
                                    })(
                                      filteredBasic.map((value) => value.title)
                                    )}
                                  </p>
                                </div>
                                <div className="d-flex graycolor mt-2">
                                  <div className="ms-1 takegraycolor font-14 fw-semibold">
                                    <p>
                                      <BiTime className="me-2" size={16} />
                                      {filteredBasic.map(
                                        (value) => value.delivery_time
                                      )}{" "}
                                      Days Delivery
                                    </p>
                                  </div>
                                  <div className="ms-4 takegraycolor font-14 fw-semibold">
                                    <p>
                                      <TfiReload className="me-2" size={16} />
                                      {filteredBasic.map(
                                        (value) => value.ravision
                                      )}{" "}
                                      Revision
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 8
                                    captions
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 5
                                    screenshots
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck
                                      className=" me-3"
                                      color="#95979D"
                                    />{" "}
                                    Screen recording
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> Add
                                    logo
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck
                                      className=" me-3"
                                      color="#95979D"
                                    />{" "}
                                    Dynamic transitions
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 30
                                    seconds running time
                                  </p>
                                </div>
                                <div>
                                  <Button
                                    onClick={handleBasic}
                                    className="btn-stepper poppins w-100 font-16"
                                  >
                                    {" "}
                                    Procees to checkout
                                  </Button>
                                  <Button className="btn-stepper-border poppins w-100 mt-3 font-16">
                                    Contact with sellar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                      tabIndex={0}
                    >
                      <div>
                        <div className="d-flex justify-content-between poppins">
                          <div>
                            <h6
                              className="font-16 fw-semibold"
                              style={{ color: "#404145" }}
                            >
                              BASIC PROMO
                            </h6>
                          </div>
                          <div>
                            <h6
                              className="graycolor font-16 fw-semibold"
                              style={{ color: "#404145" }}
                            >
                              {filteredStandard.map((value) => value.total)}
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="font-14 inter takegraycolor">
                            {(function (html) {
                              const tempElement = document.createElement("div");
                              tempElement.innerHTML = html;
                              return (
                                tempElement.textContent ||
                                tempElement.innerText ||
                                ""
                              );
                            })(filteredStandard.map((value) => value.title))}
                          </p>
                        </div>
                        <div className="d-flex graycolor mt-2">
                          <div className="ms-1 takegraycolor font-14 fw-semibold">
                            <p>
                              <BiTime className="me-2" size={16} />
                              {filteredStandard.map(
                                (value) => value.delivery_time
                              )}{" "}
                              Days Delivery
                            </p>
                          </div>
                          <div className="ms-4 takegraycolor font-14 fw-semibold">
                            <p>
                              <TfiReload className="me-2" size={16} />
                              {filteredStandard.map(
                                (value) => value.ravision
                              )}{" "}
                              Revision
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 8 captions
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 5
                            screenshots
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className=" me-3" color="#95979D" /> Screen
                            recording
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> Add logo
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className=" me-3" color="#95979D" />{" "}
                            Dynamic transitions
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 30 seconds
                            running time
                          </p>
                        </div>
                        <div>
                          <Button
                            className="btn-stepper poppins w-100 font-16"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasStander"
                            aria-controls="offcanvasBasic"
                          >
                            {" "}
                            Continue
                          </Button>

                          <Button className="btn-stepper-border poppins w-100 mt-3 font-16">
                            Contact with sellar
                          </Button>
                          <div
                            className="offcanvas offcanvas-end p-3"
                            style={{ width: "45%" }}
                            tabIndex={-1}
                            id="offcanvasStander"
                            aria-labelledby="offcanvasStanderLabel"
                          >
                            <div className="offcanvas-header">
                              <h5
                                class="offcanvas-title"
                                id="offcanvasRightLabel"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                                style={{ cursor: "pointer" }}
                              >
                                <BsChevronLeft className="colororing" />
                              </h5>
                            </div>
                            <div className="offcanvas-body pe-0">
                              <h6
                                className="font-28 fw-semibold"
                                style={{ color: "#404145" }}
                              >
                                Service Details
                              </h6>
                              <p className="frelancer-ofcanva-text poppins mt-3 w-100 mb-0 font-18 fw-medium text-center p-3 mt-2">
                                Standard
                              </p>
                              <div className="appept p-3">
                                <div className="d-flex justify-content-between poppins mt-2 mb-0">
                                  <div>
                                    <h6
                                      className="font-16 fw-semibold"
                                      style={{ color: "#404145" }}
                                    >
                                      BASIC PROMO
                                    </h6>
                                  </div>
                                  <div>
                                    <h6
                                      className="graycolor font-16 fw-semibold"
                                      style={{ color: "#404145" }}
                                    >
                                      {filteredStandard.map(
                                        (value) => value.total
                                      )}
                                    </h6>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="font-14 inter takegraycolor">
                                    {(function (html) {
                                      const tempElement =
                                        document.createElement("div");
                                      tempElement.innerHTML = html;
                                      return (
                                        tempElement.textContent ||
                                        tempElement.innerText ||
                                        ""
                                      );
                                    })(
                                      filteredStandard.map(
                                        (value) => value.title
                                      )
                                    )}
                                  </p>
                                </div>
                                <div className="d-flex graycolor mt-2">
                                  <div className="ms-1 takegraycolor font-14 fw-semibold">
                                    <p>
                                      <BiTime className="me-2" size={16} />
                                      {filteredStandard.map(
                                        (value) => value.delivery_time
                                      )}{" "}
                                      Days Delivery
                                    </p>
                                  </div>
                                  <div className="ms-4 takegraycolor font-14 fw-semibold">
                                    <p>
                                      <TfiReload className="me-2" size={16} />
                                      {filteredStandard.map(
                                        (value) => value.ravision
                                      )}{" "}
                                      Revision
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 8
                                    captions
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 5
                                    screenshots
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck
                                      className=" me-3"
                                      color="#95979D"
                                    />{" "}
                                    Screen recording
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> Add
                                    logo
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck
                                      className=" me-3"
                                      color="#95979D"
                                    />{" "}
                                    Dynamic transitions
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 30
                                    seconds running time
                                  </p>
                                </div>
                                <div>
                                  <Button
                                    onClick={handleStandard}
                                    className="btn-stepper poppins w-100 font-16"
                                  >
                                    {" "}
                                    Procees to checkout
                                  </Button>
                                  <Button className="btn-stepper-border poppins w-100 mt-3 font-16">
                                    Contact with sellar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                      tabIndex={0}
                    >
                      <div>
                        <div className="d-flex justify-content-between poppins">
                          <div>
                            <h6
                              className="font-16 fw-semibold"
                              style={{ color: "#404145" }}
                            >
                              BASIC PROMO
                            </h6>
                          </div>
                          <div>
                            <h6
                              className="graycolor font-16 fw-semibold"
                              style={{ color: "#404145" }}
                            >
                              {filteredPremium.map((value) => value.total)}
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="font-14 inter takegraycolor">
                            {(function (html) {
                              const tempElement = document.createElement("div");
                              tempElement.innerHTML = html;
                              return (
                                tempElement.textContent ||
                                tempElement.innerText ||
                                ""
                              );
                            })(filteredPremium.map((value) => value.title))}
                          </p>
                        </div>
                        <div className="d-flex graycolor mt-2">
                          <div className="ms-1 takegraycolor font-14 fw-semibold">
                            <p>
                              <BiTime className="me-2" size={16} />
                              {filteredPremium.map(
                                (value) => value.delivery_time
                              )}{" "}
                              Days Delivery
                            </p>
                          </div>
                          <div className="ms-4 takegraycolor font-14 fw-semibold">
                            <p>
                              <TfiReload className="me-2" size={16} />
                              {filteredPremium.map(
                                (value) => value.ravision
                              )}{" "}
                              Revision
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 8 captions
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 5
                            screenshots
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className=" me-3" color="#95979D" /> Screen
                            recording
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> Add logo
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className=" me-3" color="#95979D" />{" "}
                            Dynamic transitions
                          </p>
                          <p className="font-12 " style={{ color: "#95979D" }}>
                            <FaCheck className="colororing me-3" /> 30 seconds
                            running time
                          </p>
                        </div>
                        <div>
                          <Button
                            className="btn-stepper poppins w-100 font-16"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasPremium"
                            aria-controls="offcanvasBasic"
                          >
                            {" "}
                            Continue
                          </Button>

                          <Button className="btn-stepper-border poppins w-100 mt-3 font-16">
                            Contact with sellar
                          </Button>
                          <div
                            className="offcanvas offcanvas-end p-3"
                            style={{ width: "45%" }}
                            tabIndex={-1}
                            id="offcanvasPremium"
                            aria-labelledby="offcanvasPremiumLabel"
                          >
                            <div className="offcanvas-header">
                              <h5
                                class="offcanvas-title"
                                id="offcanvasRightLabel"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                                style={{ cursor: "pointer" }}
                              >
                                <BsChevronLeft className="colororing" />
                              </h5>
                            </div>
                            <div className="offcanvas-body pe-0">
                              <h6
                                className="font-28 fw-semibold"
                                style={{ color: "#404145" }}
                              >
                                Service Details
                              </h6>
                              <p className="frelancer-ofcanva-text poppins mt-3 w-100 mb-0 font-18 fw-medium text-center p-3 mt-2">
                                Premium
                              </p>
                              <div className="appept p-3">
                                <div className="d-flex justify-content-between poppins mt-2 mb-0">
                                  <div>
                                    <h6
                                      className="font-16 fw-semibold"
                                      style={{ color: "#404145" }}
                                    >
                                      BASIC PROMO
                                    </h6>
                                  </div>
                                  <div>
                                    <h6
                                      className="graycolor font-16 fw-semibold"
                                      style={{ color: "#404145" }}
                                    >
                                      {filteredPremium.map(
                                        (value) => value.total
                                      )}
                                    </h6>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="font-14 inter takegraycolor">
                                    {(function (html) {
                                      const tempElement =
                                        document.createElement("div");
                                      tempElement.innerHTML = html;
                                      return (
                                        tempElement.textContent ||
                                        tempElement.innerText ||
                                        ""
                                      );
                                    })(
                                      filteredPremium.map(
                                        (value) => value.title
                                      )
                                    )}
                                  </p>
                                </div>
                                <div className="d-flex graycolor mt-2">
                                  <div className="ms-1 takegraycolor font-14 fw-semibold">
                                    <p>
                                      <BiTime className="me-2" size={16} />
                                      {filteredPremium.map(
                                        (value) => value.delivery_time
                                      )}{" "}
                                      Days Delivery
                                    </p>
                                  </div>
                                  <div className="ms-4 takegraycolor font-14 fw-semibold">
                                    <p>
                                      <TfiReload className="me-2" size={16} />
                                      {filteredPremium.map(
                                        (value) => value.ravision
                                      )}{" "}
                                      Revision
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 8
                                    captions
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 5
                                    screenshots
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck
                                      className=" me-3"
                                      color="#95979D"
                                    />{" "}
                                    Screen recording
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> Add
                                    logo
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck
                                      className=" me-3"
                                      color="#95979D"
                                    />{" "}
                                    Dynamic transitions
                                  </p>
                                  <p
                                    className="font-12 "
                                    style={{ color: "#95979D" }}
                                  >
                                    <FaCheck className="colororing me-3" /> 30
                                    seconds running time
                                  </p>
                                </div>
                                <div>
                                  <Button
                                    onClick={handlePremium}
                                    className="btn-stepper poppins w-100 font-16"
                                  >
                                    {" "}
                                    Procees to checkout
                                  </Button>
                                  <Button className="btn-stepper-border poppins w-100 mt-3 font-16">
                                    Contact with sellar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {RecomendedGigsArray.length >= 3 && (
                <div>
                  <h3 className="font-28 takegraycolor cocon mt-5">
                    Recomended for you
                  </h3>
                  <div className="container position-relative  mb-5 gigs-slider mt-4">
                    <div className="row">
                      <div className="gigs-slider-bg"></div>
                      <Slider {...settings}>
                        {RecomendedGigsArray.map((innerValue, index) => (
                          <div className="  mt-4" key={index}>
                            <div className="cursor-pointer h-100">
                              <div className="h-100">
                                <Card
                                  gigsImg={
                                    innerValue.media &&
                                    (innerValue.media.image1 == null
                                      ? innerValue.media.image2 == null
                                        ? innerValue.media.image3
                                        : innerValue.media.image2
                                      : innerValue.media.image1)
                                  }
                                  minHeight="50px"
                                  heading={
                                    innerValue?.title?.substring(0, 50) + "..."
                                  }
                                  phara={stripHtmlTags(
                                    innerValue?.description?.substring(0, 100) +
                                      "..."
                                  )}
                                  star1={
                                    parseInt(
                                      innerValue?.rating
                                        .map((value) => value.ratings)
                                        .filter((value) => !isNaN(value))
                                        .reduce(
                                          (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                          0
                                        )
                                    ) >= 1
                                      ? "#F16336"
                                      : "#D4D4D4"
                                  }
                                  star2={
                                    parseInt(
                                      innerValue?.rating
                                        .map((value) => value.ratings)
                                        .filter((value) => !isNaN(value))
                                        .reduce(
                                          (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                          0
                                        )
                                    ) >= 2
                                      ? "#F16336"
                                      : "#D4D4D4"
                                  }
                                  star3={
                                    parseInt(
                                      innerValue?.rating
                                        .map((value) => value.ratings)
                                        .filter((value) => !isNaN(value))
                                        .reduce(
                                          (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                          0
                                        )
                                    ) >= 3
                                      ? "#F16336"
                                      : "#D4D4D4"
                                  }
                                  star4={
                                    parseInt(
                                      innerValue?.rating
                                        .map((value) => value.ratings)
                                        .filter((value) => !isNaN(value))
                                        .reduce(
                                          (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                          0
                                        )
                                    ) >= 4
                                      ? "#F16336"
                                      : "#D4D4D4"
                                  }
                                  star5={
                                    parseInt(
                                      innerValue?.rating
                                        .map((value) => value.ratings)
                                        .filter((value) => !isNaN(value))
                                        .reduce(
                                          (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                          0
                                        )
                                    ) >= 5
                                      ? "#F16336"
                                      : "#D4D4D4"
                                  }
                                  projectNumber="0"
                                  price={innerValue.package[0]?.total}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              )}
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
          <Footer />
        </>
      )}

      <style>
        {" "}
        {`.offcanvas-body::-webkit-scrollbar {
                    width: 20px;

                  }
     
                `}
      </style>
    </>
  );
};

export default FreelancersGigs;
