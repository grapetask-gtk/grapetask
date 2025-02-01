import React from 'react'
import figma from '../assets/figma.svg'
import star from '../assets/5star.svg'
import Slider from 'react-slick'


function Recomended() {
    const settings3 = {
        dots: true,
        speed: 5000,
        autoplay: false,
        autoplaySpeed: 1500,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className="container mt-5">
                <h3>Recomended for you</h3>
                <Slider {...settings3}>

                    <div>
                        <div className='p-2 whitcard'>
                            <img src={figma} className='w-100' alt="" />
                            <h5>Figma UI UX Design..</h5>
                            <p>Use Figma to get a job in UI Design, User Interface, User Experience design.</p>
                            <span>
                                <img src={star} alt="" />
                                <p>(0)</p>
                            </span>
                            <div className='text-end'>
                                <h6 className='colororing'>$17.84</h6>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='p-2 whitcard'>
                            <img src={figma} className='w-100' alt="" />
                            <h5>Figma UI UX Design..</h5>
                            <p>Use Figma to get a job in UI Design, User Interface, User Experience design.</p>
                            <span>
                                <img src={star} alt="" />
                                <p>(0)</p>
                            </span>
                            <div className='text-end'>
                                <h6 className='colororing'>$17.84</h6>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='p-2 whitcard'>
                            <img src={figma} className='w-100' alt="" />
                            <h5>Figma UI UX Design..</h5>
                            <p>Use Figma to get a job in UI Design, User Interface, User Experience design.</p>
                            <span>
                                <img src={star} alt="" />
                                <p>(0)</p>
                            </span>
                            <div className='text-end'>
                                <h6 className='colororing'>$17.84</h6>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='p-2 whitcard'>
                            <img src={figma} className='w-100' alt="" />
                            <h5>Figma UI UX Design..</h5>
                            <p>Use Figma to get a job in UI Design, User Interface, User Experience design.</p>
                            <span>
                                <img src={star} alt="" />
                                <p>(0)</p>
                            </span>
                            <div className='text-end'>
                                <h6 className='colororing'>$17.84</h6>
                            </div>
                        </div>
                    </div>




                </Slider>
            </div>

        </>
    )
}

export default Recomended
