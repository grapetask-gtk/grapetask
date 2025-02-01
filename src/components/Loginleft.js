import React from 'react'
import angle from '../assets/LoginAngle.png'
function Loginleft() {
  return (
    <>
      <div className="col-lg-4 col-md-4  col-12 backgroundimges">
        <div className='position-relative'>
          <img className='login-angle' src={angle} alt="w8" />
          <h3 className='font-40 fw-bold colorwhite'>Hey,<br className='d-lg-block d-md-block d-none'/>
            Welcome back <br className='d-lg-block d-md-block d-none'/>to GrapeTask!</h3>
        </div>
      </div>
    </>
  )
}

export default Loginleft
