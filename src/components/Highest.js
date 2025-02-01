import React, { useEffect } from 'react'
import line from '../assets/line.png'
import CardImg from '../assets/GigCradImg.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import '../style/imgSlider.scss'
import Card from './Card'
import { sellerRating } from '../redux/slices/ratingSlice';
import { useDispatch, useSelector } from '../redux/store/store';
const Highest = () => {
  // ===========Top Rated Seller ============
  const dispatch = useDispatch()

  const { userDetail } = useSelector((state) => state.rating);


  useEffect(() => {
    dispatch(sellerRating());
  }, [dispatch])
  const filterByTopGigs = (array, targetType) => {
    // return array.filter((obj) => obj.type === targetType);
    return array?.filter((obj) => obj.ratings === targetType) || [];
  };

  const TopRatedGigs = filterByTopGigs(userDetail, "5");
  console.log(TopRatedGigs, '============TopRatedGigs');
  const setting = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    // fade:true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
  return (
    <>
      {/* Highest Rated Freelancers section */}
      {TopRatedGigs.length >= 4 && <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3 mt-5 height-slider">
        <div className="row justify-content-center">
          <h3 className='text-center cocon'>Top Ranked Gigs.</h3>
          <div className='d-flex justify-content-center mt-3'>
            <img src={line} className='text-center' alt="" />
          </div>
          <div className='container rounded-3  gigs-slider mt-4 pt-3' style={{ backgroundColor: '#F5F5FF' }}>
            <Slider {...setting}>
              {TopRatedGigs.map((innerValue) => (
                <Card
                  gigsImg={
                    innerValue.gig?.media &&
                    (innerValue.gig?.media.image1 == null
                      ? innerValue.gig?.media.image2 == null
                        ? innerValue.gig?.media.image3
                        : innerValue.gig?.media.image2
                      : innerValue.gig?.media.image1)
                  }
                  minHeight="50px"
                  heading={innerValue.title.substring(0, 50) + '...'}
                  phara={stripHtmlTags(innerValue.description.substring(0, 100) + '...')}
                  star1="#F16336"
                  star2="#F16336"
                  star3="#F16336"
                  star4="#F16336"
                  star5="#F16336"
                  projectNumber="0"
                // price={innerValue.package[0]?.total}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>}

    </>
  )
}

export default Highest
