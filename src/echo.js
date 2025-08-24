
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { PUSHER_HOST } from './config';

window.Pusher = Pusher;



const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY || '1d3364e1e3ceb72dc540',
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER || 'mt1',
  forceTLS: true,
  authEndpoint: `${PUSHER_HOST}`,
  auth: {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
          Accept: "application/json",
    },
  },
  withCredentials: true,  
});

export default echo;