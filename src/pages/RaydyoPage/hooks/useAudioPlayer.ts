import { useState, useEffect, useRef, useCallback } from 'react';

export interface AudioPlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLive: boolean;
  currentShow: string | null;
  error: string | null;
}

export interface AudioPlayerActions {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  rewind: (seconds?: number) => void;
  fastForward: (seconds?: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playShow: (show: any) => void;
  goLive: () => void;
}

const LIVE_STREAM_URL = 'https://raydyo.community/live-stream';
const VOLUME_STORAGE_KEY = 'raydyo-volume';
const DEFAULT_REWIND_SECONDS = 15;

export const useAudioPlayer = (): AudioPlayerState & AudioPlayerActions => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 75,
    isMuted: false,
    isLive: true,
    currentShow: null,
    error: null,
  });

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    
    // Set initial source to live stream
    audio.src = LIVE_STREAM_URL;
    audio.preload = 'none';
    
    // Load saved volume preference
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    if (savedVolume) {
      const volume = parseInt(savedVolume, 10);
      setState(prev => ({ ...prev, volume }));
      audio.volume = volume / 100;
    } else {
      audio.volume = 0.75;
    }

    // Audio event listeners
    const handleLoadStart = () => setState(prev => ({ ...prev, isLoading: true, error: null }));
    const handleCanPlay = () => setState(prev => ({ ...prev, isLoading: false }));
    const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
    const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));
    const handleEnded = () => setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    const handleError = (e: Event) => {
      const error = (e.target as HTMLAudioElement).error;
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isPlaying: false,
        error: error ? `Audio error: ${error.message}` : 'Playback error occurred'
      }));
    };
    
    const handleTimeUpdate = () => {
      setState(prev => ({ 
        ...prev, 
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
    };

    const handleVolumeChange = () => {
      setState(prev => ({ 
        ...prev, 
        volume: Math.round(audio.volume * 100),
        isMuted: audio.muted
      }));
    };

    // Attach event listeners
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      // Cleanup
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Actions
  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        setState(prev => ({ ...prev, error: `Failed to play: ${error.message}` }));
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current && !state.isLive) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, audioRef.current.duration || 0));
    }
  }, [state.isLive]);

  const rewind = useCallback((seconds: number = DEFAULT_REWIND_SECONDS) => {
    if (audioRef.current && !state.isLive) {
      const newTime = Math.max(0, audioRef.current.currentTime - seconds);
      audioRef.current.currentTime = newTime;
    }
  }, [state.isLive]);

  const fastForward = useCallback((seconds: number = DEFAULT_REWIND_SECONDS) => {
    if (audioRef.current && !state.isLive) {
      const newTime = Math.min(
        audioRef.current.duration || 0, 
        audioRef.current.currentTime + seconds
      );
      audioRef.current.currentTime = newTime;
    }
  }, [state.isLive]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, volume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume / 100;
      localStorage.setItem(VOLUME_STORAGE_KEY, clampedVolume.toString());
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }, []);

  const playShow = useCallback((show: any) => {
    if (audioRef.current && show.audioUrl) {
      audioRef.current.src = show.audioUrl;
      setState(prev => ({ 
        ...prev, 
        isLive: false, 
        currentShow: show.title,
        currentTime: 0,
        duration: 0
      }));
      play();
    }
  }, [play]);

  const goLive = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = LIVE_STREAM_URL;
      setState(prev => ({ 
        ...prev, 
        isLive: true, 
        currentShow: null,
        currentTime: 0,
        duration: 0
      }));
      play();
    }
  }, [play]);

  return {
    ...state,
    play,
    pause,
    stop,
    seek,
    rewind,
    fastForward,
    setVolume,
    toggleMute,
    playShow,
    goLive,
  };
};