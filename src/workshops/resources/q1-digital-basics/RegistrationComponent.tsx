// src/workshops/resources/q1-digital-basics/RegistrationComponent.tsx
import React, { useState } from 'react';

interface RegistrationFormData {
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 accessibilityNeeds: string;
 experienceLevel: string;
 emergencyContact: string;
 equipmentNeeds: boolean;
 marketingConsent: boolean;
}

const Q1DigitalBasicsRegistration: React.FC = () => {
 const [formData, setFormData] = useState<RegistrationFormData>({
   firstName: '',
   lastName: '',
   email: '',
   phone: '',
   accessibilityNeeds: '',
   experienceLevel: '',
   emergencyContact: '',
   equipmentNeeds: false,
   marketingConsent: false
 });
 
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [registrationComplete, setRegistrationComplete] = useState(false);

 const workshopDetails = {
   title: 'Q1: Digital Basics Workshop',
   date: 'Saturday, March 15, 2025',
   time: '10:00 AM - 12:00 PM',
   venue: 'Wembley Central Library Computer Suite',
   address: 'High Road, Wembley Central, HA0 2HW',
   cost: '£50.00',
   placesAvailable: 15,
   currentBookings: 8 // This would come from real booking system
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
   
   // In real implementation, this would integrate with:
   // - Payment processor (Stripe/PayPal)
   // - Email confirmation system
   // - Workshop management database
   // - WhatsApp group invitation
   
   setRegistrationComplete(true);
   setIsSubmitting(false);
 };

 const isFormValid = () => {
   return formData.firstName && 
          formData.lastName && 
          formData.email && 
          formData.phone && 
          formData.experienceLevel;
 };

 if (registrationComplete) {
   return (
     <div className="registration-success bg-green-900/20 border border-green-600/30 rounded-lg p-8 text-center">
       <h2 className="text-2xl font-bold text-green-400 mb-4">Registration Confirmed!</h2>
       
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
           <h3 className="text-lg font-bold text-white mb-3">What Happens Next</h3>
           <ul className="text-gray-300 space-y-2">
             <li>• <strong>Confirmation email:</strong> Check your email for workshop details and preparation information</li>
             <li>• <strong>WhatsApp group:</strong> You'll receive an invitation to join the workshop group for updates</li>
             <li>• <strong>Reminder call:</strong> We'll contact you 48 hours before the workshop</li>
             <li>• <strong>Venue access:</strong> Arrive 10 minutes early for setup and welcome</li>
           </ul>
         </div>
         
         <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-3">Bring With You</h3>
           <ul className="text-gray-300 space-y-1">
             <li>• Notebook and pen for taking notes</li>
             <li>• Reading glasses if needed</li>
             <li>• Any specific questions about email or internet safety</li>
             <li>• Comfortable attitude toward learning new things</li>
           </ul>
         </div>
       </div>
       
       <div className="mt-6">
         <p className="text-gray-300 mb-4">
           Questions? Contact us: workshops@wembley-digital.org.uk or 0208 902 9991
         </p>
         <button 
           onClick={() => window.location.href = '/workshops'}
           className="btn btn-primary"
         >
           View All Workshops
         </button>
       </div>
     </div>
   );
 }

 return (
   <div className="registration-form-container">
     <div className="workshop-summary bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
       <h2 className="text-2xl font-bold text-blue-400 mb-4">{workshopDetails.title}</h2>
       
       <div className="grid md:grid-cols-2 gap-6">
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Workshop Information</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Date:</strong> {workshopDetails.date}</li>
             <li><strong>Time:</strong> {workshopDetails.time}</li>
             <li><strong>Duration:</strong> 2 hours</li>
             <li><strong>Cost:</strong> {workshopDetails.cost}</li>
           </ul>
         </div>
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Venue Details</h3>
           <ul className="text-gray-300 space-y-1">
             <li><strong>Location:</strong> {workshopDetails.venue}</li>
             <li><strong>Address:</strong> {workshopDetails.address}</li>
             <li><strong>Accessibility:</strong> Wheelchair accessible, parking available</li>
             <li><strong>Places:</strong> {workshopDetails.placesAvailable - workshopDetails.currentBookings} remaining</li>
           </ul>
         </div>
       </div>
     </div>

     <form onSubmit={handleSubmit} className="registration-form bg-slate-800 rounded-lg p-6 border border-slate-700">
       <h3 className="text-xl font-bold text-white mb-6">Registration Form</h3>
       
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
         <label className="block text-white text-sm font-medium mb-2">Experience Level *</label>
         <select
           name="experienceLevel"
           value={formData.experienceLevel}
           onChange={handleInputChange}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
           required
         >
           <option value="">Please select your experience level</option>
           <option value="complete-beginner">Complete beginner - never used email regularly</option>
           <option value="very-basic">Very basic - have email but struggle with other online activities</option>
           <option value="some-experience">Some experience - comfortable with email, want to learn more</option>
           <option value="refresher">Refresher - used to be more confident, need to catch up</option>
         </select>
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
           placeholder="Please describe any accessibility needs (large print materials, hearing loop, mobility assistance, etc.)"
           rows={3}
           className="w-full p-3 bg-slate-700 text-white rounded border border-slate-600"
         />
       </div>
       
       <div className="mb-6">
         <label className="flex items-center cursor-pointer">
           <input
             type="checkbox"
             name="equipmentNeeds"
             checked={formData.equipmentNeeds}
             onChange={handleInputChange}
             className="mr-3"
           />
           <span className="text-gray-300">I need to use library computers (do not have access to suitable device)</span>
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
           <span className="text-gray-300">I would like to receive information about future workshops and community events</span>
         </label>
       </div>
       
       <div className="payment-info bg-slate-700 rounded-lg p-4 mb-6">
         <h4 className="text-white font-semibold mb-2">Payment Information</h4>
         <p className="text-gray-300 text-sm mb-2">
           Workshop fee: <strong>{workshopDetails.cost}</strong>
         </p>
         <p className="text-gray-300 text-sm">
           Payment will be processed securely after registration. You will receive payment instructions by email.
           Full refund available up to 48 hours before workshop date.
         </p>
       </div>
       
       <button
         type="submit"
         disabled={!isFormValid() || isSubmitting}
         className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {isSubmitting ? 'Processing Registration...' : 'Complete Registration'}
       </button>
       
       <p className="text-gray-400 text-sm text-center mt-4">
         By registering, you agree to our workshop terms and conditions.
         Questions? Email workshops@wembley-digital.org.uk
       </p>
     </form>
   </div>
 );
};

export default Q1DigitalBasicsRegistration;