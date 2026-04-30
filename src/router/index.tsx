// src/router/index.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

// ============================================
// AUTH PAGES
// ============================================
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';

// ============================================
// MAIN PAGES
// ============================================
import HomePage from '../pages/HomePage';
import ConnoisseurClubPage from '../pages/ConnoisseurClubPage';
import AboutUsPage from '../pages/AboutUsPage';
import ImpactPage from '../pages/ImpactPage';
import JourneyPage from '../pages/JourneyPage';
import MethodPage from '../pages/MethodPage';
import FAQPage from '../pages/FAQPage';
import ContactPage from '../pages/ContactPage';

// ============================================
// MEMBERSHIP & JOIN
// ============================================
import MembershipPage from '../pages/MembershipPage';
import JoinPage from '../pages/JoinPage';
import JoinSuccessPage from '../pages/JoinSuccessPage';
import EnrollPage from '../pages/EnrollPage';
import GetStartedPage from '../pages/GetStartedPage';
import StartPage from '../pages/StartPage';

// ============================================
// MEMBERSHIP TIERS
// ============================================
import ConnectorPage from '../pages/ConnectorPage';
import CuratorPage from '../pages/CuratorPage';
import ChampionPage from '../pages/ChampionPage';

// ============================================
// PROGRAMMES - MAIN
// ============================================
import ProgrammesPage from '../pages/ProgrammesPage';

// Bright Sparks
import BrightSparksPage from '../pages/programmes/bright-sparks';
import BrightSparksSandbox from '../pages/programmes/bright-sparks/sandbox';

// Other Programmes
import STEMgeneersPage from '../pages/programmes/stemgeneers';
import TECHreneursPage from '../pages/programmes/techreneurs';
import PageturnersPage from '../pages/programmes/pageturners';
import KaywanasCourtPage from '../pages/programmes/kaywanas-court';
import SilkStilettosPage from '../pages/programmes/silk-stilettos';
import GTechCastersPage from '../pages/programmes/gtechcasters';
import AuntieAnansisKitchenPage from '../pages/programmes/auntie-anansis-kitchen';
import TrubbleNBassPage from '../pages/trubble-n-bass';
import MoneyResetPage from '../pages/programmes/money-reset';
import ScrapCatPage from '../pages/programmes/scrap-cat';
import RootsPage from '../pages/programmes/roots/RootsPage';
import RootsSandbox from '../pages/programmes/roots/sandbox';

// ============================================
// PROGRAMME SANDBOXES
// ============================================
import STEMgeneersSandbox from '../pages/programmes/stemgeneers/sandbox';
import TECHreneursSandbox from '../pages/programmes/techreneurs/TECHreneursSandbox';
import PageturnersSandbox from '../pages/programmes/pageturners/PageturnersSandbox';
import KaywanasCourtSandbox from '../pages/programmes/kaywanas-court/sandbox';
import SilkStilettosSandbox from '../pages/programmes/silk-stilettos/sandbox';
import GTechCastersSandbox from '../pages/programmes/gtechcasters/GTechCastersSandbox';
import AuntieAnansisKitchenSandbox from '../pages/programmes/auntie-anansis-kitchen/sandbox';
import TrubbleNBassSandbox from '../pages/programmes/trubble-n-bass/TrubbleNBassSandbox';

// ============================================
// MEDIA PAGES
// ============================================
import RaydyoPage from '../pages/RaydyoPage';
import JoystickPage from '../pages/JoystickPage';
import JoystickArticlePage from '../pages/JoystickArticlePage';

// ════════════════════════════════════════════════════════════════
// ✨ KNOWLEDGE COMMONS — Counter-Archive · Heritage Layer
// Publicly accessible · login to contribute
// Entry: /heritage → KnowledgeCommonsShell (mode driven by ?mode=)
// Oral History: /oral-history → living archive layer
// ════════════════════════════════════════════════════════════════
import KnowledgeCommonsShell from '../components/knowledge-commons/KnowledgeCommonsShell';
import OralHistoryPage from '../pages/OralHistoryPage';

