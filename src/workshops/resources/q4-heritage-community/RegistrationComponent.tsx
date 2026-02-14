// src/workshops/resources/q4-heritage-community/RegistrationComponent.tsx
import React, { useState } from 'react';

interface HeritageFormData {
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 accessibilityNeeds: string;
 heritageInterest: string;
 familyDynamics: string;
 emergencyContact: string;
 materialsBringing: string;
 sensitivityConcerns: string;
 familyParticipants: number;
 marketingConsent: boolean;
}

const Q4HeritageRegistration: React.FC = () => {
 const [formData, setFormData] = useState<HeritageFormData>({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   accessibilityNeeds: '',
   heritageInterest: '',
   familyDynamics: '',
   emergencyContact: '',
   materialsBringing: '',
   sensitivityConcerns: '',
   familyParticipants: 1,
   marketingConsent: false
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [registrationComplete, setRegistrationComplete] = useState(false);

 const workshopDetails = {
   title: 'Q4: Heritage & Community Workshop',
   date: 'Saturday, December 14, 2025',
   time: '1:00 PM - 3:00 PM',
   venue: 'Wembley Central Library (family-friendly setup)',
   address: 'High Road, Wembley Central, HA0 2HW',
   cost: '£50.00 (additional family members £25 each)',
   placesAvailable: 15,
   currentBookings: 3
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   const { name, value, type } = e.target;
   if (type === 'checkbox') {
     const checked = (e.target as HTMLInputElement).checked;
     setFormData(prev => ({ ...prev, [name]: checked }));
   } else if (type === 'number') {
     const numValue = parseInt(value) || 1;
     setFormData(prev => ({ ...prev, [name]: numValue }));
   } else {
     setFormData(prev => ({ ...prev, [name]: value }));
   }
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   
   await new Promise(resolve => setTimeout(resolve, 2000));
   
   setRegistrationComplete(true);
   setIsSubmitting(false);
 };

 const isFormValid = () => {
   return formData.firstName && 
          formData.lastName && 
          formData.email && 
          formData.phone && 
          formData.heritageInterest;
 };

 const calculateTotalCost = () => {
   const baseCost = 50;
   const additionalMembers = Math.max(0, formData.familyParticipants - 1);
   return baseCost + (additionalMembers * 25);
 };

 if (registrationComplete) {
   return (
     <div className="registration-success bg-orange-900/20 border border-orange-600/30 rounded-lg p-8 text-center">
       <h2 className="text-2xl font-bold text-orange-400 mb-4">Heritage Workshop Registration Confirmed!</h2>
       
       <div className="space-y-4 text-left max-w-2xl mx-auto">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Workshop Details</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Workshop:</strong> {workshopDetails.title}</li>
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Venue:</strong> {workshopDetails.venue}</li>
             <li><strong>Participants:</strong> {formData.familyParticipants} person(s)</li>
             <li><strong>Total cost:</strong> £{calculateTotalCost()}</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Essential Items to Bring</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Family photos or documents:</strong> For digitization practice (originals will be handled carefully)</li>
             <li>• <strong>Smartphone for recording:</strong> Essential for family story documentation activities</li>
             <li>• <strong>USB storage device:</strong> If available (provided otherwise)</li>
             <li>• <strong>Family story ideas:</strong> Names or topics you'd like to explore</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Family-Centered Approach</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Sensitive guidance:</strong> Child development specialist helps navigate family dynamics</li>
             <li>• <strong>Respectful documentation:</strong> Focus on consent and privacy throughout</li>
             <li>• <strong>Multi-generational support:</strong> Activities suitable for family groups</li>
             <li>• <strong>No pressure:</strong> Work at your family's comfort level</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Ongoing Support</h3>
           <ul className="text-gray-300 space-y-1">
             <li>• Family interview templates for different relationships</li>
             <li>• Digital organization guides for continuing archive work at home</li>
             <li>• Connection to local history groups and community projects</li>
             <li>• WhatsApp support group for families working on heritage projects</li>
           </ul>
         </div>
       </div>
       
       <div className="mt-6">
         <p className="text-gray-300 mb-4">
           Questions about family history documentation? Contact: heritage@wembley-digital.org.uk
         </p>
         <button 
           onClick={() => window.location.href = '/workshops'}
           className="btn btn-secondary mr-4"
         >
           View All Workshops
         </button>
         <button 
           onClick={() => window.location.href = '/start-journey'}
           className="btn btn-primary"
         >
           Plan Your 2026 Learning Path
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="registration-form-container">
     <div className="workshop-summary bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h2 className="text-2xl font-bold text-orange-400 mb-4">{workshopDetails.title}</h2>
       
       <div className="grid md:grid-cols-2 gap-6">
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Workshop Information</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Duration:</strong> 2 hours family-friendly format</li>
             <li><strong>Cost:</strong> {workshopDetails.cost}</li>
           </ul>
         </div>
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Leadership & Focus</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Led by:</strong> Child Development Specialist</li>
             <li><strong>Support:</strong> Community History Volunteers</li>
             <li><strong>Focus:</strong> Respectful family story preservation</li>
             <li><strong>Places:</strong> {workshopDetails.placesAvailable - workshopDetails.currentBookings} remaining</li>
           </ul>
         </div>
       </div>
     </div>

     <form onSubmit={handleSubmit} className="registration-form bg-slate-800 rounded-lg p-6 border border-slate-700">
       <h3 className="text-xl font-bold text-white mb-6">Heritage Workshop Registration</h3>
       
       <div className="grid md:grid-cols-2 gap-4 mb-4">
         <div>
           <label className="block text-white text-sm font-medium mb-2">First Name *</label>
           <input
             type="text"
             name="firstName"
             value={formData.firstName}
             onChange={handleInputChange}
             className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
             required
           />
         </div>
         <div>
           <label className="block text-white text-sm font-medium mb-2">Last Name *</label>
           <input
             type="text"
             name="lastName"
             value={formData.lastName}
             onChange={handleInputChange}
             className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
             required
           />
         </div>
       </div>
       
       <div className="grid md:grid-cols-2 gap-4 mb-4">
         <div>
           <label className="block text-white text-sm font-medium mb-2">Email Address *</label>
           <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleInputChange}
             className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
             required
           />
         </div>
         <div>
           <label className="block text-white text-sm font-medium mb-2">Phone Number *</label>
           <input
             type="tel"
             name="phone"
             value={formData.phone}
             onChange={handleInputChange}
             className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
             required
           />
         </div>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Heritage Interest *</label>
         <select
           name="heritageInterest"
           value={formData.heritageInterest}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
           required
         >
           <option value="">What aspects of family heritage interest you most?</option>
           <option value="family-stories">Recording family stories and memories</option>
           <option value="photo-preservation">Preserving old family photographs</option>
           <option value="document-organization">Organizing family documents and records</option>
           <option value="community-history">Connecting family history to local community</option>
           <option value="digital-skills">Learning digital preservation techniques</option>
         </select>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Family Participation</label>
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-gray-300 text-sm mb-1">Number of participants</label>
             <input
               type="number"
               name="familyParticipants"
               value={formData.familyParticipants}
               onChange={handleInputChange}
               min="1"
               max="4"
               className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
             />
           </div>
           <div>
             <label className="block text-gray-300 text-sm mb-1">Total cost</label>
             <div className="p-3 bg-slate-600 text-white rounded border border-slate-500">
               £{calculateTotalCost()}
             </div>
           </div>
         </div>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Family Dynamics Considerations</label>
         <select
           name="familyDynamics"
           value={formData.familyDynamics}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         >
           <option value="">How would you describe your family's comfort with sharing stories?</option>
           <option value="very-open">Very open - family enjoys sharing stories together</option>
           <option value="somewhat-reserved">Somewhat reserved - need encouragement to share</option>
           <option value="mixed-comfort">Mixed comfort levels - some share more than others</option>
           <option value="sensitive-topics">Some sensitive topics that need careful handling</option>
         </select>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Materials You're Bringing</label>
         <textarea
           name="materialsBringing"
           value={formData.materialsBringing}
           onChange={handleInputChange}
           placeholder="Describe family photos, documents, or other materials you plan to bring for digitization (optional)"
           rows={3}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         />
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Sensitivity or Privacy Concerns</label>
         <textarea
           name="sensitivityConcerns"
           value={formData.sensitivityConcerns}
           onChange={handleInputChange}
           placeholder="Any family privacy concerns or sensitive topics we should be aware of? (Confidential)"
           rows={3}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         />
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Emergency Contact</label>
         <input
           type="text"
           name="emergencyContact"
           value={formData.emergencyContact}
           onChange={handleInputChange}
           placeholder="Name and phone number"
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         />
       </div>
       
       <div className="mb-6">
         <label className="block text-white text-sm font-medium mb-2">Accessibility Requirements</label>
         <textarea
           name="accessibilityNeeds"
           value={formData.accessibilityNeeds}
           onChange={handleInputChange}
           placeholder="Any accessibility needs for family participants (hearing, mobility, childcare coordination, etc.)"
           rows={2}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         />
       </div>
       
       <div className="mb-6">
         <label className="flex items-center cursor-pointer">
           <input
             type="checkbox"
             name="marketingConsent"
             checked={formData.marketingConsent}
             onChange={handleInputChange}
             className="mr-3"
           />
           <span className="text-gray-300">Send me information about local history projects and heritage preservation opportunities</span>
         </label>
       </div>
       
       <div className="workshop-approach bg-slate-700 rounded-lg p-4 mb-6">
         <h4 className="text-white font-semibold mb-2">Family-Centered Approach</h4>
         <p className="text-gray-300 text-sm mb-2">
           This workshop respects family privacy and different comfort levels with sharing personal history. 
           Child development specialist guidance ensures sensitive handling of family dynamics.
         </p>
         <p className="text-gray-300 text-sm">
           <strong>No pressure to share:</strong> You control what family information is documented and shared.
           All activities respect individual and family boundaries.
         </p>
       </div>
       
       <button
         type="submit"
         disabled={!isFormValid() || isSubmitting}
         className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {isSubmitting ? 'Processing Registration...' : 'Register for Heritage Workshop'}
       </button>
       
       <p className="text-gray-400 text-sm text-center mt-4">
         Questions about family privacy or sensitive documentation? 
         Email heritage@wembley-digital.org.uk
       </p>
     </form>
   </div>
 );
};

export default Q4HeritageRegistration;