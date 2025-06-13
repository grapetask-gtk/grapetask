import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BsChevronLeft, BsCircleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ExpertCard from "../components/ExpertCard";
import Navbar from "../components/Navbar";
import Profilreviw from "../components/Profilreviw";
import { getAllFreelancers } from "../redux/slices/userSlice";
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

  // Memoized filtered data based on search query
  const getCurrentData = useCallback(() => {
    if (!userList || userList.length === 0) return [];
    
    if (searchQuery.trim() === '') {
      return userList;
    }
    
    return userList.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        item?.fname?.toLowerCase().includes(searchLower) ||
        item?.lname?.toLowerCase().includes(searchLower) ||
        item?.description?.toLowerCase().includes(searchLower) ||
        item?.skills?.some(skill => skill.toLowerCase().includes(searchLower)) ||
        item?.category?.toLowerCase().includes(searchLower)
      );
    });
  }, [userList, searchQuery]);

  // Memoized current data and total pages
  const currentData = useMemo(() => getCurrentData(), [getCurrentData]);
  const totalPages = useMemo(() => Math.ceil(currentData.length / limit), [currentData.length, limit]);

  // Fetch freelancers on component mount
  useEffect(() => {
    dispatch(getAllFreelancers());
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

  // Reset to first page when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Event handlers
  const handleChangePagination = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleSearchInputChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const showExpertDetail = useCallback((data) => {
    setExpertDetail(data);
    setExpertModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setExpertModal(false);
    setExpertDetail(null);
  }, []);

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
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error!</h4>
            <p>Failed to load freelancers: {error}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => dispatch(getAllFreelancers())}
            >
              Try Again
            </button>
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
            <h6 className="byerLine font-22 font-500 cocon blackcolor">
              Filtered by
            </h6>
            
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
                      Location
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
                      Categories
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
                      <p>Design & Creative</p>
                      <p>IT & Networking</p>
                      <p>Sales & Marketing</p>
                      <p>Writing</p>
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
                      Job Success
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
                      <p>
                        <BsCircleFill className="colororing me-3" /> Any job success
                      </p>
                      <p>
                        <BsCircleFill className="dote-gray me-3" />
                        80% & up
                      </p>
                      <p>
                        <BsCircleFill className="dote-gray me-3" />
                        90% & up
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>

            {/* English Level Filter */}
            <div className="accordion" id="accordionfor">
              <div className="">
                <div className="accordion-header">
                  <button
                    className="accordion-button px-0 collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsefor"
                    aria-expanded="false"
                    aria-controls="collapsefor"
                  >
                    <h6 className="byerLine font-22 font-500 cocon blackcolor">
                      English level
                    </h6>
                  </button>
                </div>
                <div
                  id="collapsefor"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionfor"
                >
                  <div className="accordion-body px-0">
                    <div className="Revie font-15 poppins">
                      <p>
                        <BsCircleFill className="colororing me-3" /> Any Level
                      </p>
                      <p>
                        <BsCircleFill className="dote-gray me-3" />
                        Basic
                      </p>
                      <p>
                        <BsCircleFill className="dote-gray me-3" />
                        Conversational
                      </p>
                      <p>
                        <BsCircleFill className="dote-gray me-3" />
                        Fluent
                      </p>
                    </div>
                  </div>
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

              {/* Results Summary */}
              <div className="mt-3 mb-3">
                <p className="text-muted">
                  {searchQuery ? `Found ${currentData.length} freelancers matching "${searchQuery}"` : `Showing ${currentData.length} freelancers`}
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
                    {searchQuery 
                      ? `No freelancers match your search "${searchQuery}". Try different keywords.`
                      : "No freelancers available at the moment."
                    }
                  </p>
                  {searchQuery && (
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
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
      `}</style>
    </>
  );
};

export default HireExpert;