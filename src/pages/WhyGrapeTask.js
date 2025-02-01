import React from 'react'
import assist from '../assets/Whygraptask-hero-img.png'
import whyimg from '../assets/why-grap-img2.png'
import proposl from '../assets/proposl.png'
import togwork from '../assets/togwork.png'
import thnks from '../assets/thanks.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import lines from '../assets/line.png'
import { Link } from 'react-router-dom'
import { SiFuturelearn } from 'react-icons/si'
import { FaChevronRight, FaCode, FaProjectDiagram } from 'react-icons/fa'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import Flexibility from '../assets/flexible.svg'
import Independence from '../assets/Independence.svg'
const WhyGrapeTask = () => {
    return (
        <>
            <Navbar SecondNav='none' />
            <div className="container-fluid pt-2 px-3 why-grape-herosection" >
                <div className="row h-100">
                    <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center justify-content-center px-lg-4 px-3">
                        <h1 className='font-40 fw-medium cocon'>How Can Grape <span className='colororing'> Task</span> assist
                            <br className='d-xl-block d-none' /> you in Your Freelancing<br className='d-lg-block d-none' />
                            Business?</h1>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <img src={assist} className='w-100 h-100 ' alt="w8" />
                    </div>
                </div>
            </div>
            <div className="container-fluid position-relative p-lg-5 p-md-5 p-sm-4 p-3  " style={{ backgroundColor: '#F6F6F6' }}>

                <h3 className='text-center font-40 fw-medium cocon'>Why GrapeTask</h3>
                <div className='d-flex justify-content-center'>
                    <img src={lines} className='text-center' alt="" />
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-12 d-flex align-items-center">
                        <img src={whyimg} alt="w8" className='w-100' />
                    </div>
                    <div className="col-lg-6 col-12">

                        <div className="whyGrap_cards container-fluid mt-3 ">
                            <div className='row align-items-center px-3 p-4'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                                    <div className=' why-icon  w-100'><SiFuturelearn size={20} /></div>

                                </div>
                                <div className='col-lg-10 col-12 poppins mt-lg-0 mt-3'>
                                    <h5 className='font-20'>Earning Potential </h5>
                                    <p className='font-14 mb-0'>Leverage your expertise to attract high-paying clients and increase your income potential..
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="whyGrap_cards container-fluid mt-3 ">
                            <div className='row align-items-center px-3 p-4'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                                    <div className=' why-icon  w-100'><img src={Flexibility} width={20} height={20} alt="w8 " /></div>

                                </div>
                                <div className='col-lg-10 col-12 poppins mt-lg-0 mt-3'>
                                    <h5 className='font-20'>
                                        Flexibility </h5>
                                    <p className='font-14 mb-0'>Enjoy the freedom to choose your own schedule, work from anywhere, and achieve a better work-life balance.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="whyGrap_cards container-fluid mt-3 ">
                            <div className='row align-items-center px-3 p-4'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                                    <div className=' why-icon  w-100'><img src={Independence} width={20} height={20} alt="w8" /></div>

                                </div>
                                <div className='col-lg-10 col-12 poppins mt-lg-0 mt-3'>
                                    <h5 className='font-20'>

                                        Independence </h5>
                                    <p className='font-14 mb-0'>Be your own boss, make decisions, and have full control over your career path..


                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="whyGrap_cards container-fluid mt-3 ">
                            <div className='row align-items-center px-3 p-4'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                                    <div className=' why-icon  w-100'><MdOutlineAccountBalanceWallet size={20} /></div>

                                </div>
                                <div className='col-lg-10 col-12 poppins mt-lg-0 mt-3'>
                                    <h5 className='font-20'>Work-Life Balance </h5>
                                    <p className='font-14 mb-0'>Prioritize personal commitments, avoid long commutes, and have more time for family and hobbies. </p>
                                </div>
                            </div>
                        </div>
                        <div className="whyGrap_cards container-fluid mt-3 ">
                            <div className='row align-items-center px-3 p-4'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                                    <div className=' why-icon  w-100'><FaCode size={20} /></div>

                                </div>
                                <div className='col-lg-10 col-12 poppins mt-lg-0 mt-3'>
                                    <h5 className='font-20'>
                                        Skill Development </h5>
                                    <p className='font-14 mb-0'>Continuously learn and adapt to new projects, technologies, and client requirements, enhancing your skills and staying relevant..


                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="whyGrap_cards container-fluid mt-3 ">
                            <div className='row align-items-center px-3 p-4'>
                                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                                    <div className=' why-icon  w-100'><FaProjectDiagram size={20} /></div>

                                </div>
                                <div className='col-lg-10 col-12 poppins mt-lg-0 mt-3'>
                                    <h5 className='font-20'>
                                        Variety of Projects</h5>
                                    <p className='font-14 mb-0'>Explore diverse projects and clients across industries, expanding your skills and professional network.. </p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>



            </div >
            <div className="container-fluid mt-lg-5 mt-md-4 mt-3 px-lg-5 px-md-3 poppins  ">
                <div className="container-lg container-fluid">

                    <div className="row justify-content-between">
                        <h1 className='text-center font-40 fw-medium cocon'>Boost every part of your business - <br className='d-lg-block d-none' /> from proposal to payment</h1>
                        <div className='d-flex justify-content-center'>
                            <img src={lines} className='text-center' alt="" />
                        </div>
                        <div className="col-lg-5 col-12 align-self-center mt-3">
                            <h2 className='font-30 font-500 blackcolor poppins'>On-point proposals</h2>
                            <p className='font-16 poppins textcolorgray'>Use smart proposals that also seamlessly generate contracts, collect deposits, and so much more.</p>
                            <Link className='colororing font-14 poppins'>Take a Closer Look <FaChevronRight /></Link>

                        </div>
                        <div className="col-lg-5 col-12 mt-5  ">
                            <div className='mt-5 togather p-lg-5 p-md-4 p-3 pt-5 position-relative'>
                                <img src={togwork} className='position-absolute ms-4' style={{ top: '-18%', left: '2%' }} alt="" />
                                <p className='font-20 poppins textgray'>Proposal</p>
                                <h3 className='font-28 blackcolor poppins '>Let’s work togather!</h3>
                                <p className='font-18 poppins textgray'>Hi, John!</p>
                                <p className='font-18 poppins textgray'>Thanks for telling me about your
                                    project. I’m delighted to share this
                                    proposal with you!</p>
                                <img src={proposl} className='w-100' alt="w8" />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between flex-lg-row flex-column-reverse ">
                        <div className="col-lg-5 col-12 mt-lg-5 mt-4">
                            <div className='togather h-75 p-2'>
                                <div className='p-lg-5 p-md-4 p-3'>
                                    <p className='font-18 poppins textcolorgray'>Thanks for telling me about your
                                        project. I’m delighted to share this
                                        proposal with you!</p>
                                    <img src={thnks} className='mt-2 w-100' alt="w8" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12 align-self-center mt-lg-0 mt-4">
                            <h2 className='font-30 font-500 blackcolor poppins'>Contracts ready
                                to sign</h2>
                            <p className='font-16 poppins textcolorgray'>Easily edit and share pre-populated contracts that build secure, fair relationships between you and your clients.</p>
                            <Link className='colororing font-14 poppins'>Take a Closer Look <FaChevronRight /></Link>

                        </div>
                    </div>
                    <div className="row justify-content-between">
                        <div className="col-lg-5 col-12 align-self-center mt-lg-0 mt-4">
                            <h2 className='font-30  font-500 blackcolor poppins'>Seamless invoicing & payments</h2>
                            <p className='font-16  poppins textcolorgray'>Customize and automate invoices and accept payments quickly and securely, in any currency, via bank transfer, credit card, or PayPal.</p>
                            <Link className='colororing font-14 poppins'>Take a Closer Look <FaChevronRight /></Link>

                        </div>

                        <div className="col-lg-5 col-12  mt-lg-5 mt-4">
                            <div className='mt-lg-5 togather p-lg-5 p-md-4 p-3'>
                                <h5 className='font-28 font-500 blackcolor poppins'>Invoice</h5>
                                <p className='font-18 poppins textgray '>Use smart proposals that also seamlessly generate contracts, collect deposits, and.</p>
                                <img src={proposl} className='w-100' alt="w8" />
                                <h5 className='mt-lg-4 mt-md-2 mt-2 font-20 poppins textgray'>Terms & Condition</h5>
                                <h5 className='mt-lg-4 mt-md-2 mt-2 font-20 poppins blackcolor'>Contrary to popular belief,</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <Footer />
            <style>{
                `
                .why-grape-herosection{
                    min-height:calc(100vh - 98px);
                }
                @media (max-width:768px){
                    .why-grape-herosection{
                        min-height:auto;
                    }
                }
                `
            }</style>
        </>
    )
}

export default WhyGrapeTask
