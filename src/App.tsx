import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { SafeComponent } from './wrapper/SafeReact'
import { AuthProvider } from './contexts/AuthContext'
import { SmartRouting } from './utils/smartRouting'
import { REDIRECT_MAP } from './config/navigation'

// Core pages
import HomePage from './pages/HomePage'
import ConnoisseurClubPage from './pages/ConnoisseurClubPage'
import YourJourneyPage from './pages/YourJourneyPage'
import AboutUsPage from './pages/AboutUsPage'
import GetStartedPage from './pages/GetStartedPage'
import SandboxIndex from './pages/SandboxIndex'
import ProgrammesPage from './pages/ProgrammesPage'
import CreatorPathwaysPage from './pages/CreatorPathwaysPage'
import CreatorFactoryPage from './pages/CreatorFactoryPage'
import CalendarPage from './pages/CalendarPage'
import ConnectedCalendarPage from './pages/ConnectedCalendarPage'
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
import VolunteerApplicationPage from './pages/VolunteerApplicationPage'
import JoinFlow from './pages/JoinFlow'
import { PassionistasTools } from './pages/PassionistasTools'
import SessionsPage from './pages/SessionsPage'
import DownloadsPage from './pages/DownloadsPage'
import CommunityPage from './pages/CommunityPage'
import PathwaysIndex from './pages/pathways/PathwaysIndex'
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
import StrategicPartnershipsPage from './pages/StrategicPartnershipsPage'
import HireGraduatesPage from './pages/HireGraduatesPage'

// Panel pages
import PanelStoryPage from './pages/panel/PanelStoryPage'
import PanelProgrammesPage from './pages/panel/PanelProgrammesPage'
import PanelPositionPage from './pages/panel/PanelPositionPage'

// Platform identity pages
import ManifestoPage from './pages/ManifestoPage'
import GovernancePage from './pages/GovernancePage'
import HowItWorksPage from './pages/HowItWorksPage'
import EditorialStandardPage from './pages/EditorialStandardPage'

// Participation pages
import HousesPage from './pages/participation/HousesPage'
import StoragePage from './pages/participation/StoragePage'
import CommunityDashboard from './pages/participation/CommunityDashboard'

// Programme pages
import KaywanasCourtPage from './pages/programmes/kaywanas-court'
import PageturnersPage from './pages/programmes/pageturners'
import STEMgeneersPage from './pages/programmes/stemgeneers'
import TECHreneursPage from './pages/programmes/techreneurs'
import { GTechCastersPage } from './pages/programmes/gtechcasters'
import TrubbleNBassPage from './pages/trubble-n-bass'
import SilkStilettoPage from './pages/programmes/silk-stilettos'
import BrightSparksPage from './pages/programmes/bright-sparks'
import AuntieAnansisKitchenPage from './pages/programmes/auntie-anansis-kitchen'
import { ScrapCatPage } from './pages/programmes/scrap-cat'
import { MoneyResetPage } from './pages/programmes/money-reset'
import EasyStreetPage from './pages/programmes/easy-street'
import EasyStreetSandbox from './pages/programmes/easy-street/sandbox'
import RootsPage from './pages/programmes/roots/RootsPage'
import RootsSandbox from './pages/programmes/roots/sandbox'
import IWDEditorialPage from './pages/editorial/IWDEditorialPage'

// Programme sandboxes
import KaywanasCourtSandbox from './pages/programmes/kaywanas-court/KaywanasCourtSandbox'
import PageturnersSandbox from './pages/programmes/pageturners/PageturnersSandbox'
import STEMgeneersSandbox from './pages/programmes/stemgeneers/sandbox'
import TECHreneursSandbox from './pages/programmes/techreneurs/TECHreneursSandbox'
import GTechCastersSandbox from './pages/programmes/gtechcasters/GTechCastersSandbox'
import TrubbleNBassSandbox from './pages/programmes/trubble-n-bass/TrubbleNBassSandbox'
import SilkStilettosSandbox from './pages/programmes/silk-stilettos/sandbox'
import BrightSparksSandbox from './pages/programmes/bright-sparks/BrightSparksSandbox'
import AuntieAnansisKitchenSandbox from './pages/programmes/auntie-anansis-kitchen/AuntieAnansisKitchenSandbox'
import ScrapCatSandbox from './pages/programmes/scrap-cat/ScrapCatSandbox'

