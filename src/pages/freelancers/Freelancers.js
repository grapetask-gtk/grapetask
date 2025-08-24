import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoImg from "../../assets/blogVideoImg.webp";
import Loader from "../../assets/LoaderImg.gif";
import NewWay from "../../assets/NewWay.webp";
import search from "../../assets/searchbar.webp";
import video2 from "../../assets/video/Freelance3.mp4";
import video3 from "../../assets/video/Freelance8.mp4";
import video1 from "../../assets/video/Freelance9.mp4";
import videoPlay from "../../assets/VideoPlay.webp";
import Navbar from "../../components/Navbar";
import Profilreviw from "../../components/Profilreviw";
import { geAllGigs } from "../../redux/slices/allGigsSlice";
import { getBds } from "../../redux/slices/buyerRequestSlice";
import { getCategory } from "../../redux/slices/gigsSlice";
import { getAllFreelancers } from "../../redux/slices/userSlice";
import { paginateArray, titleToSlug } from "../../utils/helpers";

// Lazy load heavy components
const BdCard = lazy(() => import("../../components/BdCard"));
const ExpertCard = lazy(() => import("../../components/ExpertCard"));
const Freelancer = lazy(() => import("../../components/Freelancer"));

// Utility functions
const stripHtmlTags = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

const normalizeRole = (role) => {
  if (!role) return "";
  return role.toLowerCase().trim();
};

