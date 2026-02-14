import React, { useState } from 'react';

const PilotBooking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    expectations: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pilot booking:', formData);
    // In real implementation, this would save to database/spreadsheet
  };

  return (
    <div className="pilot-booking p-6 max-w-md mx-auto bg-slate-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">Book Pilot Workshop - FREE</h3>
      <p className="text-gray-300 mb-4">Digital Basics Workshop - Saturday Jan 18, 10am-12pm</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded bg-slate-700 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-2 border rounded bg-slate-700 text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Digital skills experience</label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
            className="w-full p-2 border rounded bg-slate-700 text-white"
            required
          >
            <option value="">Select level</option>
            <option value="complete-beginner">Complete beginner</option>
            <option value="basic">Basic - can use email</option>
            <option value="intermediate">Intermediate - comfortable online</option>
          </select>
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Book Free Pilot Session
        </button>
      </form>
      
      <p className="text-sm text-gray-400 mt-4">
        This is a pilot session to test our workshop format. Your feedback will help us improve before launching paid workshops.
      </p>
    </div>
  );
};

export default PilotBooking;
