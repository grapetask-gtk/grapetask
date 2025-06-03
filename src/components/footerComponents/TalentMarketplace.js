import { BsPinterest } from "react-icons/bs";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
// import devImg from "../assets/imge4.webp";
// import designImg from "../assets/imge5.webp";
// import writerImg from "../assets/imge6.webp";
// import line from "../assets/line.webp";
import Navbar from "../Navbar";

const TalentMarketPlace = () => {
  return (
    <>
       <Navbar FirstNav="none" />
    <div className="container">
      <div className="row justify-content-center text-center">
        <h3 className="font-40 font-500 cocon">
          Explore the Talent Marketplace <br className="d-lg-block d-md-block d-none" />
          Find Professionals by Category
        </h3>
        <div className="d-flex justify-content-center">
          {/* <img src={line} className="text-center" alt="separator line" /> */}
        </div>

        {/* Developers */}
        <div className="col-lg-4 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
          <div className="position-relative about-expert-befor">
            {/* <img src={devImg} className="w-100 rounded-2" alt="Developers" /> */}
            <div className="about-expert-images px-2 p-3">
              <FiInstagram color="#1F2732" size={22} />
              <FaFacebook className="mx-4" color="#1F2732" size={22} />
              <FaTwitter color="#1F2732" size={22} />
              <BsPinterest color="#1F2732" className="ms-4" size={22} />
            </div>
          </div>
          <h4 className="font-28 font-Garamond fw-bold mt-4">Web & App Developers</h4>
          <p className="font-18 colororing">Frontend, Backend, Full-stack Experts</p>
        </div>

        {/* Designers */}
        <div className="col-lg-4 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
          <div className="position-relative about-expert-befor">
            {/* <img src={designImg} className="w-100 rounded-2" alt="Designers" /> */}
            <div className="about-expert-images px-2 p-3">
              <FiInstagram color="#1F2732" size={22} />
              <FaFacebook className="mx-4" color="#1F2732" size={22} />
              <FaTwitter color="#1F2732" size={22} />
              <BsPinterest color="#1F2732" className="ms-4" size={22} />
            </div>
          </div>
          <h4 className="font-28 font-Garamond fw-bold mt-4">Creative Designers</h4>
          <p className="font-18 colororing">UI/UX, Graphic, and Motion Designers</p>
        </div>

        {/* Writers */}
        <div className="col-lg-4 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
          <div className="position-relative about-expert-befor">
            {/* <img src={writerImg} className="w-100 rounded-2" alt="Writers" /> */}
            <div className="about-expert-images px-2 p-3">
              <FiInstagram color="#1F2732" size={22} />
              <FaFacebook className="mx-4" color="#1F2732" size={22} />
              <FaTwitter color="#1F2732" size={22} />
              <BsPinterest color="#1F2732" className="ms-4" size={22} />
            </div>
          </div>
          <h4 className="font-28 font-Garamond fw-bold mt-4">Professional Writers</h4>
          <p className="font-18 colororing">Content, Copywriting & SEO Experts</p>
        </div>

        <div className="mt-lg-5 mt-md-4 mt-3">
          <button className="btn-with-border px-5 font-20 fw-medium">
            Browse Marketplace
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TalentMarketPlace;
