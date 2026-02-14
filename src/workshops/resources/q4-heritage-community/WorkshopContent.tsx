// src/workshops/resources/q4-heritage-community/WorkshopContent.tsx
import React, { useState } from 'react';

interface HeritageModule {
 id: string;
 title: string;
 duration: string;
 objectives: string[];
 activities: string[];
 materials: string[];
 outcomes: string[];
}

const Q4HeritageWorkshop: React.FC = () => {
 const [selectedModule, setSelectedModule] = useState<string>('');

 const workshopOverview = {
   title: 'Q4: Heritage & Community Workshop',
   duration: '2 hours (1pm-3pm)',
   maxParticipants: 15,
   leaders: ['Child Development Specialist', 'Community History Volunteers'],
   venue: 'Wembley Central Library with family-friendly setup',
   cost: '£50 per participant (family members £25 each)',
   prerequisites: 'Basic digital skills from previous workshops or equivalent experience recommended'
 };

 const heritageModules: HeritageModule[] = [
   {
     id: 'story-collection',
     title: 'Family Story Documentation',
     duration: '40 minutes',
     objectives: [
       'Learn techniques for interviewing older family members',
       'Record family stories using smartphones or digital devices',
       'Organize family memories chronologically',
       'Create respectful documentation of personal histories'
     ],
     activities: [
       'Practice interview techniques with other participants',
       'Record sample family story segments using provided questions',
       'Learn to ask open-ended questions that encourage storytelling',
       'Discuss sensitive approaches to family history documentation'
     ],
     materials: [
       'Smartphones for recording (participants bring own)',
       'Interview question templates for different family relationships',
       'Recording apps demonstration and setup',
       'Family story timeline worksheets'
     ],
     outcomes: [
       'Confidence interviewing family members about their experiences',
       'Recorded practice interview to review and improve technique',
       'Understanding of respectful family history documentation'
     ]
   },
   {
     id: 'photo-digitization',
     title: 'Digital Photo Preservation',
     duration: '30 minutes',
     objectives: [
       'Safely digitize old family photographs using smartphones',
       'Organize digital photos with proper naming and dating',
       'Understand basic photo storage and backup principles',
       'Preserve photo quality during digitization process'
     ],
     activities: [
       'Practice photographing old photos with smartphones',
       'Learn proper lighting and angle techniques for best results',
       'Organize photos using simple folder structures',
       'Discuss backup options for family photo collections'
     ],
     materials: [
       'Sample old photographs (provided and participant-brought)',
       'Smartphone photography setup with good lighting',
       'Photo organization templates and naming conventions',
       'Information about cloud storage options for families'
     ],
     outcomes: [
       'Practical skills for preserving family photographs',
       'Understanding of photo organization and backup',
       'Sample digitized photos to take home'
     ]
   },
   {
     id: 'digital-archiving',
     title: 'Simple Digital Archiving',
     duration: '30 minutes',
     objectives: [
       'Create organized digital folders for family materials',
       'Understand basic file naming for easy retrieval',
       'Learn simple backup strategies for important documents',
       'Connect digital preservation to physical document care'
     ],
     activities: [
       'Set up family archive folder structure on provided computers',
       'Practice consistent file naming for photos and recordings',
       'Explore free cloud storage options suitable for families',
       'Create backup checklist for family digital materials'
     ],
     materials: [
       'Computers with simple folder creation access',
       'USB drives for participants to take sample archives home',
       'File naming convention templates',
       'Backup strategy worksheets for different family needs'
     ],
     outcomes: [
       'Basic digital organization skills for family materials',
       'Understanding of simple backup principles',
       'Started family digital archive to continue at home'
     ]
   },
   {
     id: 'community-connections',
     title: 'Community Heritage Projects',
     duration: '20 minutes',
     objectives: [
       'Connect family stories to broader community history',
       'Learn about local history preservation efforts',
       'Understand how to contribute to community heritage projects',
       'Identify opportunities for ongoing involvement'
     ],
     activities: [
       'Discussion of local history projects and community archives',
       'Explore connections between family stories and neighborhood changes',
       'Information about local history groups and volunteer opportunities',
       'Planning next steps for community heritage involvement'
     ],
     materials: [
       'Information about local history societies and projects',
       'Examples of community heritage initiatives',
       'Contact details for ongoing community history work',
       'Calendar of local heritage events and meetings'
     ],
     outcomes: [
       'Awareness of local community history initiatives',
       'Understanding of how family stories contribute to community heritage',
       'Connections for continued involvement in local history preservation'
     ]
   }
 ];

 const familyConsiderations = {
   sensitiveApproaches: [
     'Respect family members who prefer not to be recorded',
     'Handle difficult family histories with care and sensitivity',
     'Understand cultural differences in sharing family information',
     'Navigate family disagreements about what stories to preserve'
   ],
   practicalChallenges: [
     'Work with elderly family members who may have hearing difficulties',
     'Manage time constraints when family members have limited availability',
     'Handle technical difficulties during recording sessions',
     'Balance different family perspectives on the same events'
   ],
   ethicalGuidelines: [
     'Always ask permission before recording or photographing',
     'Respect privacy concerns about sharing family information',
     'Understand consent for digital preservation and potential sharing',
     'Handle family documents and photos with appropriate care'
   ]
 };

 const practicalInfo = {
   whatToBring: [
     'Family photos or documents for digitization practice',
     'Smartphone for recording (essential for activities)',
     'USB storage device if available (provided otherwise)',
     'List of family members you would like to interview'
   ],
   familyParticipation: [
     'Workshop designed to accommodate family groups',
     'Childcare coordination available with advance notice',
     'Activities suitable for teenagers to participate alongside adults',
     'Take-home materials designed for family collaboration'
   ],
   followUpSupport: [
     'Family interview question templates for different relationships',
     'Digital organization guides for ongoing family archive development',
     'Connection to local history groups for community involvement',
     'Peer support group for families working on heritage projects'
   ]
 };

 const realisticExpectations = [
   {
     skill: 'Family Interview Skills',
     realistic: 'Learn techniques for encouraging family storytelling and basic recording using smartphones',
     limitations: 'Professional oral history skills require extensive training in interviewing techniques and historical methodology'
   },
   {
     skill: 'Digital Preservation',
     realistic: 'Basic photo digitization and simple file organization suitable for family use',
     limitations: 'Professional archival standards and long-term preservation require specialized knowledge and equipment'
   },
   {
     skill: 'Community Heritage',
     realistic: 'Understanding of how family stories connect to local history and available community projects',
     limitations: 'Contributing to formal historical research requires additional training and institutional collaboration'
   },
   {
     skill: 'Family Engagement',
     realistic: 'Practical approaches for respectful family history documentation within existing family relationships',
     limitations: 'Resolving complex family dynamics or historical trauma requires professional counseling support'
   }
 ];

 const commonConcerns = [
   {
     concern: 'My family doesn\'t like talking about the past',
     response: 'Workshop covers respectful approaches and starting with less sensitive topics. Child development specialist provides guidance on family communication strategies that respect boundaries.'
   },
   {
     concern: 'What if family stories contradict each other?',
     response: 'Different perspectives are normal in family history. Workshop teaches how to document multiple viewpoints respectfully rather than determining single "correct" versions.'
   },
   {
     concern: 'I\'m worried about family privacy and sharing personal information',
     response: 'Privacy and consent are major workshop focuses. You learn to create family archives for personal use without external sharing requirements.'
   },
   {
     concern: 'What if I discover difficult or upsetting family history?',
     response: 'Child development specialist provides guidance on handling sensitive family information appropriately and connecting with support resources when needed.'
   }
 ];

 return (
   <div className="q4-workshop-content">
     <div className="workshop-header bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h1 className="text-3xl font-bold text-orange-400 mb-4">{workshopOverview.title}</h1>
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

     <div className="heritage-modules mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Workshop Modules</h2>
       
       <div className="module-selector flex gap-2 mb-6 flex-wrap">
         {heritageModules.map(module => (
           <button
             key={module.id}
             onClick={() => setSelectedModule(selectedModule === module.id ? '' : module.id)}
             className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
               selectedModule === module.id
                 ? 'bg-orange-600 text-white border-orange-600'
                 : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-orange-400'
             }`}
           >
             {module.title}
           </button>
         ))}
       </div>

       <div className="modules-overview grid md:grid-cols-2 gap-4 mb-6">
         {heritageModules.map(module => (
           <div key={module.id} className="bg-slate-800 p-4 rounded border border-slate-700">
             <h4 className="font-bold text-orange-400 mb-1">{module.title}</h4>
             <p className="text-gray-300 text-sm">{module.duration}</p>
           </div>
         ))}
       </div>

       {selectedModule && (
         <div className="module-detail bg-slate-800 rounded-lg p-6 border border-slate-700">
           {(() => {
             const module = heritageModules.find(m => m.id === selectedModule);
             if (!module) return null;
             
             return (
               <>
                 <h3 className="text-2xl font-bold text-orange-400 mb-4">{module.title}</h3>
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
                     <h4 className="text-lg font-semibold text-white mb-2">Workshop Activities</h4>
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
                     <h4 className="text-lg font-semibold text-white mb-2">Practical Outcomes</h4>
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

     <div className="family-considerations mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Family-Centered Approach</h2>
       
       <div className="grid md:grid-cols-3 gap-6">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-green-400 mb-3">Sensitive Approaches</h3>
           <ul className="text-gray-300 text-sm space-y-2">
             {familyConsiderations.sensitiveApproaches.map((approach, index) => (
               <li key={index}>• {approach}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-yellow-400 mb-3">Practical Challenges</h3>
           <ul className="text-gray-300 text-sm space-y-2">
             {familyConsiderations.practicalChallenges.map((challenge, index) => (
               <li key={index}>• {challenge}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-purple-400 mb-3">Ethical Guidelines</h3>
           <ul className="text-gray-300 text-sm space-y-2">
             {familyConsiderations.ethicalGuidelines.map((guideline, index) => (
               <li key={index}>• {guideline}</li>
             ))}
           </ul>
         </div>
       </div>
     </div>

     <div className="practical-information mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Workshop Preparation</h2>
       
       <div className="grid md:grid-cols-3 gap-6">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-orange-400 mb-3">What to Bring</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.whatToBring.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-blue-400 mb-3">Family Participation</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.familyParticipation.map((item, index) => (
               <li key={index}>• {item}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-green-400 mb-3">Ongoing Support</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.followUpSupport.map((support, index) => (
               <li key={index}>• {support}</li>
             ))}
           </ul>
         </div>
       </div>
     </div>

     <div className="realistic-expectations mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Workshop Scope and Limitations</h2>
       
       <div className="space-y-4">
         {realisticExpectations.map((expectation, index) => (
           <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
             <h4 className="font-bold text-orange-400 mb-3">{expectation.skill}</h4>
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                 <h5 className="font-semibold text-white mb-2">Workshop Coverage:</h5>
                 <p className="text-gray-300 text-sm">{expectation.realistic}</p>
               </div>
               <div>
                 <h5 className="font-semibold text-red-400 mb-2">Beyond Workshop Scope:</h5>
                 <p className="text-gray-300 text-sm">{expectation.limitations}</p>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>

     <div className="common-questions">
       <h2 className="text-2xl font-bold text-white mb-6">Family History Concerns</h2>
       
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
           Ready to begin preserving your family stories with guidance from child development specialists?
         </p>
         <button className="btn btn-primary px-8 py-3">
           Register for Q4: Heritage & Community Workshop
         </button>
       </div>
     </div>
   </div>
 );
};

export default Q4HeritageWorkshop;
