import React, { useState } from 'react';

interface StoryFormProps {
  onSubmit: (story: any) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit }) => {
  const [story, setStory] = useState({
    title: '',
    content: '',
    cultural_notes: ''
  });

  return (
    <div className="heritage-story-form p-6 bg-slate-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Share Your Story</h3>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(story); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Story Title</label>
          <input
            type="text"
            value={story.title}
            onChange={(e) => setStory({...story, title: e.target.value})}
            className="w-full p-2 border rounded bg-slate-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Your Story</label>
          <textarea
            value={story.content}
            onChange={(e) => setStory({...story, content: e.target.value})}
            rows={6}
            className="w-full p-2 border rounded bg-slate-700 text-white"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Share Story
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