// ============================================
// COMMUNITY PAGES
// ============================================
import CommunityPage from '../pages/CommunityPage';
import CommunityShopPage from '../pages/CommunityShopPage';
import CommunityCalendarPage from '../pages/CommunityCalendarPage';
import CommunityVoicePage from '../pages/CommunityVoicePage';
import CommunityOverviewPage from '../pages/CommunityOverviewPage';

// ============================================
// PATHWAYS & LEARNING
// ============================================
import PathwaysIndex from '../pages/pathways/PathwaysIndex';
import CreatorPathwaysPage from '../pages/CreatorPathwaysPage';
import CreatorFactoryPage from '../pages/CreatorFactoryPage';
import AssessmentGuidePage from '../pages/AssessmentGuidePage';
import PracticeAssessmentPage from '../pages/PracticeAssessmentPage';
import ScheduleAssessmentPage from '../pages/ScheduleAssessmentPage';
import WhatYouLearnPage from '../pages/WhatYouLearnPage';

// ============================================
// CREATOR PAGES
// ============================================
import CreatorsStudioPage from '../pages/CreatorsStudioPage';
import CreatorsJournalPage from '../pages/creators-journal/CreatorsJournalPage';
import SandboxPage from '../pages/SandboxPage';
import SandboxIndex from '../pages/SandboxIndex';

// ============================================
// WORKSHOPS & EVENTS
// ============================================
import WorkshopsPage from '../pages/WorkshopsPage';
import WorkshopCalendarPage from '../pages/WorkshopCalendarPage';
import CalendarPage from '../pages/CalendarPage';
import SessionsPage from '../pages/SessionsPage';

// ════════════════════════════════════════════════════════════════
// ✨ SPARK GENERATOR & FACILITATION ENGINE
// ════════════════════════════════════════════════════════════════
import { SparkGeneratorPage } from '../workshops/spark-generator';
import { FacilitationEngine } from '../workshops/facilitation';

// ============================================
// VOLUNTEER & APPLY
// ============================================
import VolunteersPage from '../pages/VolunteersPage';
import VolunteerApplicationPage from '../pages/VolunteerApplicationPage';
import ApplyPage from '../pages/ApplyPage';
import ApplicationDashboard from '../pages/ApplicationDashboard';
import ApplicationSuccessPage from '../pages/ApplicationSuccessPage';

// ============================================
// PARTNERSHIPS & BUSINESS
// ============================================
import PartnershipsPage from '../pages/PartnershipsPage';
import StrategicPartnershipsPage from '../pages/StrategicPartnershipsPage';
import SponsorshipPage from '../pages/SponsorshipPage';
import FranchisePage from '../pages/FranchisePage';
import CorporateTrainingPage from '../pages/CorporateTrainingPage';
import HireGraduatesPage from '../pages/HireGraduatesPage';
import HireTalentPage from '../pages/HireTalentPage';
import PlatformLicensePage from '../pages/PlatformLicensePage';
import WorkWithUsPage from '../pages/WorkWithUsPage';

// ============================================
// TEAM & GOVERNANCE
// ============================================
import TeamPage from '../pages/team/TeamPage';
import DirectorsPathway from '../pages/who-we-are/DirectorsPathway';
import HowWeSharePower from '../pages/who-we-are/HowWeSharePower';

// ============================================
// LEGAL & POLICY
// ============================================
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import SafeguardingPolicyPage from '../pages/SafeguardingPolicyPage';
import RuleBookPage from '../pages/RuleBookPage';
import AccessibilityPage from '../pages/AccessibilityPage';
import CookiePolicyPage from '../pages/CookiePolicyPage';
import ComplaintsPage from '../pages/ComplaintsPage';

// ============================================
// DASHBOARD & MEMBER AREAS
// ============================================
import Dashboard from '../pages/dashboard/Dashboard';
import MemberDashboard from '../pages/member/dashboard/MemberDashboard';
import SimulatorsPage from '../pages/SimulatorsPage';
import MeetMayaPage from '../pages/MeetMayaPage';

