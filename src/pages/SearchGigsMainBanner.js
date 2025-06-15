import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BsPlusLg
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../assets/LoaderImg.gif";
import search from "../assets/searchbar.webp";
import Footer from "../components/Footer";
import GigCard from "../components/GigCard";
import Navbar from "../components/Navbar";
import { geAllGigs } from "../redux/slices/allGigsSlice";
import { useDispatch, useSelector } from "../redux/store/store";
const SearchGigsMainBanner = () => {
  const location = useLocation();
  // const receivedData = location.state.data || 'No data received';
  const receivedData =
    location.state && location.state.data
      ? location.state.data
      : { search: "" }; // Ensure 'search' property exists

  // console.log(receivedData);
  useEffect(() => {
    setSearchKeyword(receivedData?.search);
  }, []);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gigsDetail, isPreLoading } = useSelector((state) => state.allGigs);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(geAllGigs());
  }, [dispatch]);
  //   console.log(gigsDetail,'=====================recommended gig');
  const SearchGigs = gigsDetail.flatMap(function (object) {
    return object.gigs;
    // return object.gigs.filter(function(gig) {
    // return gig.category_id === "2";
    // return ((gig.title &&
    //     gig.title.toLowerCase().includes(searchKeyword.toLowerCase())))
    // });
  });
  //   console.log(SearchGigs);
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
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

               <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-4 pe-lg-0 text-end justify-content-end">
             
                                  <Button
                                    onClick={() => navigate("/multiSteps")}
                                    className="btn-stepper poppins px-3 font-16"
                                  >
                                    <BsPlusLg className="me-2" /> Create your new gig
                                  </Button>
                                </div>
            </div>
            <div className="row">
              <h3 className="mt-4">
                Results for{" "}
                <span className="colororing">
                  {searchKeyword ? searchKeyword : "All "} Gigs
                </span>
              </h3>
              {SearchGigs.length > 0 ? (
                SearchGigs.filter(
                  (innerValue) =>
                    (innerValue.title &&
                      innerValue.title
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())) || // Filter by title
                    (innerValue.description &&
                      innerValue.description
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase()))
                ).map((innerValue) => <GigCard gig={innerValue} />)
              ) : (
                <h3 className="cocon">Not Found</h3>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default SearchGigsMainBanner;
