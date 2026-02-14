// File: src/components/export/JourneyExporter.tsx

import React from 'react';
import { useTransformationStore } from '@/stores/transformationStore';
import { useJournalStore } from '@/stores/journalStore';

export const JourneyExporter = () => {
  const { exportJourney: exportTransformation } = useTransformationStore();
  const { exportJournal } = useJournalStore();
  
  const handleExport = () => {
    // Export complete journey as evidence
    const transformationData = exportTransformation();
    const journalData = exportJournal('markdown');
    
    // Combine into portfolio
    const portfolio = `
# My Creator's Journey - Portfolio

## Transformation Timeline
${transformationData}

## Personal Reflections
${journalData}
    `;
    
    // Download as file
    const blob = new Blob([portfolio], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-creators-journey.md';
    a.click();
  };
  
  return (
    <button onClick={handleExport}>
      📦 Export My Journey (for job applications, funding, etc.)
    </button>
  );
};