// ============================================
// MISC PAGES
// ============================================
import SuccessStoriesPage from '../pages/SuccessStoriesPage';
import DownloadsPage from '../pages/DownloadsPage';
import CommunityInvestmentPage from '../pages/CommunityInvestment/CommunityInvestmentPage';

// ============================================
// REDIRECT HELPERS
// ============================================

// /pathways/:id → /programmes/:id with name mapping
const PathwayRedirect = () => {
  const { id } = useParams();
  const programmeMap: Record<string, string> = {
    'aunties-kitchen': 'auntie-anansis-kitchen',
    'gtech-casters': 'gtechcasters',
  };
  const target = programmeMap[id || ''] || id;
  return <Navigate to={`/programmes/${target}`} replace />;
};

// ============================================
// 404 PAGE
// ============================================
const NotFoundPage: React.FC = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f172a',
    color: '#f8fafc',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <h1 style={{ fontSize: '4rem', color: '#fbbf24', margin: '0 0 1rem 0' }}>404</h1>
    <h2 style={{ margin: '0 0 1rem 0' }}>Page Not Found</h2>
    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
      The page you're looking for doesn't exist.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Did you mean:</p>
      <a href="/programmes" style={{ color: '#10b981' }}>/programmes</a>
      <a href="/heritage" style={{ color: '#10b981' }}>/heritage</a>
      <a href="/oral-history" style={{ color: '#10b981' }}>/oral-history</a>
      <a href="/workshops/spark-generator" style={{ color: '#10b981' }}>/workshops/spark-generator</a>
      <a href="/workshops/facilitation" style={{ color: '#10b981' }}>/workshops/facilitation</a>
      <a href="/sessions" style={{ color: '#10b981' }}>/sessions</a>
    </div>
    <a
      href="/"
      style={{
        marginTop: '2rem',
        padding: '0.75rem 1.5rem',
        background: '#10b981',
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600'
      }}
    >
      Go Home
    </a>
  </div>
);

