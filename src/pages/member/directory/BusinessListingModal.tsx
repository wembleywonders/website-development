// src/pages/member/directory/BusinessListingModal.tsx
import React, { useState } from 'react';
import './BusinessListingModal.css';

interface BusinessListingFormData {
 businessName: string;
 category: string;
 description: string;
 email: string;
 phone: string;
 services: string;
 plan: 'basic' | 'featured' | 'premium';
}

interface BusinessListingModalProps {
 onClose: () => void;
 onSubmit: (formData: BusinessListingFormData) => void;
}

const BusinessListingModal: React.FC<BusinessListingModalProps> = ({ onClose, onSubmit }) => {
 const [selectedPlan, setSelectedPlan] = useState<'basic' | 'featured' | 'premium'>('featured');
 const [formData, setFormData] = useState<BusinessListingFormData>({
   businessName: '',
   category: '',
   description: '',
   email: '',
   phone: '',
   services: '',
   plan: 'featured'
 });

 const [errors, setErrors] = useState<Partial<BusinessListingFormData>>({});

 const pricingPlans = [
   {
     id: 'basic' as const,
     price: '£8',
     period: 'per week',
     features: [
       'Basic listing',
       'Contact information',
       'Service description',
       'Member messaging'
     ]
   },
   {
     id: 'featured' as const,
     price: '£15',
     period: 'per week',
     features: [
       'Featured placement',
       'Photo gallery',
       'Review system',
       'Event promotion',
       'Social media links'
     ]
   },
   {
     id: 'premium' as const,
     price: '£25',
     period: 'per week',
     features: [
       'Top of search',
       'Homepage banner',
       'Event newsletter',
       'ROV promotion',
       'Analytics dashboard'
     ]
   }
 ];

 const categories = [
   'DJs & Musicians',
   'Artists & Sculptors',
   'Tech & Digital',
   'Food & Catering',
   'Fitness & Wellness',
   'Startups & Ideas',
   'Local Shops',
   'Other'
 ];

 const validateForm = (): boolean => {
   const newErrors: Partial<BusinessListingFormData> = {};

   if (!formData.businessName.trim()) {
     newErrors.businessName = 'Business name is required';
   }

   if (!formData.category) {
     newErrors.category = 'Category is required';
   }

   if (!formData.description.trim() || formData.description.length < 50) {
     newErrors.description = 'Description must be at least 50 characters';
   }

   if (!formData.email.trim()) {
     newErrors.email = 'Email is required';
   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
     newErrors.email = 'Please enter a valid email address';
   }

   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };

 const handleInputChange = (field: keyof BusinessListingFormData, value: string) => {
   setFormData(prev => ({ ...prev, [field]: value }));
   // Clear error when user starts typing
   if (errors[field]) {
     setErrors(prev => ({ ...prev, [field]: undefined }));
   }
 };

 const handlePlanSelect = (plan: 'basic' | 'featured' | 'premium') => {
   setSelectedPlan(plan);
   setFormData(prev => ({ ...prev, plan }));
 };

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   
   if (validateForm()) {
     onSubmit({ ...formData, plan: selectedPlan });
   }
 };

 const handleBackdropClick = (e: React.MouseEvent) => {
   if (e.target === e.currentTarget) {
     onClose();
   }
 };

 const getPlanPrice = (plan: 'basic' | 'featured' | 'premium') => {
   const planData = pricingPlans.find(p => p.id === plan);
   return planData ? planData.price : '£15';
 };

 return (
   <div className="advertise-modal" onClick={handleBackdropClick}>
     <div className="modal-content">
       <div className="modal-header">
         <h3 className="modal-title">Advertise in Community Directory</h3>
         <p>Reach 1,300+ engaged Wembley residents and build your local presence</p>
         <button className="modal-close" onClick={onClose}>&times;</button>
       </div>
       
       <div className="pricing-grid">
         {pricingPlans.map((plan) => (
           <div
             key={plan.id}
             className={`pricing-card ${selectedPlan === plan.id ? 'selected' : ''}`}
             onClick={() => handlePlanSelect(plan.id)}
           >
             <div className="price-amount">{plan.price}</div>
             <div className="price-period">{plan.period}</div>
             <ul className="price-features">
               {plan.features.map((feature, index) => (
                 <li key={index}>{feature}</li>
               ))}
             </ul>
           </div>
         ))}
       </div>
       
       <form className="advertise-form" onSubmit={handleSubmit}>
         <div className="form-row">
           <div className="form-group">
             <label className="form-label">Business/Service Name *</label>
             <input
               type="text"
               className={`form-input ${errors.businessName ? 'error' : ''}`}
               value={formData.businessName}
               onChange={(e) => handleInputChange('businessName', e.target.value)}
               placeholder="Enter your business name"
             />
             {errors.businessName && (
               <span className="error-message">{errors.businessName}</span>
             )}
           </div>
           <div className="form-group">
             <label className="form-label">Category *</label>
             <select
               className={`form-select ${errors.category ? 'error' : ''}`}
               value={formData.category}
               onChange={(e) => handleInputChange('category', e.target.value)}
             >
               <option value="">Select category...</option>
               {categories.map((category) => (
                 <option key={category} value={category}>
                   {category}
                 </option>
               ))}
             </select>
             {errors.category && (
               <span className="error-message">{errors.category}</span>
             )}
           </div>
         </div>
         
         <div className="form-group">
           <label className="form-label">Description *</label>
           <textarea
             className={`form-textarea ${errors.description ? 'error' : ''}`}
             value={formData.description}
             onChange={(e) => handleInputChange('description', e.target.value)}
             placeholder="Describe your business, services, and what makes you special... (minimum 50 characters)"
             rows={4}
           />
           <div className="character-count">
             {formData.description.length}/50 characters minimum
           </div>
           {errors.description && (
             <span className="error-message">{errors.description}</span>
           )}
         </div>
         
         <div className="form-row">
           <div className="form-group">
             <label className="form-label">Contact Email *</label>
             <input
               type="email"
               className={`form-input ${errors.email ? 'error' : ''}`}
               value={formData.email}
               onChange={(e) => handleInputChange('email', e.target.value)}
               placeholder="your.email@example.com"
             />
             {errors.email && (
               <span className="error-message">{errors.email}</span>
             )}
           </div>
           <div className="form-group">
             <label className="form-label">Phone (optional)</label>
             <input
               type="tel"
               className="form-input"
               value={formData.phone}
               onChange={(e) => handleInputChange('phone', e.target.value)}
               placeholder="+44 20 1234 5678"
             />
           </div>
         </div>
         
         <div className="form-group">
           <label className="form-label">Services/Tags</label>
           <input
             type="text"
             className="form-input"
             value={formData.services}
             onChange={(e) => handleInputChange('services', e.target.value)}
             placeholder="e.g., Event DJ, Music Production, Sound System Rental"
           />
           <small className="form-help">
             Separate multiple services with commas
           </small>
         </div>

         <div className="terms-section">
           <label className="checkbox-container">
             <input type="checkbox" required />
             <span className="checkmark"></span>
             I agree to the <a href="/terms" target="_blank">Terms of Service</a> and understand that listings are subject to community guidelines
           </label>
         </div>
         
         <div className="modal-actions">
           <button type="button" className="modal-btn secondary" onClick={onClose}>
             Cancel
           </button>
           <button type="submit" className="modal-btn primary">
             Start Advertising - {getPlanPrice(selectedPlan)}/week
           </button>
         </div>
       </form>
     </div>
   </div>
 );
};

export default BusinessListingModal;