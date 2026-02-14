// src/pages/workshops/index.tsx
import React, { useState } from 'react';
import WorkshopSchedule from '../../workshops/quarterly/WorkshopSchedule';

interface WorkshopDetails {
 id: string;
 title: string;
 description: string;
 learningOutcomes: string[];
 prerequisites: string;
 materials: string[];
 duration: string;
 format: string;
 volunteers: string[];
 followUp: string;
}

const WorkshopsPage: React.FC = () => {
 const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');

 const workshopDetails: WorkshopDetails[] = [
   {
     id: 'q1-digital-basics',
     title: 'Q1: Digital Basics Workshop',
     description: 'Foundation digital skills for everyday online activities, focusing on email, forms, and internet safety.',
     learningOutcomes: [
       'Set up and manage personal email account',
       'Complete online forms safely and accurately',
       'Recognize and avoid common online scams',
       'Navigate websites confidently',
       'Understand basic password security'
     ],
     prerequisites: 'No prior experience required. Suitable for complete beginners.',
     materials: ['Laptop or tablet (library computers available if needed)', 'Notebook and pen', 'Personal email address (can be created during workshop)'],
     duration: '2 hours (10am-12pm), single weekend session',
     format: 'Hands-on practice with individual guidance from IT specialists and headmistresses',
     volunteers: ['IT Specialists', 'Retired Headmistresses'],
     followUp: 'Email practice checklist, library computer booking information, preparation for Q2 Creative Media workshop'
   },
   {
     id: 'q2-creative-media',
     title: 'Q2: Creative Media Workshop',
     description: 'Introduction to podcasting, audio recording, and basic video editing with community media professionals.',
     learningOutcomes: [
       'Record clear audio using smartphone or basic equipment',
       'Edit simple podcast episodes using free software',
       'Understand basic video editing principles',
       'Create content for family or community sharing',
       'Plan and structure media projects'
     ],
     prerequisites: 'Basic computer navigation helpful but not essential. Q1 Digital Basics recommended.',
     materials: ['Smartphone with recording capability', 'Headphones (basic earbuds acceptable)', 'Laptop if available (community equipment provided otherwise)'],
     duration: '2 hours (2pm-4pm), single weekend session',
     format: 'Creative workshop with hands-on recording and editing practice, led by local DJs and radio presenters',
     volunteers: ['Local DJs', 'Community Radio Presenters', 'Marketing Specialist'],
     followUp: 'Free editing software recommendations, community media sharing opportunities, Q3 STEM workshop preparation'
   },
   {
     id: 'q3-stem-fundamentals',
     title: 'Q3: STEM Fundamentals Workshop',
     description: 'Practical introduction to coding concepts and basic electronics through simple, engaging projects.',
     learningOutcomes: [
       'Understand basic programming logic and concepts',
       'Complete simple coding exercises',
       'Build basic electronic circuit',
       'Connect coding concepts to everyday technology',
       'Identify local STEM learning opportunities'
     ],
     prerequisites: 'Comfortable with basic computer use. Previous workshops helpful but not required.',
     materials: ['Laptop (library computers available)', 'Basic electronic components (provided)', 'Calculator', 'Notebook for project notes'],
     duration: '2.5 hours (10am-12:30pm), single weekend session',
     format: 'Project-based learning with step-by-step guidance from engineering lecturers and hackspace volunteers',
     volunteers: ['Electrical Engineering Lecturers', 'Hackspace Network Volunteers'],
     followUp: 'Free coding resources, local hackspace introduction, preparation for Q4 Heritage workshop'
   },
   {
     id: 'q4-heritage-community',
     title: 'Q4: Heritage & Community Workshop',
     description: 'Digital preservation of family stories and local history using accessible technology tools.',
     learningOutcomes: [
       'Digitize family photos and documents',
       'Record and edit family story interviews',
       'Organize digital archives safely',
       'Share family history appropriately online',
       'Contribute to community heritage preservation'
     ],
     prerequisites: 'Basic digital skills from previous workshops or equivalent experience recommended.',
     materials: ['Family photos or documents for digitization', 'Smartphone for recording', 'Storage device (USB stick provided)', 'Family story ideas or questions'],
     duration: '2 hours (1pm-3pm), single weekend session',
     format: 'Collaborative workshop combining individual family projects with community heritage activities',
     volunteers: ['Child Development Specialist', 'Community History Volunteers'],
     followUp: 'Digital storage best practices, community heritage project participation, next year workshop planning'
   }
 ];

 const practicalInfo = {
   pricing: {
     individual: '£50 per workshop',
     family: 'Additional family members: £25 each',
     concessions: 'Reduced rates available for those experiencing financial hardship - contact organizers'
   },
   booking: {
     process: 'Registration through Eventbrite or community partner organizations',
     capacity: 'Maximum 15 participants per workshop to ensure individual attention',
     cancellation: '48-hour cancellation policy, full refund available'
   },
   accessibility: {
     venue: 'All venues wheelchair accessible with parking available',
     support: 'Large print materials and hearing loop available on request',
     childcare: 'Childcare coordination available for parent participants - advance notice required'
   },
   followUp: {
     resources: 'All participants receive digital resources and practice materials',
     support: 'WhatsApp group for each workshop cohort with peer support',
     progression: 'Clear pathways to local adult education and community tech support'
   }
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
             <span>💻</span>
             Quarterly Digital Skills Workshops
           </div>
           
           <h1 className="hero-title fade-in">
             Community-Led Digital Literacy Learning
           </h1>
           
           <p className="hero-subtitle fade-in">
             Four focused workshops per year, delivered by volunteer specialists from our community. Practical skills for everyday digital life.
           </p>
         </div>

         <WorkshopSchedule />

         <div className="workshop-details-section mt-12">
           <h2 className="section-title text-center">Workshop Details</h2>
           <div className="workshop-selector flex justify-center gap-2 mb-8 flex-wrap">
             {workshopDetails.map(workshop => (
               <button
                 key={workshop.id}
                 onClick={() => setSelectedWorkshop(selectedWorkshop === workshop.id ? '' : workshop.id)}
                 className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
                   selectedWorkshop === workshop.id
                     ? 'bg-blue-600 text-white border-blue-600'
                     : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-blue-400'
                 }`}
               >
                 {workshop.title.split(':')[1]?.trim() || workshop.title}
               </button>
             ))}
           </div>

           {selectedWorkshop && (
             <div className="workshop-detail-card bg-slate-800 rounded-lg p-6 border border-slate-700">
               {(() => {
                 const workshop = workshopDetails.find(w => w.id === selectedWorkshop);
                 if (!workshop) return null;
                 
                 return (
                   <>
                     <h3 className="text-2xl font-bold text-blue-400 mb-4">{workshop.title}</h3>
                     <p className="text-gray-300 mb-6">{workshop.description}</p>
                     
                     <div className="grid md:grid-cols-2 gap-6">
                       <div>
                         <h4 className="text-lg font-semibold text-white mb-2">Learning Outcomes</h4>
                         <ul className="text-gray-300 text-sm space-y-1">
                           {workshop.learningOutcomes.map((outcome, index) => (
                             <li key={index}>• {outcome}</li>
                           ))}
                         </ul>
                       </div>
                       
                       <div>
                         <h4 className="text-lg font-semibold text-white mb-2">What to Bring</h4>
                         <ul className="text-gray-300 text-sm space-y-1">
                           {workshop.materials.map((material, index) => (
                             <li key={index}>• {material}</li>
                           ))}
                         </ul>
                       </div>
                     </div>
                     
                     <div className="grid md:grid-cols-3 gap-4 mt-6">
                       <div className="bg-slate-700 p-4 rounded">
                         <h5 className="font-semibold text-white">Duration</h5>
                         <p className="text-gray-300 text-sm">{workshop.duration}</p>
                       </div>
                       <div className="bg-slate-700 p-4 rounded">
                         <h5 className="font-semibold text-white">Prerequisites</h5>
                         <p className="text-gray-300 text-sm">{workshop.prerequisites}</p>
                       </div>
                       <div className="bg-slate-700 p-4 rounded">
                         <h5 className="font-semibold text-white">Led by</h5>
                         <p className="text-gray-300 text-sm">{workshop.volunteers.join(', ')}</p>
                       </div>
                     </div>
                     
                     <div className="mt-6">
                       <h4 className="text-lg font-semibold text-white mb-2">Workshop Format</h4>
                       <p className="text-gray-300 text-sm mb-4">{workshop.format}</p>
                       
                       <h4 className="text-lg font-semibold text-white mb-2">After the Workshop</h4>
                       <p className="text-gray-300 text-sm">{workshop.followUp}</p>
                     </div>
                   </>
                 );
               })()}
             </div>
           )}
         </div>

         <div className="practical-info-section mt-12">
           <h2 className="section-title text-center">Practical Information</h2>
           
           <div className="grid md:grid-cols-2 gap-8 mt-8">
             <div className="info-card bg-slate-800 rounded-lg p-6 border border-slate-700">
               <h3 className="text-xl font-bold text-green-400 mb-4">Pricing & Booking</h3>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-white">Workshop Fees</h4>
                   <ul className="text-gray-300 text-sm space-y-1 mt-1">
                     <li>• {practicalInfo.pricing.individual}</li>
                     <li>• {practicalInfo.pricing.family}</li>
                     <li>• {practicalInfo.pricing.concessions}</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-white">Booking Process</h4>
                   <ul className="text-gray-300 text-sm space-y-1 mt-1">
                     <li>• {practicalInfo.booking.process}</li>
                     <li>• {practicalInfo.booking.capacity}</li>
                     <li>• {practicalInfo.booking.cancellation}</li>
                   </ul>
                 </div>
               </div>
             </div>
             
             <div className="info-card bg-slate-800 rounded-lg p-6 border border-slate-700">
               <h3 className="text-xl font-bold text-purple-400 mb-4">Accessibility & Support</h3>
               <div className="space-y-4">
                 <div>
                   <h4 className="font-semibold text-white">Venue Accessibility</h4>
                   <ul className="text-gray-300 text-sm space-y-1 mt-1">
                     <li>• {practicalInfo.accessibility.venue}</li>
                     <li>• {practicalInfo.accessibility.support}</li>
                     <li>• {practicalInfo.accessibility.childcare}</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-white">Ongoing Support</h4>
                   <ul className="text-gray-300 text-sm space-y-1 mt-1">
                     <li>• {practicalInfo.followUp.resources}</li>
                     <li>• {practicalInfo.followUp.support}</li>
                     <li>• {practicalInfo.followUp.progression}</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default WorkshopsPage;