import React from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Referl = () => {
    return (
        <>
            <Navbar FirstNav='none' />
            <div className="container pt-5 pb-5">
                <div className="row justify-content-center text-center">
                    <h3 className='font-30 font-500 cocon Refertextcolor'>
                        Redeem Your Referral Code to Claim Your Bonus Bids!
                    </h3>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className='boxshado rounded-3 p-lg-5 p-md-4 p-4 mt-4'>
                            <h6 className='font-16 font-500 inter thankstextcolor'>
                                Enter the referral code provided by your friend to claim your bonus bids.
                                This referral unlocks bonus bids for you and rewards your friend as well.
                            </h6>
                            <div className="input-group mb-3 mt-lg-4 mt-md-3 mt-2">
                                <input 
                                    type="text" 
                                    className="form-control orderinput p-2 poppins" 
                                    placeholder="Enter Referral Code" 
                                />
                                <div className="p-2 backgroundoring ms-0 rounded-0">
                                    <span><MdOutlineContentCopy /></span>
                                </div>
                            </div>
                            <p className='font-16 font-600 poppins text-decoration-underline'>
                                Terms & Conditions
                            </p>
                            <Link to='/thanks'>
                                <button type='button' className='btn-circl mt-3 rounded-1'>
                                    Redeem
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Referl;
