// src/pages/family-support/index.tsx
import React, { useState } from 'react';

interface FamilySupport {
 id: string;
 title: string;
 description: string;
 supportProvided: string[];
 realExamples: string[];
 coordination: string;
 workshopConnection: string;
}

const FamilySupportPage: React.FC = () => {
 const [selectedSupport, setSelectedSupport] = useState('');

 const supportTypes: FamilySupport[] = [
   {
     id: 'childcare-coordination',
     title: 'Workshop Childcare Coordination',
     description: 'Organized childcare to enable parents to participate in quarterly digital skills workshops.',
     supportProvided: [
       'Volunteer childcare during 2-hour weekend workshop sessions',
       'Age-appropriate activities for children while parents attend workshops',
       'Safe, supervised space adjacent to workshop venues',
       'Coordination between parents to share childcare responsibilities'
     ],
     realExamples: [
       'Four parent volunteers rotate childcare duties across quarterly workshops',
       'Library children\'s area used for supervised activities during Digital Basics workshop',
       'Community centre provides separate room for children during Creative Media session',
       'Parents coordinate informal childcare swaps for workshop attendance'
     ],
     coordination: 'Pre-workshop coordination meetings with parent volunteers to schedule childcare coverage and activity planning.',
     workshopConnection: 'Removes primary barrier preventing parent participation in digital literacy learning'
   },
   {
     id: 'family-learning',
     title: 'Family Digital Skills Practice',
     description: 'Supporting families to practice and apply digital skills learned in workshops together at home.',
     supportProvided: [
       'Family-friendly follow-up activities based on workshop content',
       'Guidance for parents on involving children in digital literacy practice',
       'Resources for families without home computer access',
       'Tips for creating digital learning routines with children'
     ],
     realExamples: [
       'Q4 Heritage workshop participants document family stories with children\'s help',
       'Digital Basics graduates teach email skills to teenage children',
       'Creative Media participants create family podcasts as practice projects',
       'Parents use library computer time to practice workshop skills with children'
     ],
     coordination: 'Quarterly family learning resources shared through workshop WhatsApp groups and printed handouts.',
     workshopConnection: 'Extends workshop learning into family context, reinforcing skills through family practice'
   },
   {
     id: 'multi-generational-support',
     title: 'Multi-Generational Learning Support',
     description: 'Connecting different generations within families around digital literacy learning and skill sharing.',
     supportProvided: [
       'Pairing older adults attending workshops with tech-savvy family members',
       'Resources for younger family members to support older relatives\' learning',
       'Guidance for families bridging different comfort levels with technology',
       'Strategies for patient, supportive family learning environments'
     ],
     realExamples: [
       'Grandmother attending STEM workshop gets support from teenage grandchild',
       'Adult child helps elderly parent practice email skills learned in Digital Basics',
       'Families work together on digital heritage preservation projects',
       'Multi-generational families attend workshops together when possible'
     ],
     coordination: 'Family learning guides distributed during workshops with follow-up check-ins via phone calls.',
     workshopConnection: 'Creates family support systems that reinforce workshop learning beyond formal sessions'
   }
 ];

 const principles = [
   {
     title: 'Workshop-Focused Support',
     description: 'Family support activities directly enable workshop participation and extend workshop learning into family settings.',
     application: 'Support requests connect to specific barriers preventing workshop attendance or application of workshop skills at home.'
   },
   {
     title: 'Practical Barrier Removal',
     description: 'Focus on concrete obstacles like childcare, scheduling, and home practice rather than comprehensive family services.',
     application: 'Childcare coordination, family learning resources, and generational skill sharing address specific workshop participation needs.'
   },
   {
     title: 'Family Learning Enhancement',
     description: 'Strengthening family digital literacy through workshop participation rather than separate family programming.',
     application: 'Workshop skills get practiced and reinforced through family activities and multi-generational support systems.'
   },
   {
     title: 'Volunteer Capacity Alignment',
     description: 'Family support operates within realistic volunteer coordination capacity for quarterly workshop delivery.',
     application: 'Support coordination happens quarterly around workshop sessions rather than ongoing family case management.'
   }
 ];

 const challenges = [
   {
     title: 'Limited Childcare Resources',
     reality: 'Volunteer childcare capacity restricts number of parent participants who can attend workshops simultaneously.',
     solutions: [
       'Staggered workshop sessions to spread childcare demands',
       'Parent volunteer rotation system for sustainable childcare coverage',
       'Partnership with community centre for appropriate childcare space',
       'Age-appropriate activity planning for different children\'s needs'
     ]
   },
   {
     title: 'Family Schedule Coordination',
     reality: 'Weekend workshop timing may conflict with family activities, religious observances, or work commitments.',
     solutions: [
       'Advance workshop scheduling with community input on preferred times',
       'Alternative session times for families with scheduling conflicts',
       'Recording key workshop content for families unable to attend live',
       'Flexible makeup opportunities through peer mentoring'
     ]
   },
   {
     title: 'Multi-Generational Learning Gaps',
     reality: 'Significant technology skill differences between family members can create learning tension or frustration.',
     solutions: [
       'Family learning guides with patient teaching strategies',
       'Separate beginner and intermediate workshop tracks when possible',
       'Peer mentoring between families with similar generational dynamics',
       'Focus on collaborative rather than instructional family learning activities'
     ]
   }
 ];

 const impact = [
   {
     metric: 'Parent Workshop Participation',
     data: 'Childcare coordination enables parent participation in workshops that would otherwise be impossible due to family responsibilities.',
     significance: 'Increases community representation in digital literacy learning by including parents and caregivers.'
   },
   {
     metric: 'Family Learning Reinforcement',
     data: 'Workshop skills get practiced and reinforced through family activities, improving retention and application.',
     significance: 'Multiplies workshop learning impact by extending digital literacy development into family settings.'
   },
   {
     metric: 'Multi-Generational Skill Building',
     data: 'Workshops create opportunities for different generations to learn together and support each other\'s digital literacy development.',
     significance: 'Builds family resilience and reduces generational digital divides through collaborative learning.'
   }
 ];

 return (
   <div className="min-h-screen family-support-main">
     <div className="animated-bg">
       <div className="bg-orb"></div>
       <div className="bg-orb"></div>
     </div>
     
     
     <main className="framework-section">
       <div className="framework-content">
         <div className="hero-content text-center mb-8">
           <div className="hero-badge fade-in">
             <span>👨‍👩‍👧‍👦</span>
             Community Family Support
           </div>
           
           <h1 className="hero-title fade-in">
             Workshop-Focused Family Support
           </h1>
           
           <p className="hero-subtitle fade-in">
             Supporting families to participate in and benefit from quarterly digital skills workshops through practical coordination and learning resources.
           </p>
         </div>

         <div className="support-grid">
           {supportTypes.map(support => (
             <div key={support.id} className="support-card">
               <h3 className="support-title">{support.title}</h3>
               <p className="support-description">{support.description}</p>
               
               <div className="support-details">
                 <div className="support-provided">
                   <h4>Support Provided</h4>
                   <ul>
                     {support.supportProvided.map((item, index) => (
                       <li key={index}>{item}</li>
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
           <h2 className="section-title text-center">Family Support Principles</h2>
           <p className="section-subtitle text-center">
             Core principles guiding family support for workshop participation and digital literacy learning.
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

         <div className="challenges-section">
           <h2 className="section-title text-center">Implementation Challenges</h2>
           <p className="section-subtitle text-center">
             Realistic challenges in providing family support for workshop participation and practical solutions.
           </p>
           
           <div className="challenges-grid">
             {challenges.map((challenge, index) => (
               <div key={index} className="challenge-card">
                 <h3 className="challenge-title">{challenge.title}</h3>
                 <div className="challenge-reality">{challenge.reality}</div>
                 
                 <div className="challenge-solutions">
                   <h5>Practical Solutions</h5>
                   <ul>
                     {challenge.solutions.map((solution, solutionIndex) => (
                       <li key={solutionIndex}>{solution}</li>
                     ))}
                   </ul>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="impact-section">
           <h2 className="section-title text-center">Family Impact</h2>
           <p className="section-subtitle text-center">
             How workshop-focused family support strengthens community digital literacy outcomes.
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
               Family support connects directly to quarterly workshop delivery, removing practical barriers 
               to participation while extending learning impact into family settings through collaborative activities.
             </p>
             
             <div className="framework-connections">
               <div className="connection">
                 <strong>Pre-Workshop:</strong> Childcare coordination and family scheduling support enables parent and caregiver participation.
               </div>
               <div className="connection">
                 <strong>During Workshop:</strong> On-site childcare and family-friendly content allows full engagement in learning activities.
               </div>
               <div className="connection">
                 <strong>Post-Workshop:</strong> Family learning resources and multi-generational support extend skill practice into home settings.
               </div>
               <div className="connection">
                 <strong>Long-term:</strong> Families develop collaborative digital literacy practices that reinforce workshop learning between quarterly sessions.
               </div>
             </div>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default FamilySupportPage;