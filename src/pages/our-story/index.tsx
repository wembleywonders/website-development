// src/pages/our-story/index.tsx
import React, { useState } from 'react';

interface Milestone {
 year: string;
 event: string;
 description: string;
 impact: string;
}

interface TeamMember {
 id: string;
 name: string;
 role: string;
 background: string;
 contribution: string;
 availability: string;
}

const OurStoryPage: React.FC = () => {
 const [selectedSection, setSelectedSection] = useState<'origin' | 'evolution' | 'current' | 'future'>('origin');

 const timeline: Milestone[] = [
   {
     year: '2019-2022',
     event: 'Big Local Funding Period',
     description: 'Initial community development work funded through Big Local programme, establishing relationships and understanding community needs.',
     impact: 'Built volunteer network, identified digital literacy gaps, developed community partnerships'
   },
   {
     year: '2022-2023',
     event: 'Post-Funding Reality Check',
     description: 'Transition period following end of Big Local funding, reassessing sustainable service delivery models.',
     impact: 'Recognized need for smaller-scale, volunteer-led programming rather than comprehensive services'
   },
   {
     year: '2023-2024',
     event: 'Heritage Preservation Pilot',
     description: 'Successful demonstration project showing volunteer expertise could deliver focused digital literacy workshops.',
     impact: 'Proved concept for quarterly workshop model, demonstrated community demand and volunteer capacity'
   },
   {
     year: '2025',
     event: 'Quarterly Workshop Model Launch',
     description: 'Formal launch of sustainable quarterly digital skills workshops led by community volunteer specialists.',
     impact: 'Established repeatable, affordable model for community digital literacy education'
   }
 ];

 const coreTeam: TeamMember[] = [
   {
     id: 'founders',
     name: 'Founding Partners',
     role: 'CIC Leadership',
     background: 'Mid-50s professionals with experience in community development and organizational leadership.',
     contribution: 'Strategic planning, volunteer coordination, partnership development, administrative oversight.',
     availability: 'Ongoing commitment to quarterly workshop coordination and CIC governance'
   },
   {
     id: 'it-specialists',
     name: 'IT Specialist Volunteers',
     role: 'Digital Basics Workshop Leaders',
     background: 'Professional experience in information technology and systems administration.',
     contribution: 'Lead Q1 Digital Basics workshops, provide technical expertise for email, forms, and online safety.',
     availability: 'Quarterly commitment for weekend workshop delivery'
   },
   {
     id: 'educators',
     name: 'Retired Headmistresses',
     role: 'Educational Support Specialists',
     background: 'Experienced educational professionals with expertise in adult learning and classroom management.',
     contribution: 'Co-lead Digital Basics workshops, provide pedagogical expertise and learning support.',
     availability: 'Quarterly availability for workshop support and planning'
   },
   {
     id: 'media-professionals',
     name: 'DJs and Radio Presenters',
     role: 'Creative Media Workshop Leaders',
     background: 'Local media professionals with experience in audio production and community broadcasting.',
     contribution: 'Lead Q2 Creative Media workshops covering podcasting, recording, and basic video editing.',
     availability: 'Quarterly commitment for creative workshop delivery'
   },
   {
     id: 'stem-educators',
     name: 'Engineering Lecturers',
     role: 'STEM Workshop Specialists',
     background: 'University-level educators in electrical engineering and technology fields.',
     contribution: 'Lead Q3 STEM Fundamentals workshops, introduce coding concepts and basic electronics.',
     availability: 'Quarterly availability working around academic schedules'
   },
   {
     id: 'community-specialist',
     name: 'Child Development Specialist',
     role: 'Heritage Workshop Coordinator',
     background: 'Professional experience in child development and family support services.',
     contribution: 'Lead Q4 Heritage workshops, coordinate family story preservation and community projects.',
     availability: 'Quarterly commitment for heritage preservation activities'
   }
 ];

 const currentReality = {
   strengths: [
     'Established volunteer network with proven expertise',
     'Demonstrated community demand through heritage pilot project',
     'Sustainable financial model through modest workshop fees',
     'Strong community partnerships with library and community centre',
     'Clear focus on digital literacy rather than comprehensive programming'
   ],
   challenges: [
     'Limited funding opportunities for CICs without government grants',
     'Volunteer availability constraints around professional commitments',
     'Small market size limits growth potential',
     'Dependence on venue partnerships for workshop delivery',
     'Competition from free alternatives like library computer classes'
   ],
   approach: 'Honest assessment of capacity constraints leads to focused, sustainable service delivery rather than overcommitment to unrealistic programming.'
 };

 const futureDirection = {
   shortTerm: [
     'Deliver first complete year of quarterly workshops (2025)',
     'Build evidence base for workshop effectiveness and community impact',
     'Strengthen volunteer coordination and retention systems',
     'Develop partnerships with local adult education providers for participant progression'
   ],
   mediumTerm: [
     'Expand to two workshop sessions per quarter if demand and volunteer capacity support',
     'Develop take-home resources and peer support systems between workshops',
     'Explore corporate training opportunities for additional revenue streams',
     'Document model for potential replication in other communities'
   ],
   sustainability: 'Success measured by consistent workshop delivery and positive community impact rather than organizational growth or comprehensive service expansion.'
 };

 return (
   <div className="min-h-screen">
     <div className="animated-bg">
       <div className="bg-orb"></div>
       <div className="bg-orb"></div>
     </div>
     
     
     <main className="framework-section">
       <div className="framework-content">
         <div className="hero-content text-center mb-8">
           <div className="hero-badge fade-in">
             <span>📖</span>
             Our Story
           </div>
           
           <h1 className="hero-title fade-in">
             From Community Development to Focused Digital Literacy
           </h1>
           
           <p className="hero-subtitle fade-in">
             The evolution from comprehensive programming to sustainable quarterly workshops led by community volunteers.
           </p>
         </div>

         <div className="story-navigation mb-8">
           <div className="flex justify-center gap-4 mb-6 flex-wrap">
             {[
               { id: 'origin', label: 'Origins' },
               { id: 'evolution', label: 'Evolution' },
               { id: 'current', label: 'Current Reality' },
               { id: 'future', label: 'Future Direction' }
             ].map(section => (
               <button
                 key={section.id}
                 onClick={() => setSelectedSection(section.id as any)}
                 className={`px-4 py-2 rounded-lg border transition-colors ${
                   selectedSection === section.id
                     ? 'bg-blue-600 text-white border-blue-600'
                     : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-blue-400'
                 }`}
               >
                 {section.label}
               </button>
             ))}
           </div>
         </div>

         {selectedSection === 'origin' && (
           <div className="origin-section">
             <h2 className="section-title text-center">Origins and Early Development</h2>
             
             <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
               <h3 className="text-xl font-bold text-blue-400 mb-4">Community Context</h3>
               <p className="text-gray-300 mb-4">
                 Wembley Central community identified digital literacy as a significant barrier to accessing services, 
                 employment opportunities, and community participation. Traditional adult education options were either 
                 too formal, inaccessible, or didn't address practical daily needs.
               </p>
               <p className="text-gray-300">
                 Big Local funding enabled initial community development work, building relationships and understanding 
                 specific local needs around technology access and skills development.
               </p>
             </div>

             <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
               <h3 className="text-xl font-bold text-green-400 mb-4">Volunteer Network Formation</h3>
               <p className="text-gray-300 mb-4">
                 Through community engagement, we identified local professionals willing to share expertise: 
                 IT specialists, educators, media professionals, and community workers who understood both 
                 technical skills and effective adult learning approaches.
               </p>
               <p className="text-gray-300">
                 These volunteers brought professional expertise but needed a sustainable model that respected 
                 their time constraints and other commitments while serving genuine community needs.
               </p>
             </div>
           </div>
         )}

         {selectedSection === 'evolution' && (
           <div className="evolution-section">
             <h2 className="section-title text-center">Organizational Evolution</h2>
             
             <div className="timeline-section">
               <div className="space-y-6">
                 {timeline.map((milestone, index) => (
                   <div key={index} className="timeline-item flex gap-6">
                     <div className="timeline-marker bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm shrink-0">
                       {milestone.year}
                     </div>
                     <div className="timeline-content bg-slate-800 rounded-lg p-6 border border-slate-700 flex-1">
                       <h3 className="text-lg font-bold text-blue-400 mb-2">{milestone.event}</h3>
                       <p className="text-gray-300 mb-3">{milestone.description}</p>
                       <div className="bg-slate-700 p-3 rounded">
                         <strong className="text-white">Impact:</strong>
                         <p className="text-gray-300 text-sm mt-1">{milestone.impact}</p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="lessons-learned bg-slate-800 rounded-lg p-6 border border-slate-700 mt-8">
               <h3 className="text-xl font-bold text-purple-400 mb-4">Key Learning</h3>
               <p className="text-gray-300">
                 The transition from grant-funded comprehensive programming to volunteer-led focused workshops 
                 required honest assessment of capacity constraints and community needs. Sustainability came 
                 through accepting smaller scale impact rather than attempting to maintain unsupported broad services.
               </p>
             </div>
           </div>
         )}

         {selectedSection === 'current' && (
           <div className="current-section">
             <h2 className="section-title text-center">Current Operating Model</h2>
             
             <div className="team-section mb-8">
               <h3 className="text-2xl font-bold text-center text-white mb-6">Volunteer Team</h3>
               <div className="grid gap-6">
                 {coreTeam.map(member => (
                   <div key={member.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                     <h4 className="text-lg font-bold text-blue-400 mb-2">{member.name}</h4>
                     <p className="text-purple-400 font-semibold mb-3">{member.role}</p>
                     
                     <div className="grid md:grid-cols-2 gap-4">
                       <div>
                         <h5 className="font-semibold text-white mb-1">Background</h5>
                         <p className="text-gray-300 text-sm">{member.background}</p>
                       </div>
                       <div>
                         <h5 className="font-semibold text-white mb-1">Contribution</h5>
                         <p className="text-gray-300 text-sm">{member.contribution}</p>
                       </div>
                     </div>
                     
                     <div className="mt-3">
                       <h5 className="font-semibold text-white mb-1">Availability</h5>
                       <p className="text-gray-300 text-sm">{member.availability}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="current-assessment">
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-slate-800 rounded-lg p-6 border border-green-600/20">
                   <h3 className="text-xl font-bold text-green-400 mb-4">Organizational Strengths</h3>
                   <ul className="text-gray-300 text-sm space-y-2">
                     {currentReality.strengths.map((strength, index) => (
                       <li key={index}>• {strength}</li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="bg-slate-800 rounded-lg p-6 border border-yellow-600/20">
                   <h3 className="text-xl font-bold text-yellow-400 mb-4">Current Challenges</h3>
                   <ul className="text-gray-300 text-sm space-y-2">
                     {currentReality.challenges.map((challenge, index) => (
                       <li key={index}>• {challenge}</li>
                     ))}
                   </ul>
                 </div>
               </div>
               
               <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mt-6">
                 <h3 className="text-xl font-bold text-blue-400 mb-3">Strategic Approach</h3>
                 <p className="text-gray-300">{currentReality.approach}</p>
               </div>
             </div>
           </div>
         )}

         {selectedSection === 'future' && (
           <div className="future-section">
             <h2 className="section-title text-center">Future Direction</h2>
             
             <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                 <h3 className="text-xl font-bold text-blue-400 mb-4">Short-term Priorities (2025-2026)</h3>
                 <ul className="text-gray-300 text-sm space-y-2">
                   {futureDirection.shortTerm.map((priority, index) => (
                     <li key={index}>• {priority}</li>
                   ))}
                 </ul>
               </div>
               
               <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                 <h3 className="text-xl font-bold text-purple-400 mb-4">Medium-term Development (2027-2029)</h3>
                 <ul className="text-gray-300 text-sm space-y-2">
                   {futureDirection.mediumTerm.map((development, index) => (
                     <li key={index}>• {development}</li>
                   ))}
                 </ul>
               </div>
             </div>
             
             <div className="sustainability-focus bg-slate-800 rounded-lg p-6 border border-slate-700 mt-8">
               <h3 className="text-xl font-bold text-green-400 mb-3">Sustainability Philosophy</h3>
               <p className="text-gray-300">{futureDirection.sustainability}</p>
             </div>

             <div className="call-to-action text-center mt-8">
               <h3 className="text-2xl font-bold text-white mb-4">Join Our Community Network</h3>
               <p className="text-gray-300 mb-6">
                 Whether as a workshop participant, volunteer specialist, or community partner, 
                 there are ways to contribute to practical digital literacy education in Wembley Central.
               </p>
               <div className="flex gap-4 justify-center flex-wrap">
                 <a href="/workshops" className="btn btn-primary">View Workshops</a>
                 <a href="/volunteers" className="btn btn-secondary">Get Involved</a>
               </div>
             </div>
           </div>
         )}
       </div>
     </main>
   </div>
 );
};

export default OurStoryPage;