import React from 'react';
import mainimg from '../assets/mainbig.png'
import recent from '../assets/ffff.png'
import recent1 from '../assets/rectan.png'
import recent2 from '../assets/recran.png'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider = () => {
  const data = [
    {
      image: recent1,
      // caption: "Image 1",
    },
    {
      image: recent,
      // caption: "Image 2",
    },
    {
      image: mainimg,
      // caption: "Image 3",
    },
    {
      image: recent2,
    },
    // Add more images and captions here
  ];

  return (
    <div className="imgSlider">

      <Carousel
        showThumbs={true}
        infiniteLoop={true}
        autoPlay={false}
        dots={false}
        showArrows={true}
        showStatus={false}
      >
        {data.map((item, index) => (
          <div key={index}>
            <img src={item.image} className='w-100' alt={item.caption} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
