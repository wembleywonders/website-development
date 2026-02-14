import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniLabStep from './steps/MiniLabStep';
import JournalStep from './steps/Journalstep';
import VoiceNoteStep from './steps/Voicenotestep';
import GalleryPostStep from './steps/Gallerypoststep';
import ConversionModal from './ConversionModal';
import './FreeSandbox.css';

interface SandboxProgress {
  currentStep: 'mini-lab' | 'journal' | 'voice' | 'gallery' | 'complete';
  miniLabComplete: boolean;
  journalComplete: boolean;
  voiceComplete: boolean;
  postsUsed: number;
  labResult?: any;
  journalEntry?: string;
  voiceNoteUrl?: string;
}

const FreeSandbox: React.FC = () => {
  const [progress, setProgress] = useState<SandboxProgress>({
    currentStep: 'mini-lab',
    miniLabComplete: false,
    journalComplete: false,
    voiceComplete: false,
    postsUsed: 0,
  });
  
  const [showConversion, setShowConversion] = useState(false);
  const [conversionType, setConversionType] = useState<'first-post' | 'last-post'>('first-post');
  const navigate = useNavigate();

  // Check if user is already a member
  useEffect(() => {
    const isMember = checkMembershipStatus(); // Your auth logic
    if (isMember) {
      navigate('/creators-hub');
    }
  }, [navigate]);

  const handleMiniLabComplete = (result: any) => {
    setProgress(prev => ({
      ...prev,
      miniLabComplete: true,
      labResult: result,
      currentStep: 'journal',
    }));
  };

  const handleJournalComplete = (entry: string) => {
    setProgress(prev => ({
      ...prev,
      journalComplete: true,
      journalEntry: entry,
      currentStep: 'voice',
    }));
  };

  const handleVoiceComplete = (audioUrl: string) => {
    setProgress(prev => ({
      ...prev,
      voiceComplete: true,
      voiceNoteUrl: audioUrl,
      currentStep: 'gallery',
    }));
  };

  const handleGalleryPost = async () => {
    // Post to gallery
    const postData = {
      labResult: progress.labResult,
      journal: progress.journalEntry,
      voiceNote: progress.voiceNoteUrl,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save post (to your backend or storage)
      await saveGalleryPost(postData);
      
      const newPostCount = progress.postsUsed + 1;
      
      setProgress(prev => ({
        ...prev,
        postsUsed: newPostCount,
        currentStep: 'complete',
      }));

      // Show appropriate conversion modal
      if (newPostCount === 1) {
        setConversionType('first-post');
        setShowConversion(true);
      } else if (newPostCount === 2) {
        setConversionType('last-post');
        setShowConversion(true);
      }
    } catch (error) {
      console.error('Failed to post to gallery:', error);
    }
  };

  const handleConversionDecline = () => {
    setShowConversion(false);
    
    if (progress.postsUsed < 2) {
      // Allow them to create another post
      setProgress(prev => ({
        ...prev,
        currentStep: 'mini-lab',
        miniLabComplete: false,
        journalComplete: false,
        voiceComplete: false,
      }));
    } else {
      // No more free posts - redirect to browse-only mode
      navigate('/creators-hub/browse');
    }
  };

  const handleConversionAccept = () => {
    navigate('/join'); // Your membership signup page
  };

  return (
    <div className="free-sandbox">
      {/* Progress Indicator */}
      <div className="sandbox-progress">
        <div className={`progress-step ${progress.miniLabComplete ? 'complete' : progress.currentStep === 'mini-lab' ? 'active' : ''}`}>
          1. Mini Lab
        </div>
        <div className={`progress-step ${progress.journalComplete ? 'complete' : progress.currentStep === 'journal' ? 'active' : ''}`}>
          2. Journal
        </div>
        <div className={`progress-step ${progress.voiceComplete ? 'complete' : progress.currentStep === 'voice' ? 'active' : ''}`}>
          3. Voice Note
        </div>
        <div className={`progress-step ${progress.currentStep === 'gallery' || progress.currentStep === 'complete' ? 'active' : ''}`}>
          4. Share to Gallery
        </div>
      </div>

      {/* Posts remaining indicator */}
      <div className="posts-remaining">
        Free posts remaining: <strong>{2 - progress.postsUsed}</strong>
      </div>

      {/* Step Content */}
      <div className="sandbox-content">
        {progress.currentStep === 'mini-lab' && (
          <MiniLabStep onComplete={handleMiniLabComplete} />
        )}
        
        {progress.currentStep === 'journal' && (
          <JournalStep 
            labResult={progress.labResult}
            onComplete={handleJournalComplete}
          />
        )}
        
        {progress.currentStep === 'voice' && (
          <VoiceNoteStep
            journalEntry={progress.journalEntry}
            onComplete={handleVoiceComplete}
          />
        )}
        
        {progress.currentStep === 'gallery' && (
          <GalleryPostStep
            labResult={progress.labResult}
            journal={progress.journalEntry}
            voiceNote={progress.voiceNoteUrl}
            onPost={handleGalleryPost}
          />
        )}
        
        {progress.currentStep === 'complete' && (
          <div className="post-complete">
            <h2>🎉 Your work is live in the Gallery!</h2>
            <p>Your voice note and journal are now visible to the community.</p>
            
            {progress.postsUsed < 2 ? (
              <button onClick={() => setProgress(prev => ({ ...prev, currentStep: 'mini-lab' }))}>
                Create Another Post
              </button>
            ) : (
              <div className="browse-mode-notice">
                <p>You've used both free posts. Join as a member to continue creating!</p>
                <button onClick={() => navigate('/join')}>Become a Member</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conversion Modal */}
      {showConversion && (
        <ConversionModal
          type={conversionType}
          postsRemaining={2 - progress.postsUsed}
          onAccept={handleConversionAccept}
          onDecline={handleConversionDecline}
        />
      )}
    </div>
  );
};

// Helper function (you'll implement with your auth system)
const checkMembershipStatus = (): boolean => {
  // Check if user is logged in and has active membership
  return false; // Placeholder
};

const saveGalleryPost = async (postData: any): Promise<void> => {
  // Save to your backend or use window.storage
  // For now, simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('Saved post:', postData);
};

export default FreeSandbox;
