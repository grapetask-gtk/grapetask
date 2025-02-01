import React from 'react'
import image1 from '../assets/image1.svg'
import image2 from '../assets/image2.svg'
import image3 from '../assets/image3.svg'
import lines from '../assets/line.png'

const Story = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center text-center mb-4">
          <h3 className='font-40 font-500 cocon'>Our Story</h3>
          <div className='d-flex justify-content-center mb-4'>
            <img src={lines} className='text-center' alt="" />
          </div>
          <p className='font-18' style={{ color: 'rgba(102, 112, 133, 1)' }}>It is a long established fact that a reader will be distracted by the <br /> readable content of a page when looking at its layout. The point of  <br /> using Lorem Ipsum is that it has a more-or-less normal distribution <br /> of letters, as opposed to using 'Content.</p>
          <div className="col-lg-4 col-md-6 col-12 mt-5"><img src={image1} className='w-100 rounded-4' alt="" /></div>
          <div className="col-lg-4 col-md-6 col-12 mt-5"><img src={image2} className='w-100 rounded-4' alt="" /></div>
          <div className="col-lg-4 col-md-6 col-12 mt-5"><img src={image3} className='w-100 rounded-4' alt="" /></div>
        </div>
      </div>
    </>

  )
}

export default Story

