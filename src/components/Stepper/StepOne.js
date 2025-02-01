import { Autocomplete, Chip, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from '../../redux/store/store';
import { getCategory, getSubCategory } from '../../redux/slices/gigsSlice';
import { useEffect } from 'react';

const StepOne = ({ gigTitle, handleInputChange, setSubCategory, setCategory, subCategory, category, setTags, tags, isErrorShow, isError }) => {
    const dispatch = useDispatch();
    const [subSubCategory,setSubSubCategory]=useState([]);
    const { userCategory, userSubCategory } = useSelector((state) => state.gig);
    const handleChangeSubCategory = (e)=>{
        setSubCategory(e.target.value)
        setSubSubCategory(userSubCategory.filter((sub) => sub.parent_id === e.target.value));
    }

    useEffect(() => {
        dispatch(getCategory());
        dispatch(getSubCategory());
    }, [dispatch])



    return (
        <>

            <div className='stepOne px-lg-3    pt-4 pb-4  rounded-3' style={{ backgroundColor: ' #F5F5FF' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">

                            <div className="mb-3 poppins">
                                <label htmlFor="gig" className="form-label fw-medium font-20">Gig title</label>
                                <input onChange={handleInputChange} value={gigTitle} className="form-control fw-medium font-18 p-4 px-3 mt-2" id="gig" placeholder='' defaultValue={""} />
                                <p className='text-end font-12 mt-2 takegraycolor'>{gigTitle.length} / 80 max</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <p className="blackcolor font-18 poppins fw-medium">Category</p>
                    <div className="row">
                        <div className="col-lg-5 col-12">
                            <p className="font-14 takegraycolor poppins">Choose the category and sub-category most
                                suitable for your Gig.</p>
                        </div>
                        <div className="col-lg-7 col-12 pe-lg-0">
                            <div className="container-fluid">
                                <div className="row poppins">
                                    <div className="col-lg-4 col-12 ps-0 pe-lg-2 pe-0">
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select takegraycolor font-14  pt-2 pb-2" >
                                            <option selected value=''>Select A Category</option>
                                            {userCategory.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>))}
                                        </select>

                                    </div>
                                    <div className="col-lg-4 col-12 pe-0 ps-lg-2 ps-0 mt-lg-0 mt-3">
                                        <select value={subCategory} onChange={handleChangeSubCategory} className="form-select takegraycolor font-14 pt-2 pb-2" disabled={!category} >
                                            <option selected value=''>Select A Subcategory</option>
                                            {userSubCategory
                                                .filter((sub) => sub.category_id === category)
                                                .map((sub) => {
                                                    if (sub?.parent_id == 0) {
                                                        return (
                                                            <option key={sub.id} value={sub.id}>
                                                                {sub.name}
                                                            </option>
                                                        )

                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-4 col-12 pe-0 ps-lg-2 ps-0 mt-lg-0 mt-3">
                                        <select className="form-select takegraycolor font-14 pt-2 pb-2" disabled={!category} >
                                            <option selected value=''>Select A Subcategory</option>
                                            {subSubCategory
                                                .map((sub) => {
                                                        return (
                                                            <option key={sub.id} value={sub.id}>
                                                                {sub.name}
                                                            </option>
                                                        )
                                                 
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="blackcolor font-18 poppins fw-medium">Search Tags</p>

                    <div className="row">
                        <div className="col-lg-5 col-12">
                            <p className="font-14 takegraycolor inter">Enter search terms you feel your buyers will use
                                when looking for your service.</p>
                        </div>
                        <div className="col-lg-7 col-12 poppins pe-lg-0">
                            <div className="devices-tag-add">

                                <Autocomplete
                                    multiple
                                    id="tags"
                                    options={[]}
                                    freeSolo
                                    value={tags}
                                    onChange={(e, newValue) => {
                                        // if (tags.length < 5) {
                                        //     setTags(newValue)
                                        // }
                                        setTags(newValue.slice(0, 5))

                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            placeholder="Add tags..."
                                        />
                                    )}
                                />
                            </div>
                            {/* <textarea class="form-control font-14" rows="2" style={{ resize: 'none' }}></textarea> */}
                            <p className='mb-0 font-12 takegraycolor mt-2'>5 tags maximum. Use letters and numbers only.</p>
                        </div>
                    </div>
                </div>

            </div>
            {isError &&
                <div className="alert alert-danger mt-3 poppins text-center" role="alert">
                    {isErrorShow}
                </div>
            }
        </>
    );
}

export default StepOne;
