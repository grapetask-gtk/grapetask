import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const PaymentSuccess = () => {
  return (
    <>
  <Navbar FirstNav='none' />     <div className="container pt-5 pb-5">
        <div className="row justify-content-center text-center">
            <h3 className='font-36 font-500 cocon Refertextcolor'>Order Placed Successfully!</h3>
            <div className="col-lg-5 col-md-7 col-12">
                <div className='boxshado rounded-3 p-lg-5 p-md-4 p-4 mt-4 '>
                    <h6 className='font-16 font-500 inter thankstextcolor'>Thanks for Choosing GrapeTask for your Project, Please keep checking order section for updates about order</h6>
                    <Link to='/order'>
                    <button type='button' className='btn-circl mt-3 rounded-1'>Go to Orders</button>
                    </Link>

                </div>
            </div>
        </div>
        </div> 
    </>
  )
}

export default PaymentSuccess
