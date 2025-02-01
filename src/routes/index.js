import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import Index from '../pages/Index'
import WhyGrapeTask from '../pages/WhyGrapeTask'
import AboutUS from '../pages/AboutUS'
import Blog from '../pages/Blog'
import Signin from '../components/Signin'
import Login from '../pages/Login'
import Forgot from '../pages/Forgot'
import Otp from '../pages/Otp'
import Blogopen from '../components/Blogopen'
import Dashboard from '../pages/Dashboard'
import BuyerRequest from '../pages/BuyerRequest'
import Profile from '../components/Profile'
import Applicants from '../pages/Applicants'
import Earning from '../pages/Earning'
import HireExpert from '../pages/HireExpert'
import Gigs2 from '../components/Gigs2'
import RecruitProcess from '../pages/RecruitProcess'
import Take from '../components/Take'
import Account from '../components/Account'
import Order from '../components/Orders/Order'
import Level1 from '../pages/Referal/Level1'
import Level2 from '../pages/Referal/Level2'
import Level3 from '../pages/Referal/Level3'
import Thanks from '../pages/Referal/Thanks'
import Entercode from '../pages/Referal/Entercode'
import Referl from '../pages/Referal/Referl'
import PayoutMethod from '../pages/Payoutmethod/PayoutMethod'
import Paymentcard from '../pages/Payoutmethod/Paymentcard'
import Dopayout from '../pages/Payoutmethod/Dopayout'
import Accept from '../pages/StartedJob/Accept'
import Progress from '../pages/StartedJob/Progress'
import Complete from '../pages/StartedJob/Complete'
import BonousReward from '../components/BonousReward'
import MultiSteps from '../pages/Stepper/MultiSteps'
import ProfileUser from '../components/profile/Profile'
import Chat from '../pages/Chat'
import Interview from '../components/Interview'
import UserBuyerRequest from '../pages/UserBuyerRequest'
import Freelancers from '../pages/freelancers/Freelancers'
import FreelancersGigs from '../pages/freelancers/FreelancersGigs'
import PaymentViaCard from '../pages/freelancers/PaymentViaCard'
import ReferalList from '../pages/ReferalList'
import FrelancerChat from '../pages/freelancers/FrelancerChat'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'
import OfferDetail from '../pages/OfferDetail'
import SearchGigsMainBanner from '../pages/SearchGigsMainBanner'
import ProfileOtherPerson from '../pages/ProfileOtherPerson'
import MeetTopRatedFreelancer from '../pages/MeetTopRatedFreelancer'
import Help from '../pages/Help'
import Level from '../pages/Level'
import PaymentSuccess from '../pages/PaymentSuccess'
import Terms from '../components/Terms'
import Shipping from '../components/Shipping'
import Refund from '../components/Refund'
import Privacy from '../components/Privacy'
function AppRoutes() {
  const token = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/whygraoetask' element={<WhyGrapeTask />} />
      <Route path='/aboutus' element={<AboutUS />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/search/gigs' element={<SearchGigsMainBanner />} />
      <Route path='/MeetTopRatedFreelancer' element={<MeetTopRatedFreelancer />} />
      <Route path='/level' element={<Level />} />

      {token ? '' :
        <>
          <Route path='/signup' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/otp' element={<Otp />} />
        </>
      }
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='/Blogopen' element={<Blogopen />} />
      <Route path='/help' element={<Help />} />
      <Route path='/g/:gigslug/:user/:gigId' element={<FreelancersGigs />} />
      <Route exact path="/" element={<ProtectedRoute />}>
      <Route path='/profileOtherPerson/:id' element={<ProfileOtherPerson />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/buyerRequest' element={<BuyerRequest />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/applicants' element={<Applicants />} />
        <Route path='/earning' element={<Earning />} />
        <Route path='/hireExpert' element={<HireExpert />} />
        <Route path='/:username' element={<Gigs2 />} />
        <Route path='/recruitProcess' element={<RecruitProcess />} />
        <Route path='/tack' element={<Take />} />
        <Route path='/account' element={<Account />} />
        <Route path='/order' element={<Order />} />
        <Route path='/profile/referral/link' element={<Level1 />} />
        <Route path='/level2' element={<Level2 />} />
        <Route path='/level3' element={<Level3 />} />
        <Route path='/thanks' element={<Thanks />} />
        <Route path='/payment/success' element={<PaymentSuccess />} />
        <Route path='/entercode' element={<Entercode />} />
        <Route path='/referl' element={<Referl />} />
        <Route path='/payoutMethod' element={<PayoutMethod />} />
        <Route path='/paymentcard' element={<Paymentcard />} />
        <Route path='/dopayout' element={<Dopayout />} />
        <Route path='/accept' element={<Accept />} />
        <Route path='/progress' element={<Progress />} />
        <Route path='/complete' element={<Complete />} />
        <Route path='/bonousReward' element={<BonousReward />} />
        <Route path='/multiSteps' element={<MultiSteps />} />
        <Route path='/profileSetting' element={<ProfileUser />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/interview' element={<Interview />} />
        <Route path='/userBuyerRequest' element={<UserBuyerRequest />} />
        <Route path='/offerDetail' element={<OfferDetail />} />
        <Route path='/freelancers' element={<Freelancers />} />
        <Route path='/chat/:user' element={<Chat />} />
        <Route path='/frelancerPaymentViaCard' element={<PaymentViaCard />} />
        <Route path='/order/payment' element={<PaymentViaCard />} />

        <Route path='/profile/referrals' element={<ReferalList />} />
        <Route path='/frelancerChat' element={<FrelancerChat />} />
        <Route path='/level' element={<Level />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy/>} />
        <Route path='/refund' element={<Refund/>} />
        <Route path='/shipping' element={<Shipping/>} />
      </Route>

    </Routes>

  )
}

export default AppRoutes
