import { BsFacebook, BsMessenger } from "react-icons/bs";
import { FaEnvelope, FaTwitter } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Level3 = () => {
  // const { userDetail, isLoading, getError } = useSelector((state) => state.profile);

  const userDetail = JSON.parse(localStorage.getItem("UserData") || "{}");
  return (
    <>
      <Navbar FirstNav="none" />
      <div className="container pt-5 pb-5">
        <div className="row justify-content-center text-center">
          <h3 className="font-36 font-500 cocon Refertextcolor">
            Level 3 Referral Bonus: Earn 12 Bonus Bids!
          </h3>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="boxshado rounded-3 p-lg-5 p-md-4 p-4 mt-4">
              <h6 className="inter font-16 font-500 Refertextcolor">
                Invite your extended network and earn an indirect bonus of 12 bids for every successful referral.
                Your friend will also receive a 50 bid sign-up bonus!
              </h6>
              <p className="font-16 font-600 poppins text-decoration-underline tremstextcolor">
                Terms & Conditions
              </p>
              <div className="mt-lg-4 mt-md-3 mt-2">
                <h6 className="font-16 font-700 poppins Refertextcolor">
                  Share your referral link using:
                </h6>
                <div className="d-flex justify-content-center mt-4">
                  <FaEnvelope color="#F16336" size={35} />
                  <BsFacebook className="mx-5" color="#F16336" size={35} />
                  <BsMessenger color="#F16336" size={35} />
                  <FaTwitter className="ms-5" color="#F16336" size={35} />
                </div>
              </div>
              <div className="mt-lg-5 mt-md-3 mt-2">
                <p className="mb-0 font-16 inter Refertextcolor">
                  Or copy your personal referral link
                </p>
                <div className="input-group mb-3 mt-2">
                  <input
                    type="text"
                    className="form-control orderinput p-2 poppins"
                    value={`https://grapetask.com/signup?referral=${userDetail?.referral_code}`}
                    readOnly
                  />
                  <div className="p-2 backgroundoring ms-0 rounded-0">
                    <span>
                      <MdOutlineContentCopy />
                    </span>
                  </div>
                </div>
                <Link to="/thanks">
                  <button type="button" className="btn-circl mt-3 rounded-1">
                    Invite
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Level3;
