import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const token = localStorage.getItem("accessToken");
    const naviagte = useNavigate();

    return (
        <div className='d-flex justify-content-center align-items-center text-center' style={{ height: '100vh' }}>
            <div>
                <h1 className="fw-bold poppins colororing">404</h1>
                <h3 className="fw-semibold poppins ">Page Not Found</h3>
                <Button onClick={()=> naviagte(token ? '/dashboard' : '/')} className='btn-stepper rounded-5 mt-2 poppins px-3  font-16'>Go to Home</Button>
            </div>
        </div>
    );
}

export default NotFound;
