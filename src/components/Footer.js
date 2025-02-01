import React from 'react'
import fbook from '../assets/Facebook.png'
import lindin from '../assets/Linkedin.png'
import tewter from '../assets/Twitter.png'
import insta from '../assets/Instagram.png'
import youtub from '../assets/Youtube.png'
import apple from '../assets/apple.png'
import foter from '../assets/foter.png'
import mobil from '../assets/mobileapp.png'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <>
            <footer>

                <div class="curved-div"></div>
                <div className="container-fluid pt-5  position-relative poppins" style={{ backgroundColor: '#F5F5FF' }}>
                    <img src={foter} className=' position-absolute fotereimg w-100' alt="" />
                    <div className="container-fluid p-lg-5 p-md-5 p-sm-4 p-3">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className='row h-100'>
                                    <div className='col-lg-6 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3 d-flex justify-content-between flex-column'>
                                        <div>

                                            <h5 className='font-20'>For Clients</h5>
                                            <p className='font-16'>How to Hire</p>
                                            <p className='font-16'>Talent Marketplace</p>
                                            <p className='font-16'>Project Catalog</p>
                                            <p className='font-16'>Talent Scout</p>
                                            <p className='font-16'>Hire an Agency</p>
                                            <p className='font-16'>Enterprise</p>
                                            <p className='font-16'> Payroll Services</p>
                                            <p className='font-16'>Direct Contracts</p>
                                            <p className='font-16'>Hire Worldwide</p>
                                            <p className='font-16'>Hire in the USA</p>
                                        </div>
                                        <div className='mt-3'>
                                            <p className='font-16'>Follows Us</p>
                                            <span className=''><img width={30} height={30} src={fbook} alt="" /></span>
                                            <span className='ms-2'><img width={30} height={30} src={lindin} alt="" /></span>
                                            <span className='ms-2'><img width={30} height={30} src={tewter} alt="" /></span>
                                            <span className='ms-2'><img width={30} height={30} src={insta} alt="" /></span>
                                            <span className='ms-2'><img width={30} height={30} src={youtub} alt="" /></span>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-6 col-12  mt-lg-5 mt-md-4 mt-3'>
                                        <h5 className='font-20'>For Talents</h5>
                                        <p className='font-16'>How to Find Work</p>
                                        <p className='font-16'>Direct Contracts</p>
                                        <p className='font-16'>Find Freelance Jobs Worldwide</p>
                                        <p className='font-16'>Find Freelance Jobs in the USA</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="row h-100">
                                    <div className="col-lg-6 col-md-6 col-12 mt-lg-5 mt-md-4 mt-3">
                                        <h5 className='font-20'>Resources</h5>
                                        <p className='font-16'> Help & Support</p>
                                        <p className='font-16'>Success Stories</p>
                                        <p className='font-16'>Upwork Reviews</p>
                                        <p className='font-16'>Resources</p>
                                        <p className='font-16'>Blog</p>
                                        <p className='font-16'> Community </p>
                                        <p className='font-16'>Affiliate Program </p>
                                        <p className='font-16'>Free Business tools</p>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-between flex-column mt-lg-5 mt-md-4 mt-3">
                                        <div>

                                            <h5 className='font-20'>Company</h5>
                                            <p className='font-16'> About Us</p>
                                            <p className='font-16'>Leaderships</p>
                                            <p className='font-16'>Investor Relations</p>
                                            <p className='font-16'>Careers</p>
                                            <p className='font-16'>Our Impact</p>
                                            <p className='font-16'>Press</p>
                                            <p className='font-16'>Contact Us</p>
                                            <p className='font-16'>Trust, Safety, and Security</p>
                                            <p className='font-16'>Modern Slavery Statement</p>
                                        </div>
                                        <div className='mt-3'>

                                            <p className='me-3'>Mobile Apps</p>

                                            <div>

                                                <span className=''><img src={apple} width={30} height={30} alt="" /></span>
                                                <span className='ms-2'><img width={30} height={30} src={mobil} alt="" /></span>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <hr />
                        <div className='d-flex flex-wrap justify-content-between mb-3 pt-3 align-items-center'>

                            <p className='font-16 mb-0'>© 2023 GrapeTask® Global Inc.</p>
                            <div className=''>
                                <Link className='me-3 font-16' to='/terms' > Terms of Service </Link>
                                <Link className='me-3 font-16' to='/privacy' >Privacy Policy</Link>
                                <Link className='me-3 font-16' to='/refund' > Refund Policy </Link>
                                <Link className='me-3 font-16' to='/shipping' >Shipping Policy</Link>
                                <Link className='font-16'>Accessibility</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


            <style>
                {
                    `
                    .curved-div {
                        width: 100%; /* Div ki chaurai */
                        height: 300px; /* Div ki unchai */
                        background-color: #F5F5FF;
                        position: relative;
                        overflow: hidden;
                      }
                      
                      .curved-div::before {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        width: 200%; /* Isse curve banega */
                        padding-bottom: 200%; /* Isse curve ki curvature decide hogi */
                        border-radius: 50%;
                        background-color: white; /* Isse curve ka background color set hoga */
                        transform: translateX(-50%);

                      }
                    `
                }
            </style>
        </>
    )
}

export default Footer
