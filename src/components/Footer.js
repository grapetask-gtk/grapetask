import { Link } from "react-router-dom";
import fbook from "../assets/Facebook.webp";
import insta from "../assets/Instagram.webp";
import lindin from "../assets/Linkedin.webp";
import tewter from "../assets/Twitter.webp";
import youtub from "../assets/Youtube.webp";
import apple from "../assets/apple.webp";
import foter from "../assets/foter.webp";
import mobil from "../assets/mobileapp.webp";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="curved-div"></div>
        <div
          className="container-fluid pt-5  position-relative poppins"
          style={{ backgroundColor: "#F5F5FF" }}
        >
         <img
  src={foter}
  className="position-absolute fotereimg w-100"
  style={{ zIndex: -1, pointerEvents: "none" }}
  alt=""
/>

          <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="row h-100">
                  <div className="col-lg-6 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3 d-flex justify-content-between flex-column">
                    <div>
<h5 className="font-20">For Clients</h5>
<Link to="/how-to-hire" >
     {" "}
                 
       
How to Hire{" "}
</Link>
<Link to="/talent-marketplace" className="font-16 d-block">Talent Marketplace</Link>
<Link to="/project-catalog" className="font-16 d-block">Project Catalog</Link>
<Link to="/talent-scout" className="font-16 d-block">Talent Scout</Link>
<Link to="/hire-an-agency" className="font-16 d-block">Hire an Agency</Link>
<Link to="/enterprise" className="font-16 d-block">Enterprise</Link>
<Link to="/payroll-services" className="font-16 d-block">Payroll Services</Link>
<Link to="/direct-contracts" className="font-16 d-block">Direct Contracts</Link>
<Link to="/hire-worldwide" className="font-16 d-block">Hire Worldwide</Link>
<Link to="/hire-in-usa" className="font-16 d-block">Hire in the USA</Link>

                    </div>
                    <div className="mt-3">
                      <p className="font-16">Follows Us</p>
                      <span className="">
                        <img width={30} height={30} src={fbook} alt="" />
                      </span>
                      <span className="ms-2">
                        <img width={30} height={30} src={lindin} alt="" />
                      </span>
                      <span className="ms-2">
                        <img width={30} height={30} src={tewter} alt="" />
                      </span>
                      <span className="ms-2">
                        <img width={30} height={30} src={insta} alt="" />
                      </span>
                      <span className="ms-2">
                        <img width={30} height={30} src={youtub} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12  mt-lg-5 mt-md-4 mt-3">
                 <h5 className="font-20">For Talents</h5>
<Link to="/how-to-find-work" className="font-16 d-block">How to Find Work</Link>
<Link to="/direct-contracts" className="font-16 d-block">Direct Contracts</Link>
<Link to="/freelance-jobs-worldwide" className="font-16 d-block">Find Freelance Jobs Worldwide</Link>
<Link to="/freelance-jobs-usa" className="font-16 d-block">Find Freelance Jobs in the USA</Link>
 </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="row h-100">
                  <div className="col-lg-6 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
                  <h5 className="font-20">Resources</h5>
<Link to="/help-support" className="font-16 d-block">Help & Support</Link>
<Link to="/success-stories" className="font-16 d-block">Success Stories</Link>
<Link to="/upwork-reviews" className="font-16 d-block">Upwork Reviews</Link>
<Link to="/resources" className="font-16 d-block">Resources</Link>
<Link to="/blog" className="font-16 d-block">Blog</Link>
<Link to="/community" className="font-16 d-block">Community</Link>
<Link to="/affiliate-program" className="font-16 d-block">Affiliate Program</Link>
<Link to="/business-tools" className="font-16 d-block">Free Business Tools</Link>

                  </div>
                  <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-between flex-column mt-lg-5 mt-md-4 mt-3">
                    <div>
                   <h5 className="font-20">Company</h5>
<Link to="/about-us" className="font-16 d-block">About Us</Link>
<Link to="/leadership" className="font-16 d-block">Leadership</Link>
<Link to="/investor-relations" className="font-16 d-block">Investor Relations</Link>
<Link to="/careers" className="font-16 d-block">Careers</Link>
<Link to="/our-impact" className="font-16 d-block">Our Impact</Link>
<Link to="/press" className="font-16 d-block">Press</Link>
<Link to="/contact-us" className="font-16 d-block">Contact Us</Link>
<Link to="/trust-safety" className="font-16 d-block">Trust, Safety, and Security</Link>
<Link to="/modern-slavery" className="font-16 d-block">Modern Slavery Statement</Link>

                    </div>
                    <div className="mt-3">
                      <p className="me-3">Mobile Apps</p>

                      <div>
                        <span className="">
                          <img src={apple} width={30} height={30} alt="" />
                        </span>
                        <span className="ms-2">
                          <img width={30} height={30} src={mobil} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="d-flex flex-wrap justify-content-between mb-3 pt-3 align-items-center">
              <p className="font-16 mb-0">© 2023 GrapeTask® Global Inc.</p>
              <div className="">
                <Link className="me-3 font-16" to="/terms">
                  {" "}
                  Terms of Service{" "}
                </Link>
                <Link className="me-3 font-16" to="/privacy">
                  Privacy Policy
                </Link>
                <Link className="me-3 font-16" to="/refund">
                  {" "}
                  Refund Policy{" "}
                </Link>
                <Link className="me-3 font-16" to="/shipping">
                  Shipping Policy
                </Link>
                <Link className="font-16">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>
        {`
                    .curved-div {
                        width: 100%; /* Div ki chaurai */
                        height: 300px; /* Div ki unchai */
                        background-color: #F5F5FF;
                        position: relative;
                        overflow: hidden;
                      }
                      
                      .curved-div::before {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        width: 200%; /* Isse curve banega */
                        padding-bottom: 200%; /* Isse curve ki curvature decide hogi */
                        border-radius: 50%;
                        background-color: white; /* Isse curve ka background color set hoga */
                        transform: translateX(-50%);

                      }
                    `}
      </style>
    </>
  );
};

export default Footer;
