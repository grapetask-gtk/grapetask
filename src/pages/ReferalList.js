import React from "react";
import Navbar from "../components/Navbar";
import ReferalTable from "../components/ReferalTable";
import { Pagination, Stack } from "@mui/material";
import earning from "../assets/total-earning.webp";
import { useSelector } from "react-redux";

const ReferalList = () => {
  const { userDetail, myReferrals } = useSelector((state) => state.profile);
  console.log(myReferrals, "=========myReferrals");
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container-fluid mt-4   p-lg-5 p-md-5 p-sm-4 p-3 pt-5">
        <div className="row pb-2">
          <h6 className="font-28 font-500 cocon byerLine">My Referral</h6>
          <div className="text-end">
            <span
              className="p-2 rounded-3 colororing font-14 poppins fw-semibold"
              style={{ backgroundColor: "#F5F5FF" }}
            >
              <img
                src={earning}
                width={28}
                className="me-2"
                height={19}
                alt="w8"
              />
              Total Earning ${userDetail?.referral_earning}
            </span>
          </div>
        </div>
        <div className="row  boxshado mt-4 p-3 bg-white">
          <ReferalTable myReferrals={myReferrals} />
          <div className="d-flex justify-content-end hireexpert mt-3">
            <Stack spacing={4}>
              <Pagination
                count={myReferrals.length}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferalList;
