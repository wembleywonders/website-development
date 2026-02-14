// src/pages/start-journey/index.tsx
import React, { useState } from 'react';

interface LearningPath {
 id: string;
 title: string;
 description: string;
 suitableFor: string[];
 startingPoint: string;
 progression: string[];
 timeCommitment: string;
 cost: string;
}

interface AssessmentQuestion {
 id: string;
 question: string;
 options: { value: string; label: string }[];
}

const StartJourneyPage: React.FC = () => {
 const [currentStep, setCurrentStep] = useState<'welcome' | 'assessment' | 'results'>('welcome');
 const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
 const [recommendedPath, setRecommendedPath] = useState<string>('');

 const learningPaths: LearningPath[] = [
   {
     id: 'complete-beginner',
     title: 'Complete Beginner Path',
     description: 'Start with absolute basics and build confidence with technology step by step.',
     suitableFor: [
       'Never used email or internet regularly',
       'Uncomfortable with computers or smartphones', 
       'Want to learn basic digital skills for daily life',
       'Prefer patient, supportive learning environment'
     ],
     startingPoint: 'Q1: Digital Basics Workshop (March)',
     progression: [
       'Q1: Master email, forms, online safety',
       'Q2: Try creative activities like recording family stories',
       'Q3: Optional STEM workshop if interested in learning more',
       'Q4: Digital heritage preservation with family photos/stories'
     ],
     timeCommitment: '2-3 hours per quarter, self-paced practice at home',
     cost: '£50 per workshop attended'
   },
   {
     id: 'some-experience',
     title: 'Building on Basics Path',
     description: 'You use some technology but want to expand skills and try new activities.',
     suitableFor: [
       'Comfortable with email and basic internet use',
       'Want to learn creative or technical skills',
       'Interested in family history or community projects',
       'Ready for more hands-on learning activities'
     ],
     startingPoint: 'Q2: Creative Media Workshop (June) or Q3: STEM Fundamentals (September)',
     progression: [
       'Choose workshops based on interests',
       'Q2: Podcasting and video editing skills',
       'Q3: Basic coding and electronics projects',
       'Q4: Digital preservation and community heritage'
     ],
     timeCommitment: '2-3 hours per chosen workshop, optional practice between sessions',
     cost: '£50 per workshop, discounts available for multiple workshops'
   },
   {
     id: 'confidence-building',
     title: 'Confidence Building Path',
     description: 'You have some tech skills but want supportive environment to try new things.',
     suitableFor: [
       'Know basics but lack confidence trying new technology',
       'Want peer support and encouragement',
       'Interested in helping others once comfortable',
       'Prefer learning in small, friendly groups'
     ],
     startingPoint: 'Any workshop that interests you most',
     progression: [
       'Join workshops based on personal interests',
       'Participate in peer support groups between sessions',
       'Consider volunteering as workshop assistant after attending',
       'Help mentor other community members'
     ],
     timeCommitment: 'Flexible - attend workshops of interest, join peer groups as desired',
     cost: '£50 per workshop, family members £25 each'
   },
   {
     id: 'family-learning',
     title: 'Family Learning Path',
     description: 'Learn together as a family and support each other with technology.',
     suitableFor: [
       'Parents wanting to learn alongside children',
       'Families with mixed technology skill levels',
       'Multi-generational learning situations',
       'Need childcare coordination for participation'
     ],
     startingPoint: 'Q1: Digital Basics or Q4: Heritage workshops work well for families',
     progression: [
       'Coordinate childcare for parent participation',
       'Include family members in age-appropriate activities',
       'Practice skills together at home between workshops',
       'Work on family projects like digital photo organization'
     ],
     timeCommitment: '2-3 hours per workshop plus family practice time',
     cost: 'Primary participant £50, additional family members £25 each'
   }
 ];

 const assessmentQuestions: AssessmentQuestion[] = [
   {
     id: 'current-comfort',
     question: 'How comfortable are you with basic technology like email and internet browsing?',
     options: [
       { value: 'very-uncomfortable', label: 'Very uncomfortable - avoid when possible' },
       { value: 'somewhat-uncomfortable', label: 'Somewhat uncomfortable - can do basics with help' },
       { value: 'comfortable-basics', label: 'Comfortable with basics - email, simple web browsing' },
       { value: 'quite-comfortable', label: 'Quite comfortable - use various apps and websites' }
     ]
   },
   {
     id: 'learning-goals',
     question: 'What would you most like to learn or improve?',
     options: [
       { value: 'basic-skills', label: 'Basic skills - email, forms, staying safe online' },
       { value: 'creative-skills', label: 'Creative skills - recording, editing, making content' },
       { value: 'technical-skills', label: 'Technical skills - understanding how technology works' },
       { value: 'family-projects', label: 'Family projects - preserving memories, sharing stories' }
     ]
   },
   {
     id: 'learning-style',
     question: 'What kind of learning environment works best for you?',
     options: [
       { value: 'patient-support', label: 'Very patient, supportive environment with lots of individual help' },
       { value: 'small-group', label: 'Small group where I can ask questions and learn from others' },
       { value: 'hands-on', label: 'Hands-on activities where I can practice and experiment' },
       { value: 'family-friendly', label: 'Family-friendly where I can bring family members' }
     ]
   },
   {
     id: 'time-availability',
     question: 'How much time can you realistically commit to learning?',
     options: [
       { value: 'minimal-time', label: 'Very limited - just the workshop session itself' },
       { value: 'some-practice', label: 'Workshop plus some practice time at home' },
       { value: 'regular-practice', label: 'Workshop plus regular practice between sessions' },
       { value: 'community-involvement', label: 'Workshop plus community activities and peer support' }
     ]
   }
 ];

 const determineRecommendation = (answers: Record<string, string>): string => {
   const comfort = answers['current-comfort'];
   const goals = answers['learning-goals'];
   const style = answers['learning-style'];
   
   if (comfort === 'very-uncomfortable' || style === 'patient-support') {
     return 'complete-beginner';
   }
   
   if (style === 'family-friendly' || goals === 'family-projects') {
     return 'family-learning';
   }
   
   if (comfort === 'comfortable-basics' || comfort === 'quite-comfortable') {
     return 'some-experience';
   }
   
   return 'confidence-building';
 };

 const handleAssessmentSubmit = () => {
   const recommendation = determineRecommendation(assessmentAnswers);
   setRecommendedPath(recommendation);
   setCurrentStep('results');
 };

 const nextSteps = {
   immediate: [
     'Review the recommended learning path details',
     'Check upcoming workshop dates and availability',
     'Consider your budget and time commitments',
     'Identify any support needs (childcare, transport, equipment)'
   ],
   registration: [
     'Register for your chosen first workshop through Eventbrite',
     'Join the workshop WhatsApp group for updates',
     'Prepare materials list for your workshop',
     'Contact organizers about any accessibility needs'
   ],
   preparation: [
     'Review basic workshop information and location',
     'Arrange transportation and any necessary childcare',
     'Gather recommended materials or arrange equipment access',
     'Set realistic expectations for your first workshop experience'
   ]
 };

 return (
   <div className="min-h-screen">
     <div className="animated-bg">
       <div className="bg-orb"></div>
       <div className="bg-orb"></div>
     </div>
     
     
     <main className="framework-section">
       <div className="framework-content">
         {currentStep === 'welcome' && (
           <>
             <div className="hero-content text-center mb-8">
               <div className="hero-badge fade-in">
                 <span>🚀</span>
                 Start Your Journey
               </div>
               
               <h1 className="hero-title fade-in">
                 Find Your Digital Learning Path
               </h1>
               
               <p className="hero-subtitle fade-in">
                 Discover which quarterly workshops match your current skills, interests, and learning goals.
               </p>
             </div>

             <div className="welcome-options text-center mb-12">
               <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                 <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                   <h3 className="text-xl font-bold text-blue-400 mb-4">Take Quick Assessment</h3>
                   <p className="text-gray-300 mb-6">
                     Answer a few questions to get personalized workshop recommendations based on your experience and goals.
                   </p>
                   <button 
                     onClick={() => setCurrentStep('assessment')}
                     className="btn btn-primary w-full"
                   >
                     Start Assessment (2 minutes)
                   </button>
                 </div>
                 
                 <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                   <h3 className="text-xl font-bold text-green-400 mb-4">Browse All Paths</h3>
                   <p className="text-gray-300 mb-6">
                     Review all available learning paths and choose the one that best matches your situation.
                   </p>
                   <button 
                     onClick={() => setCurrentStep('results')}
                     className="btn btn-secondary w-full"
                   >
                     View All Options
                   </button>
                 </div>
               </div>
             </div>
           </>
         )}

         {currentStep === 'assessment' && (
           <div className="assessment-section max-w-3xl mx-auto">
             <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-white mb-4">Quick Learning Assessment</h2>
               <p className="text-gray-300">Answer these questions to find your best learning path</p>
             </div>
             
             <div className="space-y-8">
               {assessmentQuestions.map((question, index) => (
                 <div key={question.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                   <h3 className="text-lg font-semibold text-white mb-4">
                     {index + 1}. {question.question}
                   </h3>
                   <div className="space-y-3">
                     {question.options.map(option => (
                       <label key={option.value} className="flex items-center cursor-pointer">
                         <input
                           type="radio"
                           name={question.id}
                           value={option.value}
                           onChange={(e) => setAssessmentAnswers({
                             ...assessmentAnswers,
                             [question.id]: e.target.value
                           })}
                           className="mr-3"
                         />
                         <span className="text-gray-300">{option.label}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
             
             <div className="text-center mt-8">
               <button
                 onClick={handleAssessmentSubmit}
                 disabled={Object.keys(assessmentAnswers).length !== assessmentQuestions.length}
                 className="btn btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Get My Recommendations
               </button>
             </div>
           </div>
         )}

         {currentStep === 'results' && (
           <>
             {recommendedPath && (
               <div className="recommendation-section mb-12">
                 <div className="text-center mb-6">
                   <h2 className="text-3xl font-bold text-green-400 mb-2">Recommended Path</h2>
                   <p className="text-gray-300">Based on your assessment responses</p>
                 </div>
                 
                 <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6 mb-8">
                   {(() => {
                     const path = learningPaths.find(p => p.id === recommendedPath);
                     return path ? (
                       <>
                         <h3 className="text-2xl font-bold text-green-400 mb-3">{path.title}</h3>
                         <p className="text-gray-300 mb-4">{path.description}</p>
                         <div className="grid md:grid-cols-2 gap-4">
                           <div>
                             <h4 className="font-semibold text-white mb-2">Starting Point</h4>
                             <p className="text-gray-300 text-sm">{path.startingPoint}</p>
                           </div>
                           <div>
                             <h4 className="font-semibold text-white mb-2">Time & Cost</h4>
                             <p className="text-gray-300 text-sm">{path.timeCommitment}</p>
                             <p className="text-gray-300 text-sm">{path.cost}</p>
                           </div>
                         </div>
                       </>
                     ) : null;
                   })()}
                 </div>
               </div>
             )}

             <div className="all-paths-section">
               <h2 className="section-title text-center">All Learning Paths</h2>
               <p className="section-subtitle text-center mb-8">
                 Choose the path that best matches your situation and goals
               </p>
               
               <div className="grid gap-8">
                 {learningPaths.map(path => (
                   <div 
                     key={path.id} 
                     className={`bg-slate-800 rounded-lg p-6 border transition-all ${
                       path.id === recommendedPath 
                         ? 'border-green-600/50 bg-green-900/10' 
                         : 'border-slate-700'
                     }`}
                   >
                     <div className="flex justify-between items-start mb-4">
                       <h3 className="text-2xl font-bold text-blue-400">{path.title}</h3>
                       {path.id === recommendedPath && (
                         <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                           Recommended
                         </span>
                       )}
                     </div>
                     
                     <p className="text-gray-300 mb-6">{path.description}</p>
                     
                     <div className="grid md:grid-cols-2 gap-6">
                       <div>
                         <h4 className="text-lg font-semibold text-white mb-2">This path is suitable if you:</h4>
                         <ul className="text-gray-300 text-sm space-y-1">
                           {path.suitableFor.map((item, index) => (
                             <li key={index}>• {item}</li>
                           ))}
                         </ul>
                       </div>
                       
                       <div>
                         <h4 className="text-lg font-semibold text-white mb-2">Learning Progression</h4>
                         <ul className="text-gray-300 text-sm space-y-1">
                           {path.progression.map((item, index) => (
                             <li key={index}>• {item}</li>
                           ))}
                         </ul>
                       </div>
                     </div>
                     
                     <div className="grid md:grid-cols-2 gap-4 mt-6">
                       <div className="bg-slate-700 p-3 rounded">
                         <h5 className="font-semibold text-white text-sm">Starting Point</h5>
                         <p className="text-gray-300 text-sm">{path.startingPoint}</p>
                       </div>
                       <div className="bg-slate-700 p-3 rounded">
                         <h5 className="font-semibold text-white text-sm">Commitment & Cost</h5>
                         <p className="text-gray-300 text-sm">{path.timeCommitment}</p>
                         <p className="text-gray-300 text-sm">{path.cost}</p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             <div className="next-steps-section mt-12">
               <h2 className="section-title text-center">Ready to Start?</h2>
               
               <div className="grid md:grid-cols-3 gap-6 mt-8">
                 <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                   <h3 className="text-lg font-bold text-purple-400 mb-4">1. Plan & Prepare</h3>
                   <ul className="text-gray-300 text-sm space-y-2">
                     {nextSteps.immediate.map((step, index) => (
                       <li key={index}>• {step}</li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                   <h3 className="text-lg font-bold text-blue-400 mb-4">2. Register</h3>
                   <ul className="text-gray-300 text-sm space-y-2">
                     {nextSteps.registration.map((step, index) => (
                       <li key={index}>• {step}</li>
                     ))}
                   </ul>
                 </div>
                 
                 <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                   <h3 className="text-lg font-bold text-green-400 mb-4">3. Get Ready</h3>
                   <ul className="text-gray-300 text-sm space-y-2">
                     {nextSteps.preparation.map((step, index) => (
                       <li key={index}>• {step}</li>
                     ))}
                   </ul>
                 </div>
               </div>
               
               <div className="text-center mt-8">
                 <a href="/workshops" className="btn btn-primary px-8 py-3">
                   View Workshop Schedule
                 </a>
               </div>
             </div>
           </>
         )}
       </div>
     </main>
   </div>
 );
};

export default StartJourneyPage;