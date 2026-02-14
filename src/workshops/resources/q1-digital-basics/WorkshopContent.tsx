// src/workshops/resources/q1-digital-basics/WorkshopContent.tsx
import React, { useState } from 'react';

interface LearningModule {
 id: string;
 title: string;
 duration: string;
 objectives: string[];
 activities: string[];
 resources: string[];
}

const Q1DigitalBasicsWorkshop: React.FC = () => {
 const [selectedModule, setSelectedModule] = useState<string>('');

 const workshopOverview = {
   title: 'Q1: Digital Basics Workshop',
   duration: '2 hours (10am-12pm)',
   maxParticipants: 15,
   leaders: ['IT Specialists', 'Retired Headmistresses'],
   venue: 'Wembley Central Library Computer Suite',
   cost: '£50 per participant',
   prerequisites: 'No prior experience required - complete beginners welcome'
 };

 const learningModules: LearningModule[] = [
   {
     id: 'email-basics',
     title: 'Email Setup and Management',
     duration: '30 minutes',
     objectives: [
       'Create personal email account with secure password',
       'Understand inbox, sent items, and basic email organization',
       'Send, reply, and forward emails safely',
       'Recognize and avoid email scams'
     ],
     activities: [
       'Hands-on email account creation (Gmail or similar)',
       'Practice sending emails to other workshop participants',
       'Learn to recognize suspicious emails and phishing attempts',
       'Set up basic email organization folders'
     ],
     resources: [
       'Email safety checklist for take-home reference',
       'Password creation guidelines',
       'Common email scam examples and warning signs'
     ]
   },
   {
     id: 'online-forms',
     title: 'Online Forms and Applications',
     duration: '30 minutes',
     objectives: [
       'Navigate common online form layouts',
       'Complete forms accurately and safely',
       'Understand privacy policies and data sharing',
       'Save and retrieve form information'
     ],
     activities: [
       'Practice with sample government and service forms',
       'Learn about required vs optional fields',
       'Understand terms and conditions basics',
       'Practice using autofill features safely'
     ],
     resources: [
       'Form completion checklist',
       'Guide to common form field types',
       'Privacy policy key terms explanation'
     ]
   },
   {
     id: 'internet-safety',
     title: 'Internet Safety Fundamentals',
     duration: '30 minutes',
     objectives: [
       'Create secure passwords and understand two-factor authentication',
       'Recognize secure websites and safe browsing practices',
       'Understand privacy settings and personal information protection',
       'Know how to report suspicious online activity'
     ],
     activities: [
       'Password strength testing and creation practice',
       'Identify secure vs unsecure websites',
       'Review privacy settings on common websites',
       'Learn to spot fake websites and online scams'
     ],
     resources: [
       'Internet safety quick reference card',
       'Password manager recommendations (free options)',
       'Scam reporting contact information'
     ]
   },
   {
     id: 'practical-navigation',
     title: 'Website Navigation and Search',
     duration: '30 minutes',
     objectives: [
       'Use search engines effectively for finding information',
       'Navigate common website layouts and menus',
       'Understand web addresses and bookmarking',
       'Access government and local services online'
     ],
     activities: [
       'Guided practice accessing NHS, council, and benefit websites',
       'Learn effective search techniques and keywords',
       'Practice bookmarking useful websites',
       'Troubleshoot common navigation problems'
     ],
     resources: [
       'Useful local websites list',
       'Search tips and techniques guide',
       'Bookmark organization suggestions'
     ]
   }
 ];

 const practicalInfo = {
   whatToBring: [
     'Notebook and pen for taking notes',
     'Reading glasses if needed',
     'Personal email address ideas (can create during workshop)',
     'Any specific websites or services you want to access'
   ],
   equipmentProvided: [
     'Desktop computer with internet access',
     'All necessary software already installed',
     'Printed handouts and reference materials',
     'Technical support throughout session'
   ],
   followUpSupport: [
     'Take-home reference materials for all topics covered',
     'WhatsApp group for questions and peer support',
     'Library computer booking information for practice',
     'Preparation information for Q2 Creative Media workshop'
   ]
 };

 const commonConcerns = [
   {
     concern: 'I\'ve never used a computer before',
     response: 'Perfect! This workshop starts with absolute basics. Our volunteer leaders are experienced with complete beginners and will provide patient, individual guidance.'
   },
   {
     concern: 'What if I can\'t keep up with the group?',
     response: 'With maximum 15 participants and multiple volunteers, everyone gets individual attention. We progress at a pace that works for the whole group.'
   },
   {
     concern: 'I\'m worried about online safety and scams',
     response: 'Internet safety is a major focus of this workshop. You\'ll learn practical skills to protect yourself and recognize common scams before they affect you.'
   },
   {
     concern: 'Do I need my own computer or email address?',
     response: 'No equipment needed - everything is provided. We can help you create email addresses during the workshop, or work with existing accounts if you prefer.'
   }
 ];

 return (
   <div className="q1-workshop-content">
     <div className="workshop-header bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h1 className="text-3xl font-bold text-blue-400 mb-4">{workshopOverview.title}</h1>
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

     <div className="learning-modules mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
       
       <div className="module-selector flex gap-2 mb-6 flex-wrap">
         {learningModules.map(module => (
           <button
             key={module.id}
             onClick={() => setSelectedModule(selectedModule === module.id ? '' : module.id)}
             className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
               selectedModule === module.id
                 ? 'bg-blue-600 text-white border-blue-600'
                 : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-blue-400'
             }`}
           >
             {module.title}
           </button>
         ))}
       </div>

       <div className="modules-overview grid md:grid-cols-2 gap-4 mb-6">
         {learningModules.map(module => (
           <div key={module.id} className="bg-slate-800 p-4 rounded border border-slate-700">
             <h4 className="font-bold text-blue-400 mb-1">{module.title}</h4>
             <p className="text-gray-300 text-sm">{module.duration}</p>
           </div>
         ))}
       </div>

       {selectedModule && (
         <div className="module-detail bg-slate-800 rounded-lg p-6 border border-slate-700">
           {(() => {
             const module = learningModules.find(m => m.id === selectedModule);
             if (!module) return null;
             
             return (
               <>
                 <h3 className="text-2xl font-bold text-blue-400 mb-4">{module.title}</h3>
                 <p className="text-purple-400 font-semibold mb-4">{module.duration}</p>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-2">Learning Objectives</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.objectives.map((objective, index) => (
                         <li key={index}>• {objective}</li>
                       ))}
                     </ul>
                   </div>
                   
                   <div>
                     <h4 className="text-lg font-semibold text-white mb-2">Workshop Activities</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.activities.map((activity, index) => (
                         <li key={index}>• {activity}</li>
                       ))}
                     </ul>
                   </div>
                 </div>
                 
                 <div className="mt-4">
                   <h4 className="text-lg font-semibold text-white mb-2">Take-Home Resources</h4>
                   <ul className="text-gray-300 text-sm space-y-1">
                     {module.resources.map((resource, index) => (
                       <li key={index}>• {resource}</li>
                     ))}
                   </ul>
                 </div>
               </>
             );
           })()}
         </div>
       )}
     </div>

     <div className="practical-information mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Practical Information</h2>
       
       <div className="grid md:grid-cols-3 gap-6">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-green-400 mb-3">What to Bring</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.whatToBring.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-blue-400 mb-3">Equipment Provided</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.equipmentProvided.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-purple-400 mb-3">Follow-Up Support</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.followUpSupport.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
       </div>
     </div>

     <div className="common-concerns">
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
           Ready to start your digital literacy journey with practical, everyday skills?
         </p>
         <button className="btn btn-primary px-8 py-3">
           Register for Q1: Digital Basics Workshop
         </button>
       </div>
     </div>
   </div>
 );
};

export default Q1DigitalBasicsWorkshop;