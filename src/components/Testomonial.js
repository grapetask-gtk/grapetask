import React from "react";
import whysey from "../assets/WhySay.webp";
import star from "../assets/star.webp";
import Slider from "react-slick";
import { BsArrowRight } from "react-icons/bs";
const Testomonial = () => {
  const settings3 = {
    dots: false,
    speed: 5000,
    autoplay: false,
    autoplaySpeed: 1500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container-fluid  mt-lg-5 mt-md-4 mt-2 p-lg-5 p-md-5 p-sm-4 p-3 testimonals-main">
        <div className="row justify-content-between poppins">
          <div className="col-lg-5  col-12">
            <p className="colororing line-befor d-flex align-items-center font-16">
              TESTIMONIAL
            </p>
            <h4 className="colororing font-28 font-500 cocon">
            Success speaks for itself?
            </h4>
            <div></div>
            <div className="" style={{ color: "rgba(102, 112, 133, 1)" }}>
              <p className="font-16">
              Join the thousands of users that trust our platform for high-quality freelance services. We help businesses connect with qualified experts to bring their imaginative concepts to reality. {" "}
              </p>

              <p className="font-16">
              Whether you require experienced assistance or a creative mind, we have the ideal solution for you.
              </p>

              <p className="font-16">
                Are you too? Please give your assessment
              </p>
            </div>
            <div className="row">
              <div className="col-lg-10 col-12">
                <div className="input-group w-100 mb-3 Testimonial ">
                  <input
                    type="text"
                    className="form-control ms-3 font-16"
                    placeholder="Write your assessment"
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                  >
                    <BsArrowRight size={20} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-lg-0 mt-4 col-12 className='d-flex justify-content-center'">
            <Slider {...settings3}>
              <div className="position-relative testi-slider-cards">
                <img src={whysey} className="w-75 ceo-img rounded-5 " alt="freelance marketplace" />
                <div className="treslent">
                  <p className=" ps-4 mb-0 font-16">
                    "Thank you so much for your help. It's exactly what I've
                    been looking for. You won't regret it. It really saves me
                    time and effort. TOTC is exactly what our business has been
                    lacking."
                  </p>
                  <div className="d-flex flex-wrap justify-content-between ">
                    <div className="mt-2 fw-medium">
                      <p className="font-16">Gloria Rose</p>
                    </div>
                    <div className="">
                      <div className=" justify-content-between d-flex">
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                      </div>
                      <div className="mt-2 mb-0">
                        <p className="mb-0 font-14">12 reviews at Yelp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="position-relative testi-slider-cards">
                <img src={whysey} className="w-75 ceo-img rounded-5" alt="" />
                <div className="treslent">
                  <p className=" ps-4 mb-0 font-16">
                    "Thank you so much for your help. It's exactly what I've
                    been looking for. You won't regret it. It really saves me
                    time and effort. TOTC is exactly what our business has been
                    lacking."
                  </p>
                  <div className="d-flex flex-wrap justify-content-between ">
                    <div className="mt-2 fw-medium">
                      <p className="font-16">Gloria Rose</p>
                    </div>
                    <div className="">
                      <div className=" justify-content-between d-flex">
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                      </div>
                      <div className="mt-2 mb-0">
                        <p className="mb-0 font-14">12 reviews at Yelp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="position-relative testi-slider-cards">
                <img src={whysey} className="w-75 ceo-img rounded-5" alt="" />
                <div className="treslent">
                  <p className=" ps-4 mb-0 font-16">
                    "Thank you so much for your help. It's exactly what I've
                    been looking for. You won't regret it. It really saves me
                    time and effort. TOTC is exactly what our business has been
                    lacking."
                  </p>
                  <div className="d-flex flex-wrap justify-content-between ">
                    <div className="mt-2 fw-medium">
                      <p className="font-16">Gloria Rose</p>
                    </div>
                    <div className="">
                      <div className=" justify-content-between d-flex">
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                        <img src={star} alt="" />
                      </div>
                      <div className="mt-2 mb-0">
                        <p className="mb-0 font-14">12 reviews at Yelp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testomonial;
