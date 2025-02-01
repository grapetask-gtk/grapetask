import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
const Thanks = () => {
  return (
    <>
  <Navbar FirstNav='none' />     <div className="container pt-5 pb-5">
        <div className="row justify-content-center text-center">
            <h3 className='font-36 font-500 cocon Refertextcolor'>Thanks for sharing</h3>
            <div className="col-lg-5 col-md-7 col-12">
                <div className='boxshado rounded-3 p-lg-5 p-md-4 p-4 mt-4 '>
                    <h6 className='font-16 font-500 inter thankstextcolor'>Thanks for sharing a referring a friend. Remind your friends to check their emails!</h6>
                    <Link to='/entercode'>

                    <button type='button ' className='btn-circl mt-3 rounded-1'>Refer more friends</button>
                    </Link>

                </div>
            </div>
        </div>
        </div> 
    </>
  )
}

export default Thanks
