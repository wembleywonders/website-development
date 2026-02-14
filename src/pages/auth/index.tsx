import React from 'react';
import { SafeComponent } from '../../wrapper/SafeReact';
// src/pages/auth/index.tsx

const AuthPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-amber-400">Authentication</h1>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-amber-400/20">
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Login/Register</h2>
        <div className="space-y-4">
          <p className="text-white">Authentication features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
