import { Route, Routes } from "react-router-dom";
import Blogopen from "../components/Blogopen";
import Signin from "../components/Signin";
import AboutUS from "../pages/AboutUS";
import AdminDashboard from "../pages/admin-panel";
import BlogListPage from "../pages/admin-panel/blog/BlogList";
import CreateBlogPage from "../pages/admin-panel/blog/create";
import AdminOrders from '../pages/admin-panel/orders/index';
import AdminUsers from "../pages/admin-panel/users";
import Blog from "../pages/Blog";
import Dashboard from "../pages/Dashboard";
import Forgot from "../pages/Forgot";
import JobInvitation from '../pages/freelancers/FreelancersJobInvitations';
import Index from "../pages/Index";
import Login from "../pages/Login";
import Otp from "../pages/Otp";
import OtpResetPassword from "../pages/otpResetPassword";
import WhyGrapeTask from "../pages/WhyGrapeTask";
import ProtectedRoute from "./protectedRoute";

import BuyerRequest from "../pages/BuyerRequest";
import BuyBids from "../pages/PurchaseBids";

import Account from "../components/Account";
import BonousReward from "../components/BonousReward";
import Chattingwindow from "../components/frelancerChat/Chat/Chating";
import Gigs2 from "../components/Gigs2";
import Interview from "../components/Interview";
import Order from "../components/Orders/Order";
import Privacy from "../components/Privacy";
import Profile from "../components/Profile";
import ProfileUser from "../components/profile/Profile";
import Refund from "../components/Refund";
import Shipping from "../components/Shipping";
import Take from "../components/Take";
import Terms from "../components/Terms";
import AdminChat from "../pages/admin-panel/chat/AdminChat";

import Applicants from "../pages/Applicants";
import Chat from "../pages/Chat";
import Earning from "../pages/Earning";
import Freelancers from "../pages/freelancers/Freelancers";
import FreelancersGigs from "../pages/freelancers/FreelancersGigs";
import FrelancerChat from "../pages/freelancers/FrelancerChat";
import PaymentViaCard from "../pages/freelancers/PaymentViaCard";
import Help from "../pages/Help";
import HireExpert from "../pages/HireExpert";
import Level from "../pages/Level";
import MeetTopRatedFreelancer from "../pages/MeetTopRatedFreelancer";
import NotFound from "../pages/NotFound";
import OfferDetail from "../pages/OfferDetail";
import PaymentSuccess from "../pages/PaymentSuccess";
import Dopayout from "../pages/Payoutmethod/Dopayout";
import Paymentcard from "../pages/Payoutmethod/Paymentcard";
import PayoutMethod from "../pages/Payoutmethod/PayoutMethod";
import ProfileOtherPerson from "../pages/ProfileOtherPerson";
import RecruitProcess from "../pages/RecruitProcess";
import Entercode from "../pages/Referal/Entercode";
import Level1 from "../pages/Referal/Level1";
import Level2 from "../pages/Referal/Level2";
import Level3 from "../pages/Referal/Level3";
import Referl from "../pages/Referal/Referl";
import Thanks from "../pages/Referal/Thanks";
import ReferalList from "../pages/ReferalList";
import ResetPassword from "../pages/ResetPassword";
import SearchGigsMainBanner from "../pages/SearchGigsMainBanner";
import Spending from "../pages/Spending";
import Accept from "../pages/StartedJob/Accept";
import Complete from "../pages/StartedJob/Complete";
import Progress from "../pages/StartedJob/Progress";
import MultiSteps from "../pages/Stepper/MultiSteps";
import UserBuyerRequest from "../pages/UserBuyerRequest";


import AboutUs from "../components/footerComponents/AboutUs";
import AffiliateProgram from "../components/footerComponents/AffiliateProgram";
import BusinessTools from "../components/footerComponents/BusinessTools";
import Careers from "../components/footerComponents/Careers";
import Community from "../components/footerComponents/Community";
import ContactUs from "../components/footerComponents/ContactUs";
import DirectContracts from "../components/footerComponents/DirectContracts";
import Enterprise from "../components/footerComponents/Enterprise";
import FreelanceUSA from "../components/footerComponents/FreelanceUSA";
import FreelanceWorldwide from "../components/footerComponents/FreelanceWorldwide";
import HelpSupport from "../components/footerComponents/HelpSupport";
import HireAnAgency from "../components/footerComponents/HireAnAgency";
import HireInUSA from "../components/footerComponents/HireInUSA";
import HireWorldwide from "../components/footerComponents/HireWorldwide";
import HowToFindWork from "../components/footerComponents/HowToFindWork";
import HowToHire from "../components/footerComponents/HowToHire";
import InvestorRelations from "../components/footerComponents/InvestorRelations";
import Leadership from "../components/footerComponents/Leadership";
import ModernSlavery from "../components/footerComponents/ModernSlavery";
import OurImpact from "../components/footerComponents/OurImpact";
import PayrollServices from "../components/footerComponents/PayrollServices";
import Press from "../components/footerComponents/Press";
import ProjectCatalog from "../components/footerComponents/ProjectCatalog";
import Resources from "../components/footerComponents/Resources";
import Reviews from "../components/footerComponents/Reviews";
import SuccessStories from "../components/footerComponents/SuccessStories";
import TalentMarketplace from "../components/footerComponents/TalentMarketplace";
import TalentScout from "../components/footerComponents/TalentScout";
import TrustSafety from "../components/footerComponents/TrustSafetySecurity";






