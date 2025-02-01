import React from 'react'
import search from '../assets/searchbar.png'
import Navbar from './Navbar'
import NewWay from '../assets/NewWay.png'
import Card from './Card'
import { Link, useNavigate } from 'react-router-dom'
import { stripHtmlTags, titleToSlug } from '../utils/helpers'
const GigCard = ({gig}) => {
    const navigate = useNavigate();
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  mt-4">
            <div
                onClick={() =>
                    navigate(`/g/${titleToSlug(gig?.title)}/${gig?.seller?.username}/${gig?.id}`)
                }
                className="cursor-pointer h-100"
                key={gig.id}
            >
                <div className="h-100">
                    <Card
                        gigsImg={
                            gig.media &&
                            (gig.media.image1 == null
                                ? gig.media.image2 == null
                                    ? gig.media.image3
                                    : gig.media.image2
                                : gig.media.image1)
                        }
                        heading={gig.title}
                        // phara={stripHtmlTags(gig.description)}
                        star1={
                            parseInt(
                                gig.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                        (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                        0
                                    )
                            ) >= 1
                                ? "#F16336"
                                : "#D4D4D4"
                        }
                        star2={
                            parseInt(
                                gig.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                        (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                        0
                                    )
                            ) >= 2
                                ? "#F16336"
                                : "#D4D4D4"
                        }
                        star3={
                            parseInt(
                                gig.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                        (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                        0
                                    )
                            ) >= 3
                                ? "#F16336"
                                : "#D4D4D4"
                        }
                        star4={
                            parseInt(
                                gig.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                        (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                        0
                                    )
                            ) >= 4
                                ? "#F16336"
                                : "#D4D4D4"
                        }
                        star5={
                            parseInt(
                                gig.rating
                                    .map((value) => value.ratings)
                                    .filter((value) => !isNaN(value))
                                    .reduce(
                                        (acc, rating, index, array) =>
                                            acc + rating / array.length,
                                        0
                                    )
                            ) >= 5
                                ? "#F16336"
                                : "#D4D4D4"
                        }
                        projectNumber="0"
                        price={gig.package[0]?.total}
                    />
                </div>
            </div>
        </div>
    )
}

export default GigCard
