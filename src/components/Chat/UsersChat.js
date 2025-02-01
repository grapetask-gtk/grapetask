import React from 'react';
import search from '../../assets/searchbar.png'
import ReadChat from './ReadChat';
import UnRead from './UnRead';

const UsersChat = () => {

    return (
        <>
            <div className='bh-white h-100 p-3 rounded-3' style={{boxShadow:' 0px -2px 10px 0px #00000014'}}>
                <div className="container-fluid ">
                    <div className="row allgigs-field">


                        <div className=" col-12 px-0">
                            <div class="input-group p-2 h-100 poppins">
                                <span class="input-group-text pt-0 pb-0" id="basic-addon1"><img src={search} width={16} alt="" /></span>
                                <input type="text" className="form-control p-0 font-12" id="floatingInputGroup1" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <UnRead/>
                <ReadChat/>
                <ReadChat/>
                <ReadChat/>
                <ReadChat/>
                <ReadChat/>
                <UnRead/>
                <UnRead/> */}
            </div>

        </>
    );
}

export default UsersChat;
