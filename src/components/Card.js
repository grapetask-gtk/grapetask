import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import DefaultImage from '../assets/default.webp';

const Card = (props) => {
    const [imgSrc, setImgSrc] = useState(props.gigsImg);
    const [error, setError] = useState(false);
  const handleImageError = () => {
    if (!error) {
      setImgSrc(DefaultImage);
      setError(true);
    }
  };
    return (
        <>
            <div className='p-3 whitcard h-100 d-flex flex-column justify-content-between'>
                <div>

                    <img style={{width:'100%'}} src={imgSrc} onError={handleImageError} height={150} alt="Media File" />
                    <div className="d-flex mt-3 justify-content-between ">

                        <h5 className=' fw-semibold font-20 poppins' style={{ minHeight: props.minHeight }}>{props.heading}</h5>
                        <div>
                            {props.arrow}
                        </div>
                    </div>
                    <p className='poppins font-12' style={{ color: '#667085' }}>{props.phara}</p>
                </div>
                <div>

                    <div className='d-flex align-tems-center'>
                        <div className='d-flex align-tems-center'>

                            <FaStar color={props.star1} />
                            <FaStar color={props.star2} className='mx-1' />
                            <FaStar color={props.star3} />
                            <FaStar color={props.star4} className='mx-1' />
                            <FaStar color={props.star5} />

                        </div>
                        <p className='inter font-14 mb-0 ms-2' style={{ color: '#667085' }}>({props.projectNumber})</p>
                    </div>
                    <div className='text-end mb-2 mt-2'>
                        <h6 className='colororing font-16 inter fw-semibold'>{props.price}</h6>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
