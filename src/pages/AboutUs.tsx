import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from '../components/ui/card';

const AboutUs = () => {
  const markdownContent = `
# About G-Tech Community

G-Tech Community bridges the digital divide through accessible learning pathways.

## Our Mission
- Provide inclusive digital education
- Support career development
- Build sustainable communities
`;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default AboutUs;