// Media & other pages
import RaydyoPage from './pages/RaydyoPage'
import JoystickPage from './pages/JoystickPage'
import CreatorsJournalPage from './pages/creators-journal/CreatorsJournalPage'
import IndividualBenefits from './pages/IndividualBenefits'
import CommunityOwnership from './pages/membership/CommunityOwnership'
import HowWeSharePower from './pages/who-we-are/HowWeSharePower'
import DirectorsPathway from './pages/who-we-are/DirectorsPathway'
import TeamPage from './pages/team/TeamPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import CreatorMetricsDashboard from './pages/admin/CreatorMetricsDashboard'
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
import { SparkGeneratorPage } from './workshops/spark-generator'
import { FacilitationEngine } from './workshops/facilitation'
import KnowledgeCommonsShell from './components/knowledge-commons/KnowledgeCommonsShell'
import OralHistoryPage from './pages/OralHistoryPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { useEffect } from 'react'

const SmartRedirectHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = SmartRouting.handleSmartRedirects(location.pathname);
    if (redirect && redirect !== location.pathname) navigate(redirect, { replace: true });
  }, [location.pathname, navigate]);
  return null;
};

const RouteTracker: React.FC = () => {
  const location = useLocation();
  useEffect(() => { SmartRouting.trackInterest('page_visit', location.pathname); }, [location.pathname]);
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
        navigate(routing.suggestedPath, { state: { welcomeMessage: routing.welcomeMessage, trackingId: routing.trackingId }, replace: true });
        return;
      }
    }
    navigate('/get-started', { replace: true });
  }, [navigate, location.search]);
  return <div className="redirect-loading"><p>Taking you to the right place...</p></div>;
};

const SmartNotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const s: string[] = [];
    if (path.includes('heritage') || path.includes('archive') || path.includes('pioneer') || path.includes('plaque')) s.push('/heritage');
    if (path.includes('oral') || path.includes('history') || path.includes('testimony')) s.push('/oral-history');
    if (path.includes('spark') || path.includes('warmup') || path.includes('icebreaker')) s.push('/workshops/spark-generator');
    if (path.includes('facilitat') || path.includes('session-plan')) s.push('/workshops/facilitation');
    if (path.includes('easy') || path.includes('street') || path.includes('radio-drama')) s.push('/programmes/easy-street');
    if (path.includes('casting') || path.includes('set-the-scene') || path.includes('fan-tv')) s.push('/programmes/easy-street/sandbox');
    if (path.includes('roots') || path.includes('hair') || path.includes('body-sovereignty')) s.push('/programmes/roots');
    if (path.includes('panel') || path.includes('your-story') || path.includes('your-position')) s.push('/panel/story');
    if (path.includes('manifesto')) s.push('/manifesto');
    if (path.includes('governance') || path.includes('55-25') || path.includes('pardner')) s.push('/governance');
    if (path.includes('how-it-works') || path.includes('revenue-model')) s.push('/how-it-works');
    if (path.includes('tool') || path.includes('sandbox') || path.includes('try')) s.push('/sandbox');
    if (path.includes('session') || path.includes('zoom') || path.includes('workshop')) s.push('/sessions');
    if (path.includes('download') || path.includes('resource')) s.push('/downloads');
    if (path.includes('community') || path.includes('gallery')) s.push('/community');
    if (path.includes('pathway') || path.includes('programme')) s.push('/pathways');
    if (path.includes('enrol') || path.includes('join') || path.includes('apply')) s.push('/join');
    if (path.includes('corporate') || path.includes('business') || path.includes('training')) s.push('/corporate-training');
    if (path.includes('partner') || path.includes('collaboration')) s.push('/strategic-partnerships');
    if (path.includes('franchise') || path.includes('license')) s.push('/franchise');
    if (path.includes('hire') || path.includes('talent') || path.includes('graduate')) s.push('/hire-graduates');
    if (path.includes('sponsor') || path.includes('advertise')) s.push('/sponsorship');
    if (path.includes('factory')) s.push('/factory');
    if (path.includes('faq') || path.includes('question')) s.push('/faq');
    if (path.includes('login') || path.includes('signin')) s.push('/auth/login');
    if (path.includes('signup') || path.includes('register')) s.push('/auth/signup');
    if (path.includes('about')) s.push('/about');
    if (path.includes('contact')) s.push('/contact');
    if (path.includes('member')) s.push('/membership');
    if (path.includes('volunteer')) s.push('/volunteers');
    if (path.includes('shop') || path.includes('store')) s.push('/shop');
    if (path.includes('calendar') || path.includes('event')) s.push('/calendar');
    setSuggestions(s.slice(0, 3));
  }, [location.pathname]);

  return (
    <div className="smart-404">
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      {suggestions.length > 0 && (
        <div className="suggestions">
          <p>Did you mean:</p>
          <ul>{suggestions.map(path => <li key={path}><button onClick={() => navigate(path)}>{path}</button></li>)}</ul>
        </div>
      )}
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

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

                {/* AUTH */}
                <Route path="/auth/login"  element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/login"          element={<Navigate to="/auth/login"              replace />} />
                <Route path="/signup"         element={<Navigate to="/auth/signup"             replace />} />
                <Route path="/sign-up"        element={<Navigate to="/auth/signup"             replace />} />
                <Route path="/sign-in"        element={<Navigate to="/auth/login"              replace />} />
                <Route path="/signin"         element={<Navigate to="/auth/login"              replace />} />
                <Route path="/register"       element={<Navigate to="/auth/signup?intent=general"   replace />} />
                <Route path="/join-as-creator"   element={<Navigate to="/auth/signup?intent=creator"  replace />} />
                <Route path="/join-as-learner"   element={<Navigate to="/auth/signup?intent=learner"  replace />} />
                <Route path="/join-as-volunteer" element={<Navigate to="/auth/signup?intent=volunteer" replace />} />

                {/* ADMIN — /admin top-level added */}
                <Route path="/admin"                 element={<CreatorMetricsDashboard />} />
                <Route path="/admin/metrics"         element={<CreatorMetricsDashboard />} />
                <Route path="/admin/creator-factory" element={<CreatorMetricsDashboard />} />
                <Route path="/admin/dashboard"       element={<CreatorMetricsDashboard />} />

                {/* PANEL — Your Story · Your Programmes · Your Position */}
                <Route path="/panel/story"      element={<PanelStoryPage />} />
                <Route path="/panel/programmes" element={<PanelProgrammesPage />} />
                <Route path="/panel/position"   element={<PanelPositionPage />} />
                <Route path="/panel/settings"   element={<Navigate to="/panel/story" replace />} />
                <Route path="/panel"            element={<Navigate to="/panel/story" replace />} />

                {/* PLATFORM IDENTITY */}
                <Route path="/manifesto"          element={<ManifestoPage />} />
                <Route path="/governance"         element={<GovernancePage />} />
                <Route path="/how-it-works"       element={<HowItWorksPage />} />
                <Route path="/editorial-standard" element={<EditorialStandardPage />} />
                <Route path="/the-manifesto" element={<Navigate to="/manifesto"    replace />} />
                <Route path="/55-25-20"      element={<Navigate to="/how-it-works" replace />} />
                <Route path="/pardner"       element={<Navigate to="/how-it-works" replace />} />
                <Route path="/revenue-model" element={<Navigate to="/how-it-works" replace />} />

                {/* PARTICIPATION */}
                <Route path="/houses"              element={<HousesPage />} />
                <Route path="/houses/connoisseurs" element={<Navigate to="/connoisseurs-club" replace />} />
                <Route path="/houses/passionistas" element={<Navigate to="/community"         replace />} />
                <Route path="/community/dashboard" element={<CommunityDashboard />} />
                <Route path="/storage"             element={<StoragePage />} />

                {/* WORKSHOPS */}
                <Route path="/workshops/spark-generator" element={<SparkGeneratorPage />} />
                <Route path="/sparks"              element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/spark-generator"     element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/tools/sparks"        element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/warmup"              element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/warm-up"             element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/icebreaker"          element={<Navigate to="/workshops/spark-generator" replace />} />
                <Route path="/workshops/facilitation" element={<FacilitationEngine />} />
                <Route path="/facilitation"        element={<Navigate to="/workshops/facilitation" replace />} />
                <Route path="/guides"              element={<Navigate to="/workshops/facilitation" replace />} />
                <Route path="/session-plans"       element={<Navigate to="/workshops/facilitation" replace />} />
                <Route path="/facilitation-guides" element={<Navigate to="/workshops/facilitation" replace />} />

                {/* KNOWLEDGE COMMONS */}
                <Route path="/heritage"          element={<KnowledgeCommonsShell />} />
                <Route path="/oral-history"      element={<OralHistoryPage />} />
                <Route path="/knowledge-commons" element={<Navigate to="/heritage"             replace />} />
                <Route path="/counter-archive"   element={<Navigate to="/heritage"             replace />} />
                <Route path="/pioneers"          element={<Navigate to="/heritage"             replace />} />
                <Route path="/archive"           element={<Navigate to="/heritage"             replace />} />
                <Route path="/black-history"     element={<Navigate to="/heritage?mode=era"    replace />} />
                <Route path="/routes"            element={<Navigate to="/heritage?mode=place"  replace />} />
                <Route path="/threads"           element={<Navigate to="/heritage?mode=thread" replace />} />
                <Route path="/plaques"           element={<Navigate to="/heritage?mode=plaque" replace />} />
                <Route path="/missing-plaques"   element={<Navigate to="/heritage?mode=plaque" replace />} />

                {/* PASSIONISTAS */}
                <Route path="/tools"         element={<PassionistasTools />} />
                <Route path="/tools/:toolId" element={<PassionistasTools />} />
                <Route path="/sessions"      element={<SessionsPage />} />
                <Route path="/downloads"     element={<DownloadsPage />} />
                <Route path="/community"     element={<CommunityPage />} />
                <Route path="/passionistas"  element={<Navigate to="/community" replace />} />

                {/* JOIN */}
                <Route path="/join"   element={<JoinFlow />} />
                <Route path="/enroll" element={<EnrollPage />} />

                {/* SANDBOX INDEX */}
                <Route path="/sandbox"   element={<SandboxIndex />} />
                <Route path="/sandboxes" element={<SandboxIndex />} />
                <Route path="/try"       element={<SandboxIndex />} />

                {/* EASY STREET SANDBOX + FAN TV */}
                <Route path="/programmes/easy-street/sandbox" element={<EasyStreetSandbox />} />
                <Route path="/programmes/easy-street/fan-tv"  element={<EasyStreetPage />} />

                {/* PROGRAMME SANDBOXES */}
                <Route path="/programmes/kaywanas-court/sandbox"         element={<KaywanasCourtSandbox />} />
                <Route path="/programmes/pageturners/sandbox"            element={<PageturnersSandbox />} />
                <Route path="/programmes/stemgeneers/sandbox"            element={<STEMgeneersSandbox />} />
                <Route path="/programmes/stemgeneers/prototype-lab"      element={<STEMgeneersSandbox />} />
                <Route path="/programmes/techreneurs/sandbox"            element={<TECHreneursSandbox />} />
                <Route path="/programmes/gtechcasters/sandbox"           element={<GTechCastersSandbox />} />
                <Route path="/programmes/trubble-n-bass/sandbox"         element={<TrubbleNBassSandbox />} />
                <Route path="/programmes/silk-stilettos/sandbox"         element={<SilkStilettosSandbox />} />
                <Route path="/programmes/bright-sparks/sandbox"          element={<BrightSparksSandbox />} />
                <Route path="/programmes/auntie-anansis-kitchen/sandbox" element={<AuntieAnansisKitchenSandbox />} />
                <Route path="/programmes/scrap-cat/sandbox"              element={<ScrapCatSandbox />} />
                <Route path="/programmes/roots/sandbox"                  element={<RootsSandbox />} />

                {/* PATHWAYS SANDBOX MIRRORS */}
                <Route path="/pathways/kaywanas-court/sandbox"          element={<KaywanasCourtSandbox />} />
                <Route path="/pathways/pageturners/sandbox"             element={<PageturnersSandbox />} />
                <Route path="/pathways/stemgeneers/sandbox"             element={<STEMgeneersSandbox />} />
                <Route path="/pathways/stemgeneers/prototype-lab"       element={<STEMgeneersSandbox />} />
                <Route path="/pathways/techreneurs/sandbox"             element={<TECHreneursSandbox />} />
                <Route path="/pathways/gtech-casters/sandbox"          element={<GTechCastersSandbox />} />
                <Route path="/pathways/trubble-n-bass/sandbox"         element={<TrubbleNBassSandbox />} />
                <Route path="/pathways/silk-stilettos/sandbox"         element={<SilkStilettosSandbox />} />
                <Route path="/pathways/bright-sparks/sandbox"          element={<BrightSparksSandbox />} />
                <Route path="/pathways/auntie-anansis-kitchen/sandbox" element={<AuntieAnansisKitchenSandbox />} />
                <Route path="/pathways/aunties-kitchen/sandbox"        element={<AuntieAnansisKitchenSandbox />} />
                <Route path="/pathways/scrap-cat/sandbox"              element={<ScrapCatSandbox />} />
                <Route path="/pathways/roots/sandbox"                  element={<RootsSandbox />} />
                <Route path="/pathways/easy-street/sandbox"            element={<EasyStreetSandbox />} />

                {/* PATHWAYS */}
                <Route path="/pathways"                    element={<PathwaysIndex />} />
                <Route path="/pathways/stemgeneers"        element={<STEMgeneersPage />} />
                <Route path="/pathways/techreneurs"        element={<TECHreneursPage />} />
                <Route path="/pathways/kaywanas-court"     element={<KaywanasCourtPage />} />
                <Route path="/pathways/gtech-casters"      element={<GTechCastersPage />} />
                <Route path="/pathways/gtechcasters"       element={<GTechCastersPage />} />
                <Route path="/pathways/trubble-n-bass"     element={<TrubbleNBassPage />} />
                <Route path="/pathways/silk-stilettos"     element={<SilkStilettoPage />} />
                <Route path="/pathways/aunties-kitchen"    element={<AuntieAnansisKitchenPage />} />
                <Route path="/pathways/auntie-anansis-kitchen" element={<AuntieAnansisKitchenPage />} />
                <Route path="/pathways/pageturners"        element={<PageturnersPage />} />
                <Route path="/pathways/bright-sparks"      element={<BrightSparksPage />} />
                <Route path="/pathways/scrap-cat"          element={<ScrapCatPage />} />
                <Route path="/pathways/raydyo"             element={<RaydyoPage />} />
                <Route path="/pathways/joystick"           element={<JoystickPage />} />
                <Route path="/pathways/money-reset"        element={<MoneyResetPage />} />
                <Route path="/pathways/easy-street"        element={<EasyStreetPage />} />
                <Route path="/pathways/roots"              element={<RootsPage />} />

                {/* REVENUE */}
                <Route path="/corporate-training"     element={<CorporateTrainingPage />} />
                <Route path="/partnerships"           element={<PartnershipsPage />} />
                <Route path="/strategic-partnerships" element={<StrategicPartnershipsPage />} />
                <Route path="/franchise"              element={<FranchisePage />} />
                <Route path="/platform-licensing"     element={<PlatformLicencingPage />} />
                <Route path="/platform-license"       element={<PlatformLicencingPage />} />
                <Route path="/hire-graduates"         element={<HireGraduatesPage />} />
                <Route path="/hire-talent"            element={<HireTalentPage />} />
                <Route path="/sponsorship"            element={<SponsorshipPage />} />
                <Route path="/advertise"              element={<SponsorshipPage />} />
                <Route path="/method"                 element={<MethodPage />} />
                <Route path="/what-you-learn"         element={<WhatYouLearnPage />} />
                <Route path="/journey"                element={<JourneyPage />} />
                <Route path="/faq"                    element={<FAQPage />} />
                <Route path="/impact"                 element={<ImpactPage />} />
                <Route path="/apply"                  element={<EnrollPage />} />
                <Route path="/business-training"      element={<CorporateTrainingPage />} />
                <Route path="/b2b"                    element={<CorporateTrainingPage />} />
                <Route path="/partners"               element={<PartnershipsPage />} />
                <Route path="/employers"              element={<HireGraduatesPage />} />
                <Route path="/recruitment"            element={<HireGraduatesPage />} />

                {/* CORE */}
                <Route path="/"                  element={<HomePage />} />
                <Route path="/connoisseurs-club" element={<ConnoisseurClubPage />} />
                <Route path="/your-journey"      element={<YourJourneyPage />} />
                <Route path="/about"             element={<AboutUsPage />} />
                <Route path="/team"              element={<TeamPage />} />
                <Route path="/contact"           element={<ContactPage />} />
                <Route path="/get-started"       element={<GetStartedPage />} />
                <Route path="/factory"           element={<CreatorFactoryPage />} />
                <Route path="/creator-factory"   element={<CreatorFactoryPage />} />
                <Route path="/the-factory"       element={<CreatorFactoryPage />} />
                <Route path="/creator-pathways"  element={<CreatorPathwaysPage />} />
                <Route path="/journey-map"       element={<CreatorPathwaysPage />} />
                <Route path="/calendar"          element={<ConnectedCalendarPage />} />
                <Route path="/productions"       element={<CalendarPage />} />
                <Route path="/shows"             element={<CalendarPage />} />
                <Route path="/programmes"        element={<ProgrammesPage />} />
                <Route path="/events"            element={<CommunityCalendarPage />} />
                <Route path="/community-events"  element={<CommunityCalendarPage />} />
                <Route path="/shop"              element={<CommunityShopPage />} />
                <Route path="/cyberstore"        element={<CommunityShopPage />} />
                <Route path="/workshops"         element={<WorkshopsPage />} />
                <Route path="/workshop-calendar" element={<WorkshopCalendarPage />} />

                {/* VOLUNTEERS */}
                <Route path="/volunteers"            element={<VolunteersPage />} />
                <Route path="/volunteer-application" element={<VolunteerApplicationPage />} />
                <Route path="/volunteer/apply"       element={<Navigate to="/volunteer-application" replace />} />
                <Route path="/become-a-volunteer"    element={<Navigate to="/volunteer-application" replace />} />

                {/* CREATOR'S JOURNAL */}
                <Route path="/workspace/creators-journal" element={<CreatorsJournalPage />} />
                <Route path="/creators-journal"           element={<CreatorsJournalPage />} />

                {/* PROGRAMMES */}
                <Route path="/programmes/all"                    element={<ProgrammesPage />} />
                <Route path="/programmes/kaywanas-court"         element={<KaywanasCourtPage />} />
                <Route path="/programmes/pageturners"            element={<PageturnersPage />} />
                <Route path="/programmes/auntie-anansis-kitchen" element={<AuntieAnansisKitchenPage />} />
                <Route path="/programmes/bright-sparks"          element={<BrightSparksPage />} />
                <Route path="/programmes/silk-stilettos"         element={<SilkStilettoPage />} />
                <Route path="/programmes/stemgeneers"            element={<STEMgeneersPage />} />
                <Route path="/programmes/techreneurs"            element={<TECHreneursPage />} />
                <Route path="/programmes/techtreneurs"           element={<TECHreneursPage />} />
                <Route path="/programmes/gtechcasters"           element={<GTechCastersPage />} />
                <Route path="/programmes/trubble-n-bass"         element={<TrubbleNBassPage />} />
                <Route path="/programmes/scrap-cat"              element={<ScrapCatPage />} />
                <Route path="/programmes/money-reset"            element={<MoneyResetPage />} />
                <Route path="/programmes/easy-street"            element={<EasyStreetPage />} />
                <Route path="/programmes/roots"                  element={<RootsPage />} />

                {/* EDITORIAL */}
                <Route path="/editorial/iwd-2026" element={<IWDEditorialPage />} />

                {/* MEDIA */}
                <Route path="/raydyo"   element={<RaydyoPage />} />
                <Route path="/joystick" element={<JoystickPage />} />

                {/* COMMUNITY INVESTMENT */}
                <Route path="/partner-with-us" element={<CommunityInvestmentPage />} />
                <Route path="/work-with-us"     element={<WorkWithUsPage />} />

                {/* MEMBERSHIP */}
                <Route path="/membership"            element={<MembershipPage />} />
                <Route path="/connector"             element={<ConnectorApplicationGatewayPage />} />
                <Route path="/application-success"   element={<ApplicationSuccessPage />} />
                <Route path="/application-dashboard" element={<ApplicationDashboard />} />
                <Route path="/assessment-guide"      element={<AssessmentGuidePage />} />
                <Route path="/practice-assessment"   element={<PracticeAssessmentPage />} />
                <Route path="/schedule-assessment"   element={<ScheduleAssessmentPage />} />
                <Route path="/curator"               element={<CuratorPage />} />
                <Route path="/champion"              element={<ChampionPage />} />
                <Route path="/community-overview"    element={<CommunityOverviewPage />} />
                <Route path="/success-stories"       element={<SuccessStoriesPage />} />
                <Route path="/membership/benefits"   element={<Navigate to="/membership" replace />} />
                <Route path="/members-benefits"      element={<Navigate to="/membership" replace />} />

                {/* WHO WE ARE */}
                <Route path="/who-we-are/how-we-share-power" element={<HowWeSharePower />} />
                <Route path="/who-we-are/directors-pathway"  element={<DirectorsPathway />} />

                {/* NAV CONFIG REDIRECTS */}
                {Object.entries(REDIRECT_MAP).map(([from, to]) => (
                  <Route key={from} path={from} element={<Navigate to={to as string} replace />} />
                ))}

                {/* ADDITIONAL REDIRECTS */}
                <Route path="/community-investment" element={<Navigate to="/partnerships" replace />} />
                <Route path="/projects"             element={<Navigate to="/community"    replace />} />
                <Route path="/programs"             element={<Navigate to="/pathways"     replace />} />
                <Route path="/store"                element={<Navigate to="/shop"         replace />} />

                {/* Easy Street */}
                <Route path="/easy-street"                   element={<Navigate to="/programmes/easy-street"         replace />} />
                <Route path="/workshops/easy-street"         element={<Navigate to="/programmes/easy-street"         replace />} />
                <Route path="/workshops/easy-street/content" element={<Navigate to="/programmes/easy-street"         replace />} />
                <Route path="/casting-table"                 element={<Navigate to="/programmes/easy-street/sandbox" replace />} />
                <Route path="/set-the-scene"                 element={<Navigate to="/programmes/easy-street/sandbox" replace />} />
                <Route path="/radio-drama"                   element={<Navigate to="/programmes/easy-street"         replace />} />

                {/* Roots */}
                <Route path="/roots"            element={<Navigate to="/programmes/roots" replace />} />
                <Route path="/body-sovereignty" element={<Navigate to="/programmes/roots" replace />} />
                <Route path="/hair-care"        element={<Navigate to="/programmes/roots" replace />} />
                <Route path="/apothecary"       element={<Navigate to="/programmes/roots" replace />} />

                {/* Topic → Pathways */}
                <Route path="/stem"             element={<Navigate to="/pathways/stemgeneers"    replace />} />
                <Route path="/entrepreneurship" element={<Navigate to="/pathways/techreneurs"    replace />} />
                <Route path="/coding"           element={<Navigate to="/pathways/stemgeneers"    replace />} />
                <Route path="/robotics"         element={<Navigate to="/pathways/stemgeneers"    replace />} />
                <Route path="/startup"          element={<Navigate to="/pathways/techreneurs"    replace />} />
                <Route path="/media"            element={<Navigate to="/pathways/gtech-casters"  replace />} />
                <Route path="/podcast"          element={<Navigate to="/raydyo"                  replace />} />
                <Route path="/podcasting"       element={<Navigate to="/pathways/gtech-casters"  replace />} />
                <Route path="/music"            element={<Navigate to="/pathways/trubble-n-bass" replace />} />
                <Route path="/beats"            element={<Navigate to="/pathways/trubble-n-bass" replace />} />
                <Route path="/production"       element={<Navigate to="/pathways/trubble-n-bass" replace />} />
                <Route path="/fashion"          element={<Navigate to="/pathways/silk-stilettos" replace />} />
                <Route path="/design"           element={<Navigate to="/pathways/silk-stilettos" replace />} />
                <Route path="/cooking"          element={<Navigate to="/pathways/aunties-kitchen" replace />} />
                <Route path="/recipes"          element={<Navigate to="/pathways/aunties-kitchen" replace />} />
                <Route path="/kitchen"          element={<Navigate to="/pathways/aunties-kitchen" replace />} />
                <Route path="/drama"            element={<Navigate to="/pathways/kaywanas-court"  replace />} />
                <Route path="/theatre"          element={<Navigate to="/pathways/kaywanas-court"  replace />} />
                <Route path="/writing"          element={<Navigate to="/pathways/pageturners"     replace />} />
                <Route path="/reading"          element={<Navigate to="/pathways/pageturners"     replace />} />
                <Route path="/repair"           element={<Navigate to="/pathways/scrap-cat"       replace />} />
                <Route path="/recycling"        element={<Navigate to="/pathways/scrap-cat"       replace />} />
                <Route path="/money"            element={<Navigate to="/pathways/money-reset"     replace />} />

                {/* Media SEO */}
                <Route path="/radio"    element={<Navigate to="/raydyo"   replace />} />
                <Route path="/magazine" element={<Navigate to="/joystick" replace />} />
                <Route path="/ezine"    element={<Navigate to="/joystick" replace />} />
                <Route path="/gaming"   element={<Navigate to="/joystick" replace />} />
                <Route path="/games"    element={<Navigate to="/joystick" replace />} />

                {/* Misc */}
                <Route path="/tilted-crowns" element={<Navigate to="/shop"             replace />} />
                <Route path="/crowns"        element={<Navigate to="/shop"             replace />} />
                <Route path="/journal"       element={<Navigate to="/creators-journal" replace />} />
                <Route path="/portfolio"     element={<Navigate to="/creators-journal" replace />} />
                <Route path="/dashboard"     element={<Navigate to="/creators-journal" replace />} />
                <Route path="/training"      element={<Navigate to="/corporate-training" replace />} />
                <Route path="/courses"       element={<Navigate to="/workshops"          replace />} />
                <Route path="/classes"       element={<Navigate to="/workshops"          replace />} />
                <Route path="/learn"         element={<Navigate to="/pathways"           replace />} />
                <Route path="/help"          element={<Navigate to="/contact"            replace />} />
                <Route path="/support"       element={<Navigate to="/contact"            replace />} />
                <Route path="/volunteer"     element={<Navigate to="/volunteers"         replace />} />

                <Route path="/redirect" element={<SmartParameterRedirect />} />
                <Route path="*"         element={<SmartNotFound />} />

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