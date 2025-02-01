import React, { useState } from 'react'
import { useDispatch, useSelector } from '../redux/store/store';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { userForgot } from '../redux/slices/userSlice';
import { Spinner } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Forgot1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, getError } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email,
    }
    dispatch(userForgot(data, handleResponse))
  };
  const handleResponse = async(data) => {
    if (data?.status) {
      toast.success("Successfully OTP Send Your Email", {
        position: "top-right",
        autoClose: 2000,
      })
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate('/otp')
      // console.log(data?.message)
      if (data?.status == true) {
        setIsErrorShow('')
        setIsError(false)
      }
    } else {
      // console.log(data?.message)
      if (data?.status == false) {
        setIsErrorShow(data?.message)
        setIsError(true)
      }
    }
  }
  
  return (
    <>

      <div className="col-lg-8 col-md-8 col-12 d-flex flex-column justify-content-between pt-lg-5 pt-md-5 pt-3 px-0">
        <div className="container-fluid">

          <div className="row justify-content-center me-lg-5 me-md-5 login-right-side">
            <div className="col-lg-8 col-md-8 col-12 ">
              <img src={logo} className=' mt-2' width={'40%'} alt="" />
              <div className="row mt-2">
                <h3 className='mt-3  cocon colororing'>Forgot Password</h3>
                <p className='mt-3 colorgray'>Enter the email address you used when you joined and we’ll send you instructions to reset your password </p>
                <p className='colorgray'> For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.</p>
              </div>

              <form class="col-lg-8 col-md-10 col-12 mt-lg-3 mt-md-2 mt-2" onSubmit={handleSubmit}>
              <ToastContainer />

                <input type="email" className="form-control input-field p-3" placeholder="Enter email here" required
                  value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                {isError &&
                  <div className="alert alert-danger mt-3" role="alert">
                    {isErrorShow}
                  </div>
                }
                <button loading={true} type='submit' className='btn-fill mt-4' disabled={isLoading} >
                  {isLoading ? <Spinner size="sm" color="light" /> : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='mt-5'>

          <hr className='border-0' style={{ opacity: '1', height: '1px', backgroundColor: 'rgba(111, 111, 111, 1)' }} />
          <div className='d-flex justify-content-between flex-wrap colorgray px-4 pb-3'>
            <span className='mt-2 ms-2 font-14'>Terms & Conditions</span>
            <span className='mt-2 ms-2 font-14'>Privacy Policy</span>
            <span className='mt-2 ms-2 font-14'>Cookie Policy</span>
            <span className='mt-2 ms-2 font-14'>Copyright  2023 GrapeTask. All rights reserved.</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgot1
