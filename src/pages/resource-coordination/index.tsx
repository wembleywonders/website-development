
import React, { useState } from 'react';

interface Resource {
 id: string;
 category: string;
 name: string;
 description: string;
 availability: string;
 coordination: string;
 workshopUse: string;
}

interface Gap {
 id: string;
 area: string;
 description: string;
 impact: string;
 solutions: string[];
}

const ResourceCoordination: React.FC = () => {
 const [selectedCategory, setSelectedCategory] = useState('all');

 const resources: Resource[] = [
   {
     id: 'library-computers',
     category: 'equipment',
     name: 'Wembley Central Library Computer Suite',
     description: '12 desktop computers available for public use, including workshop sessions',
     availability: 'Available for booking 2-hour blocks on weekends for workshop delivery',
     coordination: 'Pre-booking required through library staff, equipment checked before each session',
     workshopUse: 'Primary venue for Digital Basics and STEM Fundamentals workshops'
   },
   {
     id: 'tablet-lending',
     category: 'equipment',
     name: 'Community Tablet Lending Pool',
     description: 'Collection of 8 tablets available for workshop participants without personal devices',
     availability: 'Available during workshop sessions only, not for extended lending',
     coordination: 'Volunteer manages check-out/check-in during workshops, basic troubleshooting provided',
     workshopUse: 'Backup devices for participants without laptops or computers'
   },
   {
     id: 'community-centre',
     category: 'venues',
     name: 'Wembley Community Centre Meeting Room',
     description: 'Accessible meeting space for 20 people with basic AV equipment',
     availability: 'Weekend availability subject to existing bookings, requires advance scheduling',
     coordination: 'Direct booking with centre management, key collection arrangements needed',
     workshopUse: 'Alternative venue when library unavailable, main venue for Creative Media workshops'
   },
   {
     id: 'volunteer-skills',
     category: 'expertise',
     name: 'Community Volunteer Specialists',
     description: 'IT specialists, headmistresses, DJs, radio presenters, engineering lecturers',
     availability: 'Quarterly commitment for weekend workshop delivery, limited ongoing availability',
     coordination: 'Quarterly planning meetings to confirm volunteer availability and workshop assignments',
     workshopUse: 'Core teaching expertise for each quarterly workshop theme'
   },
   {
     id: 'printing-materials',
     category: 'materials',
     name: 'Workshop Materials and Printing',
     description: 'Certificates, handouts, basic workshop materials and supplies',
     availability: 'Sourced per workshop through library printing services and volunteer contributions',
     coordination: 'Material preparation coordinated 2 weeks before each workshop session',
     workshopUse: 'Essential workshop handouts, certificates, and practical learning materials'
   }
 ];

 const gaps: Gap[] = [
   {
     id: 'transport-access',
     area: 'Transportation',
     description: 'Limited public transport access to workshop venues for some community members',
     impact: 'Reduces workshop accessibility for residents in areas with poor transport links',
     solutions: [
       'Coordinate shared transportation through mutual aid network',
       'Offer workshops at multiple venue locations across community',
       'Provide virtual attendance option for those unable to travel',
       'Partner with local transport initiatives for workshop days'
     ]
   },
   {
     id: 'equipment-shortage',
     area: 'Digital Equipment',
     description: 'Insufficient laptops/tablets for all potential workshop participants',
     impact: 'Limits workshop capacity to available equipment rather than community demand',
     solutions: [
       'Expand tablet lending pool through community donations',
       'Partner with local businesses for equipment lending',
       'Encourage participants to bring own devices where possible',
       'Run multiple smaller sessions to maximize equipment use'
     ]
   },
   {
     id: 'childcare-capacity',
     area: 'Childcare Support',
     description: 'Limited volunteer capacity for childcare during workshop sessions',
     impact: 'Prevents parent participation in workshops due to family responsibilities',
     solutions: [
       'Recruit additional childcare volunteers from parent community',
       'Coordinate informal childcare sharing between workshop families',
       'Offer separate family-friendly workshop sessions',
       'Partner with local childcare providers for workshop days'
     ]
   },
   {
     id: 'follow-up-support',
     area: 'Post-Workshop Support',
     description: 'Gaps between quarterly workshops leave participants without ongoing skill reinforcement',
     impact: 'Workshop learning may fade without practice opportunities between sessions',
     solutions: [
       'Create peer practice groups using mutual aid coordination',
       'Develop take-home resources for independent skill practice',
       'Offer monthly informal troubleshooting sessions at library',
       'Connect participants with existing community tech support'
     ]
   }
 ];

 const coordinationMethods = [
   {
     function: 'Resource Inventory',
     description: 'Quarterly assessment of available community assets for workshop delivery',
     implementation: 'Volunteer coordinators maintain simple spreadsheet of venues, equipment, and volunteer availability'
   },
   {
     function: 'Gap Identification',
     description: 'Systematic identification of resource shortfalls that prevent workshop delivery or participation',
     implementation: 'Post-workshop feedback collection identifies practical barriers and resource needs for next quarter'
   },
   {
     function: 'Partnership Development',
     description: 'Building relationships with community organizations to fill resource gaps',
     implementation: 'Quarterly outreach to library, community centre, local businesses for ongoing partnership support'
   },
   {
     function: 'Volunteer Coordination',
     description: 'Matching volunteer expertise with workshop delivery needs across quarterly sessions',
     implementation: 'Advance planning meetings to confirm volunteer availability and backup coordination for each workshop'
   }
 ];

 const filteredResources = selectedCategory === 'all' 
   ? resources 
   : resources.filter(resource => resource.category === selectedCategory);

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
             <span>📋</span>
             Resource Coordination
           </div>
           
           <h1 className="hero-title fade-in">
             Workshop Resource Coordination
           </h1>
           
           <p className="hero-subtitle fade-in">
             Coordinating community assets and identifying gaps for sustainable quarterly workshop delivery.
           </p>
         </div>

         <div className="resource-filters mb-8">
           <div className="flex justify-center gap-4 mb-6">
             {['all', 'equipment', 'venues', 'expertise', 'materials'].map(category => (
               <button
                 key={category}
                 onClick={() => setSelectedCategory(category)}
                 className={`px-4 py-2 rounded-lg border transition-colors ${
                   selectedCategory === category
                     ? 'bg-blue-600 text-white border-blue-600'
                     : 'bg-slate-800 text-gray-300 border-slate-600 hover:border-blue-400'
                 }`}
               >
                 {category.charAt(0).toUpperCase() + category.slice(1)}
               </button>
             ))}
           </div>
         </div>

         <div className="resources-section mb-12">
           <h2 className="section-title text-center">Available Community Resources</h2>
           <div className="grid gap-6 md:grid-cols-2">
             {filteredResources.map(resource => (
               <div key={resource.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                 <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-bold text-blue-400">{resource.name}</h3>
                   <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                     {resource.category}
                   </span>
                 </div>
                 
                 <p className="text-gray-300 mb-4">{resource.description}</p>
                 
                 <div className="space-y-3">
                   <div>
                     <strong className="text-white">Availability:</strong>
                     <p className="text-gray-300 text-sm">{resource.availability}</p>
                   </div>
                   
                   <div>
                     <strong className="text-white">Coordination:</strong>
                     <p className="text-gray-300 text-sm">{resource.coordination}</p>
                   </div>
                   
                   <div className="bg-slate-700 p-3 rounded">
                     <strong className="text-white">Workshop Use:</strong>
                     <p className="text-gray-300 text-sm">{resource.workshopUse}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="gaps-section mb-12">
           <h2 className="section-title text-center">Resource Gaps</h2>
           <p className="section-subtitle text-center mb-8">
             Identified gaps that limit workshop delivery or community participation.
           </p>
           
           <div className="grid gap-6 md:grid-cols-2">
             {gaps.map(gap => (
               <div key={gap.id} className="bg-slate-800 rounded-lg p-6 border border-red-600/20">
                 <h3 className="text-xl font-bold text-red-400 mb-3">{gap.area}</h3>
                 <p className="text-gray-300 mb-4">{gap.description}</p>
                 
                 <div className="mb-4">
                   <strong className="text-white">Impact:</strong>
                   <p className="text-gray-300 text-sm bg-slate-700 p-2 rounded mt-1">{gap.impact}</p>
                 </div>
                 
                 <div>
                   <strong className="text-white">Potential Solutions:</strong>
                   <ul className="mt-2 space-y-1">
                     {gap.solutions.map((solution, index) => (
                       <li key={index} className="text-gray-300 text-sm">
                         • {solution}
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="coordination-methods-section">
           <h2 className="section-title text-center">Coordination Methods</h2>
           <p className="section-subtitle text-center mb-8">
             Practical approaches for managing resources and partnerships for quarterly workshop delivery.
           </p>
           
           <div className="grid gap-6 md:grid-cols-2">
             {coordinationMethods.map((method, index) => (
               <div key={index} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                 <h3 className="text-xl font-bold text-green-400 mb-3">{method.function}</h3>
                 <p className="text-gray-300 mb-4">{method.description}</p>
                 
                 <div className="bg-slate-700 p-3 rounded">
                   <strong className="text-white">Implementation:</strong>
                   <p className="text-gray-300 text-sm mt-1">{method.implementation}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </main>
   </div>
 );
};

export default ResourceCoordination;