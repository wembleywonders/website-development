import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SafeComponent } from './wrapper/SafeReact'
import { AuthProvider } from './contexts/AuthContext'
import { SmartRouting } from './utils/smartRouting'

// ✨ Import navigation configuration
import { REDIRECT_MAP } from './config/navigation'

// Core pages
import HomePage from './pages/HomePage'
import ConnoisseurClubPage from './pages/ConnoisseurClubPage'
import YourJourneyPage from './pages/YourJourneyPage'
import AboutUsPage from './pages/AboutUsPage'
import GetStartedPage from './pages/GetStartedPage'
import SandboxIndex from './pages/SandboxIndex'  // ✨ Updated: Sandbox landing page
import ProgrammesPage from './pages/ProgrammesPage'
import CreatorPathwaysPage from './pages/CreatorPathwaysPage'
import CreatorFactoryPage from './pages/CreatorFactoryPage'
import CalendarPage from './pages/CalendarPage'
import { CommunityCalendarPage } from './pages/CommunityCalendarPage'
import CommunityShopPage from './pages/CommunityShopPage'
import CommunityHubsPage from './pages/community-hubs'
import CommunityInvestmentPage from "./pages/CommunityInvestment/CommunityInvestmentPage"
import WorkWithUsPage from './pages/WorkWithUsPage'
import ContactPage from './pages/ContactPage'
import BusinessSignup from "./components/business/BusinessSignup"
import WorkshopsPage from './pages/WorkshopsPage'
import WorkshopCalendarPage from './pages/WorkshopCalendarPage'
import VolunteersPage from './pages/VolunteersPage'

// ✨ NEW: Volunteer Application Page
import VolunteerApplicationPage from './pages/VolunteerApplicationPage'

// ✨ Passionistas Hub Pages
import { PassionistasTools } from './pages/PassionistasTools'
import SessionsPage from './pages/SessionsPage'
import DownloadsPage from './pages/DownloadsPage'
import CommunityPage from './pages/CommunityPage'
import PathwaysIndex from './pages/pathways/PathwaysIndex'

// Revenue-focused pages
import EnrollPage from './pages/EnrollPage'
import CorporateTrainingPage from './pages/CorporateTrainingPage'
import PartnershipsPage from './pages/PartnershipsPage'
import FranchisePage from './pages/FranchisePage'
import PlatformLicencingPage from './pages/PlatformLicencingPage'
import HireTalentPage from './pages/HireTalentPage'
import SponsorshipPage from './pages/SponsorshipPage'
import MethodPage from './pages/MethodPage'
import WhatYouLearnPage from './pages/WhatYouLearnPage'
import JourneyPage from './pages/JourneyPage'
import FAQPage from './pages/FAQPage'
import ImpactPage from './pages/ImpactPage'

// ✨ NEW: Strategic Partnerships & Hire Graduates Pages
import StrategicPartnershipsPage from './pages/StrategicPartnershipsPage'
import HireGraduatesPage from './pages/HireGraduatesPage'

// Programme pages
import KaywanasCourtPage from './pages/programmes/kaywanas-court'
import PageturnersPage from './pages/programmes/pageturners'
import STEMgeneersPage from './pages/programmes/STEMgeneersPage'
import TECHreneursPage from './pages/programmes/techreneurs'
import { GTechCastersPage } from './pages/programmes/gtechcasters'
import TrubbleNBassPage from './pages/trubble-n-bass'
import SilkStilettoPage from './pages/programmes/silk-stilettos'
import BrightSparksPage from './pages/programmes/bright-sparks'
import AuntieAnansisKitchenPage from './pages/programmes/auntie-anansis-kitchen'
import { ScrapCatPage } from './pages/programmes/scrap-cat'
import { MoneyResetPage } from './pages/programmes/money-reset'

