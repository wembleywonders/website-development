import { useState, useEffect } from 'react';

export interface SandboxPlannerConfig {
  storageKey: string;
  totalSteps: number;
  downloadLimit: number;
}

export const useSandboxPlanner = (config: SandboxPlannerConfig) => {
  const { storageKey, totalSteps, downloadLimit } = config;

  // Core state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [showConversionModal, setShowConversionModal] = useState<boolean>(false);

  // Load download count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setDownloadCount(parseInt(saved, 10));
    }
  }, [storageKey]);

  // Navigation
  const handleNext = (onGenerate?: () => void) => {
    if (currentStep === totalSteps - 1 && onGenerate) {
      onGenerate();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetPlanner = () => {
    setCurrentStep(0);
    setShowConversionModal(false);
  };

  // Download handling
  const handleDownload = (planText: string, filename: string) => {
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Update download count
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem(storageKey, newCount.toString());

    // Trigger conversion modals at strategic points
    if (newCount === 1 || newCount === downloadLimit) {
      setTimeout(() => setShowConversionModal(true), 1000);
    }
  };

  // Progress calculation
  const progressPercent = currentStep > 0 && currentStep < totalSteps 
    ? (currentStep / totalSteps) * 100 
    : 0;

  // Downloads remaining
  const downloadsRemaining = Math.max(0, downloadLimit - downloadCount);

  return {
    // State
    currentStep,
    downloadCount,
    showConversionModal,
    
    // Derived values
    progressPercent,
    downloadsRemaining,
    
    // Actions
    handleNext,
    handleBack,
    resetPlanner,
    handleDownload,
    setCurrentStep,
    setShowConversionModal,
  };
};