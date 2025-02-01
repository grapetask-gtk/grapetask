import React from 'react'
import { FaEnvelope, FaTwitter } from 'react-icons/fa'
import { BsFacebook, BsMessenger } from 'react-icons/bs'
import { MdOutlineContentCopy } from 'react-icons/md'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Level1 = () => {
    const { userDetail, isLoading, getError } = useSelector((state) => state.profile);
    console.log(userDetail);
    return (
        <>
  <Navbar FirstNav='none' />         
     <div className="container pt-5 pb-5">
                <div className="row justify-content-center text-center">
                    <h3 className='font-36 font-500 cocon Refertextcolor'>Refer a friend!  Earn $1 Dollar</h3>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className='boxshado rounded-3 p-lg-5 p-md-4 p-4 mt-4 '>
                            <h6 className='inter font-16 font-500 Refertextcolor'>Refer to your friends and you will earn <br />
                                1% upon 3 month.</h6>
                            <p className='font-16 font-600 poppins text-decoration-underline tremstextcolor'>Terms & Conditions</p>
                            <div className='mt-lg-4 mt-md-3 mt-2'>
                                <h6 className='font-16 font-700 poppins Refertextcolor'>Invite now using:</h6>
                              <div className='d-flex justify-content-center mt-4'>
                                <FaEnvelope className=''color='#F16336' size={35}/> 
                                <BsFacebook className='mx-5'color='#F16336' size={35}/>
                                <BsMessenger className=''color='#F16336' size={35}/>
                                <FaTwitter className='ms-5'color='#F16336' size={35}/>
                                </div>
                            </div>
                            <div className='mt-lg-5 mt-md-3 mt-2'>
                                <p className='mb-0 font-16 inter Refertextcolor'>Or copy your personal link</p>
                                <div className="input-group mb-3 mt-2">
                                    <input type="text" className="form-control orderinput p-2 poppins" value={`https://grapetask.com/signup?referral=${userDetail?.referral_code}`} placeholder=""/>
                                    <div className="p-2 backgroundoring ms-0 rounded-0"><span><MdOutlineContentCopy/></span>
                                    </div>
                                </div>
                                <Link to='/level2'>
                                <button type='button ' className='btn-circl mt-3 rounded-1'>Invite</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Level1
