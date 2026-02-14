// src/pages/mutual-aid/index.tsx
import React, { useState } from 'react';

interface MutualAidSupport {
 id: string;
 title: string;
 description: string;
 howItWorks: string[];
 realExamples: string[];
 coordination: string;
 workshopConnection: string;
}

const MutualAidPage: React.FC = () => {
 const [selectedSupport, setSelectedSupport] = useState('');

 const supportTypes: MutualAidSupport[] = [
   {
     id: 'workshop-participation',
     title: 'Workshop Participation Support',
     description: 'Practical assistance to help community members attend quarterly digital skills workshops.',
     howItWorks: [
       'Participants share transportation to workshop venues',
       'Volunteers provide childcare during weekend sessions',
       'Equipment lending between community members',
       'Peer support for workshop anxiety or confidence issues'
     ],
     realExamples: [
       'Three workshop participants arrange shared car travel to library venue',
       'Parent volunteers rotate childcare duties during 2-hour sessions',
       'Community member lends laptop to participant without computer access',
       'Previous participant mentors newcomer through first workshop experience'
     ],
     coordination: 'Organized through WhatsApp group created for each workshop cohort, with volunteer coordinators facilitating connections.',
     workshopConnection: 'Enables workshop participation for people facing transport, childcare, or equipment barriers'
   },
   {
     id: 'skills-sharing',
     title: 'Digital Skills Peer Support',
     description: 'Community members help each other practice and apply skills learned in quarterly workshops.',
     howItWorks: [
       'Workshop graduates provide informal follow-up support to newer participants',
       'Skill practice sessions between workshops at community venues',
       'Troubleshooting help for applying workshop learning at home',
       'Peer mentoring for participants building confidence with technology'
     ],
     realExamples: [
       'Q1 Digital Basics graduate helps Q2 participant set up email account',
       'Creative Media workshop participants practice podcast recording together',
       'STEM workshop graduates assist with basic coding project troubleshooting',
       'Heritage workshop participants collaborate on family story documentation'
     ],
     coordination: 'Facilitated through quarterly workshop reunion sessions and ongoing WhatsApp support groups.',
     workshopConnection: 'Extends workshop learning impact through peer reinforcement and practical application support'
   },
   {
     id: 'resource-coordination',
     title: 'Community Resource Sharing',
     description: 'Coordinated sharing of equipment, venues, and materials needed for workshop delivery and participation.',
     howItWorks: [
       'Community members lend equipment for workshop use when library resources insufficient',
       'Local businesses provide printing or material support for workshop activities',
       'Volunteers coordinate venue setup and cleanup for workshops',
       'Shared purchasing of workshop materials to reduce individual costs'
     ],
     realExamples: [
       'Local business donates printing for workshop certificates and materials',
       'Community member lends portable speakers for Creative Media workshop',
       'Volunteers coordinate folding chairs setup at community centre venue',
       'Bulk purchase of USB drives for Heritage workshop digital storage project'
     ],
     coordination: 'Managed through quarterly pre-workshop volunteer meetings and resource inventory tracking.',
     workshopConnection: 'Reduces workshop delivery costs and improves resource availability for participants'
   }
 ];

 const principles = [
   {
     title: 'Workshop-Centered Coordination',
     description: 'Mutual aid activities focus specifically on supporting quarterly workshop delivery and participant success.',
     application: 'Support requests connect directly to workshop participation needs rather than general community assistance.'
   },
   {
     title: 'Peer Learning Support',
     description: 'Community members who complete workshops provide mentoring and assistance to current participants.',
     application: 'Creates learning continuity between quarterly workshops through peer relationships and skill reinforcement.'
   },
   {
     title: 'Resource Efficiency',
     description: 'Shared equipment, transportation, and materials reduce individual costs and workshop delivery expenses.',
     application: 'Equipment lending and shared purchasing maximize community resources for digital literacy learning.'
   },
   {
     title: 'Volunteer Sustainability',
     description: 'Mutual aid reduces volunteer coordination burden by enabling peer-to-peer support systems.',
     application: 'Community self-organization for transportation, childcare, and practice sessions reduces formal volunteer requirements.'
   }
 ];

 const impact = [
   {
     metric: 'Workshop Accessibility',
     data: 'Mutual aid support enables participation from community members who would otherwise face barriers to attendance.',
     significance: 'Increases workshop diversity and community representation through practical barrier removal.'
   },
   {
     metric: 'Learning Retention',
     data: 'Peer support between workshops helps participants retain and apply digital skills learned in quarterly sessions.',
     significance: 'Maximizes educational impact of limited workshop sessions through community reinforcement.'
   },
   {
     metric: 'Community Connection',
     data: 'Workshop-focused mutual aid builds relationships between community members with shared learning interests.',
     significance: 'Creates social capital focused on digital literacy development and community skill building.'
   }
 ];

 return (
   <div className="min-h-screen mutual-aid-main">
     <div className="animated-bg">
       <div className="bg-orb"></div>
       <div className="bg-orb"></div>
     </div>
     
     
     <main className="framework-section">
       <div className="framework-content">
         <div className="hero-content text-center mb-8">
           <div className="hero-badge fade-in">
             <span>🤝</span>
             Community Mutual Support
           </div>
           
           <h1 className="hero-title fade-in">
             Workshop-Focused Mutual Aid Network
           </h1>
           
           <p className="hero-subtitle fade-in">
             Community members supporting each other to participate in and benefit from quarterly digital skills workshops.
           </p>
         </div>

         <div className="support-grid">
           {supportTypes.map(support => (
             <div key={support.id} className="support-card">
               <h3 className="support-title">{support.title}</h3>
               <p className="support-description">{support.description}</p>
               
               <div className="support-details">
                 <div className="how-it-works">
                   <h4>How It Works</h4>
                   <ul>
                     {support.howItWorks.map((step, index) => (
                       <li key={index}>{step}</li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="real-examples">
                   <h4>Real Examples</h4>
                   <ul>
                     {support.realExamples.map((example, index) => (
                       <li key={index}>{example}</li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="coordination">
                   <h4>Coordination Method</h4>
                   <p>{support.coordination}</p>
                 </div>
               </div>
               
               <div className="bg-slate-800 p-3 rounded mt-4">
                 <p className="text-sm text-gray-300">
                   <strong>Workshop Connection:</strong> {support.workshopConnection}
                 </p>
               </div>
             </div>
           ))}
         </div>

         <div className="principles-section">
           <h2 className="section-title text-center">Mutual Aid Principles</h2>
           <p className="section-subtitle text-center">
             Core principles guiding community support for workshop participation and digital literacy learning.
           </p>
           
           <div className="principles-grid">
             {principles.map((principle, index) => (
               <div key={index} className="principle-card">
                 <h3 className="principle-title">{principle.title}</h3>
                 <p className="principle-description">{principle.description}</p>
                 
                 <div className="principle-application">
                   <strong>Application:</strong> {principle.application}
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="impact-section">
           <h2 className="section-title text-center">Community Impact</h2>
           <p className="section-subtitle text-center">
             How workshop-focused mutual aid strengthens community digital literacy outcomes.
           </p>
           
           <div className="impact-grid">
             {impact.map((item, index) => (
               <div key={index} className="impact-card">
                 <h3 className="impact-metric">{item.metric}</h3>
                 <div className="impact-data">{item.data}</div>
                 <p className="impact-significance">{item.significance}</p>
               </div>
             ))}
           </div>
         </div>

         <div className="integration-section">
           <h2 className="section-title text-center">Workshop Integration</h2>
           <div className="integration-content">
             <p>
               Mutual aid activities connect directly to quarterly workshop delivery, creating community support systems 
               that enhance learning outcomes while reducing coordination burden on volunteers.
             </p>
             
             <div className="framework-connections">
               <div className="connection">
                 <strong>Pre-Workshop:</strong> Community coordination for transportation, childcare, and equipment access removes participation barriers.
               </div>
               <div className="connection">
                 <strong>During Workshop:</strong> Peer mentoring and resource sharing enhance learning experience for all participants.
               </div>
               <div className="connection">
                 <strong>Post-Workshop:</strong> Ongoing skill practice groups and troubleshooting support extend workshop impact between quarterly sessions.
               </div>
               <div className="connection">
                 <strong>Long-term:</strong> Workshop graduates become community mentors, creating sustainable peer learning networks focused on digital literacy.
               </div>
             </div>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default MutualAidPage;