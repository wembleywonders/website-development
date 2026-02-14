import { useState, useCallback, useEffect } from 'react';

export interface VolunteerProfile {
  id: string;
  name: string;
  role: 'host' | 'producer' | 'tech' | 'content_creator';
  experience: 'beginner' | 'intermediate' | 'advanced';
  interests: string[];
  availability: string[];
  isActive: boolean;
}

export interface VolunteerModeState {
  isVolunteer: boolean;
  profile: VolunteerProfile | null;
  showTutorial: boolean;
  pendingUploads: any[];
  permissions: {
    canUpload: boolean;
    canGoLive: boolean;
    canModerate: boolean;
    canAccessAnalytics: boolean;
  };
  notifications: any[];
  recentActivity: any[];
}

const VOLUNTEER_STORAGE_KEY = 'raydyo-volunteer-profile';
const TUTORIAL_STORAGE_KEY = 'raydyo-tutorial-completed';

export const useVolunteerMode = (): VolunteerModeState & {
  login: (profile: VolunteerProfile) => void;
  logout: () => void;
  completeTutorial: () => void;
  handleUpload: (file: File, metadata?: any) => Promise<void>;
  startHostApplication: () => void;
  openSubmissionForm: () => void;
  joinTechTeam: () => void;
  updateProfile: (updates: Partial<VolunteerProfile>) => void;
} => {
  const [state, setState] = useState<VolunteerModeState>(() => {
    const savedProfile = localStorage.getItem(VOLUNTEER_STORAGE_KEY);
    const tutorialCompleted = localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
    
    const profile = savedProfile ? JSON.parse(savedProfile) : null;
    
    return {
      isVolunteer: !!profile,
      profile,
      showTutorial: !!profile && !tutorialCompleted,
      pendingUploads: [],
      permissions: profile ? {
        canUpload: ['host', 'producer', 'content_creator'].includes(profile.role),
        canGoLive: ['host', 'producer'].includes(profile.role),
        canModerate: ['producer', 'tech'].includes(profile.role),
        canAccessAnalytics: ['producer', 'tech'].includes(profile.role)
      } : {
        canUpload: false,
        canGoLive: false,
        canModerate: false,
        canAccessAnalytics: false
      },
      notifications: [],
      recentActivity: []
    };
  });

  const login = useCallback((profile: VolunteerProfile) => {
    localStorage.setItem(VOLUNTEER_STORAGE_KEY, JSON.stringify(profile));
    
    const tutorialCompleted = localStorage.getItem(TUTORIAL_STORAGE_KEY) === 'true';
    
    setState(prev => ({
      ...prev,
      isVolunteer: true,
      profile,
      showTutorial: !tutorialCompleted,
      permissions: {
        canUpload: ['host', 'producer', 'content_creator'].includes(profile.role),
        canGoLive: ['host', 'producer'].includes(profile.role),
        canModerate: ['producer', 'tech'].includes(profile.role),
        canAccessAnalytics: ['producer', 'tech'].includes(profile.role)
      }
    }));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(VOLUNTEER_STORAGE_KEY);
    setState(prev => ({
      ...prev,
      isVolunteer: false,
      profile: null,
      showTutorial: false,
      permissions: {
        canUpload: false,
        canGoLive: false,
        canModerate: false,
        canAccessAnalytics: false
      }
    }));
  }, []);

  const completeTutorial = useCallback(() => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, 'true');
    setState(prev => ({ ...prev, showTutorial: false }));
  }, []);

  const handleUpload = useCallback(async (file: File, metadata?: any) => {
    if (!state.permissions.canUpload) {
      throw new Error('You do not have permission to upload content');
    }

    const uploadId = Date.now().toString();
    const upload = {
      id: uploadId,
      file,
      metadata: {
        title: metadata?.title || file.name,
        description: metadata?.description || '',
        tags: metadata?.tags || [],
        category: metadata?.category || 'general',
        ...metadata
      },
      status: 'uploading',
      progress: 0,
      uploadedAt: new Date().toISOString(),
      uploadedBy: state.profile?.name || 'Unknown'
    };

    setState(prev => ({
      ...prev,
      pendingUploads: [...prev.pendingUploads, upload]
    }));

    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setState(prev => ({
          ...prev,
          pendingUploads: prev.pendingUploads.map(u =>
            u.id === uploadId ? { ...u, progress } : u
          )
        }));
      }

      // Mark as completed
      setState(prev => ({
        ...prev,
        pendingUploads: prev.pendingUploads.map(u =>
          u.id === uploadId ? { ...u, status: 'completed', progress: 100 } : u
        ),
        notifications: [
          ...prev.notifications,
          {
            id: Date.now(),
            type: 'success',
            message: `"${upload.metadata.title}" uploaded successfully!`,
            timestamp: new Date().toISOString()
          }
        ]
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        pendingUploads: prev.pendingUploads.map(u =>
          u.id === uploadId ? { ...u, status: 'failed' } : u
        ),
        notifications: [
          ...prev.notifications,
          {
            id: Date.now(),
            type: 'error',
            message: `Failed to upload "${upload.metadata.title}". Please try again.`,
            timestamp: new Date().toISOString()
          }
        ]
      }));
      throw error;
    }
  }, [state.permissions.canUpload, state.profile?.name]);

  const startHostApplication = useCallback(() => {
    // Redirect to volunteer application or open modal
    window.open('/apply?role=host', '_blank');
  }, []);

  const openSubmissionForm = useCallback(() => {
    // Open content submission form
    const form = document.createElement('div');
    form.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 24px; border-radius: 8px; max-width: 500px; width: 90%;">
          <h3>Submit Content to Rayd-yo</h3>
          <p>For now, please email your content to: <strong>content@raydyo.community</strong></p>
          <p>Include details about your submission and we'll get back to you within 24 hours!</p>
          <button onclick="this.closest('div').parentElement.remove()" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-top: 16px;">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(form);
  }, []);

  const joinTechTeam = useCallback(() => {
    // Redirect to tech volunteer signup
    window.open('/apply?role=tech', '_blank');
  }, []);

  const updateProfile = useCallback((updates: Partial<VolunteerProfile>) => {
    if (!state.profile) return;
    
    const updatedProfile = { ...state.profile, ...updates };
    localStorage.setItem(VOLUNTEER_STORAGE_KEY, JSON.stringify(updatedProfile));
    
    setState(prev => ({
      ...prev,
      profile: updatedProfile
    }));
  }, [state.profile]);

  // Auto-clear old notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(notification => {
          const age = Date.now() - new Date(notification.timestamp).getTime();
          return age < 300000; // Remove notifications older than 5 minutes
        })
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    ...state,
    login,
    logout,
    completeTutorial,
    handleUpload,
    startHostApplication,
    openSubmissionForm,
    joinTechTeam,
    updateProfile
  };
};