// ✨ Programme Sandbox pages
import KaywanasCourtSandbox from './pages/programmes/kaywanas-court/KaywanasCourtSandbox'
import PageturnersSandbox from './pages/programmes/pageturners/PageturnersSandbox'
import STEMgeneersSandbox from './pages/programmes/stemgeneers/STEMgeneersSandbox'
import TECHreneursSandbox from './pages/programmes/techreneurs/TECHreneursSandbox'
import GTechCastersSandbox from './pages/programmes/gtechcasters/GTechCastersSandbox'
import TrubbleNBassSandbox from './pages/programmes/trubble-n-bass/TrubbleNBassSandbox'
import SilkStilettosSandbox from './pages/programmes/silk-stilettos/SilkStilettosSandbox'
import BrightSparksSandbox from './pages/programmes/bright-sparks/BrightSparksSandbox'
import AuntieAnansisKitchenSandbox from './pages/programmes/auntie-anansis-kitchen/AuntieAnansisKitchenSandbox'
import ScrapCatSandbox from './pages/programmes/scrap-cat/ScrapCatSandbox'

// Media platform pages
import RaydyoPage from './pages/RaydyoPage'
import JoystickPage from './pages/JoystickPage'

// Creator's Journal
import CreatorsJournalPage from './pages/creators-journal/CreatorsJournalPage'

// Members Bonus sub-pages
import IndividualBenefits from './pages/IndividualBenefits'
import CommunityOwnership from './pages/membership/CommunityOwnership'

// Who We Are sub-pages
import HowWeSharePower from './pages/who-we-are/HowWeSharePower'
import DirectorsPathway from './pages/who-we-are/DirectorsPathway'

// Team page
import TeamPage from './pages/team/TeamPage'

// Auth pages
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

// Admin pages
import CreatorMetricsDashboard from './pages/admin/CreatorMetricsDashboard'

// Membership pages
import MembershipPage from './pages/MembershipPage'
import ConnectorApplicationGatewayPage from './pages/ConnectorApplicationGatewayPage'
import ApplicationSuccessPage from './pages/ApplicationSuccessPage'
import AssessmentGuidePage from './pages/AssessmentGuidePage'
import ApplicationDashboard from './pages/ApplicationDashboard'
import CuratorPage from './pages/CuratorPage'
import ChampionPage from './pages/ChampionPage'
import CommunityOverviewPage from './pages/CommunityOverviewPage'
import ConnectorHandbookPage from './pages/ConnectorHandbookPage'
import SampleScenariosPage from './pages/SampleScenariosPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import PracticeAssessmentPage from './pages/PracticeAssessmentPage'
import ScheduleAssessmentPage from './pages/ScheduleAssessmentPage'

// ════════════════════════════════════════════════════════════════
// ✨ NEW: Spark Generator & Facilitation Engine
// ════════════════════════════════════════════════════════════════
import { SparkGeneratorPage } from './workshops/spark-generator'
import { FacilitationEngine } from './workshops/facilitation'

// Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// ============================================
// SMART ROUTING COMPONENTS
// ============================================

const SmartRedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = SmartRouting.handleSmartRedirects(location.pathname);
    if (redirect && redirect !== location.pathname) {
      navigate(redirect, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
};

const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    SmartRouting.trackInterest('page_visit', location.pathname);
  }, [location.pathname]);

  return null;
};

const SmartParameterRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const interest = urlParams.get('to') || urlParams.get('interest') || urlParams.get('ref');
    
    if (interest) {
      const routing = SmartRouting.analyzeIncomingTraffic();
      if (routing.suggestedPath) {
        navigate(routing.suggestedPath, { 
          state: { 
            welcomeMessage: routing.welcomeMessage,
            trackingId: routing.trackingId 
          },
          replace: true 
        });
        return;
      }
    }
    
    navigate('/get-started', { replace: true });
  }, [navigate, location.search]);

  return (
    <div className="redirect-loading">
      <p>Taking you to the right place...</p>
    </div>
  );
};

const SmartNotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const suggestions: string[] = [];

    // ✨ NEW: Spark Generator & Facilitation suggestions
    if (path.includes('spark') || path.includes('warmup') || path.includes('warm-up') || path.includes('icebreaker')) {
      suggestions.push('/workshops/spark-generator');
    }
    if (path.includes('facilitat') || path.includes('session-plan') || path.includes('guide')) {
      suggestions.push('/workshops/facilitation');
    }

    // Passionistas hub suggestions
    if (path.includes('tool') || path.includes('sandbox') || path.includes('try')) {
      suggestions.push('/sandbox');
    }
    if (path.includes('session') || path.includes('zoom') || path.includes('workshop')) {
      suggestions.push('/sessions');
    }
    if (path.includes('download') || path.includes('resource') || path.includes('worksheet')) {
      suggestions.push('/downloads');
    }
    if (path.includes('community') || path.includes('gallery') || path.includes('project')) {
      suggestions.push('/community');
    }
    if (path.includes('pathway') || path.includes('programme') || path.includes('program')) {
      suggestions.push('/pathways');
    }

    // Revenue page suggestions
    if (path.includes('enrol') || path.includes('apply') || path.includes('join')) {
      suggestions.push('/enroll');
    }
    if (path.includes('corporate') || path.includes('business') || path.includes('training')) {
      suggestions.push('/corporate-training');
    }
    if (path.includes('partner') || path.includes('collaboration')) {
      suggestions.push('/strategic-partnerships');
    }
    if (path.includes('franchise') || path.includes('license')) {
      suggestions.push('/franchise');
    }
    if (path.includes('hire') || path.includes('talent') || path.includes('graduate')) {
      suggestions.push('/hire-graduates');
    }
    if (path.includes('sponsor') || path.includes('advertise')) {
      suggestions.push('/sponsorship');
    }
    if (path.includes('method') || path.includes('approach') || path.includes('philosophy')) {
      suggestions.push('/method');
    }
    if (path.includes('learn') || path.includes('curriculum')) {
      suggestions.push('/what-you-learn');
    }
    if (path.includes('factory')) {
      suggestions.push('/factory');
    }
    if (path.includes('faq') || path.includes('question')) {
      suggestions.push('/faq');
    }

    // Auth suggestions
    if (path.includes('login') || path.includes('signin') || path.includes('sign-in')) {
      suggestions.push('/auth/login');
    }
    if (path.includes('signup') || path.includes('register') || path.includes('sign-up')) {
      suggestions.push('/auth/signup');
    }

    // Existing page suggestions
    if (path.includes('about')) {
      suggestions.push('/about');
    }
    if (path.includes('contact')) {
      suggestions.push('/contact');
    }
    if (path.includes('member')) {
      suggestions.push('/membership');
    }
    if (path.includes('volunteer')) {
      suggestions.push('/volunteers');
    }
    if (path.includes('shop') || path.includes('store')) {
      suggestions.push('/shop');
    }
    if (path.includes('calendar') || path.includes('event')) {
      suggestions.push('/calendar');
    }

    setSuggestions(suggestions.slice(0, 3));
  }, [location.pathname]);

  return (
    <div className="smart-404">
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      {suggestions.length > 0 && (
        <div className="suggestions">
          <p>Did you mean:</p>
          <ul>
            {suggestions.map(path => (
              <li key={path}>
                <button onClick={() => navigate(path)}>{path}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  return (
    <SafeComponent>
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <SmartRedirectHandler />
            <RouteTracker />
            
            <main className="main-content">
              <Routes>
                
                {/* ========================================
                    AUTH ROUTES
                    ======================================== */}
                {/* Primary auth routes with /auth/ prefix */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                
                {/* Legacy auth routes (redirect to /auth/) */}
                <Route path="/login" element={<Navigate to="/auth/login" replace />} />
                <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
                <Route path="/sign-up" element={<Navigate to="/auth/signup" replace />} />
                <Route path="/sign-in" element={<Navigate to="/auth/login" replace />} />
                <Route path="/signin" element={<Navigate to="/auth/login" replace />} />
                <Route path="/register" element={<Navigate to="/auth/signup?intent=general" replace />} />
                
                {/* Intent-based signup shortcuts */}
                <Route path="/join-as-creator" element={<Navigate to="/auth/signup?intent=creator" replace />} />
                <Route path="/join-as-learner" element={<Navigate to="/auth/signup?intent=learner" replace />} />
                <Route path="/join-as-volunteer" element={<Navigate to="/auth/signup?intent=volunteer" replace />} />
                
                {/* ========================================
                    ADMIN ROUTES
                    ======================================== */}
                <Route path="/admin/metrics" element={<CreatorMetricsDashboard />} />
                <Route path="/admin/creator-factory" element={<CreatorMetricsDashboard />} />
                <Route path="/admin/dashboard" element={<CreatorMetricsDashboard />} />
                
                {/* ========================================
                    ✨ WORKSHOP ROUTES (Spark Generator & Facilitation)
                    ======================================== */}
                
                {/* Spark Generator — Facilitator Zoom warm-up tool */}
                <Route path="/workshops/spark-generator" element={<SparkGeneratorPage />} />
                
                {/* Spark Generator aliases */}
                <Route path="/sparks" element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/spark-generator" element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/tools/sparks" element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/warmup" element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/warm-up" element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/icebreaker" element={<Navigate to="/workshops/spark-generator" replace />} />
                
                {/* Facilitation Engine — Week-by-week session guides */}
                <Route path="/workshops/facilitation" element={<FacilitationEngine />} />
                
                {/* Facilitation aliases */}
                <Route path="/facilitation" element={<Navigate to="/workshops/facilitation" replace />} />
                <Route path="/guides" element={<Navigate to="/workshops/facilitation" replace />} />
                <Route path="/session-plans" element={<Navigate to="/workshops/facilitation" replace />} />
                <Route path="/facilitation-guides" element={<Navigate to="/workshops/facilitation" replace />} />

                {/* ========================================
                    ✨ PASSIONISTAS HUB ROUTES
                    ======================================== */}
                <Route path="/tools" element={<PassionistasTools />} />
                <Route path="/tools/:toolId" element={<PassionistasTools />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/downloads" element={<DownloadsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                
                {/* ========================================
                    ✨ SANDBOX INDEX & PROGRAMME SANDBOXES
                    ======================================== */}
                <Route path="/sandbox" element={<SandboxIndex />} />
                <Route path="/sandboxes" element={<SandboxIndex />} />
                <Route path="/try" element={<SandboxIndex />} />
                
                {/* Programme-specific sandboxes */}
                <Route path="/programmes/kaywanas-court/sandbox" element={<KaywanasCourtSandbox />} />
                <Route path="/programmes/pageturners/sandbox" element={<PageturnersSandbox />} />
                <Route path="/programmes/stemgeneers/sandbox" element={<STEMgeneersSandbox />} />
                <Route path="/programmes/techreneurs/sandbox" element={<TECHreneursSandbox />} />
                <Route path="/programmes/gtechcasters/sandbox" element={<GTechCastersSandbox />} />
                <Route path="/programmes/trubble-n-bass/sandbox" element={<TrubbleNBassSandbox />} />
                <Route path="/programmes/silk-stilettos/sandbox" element={<SilkStilettosSandbox />} />
                <Route path="/programmes/bright-sparks/sandbox" element={<BrightSparksSandbox />} />
                <Route path="/programmes/auntie-anansis-kitchen/sandbox" element={<AuntieAnansisKitchenSandbox />} />
                <Route path="/programmes/scrap-cat/sandbox" element={<ScrapCatSandbox />} />
                
                {/* Sandbox aliases via pathways */}
                <Route path="/pathways/kaywanas-court/sandbox" element={<KaywanasCourtSandbox />} />
                <Route path="/pathways/pageturners/sandbox" element={<PageturnersSandbox />} />
                <Route path="/pathways/stemgeneers/sandbox" element={<STEMgeneersSandbox />} />
                <Route path="/pathways/techreneurs/sandbox" element={<TECHreneursSandbox />} />
                <Route path="/pathways/gtechcasters/sandbox" element={<GTechCastersSandbox />} />
                <Route path="/pathways/gtech-casters/sandbox" element={<GTechCastersSandbox />} />
                <Route path="/pathways/trubble-n-bass/sandbox" element={<TrubbleNBassSandbox />} />
                <Route path="/pathways/silk-stilettos/sandbox" element={<SilkStilettosSandbox />} />
                <Route path="/pathways/bright-sparks/sandbox" element={<BrightSparksSandbox />} />
                <Route path="/pathways/auntie-anansis-kitchen/sandbox" element={<AuntieAnansisKitchenSandbox />} />
                <Route path="/pathways/aunties-kitchen/sandbox" element={<AuntieAnansisKitchenSandbox />} />
                <Route path="/pathways/scrap-cat/sandbox" element={<ScrapCatSandbox />} />
                
                {/* ========================================
                    ✨ PATHWAYS (Primary navigation)
                    ======================================== */}
                <Route path="/pathways" element={<PathwaysIndex />} />
                <Route path="/pathways/stemgeneers" element={<STEMgeneersPage />} />
                <Route path="/pathways/techreneurs" element={<TECHreneursPage />} />
                <Route path="/pathways/kaywanas-court" element={<KaywanasCourtPage />} />
                <Route path="/pathways/gtech-casters" element={<GTechCastersPage />} />
                <Route path="/pathways/gtechcasters" element={<GTechCastersPage />} />
                <Route path="/pathways/trubble-n-bass" element={<TrubbleNBassPage />} />
                <Route path="/pathways/silk-stilettos" element={<SilkStilettoPage />} />
                <Route path="/pathways/aunties-kitchen" element={<AuntieAnansisKitchenPage />} />
                <Route path="/pathways/auntie-anansis-kitchen" element={<AuntieAnansisKitchenPage />} />
                <Route path="/pathways/pageturners" element={<PageturnersPage />} />
                <Route path="/pathways/bright-sparks" element={<BrightSparksPage />} />
                <Route path="/pathways/scrap-cat" element={<ScrapCatPage />} />
                <Route path="/pathways/raydyo" element={<RaydyoPage />} />
                <Route path="/pathways/joystick" element={<JoystickPage />} />
                <Route path="/pathways/money-reset" element={<MoneyResetPage />} />
                
                {/* ========================================
                    REVENUE ROUTES
                    ======================================== */}
                <Route path="/enroll" element={<EnrollPage />} />
                <Route path="/corporate-training" element={<CorporateTrainingPage />} />
                <Route path="/partnerships" element={<PartnershipsPage />} />
                <Route path="/strategic-partnerships" element={<StrategicPartnershipsPage />} />
                <Route path="/franchise" element={<FranchisePage />} />
                <Route path="/platform-licensing" element={<PlatformLicencingPage />} />
                <Route path="/platform-license" element={<PlatformLicencingPage />} />
                <Route path="/hire-graduates" element={<HireGraduatesPage />} />
                <Route path="/hire-talent" element={<HireTalentPage />} />
                <Route path="/sponsorship" element={<SponsorshipPage />} />
                <Route path="/advertise" element={<SponsorshipPage />} />
                <Route path="/method" element={<MethodPage />} />
                <Route path="/what-you-learn" element={<WhatYouLearnPage />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                
                {/* Revenue Route Aliases */}
                <Route path="/apply" element={<EnrollPage />} />
                <Route path="/business-training" element={<CorporateTrainingPage />} />
                <Route path="/b2b" element={<CorporateTrainingPage />} />
                <Route path="/partners" element={<PartnershipsPage />} />
                <Route path="/employers" element={<HireGraduatesPage />} />
                <Route path="/recruitment" element={<HireGraduatesPage />} />
                
                {/* ========================================
                    CORE ROUTES
                    ======================================== */}
                <Route path="/" element={<HomePage />} />
                
                {/* ========================================
                    CONNOISSEURS CLUB - CULTURAL FRAMEWORK
                    ======================================== */}
                <Route path="/connoisseurs-club" element={<ConnoisseurClubPage />} />
                
                <Route path="/your-journey" element={<YourJourneyPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />
                
                {/* Creator Factory Routes */}
                <Route path="/factory" element={<CreatorFactoryPage />} />
                <Route path="/creator-factory" element={<CreatorFactoryPage />} />
                <Route path="/the-factory" element={<CreatorFactoryPage />} />
                
                {/* Creator Pathways Routes (legacy) */}
                <Route path="/creator-pathways" element={<CreatorPathwaysPage />} />
                <Route path="/journey-map" element={<CreatorPathwaysPage />} />
                
                {/* Calendar & Events */}
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/programmes" element={<CalendarPage />} />
                <Route path="/shows" element={<CalendarPage />} />
                <Route path="/events" element={<CommunityCalendarPage />} />
                <Route path="/community-events" element={<CommunityCalendarPage />} />
                
                <Route path="/shop" element={<CommunityShopPage />} />
                <Route path="/cyberstore" element={<CommunityShopPage />} />
                <Route path="/community" element={<CommunityHubsPage />} />
                <Route path="/workshops" element={<WorkshopsPage />} />
                <Route path="/workshop-calendar" element={<WorkshopCalendarPage />} />
                
                {/* ========================================
                    VOLUNTEER ROUTES
                    ======================================== */}
                <Route path="/volunteers" element={<VolunteersPage />} />
                <Route path="/volunteer-application" element={<VolunteerApplicationPage />} />
                <Route path="/volunteer/apply" element={<Navigate to="/volunteer-application" replace />} />
                <Route path="/become-a-volunteer" element={<Navigate to="/volunteer-application" replace />} />
                
                {/* Creator's Journal */}
                <Route path="/creators-journal" element={<CreatorsJournalPage />} />
                
                {/* ========================================
                    PROGRAMMES (Legacy - still works)
                    ======================================== */}
                <Route path="/programmes" element={<ProgrammesPage />} />
                <Route path="/programmes/all" element={<ProgrammesPage />} />
                <Route path="/programmes/kaywanas-court" element={<KaywanasCourtPage />} />
                <Route path="/programmes/pageturners" element={<PageturnersPage />} />
                <Route path="/programmes/auntie-anansis-kitchen" element={<AuntieAnansisKitchenPage />} />
                <Route path="/programmes/bright-sparks" element={<BrightSparksPage />} />
                <Route path="/programmes/silk-stilettos" element={<SilkStilettoPage />} />
                <Route path="/programmes/stemgeneers" element={<STEMgeneersPage />} />
                <Route path="/programmes/techreneurs" element={<TECHreneursPage />} />
                <Route path="/programmes/techtreneurs" element={<TECHreneursPage />} />
                <Route path="/programmes/gtechcasters" element={<GTechCastersPage />} />
                <Route path="/programmes/trubble-n-bass" element={<TrubbleNBassPage />} />
                <Route path="/programmes/scrap-cat" element={<ScrapCatPage />} />
                <Route path="/programmes/money-reset" element={<MoneyResetPage />} />
                
                {/* Media Platform Routes */}
                <Route path="/raydyo" element={<RaydyoPage />} />
                <Route path="/joystick" element={<JoystickPage />} />
                
                {/* Community Investment Routes */}
                <Route path="/partner-with-us" element={<CommunityInvestmentPage />} />
                <Route path="/work-with-us" element={<WorkWithUsPage />} />
                <Route path="/partnerships" element={<BusinessSignup />} />
                
                {/* ========================================
                    MEMBERSHIP ROUTES
                    ======================================== */}
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/connector" element={<ConnectorApplicationGatewayPage />} />
                <Route path="/apply" element={<ConnectorApplicationGatewayPage />} />
                <Route path="/application-success" element={<ApplicationSuccessPage />} />
                <Route path="/application-dashboard" element={<ApplicationDashboard />} />
                <Route path="/assessment-guide" element={<AssessmentGuidePage />} />
                <Route path="/practice-assessment" element={<PracticeAssessmentPage />} />
                <Route path="/schedule-assessment" element={<ScheduleAssessmentPage />} />
                <Route path="/curator" element={<CuratorPage />} />
                <Route path="/champion" element={<ChampionPage />} />
                <Route path="/community-overview" element={<CommunityOverviewPage />} />
                <Route path="/membership" element={<ConnectorHandbookPage />} />
                <Route path="/practice-assessment" element={<SampleScenariosPage />} />
                <Route path="/success-stories" element={<SuccessStoriesPage />} />
                
                {/* Members Bonus Routes */}
                <Route path="/membership" element={<IndividualBenefits />} />
                <Route path="/membership" element={<IndividualBenefits />} />
                <Route path="/membership" element={<CommunityOwnership />} />
                
                {/* Who We Are sub-pages */}
                <Route path="/who-we-are/how-we-share-power" element={<HowWeSharePower />} />
                <Route path="/who-we-are/directors-pathway" element={<DirectorsPathway />} />
                
                {/* ========================================
                    ✨ REDIRECTS FROM NAVIGATION CONFIG
                    Generated from REDIRECT_MAP
                    ======================================== */}
                {Object.entries(REDIRECT_MAP).map(([from, to]) => (
                  <Route key={from} path={from} element={<Navigate to={to as string} replace />} />
                ))}
                
                {/* ========================================
                    ADDITIONAL REDIRECTS
                    ======================================== */}
                {/* Backwards compatibility */}
                <Route path="/community-investment" element={<Navigate to="/partnerships" replace />} />
                <Route path="/membership/benefits" element={<Navigate to="/membership" replace />} />
                <Route path="/members-benefits" element={<Navigate to="/membership" replace />} />
                <Route path="/projects" element={<Navigate to="/community" replace />} />
                
                {/* American spelling */}
                <Route path="/programs" element={<Navigate to="/pathways" replace />} />
                <Route path="/store" element={<Navigate to="/shop" replace />} />
                
                {/* Topic redirects → Pathways */}
                <Route path="/stem" element={<Navigate to="/pathways/stemgeneers" replace />} />
                <Route path="/entrepreneurship" element={<Navigate to="/pathways/techreneurs" replace />} />
                <Route path="/coding" element={<Navigate to="/pathways/stemgeneers" replace />} />
                <Route path="/robotics" element={<Navigate to="/pathways/stemgeneers" replace />} />
                <Route path="/startup" element={<Navigate to="/pathways/techreneurs" replace />} />
                <Route path="/media" element={<Navigate to="/pathways/gtech-casters" replace />} />
                <Route path="/podcast" element={<Navigate to="/raydyo" replace />} />
                <Route path="/podcasting" element={<Navigate to="/pathways/gtech-casters" replace />} />
                <Route path="/music" element={<Navigate to="/pathways/trubble-n-bass" replace />} />
                <Route path="/beats" element={<Navigate to="/pathways/trubble-n-bass" replace />} />
                <Route path="/production" element={<Navigate to="/pathways/trubble-n-bass" replace />} />
                <Route path="/fashion" element={<Navigate to="/pathways/silk-stilettos" replace />} />
                <Route path="/design" element={<Navigate to="/pathways/silk-stilettos" replace />} />
                <Route path="/cooking" element={<Navigate to="/pathways/aunties-kitchen" replace />} />
                <Route path="/recipes" element={<Navigate to="/pathways/aunties-kitchen" replace />} />
                <Route path="/kitchen" element={<Navigate to="/pathways/aunties-kitchen" replace />} />
                <Route path="/drama" element={<Navigate to="/pathways/kaywanas-court" replace />} />
                <Route path="/theatre" element={<Navigate to="/pathways/kaywanas-court" replace />} />
                <Route path="/writing" element={<Navigate to="/pathways/pageturners" replace />} />
                <Route path="/reading" element={<Navigate to="/pathways/pageturners" replace />} />
                <Route path="/repair" element={<Navigate to="/pathways/scrap-cat" replace />} />
                <Route path="/recycling" element={<Navigate to="/pathways/scrap-cat" replace />} />
                <Route path="/money" element={<Navigate to="/pathways/money-reset" replace />} />
                <Route path="/membership" element={<Navigate to="/pathways/money-reset" replace />} />
                
                {/* Media platform SEO redirects */}
                <Route path="/radio" element={<Navigate to="/raydyo" replace />} />
                <Route path="/magazine" element={<Navigate to="/joystick" replace />} />
                <Route path="/ezine" element={<Navigate to="/joystick" replace />} />
                <Route path="/gaming" element={<Navigate to="/joystick" replace />} />
                <Route path="/games" element={<Navigate to="/joystick" replace />} />
                
                {/* Tilted Crowns redirect */}
                <Route path="/tilted-crowns" element={<Navigate to="/shop" replace />} />
                <Route path="/crowns" element={<Navigate to="/shop" replace />} />
                
                {/* Creator's Journal redirects */}
                <Route path="/journal" element={<Navigate to="/creators-journal" replace />} />
                <Route path="/portfolio" element={<Navigate to="/creators-journal" replace />} />
                <Route path="/dashboard" element={<Navigate to="/creators-journal" replace />} />
                
                {/* General redirects */}
                <Route path="/training" element={<Navigate to="/corporate-training" replace />} />
                <Route path="/programmes" element={<Navigate to="/workshops" replace />} />
                <Route path="/courses" element={<Navigate to="/workshops" replace />} />
                <Route path="/classes" element={<Navigate to="/workshops" replace />} />
                <Route path="/learn" element={<Navigate to="/pathways" replace />} />
                <Route path="/join" element={<Navigate to="/enroll" replace />} />
                <Route path="/help" element={<Navigate to="/contact" replace />} />
                <Route path="/support" element={<Navigate to="/contact" replace />} />
                <Route path="/volunteer" element={<Navigate to="/volunteers" replace />} />
                
                {/* Smart URL parameter handling */}
                <Route path="/redirect" element={<SmartParameterRedirect />} />
                
                {/* ========================================
                    404 - CATCH ALL
                    ======================================== */}
                <Route path="*" element={<SmartNotFound />} />
                
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </SafeComponent>
  )
}

export default App