import { MdLocationOn } from "react-icons/md";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../style/imgSlider.scss";

const ExpertCard = ({ user, showBdDetail }) => {
  return (
    <div className="mt-3 p-2" onClick={() => showBdDetail(user)}>
      <div className="d-flex mt-2 ms-3">
        <div>
          <img src={user?.image} width={70} height={70} alt="" />
        </div>
        <div className="ms-3">
          <h6 className="colororing font-18 font-500 poppins">
            {user?.fname + " " + user?.lname}
          </h6>
          <p className="colororing mb-0 font-14 poppins">Business Developer</p>
          <p className="font-12 poppins">
            <MdLocationOn className="colororing " />
             {user?.country}
          </p>
        </div>
      </div>
      <div className="d-flex flex-wrap mt-2">
        <div>
          <button
            type="button "
            className="btn-circl rounded-2 me-5 font-10 font-500 poppins"
          >
            Available Now
          </button>
        </div>
        {/* <div>
          <p className="font-15 poppins">${user?.hourly_rate}</p>
        </div> */}
        {/* <div className='ms-3'><p className='font-15 poppins'>$100+ earned</p></div> */}
      </div>
      <div className="mt-2">
        <p className="font-15 poppins textgray">{user?.description}</p>
      </div>
    </div>
  );
};

export default ExpertCard;
