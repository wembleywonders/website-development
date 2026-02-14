import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MembershipPage from '../pages/MembershipPage';
import ConnectorApplicationForm from '../pages/ConnectorApplicationForm';
import ConnectorApplicationGatewayPage from '../pages/ConnectorApplicationGatewayPage';
import ApplicationSuccessPage from '../pages/ApplicationSuccessPage';
import AssessmentGuidePage from '../pages/AssessmentGuidePage';
import ApplicationDashboard from '../pages/ApplicationDashboard';
import GetStartedPage from '../pages/GetStartedPage';

// Additional pages
import CuratorPage from '../pages/CuratorPage';
import ChampionPage from '../pages/ChampionPage';
import CommunityOverviewPage from '../pages/CommunityOverviewPage';
import ConnectorHandbookPage from '../pages/ConnectorHandbookPage';
import SampleScenariosPage from '../pages/SampleScenariosPage';
import SuccessStoriesPage from '../pages/SuccessStoriesPage';
import PracticeAssessmentPage from '../pages/PracticeAssessmentPage';
import ScheduleAssessmentPage from '../pages/ScheduleAssessmentPage';

const MembershipRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main membership landing page */}
      <Route path="/membership" element={<MembershipPage />} />
      
      {/* Application flow */}
      <Route path="/apply" element={<ConnectorApplicationGatewayPage />} />
      <Route path="/apply" element={<ConnectorApplicationForm />} />
      <Route path="/application-success" element={<ApplicationSuccessPage />} />
      <Route path="/application-dashboard" element={<ApplicationDashboard />} />
      <Route path="/get-started" element={<GetStartedPage />} />
      
      {/* Assessment flow */}
      <Route path="/assessment-guide" element={<AssessmentGuidePage />} />
      <Route path="/practice-assessment" element={<PracticeAssessmentPage />} />
      <Route path="/schedule-assessment" element={<ScheduleAssessmentPage />} />
      
      {/* Tier information pages */}
      <Route path="/curator" element={<CuratorPage />} />
      <Route path="/champion" element={<ChampionPage />} />
      
      {/* Resource pages */}
      <Route path="/community-overview" element={<CommunityOverviewPage />} />
      <Route path="/membership" element={<ConnectorHandbookPage />} />
      <Route path="/practice-assessment" element={<SampleScenariosPage />} />
      <Route path="/success-stories" element={<SuccessStoriesPage />} />
      
      {/* Fallback redirect to main membership page */}
      <Route path="*" element={<MembershipPage />} />
    </Routes>
  );
};

export default MembershipRoutes;