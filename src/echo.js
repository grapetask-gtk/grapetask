
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';


const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY || '1d3364e1e3ceb72dc540',
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER || 'mt1',
  forceTLS: true,
  authEndpoint: `${API_URL}/broadcasting/auth`,
  auth: {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
          Accept: "application/json",
    },
  },
  withCredentials: true,  
});

export default echo;