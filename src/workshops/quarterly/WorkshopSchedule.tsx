import React, { useState } from 'react';

interface Workshop {
 id: string;
 quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
 title: string;
 description: string;
 date: string;
 price: number;
 capacity: number;
 enrolled: number;
 volunteers: string[];
}

const WorkshopSchedule: React.FC = () => {
 const [workshops] = useState<Workshop[]>([
   {
     id: 'q1-digital-basics',
     quarter: 'Q1',
     title: 'Digital Basics Workshop',
     description: 'Email, forms, online safety - led by IT specialists',
     date: 'March 2025',
     price: 50,
     capacity: 15,
     enrolled: 0,
     volunteers: ['IT Specialists', 'Headmistresses']
   },
   {
     id: 'q2-creative-media',
     quarter: 'Q2',
     title: 'Creative Media Workshop', 
     description: 'Podcasting, radio, video editing - led by DJs',
     date: 'June 2025',
     price: 50,
     capacity: 15,
     enrolled: 0,
     volunteers: ['DJs', 'Radio Presenters']
   },
   {
     id: 'q3-stem-fundamentals',
     quarter: 'Q3',
     title: 'STEM Fundamentals Workshop',
     description: 'Basic coding, electronics - led by engineering lecturers', 
     date: 'September 2025',
     price: 50,
     capacity: 15,
     enrolled: 0,
     volunteers: ['Engineering Lecturers', 'Hackspace Network']
   },
   {
     id: 'q4-heritage-community',
     quarter: 'Q4', 
     title: 'Heritage & Community Workshop',
     description: 'Digital preservation of family stories',
     date: 'December 2025',
     price: 50,
     capacity: 15,
     enrolled: 0,
     volunteers: ['Child Development Specialist']
   }
 ]);

 return (
   <div className="workshop-schedule p-6">
     <h2 className="text-2xl font-bold mb-6 text-white">2025 Workshop Calendar</h2>
     <div className="grid gap-6">
       {workshops.map(workshop => (
         <div key={workshop.id} className="workshop-card p-4 bg-slate-800 rounded-lg border border-slate-700">
           <h3 className="text-xl font-bold text-blue-400 mb-2">{workshop.title}</h3>
           <p className="text-gray-300 mb-4">{workshop.description}</p>
           <div className="flex justify-between items-center text-sm">
             <span className="text-green-400 font-bold">£{workshop.price}</span>
             <span className="text-gray-400">{workshop.enrolled}/{workshop.capacity} enrolled</span>
             <span className="text-gray-400">{workshop.date}</span>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default WorkshopSchedule;