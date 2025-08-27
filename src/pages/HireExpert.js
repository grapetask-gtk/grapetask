import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsChevronLeft, BsCircleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ExpertCard from "../components/ExpertCard";
import Navbar from "../components/Navbar";
import Profilreviw from "../components/Profilreviw";

import { getAllFreelancers, getCategories } from "../redux/slices/userSlice";
import { paginateArray } from "../utils/helpers";

const HireExpert = () => {
  const dispatch = useDispatch();
  const { userList, isLoading: loading, getError: error } = useSelector((state) => state.user);

  // State management
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [expertDetail, setExpertDetail] = useState(null);
  const [expertModal, setExpertModal] = useState(false);
  
  const categories = useSelector((state) => state.user.categories || []);
  const isCategoriesLoading = useSelector((state) => state.user.isLoadingCategories);
  
  // Filter states
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJobSuccess, setSelectedJobSuccess] = useState("any");

  // Available filter options
  const jobSuccessOptions = [
    { value: "any", label: "Any job success" },
    { value: "80", label: "80% & up" },
    { value: "90", label: "90% & up" }
  ];

  // Memoized filtered data based on all filters
  const getCurrentData = useCallback(() => {
    if (!userList || userList.length === 0) return [];

    let filtered = [...userList];

    // Apply search query filter - FIXED
    if (searchQuery.trim() !== '') {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        // Check name fields
        if (item?.fname?.toLowerCase().includes(searchLower) || 
            item?.lname?.toLowerCase().includes(searchLower) ||
            item?.user_name?.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Check skills
        if (Array.isArray(item?.skills) && 
            item.skills.some(skill => 
              typeof skill === "string" && 
              skill.toLowerCase().includes(searchLower)
            )) {
          return true;
        }
        
        // Check gig titles and descriptions
        if (item.gigs && item.gigs.some(gig => 
          (gig.title && gig.title.toLowerCase().includes(searchLower)) ||
          (gig.description && gig.description.toLowerCase().includes(searchLower)) ||
          (gig.tags && gig.tags.some(tag => 
            typeof tag === "string" && tag.toLowerCase().includes(searchLower)
          ))
        )) {
          return true;
        }
        
        return false;
      });
    }

    // Apply location filter - FIXED
    if (locationSearch.trim() !== '') {
      const locationLower = locationSearch.toLowerCase();
      filtered = filtered.filter((item) => {
        const city = item?.city || '';
        const country = item?.country || '';
        const state = item?.state || '';
        
        return city.toLowerCase().includes(locationLower) ||
               country.toLowerCase().includes(locationLower) ||
               state.toLowerCase().includes(locationLower);
      });
    }

    // Apply category filter - FIXED
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.some(category => {
          if (item.gigs && item.gigs.length > 0) {
            return item.gigs.some(gig => 
              gig.category && 
              gig.category.name && 
              gig.category.name.toLowerCase().includes(category.toLowerCase())
            );
          }
          return false;
        })
      );
    }

    // Apply job success filter - FIXED
    if (selectedJobSuccess !== "any") {
      const minSuccess = parseInt(selectedJobSuccess);
      filtered = filtered.filter((item) => {
        // Use success_ratio instead of jobSuccessRate
        const successRate = item?.success_ratio || 0;
        return successRate >= minSuccess;
      });
    }

    return filtered;
  }, [userList, searchQuery, locationSearch, selectedCategories, selectedJobSuccess]);

  // Memoized current data and total pages
  const currentData = useMemo(() => getCurrentData(), [getCurrentData]);
  const totalPages = useMemo(() => Math.ceil(currentData.length / limit), [currentData.length, limit]);

  // Fetch freelancers and categories on component mount
  useEffect(() => {
    dispatch(getAllFreelancers());
    dispatch(getCategories());
  }, [dispatch]);

  // Update filtered data when dependencies change
  useEffect(() => {
    if (currentData.length > 0) {
      const paginatedData = paginateArray(currentData, limit, page);
      setFilteredData(paginatedData);
    } else {
      setFilteredData([]);
    }
  }, [currentData, page, limit]);

  // Reset to first page when any filter changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, locationSearch, selectedCategories, selectedJobSuccess]);

  // Event handlers
  const handleChangePagination = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleSearchInputChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleLocationSearchChange = useCallback((event) => {
    setLocationSearch(event.target.value);
  }, []);

  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleJobSuccessChange = useCallback((value) => {
    setSelectedJobSuccess(value);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setLocationSearch("");
    setSelectedCategories([]);
    setSelectedJobSuccess("any");
  }, []);

  const showExpertDetail = useCallback((data) => {
    setExpertDetail(data);
    setExpertModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setExpertModal(false);
    setExpertDetail(null);
  }, []);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (locationSearch.trim() !== '') count++;
    if (selectedCategories.length > 0) count++;
    if (selectedJobSuccess !== "any") count++;

    return count;
  }, [locationSearch, selectedCategories, selectedJobSuccess]);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar FirstNav="none" />
        <div className="container-fluid p-4 pt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading freelancers...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar FirstNav="none" />
        <div className="container-fluid p-4 pt-5">
          <div className="alert alert-successs" role="alert">
            <p>No freelancers: {error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid p-4 pt-5">
        <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0">
          {/* Filters Sidebar */}
          <div className="col-lg-4 col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="byerLine font-22 font-500 cocon blackcolor">
                Filtered by {activeFiltersCount > 0 && <span className="badge bg-primary ms-2">{activeFiltersCount}</span>}
              </h6>
              {activeFiltersCount > 0 && (
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              )}
            </div>
            
            {/* Location Filter */}
            <div className="accordion" id="accordionExample">
              <div className="">
                <div className="accordion-header">
                  <button
                    className="accordion-button px-0 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <h6 className="byerLine font-22 font-500 cocon blackcolor">
                      Location {locationSearch && <span className="badge bg-success ms-2">1</span>}
                    </h6>
                  </button>
                </div>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body px-0">
                    <div className="Revie">
                      <div className="input-group mb-lg-0 mb-md-0 mb-2 bgcard rounded-3">
                        <button
                          className="border-0"
                          style={{ backgroundColor: "transparent" }}
                          type="button"
                        >
                          <span>
                            <FiSearch />
                          </span>
                        </button>
                        <input
                          type="text"
                          className="form-control border-0"
                          style={{ backgroundColor: "transparent" }}
                          placeholder="Search location"
                          value={locationSearch}
                          onChange={handleLocationSearchChange}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="accordion" id="accordionTwo">
              <div className="">
                <div className="accordion-header">
                  <button
                    className="accordion-button px-0 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <h6 className="byerLine font-22 font-500 cocon blackcolor">
                      Categories{" "}
                      {selectedCategories.length > 0 && (
                        <span className="badge bg-success ms-2">
                          {selectedCategories.length}
                        </span>
                      )}
                    </h6>
                  </button>
                </div>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionTwo"
                >
                  <div className="accordion-body px-0">
                    <div className="Revie font-15 poppins mt-3">
                      {isCategoriesLoading ? (
                        <div className="text-center">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading categories...</span>
                          </div>
                        </div>
                      ) : (
                        categories?.map((cat) => (
                          <p
                            key={cat.id || cat.name}
                            className="cursor-pointer d-flex align-items-center"
                            onClick={() => handleCategoryToggle(cat.name)}
                            style={{ cursor: "pointer", userSelect: "none" }}
                          >
                            <BsCircleFill
                              className={`me-3 ${
                                selectedCategories.includes(cat.name)
                                  ? "colororing"
                                  : "dote-gray"
                              }`}
                            />
                            {cat.name}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            {/* Job Success Filter */}
            <div className="accordion" id="accordionThree">
              <div className="">
                <div className="accordion-header">
                  <button
                    className="accordion-button px-0 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <h6 className="byerLine font-22 font-500 cocon blackcolor">
                      Job Success {selectedJobSuccess !== "any" && <span className="badge bg-success ms-2">1</span>}
                    </h6>
                  </button>
                </div>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionThree"
                >
                  <div className="accordion-body px-0">
                    <div className="Revie font-15 poppins">
                      {jobSuccessOptions.map((option) => (
                        <p 
                          key={option.value}
                          className="cursor-pointer d-flex align-items-center"
                          onClick={() => handleJobSuccessChange(option.value)}
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                          <BsCircleFill 
                            className={`me-3 ${selectedJobSuccess === option.value ? 'colororing' : 'dote-gray'}`} 
                          />
                          {option.label}
                        </p>
                      ))}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-8 col-12">
            <div className="Revie">
              {/* Search Bar */}
              <div className="input-group mb-lg-0 mb-md-0 mb-2 bgcard rounded-3">
                <button
                  className="border-0"
                  style={{ backgroundColor: "transparent" }}
                  type="button"
                >
                  <span>
                    <FiSearch />
                  </span>
                </button>
                <input
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  type="text"
                  className="form-control border-0"
                  style={{ backgroundColor: "transparent" }}
                  placeholder="Search freelancers by name, description, or skills"
                />
              </div>

              {/* Active Filters Display */}
              {(activeFiltersCount > 0 || searchQuery) && (
                <div className="mt-3 mb-3">
                  <div className="d-flex flex-wrap gap-2">
                    {searchQuery && (
                      <span className="badge bg-info d-flex align-items-center">
                        Search: "{searchQuery}"
                        <button 
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '0.7em' }}
                          onClick={() => setSearchQuery("")}
                        ></button>
                      </span>
                    )}
                    {locationSearch && (
                      <span className="badge bg-info d-flex align-items-center">
                        Location: "{locationSearch}"
                        <button 
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '0.7em' }}
                          onClick={() => setLocationSearch("")}
                        ></button>
                      </span>
                    )}
                    {selectedCategories.map(category => (
                      <span key={category} className="badge bg-info d-flex align-items-center">
                        {category}
                        <button 
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '0.7em' }}
                          onClick={() => handleCategoryToggle(category)}
                        ></button>
                      </span>
                    ))}
                    {selectedJobSuccess !== "any" && (
                      <span className="badge bg-info d-flex align-items-center">
                        Job Success: {selectedJobSuccess}%+
                        <button 
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '0.7em' }}
                          onClick={() => setSelectedJobSuccess("any")}
                        ></button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="mt-3 mb-3">
                <p className="text-muted">
                  {searchQuery || activeFiltersCount > 0 
                    ? `Found ${currentData.length} freelancers matching your criteria`
                    : `Showing ${currentData.length} freelancers`
                  }
                </p>
              </div>

              {/* Freelancers List */}
              {filteredData?.length > 0 ? (
                filteredData.map((val, index) => (
                  <ExpertCard
                    key={val.id || val._id || index}
                    user={val}
                    showExpertDetail={showExpertDetail}
                  />
                ))
              ) : (
                <div className="text-center py-5">
                  <h5>No freelancers found</h5>
                  <p className="text-muted">
                    {searchQuery || activeFiltersCount > 0
                      ? "No freelancers match your current search and filter criteria. Try adjusting your filters."
                      : "No freelancers available at the moment."
                    }
                  </p>
                  {(searchQuery || activeFiltersCount > 0) && (
                    <button 
                      className="btn btn-outline-primary"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}

              {/* Expert Detail Modal */}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-end hireexpert mt-3 mb-3">
                  <Stack spacing={4}>
                    <Pagination
                      onChange={handleChangePagination}
                      count={totalPages}
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
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .offcanvas-body::-webkit-scrollbar {
          width: 8px;
        }
        .offcanvas-body::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .offcanvas-body::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .offcanvas-body::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .cursor-pointer:hover {
          opacity: 0.8;
        }
        .badge .btn-close {
          margin-left: 0.5rem !important;
        }
      `}</style>
    </>
  );
};

export default HireExpert;