import React from 'react';

interface SafeComponentProps {
  children: React.ReactNode;
}

export const SafeComponent: React.FC<SafeComponentProps> = ({ children }) => {
  return (
    <div className="safe-component">
      {children}
    </div>
  );
};
