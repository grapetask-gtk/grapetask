import { combineReducers } from 'redux';
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
  profile: profileSlice,
  gig: gigsSlice,
  allGigs: allGigsSlice,
  dashboard: dashboardSlice,
  skills : skillsSlice,
  rating : ratingSlice,
  allOrder : allOrderSlice,
  buyer : buyerRequestSlice,
  offers: offersSlice,
  users: usersSlice,


});

export default rootReducer;