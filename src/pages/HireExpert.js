import React, { useEffect, useState } from 'react'
import pgirl from '../assets/pgirl.png'
import { FiSearch } from 'react-icons/fi'
import { BsChevronLeft, BsCircleFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Profilreviw from '../components/Profilreviw'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFreelancers } from '../redux/slices/userSlice'
import ExpertCard from '../components/ExpertCard'
import { paginateArray } from '../utils/helpers'

const HireExpert = () => {
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = useState([]);
    const { userList } = useSelector((state) => state.user);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const totalPages = Math.round(userList.length / limit);
    useEffect(() => {
        dispatch(getAllFreelancers())
    }, []);
    const paginateData = async () => {
        setFilteredData(await paginateArray(userList, limit, page))
    }
    useEffect(() => {
        paginateData();
    }, [userList]);


    const handlePrevious = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
            setFilteredData(paginateArray(userList, limit, page - 1));
        }
    };

    const handleNext = async () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
            setFilteredData(paginateArray(userList, limit, page + 1));
        }
    };

    const handleChangePagination = (e, page) => {
        setPage(page);
        setFilteredData(paginateArray(userList, limit, page));
    };
    const [expertDetail, setExpertDetail] = useState(null);
    const [expertModal, setExpertModal] = useState(false);

    const showExpertDetail = (data) => {
        console.log(data)
        setExpertDetail(data)
        setExpertModal(!expertModal)
    }

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchInputChange = async (event) => {
        let value =event.target.value;
        setSearchQuery(value);
        const data = await userList.filter(item =>
            item?.fname?.toLowerCase().includes(value.toLowerCase()) ||
            item?.lname?.toLowerCase().includes(value.toLowerCase()) ||
            item?.description?.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(paginateArray(data,limit,page))
    }
    return (
        <>
            <Navbar FirstNav='none' />
            <div className="container-fluid p-4 pt-5">
                <div className="row mx-lg-4 mx-md-3 mx-xm-3 mx-0">
                    <div className="col-lg-4 col-12">
                        <h6 className='byerLine font-22 font-500 cocon blackcolor'>Filtered by</h6>
                        <div class="accordion" id="accordionExample">
                            <div class="">
                                <div class="accordion-header ">
                                    <button class="accordion-button px-0 collapsed " type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <h6 className='byerLine font-22 font-500 cocon blackcolor'>Location</h6>
                                    </button>
                                </div>
                                <div id="collapseOne" class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body px-0">
                                        <div className='Revie'>
                                            <div className="input-group mb-lg-0 mb-md-0 mb-2 bgcard rounded-3">
                                                <button className="border-0" style={{ backgroundColor: 'transparent' }} type="button" id><span><FiSearch /></span></button>
                                                <input type="text" className="form-control border-0" style={{ backgroundColor: 'transparent' }} placeholder="Search" aria-describedby />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div class="accordion" id="accordionTwo">
                            <div class="">
                                <div class="accordion-header ">
                                    <button class="accordion-button px-0 collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                                        aria-controls="collapseTwo">
                                        <h6 className='byerLine font-22 font-500 cocon blackcolor'>Categories</h6>
                                    </button>
                                </div>
                                <div id="collapseTwo" class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionTwo">
                                    <div class="accordion-body px-0">
                                        <div className="Revie font-15 poppins mt-3">
                                            <p>Design & Creative</p>
                                            <p>IT & Networking</p>
                                            <p>Sales & Marketing</p>
                                            <p>Writing</p>
                                        </div>

                                    </div>
                                    <hr />
                                </div>

                            </div>
                        </div>
                        <div class="accordion" id="accordionThree">
                            <div class="">
                                <div class="accordion-header ">
                                    <button class="accordion-button px-0 collapsed show" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        <h6 className='byerLine font-22 font-500 cocon blackcolor'>Job Success</h6>
                                    </button>
                                </div>
                                <div id="collapseThree" class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionThree">
                                    <div class="accordion-body px-0">
                                        <div className="Revie font-15 poppins">
                                            <p><BsCircleFill className='colororing me-3' /> Any job success</p>
                                            <p><BsCircleFill className='dote-gray me-3' />80% & up</p>
                                            <p><BsCircleFill className='dote-gray me-3' />90% & up</p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                            </div>

                        </div>
                        <div class="accordion" id="accordionfor">
                            <div class="">
                                <div class="accordion-header ">
                                    <button class="accordion-button px-0 collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapsefor" aria-expanded="false"
                                        aria-controls="collapsefor">
                                        <h6 className='byerLine font-22 font-500 cocon blackcolor'>English level</h6>
                                    </button>
                                </div>
                                <div id="collapsefor" class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionfor">
                                    <div class="accordion-body px-0">
                                        <div className="Revie font-15 poppins">
                                            <p><BsCircleFill className='colororing me-3' /> Any Level</p>
                                            <p><BsCircleFill className='dote-gray me-3' />Basic</p>
                                            <p><BsCircleFill className='dote-gray me-3' />Conversational</p>
                                            <p><BsCircleFill className='dote-gray me-3' />Fluent</p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="col-lg-8 col-12">
                        <div className="Revie">
                            <div className="input-group mb-lg-0 mb-md-0 mb-2 bgcard rounded-3">
                                <button className="border-0" style={{ backgroundColor: 'transparent' }} type="button" ><span><FiSearch /></span></button>
                                <input value={searchQuery} onChange={handleSearchInputChange} type="text" className="form-control border-0" style={{ backgroundColor: 'transparent' }} placeholder="Search" aria-describedby />
                            </div>
                            {filteredData?.length > 0 &&
                                filteredData.map((val, index) => {
                                    return (
                                        <ExpertCard user={val} showExpertDetail={showExpertDetail} />
                                    )
                                })
                            }

                            <div className={`offcanvas offcanvas-end p-3 ${expertModal ? 'show' : ''}`} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasRightLabel" data-bs-dismiss="offcanvas" aria-label="Close" style={{ cursor: 'pointer' }} onClick={() => setExpertModal(!expertModal)}><BsChevronLeft className='colororing' /></h5>
                                </div>
                                <div className="offcanvas-body pe-0">
                                    <Profilreviw expertDetail={expertDetail} />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end hireexpert mt-3 mb-3'>
                                <Stack spacing={4}>
                                    <Pagination onChange={handleChangePagination} count={totalPages} page={page} variant="outlined" shape="rounded" />
                                </Stack>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <style>{
                `.offcanvas-body::-webkit-scrollbar {
                    width: 20px;

                  }
                `
            }</style>
        </>
    )
}

export default HireExpert
