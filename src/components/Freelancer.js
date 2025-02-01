import React, { useState } from 'react'
import DefaultImage from '../assets/default.webp';
const Freelancer = (props) => {
  const [imgSrc, setImgSrc] = useState(props.imges);
  const [error, setError] = useState(false);
const handleImageError = () => {
  if (!error) {
    setImgSrc(DefaultImage);
    setError(true);
  }
};
  return (
    <>
      <div className='mt-3'>
        <img className='w-100 rounded-2 courser gig-image' onClick={props.handleNavigate} onError={handleImageError} src={imgSrc} alt="Imge Not Found" />
        <div className='d-flex justify-content-between '>
        <h5 className='mt-2 font-15 poppins'>{props.heading}</h5>
        <h5 className='mt-2 font-15 poppins'>{props.price}</h5>
        </div>
      </div>
    </>
  )
}

export default Freelancer
