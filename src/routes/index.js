
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// ============================================================================
// LAZY LOADED COMPONENTS - Performance Optimization
// ============================================================================

// Core Components (Keep these as regular imports for faster initial load)
import Signin from "../components/Signin";
import Index from "../pages/Index";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
// Admin Components - Lazy Loaded
const AdminDashboard = lazy(() => import("../pages/admin-panel"));
const AdminUsers = lazy(() => import("../pages/admin-panel/users"));
const BlogListPage = lazy(() => import("../pages/admin-panel/blog/BlogList"));
const CreateBlogPage = lazy(() => import("../pages/admin-panel/blog/create"));
const AdminOrders = lazy(() => import("../pages/admin-panel/orders/index"));
const AdminPayments = lazy(() => import("../pages/admin-panel/payment/index"));
const AdminBids = lazy(() => import("../pages/admin-panel/bids/index"));
const AdminWithdrawalManagement = lazy(() => import("../pages/admin-panel/withdraw/index"));
const AdminChat = lazy(() => import("../pages/admin-panel/chat/AdminChat"));

// Main App Components - Lazy Loaded
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../components/Profile"));
const ProfileOtherPerson = lazy(() => import("../pages/ProfileOtherPerson"));
const BuyerRequest = lazy(() => import("../pages/BuyerRequest"));
const JobInvitation = lazy(() => import("../pages/freelancers/FreelancersJobInvitations"));
const Chat = lazy(() => import("../pages/Chat"));
const FreelancerChat = lazy(() => import("../pages/freelancers/FrelancerChat"));
const Earning = lazy(() => import("../pages/Earning"));
const Spending = lazy(() => import("../pages/Spending"));
const PaymentViaCard = lazy(() => import("../pages/freelancers/PaymentViaCard"));
const PayoutMethod = lazy(() => import("../pages/Payoutmethod/PayoutMethod"));
const Paymentcard = lazy(() => import("../pages/Payoutmethod/Paymentcard"));
const Dopayout = lazy(() => import("../pages/Payoutmethod/Dopayout"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));

