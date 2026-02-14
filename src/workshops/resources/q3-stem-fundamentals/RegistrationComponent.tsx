// src/workshops/resources/q3-stem-fundamentals/RegistrationComponent.tsx
import React, { useState } from 'react';

interface STEMFormData {
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 accessibilityNeeds: string;
 stemInterest: string;
 mathComfort: string;
 emergencyContact: string;
 learningGoals: string;
 hackspaceInterest: boolean;
 marketingConsent: boolean;
}

const Q3STEMFundamentalsRegistration: React.FC = () => {
 const [formData, setFormData] = useState<STEMFormData>({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   accessibilityNeeds: '',
   stemInterest: '',
   mathComfort: '',
   emergencyContact: '',
   learningGoals: '',
   hackspaceInterest: false,
   marketingConsent: false
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [registrationComplete, setRegistrationComplete] = useState(false);

 const workshopDetails = {
   title: 'Q3: STEM Fundamentals Workshop',
   date: 'Saturday, September 13, 2025',
   time: '10:00 AM - 12:30 PM',
   venue: 'Wembley Central Library (portable equipment setup)',
   address: 'High Road, Wembley Central, HA0 2HW',
   cost: '£50.00',
   placesAvailable: 15,
   currentBookings: 4
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
   
   await new Promise(resolve => setTimeout(resolve, 2000));
   
   setRegistrationComplete(true);
   setIsSubmitting(false);
 };

 const isFormValid = () => {
   return formData.firstName && 
          formData.lastName && 
          formData.email && 
          formData.phone && 
          formData.stemInterest &&
          formData.mathComfort;
 };

 if (registrationComplete) {
   return (
     <div className="registration-success bg-green-900/20 border border-green-600/30 rounded-lg p-8 text-center">
       <h2 className="text-2xl font-bold text-green-400 mb-4">STEM Fundamentals Registration Confirmed!</h2>
       
       <div className="space-y-4 text-left max-w-2xl mx-auto">
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Workshop Details</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Workshop:</strong> {workshopDetails.title}</li>
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Duration:</strong> 2.5 hours with hands-on projects</li>
             <li><strong>Venue:</strong> {workshopDetails.venue}</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">What to Bring</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Calculator:</strong> For basic electronic calculations</li>
             <li>• <strong>Notebook and pen:</strong> For circuit diagrams and project notes</li>
             <li>• <strong>Reading glasses:</strong> If needed for small electronic components</li>
             <li>• <strong>Laptop:</strong> If available (library computers provided otherwise)</li>
             <li>• <strong>Curiosity:</strong> About how everyday technology works</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Workshop Activities</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Visual programming:</strong> Learn coding concepts using Scratch</li>
             <li>• <strong>Electronics project:</strong> Build working LED circuit to take home</li>
             <li>• <strong>Technology connections:</strong> Understand programming in daily devices</li>
             <li>• <strong>Hackspace introduction:</strong> Meet local maker community volunteers</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Safety and Support</h3>
           <ul className="text-gray-300 space-y-1">
             <li>• All electronic components are low-voltage and completely safe</li>
             <li>• Engineering lecturers supervise all circuit building activities</li>
             <li>• Safety briefing provided before handling any equipment</li>
             <li>• Individual guidance available throughout hands-on activities</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">After the Workshop</h3>
           <ul className="text-gray-300 space-y-1">
             <li>• Take-home resources for continued learning</li>
             <li>• Local hackspace membership information and beginner events</li>
             <li>• Adult education STEM course recommendations</li>
             <li>• WhatsApp group for questions and peer support</li>
           </ul>
         </div>
       </div>
       
       <div className="mt-6">
         <p className="text-gray-300 mb-4">
           Questions about STEM workshop or technical requirements? Contact: stem@wembley-digital.org.uk
         </p>
         <button 
           onClick={() => window.location.href = '/workshops'}
           className="btn btn-secondary mr-4"
         >
           View All Workshops
         </button>
         <button 
           onClick={() => window.location.href = '/workshops/q4-heritage-community'}
           className="btn btn-primary"
         >
           Register for Q4: Heritage Workshop
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="registration-form-container">
     <div className="workshop-summary bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h2 className="text-2xl font-bold text-green-400 mb-4">{workshopDetails.title}</h2>
       
       <div className="grid md:grid-cols-2 gap-6">
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Workshop Information</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Duration:</strong> 2.5 hours with project work</li>
             <li><strong>Cost:</strong> {workshopDetails.cost}</li>
           </ul>
         </div>
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Leadership & Availability</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Led by:</strong> Electrical Engineering Lecturers</li>
             <li><strong>Support:</strong> Hackspace Network Volunteers</li>
             <li><strong>Venue:</strong> {workshopDetails.venue}</li>
             <li><strong>Places:</strong> {workshopDetails.placesAvailable - workshopDetails.currentBookings} remaining of 15</li>
           </ul>
         </div>
       </div>
     </div>

     <form onSubmit={handleSubmit} className="registration-form bg-slate-800 rounded-lg p-6 border border-slate-700">
       <h3 className="text-xl font-bold text-white mb-6">STEM Fundamentals Registration</h3>
       
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
         <label className="block text-white text-sm font-medium mb-2">STEM Interest *</label>
         <select
           name="stemInterest"
           value={formData.stemInterest}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
           required
         >
           <option value="">What interests you most about STEM fundamentals?</option>
           <option value="understanding-technology">Understanding how everyday technology works</option>
           <option value="programming-basics">Learning basic programming and logical thinking</option>
           <option value="electronics-projects">Hands-on electronics and circuit building</option>
           <option value="career-exploration">Exploring STEM career or education opportunities</option>
           <option value="problem-solving">Developing technical problem-solving skills</option>
         </select>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Mathematics Comfort Level *</label>
         <select
           name="mathComfort"
           value={formData.mathComfort}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
           required
         >
           <option value="">How comfortable are you with basic mathematics?</option>
           <option value="math-confident">Confident with arithmetic and basic calculations</option>
           <option value="math-some-difficulty">Can do basic math but sometimes need help</option>
           <option value="math-anxious">Anxious about math but willing to try with support</option>
           <option value="math-avoided">Avoided math for years but want to learn</option>
         </select>
       </div>
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Learning Goals</label>
         <textarea
           name="learningGoals"
           value={formData.learningGoals}
           onChange={handleInputChange}
           placeholder="What do you hope to learn or achieve from this STEM workshop? (Optional)"
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
       
       <div className="mb-4">
         <label className="block text-white text-sm font-medium mb-2">Accessibility Requirements</label>
         <textarea
           name="accessibilityNeeds"
           value={formData.accessibilityNeeds}
           onChange={handleInputChange}
           placeholder="Any accessibility needs for working with small electronic components or computer screens"
           rows={3}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         />
       </div>
       
       <div className="mb-4">
         <label className="flex items-center cursor-pointer">
           <input
             type="checkbox"
             name="hackspaceInterest"
             checked={formData.hackspaceInterest}
             onChange={handleInputChange}
             className="mr-3"
           />
           <span className="text-gray-300">I'm interested in learning about local hackspace and maker community opportunities</span>
         </label>
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
           <span className="text-gray-300">Send me information about STEM learning opportunities and technical workshops</span>
         </label>
       </div>
       
       <div className="workshop-expectations bg-slate-700 rounded-lg p-4 mb-6">
         <h4 className="text-white font-semibold mb-2">Workshop Reality Check</h4>
         <p className="text-gray-300 text-sm mb-2">
           This workshop provides basic introduction to programming concepts and simple electronics. 
           You'll gain appreciation for how technology works, not professional-level technical skills.
         </p>
         <p className="text-gray-300 text-sm">
           <strong>Safety first:</strong> All activities use low-voltage components supervised by engineering professionals.
           No prior experience required - we start with absolute basics.
         </p>
       </div>
       
       <button
         type="submit"
         disabled={!isFormValid() || isSubmitting}
         className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {isSubmitting ? 'Processing Registration...' : 'Register for STEM Fundamentals Workshop'}
       </button>
       
       <p className="text-gray-400 text-sm text-center mt-4">
         Concerns about mathematics or technical content? 
         Email stem@wembley-digital.org.uk - we support all skill levels
       </p>
     </form>
   </div>
 );
};

export default Q3STEMFundamentalsRegistration;