import React, { useState } from 'react';
import '../style/chat.scss'
import UsersChat from '../components/Chat/UsersChat';
import Chating from '../components/Chat/Chating';
import ChatUserProfile from '../components/Chat/ChatUserProfile';
import Navbar from '../components/Navbar';
import client from '../assets/client-video-call.png'
import callEnd from '../assets/call-end.png'
import videoStop from '../assets/videoStop.png'
import mute from '../assets/callVoiceMute.png'
import MicroStop from '../assets/callMicrophone.png'
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Box } from '@mui/material';
const Chat = () => {
  const [video, setvideo] = useState(null);
  const handlevideo = () => {
    setvideo(!video)
    console.log(video, '=============================video');
  }
  const handleCallEnd = () => {
    setvideo(null);

  }
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }
  return (
    <>
      <Navbar FirstNav='none' />

      <div className="container-fluid mt-4 poppins">
        <div className="row px-lg-3 px-md-3 mt-3 mb-3 justify-content-center">
          {video &&
            <>
              <div className="video-call col-10 rounded-3 p-4 position-relative d-flex justify-content-between flex-column">
                <div className="d-flex justify-content-end">
                  <div>
                    <div className='position-relative' style={{ width: '90px', height: '85px' }}>

                      <img src={client} className='rounded-3 w-100 h-100' alt="w8" />
                      <img src={mute} className='callMuteMicero' width={30} height={30} alt="w8" />
                    </div>
                  </div>
                </div>
                <div>

                  <div className='text-center'>
                    <div>

                    </div>
                    <img src={videoStop} width={50} height={50} alt="w8" />
                    <img src={callEnd} className='mx-3' style={{ cursor: 'pointer' }} onClick={handleCallEnd} width={80} height={70} alt="w8" />
                    <img src={MicroStop} width={50} height={50} alt="w8" />
                  </div>
                </div>

                <Box className='video-call-volume' sx={{ height: 200 }}>
                  <Slider
                    sx={{
                      '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                      },
                    }}
                    orientation="vertical"
                    defaultValue={30}
                    aria-label="Temperature"
                    valueLabelDisplay="auto"
                    onKeyDown={preventHorizontalKeyboardNavigation}
                  />
                  <VolumeUp className='mt-3' />
                </Box>
              </div>
            </>
          }


          {!video &&
            <>
              <div className="col-lg-3 col-12"><UsersChat /></div>
              <div className="col-lg-6 col-12 mt-lg-0 mt-3"><Chating video={video} handlevideo={handlevideo} /></div>
              {/* <div className="col-lg-3 col-12 mt-lg-0 mt-3"><ChatUserProfile /></div> */}
            </>
          }
        </div>
      </div>

    </>
  );
}

export default Chat;
