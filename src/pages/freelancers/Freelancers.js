import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import videoImg from "../../assets/blogVideoImg.webp";
import Loader from "../../assets/LoaderImg.gif";
import NewWay from "../../assets/NewWay.webp";
import search from "../../assets/searchbar.webp";
import video2 from "../../assets/video/Freelance3.mp4";
import video3 from "../../assets/video/Freelance8.mp4";
import video1 from "../../assets/video/Freelance9.mp4";
import videoPlay from "../../assets/VideoPlay.webp";
import ExpertCard from "../../components/ExpertCard"; // New component import
import GigCard from "../../components/GigCard";
import Navbar from "../../components/Navbar";
import HireExpert from "../../pages/HireExpert";
import { geAllGigs } from "../../redux/slices/allGigsSlice";
import { getBds } from "../../redux/slices/buyerRequestSlice";
import { getCategory } from "../../redux/slices/gigsSlice";
import { getAllFreelancers } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "../../redux/store/store";
import { paginateArray } from "../../utils/helpers";

// UserCard component for displaying BDs and Experts
const UserCard = ({ user, type, canOrder, userRole }) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  const handleContact = () => {
    if (canOrder) {
      navigate(`/order/${user.id}`);
    }
  };

  // Get display name based on user data
  const displayName = user.name || user.username || (type === "bds" ? "Business Developer" : "Expert");

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-3">
            <div className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                 style={{width: '50px', height: '50px', fontSize: '18px', fontWeight: 'bold'}}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h5 className="card-title mb-1 font-18 fw-bold">
                {displayName}
              </h5>
              <p className="text-muted mb-0 font-14">
                {type === "bds" ? "Business Developer" : "Expert"}
              </p>
            </div>
          </div>
          
          <p className="card-text font-14 text-muted mb-3" 
             style={{height: '60px', overflow: 'hidden'}}>
            {user.description || user.bio || "No description available"}
          </p>
          
          {user.skills && (
            <div className="mb-3">
              <small className="text-muted">Skills:</small>
              <p className="font-12 text-primary mb-0">
                {user.skills.length > 50 ? `${user.skills.substring(0, 50)}...` : user.skills}
              </p>
            </div>
          )}
          
          {user.rating && (
            <div className="d-flex align-items-center mb-3">
              <span className="text-warning me-1">★</span>
              <span className="font-14">{user.rating}</span>
              {user.reviews_count && (
                <span className="text-muted font-12 ms-1">({user.reviews_count} reviews)</span>
              )}
            </div>
          )}
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-primary btn-sm flex-fill"
              onClick={handleViewProfile}
            >
              View Profile
            </button>
            {canOrder ? (
              <button 
                className="btn btn-primary btn-sm flex-fill"
                onClick={handleContact}
              >
                {type === "bds" ? "Connect" : "Hire"}
              </button>
            ) : (
              <button 
                className="btn btn-secondary btn-sm flex-fill"
                disabled
              >
                Browse Only
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to strip HTML tags (safe for SSR)
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

const Freelancers = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [searchType, setSearchType] = useState("services");
  
  // Expert listing states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [expertDetail, setExpertDetail] = useState(null);
  const [expertModal, setExpertModal] = useState(false);
  
  const dispatch = useDispatch();
  const { gigsDetail, isLoading } = useSelector((state) => state.allGigs);
  const { userCategory } = useSelector((state) => state.gig);
  const { userList, isLoading: loading, getError: error } = useSelector((state) => state.user);
  const { userDetail, freelancers, isLoading: freelancersLoading } = useSelector((state) => state.user);
  const { bdList, bdListLoading } = useSelector((state) => state.buyer);
  const [showExperts, setShowExperts] = useState(false);
  const navigate = useNavigate();

  // Get user data safely
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("UserData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const UserData = getUserData();
  const userRole = userDetail?.role || UserData?.role || "client";

  // Memoized filtered data for experts based on search keyword
  const getExpertCurrentData = useCallback(() => {
    if (!freelancers?.data || freelancers.data.length === 0) return [];
    
    // First, filter only experts
    let experts = freelancers.data.filter(user => {
      const role = (user.role || "").toLowerCase();
      return role.includes("expert") || role.includes("freelancer");
    });

    if (searchKeyword.trim() === '') {
      return experts;
    }
    
    const keyword = searchKeyword.toLowerCase().trim();
    return experts.filter((item) => {
      const name = (item.name || item.username || "").toLowerCase();
      const description = (item.description || item.bio || "").toLowerCase();
      const skills = (item.skills || "").toLowerCase();
      const expertise = (item.expertise || "").toLowerCase();
      
      return (
        name.includes(keyword) ||
        description.includes(keyword) ||
        skills.includes(keyword) ||
        expertise.includes(keyword)
      );
    });
  }, [freelancers, searchKeyword]);

  // Memoized current data and total pages for experts
  const expertCurrentData = useMemo(() => getExpertCurrentData(), [getExpertCurrentData]);
  const totalPages = useMemo(() => Math.ceil(expertCurrentData.length / limit), [expertCurrentData.length, limit]);
  const paginatedExperts = useMemo(() => 
    paginateArray(expertCurrentData, limit, page), 
    [expertCurrentData, limit, page]
  );

  useEffect(() => {
    console.log('freelancers in freelancers page:', freelancers?.data);
  }, [freelancers]);
  
  // Define search options based on user role
  const getSearchOptions = useMemo(() => {
    const role = userRole.toLowerCase();
    
    if (role.includes("client")) {
      return [{ value: "services", label: "Search Services" }];
    }
    if (role.includes("bd") || role.includes("business_developer") || role.includes("bidder/company representative/middleman")) {
      return [
        { value: "services", label: "Search Services" },
        { value: "bds", label: "Search Business Developers" },
        { value: "experts", label: "Search Experts" }
      ];
    }
    if (role.includes("expert") || role.includes("expert/freelancer")) {
      return [
        { value: "services", label: "Browse Services" },
        { value: "experts", label: "Search Other Experts" }
      ];
    }
    
    return [{ value: "services", label: "Search Services" }];
  }, [userRole]);

  // Check if user can place orders
  const canPlaceOrders = useMemo(() => {
    const role = userRole.toLowerCase();
    return role.includes("client") || 
           role.includes("bd") || 
           role.includes("bidder/company representative/middleman") || 
           role.includes("bidder");
  }, [userRole]);

  // Fetch data based on user role
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      dispatch(geAllGigs());
      dispatch(getCategory());
      
      const role = userRole.toLowerCase();
      if (role.includes("bd") || role.includes("bidder/company representative/middleman") || role.includes("bidder") || role.includes("client")) {
        dispatch(getBds());
      }
      if (role.includes("bd") || role.includes("bidder/company representative/middleman") || role.includes("bidder") || role.includes("expert") || role.includes("freelancer")) {
        dispatch(getAllFreelancers());
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, userRole]);

  // Reset to first page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchKeyword, searchType]);

  // Event handlers for expert pagination
  const handleChangePagination = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const showExpertDetail = useCallback((data) => {
    setExpertDetail(data);
    setExpertModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setExpertModal(false);
    setExpertDetail(null);
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    // Services search
    if (searchType === "services") {
      if (!gigsDetail?.length) return [];

      return gigsDetail.map((category) => {
        let filteredGigs = category.gigs || [];

        if (selectCategory && selectCategory !== "All Categories") {
          filteredGigs = filteredGigs.filter(
            gig => gig.category_id?.toString() === selectCategory.toString()
          );
        }

        if (searchKeyword.trim()) {
          const keyword = searchKeyword.toLowerCase().trim();
          filteredGigs = filteredGigs.filter(gig => {
            const title = gig.title?.toLowerCase() || "";
            const description = stripHtmlTags(gig.description || "").toLowerCase();
            return title.includes(keyword) || description.includes(keyword);
          });
        }

        return {
          ...category,
          gigs: filteredGigs,
        };
      }).filter(category => category.gigs.length > 0);
    }

    // Business Developers search
    if (searchType === "bds") {
      if (!bdList?.length) return [];
      
      let filteredBds = [...bdList];
      
      if (searchKeyword.trim()) {
        const keyword = searchKeyword.toLowerCase().trim();
        filteredBds = filteredBds.filter(bd => {
          const name = (bd.name || bd.username || "").toLowerCase();
          const skills = (bd.skills || "").toLowerCase();
          return name.includes(keyword) || skills.includes(keyword);
        });
      }

      return [{
        id: "bds",
        name: "Business Developers",
        gigs: filteredBds.map(bd => ({
          ...bd,
          id: bd.id || bd.user_id,
          title: bd.name || bd.username || "Business Developer",
          description: bd.bio || bd.description || "Experienced Business Developer",
          skills: bd.skills || "",
          rating: bd.rating,
          reviews_count: bd.reviews_count,
          type: "bd"
        }))
      }];
    }

    // Experts search - handled separately now
    if (searchType === "experts") {
          setShowExperts(true);
    }

    return [];
  }, [gigsDetail, bdList, selectCategory, searchKeyword, searchType]);

  // Carousel autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = document.querySelector('[data-bs-slide="next"]');
      if (nextButton) nextButton.click();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
useEffect(() => {
  console.log('Freelancers state:', freelancers);
  console.log('Freelancers data:', freelancers?.data);
  console.log('Filtered experts:', getExpertCurrentData());
}, [freelancers, getExpertCurrentData]);
  // Event handlers
  const handleSearchSubmit = (e) => e.preventDefault();
  const handleCategoryChange = (e) => setSelectCategory(e.target.value);
  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchKeyword("");
    setSelectCategory("");
  };

  const getSearchPlaceholder = () => {
    switch (searchType) {
      case "bds": return "Search Business Developers...";
      case "experts": return "Search Experts...";
      default: return "Search services...";
    }
  };

  const getPageTitle = () => {
    const role = userRole.toLowerCase();
    
    if (role.includes("client")) return "Find the Perfect Service for Your Business";
    if (role.includes("bd") || role.includes("business_developer") || role.includes("bidder")) return "Connect with Services, BDs, and Experts";
    if (role.includes("expert") || role.includes("freelancer")) return "Explore Services and Connect with Peers";
    
    return "Discover Amazing Services";
  };

  // Loading states
  const isAnyLoading = isLoading || 
    (searchType === "bds" && bdListLoading) || 
    (searchType === "experts" && freelancersLoading);

  return (
    <>
      <Navbar FirstNav="none" />
      <div>
        <div className="container-fluid blogVideoSection py-lg-0 py-md-0 py-5">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade w-100 h-100 d-lg-block d-md-block d-none"
            style={{
              objectFit: "cover",
              position: "absolute",
              zIndex: "-1",
              objectPosition: "center",
              height: "inherit",
            }}
          >
            <div className="carousel-inner h-100">
              <div className="carousel-item active h-100">
                <div className="container-fluid p-0 poppins h-100">
                  <video
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    muted
                    loop
                    autoPlay
                  >
                    <source src={video1} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="carousel-item h-100">
                <div className="container-fluid p-0 poppins h-100">
                  <video
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    muted
                    loop
                    autoPlay
                  >
                    <source src={video2} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="carousel-item h-100">
                <div className="container-fluid p-0 poppins h-100">
                  <video
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    muted
                    loop
                    autoPlay
                  >
                    <source src={video3} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev d-none"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next d-none"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <h3 className="text-center fw-semibold font-38 poppins">
            {getPageTitle()}
          </h3>
          <p className="text-center mt-2 text-white-50">
            Welcome, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            {!canPlaceOrders && " (Browse Mode)"}
          </p>
        </div>
      </div>

      {/* MOBILE VERSION VIDEO SLIDER */}
      <div className="container-fluid mt-4 d-lg-none d-md-none d-block">
        <div className="row justify-content-center ">
          <div
            className="col-sm-10 col-12 mbl-videoModal position-relative mb-4 "
            data-bs-toggle="modal"
            data-bs-target="#videoModal"
          >
            <img
              src={videoPlay}
              className="video-play"
              width={80}
              height={80}
              alt="Play video"
            />
            <img src={videoImg} alt="Video thumbnail" className="w-100 rounded-4" />
          </div>

          <div
            className="modal fade"
            id="videoModal"
            tabIndex={-1}
            aria-labelledby="videoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content"
                style={{ background: "bg-transparent " }}
              >
                <div className="modal-body">
                  <video
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "cover" }}
                    controls
                    loop
                    autoPlay
                  >
                    <source src={video1} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER SECTION */}
      <div className="container my-4">
        <div className="row justify-content-end allgigs-field poppins">
          {getSearchOptions.length > 1 && (
            <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-3 mb-lg-0">
              <select
                className="form-select p-2 font-16 h-100"
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                {getSearchOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {searchType === "services" && (
            <div className="col-lg-3 col-md-4 col-sm-5 col-12">
              <select
                className="form-select p-2 font-16 h-100 me-le-3"
                value={selectCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {userCategory?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="col-lg-5 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-4 pe-lg-0">
            <form className="input-group p-2 h-100" role="search" onSubmit={handleSearchSubmit}>
              <span className="input-group-text pt-0 pb-0" id="basic-addon1">
                <img src={search} width={16} alt="Search icon" />
              </span>
              <input
                type="search"
                className="form-control p-0 font-12"
                id="floatingInputGroup1"
                placeholder={getSearchPlaceholder()}
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </form>
          </div>
        </div>
      </div>

      {isAnyLoading ? (
        <div className="text-center">
          <img src={Loader} width={200} height={200} alt="Loading..." />
        </div>
      ) : searchType === "experts" ? (
        // EXPERTS SECTION - NEW UI LIKE HIRE EXPERT PAGE
     
        <div className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5">
          <div className="row">
            <h4 className="font-24 poppins fw-bold pb-2">
              Available Experts
            </h4>
     <HireExpert/>
            
            {/* Results Summary */}
            <div className="mb-3">
              <p className="text-muted">
                {searchKeyword 
                  ? `Found ${expertCurrentData.length} experts matching "${searchKeyword}"` 
                  : `Showing ${paginatedExperts.length} of ${expertCurrentData.length} experts`}
              </p>
            </div>
            
            {/* Experts Grid */}
            {paginatedExperts.length === 0 ? (
              <div className="text-center py-5">
                <h5>No experts found</h5>
                <p className="text-muted">
                  {searchKeyword 
                    ? `No experts match your search "${searchKeyword}". Try different keywords.`
                    : "No experts available at the moment."}
                </p>
              </div>
            ) : (
              <>
                <div className="row">
                  {paginatedExperts.map((expert) => (
                    <div className="col-lg-4 col-md-6 col-12 mb-4" key={expert.id}>
                      <ExpertCard
                        user={expert}
                        showExpertDetail={showExpertDetail}
                        canOrder={canPlaceOrders}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Stack spacing={2}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePagination}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                      />
                    </Stack>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5">
          <div className="row">
            <div className="col-12 mt-4">
              <p className="text-center font-24 poppins fw-semibold">
                {searchKeyword.trim() || selectCategory 
                  ? `No ${searchType === "services" ? "services" : searchType} found matching your search`
                  : `No ${searchType === "services" ? "services" : searchType} available`}
              </p>
            </div>
          </div>
        </div>
      ) : (
        filteredData.map((category, index) => (
          <div
            className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5"
            key={category.id || index}
          >
            <div className="row">
              <h4 className="font-24 poppins fw-bold pb-2">
                {searchType === "services" 
                  ? `Most popular Services in `
                  : searchType === "bds" 
                    ? `Available Business Developers`
                    : `Available Experts`}
                {searchType === "services" && <span className="colororing">{category.name}</span>}
              </h4>
              {category.gigs.map((item, itemIndex) => (
                searchType === "services" ? (
                  <GigCard 
                    key={item.id || itemIndex}
                    gig={item} 
                    canOrder={canPlaceOrders} 
                    userRole={userRole}
                  />
                ) : (
                  <UserCard 
                    key={item.id || itemIndex}
                    user={item} 
                    type={searchType}
                    canOrder={canPlaceOrders} 
                    userRole={userRole}
                  />
                )
              ))}
            </div>
          </div>
        ))
      )}

      <div className="container justify-content-center px-0 p-5">
        <img src={NewWay} className="w-100 rounded-3" alt="New way banner" />
      </div>
    </>
  );
};

export default Freelancers;