// src/pages/member/simulators/index.tsx
import React, { useState, useEffect } from 'react';
import SimulatorCard from '../../../components/simulators/SimulatorCard';
import ROVAssistant from '../../../components/simulators/ROVAssistant';
import PracticeHistory from '../../../components/simulators/PracticeHistory';
import PreLaunchModal from './PreLaunchModal';
import HelperSupportROV from '../../../systems/rovs/personalities/helper/HelperSupportROV';
import './PortalSimulatorLauncher.css';

interface Simulator {
 id: string;
 title: string;
 subtitle: string;
 description: string;
 icon: string;
 features: string[];
 stats: {
   sessions: number;
   rating: number;
   successRate: number;
 };
 status?: 'most-popular' | 'updated' | 'new';
}

interface PracticeSession {
 id: string;
 portalName: string;
 lastPracticed: string;
 progress: number;
 status: 'completed' | 'in-progress' | 'not-started';
 statusLabel: string;
}

const PortalSimulatorLauncher: React.FC = () => {
 const [simulators] = useState<Simulator[]>([
   {
     id: 'housing',
     title: 'Housing Portal Simulator',
     subtitle: 'Brent Council Housing Services',
     description: 'Practice housing applications, council tax registration, and local housing support services. Perfect for new residents navigating Brent Council systems.',
     icon: '🏠',
     features: [
       'Housing benefit applications',
       'Council tax setup and payments',
       'Housing register applications',
       'Repairs and maintenance requests',
       'Moving home notifications'
     ],
     stats: {
       sessions: 1247,
       rating: 4.8,
       successRate: 85
     },
     status: 'most-popular'
   },
   {
     id: 'healthcare',
     title: 'Healthcare Portal Simulator',
     subtitle: 'NHS Digital Services',
     description: 'Navigate NHS registration, GP appointments, and healthcare services. Essential practice for understanding the UK healthcare system.',
     icon: '🩺',
     features: [
       'GP practice registration',
       'NHS number applications',
       'Online appointment booking',
       'Prescription services',
       'Health records access'
     ],
     stats: {
       sessions: 892,
       rating: 4.9,
       successRate: 92
     },
     status: 'updated'
   },
   {
     id: 'education',
     title: 'Education Portal Simulator',
     subtitle: 'School Admissions & Services',
     description: 'Understand school applications, childcare options, and education support services. Essential for families with children.',
     icon: '🎓',
     features: [
       'School admissions applications',
       'Childcare provider searches',
       'Free school meals applications',
       'SEN support services',
       'Adult education enrollment'
     ],
     stats: {
       sessions: 634,
       rating: 4.7,
       successRate: 78
     }
   },
   {
     id: 'government',
     title: 'Government Services Simulator',
     subtitle: 'GOV.UK Digital Services',
     description: 'Practice essential government services from tax returns to passport applications. Build confidence with official processes.',
     icon: '🏛️',
     features: [
       'Self-assessment tax returns',
       'Universal Credit applications',
       'Passport and visa services',
       'Electoral roll registration',
       'DVLA vehicle services'
     ],
     stats: {
       sessions: 1156,
       rating: 4.6,
       successRate: 81
     }
   },
   {
     id: 'transport',
     title: 'Transport Portal Simulator',
     subtitle: 'TfL & Local Transport',
     description: 'Master London transport systems, Oyster card management, and local transport options. Essential for daily London life.',
     icon: '🚌',
     features: [
       'Oyster card applications',
       'Season ticket purchases',
       'Journey planning tools',
       'Accessibility services',
       'Contactless payment setup'
     ],
     stats: {
       sessions: 789,
       rating: 4.8,
       successRate: 94
     }
   },
   {
     id: 'employment',
     title: 'Employment Portal Simulator',
     subtitle: 'JobCentre Plus & Career Services',
     description: 'Practice job applications, benefits claims, and career development services. Understand UK employment systems and support.',
     icon: '💼',
     features: [
       'Universal Jobmatch registration',
       'Benefits calculator tools',
       'CV building services',
       'Skills assessment tools',
       'Work coaching appointments'
     ],
     stats: {
       sessions: 567,
       rating: 4.5,
       successRate: 76
     }
   }
 ]);

 const [practiceHistory] = useState<PracticeSession[]>([
   {
     id: '1',
     portalName: 'Housing Portal',
     lastPracticed: '2 days ago',
     progress: 85,
     status: 'completed',
     statusLabel: 'Council Tax Setup Complete'
   },
   {
     id: '2',
     portalName: 'Healthcare Portal',
     lastPracticed: '5 days ago',
     progress: 60,
     status: 'in-progress',
     statusLabel: 'GP Registration In Progress'
   },
   {
     id: '3',
     portalName: 'Transport Portal',
     lastPracticed: '1 week ago',
     progress: 100,
     status: 'completed',
     statusLabel: 'Oyster Card Mastery'
   }
 ]);

 const [selectedSimulator, setSelectedSimulator] = useState<Simulator | null>(null);
 const [showPreLaunchModal, setShowPreLaunchModal] = useState(false);
 const [rovAvailable, setRovAvailable] = useState(true);

 const handleLaunchSimulator = (simulatorId: string) => {
   const simulator = simulators.find(s => s.id === simulatorId);
   if (simulator) {
     setSelectedSimulator(simulator);
     setShowPreLaunchModal(true);
   }
 };

 const handleConfirmLaunch = (simulatorId: string) => {
   console.log(`Launching ${simulatorId} simulator...`);
   // This would normally redirect to the actual simulator
   // For now, we'll simulate the launch
   alert(`Launching ${selectedSimulator?.title}! This would normally open the full simulator interface with Helper ROV assistance.`);
   
   setShowPreLaunchModal(false);
   setSelectedSimulator(null);
   
   // Update practice history (simulation)
   updatePracticeHistory(simulatorId);
 };

 const handleShowHelp = (simulatorId: string) => {
   const helpMessages: Record<string, string> = {
     housing: 'The Housing Portal helps you practice Brent Council services including council tax, housing applications, and repairs. Start with council tax setup - it\'s the most common task for new residents.',
     healthcare: 'The Healthcare Portal simulates NHS Digital services. Begin with GP registration as this is required for most other health services. The Helper ROV can guide you through each step.',
     education: 'Practice school applications and education services. If you have children, start with school catchment area searches. Adult education options are also available.',
     government: 'Government services can seem complex, but our simulator breaks them down step-by-step. Tax returns and Universal Credit are the most practiced services.',
     transport: 'London transport is easier once you understand the zones and payment systems. Practice Oyster card setup first, then explore journey planning.',
     employment: 'Employment services include job searching, CV building, and benefits calculations. Start with the benefits calculator to understand your entitlements.'
   };
   
   alert(`Help for ${simulatorId} simulator:\n\n${helpMessages[simulatorId]}\n\nThe Helper ROV is always available for real-time assistance during practice.`);
 };

 const updatePracticeHistory = (simulatorType: string) => {
   console.log(`Practice session started for: ${simulatorType}`);
   // In a real app, this would update the backend
   // Here we just log for demonstration
 };

 const handleROVHelp = (action: 'help' | 'tips' | 'demo') => {
   const messages = {
     help: 'Helper ROV Activated!\n\nI can assist you with:\n• Choosing the right simulator\n• Understanding UK government processes\n• Step-by-step guidance during practice\n• Troubleshooting common issues\n• Connecting you with community members who\'ve used these services\n\nHow can I help you today?',
     tips: 'Quick Tips from Helper ROV:\n\n✓ Start with the most relevant simulator for your immediate needs\n✓ Take your time - there\'s no rush in practice mode\n✓ Don\'t worry about making mistakes - that\'s what practice is for!\n✓ Save your progress so you can continue later\n✓ Ask for help anytime - I\'m always here\n✓ Practice multiple times until you feel confident\n✓ Join community workshops for group practice sessions',
     demo: 'ROV Guided Demo Available!\n\nI can give you a guided tour of:\n• How the simulators work\n• What makes them safe to use\n• How to navigate between different sections\n• Where to find help during practice\n• How to save and track your progress\n\nWould you like me to start with the Housing Portal demo? It\'s our most popular simulator for new residents.'
   };
   
   alert(messages[action]);
 };

 return (
   <div className="portal-simulator-launcher">
     <header className="page-header">
       <div className="container">
         <h1>Portal Simulators</h1>
         <p>Safe practice environment for UK government and local services</p>
       </div>
     </header>

     <div className="safety-notice">
       <div className="safety-content">
         <span className="safety-icon">🛡️</span>
         <span className="safety-text">Safe Practice Environment - No Real Data Used</span>
       </div>
     </div>

     <div className="main-content">
       {rovAvailable && (
         <ROVAssistant onHelp={handleROVHelp} />
       )}

       <div className="launch-grid">
         {simulators.map((simulator) => (
           <SimulatorCard
             key={simulator.id}
             simulator={simulator}
             onLaunch={() => handleLaunchSimulator(simulator.id)}
             onHelp={() => handleShowHelp(simulator.id)}
           />
         ))}
       </div>

       <PracticeHistory sessions={practiceHistory} />
     </div>

     {showPreLaunchModal && selectedSimulator && (
       <PreLaunchModal
         simulator={selectedSimulator}
         onClose={() => {
           setShowPreLaunchModal(false);
           setSelectedSimulator(null);
         }}
         onConfirm={() => handleConfirmLaunch(selectedSimulator.id)}
       />
     )}
   </div>
 );
};

export default PortalSimulatorLauncher;