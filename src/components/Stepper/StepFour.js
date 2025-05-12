import { Button } from '@mui/material';
import React, { useState } from 'react';

const StepFour = ({ requirmentfields, setRequirmentfields, isErrorRequirment, isErrorShowRequirment }) => {
    // const [requirmentfields, setRequirmentfields] = useState(['']);
    console.log(requirmentfields);
    // Function to add a new field
    const addField = () => {
        setRequirmentfields([...requirmentfields, '']);
    };

    // Function to update a field's value
    const updateFieldValue = (index, value) => {
        const newFields = [...requirmentfields];
        newFields[index] = value.slice(0, 80);
        setRequirmentfields(newFields);
    };

    return (
        <>
            <h4 className="font-20 px-lg-0 px-2 blackcolor cocon mb-3">Requirements</h4>
            <div className='stepFour px-lg-3 pt-4 pb-4  rounded-3' style={{ backgroundColor: ' #F5F5FF' }}>
                <div className="container-fluid">
                    <div className="row mb-4">
                        <div className="col-12">
                            <div>
                                {requirmentfields?.map((field, index) => (
                                    <div key={index}>
                                        <p className="form-label font-18 fw-medium blackcolor poppins">Requirement # {1 + index}</p>
                                        <textarea required onChange={(e) => updateFieldValue(index, e.target.value)} value={field} className="form-control mt-2 font-16" id="requirments" rows={5} maxLength={80} />
                                        <p className='text-end font-12 mt-2 takegraycolor'>{field.length} / 80 max</p>

                                    </div>
                                ))}
                            </div>

                            <div className=" d-flex justify-content-end text-center">
                                <Button className='btn-stepper-border poppins px-3  font-16'>
                                    Cancel
                                </Button>
                                <Button onClick={addField} className='btn-stepper poppins px-3 ms-3  font-16'>
                                    Add
                                </Button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {isErrorRequirment &&
              <div className="alert alert-danger mt-3 poppins text-center" role="alert">
                {isErrorShowRequirment}
              </div>
            }
        </>
    );
}

export default StepFour;
