// src/pages/community-hubs/index.tsx
import React, { useState } from 'react';

interface CommunityHub {
 id: string;
 name: string;
 role: string;
 activities: string[];
 services: string;
 contact: string;
 impact: string;
 workshopSupport: string;
}

const CommunityHubsPage: React.FC = () => {
 const [selectedSupport, setSelectedSupport] = useState('');
 const [crisisLevel] = useState('normal');
 const [currentLanguage] = useState('en');
 const [userCommunity] = useState('wembley-central');

 const communityHubs: CommunityHub[] = [
   {
     id: 'wembley-central-library',
     name: 'Wembley Central Library',
     role: 'Primary learning venue and resource coordination point',
     activities: [
       'Workshop venue hosting',
       'Equipment lending (laptops, tablets)',
       'Internet access for participants',
       'Meeting space coordination'
     ],
     services: 'Free venue space for quarterly workshops, participant registration support, basic technical equipment access',
     contact: 'Library staff coordinate bookings for workshop sessions',
     impact: 'Enables workshop delivery without venue costs, provides backup equipment for participants',
     workshopSupport: 'Essential infrastructure partner for quarterly delivery'
   },
   {
     id: 'brent-adult-education',
     name: 'Brent Adult Education Service',
     role: 'Referral partner and progression pathway',
     activities: [
       'Participant referrals to workshops',
       'Follow-up course recommendations',
       'Skill assessment guidance',
       'Employment support connections'
     ],
     services: 'Workshop promotion through existing networks, post-workshop progression pathways',
     contact: 'Direct referral system for workshop participants seeking further education',
     impact: 'Expands participant reach, provides clear next steps after workshop completion',
     workshopSupport: 'Participant pipeline and progression planning'
   },
   {
     id: 'wembley-community-centre',
     name: 'Wembley Wonders CIC',
     role: 'Alternative venue and community coordination',
     activities: [
       'Backup workshop venue',
       'Community event promotion',
       'Local networking facilitation',
       'Accessible space provision'
     ],
     services: 'Secondary venue option, community promotion support, accessibility accommodations',
     contact: 'Community centre management coordinates alternative bookings',
     impact: 'Provides scheduling flexibility, ensures accessibility compliance',
     workshopSupport: 'Venue redundancy and accessibility enhancement'
   },
   {
     id: 'local-faith-organizations',
     name: 'Local Faith Organizations',
     role: 'Community outreach and participant support',
     activities: [
       'Workshop promotion within congregations',
       'Volunteer recruitment assistance',
       'Cultural sensitivity guidance',
       'Community trust building'
     ],
     services: 'Trusted community promotion, volunteer coordination, cultural liaison',
     contact: 'Individual faith leaders coordinate within their communities',
     impact: 'Builds participant confidence, ensures cultural appropriateness',
     workshopSupport: 'Community trust and volunteer coordination'
   }
 ];

 const coordinationMethods = [
   {
     function: 'Workshop Planning',
     description: 'Quarterly coordination meetings to plan upcoming workshop delivery',
     methods: [
       'Venue booking coordination with library and community centre',
       'Equipment availability confirmation',
       'Volunteer schedule alignment',
       'Participant registration process setup'
     ]
   },
   {
     function: 'Resource Sharing',
     description: 'Coordinated use of community assets for workshop delivery',
     methods: [
       'Laptop/tablet lending from library resources',
       'Printing and materials support',
       'Internet access provision',
       'Backup venue arrangements'
     ]
   },
   {
     function: 'Participant Support',
     description: 'Integrated support for workshop participants across organizations',
     methods: [
       'Referral system for additional learning needs',
       'Accessibility accommodation coordination',
       'Transportation assistance where needed',
       'Follow-up progression pathway guidance'
     ]
   }
 ];

 const supportPathways = {
   normal: [
     'Workshop registration assistance',
     'Basic equipment access',
     'Venue coordination',
     'Progression pathway information'
   ],
   support: [
     'Individual learning needs assessment',
     'Additional accessibility arrangements',
     'Extended equipment lending',
     'One-on-one follow-up support'
   ],
   crisis: [
     'Emergency workshop rescheduling',
     'Alternative learning format arrangement',
     'Immediate resource coordination',
     'Priority support pathway activation'
   ]
 };

 const requestPathways = () => {
   alert('Connecting to workshop coordination system...\nAvailable support: Venue booking, Equipment access, Registration assistance');
 };

 const emergencyHelp = () => {
   alert('Emergency support activated:\n- Alternative venue arrangements\n- Equipment emergency lending\n- Workshop rescheduling coordination');
 };

 const showSupportPathways = () => {
   setSelectedSupport(selectedSupport === 'pathways' ? '' : 'pathways');
 };

 return (
   <div className="min-h-screen community-hubs-main">
     <div className="animated-bg">
       <div className="bg-orb"></div>
       <div className="bg-orb"></div>
     </div>
     
     
     <main className="framework-section">
       <div className="framework-content">
         <div className="hero-content text-center mb-8">
           <div className="hero-badge fade-in">
             <span>🏘️</span>
             Community Hubs - Testing Full Maya Integration
           </div>
           
           <h1 className="hero-title fade-in">
             Community Partnership Network for Workshop Delivery
           </h1>
           
           <p className="hero-subtitle fade-in">
             Coordinated community assets supporting quarterly digital skills workshops through established partnerships.
           </p>
         </div>

         <div className="maya-integration-demo bg-slate-800 p-6 rounded-lg mb-8">
           <h3 className="text-lg font-semibold text-blue-400 mb-4">Maya Companion - Crisis Level: {crisisLevel}</h3>
           <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-300">
             <span>Language: {currentLanguage}</span>
             <span>Community: {userCommunity}</span>
           </div>
           <div className="flex gap-4 flex-wrap">
             <button 
               onClick={requestPathways}
               className="btn btn-primary text-sm"
             >
               Request Pathways
             </button>
             <button 
               onClick={emergencyHelp}
               className="btn btn-secondary text-sm"
             >
               Emergency Help
             </button>
             <button 
               onClick={showSupportPathways}
               className="btn btn-primary text-sm"
             >
               Show Support Pathways
             </button>
           </div>
           
           {selectedSupport === 'pathways' && (
             <div className="mt-4 p-4 bg-slate-700 rounded">
               <h4 className="font-semibold text-white mb-2">Available Support ({crisisLevel} level):</h4>
               <ul className="text-gray-300 text-sm space-y-1">
                 {supportPathways[crisisLevel as keyof typeof supportPathways].map((pathway, index) => (
                   <li key={index}>• {pathway}</li>
                 ))}
               </ul>
             </div>
           )}
         </div>

         <div className="hubs-grid">
           {communityHubs.map(hub => (
             <div key={hub.id} className="hub-card">
               <h3 className="hub-name">{hub.name}</h3>
               <p className="hub-role">{hub.role}</p>
               
               <div className="hub-activities">
                 <h4>Workshop Support Activities</h4>
                 <ul>
                   {hub.activities.map((activity, index) => (
                     <li key={index}>{activity}</li>
                   ))}
                 </ul>
               </div>
               
               <div className="hub-services">
                 <h4>Services Provided</h4>
                 <p>{hub.services}</p>
               </div>
               
               <div className="hub-contact">
                 <h4>Coordination Method</h4>
                 <p>{hub.contact}</p>
               </div>
               
               <div className="hub-impact">
                 <h4>Workshop Impact</h4>
                 <p>{hub.impact}</p>
               </div>
             </div>
           ))}
         </div>

         <div className="coordination-section">
           <h2 className="section-title text-center">Quarterly Workshop Coordination</h2>
           <p className="section-subtitle text-center">
             How community partners coordinate to deliver sustainable quarterly workshops.
           </p>
           
           <div className="coordination-grid">
             {coordinationMethods.map((method, index) => (
               <div key={index} className="coordination-card">
                 <h3 className="coordination-function">{method.function}</h3>
                 <p className="coordination-description">{method.description}</p>
                 
                 <div className="coordination-methods">
                   <h5>Implementation Methods:</h5>
                   <ul>
                     {method.methods.map((methodItem, methodIndex) => (
                       <li key={methodIndex}>{methodItem}</li>
                     ))}
                   </ul>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="integration-section">
           <h2 className="section-title text-center">Workshop Delivery Integration</h2>
           <div className="integration-content">
             <p>
               Community hubs provide the infrastructure backbone for quarterly workshop delivery, 
               enabling the CIC to focus volunteer expertise on teaching rather than logistics coordination.
             </p>
             
             <div className="framework-connections">
               <div className="connection">
                 <strong>Q1 Digital Basics:</strong> Library provides venue, equipment lending, and participant registration. Adult education service promotes through existing networks.
               </div>
               <div className="connection">
                 <strong>Q2 Creative Media:</strong> Community centre provides audio equipment access, faith organizations support volunteer coordination and community promotion.
               </div>
               <div className="connection">
                 <strong>Q3 STEM Fundamentals:</strong> Library coordinates laptop access, adult education provides progression pathway planning for participants.
               </div>
               <div className="connection">
                 <strong>Q4 Heritage & Community:</strong> All partners contribute to community story collection and digital preservation project support.
               </div>
             </div>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default CommunityHubsPage;