// Public Pages - Lazy Loaded
const AboutUS = lazy(() => import("../pages/AboutUS"));
const WhyGrapeTask = lazy(() => import("../pages/WhyGrapeTask"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const SearchGigsMainBanner = lazy(() => import("../pages/SearchGigsMainBanner"));
const MeetTopRatedFreelancer = lazy(() => import("../pages/MeetTopRatedFreelancer"));
const Level = lazy(() => import("../pages/Level"));
const Help = lazy(() => import("../pages/Help"));
const FreelancersGigs = lazy(() => import("../pages/freelancers/FreelancersGigs"));
const Blogopen = lazy(() => import("../components/Blogopen"));

// Auth Components - Lazy Loaded
const Forgot = lazy(() => import("../pages/Forgot"));
const Otp = lazy(() => import("../pages/Otp"));
const OtpResetPassword = lazy(() => import("../pages/otpResetPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));

// Business Components - Lazy Loaded
const BuyBids = lazy(() => import("../pages/PurchaseBids"));
const UserBuyerRequest = lazy(() => import("../pages/UserBuyerRequest"));
const HireExpert = lazy(() => import("../pages/HireExpert"));
const Applicants = lazy(() => import("../pages/Applicants"));
const Freelancers = lazy(() => import("../pages/freelancers/Freelancers"));

// Other Core Components - Lazy Loaded
const Account = lazy(() => import("../components/Account"));
const BonousReward = lazy(() => import("../components/BonousReward"));
const Chattingwindow = lazy(() => import("../components/frelancerChat/Chat/Chating"));
const Gigs2 = lazy(() => import("../components/Gigs2"));
const Interview = lazy(() => import("../components/Interview"));
const Order = lazy(() => import("../components/Orders/Order"));
const Privacy = lazy(() => import("../components/Privacy"));
const ProfileUser = lazy(() => import("../components/profile/Profile"));
const Refund = lazy(() => import("../components/Refund"));
const Shipping = lazy(() => import("../components/Shipping"));
const Take = lazy(() => import("../components/Take"));
const Terms = lazy(() => import("../components/Terms"));

// Additional Pages - Lazy Loaded
const RecruitProcess = lazy(() => import("../pages/RecruitProcess"));
const OfferDetail = lazy(() => import("../pages/OfferDetail"));
const MultiSteps = lazy(() => import("../pages/Stepper/MultiSteps"));

// Referral Components - Lazy Loaded
const Entercode = lazy(() => import("../pages/Referal/Entercode"));
const Level1 = lazy(() => import("../pages/Referal/Level1"));
const Level2 = lazy(() => import("../pages/Referal/Level2"));
const Level3 = lazy(() => import("../pages/Referal/Level3"));
const Referl = lazy(() => import("../pages/Referal/Referl"));
const Thanks = lazy(() => import("../pages/Referal/Thanks"));
const ReferalList = lazy(() => import("../pages/ReferalList"));

// Job Management Components - Lazy Loaded
const Accept = lazy(() => import("../pages/StartedJob/Accept"));
const Complete = lazy(() => import("../pages/StartedJob/Complete"));
const Progress = lazy(() => import("../pages/StartedJob/Progress"));

// Footer Components - Lazy Loaded
const AboutUs = lazy(() => import("../components/footerComponents/AboutUs"));
const AffiliateProgram = lazy(() => import("../components/footerComponents/AffiliateProgram"));
const BusinessTools = lazy(() => import("../components/footerComponents/BusinessTools"));
const Careers = lazy(() => import("../components/footerComponents/Careers"));
const Community = lazy(() => import("../components/footerComponents/Community"));
const ContactUs = lazy(() => import("../components/footerComponents/ContactUs"));
const DirectContracts = lazy(() => import("../components/footerComponents/DirectContracts"));
const Enterprise = lazy(() => import("../components/footerComponents/Enterprise"));
const FreelanceUSA = lazy(() => import("../components/footerComponents/FreelanceUSA"));
const FreelanceWorldwide = lazy(() => import("../components/footerComponents/FreelanceWorldwide"));
const HelpSupport = lazy(() => import("../components/footerComponents/HelpSupport"));
const HireAnAgency = lazy(() => import("../components/footerComponents/HireAnAgency"));
const HireInUSA = lazy(() => import("../components/footerComponents/HireInUSA"));
const HireWorldwide = lazy(() => import("../components/footerComponents/HireWorldwide"));
const HowToFindWork = lazy(() => import("../components/footerComponents/HowToFindWork"));
const HowToHire = lazy(() => import("../components/footerComponents/HowToHire"));
const InvestorRelations = lazy(() => import("../components/footerComponents/InvestorRelations"));
const Leadership = lazy(() => import("../components/footerComponents/Leadership"));
const ModernSlavery = lazy(() => import("../components/footerComponents/ModernSlavery"));
const OurImpact = lazy(() => import("../components/footerComponents/OurImpact"));
const PayrollServices = lazy(() => import("../components/footerComponents/PayrollServices"));
const Press = lazy(() => import("../components/footerComponents/Press"));
const ProjectCatalog = lazy(() => import("../components/footerComponents/ProjectCatalog"));
const Resources = lazy(() => import("../components/footerComponents/Resources"));
const Reviews = lazy(() => import("../components/footerComponents/Reviews"));
const SuccessStories = lazy(() => import("../components/footerComponents/SuccessStories"));
const TalentMarketplace = lazy(() => import("../components/footerComponents/TalentMarketplace"));
const TalentScout = lazy(() => import("../components/footerComponents/TalentScout"));
const TrustSafety = lazy(() => import("../components/footerComponents/TrustSafetySecurity"));

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const USER_ROLES = {
  ADMIN: 'admin',
  FREELANCER: 'expert/freelancer',
  EXPERT: 'expert/freelancer',
  CLIENT: 'Client',
  BIDDER: 'bidder/company representative/middleman',
  COMPANY_REP: 'bidder/company representative/middleman',
  MIDDLEMAN: 'bidder/company representative/middleman'
};

const ROUTE_PERMISSIONS = {
  // Admin Routes
  '/admin/*': [USER_ROLES.ADMIN],
  '/admin/users': [USER_ROLES.ADMIN],
  '/admin/blogs': [USER_ROLES.ADMIN],
  '/admin/blogs/create': [USER_ROLES.ADMIN],
  '/admin/projects': [USER_ROLES.ADMIN],
  '/admin/payments': [USER_ROLES.ADMIN],
  '/admin/bids': [USER_ROLES.ADMIN],
  '/admin/withdraw': [USER_ROLES.ADMIN],
  '/adminInbox': [USER_ROLES.ADMIN],
  
  // Financial Routes - Service Providers
  '/earning': [USER_ROLES.FREELANCER, USER_ROLES.EXPERT],
  '/payoutMethod': [USER_ROLES.FREELANCER, USER_ROLES.EXPERT],
  '/paymentcard': [USER_ROLES.FREELANCER, USER_ROLES.EXPERT],
  '/dopayout': [USER_ROLES.FREELANCER, USER_ROLES.EXPERT],
  
  // Financial Routes - Clients
  '/spending': [USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN],
  '/buyerRequest': [USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN],
  '/buy-bids': [USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN],
  '/hireExpert': [USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN],
  '/userBuyerRequest': [USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN],
  
  // Payment Routes - Multi-role
  '/order/payment': [USER_ROLES.FREELANCER, USER_ROLES.EXPERT, USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN],
  '/frelancerPaymentViaCard': [USER_ROLES.FREELANCER, USER_ROLES.EXPERT, USER_ROLES.CLIENT]
};

const SESSION_CONFIG = {
  TIMEOUT_DURATION: 30 * 60 * 1000, // 30 minutes
  WARNING_DURATION: 5 * 60 * 1000,  // 5 minutes before timeout
  ACTIVITY_EVENTS: ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
};

const SENSITIVE_PATHS = ['/admin', '/payment', '/payout', '/earning', '/spending'];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const isSensitivePath = (pathname) => {
  return SENSITIVE_PATHS.some(path => pathname.includes(path));
};

const hasRoutePermission = (path, userRole) => {
  const permissions = ROUTE_PERMISSIONS[path];
  return permissions ? permissions.includes(userRole) : true;
};

const clearSensitiveData = () => {
  sessionStorage.clear();
  if (window.sensitiveData) {
    window.sensitiveData = null;
  }
};

// ============================================================================
// COMPONENTS
// ============================================================================

// Enhanced Loading Component with different states
const LoadingSpinner = ({ message = "Loading...", size = "default" }) => {
  const sizeClass = size === "small" ? "spinner-border-sm" : "";
  
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className={`spinner-border text-primary ${sizeClass}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );
};

// Enhanced Error Boundary
const RouteErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      console.error('Route Error:', error, errorInfo);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <h1 className="display-4 text-danger">Oops!</h1>
          <p className="lead">Something went wrong. Please try refreshing the page.</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return children;
};

// Unauthorized Page Component
const UnauthorizedPage = () => {
  const location = useLocation();
  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="error-page">
          <h1 className="display-1 fw-bold text-danger">403</h1>
          <h2 className="mb-3">Access Denied</h2>
          <p className="lead text-muted mb-4">
            You don't have permission to access this resource.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button 
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
            <button 
              className="btn btn-outline-primary"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Session Warning Modal Component
const SessionWarningModal = ({ show, onExtend, onLogout, timeLeft }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Session Expiring</h5>
          </div>
          <div className="modal-body">
            <p>Your session will expire in {Math.ceil(timeLeft / 1000)} seconds due to inactivity.</p>
            <p>Would you like to extend your session?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
            <button type="button" className="btn btn-primary" onClick={onExtend}>
              Extend Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Protected Route Component
const EnhancedProtectedRoute = ({ children, requiredRoles = [], fallbackPath = "/login" }) => {
  const { 
    isAuthenticated, 
    tokenValidated, 
    authLoading, 
    userDetail: user 
  } = useSelector(state => state.user);
  
  const location = useLocation();

  if (authLoading || !tokenValidated) {
    return <LoadingSpinner message="Validating session..." />;
  }

  if (!isAuthenticated || !localStorage.getItem('accessToken')) {
    return <Navigate to={fallbackPath} replace state={{ from: location.pathname }} />;
  }

  if (requiredRoles.length > 0 && (!user?.role || !requiredRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Role Protected Route Component
const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  return (
    <EnhancedProtectedRoute requiredRoles={allowedRoles}>
      {children}
    </EnhancedProtectedRoute>
  );
};

// Auth Route Component (redirects authenticated users)
const AuthRoute = ({ children, redirectTo = "/dashboard" }) => {
  const { isAuthenticated } = useSelector(state => state.user);
  const hasToken = localStorage.getItem('accessToken');
  
  if (isAuthenticated && hasToken) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};

// Enhanced Security Wrapper
const SecurityWrapper = ({ children }) => {
  const location = useLocation();
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);

  const timeoutRef = useRef();
  const warningTimeoutRef = useRef();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    clearSensitiveData();
    window.location.href = '/login?session=expired';
  }, []);

  const showWarning = useCallback(() => {
    setSessionTimeLeft(SESSION_CONFIG.WARNING_DURATION);
    setShowSessionWarning(true);
    
    const countdownInterval = setInterval(() => {
      setSessionTimeLeft(prev => {
        if (prev <= 1000) {
          clearInterval(countdownInterval);
          handleLogout();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  }, [handleLogout]);

  const resetTimeout = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearTimeout(warningTimeoutRef.current);
    setShowSessionWarning(false);
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      warningTimeoutRef.current = setTimeout(showWarning, SESSION_CONFIG.TIMEOUT_DURATION - SESSION_CONFIG.WARNING_DURATION);
      timeoutRef.current = setTimeout(handleLogout, SESSION_CONFIG.TIMEOUT_DURATION);
    }
  }, [showWarning, handleLogout]);

  const extendSession = useCallback(() => {
    resetTimeout();
    setShowSessionWarning(false);
  }, [resetTimeout]);

  useEffect(() => {
    SESSION_CONFIG.ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });

    resetTimeout();

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(warningTimeoutRef.current);
      SESSION_CONFIG.ACTIVITY_EVENTS.forEach(event => {
        document.removeEventListener(event, resetTimeout, true);
      });
    };
  }, [resetTimeout]);

  return (
    <>
      <SessionWarningModal
        show={showSessionWarning}
        onExtend={extendSession}
        onLogout={handleLogout}
        timeLeft={sessionTimeLeft}
      />
      {children}
    </>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function AppRoutes() {
  const { isAuthenticated, tokenValidated } = useSelector(state => state.user);
  const tokenExists = localStorage.getItem("accessToken");

  return (
    <RouteErrorBoundary>
      <SecurityWrapper>
      <>
             <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/whygrapetask" element={<WhyGrapeTask />} />
            <Route path="/aboutus" element={<AboutUS />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/search/gigs" element={<SearchGigsMainBanner />} />
            <Route path="/MeetTopRatedFreelancer" element={<MeetTopRatedFreelancer />} />
            <Route path="/level" element={<Level />} />
            <Route path="/help" element={<Help />} />
            <Route path="/g/:gigslug/:user/:gigId" element={<FreelancersGigs />} />
            <Route path="/Blogopen" element={<Blogopen />} />
            
            {/* Footer Pages */}
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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/shipping" element={<Shipping />} />

            {/* Auth Routes - Only accessible when NOT logged in */}
            {!tokenExists && (
              <>
                <Route path="/signup" element={<Signin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/otp-reset-password" element={<OtpResetPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
              </>
            )}

            {/* Redirect logged-in users away from auth pages */}
            {tokenExists && (
              <>
                <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                <Route path="/forgot" element={<Navigate to="/dashboard" replace />} />
                <Route path="/otp" element={<Navigate to="/dashboard" replace />} />
                <Route path="/resetPassword" element={<Navigate to="/dashboard" replace />} />
              </>
            )}

            {/* Unauthorized Page */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Admin Routes - Admin Only */}
            <Route path="/admin/*" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminUsers />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/blogs" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <BlogListPage />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/blogs/create" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <CreateBlogPage />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/projects" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminOrders />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/payments" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminPayments />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/bids" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminBids />
              </RoleProtectedRoute>
            } />
            
            <Route path="/admin/withdraw" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminWithdrawalManagement />
              </RoleProtectedRoute>
            } />
            
            <Route path="/adminInbox" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminChat />
              </RoleProtectedRoute>
            } />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <EnhancedProtectedRoute>
                <Dashboard />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <EnhancedProtectedRoute>
                <Profile />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/profileOtherPerson/:id" element={
              <EnhancedProtectedRoute>
                <ProfileOtherPerson />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/buyerRequest" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN]}>
                <BuyerRequest />
              </RoleProtectedRoute>
            } />
            
            <Route path="/jobInvitation" element={
              <EnhancedProtectedRoute>
                <JobInvitation />
              </EnhancedProtectedRoute>
            } />

            {/* Chat Routes */}
            <Route path="/Inbox" element={
              <EnhancedProtectedRoute>
                <FreelancerChat />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/userchat" element={
              <EnhancedProtectedRoute>
                <Chattingwindow />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/userInbox" element={
              <EnhancedProtectedRoute>
                <FreelancerChat />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/chat" element={
              <EnhancedProtectedRoute>
                <Chat />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/chat/:user" element={
              <EnhancedProtectedRoute>
                <Chat />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/frelancerChat" element={
              <EnhancedProtectedRoute>
                <FreelancerChat />
              </EnhancedProtectedRoute>
            } />

            {/* Financial Routes - Role-based Security */}
            <Route path="/earning" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.FREELANCER, USER_ROLES.EXPERT]}>
                <Earning />
              </RoleProtectedRoute>
            } />
            
            <Route path="/spending" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN]}>
                <Spending />
              </RoleProtectedRoute>
            } />
            
            <Route path="/payoutMethod" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.FREELANCER, USER_ROLES.EXPERT]}>
                <PayoutMethod />
              </RoleProtectedRoute>
            } />
            
            <Route path="/paymentcard" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.FREELANCER, USER_ROLES.EXPERT]}>
                <Paymentcard />
              </RoleProtectedRoute>
            } />
            
            <Route path="/dopayout" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.FREELANCER, USER_ROLES.EXPERT]}>
                <Dopayout />
              </RoleProtectedRoute>
            } />

            {/* Payment Routes - Multi-role Access */}
            <Route path="/frelancerPaymentViaCard" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.FREELANCER, USER_ROLES.EXPERT, USER_ROLES.CLIENT]}>
                <PaymentViaCard />
              </RoleProtectedRoute>
            } />
            
            <Route path="/order/payment" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.FREELANCER, USER_ROLES.EXPERT, USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN]}>
                <PaymentViaCard />
              </RoleProtectedRoute>
            } />
            
            <Route path="/payment/success" element={
              <EnhancedProtectedRoute>
                <PaymentSuccess />
              </EnhancedProtectedRoute>
            } />

            {/* Business Routes - Client/Bidder specific */}
            <Route path="/userBuyerRequest" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN]}>
                <UserBuyerRequest />
              </RoleProtectedRoute>
            } />
            
            <Route path="/buy-bids" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN]}>
                <BuyBids />
              </RoleProtectedRoute>
            } />
            
            <Route path="/hireExpert" element={
              <RoleProtectedRoute allowedRoles={[USER_ROLES.CLIENT, USER_ROLES.BIDDER, USER_ROLES.COMPANY_REP, USER_ROLES.MIDDLEMAN]}>
                <HireExpert />
              </RoleProtectedRoute>
            } />

            <Route path="/applicants" element={
              <EnhancedProtectedRoute>
                <Applicants />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/:username" element={
              <EnhancedProtectedRoute>
                <Gigs2 />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/recruitProcess" element={
              <EnhancedProtectedRoute>
                <RecruitProcess />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/tack" element={
              <EnhancedProtectedRoute>
                <Take />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/account" element={
              <EnhancedProtectedRoute>
                <Account />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/order" element={
              <EnhancedProtectedRoute>
                <Order />
              </EnhancedProtectedRoute>
            } />

            {/* Referral Routes */}
            <Route path="/profile/referral/link" element={
              <EnhancedProtectedRoute>
                <Level1 />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/level2" element={
              <EnhancedProtectedRoute>
                <Level2 />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/level3" element={
              <EnhancedProtectedRoute>
                <Level3 />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/thanks" element={
              <EnhancedProtectedRoute>
                <Thanks />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/entercode" element={
              <EnhancedProtectedRoute>
                <Entercode />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/referl" element={
              <EnhancedProtectedRoute>
                <Referl />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/profile/referrals" element={
              <EnhancedProtectedRoute>
                <ReferalList />
              </EnhancedProtectedRoute>
            } />

            {/* Job Management Routes */}
            <Route path="/accept" element={
              <EnhancedProtectedRoute>
                <Accept />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/progress" element={
              <EnhancedProtectedRoute>
                <Progress />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/complete" element={
              <EnhancedProtectedRoute>
                <Complete />
              </EnhancedProtectedRoute>
            } />

            {/* Misc Protected Routes */}
            <Route path="/bonousReward" element={
              <EnhancedProtectedRoute>
                <BonousReward />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/multiSteps" element={
              <EnhancedProtectedRoute>
                <MultiSteps />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/profileSetting" element={
              <EnhancedProtectedRoute>
                <ProfileUser />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/interview" element={
              <EnhancedProtectedRoute>
                <Interview />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/offerDetail/:id" element={
              <EnhancedProtectedRoute>
                <OfferDetail />
              </EnhancedProtectedRoute>
            } />
            
            <Route path="/freelancers" element={
              <EnhancedProtectedRoute>
                <Freelancers />
              </EnhancedProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense >
      </>
      </SecurityWrapper>
    </RouteErrorBoundary>
  );
}

export default AppRoutes;












// old routes are below


// import { Route, Routes } from "react-router-dom";
// import Blogopen from "../components/Blogopen";
// import Signin from "../components/Signin";
// import AboutUS from "../pages/AboutUS";
// import AdminDashboard from "../pages/admin-panel";
// import AdminBids from '../pages/admin-panel/bids/index';
// import BlogListPage from "../pages/admin-panel/blog/BlogList";
// import CreateBlogPage from "../pages/admin-panel/blog/create";
// import AdminOrders from '../pages/admin-panel/orders/index';
// import AdminPayments from '../pages/admin-panel/payment/index';
// import AdminUsers from "../pages/admin-panel/users";
// import AdminWithdrawalManagement from '../pages/admin-panel/withdraw/index';
// import Blog from "../pages/Blog";
// import BlogDetail from "../pages/BlogDetail";
// import Dashboard from "../pages/Dashboard";
// import Forgot from "../pages/Forgot";
// import JobInvitation from '../pages/freelancers/FreelancersJobInvitations';
// import Index from "../pages/Index";
// import Login from "../pages/Login";
// import Otp from "../pages/Otp";
// import OtpResetPassword from "../pages/otpResetPassword";
// import WhyGrapeTask from "../pages/WhyGrapeTask";
// import ProtectedRoute from "./protectedRoute";

// import BuyerRequest from "../pages/BuyerRequest";
// import BuyBids from "../pages/PurchaseBids";

// import Account from "../components/Account";
// import BonousReward from "../components/BonousReward";
// import Chattingwindow from "../components/frelancerChat/Chat/Chating";
// import Gigs2 from "../components/Gigs2";
// import Interview from "../components/Interview";
// import Order from "../components/Orders/Order";
// import Privacy from "../components/Privacy";
// import Profile from "../components/Profile";
// import ProfileUser from "../components/profile/Profile";
// import Refund from "../components/Refund";
// import Shipping from "../components/Shipping";
// import Take from "../components/Take";
// import Terms from "../components/Terms";
// import AdminChat from "../pages/admin-panel/chat/AdminChat";

// import Applicants from "../pages/Applicants";
// import Chat from "../pages/Chat";
// import Earning from "../pages/Earning";
// import Freelancers from "../pages/freelancers/Freelancers";
// import FreelancersGigs from "../pages/freelancers/FreelancersGigs";
// import FrelancerChat from "../pages/freelancers/FrelancerChat";
// import PaymentViaCard from "../pages/freelancers/PaymentViaCard";
// import Help from "../pages/Help";
// import HireExpert from "../pages/HireExpert";
// import Level from "../pages/Level";
// import MeetTopRatedFreelancer from "../pages/MeetTopRatedFreelancer";
// import NotFound from "../pages/NotFound";
// import OfferDetail from "../pages/OfferDetail";
// import PaymentSuccess from "../pages/PaymentSuccess";
// import Dopayout from "../pages/Payoutmethod/Dopayout";
// import Paymentcard from "../pages/Payoutmethod/Paymentcard";
// import PayoutMethod from "../pages/Payoutmethod/PayoutMethod";
// import ProfileOtherPerson from "../pages/ProfileOtherPerson";
// import RecruitProcess from "../pages/RecruitProcess";
// import Entercode from "../pages/Referal/Entercode";
// import Level1 from "../pages/Referal/Level1";
// import Level2 from "../pages/Referal/Level2";
// import Level3 from "../pages/Referal/Level3";
// import Referl from "../pages/Referal/Referl";
// import Thanks from "../pages/Referal/Thanks";
// import ReferalList from "../pages/ReferalList";
// import ResetPassword from "../pages/ResetPassword";
// import SearchGigsMainBanner from "../pages/SearchGigsMainBanner";
// import Spending from "../pages/Spending";
// import Accept from "../pages/StartedJob/Accept";
// import Complete from "../pages/StartedJob/Complete";
// import Progress from "../pages/StartedJob/Progress";
// import MultiSteps from "../pages/Stepper/MultiSteps";
// import UserBuyerRequest from "../pages/UserBuyerRequest";


// // Inside your

// import AboutUs from "../components/footerComponents/AboutUs";
// import AffiliateProgram from "../components/footerComponents/AffiliateProgram";
// import BusinessTools from "../components/footerComponents/BusinessTools";
// import Careers from "../components/footerComponents/Careers";
// import Community from "../components/footerComponents/Community";
// import ContactUs from "../components/footerComponents/ContactUs";
// import DirectContracts from "../components/footerComponents/DirectContracts";
// import Enterprise from "../components/footerComponents/Enterprise";
// import FreelanceUSA from "../components/footerComponents/FreelanceUSA";
// import FreelanceWorldwide from "../components/footerComponents/FreelanceWorldwide";
// import HelpSupport from "../components/footerComponents/HelpSupport";
// import HireAnAgency from "../components/footerComponents/HireAnAgency";
// import HireInUSA from "../components/footerComponents/HireInUSA";
// import HireWorldwide from "../components/footerComponents/HireWorldwide";
// import HowToFindWork from "../components/footerComponents/HowToFindWork";
// import HowToHire from "../components/footerComponents/HowToHire";
// import InvestorRelations from "../components/footerComponents/InvestorRelations";
// import Leadership from "../components/footerComponents/Leadership";
// import ModernSlavery from "../components/footerComponents/ModernSlavery";
// import OurImpact from "../components/footerComponents/OurImpact";
// import PayrollServices from "../components/footerComponents/PayrollServices";
// import Press from "../components/footerComponents/Press";
// import ProjectCatalog from "../components/footerComponents/ProjectCatalog";
// import Resources from "../components/footerComponents/Resources";
// import Reviews from "../components/footerComponents/Reviews";
// import SuccessStories from "../components/footerComponents/SuccessStories";
// import TalentMarketplace from "../components/footerComponents/TalentMarketplace";
// import TalentScout from "../components/footerComponents/TalentScout";
// import TrustSafety from "../components/footerComponents/TrustSafetySecurity";






// function AppRoutes() {
//   const token = localStorage.getItem("accessToken");

//   return (
//     <Routes>

// {/* footer pages */}
//     <Route path="/privacy" element={<Privacy />} />
//       <Route path="/how-to-hire" element={<HowToHire />} />
//       <Route path="/talent-marketplace" element={<TalentMarketplace />} />
//       <Route path="/project-catalog" element={<ProjectCatalog />} />
//       <Route path="/talent-scout" element={<TalentScout />} />
//       <Route path="/hire-an-agency" element={<HireAnAgency />} />
//       <Route path="/enterprise" element={<Enterprise />} />
//       <Route path="/payroll-services" element={<PayrollServices />} />
//       <Route path="/direct-contracts" element={<DirectContracts />} />
//       <Route path="/hire-worldwide" element={<HireWorldwide />} />
//       <Route path="/hire-in-usa" element={<HireInUSA />} />
//       <Route path="/how-to-find-work" element={<HowToFindWork />} />
//       <Route path="/freelance-jobs-worldwide" element={<FreelanceWorldwide />} />
//       <Route path="/freelance-jobs-usa" element={<FreelanceUSA />} />
//       <Route path="/help-support" element={<HelpSupport />} />
//       <Route path="/success-stories" element={<SuccessStories />} />
//       <Route path="/upwork-reviews" element={<Reviews />} />
//       <Route path="/resources" element={<Resources />} />
//       <Route path="/blog" element={<Blog />} />
   
//       <Route path="/community" element={<Community />} />
//       <Route path="/affiliate-program" element={<AffiliateProgram />} />
//       <Route path="/business-tools" element={<BusinessTools />} />
//       <Route path="/about-us" element={<AboutUs />} />
//       <Route path="/leadership" element={<Leadership />} />
//       <Route path="/investor-relations" element={<InvestorRelations />} />
//       <Route path="/careers" element={<Careers />} />
//       <Route path="/our-impact" element={<OurImpact />} />
//       <Route path="/press" element={<Press />} />
//       <Route path="/contact-us" element={<ContactUs />} />
//       <Route path="/trust-safety" element={<TrustSafety />} />
//       <Route path="/modern-slavery" element={<ModernSlavery />} />
  


//       <Route path="/" element={<Index />} />
//       <Route path="/whygrapetask" element={<WhyGrapeTask />} />
//       <Route path="/aboutus" element={<AboutUS />} />
//       <Route path="/blog" element={<Blog />} />
//        <Route path="/blog/:id" element={<BlogDetail />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/search/gigs" element={<SearchGigsMainBanner />} />
//       <Route
//         path="/MeetTopRatedFreelancer"
//         element={<MeetTopRatedFreelancer />}
//       />
//       <Route path="/level" element={<Level />} />

//       {token ? (
//         ""
//       ) : (
//         <>
//           <Route path="/signup" element={<Signin />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot" element={<Forgot />} />
//           <Route path="/otp" element={<Otp />} />
//           <Route path="/otp-reset-password" element={<OtpResetPassword />} />
//         </>
//       )}
//       <Route path="/resetPassword" element={<ResetPassword />} />
//       <Route path="/Blogopen" element={<Blogopen />} />
//       <Route path="/help" element={<Help />} />
//       <Route path="/g/:gigslug/:user/:gigId" element={<FreelancersGigs />} />
//       <Route exact path="/" element={<ProtectedRoute />}>
//         <Route
//           path="/profileOtherPerson/:id"
//           element={<ProfileOtherPerson />}
//         />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/admin/*" element={<AdminDashboard />} />
//         <Route path="/admin/users" element={<AdminUsers/>} />
//         <Route path="/admin/blogs" element={<BlogListPage />} />
// <Route path="/admin/blogs/create" element={<CreateBlogPage />} />

// <Route path="/admin/projects" element={<AdminOrders/>} />

// <Route path="/admin/payments" element={<AdminPayments/>} />

// <Route path="/admin/bids" element={<AdminBids/>} />


// <Route path="/admin/withdraw" element={<AdminWithdrawalManagement/>} />



     
       

// <Route path="/Inbox" element={<FrelancerChat />} />
// <Route path="/userchat" element={<Chattingwindow
//  />} />





// <Route path="/adminInbox" element={<AdminChat />} />
     
// <Route path="/userInbox" element={<FrelancerChat />} />
     
//         <Route path="/buyerRequest" element={<BuyerRequest />} />
//         <Route path="/jobInvitation" element={<JobInvitation />} />
        
        
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/applicants" element={<Applicants />} />
//         <Route path="/earning" element={<Earning />} />
//         <Route path="/spending" element={<Spending />} />
        
        
//         <Route path="/hireExpert" element={<HireExpert />} />
//         <Route path="/:username" element={<Gigs2 />} />
//         <Route path="/recruitProcess" element={<RecruitProcess />} />
//         <Route path="/tack" element={<Take />} />
//         <Route path="/account" element={<Account />} />
//         <Route path="/order" element={<Order />} />
//         <Route path="/profile/referral/link" element={<Level1 />} />
//         <Route path="/level2" element={<Level2 />} />
//         <Route path="/level3" element={<Level3 />} />
//         <Route path="/thanks" element={<Thanks />} />
//         <Route path="/payment/success" element={<PaymentSuccess />} />
//         <Route path="/entercode" element={<Entercode />} />
//         <Route path="/referl" element={<Referl />} />
//         <Route path="/payoutMethod" element={<PayoutMethod />} />
//         <Route path="/paymentcard" element={<Paymentcard />} />
//         <Route path="/dopayout" element={<Dopayout />} />
//         <Route path="/accept" element={<Accept />} />
//         <Route path="/progress" element={<Progress />} />
//         <Route path="/complete" element={<Complete />} />
//         <Route path="/bonousReward" element={<BonousReward />} />
//         <Route path="/multiSteps" element={<MultiSteps />} />
//         <Route path="/profileSetting" element={<ProfileUser />} />
//         <Route path="/chat" element={<Chat />} />
//         <Route path="/interview" element={<Interview />} />
//         <Route path="/userBuyerRequest" element={<UserBuyerRequest />} />
//         <Route path="/buy-bids" element={<BuyBids />} />

//         {/* <Route path="/offerDetail" element={<OfferDetail />} /> */}
//         <Route path="/offerDetail/:id" element={<OfferDetail />} />
//         <Route path="/freelancers" element={<Freelancers />} />
//         <Route path="/chat/:user" element={<Chat />} />
//         <Route path="/frelancerPaymentViaCard" element={<PaymentViaCard />} />
//         <Route path="/order/payment" element={<PaymentViaCard />} />

//         <Route path="/profile/referrals" element={<ReferalList />} />
//         <Route path="/frelancerChat" element={<FrelancerChat />} />
//         <Route path="/level" element={<Level />} />
//         <Route path="/terms" element={<Terms />} />
//         <Route path="/privacy" element={<Privacy />} />
//         <Route path="/refund" element={<Refund />} />
//         <Route path="/shipping" element={<Shipping />} />
//       </Route>
//     </Routes>
//   );
// }

// export default AppRoutes;