// ============================================
// MAIN ROUTER COMPONENT
// ============================================
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================
            HOME
            ============================================ */}
        <Route path="/" element={<HomePage />} />

        {/* ============================================
            CONNOISSEURS CLUB - CULTURAL FRAMEWORK
            ============================================ */}
        <Route path="/connoisseurs-club" element={<ConnoisseurClubPage />} />

        {/* ============================================
            AUTH ROUTES
            ============================================ */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
        <Route path="/reset-password" element={<Navigate to="/auth/login" replace />} />

        {/* ============================================
            ABOUT & INFO
            ============================================ */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/about-us" element={<Navigate to="/about" replace />} />
        <Route path="/our-story" element={<Navigate to="/about" replace />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/your-journey" element={<Navigate to="/journey" replace />} />
        <Route path="/method" element={<MethodPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<Navigate to="/contact" replace />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />

        {/* ============================================
            MEMBERSHIP & JOIN
            ============================================ */}
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/success" element={<JoinSuccessPage />} />
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/start" element={<StartPage />} />

        {/* Membership Tiers */}
        <Route path="/connector" element={<ConnectorPage />} />
        <Route path="/curator" element={<CuratorPage />} />
        <Route path="/champion" element={<ChampionPage />} />

        {/* ============================================
            PROGRAMMES - MAIN INDEX
            ============================================ */}
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/programs" element={<Navigate to="/programmes" replace />} />

        {/* ============================================
            BRIGHT SPARKS (Discovery Programme)
            ============================================ */}
        <Route path="/programmes/bright-sparks" element={<BrightSparksPage />} />
        <Route path="/programmes/bright-sparks/sandbox" element={<BrightSparksSandbox />} />

        {/* ============================================
            STEMGENEERS
            ============================================ */}
        <Route path="/programmes/stemgeneers" element={<STEMgeneersPage />} />
        <Route path="/programmes/stemgeneers/sandbox" element={<STEMgeneersSandbox />} />
        <Route path="/programmes/stemgineers" element={<Navigate to="/programmes/stemgeneers" replace />} />
        <Route path="/programmes/stemgineers/*" element={<Navigate to="/programmes/stemgeneers" replace />} />

        {/* ============================================
            TECHRENEURS
            ============================================ */}
        <Route path="/programmes/techreneurs" element={<TECHreneursPage />} />
        <Route path="/programmes/techreneurs/sandbox" element={<TECHreneursSandbox />} />

        {/* ============================================
            PAGETURNERS
            ============================================ */}
        <Route path="/programmes/pageturners" element={<PageturnersPage />} />
        <Route path="/programmes/pageturners/sandbox" element={<PageturnersSandbox />} />

        {/* ============================================
            KAYWANA'S COURT
            ============================================ */}
        <Route path="/programmes/kaywanas-court" element={<KaywanasCourtPage />} />
        <Route path="/programmes/kaywanas-court/sandbox" element={<KaywanasCourtSandbox />} />
        {/* Planned sub-pages — redirect to parent until built */}
        <Route path="/programmes/kaywanas-court/booking" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/calendar" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/equipment" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/feedback" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/library" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/mentors" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/venues" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/programmes/kaywanas-court/workshops" element={<Navigate to="/programmes/kaywanas-court" replace />} />

        {/* ============================================
            SILK STILETTOS
            ============================================ */}
        <Route path="/programmes/silk-stilettos" element={<SilkStilettosPage />} />
        <Route path="/programmes/silk-stilettos/sandbox" element={<SilkStilettosSandbox />} />

        {/* ============================================
            G-TECH CASTERS
            ============================================ */}
        <Route path="/programmes/gtechcasters" element={<GTechCastersPage />} />
        <Route path="/programmes/gtechcasters/sandbox" element={<GTechCastersSandbox />} />
        <Route path="/programmes/g-tech-casters" element={<Navigate to="/programmes/gtechcasters" replace />} />
        <Route path="/programmes/g-tech-casters/sandbox" element={<Navigate to="/programmes/gtechcasters/sandbox" replace />} />

        {/* ============================================
            AUNTIE ANANSI'S KITCHEN
            ============================================ */}
        <Route path="/programmes/auntie-anansis-kitchen" element={<AuntieAnansisKitchenPage />} />
        <Route path="/programmes/auntie-anansis-kitchen/sandbox" element={<AuntieAnansisKitchenSandbox />} />

        {/* ============================================
            TRUBBLE N BASS
            ============================================ */}
        <Route path="/programmes/trubble-n-bass" element={<TrubbleNBassPage />} />
        <Route path="/programmes/trubble-n-bass/sandbox" element={<TrubbleNBassSandbox />} />

        {/* ============================================
            OTHER PROGRAMMES
            ============================================ */}
        <Route path="/programmes/money-reset" element={<MoneyResetPage />} />
        <Route path="/programmes/scrap-cat" element={<ScrapCatPage />} />

        {/* ============================================
            ROOTS — Body Sovereignty Resource
            Women-led · Women-directed · Women-managed
            Leads: Judith Fontanelle · Flora Agba · Natalie
            ROV: Aya | Status: active from IWD 8 Mar 2026
            ============================================ */}
        <Route path="/programmes/roots" element={<RootsPage />} />
        <Route path="/programmes/roots/sandbox" element={<RootsSandbox />} />
        {/* Convenience aliases */}
        <Route path="/roots" element={<Navigate to="/programmes/roots" replace />} />
        <Route path="/body-sovereignty" element={<Navigate to="/programmes/roots" replace />} />
        <Route path="/hair-care" element={<Navigate to="/programmes/roots" replace />} />
        <Route path="/apothecary" element={<Navigate to="/programmes/roots" replace />} />

        {/* ════════════════════════════════════════════════════════════════
            ✨ KNOWLEDGE COMMONS — Counter-Archive · Heritage Layer
            Public read · Login to contribute
            Canonical URL: /heritage
            Mode is URL-param driven (?mode=thread|place|era|question|plaque)
            so every view is shareable without additional routes.
            Living archive layer: /oral-history
            ════════════════════════════════════════════════════════════════ */}
        <Route path="/heritage" element={<KnowledgeCommonsShell />} />
        <Route path="/oral-history" element={<OralHistoryPage />} />

        {/* Convenience aliases — all redirect to canonical */}
        <Route path="/knowledge-commons" element={<Navigate to="/heritage" replace />} />
        <Route path="/counter-archive" element={<Navigate to="/heritage" replace />} />
        <Route path="/pioneers" element={<Navigate to="/heritage" replace />} />
        <Route path="/archive" element={<Navigate to="/heritage" replace />} />
        <Route path="/black-history" element={<Navigate to="/heritage?mode=era" replace />} />
        <Route path="/routes" element={<Navigate to="/heritage?mode=place" replace />} />
        <Route path="/threads" element={<Navigate to="/heritage?mode=thread" replace />} />
        <Route path="/plaques" element={<Navigate to="/heritage?mode=plaque" replace />} />
        <Route path="/missing-plaques" element={<Navigate to="/heritage?mode=plaque" replace />} />

        {/* ============================================
            PATHWAYS
            ============================================ */}
        <Route path="/pathways" element={<PathwaysIndex />} />
        <Route path="/pathways/:id" element={<PathwayRedirect />} />
        <Route path="/creator-pathways" element={<CreatorPathwaysPage />} />
        <Route path="/creator-factory" element={<CreatorFactoryPage />} />

        {/* ============================================
            ASSESSMENT
            ============================================ */}
        <Route path="/assessment-guide" element={<AssessmentGuidePage />} />
        <Route path="/practice-assessment" element={<PracticeAssessmentPage />} />
        <Route path="/schedule-assessment" element={<ScheduleAssessmentPage />} />
        <Route path="/what-you-learn" element={<WhatYouLearnPage />} />

        {/* ============================================
            MEDIA - RAYDYO & JOYSTICK
            ============================================ */}
        <Route path="/raydyo" element={<RaydyoPage />} />
        <Route path="/joystick" element={<JoystickPage />} />
        <Route path="/joystick/:slug" element={<JoystickArticlePage />} />

        {/* ============================================
            COMMUNITY
            ============================================ */}
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/overview" element={<CommunityOverviewPage />} />
        <Route path="/community/shop" element={<CommunityShopPage />} />
        <Route path="/community/calendar" element={<CommunityCalendarPage />} />
        <Route path="/community/voice" element={<CommunityVoicePage />} />
        <Route path="/community/investment" element={<CommunityInvestmentPage />} />

        {/* ============================================
            CREATOR TOOLS
            ============================================ */}
        <Route path="/creators-studio" element={<CreatorsStudioPage />} />
        <Route path="/creators-journal" element={<CreatorsJournalPage />} />
        <Route path="/sandbox" element={<SandboxIndex />} />
        <Route path="/sandbox/:programmeId" element={<SandboxPage />} />

        {/* ============================================
            WORKSHOPS, SESSIONS & FACILITATION
            ============================================ */}
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/workshop-calendar" element={<WorkshopCalendarPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/sessions" element={<SessionsPage />} />

        {/* ✨ Spark Generator — Facilitator Zoom warm-up tool */}
        <Route path="/workshops/spark-generator" element={<SparkGeneratorPage />} />
        <Route path="/sparks" element={<Navigate to="/workshops/spark-generator" replace />} />
        <Route path="/spark-generator" element={<Navigate to="/workshops/spark-generator" replace />} />
        <Route path="/tools/sparks" element={<Navigate to="/workshops/spark-generator" replace />} />
        <Route path="/warmup" element={<Navigate to="/workshops/spark-generator" replace />} />
        <Route path="/warm-up" element={<Navigate to="/workshops/spark-generator" replace />} />
        <Route path="/icebreaker" element={<Navigate to="/workshops/spark-generator" replace />} />

        {/* ✨ Facilitation Engine — Week-by-week session guides */}
        <Route path="/workshops/facilitation" element={<FacilitationEngine />} />
        <Route path="/facilitation" element={<Navigate to="/workshops/facilitation" replace />} />
        <Route path="/guides" element={<Navigate to="/workshops/facilitation" replace />} />
        <Route path="/session-plans" element={<Navigate to="/workshops/facilitation" replace />} />
        <Route path="/facilitation-guides" element={<Navigate to="/workshops/facilitation" replace />} />

        {/* ============================================
            VOLUNTEER & APPLY
            ============================================ */}
        <Route path="/volunteers" element={<VolunteersPage />} />
        <Route path="/volunteer" element={<Navigate to="/volunteers" replace />} />
        <Route path="/get-involved" element={<Navigate to="/volunteers" replace />} />
        <Route path="/volunteer-application" element={<VolunteerApplicationPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/application-dashboard" element={<ApplicationDashboard />} />
        <Route path="/application-success" element={<ApplicationSuccessPage />} />

        {/* ============================================
            PARTNERSHIPS & BUSINESS
            ============================================ */}
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="/partner" element={<Navigate to="/partnerships" replace />} />
        <Route path="/partner-with-us" element={<Navigate to="/partnerships" replace />} />
        <Route path="/strategic-partnerships" element={<StrategicPartnershipsPage />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/corporate-training" element={<CorporateTrainingPage />} />
        <Route path="/hire-graduates" element={<HireGraduatesPage />} />
        <Route path="/hire-talent" element={<HireTalentPage />} />
        <Route path="/platform-license" element={<PlatformLicensePage />} />
        <Route path="/work-with-us" element={<WorkWithUsPage />} />

        {/* ============================================
            GOVERNANCE
            ============================================ */}
        <Route path="/directors-pathway" element={<DirectorsPathway />} />
        <Route path="/how-we-share-power" element={<HowWeSharePower />} />

        {/* ============================================
            LEGAL
            ============================================ */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
        <Route path="/safeguarding" element={<SafeguardingPolicyPage />} />
        <Route path="/policies/safeguarding" element={<Navigate to="/safeguarding" replace />} />
        <Route path="/rulebook" element={<RuleBookPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />

        {/* ============================================
            DASHBOARDS (Protected - add auth wrapper later)
            ============================================ */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
        <Route path="/simulators" element={<SimulatorsPage />} />

        {/* ============================================
            MAYA
            ============================================ */}
        <Route path="/maya" element={<MeetMayaPage />} />
        <Route path="/meet-maya" element={<Navigate to="/maya" replace />} />

        {/* ============================================
            MISC & REDIRECTS
            ============================================ */}
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/events" element={<Navigate to="/sessions" replace />} />
        <Route path="/shop" element={<Navigate to="/community/shop" replace />} />
        <Route path="/cyberstore" element={<Navigate to="/community/shop" replace />} />
        <Route path="/factory" element={<Navigate to="/creator-factory" replace />} />
        <Route path="/journal" element={<Navigate to="/creators-journal" replace />} />
        <Route path="/tools" element={<Navigate to="/workshops/spark-generator" replace />} />
        <Route path="/gallery" element={<Navigate to="/programmes" replace />} />
        <Route path="/community-overview" element={<Navigate to="/community/overview" replace />} />
        <Route path="/community/joystick" element={<Navigate to="/joystick" replace />} />
        <Route path="/community/rayd-yo" element={<Navigate to="/raydyo" replace />} />

        {/* Programme short-name redirects */}
        <Route path="/kaywanas-court" element={<Navigate to="/programmes/kaywanas-court" replace />} />
        <Route path="/silk-stilettos" element={<Navigate to="/programmes/silk-stilettos" replace />} />
        <Route path="/techreneurs" element={<Navigate to="/programmes/techreneurs" replace />} />
        <Route path="/passionistas" element={<Navigate to="/programmes/silk-stilettos" replace />} />
        <Route path="/casters" element={<Navigate to="/programmes/gtechcasters" replace />} />

        {/* ============================================
            404 CATCH-ALL
            ============================================ */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
