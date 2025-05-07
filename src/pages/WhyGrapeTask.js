import React from "react";
import assist from "../assets/Whygraptask-hero-img.webp";
import whyimg from "../assets/why-grap-img2.webp";
import proposl from "../assets/proposl.webp";
import togwork from "../assets/togwork.webp";
import thnks from "../assets/thanks.webp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import lines from "../assets/line.webp";
<<<<<<< HEAD
import CommonHelmet from "./CommonHelmet";
=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
import { Link } from "react-router-dom";
import { SiFuturelearn } from "react-icons/si";
import { FaChevronRight, FaCode, FaProjectDiagram } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import Flexibility from "../assets/flexible.webp";
import Independence from "../assets/Independence.webp";
const WhyGrapeTask = () => {
  return (
    <>
<<<<<<< HEAD
      <CommonHelmet
        title="Best Freelance Platform |Low Commission & Free Bids|GrapeTask"
        name="description"
        content="Join GrapeTask, a low commission freelancing site with free bids. Post your projects today and hire top talent with zaro experience a fast & easy hirings"
        keywords="Low commission freelancing site, Best freelance platform ,Free bids ,Post your projects ,freelancing site"
        canonical="https://www.grapetask.co/whygrapetask"
      />

=======
>>>>>>> d918fe2 (cahnges by abdul qavi)
      <Navbar SecondNav="none" />
      <div className="container-fluid pt-2 px-3 why-grape-herosection">
        <div className="row h-100">
          <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center justify-content-center px-lg-4 px-3">
            <h1 className="font-40 fw-medium cocon">
<<<<<<< HEAD
              How GrapeTask Can
              <span className="colororing"> Help You Succeed</span>
              <br className="d-xl-block d-none" />
              in Freelancing?
            </h1>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <img src={assist} className="w-100 h-100 " alt="hire freelancers" />
=======
              How Can Grape <span className="colororing"> Task</span> assist
              <br className="d-xl-block d-none" /> you in Your Freelancing
              <br className="d-lg-block d-none" />
              Business?
            </h1>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <img src={assist} className="w-100 h-100 " alt="w8" />
>>>>>>> d918fe2 (cahnges by abdul qavi)
          </div>
        </div>
      </div>
      <div
        className="container-fluid position-relative p-lg-5 p-md-5 p-sm-4 p-3  "
        style={{ backgroundColor: "#F6F6F6" }}
      >
<<<<<<< HEAD
        <h2 className="text-center font-40 fw-medium cocon">
          Why Work with Grapetask?
        </h2>
        <div className="d-flex justify-content-center">
          <img
            src={lines}
            className="text-center"
            alt="website for freelancers"
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-12 d-flex align-items-center">
            <img
              src={whyimg}
              alt="Online freelacing platform"
              className="w-100"
            />
=======
        <h3 className="text-center font-40 fw-medium cocon">Why GrapeTask</h3>
        <div className="d-flex justify-content-center">
          <img src={lines} className="text-center" alt="" />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-12 d-flex align-items-center">
            <img src={whyimg} alt="w8" className="w-100" />
>>>>>>> d918fe2 (cahnges by abdul qavi)
          </div>
          <div className="col-lg-6 col-12">
            <div className="whyGrap_cards container-fluid mt-3 ">
              <div className="row align-items-center px-3 p-4">
                <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                  <div className=" why-icon  w-100">
                    <SiFuturelearn size={20} />
                  </div>
                </div>
                <div className="col-lg-10 col-12 poppins mt-lg-0 mt-3">
                  <h5 className="font-20">Earning Potential </h5>
                  <p className="font-14 mb-0">
<<<<<<< HEAD
                  Maximize your income with one of the best freelance platforms. With our low commission freelancing site, you keep more of what you earn while accessing global outsourcing opportunities.
=======
                    Leverage your expertise to attract high-paying clients and
                    increase your income potential..
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </p>
                </div>
              </div>
            </div>
            <div className="whyGrap_cards container-fluid mt-3 ">
              <div className="row align-items-center px-3 p-4">
                <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                  <div className=" why-icon  w-100">
<<<<<<< HEAD
                    <img
                      src={Flexibility}
                      width={20}
                      height={20}
                      alt="freelance talent "
                    />
=======
                    <img src={Flexibility} width={20} height={20} alt="w8 " />
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </div>
                </div>
                <div className="col-lg-10 col-12 poppins mt-lg-0 mt-3">
                  <h5 className="font-20">Flexibility </h5>
                  <p className="font-14 mb-0">
<<<<<<< HEAD
                  Work from anywhere and select assignments that work with your schedule. Whether you’re looking for full-time freelancing or side gigs, our fast and easy hiring platform gives you complete control.
=======
                    Enjoy the freedom to choose your own schedule, work from
                    anywhere, and achieve a better work-life balance.
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </p>
                </div>
              </div>
            </div>
            <div className="whyGrap_cards container-fluid mt-3 ">
              <div className="row align-items-center px-3 p-4">
                <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                  <div className=" why-icon  w-100">
<<<<<<< HEAD
                    <img
                      src={Independence}
                      width={20}
                      height={20}
                      alt="project managment "
                    />
=======
                    <img src={Independence} width={20} height={20} alt="w8" />
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </div>
                </div>
                <div className="col-lg-10 col-12 poppins mt-lg-0 mt-3">
                  <h5 className="font-20">Independence </h5>
                  <p className="font-14 mb-0">
<<<<<<< HEAD
                  Set your own rates, pick the projects you want, and enjoy financial freedom. GrapeTask supports freelancers in building long-term careers with consistent opportunities.
=======
                    Be your own boss, make decisions, and have full control over
                    your career path..
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </p>
                </div>
              </div>
            </div>
            <div className="whyGrap_cards container-fluid mt-3 ">
              <div className="row align-items-center px-3 p-4">
                <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                  <div className=" why-icon  w-100">
                    <MdOutlineAccountBalanceWallet size={20} />
                  </div>
                </div>
                <div className="col-lg-10 col-12 poppins mt-lg-0 mt-3">
                  <h5 className="font-20">Work-Life Balance </h5>
                  <p className="font-14 mb-0">
<<<<<<< HEAD
                  Work on diverse projects and expand your expertise. Every task helps you gain experience, improve your skills, and grow professionally in your freelancing journey.{" "}
=======
                    Prioritize personal commitments, avoid long commutes, and
                    have more time for family and hobbies.{" "}
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </p>
                </div>
              </div>
            </div>
            <div className="whyGrap_cards container-fluid mt-3 ">
              <div className="row align-items-center px-3 p-4">
                <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                  <div className=" why-icon  w-100">
                    <FaCode size={20} />
                  </div>
                </div>
                <div className="col-lg-10 col-12 poppins mt-lg-0 mt-3">
                  <h5 className="font-20">Skill Development </h5>
                  <p className="font-14 mb-0">
<<<<<<< HEAD
                  From startups to established businesses, clients trust GrapeTask for project outsourcing. Explore different industries, develop new skills, and expand your expertise.
=======
                    Continuously learn and adapt to new projects, technologies,
                    and client requirements, enhancing your skills and staying
                    relevant..
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </p>
                </div>
              </div>
            </div>
            <div className="whyGrap_cards container-fluid mt-3 ">
              <div className="row align-items-center px-3 p-4">
                <div className="col-lg-2 col-md-2 col-sm-3 col-4">
                  <div className=" why-icon  w-100">
                    <FaProjectDiagram size={20} />
                  </div>
                </div>
                <div className="col-lg-10 col-12 poppins mt-lg-0 mt-3">
                  <h5 className="font-20">Variety of Projects</h5>
                  <p className="font-14 mb-0">
<<<<<<< HEAD
                  Build long-term relationships with reliable clients. Our platform connects you with businesses that value your skills, increasing your chances of repeat projects and steady income.{" "}
=======
                    Explore diverse projects and clients across industries,
                    expanding your skills and professional network..{" "}
>>>>>>> d918fe2 (cahnges by abdul qavi)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-lg-5 mt-md-4 mt-3 px-lg-5 px-md-3 poppins  ">
        <div className="container-lg container-fluid">
          <div className="row justify-content-between">
<<<<<<< HEAD
            <h3 className="text-center font-40 fw-medium cocon">
              Grow Your Business at Every Step-{" "}
              <br className="d-lg-block d-none" /> From Pitch to Payment
            </h3>
            <div className="d-flex justify-content-center">
              <img
                src={lines}
                className="text-center"
                alt="Perfect Proposals"
              />
            </div>
            <div className="col-lg-5 col-12 align-self-center mt-3">
              <h4 className="font-30 font-500 blackcolor poppins">
                Perfect Proposals That Win Clients
              </h4>
              <p className="font-16 poppins textcolorgray">
                Create winning proposals on our freelance marketplace. Impress
                clients, secure projects, and move closer to financial freedom
                with effective outsource solutions.
=======
            <h1 className="text-center font-40 fw-medium cocon">
              Boost every part of your business -{" "}
              <br className="d-lg-block d-none" /> from proposal to payment
            </h1>
            <div className="d-flex justify-content-center">
              <img src={lines} className="text-center" alt="" />
            </div>
            <div className="col-lg-5 col-12 align-self-center mt-3">
              <h2 className="font-30 font-500 blackcolor poppins">
                On-point proposals
              </h2>
              <p className="font-16 poppins textcolorgray">
                Use smart proposals that also seamlessly generate contracts,
                collect deposits, and so much more.
>>>>>>> d918fe2 (cahnges by abdul qavi)
              </p>
              <Link className="colororing font-14 poppins">
                Take a Closer Look <FaChevronRight />
              </Link>
            </div>
            <div className="col-lg-5 col-12 mt-5  ">
              <div className="mt-5 togather p-lg-5 p-md-4 p-3 pt-5 position-relative">
                <img
                  src={togwork}
                  className="position-absolute ms-4"
                  style={{ top: "-18%", left: "2%" }}
                  alt=""
                />
                <p className="font-20 poppins textgray">Proposal</p>
<<<<<<< HEAD
                <h5 className="font-28 blackcolor poppins ">
                  Send Winning Proposals
                </h5>
                <p className="font-18 poppins textgray">Hi, John!</p>
                <p className="font-18 poppins textgray">
                  Thank you for sharing your project! I'm excited to present
                  this proposal to help you achieve your goals.
                </p>
                <img src={proposl} className="w-100" alt="Perfect Proposals" />
=======
                <h3 className="font-28 blackcolor poppins ">
                  Let’s work togather!
                </h3>
                <p className="font-18 poppins textgray">Hi, John!</p>
                <p className="font-18 poppins textgray">
                  Thanks for telling me about your project. I’m delighted to
                  share this proposal with you!
                </p>
                <img src={proposl} className="w-100" alt="w8" />
>>>>>>> d918fe2 (cahnges by abdul qavi)
              </div>
            </div>
          </div>
          <div className="row justify-content-between flex-lg-row flex-column-reverse ">
            <div className="col-lg-5 col-12 mt-lg-5 mt-4">
              <div className="togather h-75 p-2">
                <div className="p-lg-5 p-md-4 p-3">
                  <p className="font-18 poppins textcolorgray">
                    Thanks for telling me about your project. I’m delighted to
                    share this proposal with you!
                  </p>
<<<<<<< HEAD
                  <img
                    src={thnks}
                    className="mt-2 w-100"
                    alt="Work with Grapetask"
                  />
=======
                  <img src={thnks} className="mt-2 w-100" alt="w8" />
>>>>>>> d918fe2 (cahnges by abdul qavi)
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12 align-self-center mt-lg-0 mt-4">
<<<<<<< HEAD
              <h4 className="font-30 font-500 blackcolor poppins">
                Instant Contract Approval
              </h4>
              <p className="font-16 poppins textcolorgray">
                Get contracts signed in minutes. Our freelance marketplace
                streamlines outsourcing, letting you focus on projects and
                financial freedom instead of paperwork.
=======
              <h2 className="font-30 font-500 blackcolor poppins">
                Contracts ready to sign
              </h2>
              <p className="font-16 poppins textcolorgray">
                Easily edit and share pre-populated contracts that build secure,
                fair relationships between you and your clients.
>>>>>>> d918fe2 (cahnges by abdul qavi)
              </p>
              <Link className="colororing font-14 poppins">
                Take a Closer Look <FaChevronRight />
              </Link>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-lg-5 col-12 align-self-center mt-lg-0 mt-4">
<<<<<<< HEAD
              <h4 className="font-30  font-500 blackcolor poppins">
                Easy Invoicing & Secure Payments
              </h4>
              <p className="font-16  poppins textcolorgray">
                Create and automate invoices with ease. Accept secure payments
                fast in any currency—bank transfer, credit card, or PayPal.
=======
              <h2 className="font-30  font-500 blackcolor poppins">
                Seamless invoicing & payments
              </h2>
              <p className="font-16  poppins textcolorgray">
                Customize and automate invoices and accept payments quickly and
                securely, in any currency, via bank transfer, credit card, or
                PayPal.
>>>>>>> d918fe2 (cahnges by abdul qavi)
              </p>
              <Link className="colororing font-14 poppins">
                Take a Closer Look <FaChevronRight />
              </Link>
            </div>

            <div className="col-lg-5 col-12  mt-lg-5 mt-4">
              <div className="mt-lg-5 togather p-lg-5 p-md-4 p-3">
<<<<<<< HEAD
                <h5 className="font-28 font-500 blackcolor poppins">
                  Easy Invoicing
                </h5>
                <p className="font-18 poppins textgray ">
                  Send invoices effortlessly. Our freelance marketplace
                  simplifies payments and boosts cash flow.
=======
                <h5 className="font-28 font-500 blackcolor poppins">Invoice</h5>
                <p className="font-18 poppins textgray ">
                  Use smart proposals that also seamlessly generate contracts,
                  collect deposits, and.
>>>>>>> d918fe2 (cahnges by abdul qavi)
                </p>
                <img src={proposl} className="w-100" alt="w8" />
                <h5 className="mt-lg-4 mt-md-2 mt-2 font-20 poppins textgray">
                  Terms & Condition
                </h5>
                <h5 className="mt-lg-4 mt-md-2 mt-2 font-20 poppins blackcolor">
                  Contrary to popular belief,
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
                .why-grape-herosection{
                    min-height:calc(100vh - 98px);
                }
                @media (max-width:768px){
                    .why-grape-herosection{
                        min-height:auto;
                    }
                }
                `}</style>
    </>
  );
};

export default WhyGrapeTask;
