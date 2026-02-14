// src/workshops/resources/q2-creative-media/RegistrationComponent.tsx
import React, { useState } from 'react';

interface CreativeMediaFormData {
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 accessibilityNeeds: string;
 creativeInterest: string;
 deviceBringing: string;
 emergencyContact: string;
 previousExperience: string;
 marketingConsent: boolean;
}

const Q2CreativeMediaRegistration: React.FC = () => {
 const [formData, setFormData] = useState<CreativeMediaFormData>({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   accessibilityNeeds: '',
   creativeInterest: '',
   deviceBringing: '',
   emergencyContact: '',
   previousExperience: '',
   marketingConsent: false
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [registrationComplete, setRegistrationComplete] = useState(false);

 const workshopDetails = {
   title: 'Q2: Creative Media Workshop',
   date: 'Saturday, June 14, 2025',
   time: '2:00 PM - 4:00 PM',
   venue: 'Wembley Community Centre Meeting Room',
   address: 'Harrow Road, Wembley, HA0 2SF',
   cost: '£50.00',
   placesAvailable: 15,
   currentBookings: 6
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   const { name, value, type } = e.target;
   if (type === 'checkbox') {
     const checked = (e.target as HTMLInputElement).checked;
     setFormData(prev => ({ ...prev, [name]: checked }));
   } else {
     setFormData(prev => ({ ...prev, [name]: value }));
   }
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsSubmitting(true);
   
   // Simulate API call to registration system
   await new Promise(resolve => setTimeout(resolve, 2000));
   
   setRegistrationComplete(true);
   setIsSubmitting(false);
 };

 const isFormValid = () => {
   return formData.firstName && 
          formData.lastName && 
          formData.email && 
          formData.phone && 
          formData.creativeInterest &&
          formData.deviceBringing;
 };

 if (registrationComplete) {
   return (
     <div className="registration-success bg-purple-900/20 border border-purple-600/30 rounded-lg p-8 text-center">
       <h2 className="text-2xl font-bold text-purple-400 mb-4">Creative Media Workshop Registration Confirmed!</h2>
       
       <div className="space-y-4 text-left max-w-2xl mx-auto">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Workshop Details</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Workshop:</strong> {workshopDetails.title}</li>
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Venue:</strong> {workshopDetails.venue}</li>
             <li><strong>Address:</strong> {workshopDetails.address}</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Essential Items to Bring</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Smartphone with recording capability:</strong> Essential for audio recording activities</li>
             <li>• <strong>Headphones:</strong> Basic earbuds acceptable for listening and editing</li>
             <li>• <strong>Content ideas:</strong> Family stories, interview topics, or creative project concepts</li>
             <li>• <strong>Notebook:</strong> For planning content and taking notes during demonstrations</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">What to Expect</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Hands-on learning:</strong> You'll create actual audio content during the workshop</li>
             <li>• <strong>Expert guidance:</strong> Local DJs and radio presenters provide professional tips</li>
             <li>• <strong>Small group setting:</strong> Maximum 15 participants ensures individual attention</li>
             <li>• <strong>Take-home content:</strong> Leave with recorded audio project and editing skills</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Next Steps</h3>
           <ul className="text-gray-300 space-y-1">
             <li>• Payment instructions will be emailed within 24 hours</li>
             <li>• WhatsApp group invitation for workshop updates and peer connection</li>
             <li>• Pre-workshop preparation email with software recommendations</li>
             <li>• 48-hour reminder call with final venue and timing details</li>
           </ul>
         </div>
       </div>
       
       <div className="mt-6">
         <p className="text-gray-300 mb-4">
           Questions about creative media workshop? Contact: creative@wembley-digital.org.uk
         </p>
         <button 
           onClick={() => window.location.href = '/workshops'}
           className="btn btn-secondary mr-4"
         >
           View Other Workshops
         </button>
         <button 
           onClick={() => window.location.href = '/workshops/q3-stem-fundamentals'}
           className="btn btn-primary"
         >
           Register for Q3: STEM Fundamentals
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="registration-form-container">
     <div className="workshop-summary bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h2 className="text-2xl font-bold text-purple-400 mb-4">{workshopDetails.title}</h2>
       
       <div className="grid md:grid-cols-2 gap-6">
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Workshop Information</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Duration:</strong> 2 hours hands-on creative work</li>
             <li><strong>Cost:</strong> {workshopDetails.cost}</li>
           </ul>
         </div>
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Venue & Availability</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Location:</strong> {workshopDetails.venue}</li>
             <li><strong>Address:</strong> {workshopDetails.address}</li>
             <li><strong>Leaders:</strong> Local DJs and Radio Presenters</li>
             <li><strong>Places:</strong> {workshopDetails.placesAvailable - workshopDetails.currentBookings} remaining of 15</li>
           </ul>
         </div>
       </div>
     </div>

     <form onSubmit={handleSubmit} className="registration-form bg-slate-800 rounded-lg p-6 border border-slate-700">
       <h3 className="text-xl font-bold text-white mb-6">Creative Media Workshop Registration</h3>
       
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
         <label className="block text-white text-sm font-medium mb-2">Creative Interest *</label>
         <select
           name="creativeInterest"
           value={formData.creativeInterest}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
           required
         >
           <option value="">What interests you most about creative media?</option>
           <option value="family-podcasts">Recording family stories and memories</option>
           <option value="community-content">Creating content about community topics</option>
           <option value="personal-projects">Personal creative projects and hobbies</option>
           <option value="technical-skills">Learning technical skills for future opportunities</option>
           <option value="social-sharing">Sharing content with friends and family</option>
         </select>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Device Availability *</label>
         <select
           name="deviceBringing"
           value={formData.deviceBringing}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
           required
         >
           <option value="">Can you bring a smartphone for recording activities?</option>
           <option value="smartphone-yes">Yes, I have a smartphone with recording capability</option>
           <option value="smartphone-basic">Yes, but I'm not sure about recording quality</option>
           <option value="smartphone-no">No, I need to use provided equipment</option>
           <option value="tablet-instead">I have a tablet but no smartphone</option>
         </select>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Previous Creative Experience</label>
         <textarea
           name="previousExperience"
           value={formData.previousExperience}
           onChange={handleInputChange}
           placeholder="Any experience with recording, editing, or creative projects? (Optional - all levels welcome)"
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
         <label className="block text-white text-sm font-medium mb-2">Accessibility or Special Requirements</label>
         <textarea
           name="accessibilityNeeds"
           value={formData.accessibilityNeeds}
           onChange={handleInputChange}
           placeholder="Any accessibility needs, hearing difficulties, or special requirements for the creative workshop"
           rows={3}
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
           <span className="text-gray-300">Send me information about future creative workshops and community media opportunities</span>
         </label>
       </div>
       
       <div className="workshop-expectations bg-slate-700 rounded-lg p-4 mb-6">
         <h4 className="text-white font-semibold mb-2">Workshop Expectations</h4>
         <p className="text-gray-300 text-sm mb-2">
           This workshop focuses on practical creative media skills using basic equipment and free software. 
           You'll learn recording, simple editing, and content creation suitable for family and community sharing.
         </p>
         <p className="text-gray-300 text-sm">
           <strong>Cost:</strong> {workshopDetails.cost} covers venue, equipment use, and materials. 
           Refund available up to 48 hours before workshop.
         </p>
       </div>
       
       <button
         type="submit"
         disabled={!isFormValid() || isSubmitting}
         className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {isSubmitting ? 'Processing Registration...' : 'Register for Creative Media Workshop'}
       </button>
       
       <p className="text-gray-400 text-sm text-center mt-4">
         Questions about creative content or technical requirements? 
         Email creative@wembley-digital.org.uk
       </p>
     </form>
   </div>
 );
};

export default Q2CreativeMediaRegistration;