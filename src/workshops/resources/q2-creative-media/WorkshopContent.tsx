// src/workshops/resources/q2-creative-media/WorkshopContent.tsx
import React, { useState } from 'react';

interface CreativeModule {
 id: string;
 title: string;
 duration: string;
 objectives: string[];
 activities: string[];
 equipment: string[];
 outcomes: string[];
}

const Q2CreativeMediaWorkshop: React.FC = () => {
 const [selectedModule, setSelectedModule] = useState<string>('');

 const workshopOverview = {
   title: 'Q2: Creative Media Workshop',
   duration: '2 hours (2pm-4pm)',
   maxParticipants: 15,
   leaders: ['Local DJs', 'Community Radio Presenters', 'Marketing Specialist'],
   venue: 'Wembley Wonders CIC (audio equipment available)',
   cost: '£50 per participant',
   prerequisites: 'Basic computer navigation helpful but not essential. Q1 Digital Basics recommended but not required.'
 };

 const creativeModules: CreativeModule[] = [
   {
     id: 'audio-recording',
     title: 'Audio Recording Basics',
     duration: '30 minutes',
     objectives: [
       'Record clear audio using smartphone or basic equipment',
       'Understand microphone placement and room acoustics',
       'Learn basic recording techniques for interviews and stories',
       'Recognize good vs poor audio quality'
     ],
     activities: [
       'Practice recording with smartphones and basic microphones',
       'Record short interviews with other participants',
       'Test different recording environments in the venue',
       'Listen to and evaluate audio quality together'
     ],
     equipment: [
       'Smartphones (participants bring own)',
       'Basic USB microphones (provided)',
       'Headphones for monitoring (provided)',
       'Quiet recording spaces within venue'
     ],
     outcomes: [
       'Confidence recording family conversations or stories',
       'Understanding of basic audio quality principles',
       'Practical skills for capturing clear speech'
     ]
   },
   {
     id: 'podcast-editing',
     title: 'Simple Podcast Creation',
     duration: '40 minutes',
     objectives: [
       'Edit audio recordings using free software',
       'Add simple intro/outro music or sounds',
       'Combine multiple audio clips into one file',
       'Export audio in common formats for sharing'
     ],
     activities: [
       'Hands-on editing with Audacity (free software)',
       'Practice cutting and joining audio clips',
       'Add background music at appropriate levels',
       'Create short family podcast or story episode'
     ],
     equipment: [
       'Computers with Audacity installed',
       'Audio files recorded in first session',
       'Royalty-free music library',
       'Headphones for editing work'
     ],
     outcomes: [
       'Basic podcast editing skills',
       'Understanding of audio layering and mixing',
       'Completed short audio project to take home'
     ]
   },
   {
     id: 'video-basics',
     title: 'Basic Video Skills',
     duration: '30 minutes',
     objectives: [
       'Record steady video using smartphones',
       'Understand basic composition and lighting',
       'Learn simple video editing principles',
       'Create short family-friendly video content'
     ],
     activities: [
       'Practice filming techniques with smartphones',
       'Learn about framing and basic shot composition',
       'Simple video editing demonstration',
       'Create short video messages or family greetings'
     ],
     equipment: [
       'Smartphones with video capability',
       'Basic tripods or phone holders',
       'Computers with simple video editing software',
       'Good lighting areas within venue'
     ],
     outcomes: [
       'Improved smartphone video recording skills',
       'Understanding of basic video composition',
       'Simple video editing familiarity'
     ]
   },
   {
     id: 'sharing-platforms',
     title: 'Sharing and Publishing',
     duration: '20 minutes',
     objectives: [
       'Understand different platforms for sharing media content',
       'Learn about privacy settings and audience control',
       'Practice uploading and sharing created content',
       'Understand file formats and sizes for different uses'
     ],
     activities: [
       'Overview of platforms like YouTube, WhatsApp, email sharing',
       'Practice uploading content with appropriate privacy settings',
       'Learn to share files via different methods',
       'Discuss family-appropriate sharing strategies'
     ],
     equipment: [
       'Computers with internet access',
       'Created audio/video files from earlier activities',
       'Various platform accounts (demonstration only)',
       'File compression tools if needed'
     ],
     outcomes: [
       'Confidence sharing media with family and friends',
       'Understanding of privacy considerations',
       'Knowledge of appropriate sharing platforms'
     ]
   }
 ];

 const practicalInfo = {
   whatToBring: [
     'Smartphone with recording capability',
     'Headphones (basic earbuds acceptable)',
     'Ideas for audio content - family stories, interviews, messages',
     'Notebook for planning content ideas'
   ],
   equipmentProvided: [
     'Computers with editing software installed',
     'USB microphones for improved audio quality',
     'Headphones for editing and monitoring',
     'Basic tripods and phone holders for video'
   ],
   skillsRequired: [
     'Comfortable using smartphone for basic functions',
     'Willing to experiment with new software',
     'Interest in creating content for family or community',
     'Patience with learning technical processes'
   ],
   followUpResources: [
     'Free software recommendations and download links',
     'Basic editing tutorial guides for home practice',
     'Royalty-free music and sound effect resources',
     'Community media sharing opportunities'
   ]
 };

 const creativeProjects = [
   {
     project: 'Family Story Podcast',
     description: 'Record and edit interviews with family members about their experiences and memories',
     timeNeeded: 'Can be started in workshop, completed at home with family'
   },
   {
     project: 'Community Voice Messages',
     description: 'Create audio messages about local issues or community celebrations',
     timeNeeded: 'Complete basic version during workshop session'
   },
   {
     project: 'Simple Video Greetings',
     description: 'Make video messages for distant family members or friends',
     timeNeeded: 'Learn techniques in workshop, create content at home'
   },
   {
     project: 'Local History Audio',
     description: 'Record stories about local area changes and community memories',
     timeNeeded: 'Workshop provides skills, content creation ongoing'
   }
 ];

 const realExpectations = [
   {
     expectation: 'Professional-quality podcast production',
     reality: 'You\'ll learn basic editing skills to create clear, listenable audio content for family and community sharing. Professional polish takes extensive practice.'
   },
   {
     expectation: 'Immediate mastery of video editing',
     reality: 'Workshop covers smartphone video basics and simple editing concepts. Advanced video skills require additional learning and practice.'
   },
   {
     expectation: 'Viral content creation strategies',
     reality: 'Focus is on creating meaningful content for family and local community, not social media marketing or viral content techniques.'
   },
   {
     expectation: 'Expensive equipment requirements',
     reality: 'Most activities use smartphones and free software. Optional equipment upgrades discussed but not required for basic creative media skills.'
   }
 ];

 return (
   <div className="q2-workshop-content">
     <div className="workshop-header bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h1 className="text-3xl font-bold text-purple-400 mb-4">{workshopOverview.title}</h1>
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

     <div className="creative-modules mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Workshop Modules</h2>
       
       <div className="module-selector flex gap-2 mb-6 flex-wrap">
         {creativeModules.map(module => (
           <button
             key={module.id}
             onClick={() => setSelectedModule(selectedModule === module.id ? '' : module.id)}
             className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
               selectedModule === module.id
                 ? 'bg-purple-600 text-white border-purple-600'
                 : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-purple-400'
             }`}
           >
             {module.title}
           </button>
         ))}
       </div>

       <div className="modules-overview grid md:grid-cols-2 gap-4 mb-6">
         {creativeModules.map(module => (
           <div key={module.id} className="bg-slate-800 p-4 rounded border border-slate-700">
             <h4 className="font-bold text-purple-400 mb-1">{module.title}</h4>
             <p className="text-gray-300 text-sm">{module.duration}</p>
           </div>
         ))}
       </div>

       {selectedModule && (
         <div className="module-detail bg-slate-800 rounded-lg p-6 border border-slate-700">
           {(() => {
             const module = creativeModules.find(m => m.id === selectedModule);
             if (!module) return null;
             
             return (
               <>
                 <h3 className="text-2xl font-bold text-purple-400 mb-4">{module.title}</h3>
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
                     <h4 className="text-lg font-semibold text-white mb-2">Equipment Used</h4>
                     <ul className="text-gray-300 text-sm space-y-1">
                       {module.equipment.map((item, index) => (
                         <li key={index}>• {item}</li>
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

     <div className="practical-information mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">What to Expect</h2>
       
       <div className="grid md:grid-cols-2 gap-6 mb-6">
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
       </div>
       
       <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-yellow-400 mb-3">Helpful Skills</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.skillsRequired.map((skill, index) => (
               <li key={index}>• {skill}</li>
             ))}
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-purple-400 mb-3">Take-Home Resources</h3>
           <ul className="text-gray-300 text-sm space-y-1">
             {practicalInfo.followUpResources.map((resource, index) => (
               <li key={index}>• {resource}</li>
             ))}
           </ul>
         </div>
       </div>
     </div>

     <div className="creative-projects mb-8">
       <h2 className="text-2xl font-bold text-white mb-6">Project Ideas</h2>
       <p className="text-gray-300 mb-6">
         Examples of creative projects you could start during the workshop and continue at home:
       </p>
       
       <div className="grid md:grid-cols-2 gap-4">
         {creativeProjects.map((project, index) => (
           <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
             <h4 className="font-bold text-purple-400 mb-2">{project.project}</h4>
             <p className="text-gray-300 text-sm mb-2">{project.description}</p>
             <p className="text-blue-400 text-xs">{project.timeNeeded}</p>
           </div>
         ))}
       </div>
     </div>

     <div className="realistic-expectations">
       <h2 className="text-2xl font-bold text-white mb-6">Setting Realistic Expectations</h2>
       
       <div className="space-y-4">
         {realExpectations.map((item, index) => (
           <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
             <h4 className="font-bold text-red-400 mb-2">Expectation: {item.expectation}</h4>
             <p className="text-gray-300"><strong>Reality:</strong> {item.reality}</p>
           </div>
         ))}
       </div>
       
       <div className="text-center mt-8">
         <p className="text-gray-300 mb-4">
           Ready to explore creative media skills in a supportive, hands-on environment?
         </p>
         <button className="btn btn-primary px-8 py-3">
           Register for Q2: Creative Media Workshop
         </button>
       </div>
     </div>
   </div>
 );
};

export default Q2CreativeMediaWorkshop;