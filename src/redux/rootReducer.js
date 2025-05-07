import { combineReducers } from 'redux';
<<<<<<< HEAD
import userSlice from './slices/userSlice';
import profileSlice from './slices/profileSlice';
import gigsSlice from './slices/gigsSlice';
import allGigsSlice from './slices/allGigsSlice';
import dashboardSlice from './slices/dashboardSlice';
import skillsSlice from './slices/skillsSlice';
import ratingSlice from './slices/ratingSlice';
import allOrderSlice from './slices/allOrderSlice';
import buyerRequestSlice from './slices/buyerRequestSlice';
import offersSlice from './slices/offersSlice';
import usersSlice from './slices/usersSlice';


const rootReducer = combineReducers({
  user: userSlice,
=======
import allGigsSlice from './slices/allGigsSlice';
import allOrderSlice from './slices/allOrderSlice';
import getBidPackages from './slices/bidsSlice';
import blogSlice from './slices/blogSlice';
import buyerRequestSlice from './slices/buyerRequestSlice';
import dashboardSlice from './slices/dashboardSlice';
import gigsSlice from './slices/gigsSlice';
import jobInvitationSlice from './slices/jobInvitationSlice';
import messageSlice from './slices/messageSlice';
import notificationsSlice from './slices/notificationsSlice';
import offersSlice from './slices/offersSlice';
import orderSlice from './slices/orderSlice';
import profileSlice from './slices/profileSlice';
import ratingSlice from './slices/ratingSlice';
import skillsSlice from './slices/skillsSlice';
import userSlice from './slices/userSlice';
import usersSlice from './slices/usersSlice';

const rootReducer = combineReducers({
  user: userSlice,
  users: usersSlice,
>>>>>>> d918fe2 (cahnges by abdul qavi)
  profile: profileSlice,
  gig: gigsSlice,
  allGigs: allGigsSlice,
  dashboard: dashboardSlice,
<<<<<<< HEAD
  skills : skillsSlice,
  rating : ratingSlice,
  allOrder : allOrderSlice,
  buyer : buyerRequestSlice,
  offers: offersSlice,
  users: usersSlice,


});

=======
  skills: skillsSlice,
  rating: ratingSlice,
  allOrder: allOrderSlice,
  buyer: buyerRequestSlice,
  offers: offersSlice,
    blogs: blogSlice,
    orders: orderSlice,
    message: messageSlice,
    jobInvitation: jobInvitationSlice,

  bids:getBidPackages,
  notifications: notificationsSlice,
});


>>>>>>> d918fe2 (cahnges by abdul qavi)
export default rootReducer;