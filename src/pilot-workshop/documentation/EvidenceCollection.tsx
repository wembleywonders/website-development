import React, { useState } from 'react';

interface Evidence {
  attendance: number;
  demographics: string;
  testimonials: string[];
  photos: string[];
  learningOutcomes: string[];
  challenges: string[];
  improvements: string[];
}

const EvidenceCollection: React.FC = () => {
  const [evidence, setEvidence] = useState<Evidence>({
    attendance: 0,
    demographics: '',
    testimonials: [],
    photos: [],
    learningOutcomes: [],
    challenges: [],
    improvements: []
  });

  return (
    <div className="evidence-collection p-6">
      <h2 className="text-2xl font-bold mb-4">Grant Application Evidence</h2>
      
      <div className="documentation-checklist space-y-4">
        <div className="checklist-item p-4 bg-slate-800 rounded">
          <h3 className="font-semibold text-blue-400">Required for UnLtd Application:</h3>
          <ul className="mt-2 space-y-1 text-gray-300">
            <li>□ Workshop attendance record (min 6 participants)</li>
            <li>□ 3 participant testimonials</li>
            <li>□ Before/after skills assessment</li>
            <li>□ Photos of workshop in action</li>
            <li>□ Volunteer feedback on delivery</li>
          </ul>
        </div>
        
        <div className="checklist-item p-4 bg-slate-800 rounded">
          <h3 className="font-semibold text-green-400">Required for Allen Lane Foundation:</h3>
          <ul className="mt-2 space-y-1 text-gray-300">
            <li>□ Evidence of community need</li>
            <li>□ Participant demographic data</li>
            <li>□ Learning outcome measurements</li>
            <li>□ Cost-per-participant calculation</li>
            <li>□ Volunteer capacity demonstration</li>
          </ul>
        </div>
        
        <div className="checklist-item p-4 bg-slate-800 rounded">
          <h3 className="font-semibold text-purple-400">Required for Local Community Foundations:</h3>
          <ul className="mt-2 space-y-1 text-gray-300">
            <li>□ Local resident participation proof</li>
            <li>□ Community venue usage evidence</li>
            <li>□ Partnership with local organizations</li>
            <li>□ Immediate community impact stories</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCollection;