function AppRoutes() {
  const token = localStorage.getItem("accessToken");

  return (
    <Routes>

{/* footer pages */}
    <Route path="/privacy" element={<Privacy />} />
      <Route path="/how-to-hire" element={<HowToHire />} />
      <Route path="/talent-marketplace" element={<TalentMarketplace />} />
      <Route path="/project-catalog" element={<ProjectCatalog />} />
      <Route path="/talent-scout" element={<TalentScout />} />
      <Route path="/hire-an-agency" element={<HireAnAgency />} />
      <Route path="/enterprise" element={<Enterprise />} />
      <Route path="/payroll-services" element={<PayrollServices />} />
      <Route path="/direct-contracts" element={<DirectContracts />} />
      <Route path="/hire-worldwide" element={<HireWorldwide />} />
      <Route path="/hire-in-usa" element={<HireInUSA />} />
      <Route path="/how-to-find-work" element={<HowToFindWork />} />
      <Route path="/freelance-jobs-worldwide" element={<FreelanceWorldwide />} />
      <Route path="/freelance-jobs-usa" element={<FreelanceUSA />} />
      <Route path="/help-support" element={<HelpSupport />} />
      <Route path="/success-stories" element={<SuccessStories />} />
      <Route path="/upwork-reviews" element={<Reviews />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/community" element={<Community />} />
      <Route path="/affiliate-program" element={<AffiliateProgram />} />
      <Route path="/business-tools" element={<BusinessTools />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/investor-relations" element={<InvestorRelations />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/our-impact" element={<OurImpact />} />
      <Route path="/press" element={<Press />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/trust-safety" element={<TrustSafety />} />
      <Route path="/modern-slavery" element={<ModernSlavery />} />
  


      <Route path="/" element={<Index />} />
      <Route path="/whygrapetask" element={<WhyGrapeTask />} />
      <Route path="/aboutus" element={<AboutUS />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/search/gigs" element={<SearchGigsMainBanner />} />
      <Route
        path="/MeetTopRatedFreelancer"
        element={<MeetTopRatedFreelancer />}
      />
      <Route path="/level" element={<Level />} />

      {token ? (
        ""
      ) : (
        <>
          <Route path="/signup" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/otp-reset-password" element={<OtpResetPassword />} />
        </>
      )}
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/Blogopen" element={<Blogopen />} />
      <Route path="/help" element={<Help />} />
      <Route path="/g/:gigslug/:user/:gigId" element={<FreelancersGigs />} />
      <Route exact path="/" element={<ProtectedRoute />}>
        <Route
          path="/profileOtherPerson/:id"
          element={<ProfileOtherPerson />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers/>} />
        <Route path="/admin/blogs" element={<BlogListPage />} />
<Route path="/admin/blogs/create" element={<CreateBlogPage />} />
{/* <Route path="/admin/blogs/edit/:id" element={<EditBlogPage />} /> */}
<Route path="/admin/projects" element={<AdminOrders/>} />
       
       

<Route path="/Inbox" element={<FrelancerChat />} />
<Route path="/userchat" element={<Chattingwindow
 />} />





<Route path="/adminInbox" element={<AdminChat />} />
     
<Route path="/userInbox" element={<FrelancerChat />} />
     
        <Route path="/buyerRequest" element={<BuyerRequest />} />
        <Route path="/jobInvitation" element={<JobInvitation />} />
        
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/earning" element={<Earning />} />
        <Route path="/spending" element={<Spending />} />
        
        
        <Route path="/hireExpert" element={<HireExpert />} />
        <Route path="/:username" element={<Gigs2 />} />
        <Route path="/recruitProcess" element={<RecruitProcess />} />
        <Route path="/tack" element={<Take />} />
        <Route path="/account" element={<Account />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile/referral/link" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/entercode" element={<Entercode />} />
        <Route path="/referl" element={<Referl />} />
        <Route path="/payoutMethod" element={<PayoutMethod />} />
        <Route path="/paymentcard" element={<Paymentcard />} />
        <Route path="/dopayout" element={<Dopayout />} />
        <Route path="/accept" element={<Accept />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/bonousReward" element={<BonousReward />} />
        <Route path="/multiSteps" element={<MultiSteps />} />
        <Route path="/profileSetting" element={<ProfileUser />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/userBuyerRequest" element={<UserBuyerRequest />} />
        <Route path="/buy-bids" element={<BuyBids />} />

        {/* <Route path="/offerDetail" element={<OfferDetail />} /> */}
        <Route path="/offerDetail/:id" element={<OfferDetail />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/chat/:user" element={<Chat />} />
        <Route path="/frelancerPaymentViaCard" element={<PaymentViaCard />} />
        <Route path="/order/payment" element={<PaymentViaCard />} />

        <Route path="/profile/referrals" element={<ReferalList />} />
        <Route path="/frelancerChat" element={<FrelancerChat />} />
        <Route path="/level" element={<Level />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
