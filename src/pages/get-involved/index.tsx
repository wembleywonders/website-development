// src/pages/get-involved/index.tsx
import React, { useState } from 'react';

interface VolunteerRole {
 id: string;
 title: string;
 commitment: string;
 description: string;
 requirements: string[];
 responsibilities: string[];
 support: string;
 timeframe: string;
}

interface ParticipantOption {
 id: string;
 type: string;
 description: string;
 commitment: string;
 cost: string;
 nextSteps: string[];
}

const GetInvolvedPage: React.FC = () => {
 const [selectedRole, setSelectedRole] = useState<string>('');
 const [contactForm, setContactForm] = useState({
   name: '',
   email: '',
   interest: '',
   availability: '',
   experience: ''
 });

 const volunteerRoles: VolunteerRole[] = [
   {
     id: 'workshop-specialist',
     title: 'Workshop Teaching Specialist',
     commitment: 'One weekend session per quarter (2-3 hours)',
     description: 'Lead quarterly workshops in your area of expertise - digital basics, creative media, STEM, or heritage preservation.',
     requirements: [
       'Professional experience in relevant field',
       'Comfortable teaching small groups (max 15 people)',
       'Available for quarterly weekend sessions',
       'Patient approach to adult learners'
     ],
     responsibilities: [
       'Prepare and deliver 2-hour workshop sessions',
       'Provide hands-on guidance to participants',
       'Adapt teaching style for mixed skill levels',
       'Participate in quarterly planning meetings'
     ],
     support: 'Workshop materials provided, venue arranged, backup support from other volunteers',
     timeframe: 'Ongoing quarterly commitment, can pause participation if needed'
   },
   {
     id: 'workshop-assistant',
     title: 'Workshop Support Assistant',
     commitment: 'One workshop per quarter as available',
     description: 'Provide technical support and individual assistance during workshops.',
     requirements: [
       'Basic digital literacy skills',
       'Patience with technology troubleshooting',
       'Comfortable helping adult learners',
       'No formal teaching experience required'
     ],
     responsibilities: [
       'Help participants with equipment setup',
       'Provide one-on-one guidance during activities',
       'Assist with workshop materials and logistics',
       'Support lead volunteer during sessions'
     ],
     support: 'Training provided before first workshop, paired with experienced volunteers',
     timeframe: 'Flexible participation - help when available'
   },
   {
     id: 'coordination-volunteer',
     title: 'Workshop Coordination Volunteer',
     commitment: '2-3 hours per month, quarterly peaks',
     description: 'Handle practical arrangements for workshop delivery - booking, communications, logistics.',
     requirements: [
       'Strong organizational skills',
       'Comfortable with email and phone communication',
       'Reliable availability for quarterly planning',
       'Basic spreadsheet skills helpful'
     ],
     responsibilities: [
       'Coordinate venue bookings with library/community centre',
       'Manage participant registration and communications',
       'Organize equipment and materials for workshops',
       'Maintain simple records and attendance tracking'
     ],
     support: 'Simple systems provided, backup coordination available',
     timeframe: 'Quarterly commitment with quiet periods between workshops'
   }
 ];

 const participantOptions: ParticipantOption[] = [
   {
     id: 'individual-workshops',
     type: 'Individual Workshop Participation',
     description: 'Attend one or more quarterly workshops based on your interests and learning goals.',
     commitment: 'Single 2-3 hour weekend sessions',
     cost: '£50 per workshop, concessions available',
     nextSteps: [
       'Review quarterly workshop schedule',
       'Register through Eventbrite or community partners',
       'Prepare materials list for your chosen workshop',
       'Join workshop WhatsApp group for updates'
     ]
   },
   {
     id: 'full-year-learning',
     type: 'Full Year Learning Journey',
     description: 'Participate in all four quarterly workshops for comprehensive digital skills development.',
     commitment: 'Four workshops across the year',
     cost: '£200 for all four workshops (£50 saving)',
     nextSteps: [
       'Register for full year programme',
       'Attend Q1 Digital Basics workshop',
       'Build skills progressively through each quarter',
       'Consider volunteering after completing programme'
     ]
   },
   {
     id: 'family-participation',
     type: 'Family Workshop Participation',
     description: 'Bring family members to workshops with childcare coordination and family-friendly activities.',
     commitment: 'Workshops of interest with family support',
     cost: 'Additional family members £25 each, childcare coordination included',
     nextSteps: [
       'Contact organizers about childcare needs',
       'Register family members for appropriate workshops',
       'Coordinate with other families for mutual support',
       'Participate in family learning activities'
     ]
   }
 ];

 const communityPartnership = {
   organizations: [
     {
       name: 'Community Organizations',
       partnership: 'Workshop promotion, participant referrals, venue partnerships',
       contact: 'Connect through existing community networks'
     },
     {
       name: 'Local Businesses',
       partnership: 'Equipment lending, material donations, volunteer time release',
       contact: 'Email organizers to discuss partnership opportunities'
     },
     {
       name: 'Educational Institutions',
       partnership: 'Volunteer recruitment, progression pathways, resource sharing',
       contact: 'Formal partnership discussions through institutional contacts'
     }
   ],
   requirements: 'Partnerships must align with quarterly workshop model and community benefit focus'
 };

 const handleContactSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   console.log('Contact form submission:', contactForm);
   alert('Thank you for your interest! We will contact you within one week to discuss involvement opportunities.');
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
             <span>🤝</span>
             Get Involved
           </div>
           
           <h1 className="hero-title fade-in">
             Join Our Community Digital Literacy Network
           </h1>
           
           <p className="hero-subtitle fade-in">
             Volunteer your expertise, participate in workshops, or partner with us to strengthen community digital skills.
           </p>
         </div>

         <div className="volunteer-section mb-12">
           <h2 className="section-title text-center">Volunteer Opportunities</h2>
           <p className="section-subtitle text-center mb-8">
             Share your expertise through quarterly workshops while maintaining manageable time commitments.
           </p>
           
           <div className="volunteer-selector flex justify-center gap-2 mb-6 flex-wrap">
             {volunteerRoles.map(role => (
               <button
                 key={role.id}
                 onClick={() => setSelectedRole(selectedRole === role.id ? '' : role.id)}
                 className={`px-4 py-2 rounded-lg border transition-colors text-sm ${
                   selectedRole === role.id
                     ? 'bg-green-600 text-white border-green-600'
                     : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-green-400'
                 }`}
               >
                 {role.title}
               </button>
             ))}
           </div>

           {selectedRole && (
             <div className="volunteer-detail bg-slate-800 rounded-lg p-6 border border-slate-700">
               {(() => {
                 const role = volunteerRoles.find(r => r.id === selectedRole);
                 if (!role) return null;
                 
                 return (
                   <>
                     <h3 className="text-2xl font-bold text-green-400 mb-2">{role.title}</h3>
                     <p className="text-blue-400 font-semibold mb-4">{role.commitment}</p>
                     <p className="text-gray-300 mb-6">{role.description}</p>
                     
                     <div className="grid md:grid-cols-2 gap-6">
                       <div>
                         <h4 className="text-lg font-semibold text-white mb-2">Requirements</h4>
                         <ul className="text-gray-300 text-sm space-y-1">
                           {role.requirements.map((req, index) => (
                             <li key={index}>• {req}</li>
                           ))}
                         </ul>
                       </div>
                       
                       <div>
                         <h4 className="text-lg font-semibold text-white mb-2">Responsibilities</h4>
                         <ul className="text-gray-300 text-sm space-y-1">
                           {role.responsibilities.map((resp, index) => (
                             <li key={index}>• {resp}</li>
                           ))}
                         </ul>
                       </div>
                     </div>
                     
                     <div className="grid md:grid-cols-2 gap-4 mt-6">
                       <div className="bg-slate-700 p-4 rounded">
                         <h5 className="font-semibold text-white">Support Provided</h5>
                         <p className="text-gray-300 text-sm">{role.support}</p>
                       </div>
                       <div className="bg-slate-700 p-4 rounded">
                         <h5 className="font-semibold text-white">Time Commitment</h5>
                         <p className="text-gray-300 text-sm">{role.timeframe}</p>
                       </div>
                     </div>
                   </>
                 );
               })()}
             </div>
           )}
         </div>

         <div className="participation-section mb-12">
           <h2 className="section-title text-center">Workshop Participation</h2>
           <p className="section-subtitle text-center mb-8">
             Learn digital skills through hands-on workshops led by community volunteers.
           </p>
           
           <div className="grid md:grid-cols-3 gap-6">
             {participantOptions.map(option => (
               <div key={option.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                 <h3 className="text-xl font-bold text-blue-400 mb-3">{option.type}</h3>
                 <p className="text-gray-300 mb-4">{option.description}</p>
                 
                 <div className="space-y-3 mb-6">
                   <div className="bg-slate-700 p-3 rounded">
                     <h5 className="font-semibold text-white text-sm">Commitment</h5>
                     <p className="text-gray-300 text-sm">{option.commitment}</p>
                   </div>
                   <div className="bg-slate-700 p-3 rounded">
                     <h5 className="font-semibold text-white text-sm">Cost</h5>
                     <p className="text-gray-300 text-sm">{option.cost}</p>
                   </div>
                 </div>
                 
                 <div>
                   <h5 className="font-semibold text-white mb-2">Next Steps</h5>
                   <ul className="text-gray-300 text-sm space-y-1">
                     {option.nextSteps.map((step, index) => (
                       <li key={index}>• {step}</li>
                     ))}
                   </ul>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="partnership-section mb-12">
           <h2 className="section-title text-center">Community Partnerships</h2>
           <p className="section-subtitle text-center mb-8">
             Organizations interested in supporting quarterly workshop delivery.
           </p>
           
           <div className="grid md:grid-cols-3 gap-6">
             {communityPartnership.organizations.map((org, index) => (
               <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                 <h3 className="text-xl font-bold text-purple-400 mb-3">{org.name}</h3>
                 <p className="text-gray-300 mb-4">{org.partnership}</p>
                 <div className="bg-slate-700 p-3 rounded">
                   <p className="text-gray-300 text-sm">{org.contact}</p>
                 </div>
               </div>
             ))}
           </div>
           
           <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mt-6">
             <p className="text-gray-300 text-center">
               <strong className="text-white">Partnership Requirements:</strong> {communityPartnership.requirements}
             </p>
           </div>
         </div>

         <div className="contact-section">
           <h2 className="section-title text-center">Express Interest</h2>
           <div className="max-w-2xl mx-auto">
             <form onSubmit={handleContactSubmit} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
               <div className="grid md:grid-cols-2 gap-4 mb-4">
                 <div>
                   <label className="block text-white text-sm font-medium mb-2">Name</label>
                   <input
                     type="text"
                     value={contactForm.name}
                     onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                     className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-white text-sm font-medium mb-2">Email</label>
                   <input
                     type="email"
                     value={contactForm.email}
                     onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                     className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
                     required
                   />
                 </div>
               </div>
               
               <div className="mb-4">
                 <label className="block text-white text-sm font-medium mb-2">Interest</label>
                 <select
                   value={contactForm.interest}
                   onChange={(e) => setContactForm({...contactForm, interest: e.target.value})}
                   className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
                   required
                 >
                   <option value="">Select your interest</option>
                   <option value="volunteer-specialist">Workshop Teaching Volunteer</option>
                   <option value="volunteer-assistant">Workshop Assistant Volunteer</option>
                   <option value="volunteer-coordination">Coordination Volunteer</option>
                   <option value="participant">Workshop Participant</option>
                   <option value="partnership">Organizational Partnership</option>
                 </select>
               </div>
               
               <div className="mb-4">
                 <label className="block text-white text-sm font-medium mb-2">Availability/Experience</label>
                 <textarea
                   value={contactForm.experience}
                   onChange={(e) => setContactForm({...contactForm, experience: e.target.value})}
                   rows={3}
                   className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
                   placeholder="Tell us about your availability or relevant experience..."
                 />
               </div>
               
               <button type="submit" className="w-full btn btn-primary">
                 Submit Interest
               </button>
             </form>
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default GetInvolvedPage;