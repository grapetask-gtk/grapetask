import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../assets/LoaderImg.gif";
import { useDispatch, useSelector } from "../redux/store/store";
import { geAllGigs } from "../redux/slices/allGigsSlice";
import { useEffect } from "react";
import search from "../assets/searchbar.webp";
import { useState } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { sellerRating } from "../redux/slices/ratingSlice";
import { Button } from "@mui/material";

const MeetTopRatedFreelancer = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gigsDetail, isPreLoading } = useSelector((state) => state.allGigs);
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();
  // const receivedData = location.state.data || 'No data received';
  const receivedData =
    location.state && location.state.dataTopRated
      ? location.state.dataTopRated
      : { topRated: "" }; // Ensure 'search' property exists

  console.log(receivedData);
  useEffect(() => {
    setSearchKeyword(receivedData);
  }, []);
  const { userDetail } = useSelector((state) => state.rating);

  useEffect(() => {
    dispatch(sellerRating());
  }, [dispatch]);
  //   console.log(gigsDetail,'=====================recommended gig');

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
          {token ? <Navbar FirstNav="none" /> : <Navbar SecondNav="none" />}
          <div className="container my-3 allgigs-field poppins">
            <div className="row ">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-4 pe-lg-0">
                <form class="input-group p-2 h-100" role="search">
                  <span class="input-group-text pt-0 pb-0" id="basic-addon1">
                    <img src={search} width={16} alt="" />
                  </span>
                  <input
                    type="search"
                    className="form-control p-0 font-12"
                    id="floatingInputGroup1"
                    placeholder="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <div className="row">
              <h3 className="mt-4">
                Results for{" "}
                <span className="colororing">
                  {searchKeyword ? searchKeyword : "All "} Profile
                </span>
              </h3>
              {userDetail.length > 0 ? (
                userDetail
                  .filter(
                    (innerValue) =>
                      innerValue.seller?.fname &&
                      innerValue.seller?.fname
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                  )
                  .map((value, index) => (
                    <div className="col-3" key={index}>
                      <div className="bg-white shadow rounded-4 my-4 py-4 px-lg-0 px-4 mx-lg-0 mx-3">
                        <div className=" text-center">
                          <img
                            src={value?.seller?.image}
                            alt="w8"
                            className="rounded-circle  "
                            width={150}
                            height={150}
                          />
                        </div>
                        <div className="text-center poppins px-2 mt-2 pb-2">
                          <p className="font-16 mb-0  fw-medium blackcolor">
                            {value?.seller?.fname}
                          </p>
                          <p className="font-14 mb-1 takegraycolor">
                            {value?.seller?.role}
                          </p>

                          <div className="text-ceenter mt-1">
                            <Button
                              className="btn-stepper-border rounded-5 poppins px-3  font-16"
                              onClick={() =>
                                navigate(
                                  `/profileOtherPerson/${value.user_id}`,
                                  {
                                    state: { userId: value.user_id },
                                  }
                                )
                              }
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <h3 className="cocon">Not Found</h3>
              )}
            </div>
            <div></div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default MeetTopRatedFreelancer;
