// src/workshops/resources/q3-stem-fundamentals/WorkshopContent.tsx
import React, { useState } from 'react';

interface STEMModule {
 id: string;
 title: string;
 duration: string;
 objectives: string[];
 activities: string[];
 materials: string[];
 outcomes: string[];
}

const Q3STEMFundamentalsWorkshop: React.FC = () => {
 const [selectedModule, setSelectedModule] = useState<string>('');

 const workshopOverview = {
   title: 'Q3: STEM Fundamentals Workshop',
   duration: '2.5 hours (10am-12:30pm)',
   maxParticipants: 15,
   leaders: ['Electrical Engineering Lecturers', 'Hackspace Network Volunteers'],
   venue: 'Wembley Central Library with portable equipment setup',
   cost: '£50 per participant',
   prerequisites: 'Comfortable with basic computer use. Previous workshops helpful but not required.'
 };

 const stemModules: STEMModule[] = [
   {
     id: 'coding-concepts',
     title: 'Programming Logic Basics',
     duration: '45 minutes',
     objectives: [
       'Understand what programming is and how it relates to everyday technology',
       'Learn basic programming concepts: sequences, decisions, loops',
       'Write simple instructions using visual programming blocks',
       'Connect programming logic to real-world problem solving'
     ],
     activities: [
       'Introduction using Scratch visual programming environment',
       'Create simple animations and interactive stories',
       'Practice logical thinking through step-by-step instructions',
       'Discuss how programming concepts appear in daily technology use'
     ],
     materials: [
       'Computers with Scratch software installed',
       'Pre-prepared example programs to explore',
       'Printed handouts showing programming concepts',
       'Simple flowchart templates for planning'
     ],
     outcomes: [
       'Basic understanding of how computer programs work',
       'Confidence with logical step-by-step thinking',
       'Awareness of programming in everyday devices'
     ]
   },
   {
     id: 'electronics-intro',
     title: 'Simple Electronics Project',
     duration: '60 minutes',
     objectives: [
       'Understand basic electrical concepts: battery, circuit, connection',
       'Build a working electronic circuit safely',
       'Learn to read simple circuit diagrams',
       'Recognize electronic components in everyday devices'
     ],
     activities: [
       'Build LED light circuit using breadboard and components',
       'Practice connecting wires and components safely',
       'Test circuit troubleshooting when connections fail',
       'Explore how circuits work in household items like torches'
     ],
     materials: [
       'Breadboards and jumper wires',
       'LEDs, resistors, batteries, and switches',
       'Simple multimeters for testing connections',
       'Safety guidelines and component identification sheets'
     ],
     outcomes: [
       'Working LED circuit to take home',
       'Basic understanding of electrical safety',
       'Recognition of electronic components'
     ]
   },
   {
     id: 'technology-connections',
     title: 'Technology in Daily Life',
     duration: '20 minutes',
     objectives: [
       'Connect workshop learning to familiar technology',
       'Understand how smartphones, computers, and appliances use similar principles',
       'Identify opportunities for further STEM learning',
       'Appreciate technology design and engineering'
     ],
     activities: [
       'Discussion of programming and electronics in common devices',
       'Examine how workshop concepts apply to smartphones and computers',
       'Explore local opportunities for continued STEM learning',
       'Q&A about technology careers and education paths'
     ],
     materials: [
       'Examples of everyday electronic devices',
       'Information about local adult education STEM courses',
       'Hackspace and maker space contact information',
       'Career pathway resources for technology fields'
     ],
     outcomes: [
       'Increased appreciation for technology design',
       'Awareness of local STEM learning opportunities',
       'Connections between workshop and real-world applications'
     ]
   },
   {
     id: 'hackspace-intro',
     title: 'Community Maker Spaces',
     duration: '15 minutes',
     objectives: [
       'Learn about local hackspace and maker communities',
       'Understand resources available for continued learning',
       'Connect with volunteers for ongoing STEM mentoring',
       'Explore collaborative technology projects'
     ],
     activities: [
       'Introduction to local hackspace facilities and membership',
       'Overview of tools and resources available for projects',
       'Discussion of community technology projects and collaboration',
       'Sign-up for hackspace visits or beginner sessions'
     ],
     materials: [
       'Hackspace promotional materials and membership information',
       'Examples of community technology projects',
       'Contact details for hackspace volunteers and mentors',
       'Calendar of beginner-friendly hackspace events'
     ],
     outcomes: [
       'Knowledge of local STEM community resources',
       'Connections for continued learning and mentoring',
       'Pathways for hands-on technology projects'
     ]
   }
 ];

 const practicalInfo = {
   whatToBring: [
     'Laptop if available (library computers provided otherwise)',
     'Calculator for basic electronic calculations',
     'Notebook for project notes and circuit diagrams',
     'Reading glasses if needed for small electronic components'
   ],
   safetyConsiderations: [
     'All electronic components are low-voltage and safe',
     'Safety briefing provided before handling any equipment',
     'Engineering lecturers supervise all circuit building',
     'First aid available and volunteers trained in workshop safety'
   ],
   skillsHelpful: [
     'Basic arithmetic for simple electrical calculations',
     'Patience with trial-and-error learning process',
     'Interest in understanding how everyday technology works',
     'Willingness to ask questions about unfamiliar concepts'
   ],
   followUpResources: [
     'Free programming learning websites and tutorials',
     'Basic electronics kit recommendations for home experimentation',
     'Local hackspace membership information and beginner events',
     'Adult education STEM course listings and contact information'
   ]
 };

 const realisticOutcomes = [
   {
     skill: 'Programming Understanding',
     realistic: 'Basic appreciation of how programs work using logical steps and decisions',
     unrealistic: 'Ability to write functional software applications or websites'
   },
   {
     skill: 'Electronics Knowledge',
     realistic: 'Successfully build simple LED circuit and understand basic electrical safety',
     unrealistic: 'Design complex electronic devices or repair household electronics'
   },
   {
     skill: 'Technology Awareness',
     realistic: 'Increased understanding of how familiar devices use programming and circuits',
     unrealistic: 'Expert knowledge of computer hardware or smartphone technology'
   },
   {
     skill: 'Further Learning',
     realistic: 'Clear information about local resources for continued STEM education',
     unrealistic: 'Immediate readiness for advanced engineering or computer science courses'
   }
 ];

 const commonConcerns = [
   {
     concern: 'I failed maths at school - will this be too difficult?',
     response: 'Workshop uses very basic arithmetic only. Engineering lecturers are experienced with adult learners and explain concepts clearly with practical examples rather than complex mathematics.'
   },
   {
     concern: 'Is it safe to work with electricity and electronic components?',
     response: 'All components are low-voltage and completely safe. Safety is the top priority, with engineering professionals supervising all activities and providing safety guidance.'
   },
   {
     concern: 'Will this help me fix my computer or smartphone?',
     response: 'Workshop provides general understanding of how technology works, but not device repair skills. Focus is on learning basic concepts rather than troubleshooting specific devices.'
   },
   {
     concern: 'What if I want to learn more after the workshop?',
     response: 'Local hackspace volunteers provide ongoing mentoring opportunities, and we share information about adult education courses and community technology projects.'
   }
 ];

 return (
   <div className="q3-workshop-content">
     <div className="workshop-header bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h1 className="text-3xl font-bold text-green-400 mb-4">{workshopOverview.title}</h1>
       <div className="grid md:grid-cols-2 gap-6">
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Workshop Details</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Duration:</strong> {workshopOverview.duration}</li>
             <li><strong>Maximum participants:</strong> {workshopOverview.maxParticipants}</li>
             <li><strong>Led by:</strong> {workshopOverview.leaders.join(', ')}</li>
             <li><strong>Venue:</strong> {workshopOverview.venue}</li>
           </ul>
         </div>
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Cost & Requirements</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Cost:</strong> {workshopOverview.cost}</li>
             <li><strong>Prerequisites:</strong> {workshopOverview.prerequisites}</li>
           </ul>
         </div>
       </div>
     </div>

     <div className="stem-modules mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Workshop Modules</h2>
       
       <div className="module-selector flex gap-2 mb-6 flex-wrap">
         {stemModules.map(module => (
           <button
             key={module.id}
             onClick={() => setSelectedModule(selectedModule === module.id ? '' : module.id)}
             className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
               selectedModule === module.id
                 ? 'bg-green-600 text-white border-green-600'
                 : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-green-400'
             }`}
           >
             {module.title}
           </button>
         ))}
       </div>

       <div className="modules-overview grid md:grid-cols-2 gap-4 mb-6">
         {stemModules.map(module => (
           <div key={module.id} className="bg-slate-800 p-4 rounded border border-slate-700">
             <h4 className="font-bold text-green-400 mb-1">{module.title}</h4>
             <p className="text-gray-300 text-sm">{module.duration}</p>
           </div>
         ))}
       </div>

       {selectedModule && (
         <div className="module-detail bg-slate-800 rounded-lg p-6 border border-slate-700">
           {(() => {
             const module = stemModules.find(m => m.id === selectedModule);
             if (!module) return null;
             
             return (
               <>
                 <h3 className="text-2xl font-bold text-green-400 mb-4">{module.title}</h3>
                 <p className="text-blue-400 font-semibold mb-4">{module.duration}</p>
                 
                 <div className="grid md:grid-cols-2 gap-6 mb-6">
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-2">Learning Objectives</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.objectives.map((objective, index) => (
                         <li key={index}>• {objective}</li>
                       ))}
                     </ul>
                   </div>
                   
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-2">Hands-On Activities</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.activities.map((activity, index) => (
                         <li key={index}>• {activity}</li>
                       ))}
                     </ul>
                   </div>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-2">Materials Provided</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.materials.map((material, index) => (
                         <li key={index}>• {material}</li>
                       ))}
                     </ul>
                   </div>
                   
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-2">What You'll Achieve</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.outcomes.map((outcome, index) => (
                         <li key={index}>• {outcome}</li>
                       ))}
                     </ul>
                   </div>
                 </div>
               </>
             );
           })()}
         </div>
       )}
     </div>

     <div className="practical-information mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Workshop Preparation</h2>
       
       <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-green-400 mb-3">What to Bring</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.whatToBring.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-blue-400 mb-3">Safety Information</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.safetyConsiderations.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
       </div>
       
       <div className="grid md:grid-cols-2 gap-6 mt-6">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-yellow-400 mb-3">Helpful Skills</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.skillsHelpful.map((skill, index) => (
               <li key={index}>• {skill}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-purple-400 mb-3">Continued Learning</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.followUpResources.map((resource, index) => (
               <li key={index}>• {resource}</li>
             ))}
           </ul>
         </div>
       </div>
     </div>

     <div className="realistic-outcomes mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Realistic Learning Outcomes</h2>
       
       <div className="space-y-4">
         {realisticOutcomes.map((outcome, index) => (
           <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
             <h4 className="font-bold text-green-400 mb-3">{outcome.skill}</h4>
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                 <h5 className="font-semibold text-white mb-2">Realistic Expectation:</h5>
                 <p className="text-gray-300 text-sm">{outcome.realistic}</p>
               </div>
               <div>
                 <h5 className="font-semibold text-red-400 mb-2">Beyond Workshop Scope:</h5>
                 <p className="text-gray-300 text-sm">{outcome.unrealistic}</p>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>

     <div className="common-questions">
       <h2 className="text-2xl font-bold text-white mb-6">Common Questions</h2>
       
       <div className="space-y-4">
         {commonConcerns.map((item, index) => (
           <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
             <h4 className="font-bold text-yellow-400 mb-2">"{item.concern}"</h4>
             <p className="text-gray-300">{item.response}</p>
           </div>
         ))}
       </div>
       
       <div className="text-center mt-8">
         <p className="text-gray-300 mb-4">
           Ready to explore basic STEM concepts in a supportive, hands-on environment with professional engineering guidance?
         </p>
         <button className="btn btn-primary px-8 py-3">
           Register for Q3: STEM Fundamentals Workshop
         </button>
       </div>
     </div>
   </div>
 );
};

export default Q3STEMFundamentalsWorkshop;