const getUserData = () => {
  try {
    const userData = localStorage.getItem("UserData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// Helper: Get seller name consistently
const getSellerName = (seller) => {
  if (Array.isArray(seller)) {
    return seller[0]?.fname || 'seller';
  }
  return seller?.fname || 'seller';
};

const getGigImage = (media) => {
  if (!media) return null;
  return media.image1 || media.image2 || media.image3 || null;
};

const handleGigNavigate = (gig, navigate) => {
  const slug = titleToSlug(gig.title);
  const sellerName = getSellerName(gig.seller);
  navigate(`/g/${slug}/${sellerName}/${gig.id}`);
};

// UserCard component for displaying BDs and Experts
const UserCard = React.memo(({ user, type, canOrder, userRole }) => {
  const navigate = useNavigate();
  
  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${user.id}`);
  }, [navigate, user.id]);

  const handleContact = useCallback(() => {
    if (canOrder) {
      navigate(`/order/${user.id}`);
    }
  }, [canOrder, navigate, user.id]);

  const displayName = user.fname || user.username || (type === "bds" ? "Business Developer" : "Expert");

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
});

UserCard.displayName = 'UserCard';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Freelancers = () => {
  // State management
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);
  const [selectCategory, setSelectCategory] = useState("");
  const [searchType, setSearchType] = useState("services");
  const [page, setPage] = useState(1);
  const [bdPage, setBdPage] = useState(1);
  const [limit] = useState(10);
  const [expertDetail, setExpertDetail] = useState(null);
  const [bdDetail, setBdDetail] = useState(null);
  const [expertModal, setExpertModal] = useState(false);
  const [bdModal, setBdModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux selectors with specific field selection to minimize re-renders
  const { gigsDetail, isLoading } = useSelector((state) => state.allGigs);
  const { userCategory } = useSelector((state) => state.gig);
  const { userDetail, userList: freelancers, isLoading: freelancersLoading } = useSelector(
    (state) => state.user
  );
  const { bdList, bdListLoading } = useSelector((state) => state.buyer);

  // User data and role determination
  const UserData = useMemo(() => getUserData(), []);
  const userRole = userDetail?.role || UserData?.role || "client";

  const safeGetBdList = useCallback(() => {
    if (!bdList) return [];
    return bdList?.data || bdList?.users || bdList?.results || bdList || [];
  }, [bdList]);

  const getBdsFilteredData = useCallback(() => {
    const bds = safeGetBdList();
    
    if (!debouncedSearchKeyword.trim()) return bds;

    const keyword = debouncedSearchKeyword.toLowerCase().trim();
    return bds.filter(bd => {
      const name = (bd.fname || bd.username || bd.fname || "").toLowerCase();
      const skills = (bd.skills || "").toLowerCase();
      const bio = (bd.bio || bd.description || "").toLowerCase();
      const country = (bd.country || bd.location || "").toLowerCase();
      return name.includes(keyword) || skills.includes(keyword) || bio.includes(keyword) || country.includes(keyword);
    });
  }, [safeGetBdList, debouncedSearchKeyword]);

  const safeGetFreelancersList = useCallback(() => {
    if (freelancers?.data && Array.isArray(freelancers.data)) return freelancers.data;
    if (Array.isArray(freelancers)) return freelancers;
    if (freelancers?.users && Array.isArray(freelancers.users)) return freelancers.users;
    if (freelancers?.results && Array.isArray(freelancers.results)) return freelancers.results;
    return [];
  }, [freelancers]);

  const isExpertRole = useCallback((role) => {
    if (!role) return false;
    const normalizedRole = normalizeRole(role);
    return normalizedRole.includes("expert") || 
           normalizedRole.includes("expert/freelancer") || 
           normalizedRole.includes("freelancer") || 
           normalizedRole.includes("developer") ||
           normalizedRole.includes("designer") ||
           normalizedRole.includes("consultant") ||
           normalizedRole.includes("specialist");
  }, []);

  const isBdRole = useCallback((role) => {
    if (!role) return false;
    const normalizedRole = normalizeRole(role);
    return normalizedRole.includes("bd") ||
           normalizedRole.includes("business_developer") ||
           normalizedRole.includes("business developer") ||
           normalizedRole.includes("bidder") ||
           normalizedRole.includes("middleman") ||
           normalizedRole.includes("representative");
  }, []);

  const getExpertCurrentData = useCallback(() => {
    const freelancerData = safeGetFreelancersList();
    
    if (freelancerData.length === 0) {
      console.log('No freelancer data available for expert filtering');
      return [];
    }
    
    let experts = freelancerData.filter(user => {
      const userRole = user.role;
      const isExpert = isExpertRole(userRole);
      return isExpert;
    });

    if (debouncedSearchKeyword.trim() === '') {
      return experts;
    }
    
    const keyword = debouncedSearchKeyword.toLowerCase().trim();
    return experts.filter((item) => {
      const name = (
        item?.name ||
        item?.username ||
        item?.user_name ||
        `${item?.fname || ""} ${item?.lname || ""}`
      ).toLowerCase();

      const description = (item?.description || item?.bio || "").toLowerCase();

      const skills = Array.isArray(item?.skills)
        ? item.skills.join(", ").toLowerCase()
        : (item?.skills || "").toLowerCase();

      const expertise = (item?.expertise || "").toLowerCase();

      return (
        name.includes(keyword) ||
        description.includes(keyword) ||
        skills.includes(keyword) ||
        expertise.includes(keyword)
      );
    });
  }, [safeGetFreelancersList, debouncedSearchKeyword, isExpertRole]);

  const expertCurrentData = useMemo(() => getExpertCurrentData(), [getExpertCurrentData]);
  const expertTotalPages = useMemo(() => Math.ceil(expertCurrentData.length / limit), [expertCurrentData.length, limit]);
  const paginatedExperts = useMemo(() => 
    paginateArray(expertCurrentData, limit, page), 
    [expertCurrentData, limit, page]
  );

  const bdCurrentData = useMemo(() => getBdsFilteredData(), [getBdsFilteredData]);
  const bdTotalPages = useMemo(() => Math.ceil(bdCurrentData.length / limit), [bdCurrentData.length, limit]);
  const paginatedBDs = useMemo(() => 
    paginateArray(bdCurrentData, limit, bdPage), 
    [bdCurrentData, limit, bdPage]
  );

  const getSearchOptions = useMemo(() => {
    const role = normalizeRole(userRole);
    
    if (role.includes("client")) {
      return [
        { value: "services", label: "Search Services" },
        { value: "bds", label: "Search Business Developers" }
      ];
    }
    if (isBdRole(userRole) || role.includes("bidder")) {
      return [
        { value: "services", label: "Search Services" },
        { value: "bds", label: "Search Business Developers" },
        { value: "experts", label: "Search Experts" }
      ];
    }
    if (isExpertRole(userRole)) {
      return [
        { value: "services", label: "Browse Services" },
        { value: "experts", label: "Search Other Experts" }
      ];
    }
    
    return [{ value: "services", label: "Search Services" }];
  }, [userRole, isBdRole, isExpertRole]);

  const canPlaceOrders = useMemo(() => {
    const role = normalizeRole(userRole);
    return role.includes("client") || 
           isBdRole(userRole) || 
           role.includes("bidder");
  }, [userRole, isBdRole]);

  const filteredData = useMemo(() => {
    if (searchType === "services") {
      if (!gigsDetail?.length) {
        return [];
      }

      return gigsDetail.map((category) => {
        let filteredGigs = category.gigs || [];

        if (selectCategory && selectCategory !== "All Categories") {
          filteredGigs = filteredGigs.filter(
            gig => gig.category_id?.toString() === selectCategory.toString()
          );
        }

        if (debouncedSearchKeyword.trim()) {
          const keyword = debouncedSearchKeyword.toLowerCase().trim();
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

    if (searchType === "bds") {
      return [];
    }

    if (searchType === "experts") {
      return [];
    }

    return [];
  }, [gigsDetail, searchType, selectCategory, debouncedSearchKeyword]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      // Only fetch data if we don't have it already
      if (!gigsDetail || gigsDetail.length === 0) {
        dispatch(geAllGigs());
      }
      
      if (!userCategory || userCategory.length === 0) {
        dispatch(getCategory());
      }
      
      const role = normalizeRole(userRole);
      
      if ((role.includes("client") || isBdRole(userRole) || role.includes("bidder/company representative/middleman")) &&
          (!bdList || bdList.length === 0)) {
        dispatch(getBds());
      }
      
      if ((isBdRole(userRole) || role.includes("bidder") || isExpertRole(userRole)) &&
          (!freelancers || freelancers.length === 0)) {
        dispatch(getAllFreelancers());
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, userRole, isBdRole, isExpertRole, gigsDetail, userCategory, bdList, freelancers]);

  useEffect(() => {
    setPage(1);
    setBdPage(1);
  }, [debouncedSearchKeyword, searchType, selectCategory]);

  // Video carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const videos = useMemo(() => [video1, video2, video3], []);

  const handleSearchSubmit = useCallback((e) => e.preventDefault(), []);
  const handleCategoryChange = useCallback((e) => setSelectCategory(e.target.value), []);
  const handleSearchChange = useCallback((e) => setSearchKeyword(e.target.value), []);
  const handleSearchTypeChange = useCallback((e) => {
    setSearchType(e.target.value);
    setSearchKeyword("");
    setSelectCategory("");
  }, []);

  const handleChangeExpertPagination = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeBdPagination = useCallback((event, newPage) => {
    setBdPage(newPage);
  }, []);

  const showExpertDetail = useCallback((data) => {
    setExpertDetail(data);
    setExpertModal(true);
  }, []);

  const showBdDetail = useCallback((data) => {
    setBdDetail(data);
    setBdModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setExpertModal(false);
    setBdModal(false);
    setExpertDetail(null);
    setBdDetail(null);
  }, []);

  const getSearchPlaceholder = useCallback(() => {
    switch (searchType) {
      case "bds": return "Search Business Developers...";
      case "experts": return "Search Experts...";
      default: return "Search services...";
    }
  }, [searchType]);

  const getPageTitle = useCallback(() => {
    const role = normalizeRole(userRole);
    
    if (role.includes("client")) return "Find the Perfect Service for Your Business";
    if (isBdRole(userRole) || role.includes("bidder")) return "Connect with Services, BDs, and Experts";
    if (isExpertRole(userRole)) return "Explore Services and Connect with Peers";
    
    return "Discover Amazing Services";
  }, [userRole, isBdRole, isExpertRole]);

  const isAnyLoading = isLoading || 
    (searchType === "bds" && bdListLoading) || 
    (searchType === "experts" && freelancersLoading);

  return (
    <>
      <Navbar FirstNav="none" />
      <div>
        <div className="container-fluid blogVideoSection py-lg-0 py-md-0 py-5">
          <div
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
              {videos.map((video, index) => (
                <div key={index} className={`carousel-item h-100 ${index === activeVideo ? 'active' : ''}`}>
                  <div className="container-fluid p-0 poppins h-100">
                    <video
                      width={"100%"}
                      height={"100%"}
                      style={{ objectFit: "cover", objectPosition: "center" }}
                      muted
                      loop
                      autoPlay
                      playsInline
                      preload={index === 0 ? "auto" : "metadata"}
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
            </div>
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
              loading="lazy"
            />
            <img src={videoImg} alt="Video thumbnail" className="w-100 rounded-4" loading="lazy" />
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
                <img src={search} width={16} alt="Search icon" loading="lazy" />
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

      {/* MAIN CONTENT */}
      {isAnyLoading ? (
        <div className="text-center">
          <img src={Loader} width={200} height={200} alt="Loading..." loading="lazy" />
        </div>
      ) : searchType === "experts" ? (
        <div className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5">
          <div className="row">
            <h4 className="font-24 poppins fw-bold pb-2">
              Available Experts
            </h4>
            
            <div className="mb-3">
              <p className="text-muted">
                {debouncedSearchKeyword 
                  ? `Found ${expertCurrentData.length} experts matching "${debouncedSearchKeyword}"` 
                  : `Showing ${paginatedExperts.length} of ${expertCurrentData.length} experts`}
              </p>
            </div>
            
            {expertCurrentData?.length > 0 ? (
              paginatedExperts.map((val, index) => (
                <Suspense key={val.id || val._id || index} fallback={<div>Loading...</div>}>
                  <ExpertCard
                    user={val}
                    showExpertDetail={showExpertDetail}
                  />
                </Suspense>
              ))
            ) : (
              <div className="text-center py-5">
                <h5>No freelancers found</h5>
                <p className="text-muted">
                  {debouncedSearchKeyword 
                    ? `No freelancers match your search "${debouncedSearchKeyword}". Try different keywords.`
                    : "No freelancers available at the moment."
                  }
                </p>
              </div>
            )}

            <div
              className={`offcanvas offcanvas-end p-3 ${expertModal ? "show" : ""}`}
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
              style={{ visibility: expertModal ? "visible" : "hidden" }}
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="offcanvasRightLabel"
                  style={{ cursor: "pointer" }}
                  onClick={closeModal}
                >
                  <BsChevronLeft className="colororing" />
                </h5>
              </div>
              <div className="offcanvas-body pe-0">
                {expertDetail && <Profilreviw expertDetail={expertDetail} />}
              </div>
            </div>

            {expertTotalPages > 1 && (
              <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                <Stack spacing={4}>
                  <Pagination
                    onChange={handleChangeExpertPagination}
                    count={expertTotalPages}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      ) : searchType === "bds" ? (
        <div className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5">
          <div className="row">
            <h4 className="font-24 poppins fw-bold pb-2">
              Available Business Developers
            </h4>
            
            <div className="mb-3">
              <p className="text-muted">
                {debouncedSearchKeyword 
                  ? `Found ${bdCurrentData.length} BDs matching "${debouncedSearchKeyword}"` 
                  : `Showing ${paginatedBDs.length} of ${bdCurrentData.length} BDs`}
              </p>
            </div>
            
            {bdCurrentData.length > 0 ? (
              paginatedBDs.map((bd, index) => (
                <Suspense key={bd.id || bd._id || index} fallback={<div>Loading...</div>}>
                  <BdCard 
                    user={bd}
                    bd={bd}
                    showBdDetail={showBdDetail}
                  />
                </Suspense>
              ))
            ) : (
              <div className="text-center py-5">
                <h5>No Business Developers found</h5>
                <p className="text-muted">
                  {bdListLoading
                    ? "Loading BDs..."
                    : debouncedSearchKeyword 
                      ? `No BDs match your search "${debouncedSearchKeyword}"`
                      : "No Business Developers available"}
                </p>
              </div>
            )}

            <div
              className={`offcanvas offcanvas-end p-3 ${bdModal ? "show" : ""}`}
              tabIndex={-1}
              id="offcanvasRightBd"
              aria-labelledby="offcanvasRightBdLabel"
              style={{ visibility: bdModal ? "visible" : "hidden" }}
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="offcanvasRightBdLabel"
                  style={{ cursor: "pointer" }}
                  onClick={closeModal}
                >
                  <BsChevronLeft className="colororing" />
                </h5>
              </div>
              <div className="offcanvas-body pe-0">
                {bdDetail && <Profilreviw expertDetail={bdDetail} />}
              </div>
            </div>

            {bdTotalPages > 1 && (
              <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                <Stack spacing={4}>
                  <Pagination
                    onChange={handleChangeBdPagination}
                    count={bdTotalPages}
                    page={bdPage}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </Stack>
              </div>
            )}
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="container haifwhitecard rounded-3 pb-5 px-4 mt-3 pt-5">
          <div className="row">
            <div className="col-12 mt-4">
              <p className="text-center font-24 poppins fw-semibold">
                {debouncedSearchKeyword.trim() || selectCategory 
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
                    ? `Available Business Developers (${category.gigs?.length || 0})`
                    : `Available Experts`}
                {searchType === "services" && <span className="colororing">{category.name}</span>}
              </h4>
   
{category.gigs.map((item, itemIndex) => {
  const avgRating = Number(item.ratings_avg_ratings) || 0;
  const ratingCount = Number(item.ratings_count || item.ratings_coun) || 0;
  const deliveryTime = item?.packages?.[0]?.delivery_time || "N/A";
  const price = item?.packages?.[0]?.total || item?.package?.[0]?.total || 0;
  const stars = Array.from({ length: 5 }, (_, i) =>
    avgRating > i ? "#F16336" : "#D4D4D4"
  );
  
  return (
    <div key={item.id || itemIndex} className="col-lg-4 col-md-6 col-12 mb-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Freelancer
          handleNavigate={() => handleGigNavigate(item, navigate)}
          imges={getGigImage(item.media)}
          heading={item?.title}
          price={price}
          seller={getSellerName(item?.seller)}
          rating={avgRating}
          ratingCount={ratingCount}
          star1={stars[0]}
          star2={stars[1]}
          star3={stars[2]}
          star4={stars[3]}
          star5={stars[4]}
          delivery={deliveryTime}
          gigId={item?.id}
          gigData={item}
          gigStatus={item?.status}
          isPro={item?.seller?.isPro || false}
          sellerAvatar={item?.seller?.image}
        />
      </Suspense>
    </div>
  );
})}
            </div>
          </div>
        ))
      )}

      <div className="container justify-content-center px-0 p-5">
        <img src={NewWay} className="w-100 rounded-3" alt="New way banner" loading="lazy" />
      </div>
    </>
  );
};

export default React.memo(Freelancers);