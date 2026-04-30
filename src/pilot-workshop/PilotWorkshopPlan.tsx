import React, { useState } from 'react';

interface PilotWorkshop {
  title: string;
  date: string;
  duration: string;
  participants: number;
  volunteer: string;
  venue: string;
  costs: {
    venue: number;
    materials: number;
    refreshments: number;
    total: number;
  };
  objectives: string[];
  equipment: string[];
}

const PilotWorkshopPlan: React.FC = () => {
  const [workshop] = useState<PilotWorkshop>({
    title: 'Digital Basics Pilot - Email and Online Safety',
    date: 'Saturday, January 18, 2025',
    duration: '2 hours (10am-12pm)',
    participants: 8,
    volunteer: 'IT Specialist + Headmistress backup',
    venue: 'Wembley Wonders CIC, 452 High Road, Wembley HA9 7AY',
    costs: {
      venue: 25,
      materials: 15,
      refreshments: 10,
      total: 50
    },
    objectives: [
      'Test volunteer delivery capacity',
      'Validate participant interest and engagement',
      'Document learning outcomes',
      'Generate testimonials and photos',
      'Assess venue suitability'
    ],
    equipment: [
      'Laptops (participants bring own)',
      'Backup tablets (3 available)',
      'Flipchart paper and pens',
      'Camera for documentation',
      'Sign-in sheet and feedback forms'
    ]
  });

  return (
    <div className="pilot-plan p-6 bg-slate-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Pilot Workshop Plan</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="workshop-details">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Workshop Details</h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Title:</strong> {workshop.title}</p>
            <p><strong>Date:</strong> {workshop.date}</p>
            <p><strong>Duration:</strong> {workshop.duration}</p>
            <p><strong>Participants:</strong> {workshop.participants} (small group for testing)</p>
            <p><strong>Volunteer:</strong> {workshop.volunteer}</p>
            <p><strong>Venue:</strong> {workshop.venue}</p>
          </div>
        </div>
        
        <div className="costs">
          <h3 className="text-lg font-semibold text-green-400 mb-2">Self-Funding Costs</h3>
          <div className="space-y-1 text-gray-300">
            <p>Venue hire: £{workshop.costs.venue}</p>
            <p>Materials: £{workshop.costs.materials}</p>
            <p>Refreshments: £{workshop.costs.refreshments}</p>
            <p className="font-bold">Total: £{workshop.costs.total}</p>
          </div>
        </div>
      </div>
      
      <div className="objectives mt-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-2">Documentation Objectives</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {workshop.objectives.map((obj, index) => (
            <li key={index}>{obj}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PilotWorkshopPlan;
