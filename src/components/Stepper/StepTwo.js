import { Button } from "@mui/material";
import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { FaAndroid, FaPencilAlt } from "react-icons/fa";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const StepTwo = ({
  basicPackage,
  setBasicPackage,
  standerdPackage,
  setStanderdPackage,
  premiumPackage,
  setPremiumPackage,
  sourceFileBasice,
  setSourceFileBasice,
  sourceFileStandard,
  setSourceFileStandard,
  sourceFilePremium,
  setSourceFilePremium,
  resolutionFileBasice,
  setResolutionFileBasice,
  resolutionFileStandard,
  setResolutionFileStandard,
  resolutionFilePremium,
  setResolutionFilePremium,
  totalBasic,
  setTotalBasic,
  totalStand,
  setTotalStand,
  totalPremium,
  setTotalPremium,
  ravisionBasic,
  setRavisionBasic,
  ravisionStadard,
  setRavisionStadard,
  ravisionPremium,
  setRavisionPremium,
  deliveryBasic,
  setDeliveryBasic,
  deliveryStadard,
  setDeliveryStadard,
  deliveryPremium,
  setDeliveryPremium,
  isErrorShowPricing,
  isErrorPricing,
}) => {
  // const [basicPackage, setBasicPackage] = useState('')
  // const [standerdPackage, setStanderdPackage] = useState('')
  // const [premiumPackage, setPremiumPackage] = useState('')
  // const [sourceFileBasice, setSourceFileBasice] = useState('no');
  // const [sourceFileStandard, setSourceFileStandard] = useState('no');
  // const [sourceFilePremium, setSourceFilePremium] = useState('no');
  // const [ravisionBasic, setRavisionBasic] = useState('')
  // const [ravisionStadard, setRavisionStadard] = useState('')
  // const [ravisionPremium, setRavisionPremium] = useState('')
  // const [deliveryBasic, setDeliveryBasic] = useState('')
  // const [deliveryStadard, setDeliveryStadard] = useState('')
  // const [deliveryPremium, setDeliveryPremium] = useState('')
  // const [resolutionFileBasice, setResolutionFileBasice] = useState('no');
  // const [resolutionFileStandard, setResolutionFileStandard] = useState('no');
  // const [resolutionFilePremium, setResolutionFilePremium] = useState('no');
  // const [totalBasic, setTotalBasic] = useState('$');
  // const [totalStandard, setTotalStandard] = useState('$');
  // const [totalPremium, setTotalPremium] = useState('$');
  // console.log(terms, '==========procing');
  const rows = [
    createData(
      "Package",
      <>
        <div className="poppins">
          <h4 className="font-20 blackcolor bg-white px-2 p-3 text-center rounded-1">
            Basic
          </h4>
          <div
            className={`${!basicPackage ? "d-flex align-items-center" : ""}`}
          >
            <input
              value={basicPackage}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setBasicPackage(e.target.value);
                }
              }}
              placeholder="Create a Basic Package"
              className="font-12 border-0 w-100 takegraycolor text-start packeges-input"
            />
            {/* {!basicPackage && <FaPencilAlt color="#667085" />} */}
          </div>
          <p className="font-12  takegraycolor text-end packeges-input mt-3"> max {basicPackage.length}/200</p>
        </div>
      </>,
      <>
        <div className="poppins">
          <h4 className="font-20 blackcolor bg-white px-2 p-3 text-center rounded-1">
            Standard
          </h4>
          <div
            className={`${!standerdPackage ? "d-flex align-items-center" : ""}`}
          >
            <input
              value={standerdPackage}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setStanderdPackage(e.target.value);
                }
              }}
              placeholder="Create a Standard Package"
              className="font-12 border-0 w-100 takegraycolor text-start packeges-input"
            />
            {/* {!standerdPackage && <FaPencilAlt color="#667085" />} */}
          </div>
          <p className="font-12  takegraycolor text-end packeges-input mt-3"> max {standerdPackage.length}/200</p>

        </div>
      </>,
      <>
        <div className="poppins">
          <h4 className="font-20 blackcolor bg-white px-2 p-3 text-center rounded-1">
            Premium
          </h4>
          <div
            className={`${!premiumPackage ? "d-flex align-items-center" : ""}`}
          >
            <input
              value={premiumPackage}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setPremiumPackage(e.target.value);
                }
              }}
              placeholder="Create a Premium Package"
              className="font-12 border-0 w-100 takegraycolor text-start packeges-input"
            />
            {/* {!premiumPackage && <FaPencilAlt cl color="#667085" />} */}
          </div>
          <p className="font-12  takegraycolor text-end packeges-input mt-3"> max {premiumPackage.length}/200</p>

        </div>
      </>
    ),
    createData(
      "Source File",
      <div class="form-check ps-0">
        <input
          class="form-check-input d-none"
          checked={sourceFileBasice === "yes"}
          onChange={(e) => setSourceFileBasice(e.target.checked ? "yes" : "no")}
          type="checkbox"
          id="sourceBasic"
        />
        <label class="form-check-label   cursor-pointer" for="sourceBasic">
          {sourceFileBasice === "yes" ? (
            <BsPatchCheckFill color="#F16336" size={20} />
          ) : (
            <BsPatchCheckFill color="#667085" size={20} />
          )}
        </label>
      </div>,
      <div class="form-check ps-0">
        <input
          class="form-check-input d-none"
          checked={sourceFileStandard === "yes"}
          onChange={(e) =>
            setSourceFileStandard(e.target.checked ? "yes" : "no")
          }
          type="checkbox"
          id="sourceStandard"
        />
        <label class="form-check-labely cursor-pointer" for="sourceStandard">
          {sourceFileStandard === "yes" ? (
            <BsPatchCheckFill color="#F16336" size={20} />
          ) : (
            <BsPatchCheckFill color="#667085" size={20} />
          )}
        </label>
      </div>,
      <div class="form-check ps-0">
        <input
          class="form-check-input d-none"
          checked={sourceFilePremium === "yes"}
          onChange={(e) =>
            setSourceFilePremium(e.target.checked ? "yes" : "no")
          }
          type="checkbox"
          id="sourcePremium"
        />
        <label class="form-check-labely cursor-pointer" for="sourcePremium">
          {sourceFilePremium === "yes" ? (
            <BsPatchCheckFill color="#F16336" size={20} />
          ) : (
            <BsPatchCheckFill color="#667085" size={20} />
          )}
        </label>
      </div>
    ),
    createData(
      "High Resolution",
      <div class="form-check ps-0">
        <input
          class="form-check-input d-none"
          checked={resolutionFileBasice === "yes"}
          onChange={(e) =>
            setResolutionFileBasice(e.target.checked ? "yes" : "no")
          }
          type="checkbox"
          id="resolutionBasic"
        />
        <label class="form-check-label   cursor-pointer" for="resolutionBasic">
          {resolutionFileBasice === "yes" ? (
            <BsPatchCheckFill color="#F16336" size={20} />
          ) : (
            <BsPatchCheckFill color="#667085" size={20} />
          )}
        </label>
      </div>,
      <div class="form-check ps-0">
        <input
          class="form-check-input d-none"
          checked={resolutionFileStandard === "yes"}
          onChange={(e) =>
            setResolutionFileStandard(e.target.checked ? "yes" : "no")
          }
          type="checkbox"
          id="resolutionStandard"
        />
        <label
          class="form-check-labely cursor-pointer"
          for="resolutionStandard"
        >
          {resolutionFileStandard === "yes" ? (
            <BsPatchCheckFill color="#F16336" size={20} />
          ) : (
            <BsPatchCheckFill color="#667085" size={20} />
          )}
        </label>
      </div>,
      <div class="form-check ps-0">
        <input
          class="form-check-input d-none"
          checked={resolutionFilePremium === "yes"}
          onChange={(e) =>
            setResolutionFilePremium(e.target.checked ? "yes" : "no")
          }
          type="checkbox"
          id="resolutionPremium"
        />
        <label class="form-check-labely cursor-pointer" for="resolutionPremium">
          {resolutionFilePremium === "yes" ? (
            <BsPatchCheckFill color="#F16336" size={20} />
          ) : (
            <BsPatchCheckFill color="#667085" size={20} />
          )}
        </label>
      </div>
    ),
    createData(
      "Ravision",
      <>
        <input
          value={ravisionBasic}
          onChange={(e) => {
            setRavisionBasic(e.target.value.replace(/[^0-9$]/g, ""));
          }}
          placeholder="0"
          className="font-20 fw-medium border-0 w-100 inter revision-field text-center packeges-input"
        />
      </>,
      <>
        <input
          value={ravisionStadard}
          onChange={(e) => {
            setRavisionStadard(e.target.value.replace(/[^0-9$]/g, ""));
          }}
          placeholder="0"
          className="font-20 fw-medium border-0 w-100 inter revision-field text-center packeges-input"
        />
      </>,
      <>
        <input
          value={ravisionPremium}
          onChange={(e) => {
            setRavisionPremium(e.target.value.replace(/[^0-9$]/g, ""));
          }}
          placeholder="0"
          className="font-20 fw-medium border-0 w-100 inter revision-field text-center packeges-input"
        />
      </>
    ),
    createData(
      "Delivery Time",
      <div className="d-flex justify-content-center">
        <select
          value={deliveryBasic}
          onChange={(e) => setDeliveryBasic(e.target.value)}
          className="form-select"
          aria-label="Default select example"
        >
          <option selected value="">
            select
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
        </select>
      </div>,
      <div className="d-flex justify-content-center">
        <select
          value={deliveryStadard}
          onChange={(e) => setDeliveryStadard(e.target.value)}
          className="form-select"
          aria-label="Default select example"
        >
          <option selected value="">
            select
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
        </select>
      </div>,
      <div className="d-flex justify-content-center">
        <select
          value={deliveryPremium}
          onChange={(e) => setDeliveryPremium(e.target.value)}
          className="form-select"
          aria-label="Default select example"
        >
          <option selected value="">
            select
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
        </select>
      </div>
    ),
    createData(
      "Total",
      <>
        <input
          value={totalBasic}
          onChange={(e) => {
            let value = e.target.value;

            // Remove dollar sign if it exists
            value = value.replace("$", "");

            // Remove non-numeric characters (except the dollar sign)
            value = value.replace(/[^0-9$]/g, "");

            // Add dollar sign back
            setTotalBasic("$" + value);
          }}
          className="font-20 fw-medium border-0 w-100 inter blackcolor text-center packeges-input"
        />
      </>,
      <>
        <input
          value={totalStand}
          onChange={(e) => {
            let value = e.target.value;

            // Remove dollar sign if it exists
            value = value.replace("$", "");

            // Remove non-numeric characters (except the dollar sign)
            value = value.replace(/[^0-9$]/g, "");

            // Add dollar sign back
            setTotalStand("$" + value);
          }}
          className="font-20 fw-medium border-0 w-100 inter blackcolor text-center packeges-input"
        />
      </>,
      <>
        <input
          value={totalPremium}
          onChange={(e) => {
            let value = e.target.value;

            // Remove dollar sign if it exists
            value = value.replace("$", "");

            // Remove non-numeric characters (except the dollar sign)
            value = value.replace(/[^0-9$]/g, "");

            // Add dollar sign back
            setTotalPremium("$" + value);
          }}
          className="font-20 fw-medium border-0 w-100 inter blackcolor text-center packeges-input"
        />
      </>
    ),
  ];

  return (
    <>
      <div className="stepTwo">
        <TableContainer className="step-two-table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    className="font-20  blackcolor"
                    sx={{ width: "300px" }}
                  >
                    <h4 className="font-20 inter blackcolor">{row.name}</h4>
                  </TableCell>
                  <TableCell sx={{ width: "300px" }} align="center">
                    {row.calories}
                  </TableCell>
                  <TableCell sx={{ width: "300px" }} align="center">
                    {row.fat}
                  </TableCell>
                  <TableCell sx={{ width: "300px" }} align="center">
                    {row.carbs}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <div className="container-fluid  rounded-bottom" style={{ backgroundColor: '#F5F5FF' }}>

                    <div className="row inter  justify-content-lg-end justify-content-md-end justify-content-center pt-4 pb-4 ">

                        <div className="col-3 text-center">

                            <Button className='btn-stepper-border poppins px-3 w-100 font-16'>
                                Select
                            </Button>

                        </div>
                        <div className="col-3 text-center">
                            <Button className='btn-stepper-border poppins px-3 w-100 font-16'>
                                Select
                            </Button>
                        </div>
                        <div className="col-3 text-center">
                            <Button className='btn-stepper poppins px-3 w-100 font-16'>
                                Select
                            </Button>

                        </div>
                    </div>
                </div> */}
        {isErrorPricing && (
          <div
            className="alert alert-danger mt-3 poppins text-center"
            role="alert"
          >
            {isErrorShowPricing}
          </div>
        )}
      </div>
    </>
  );
};

export default StepTwo;
