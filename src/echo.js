import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '1d3364e1e3ceb72dc540', // your app key
  cluster: 'mt1',
  
  authEndpoint: 'https://portal.grapetask.co/broadcasting/auth',

  forceTLS: true, // ✅ important
  withCredentials: true, 


});



export default echo;
