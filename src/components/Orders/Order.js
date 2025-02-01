import React from "react";
import Active from "./Active";
import { FiSearch } from "react-icons/fi";
import Navbar from "../Navbar";
import OrderTabel from "./OrderTabel";
import search from "../../assets/searchbar.png";
import { useDispatch, useSelector } from "../../redux/store/store";
import { useEffect } from "react";
import { AllOrders } from "../../redux/slices/allOrderSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Order = () => {
  const dispatch = useDispatch();
  const { orderDetail } = useSelector((state) => state.allOrder);

  useEffect(() => {
    dispatch(AllOrders());
  }, [dispatch]);
  console.log(orderDetail, "=============order");
  const filterByType = (array, targetType) => {
    // return array.filter((obj) => obj.type === targetType);
    return array?.filter((obj) => obj.status === targetType) || [];
  };

  const filteredActive = filterByType(orderDetail, "Active");
  const filteredDelivered = filterByType(orderDetail, "Delivered");
  const filteredCompleted = filterByType(orderDetail, "Completed");
  const filteredLate = filterByType(orderDetail, "Late");
  const filteredCancelled = filterByType(orderDetail, "Cancelled");
  //   console.log(filteredDelivered,'=============order===Delivered');
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 pt-5">
        <div className="row ">
          <div className="container-fluid">
            <div className="row justify-content-lg-between justify-content-end">
              <div className="col-lg-5 col-12">
                <h5 className="cocon byerLine font-22">Manage Orders</h5>
              </div>
              <div className="col-lg-4 mt-lg-0 mt-4 col-md-6 col-sm-8 col-12">
                <div className="allgigs-field">
                  <div class="input-group p-2 h-100">
                    <span class="input-group-text pt-0 pb-0" id="basic-addon1">
                      <img src={search} width={16} alt="" />
                    </span>
                    <input
                      type="text"
                      className="form-control p-0 font-12"
                      id="floatingInputGroup1"
                      placeholder="Username"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="boxshado rounded-3 p-3 mt-3 ManageOrders">
            <ul className="nav nav-pills ps-lg-4" id="pills-tab" role="tablist">
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link active font-16 poppins fw-medium"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Active
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Delivered
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Completed
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-disabled-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-disabled"
                  type="button"
                  role="tab"
                  aria-controls="pills-disabled"
                  aria-selected="false"
                >
                  Late
                </button>
              </li>
              <li className="nav-item mx-2 mt-2" role="presentation">
                <button
                  className="nav-link font-16 poppins fw-medium"
                  id="pills-order-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-order"
                  type="button"
                  role="tab"
                  aria-controls="pills-order"
                  aria-selected="false"
                >
                  Cancelled
                </button>
              </li>
            </ul>
            <hr
              className="border-0 mt-0 mb-3"
              style={{
                height: "8px",
                opacity: "50%",
                backgroundColor: "#F5F5FF",
              }}
            />
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabIndex={0}
              >
                <div className="container-fluid ProfileVisit order-table my-42">
                  <div className="row justify-content-center">
                    <div className="col-12 bg-white rounded-3 px-0">
                      <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                      >
                        <Table
                          sx={{ minWidth: 500 }}
                          aria-label="custom pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-16 poppins fw-medium ps-4">
                                Seller
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Gig
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Due
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Total
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredActive?.map((value, index) => (
                              <OrderTabel
                                user={value?.seller.image}
                                userName={value?.seller.fname}
                                GigTitle={value?.gig?.title}
                                date={` ${
                                  new Date(value.created_at).getMonth() + 1 < 10
                                    ? "0"
                                    : ""
                                }${
                                  new Date(value.created_at).getMonth() + 1
                                }-${new Date(
                                  value.created_at
                                ).getDate()},${new Date(
                                  value.created_at
                                ).getFullYear()}`}
                                price={value?.package?.total}
                                btn="Pending"
                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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
               <div className="container-fluid ProfileVisit order-table my-42">
                  <div className="row justify-content-center">
                    <div className="col-12 bg-white rounded-3 px-0">
                      <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                      >
                        <Table
                          sx={{ minWidth: 500 }}
                          aria-label="custom pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-16 poppins fw-medium ps-4">
                                Buyer
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Gig
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Due
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Total
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredDelivered?.map((value, index) => (
                              <OrderTabel
                                user={value?.client.image}
                                userName={value?.client.fname}
                                GigTitle={value?.gig?.title}
                                date={` ${
                                  new Date(value.created_at).getMonth() + 1 < 10
                                    ? "0"
                                    : ""
                                }${
                                  new Date(value.created_at).getMonth() + 1
                                }-${new Date(
                                  value.created_at
                                ).getDate()},${new Date(
                                  value.created_at
                                ).getFullYear()}`}
                                price={value.price ? value.price : "Not Found"}
                                btn="Delivered"

                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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
 <div className="container-fluid ProfileVisit order-table my-42">
                  <div className="row justify-content-center">
                    <div className="col-12 bg-white rounded-3 px-0">
                      <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                      >
                        <Table
                          sx={{ minWidth: 500 }}
                          aria-label="custom pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-16 poppins fw-medium ps-4">
                                Buyer
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Gig
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Due
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Total
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredCompleted?.map((value, index) => (
                              <OrderTabel
                                user={value?.client.image}
                                userName={value?.client.fname}
                                GigTitle={value?.gig?.title}
                                date={` ${
                                  new Date(value.created_at).getMonth() + 1 < 10
                                    ? "0"
                                    : ""
                                }${
                                  new Date(value.created_at).getMonth() + 1
                                }-${new Date(
                                  value.created_at
                                ).getDate()},${new Date(
                                  value.created_at
                                ).getFullYear()}`}
                                price={value.price ? value.price : "Not Found"}
                                btn="Completed"

                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>              </div>
              <div
                className="tab-pane fade"
                id="pills-disabled"
                role="tabpanel"
                aria-labelledby="pills-disabled-tab"
                tabIndex={0}
              >
                 <div className="container-fluid ProfileVisit order-table my-42">
                  <div className="row justify-content-center">
                    <div className="col-12 bg-white rounded-3 px-0">
                      <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                      >
                        <Table
                          sx={{ minWidth: 500 }}
                          aria-label="custom pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-16 poppins fw-medium ps-4">
                                Buyer
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Gig
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Due
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Total
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredLate?.map((value, index) => (
                              <OrderTabel
                                user={value?.client.image}
                                userName={value?.client.fname}
                                GigTitle={value?.gig?.title}
                                date={` ${
                                  new Date(value.created_at).getMonth() + 1 < 10
                                    ? "0"
                                    : ""
                                }${
                                  new Date(value.created_at).getMonth() + 1
                                }-${new Date(
                                  value.created_at
                                ).getDate()},${new Date(
                                  value.created_at
                                ).getFullYear()}`}
                                price={value.price ? value.price : "Not Found"}
                                btn="Late"

                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-order"
                role="tabpanel"
                aria-labelledby="pills-order-tab"
                tabIndex={0}
              >
               <div className="container-fluid ProfileVisit order-table my-42">
                  <div className="row justify-content-center">
                    <div className="col-12 bg-white rounded-3 px-0">
                      <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                      >
                        <Table
                          sx={{ minWidth: 500 }}
                          aria-label="custom pagination table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className="font-16 poppins fw-medium ps-4">
                                Buyer
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Gig
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Due
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Total
                              </TableCell>
                              <TableCell
                                className="font-16 poppins fw-medium"
                                align="center"
                              >
                                Status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredCancelled?.map((value, index) => (
                              <OrderTabel
                                user={value?.client.image}
                                userName={value?.client.fname}
                                GigTitle={value?.gig?.title}
                                date={` ${
                                  new Date(value.created_at).getMonth() + 1 < 10
                                    ? "0"
                                    : ""
                                }${
                                  new Date(value.created_at).getMonth() + 1
                                }-${new Date(
                                  value.created_at
                                ).getDate()},${new Date(
                                  value.created_at
                                ).getFullYear()}`}
                                price={value.price ? value.price : "Not Found"}
                                btn="Cancelled"

                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
