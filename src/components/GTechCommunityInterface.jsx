import React, { useState } from 'react';

const GTechCommunityInterface = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-indigo-600">G-Tech Community</h1>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, Jane!</h2>
        <p className="text-gray-600">Let's continue developing your digital literacy</p>
      </div>

      {/* Main Tabs */}
      <div className="container mx-auto p-4">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'projects' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'learning' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Learning
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'games' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Games
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'chat' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'family' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Family Zone
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto p-4 flex-grow">
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Profile Creation</h3>
                <p className="text-sm text-gray-600 mt-2">Create your digital profile</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Digital Toolkit</h3>
                <p className="text-sm text-gray-600 mt-2">Explore your free tools</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Earn while you Learn</h3>
                <p className="text-sm text-gray-600 mt-2">Discover paid opportunities</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Digital Literacy Framework</h3>
                <p className="text-sm text-gray-600 mt-2">Comprehensive skills development</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">STEM Education</h3>
                <p className="text-sm text-gray-600 mt-2">Science, tech, engineering, math</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Techtreneurs Program</h3>
                <p className="text-sm text-gray-600 mt-2">Technology entrepreneurship</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Educational Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Coding Quest</h3>
                <p className="text-sm text-gray-600 mt-2">Learn programming fundamentals</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Scrap Cat</h3>
                <p className="text-sm text-gray-600 mt-2">Recycling adventures</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">G-Tech Casters</h3>
                <p className="text-sm text-gray-600 mt-2">Teen tech reviewers</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Trubble N Bass</h3>
                <p className="text-sm text-gray-600 mt-2">Music production</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Community Chat</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-gray-600">Connect with 120+ members in discussion forums and direct messaging.</p>
            </div>
          </div>
        )}

        {activeTab === 'family' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Family Zone</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Digital Literacy Storybooks</h3>
                <p className="text-sm text-gray-600 mt-2">Interactive stories for ages 3-8</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-800">Tech Together Coding Kits</h3>
                <p className="text-sm text-gray-600 mt-2">Hands-on projects for ages 6-12</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto">
          <p className="text-sm text-gray-600">© 2025 Wembley Wonders CIC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GTechCommunityInterface;
