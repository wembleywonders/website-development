import React from 'react';
import { ApplicationStatus as AppStatus, ApplicationProgress } from '../../types/application';

interface ApplicationStatusProps {
  status: AppStatus;
  progress?: ApplicationProgress;
  submittedDate?: string;
  lastUpdated?: string;
  estimatedCompletion?: string;
  compact?: boolean;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({
  status,
  progress,
  submittedDate,
  lastUpdated,
  estimatedCompletion,
  compact = false
}) => {
  const getStatusInfo = (status: AppStatus) => {
    const statusMap = {
      submitted: {
        label: 'Application Submitted',
        description: 'Your application has been received and is being processed',
        color: '#4299e1',
        icon: '📝',
        priority: 'info'
      },
      under_review: {
        label: 'Under Review',
        description: 'Our team is reviewing your application details',
        color: '#ed8936',
        icon: '👀',
        priority: 'warning'
      },
      references_pending: {
        label: 'References Pending',
        description: 'We are contacting your references',
        color: '#ed8936',
        icon: '📞',
        priority: 'warning'
      },
      assessment_invited: {
        label: 'Assessment Invited',
        description: 'Complete your assessment to proceed',
        color: '#48bb78',
        icon: '📋',
        priority: 'success'
      },
      assessment_completed: {
        label: 'Assessment Complete',
        description: 'Assessment completed, awaiting final review',
        color: '#4299e1',
        icon: '✅',
        priority: 'info'
      },
      interview_scheduled: {
        label: 'Interview Scheduled',
        description: 'Your interview has been scheduled',
        color: '#48bb78',
        icon: '🎥',
        priority: 'success'
      },
      interview_completed: {
        label: 'Interview Complete',
        description: 'Interview completed, decision pending',
        color: '#4299e1',
        icon: '✅',
        priority: 'info'
      },
      approved: {
        label: 'Application Approved',
        description: 'Congratulations! Your application has been approved',
        color: '#48bb78',
        icon: '🎉',
        priority: 'success'
      },
      rejected: {
        label: 'Application Not Successful',
        description: 'Your application was not successful this time',
        color: '#e53e3e',
        icon: '❌',
        priority: 'error'
      },
      withdrawn: {
        label: 'Application Withdrawn',
        description: 'Application has been withdrawn',
        color: '#718096',
        icon: '⏸️',
        priority: 'neutral'
      }
    };

    return statusMap[status] || statusMap.submitted;
  };

  const statusInfo = getStatusInfo(status);

  const getNextAction = (status: AppStatus) => {
    const actionMap = {
      submitted: 'Wait for initial review (typically 3-5 days)',
      under_review: 'We will contact you with next steps',
      references_pending: 'Your references will be contacted shortly',
      assessment_invited: 'Complete your assessment within 7 days',
      assessment_completed: 'Wait for final review (typically 3-5 days)',
      interview_scheduled: 'Attend your scheduled interview',
      interview_completed: 'Wait for final decision (typically 2-3 days)',
      approved: 'Check your email for onboarding instructions',
      rejected: 'You may reapply after 6 months',
      withdrawn: 'You may submit a new application anytime'
    };

    return actionMap[status];
  };

  const isActionRequired = (status: AppStatus) => {
    return ['assessment_invited', 'interview_scheduled'].includes(status);
  };

  const calculateDaysElapsed = () => {
    if (!submittedDate) return null;
    const submitted = new Date(submittedDate);
    const now = new Date();
    return Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (compact) {
    return (
      <div className="application-status-compact">
        <div 
          className="status-badge"
          style={{ backgroundColor: statusInfo.color }}
        >
          <span className="status-icon">{statusInfo.icon}</span>
          <span className="status-text">{statusInfo.label}</span>
        </div>
        {isActionRequired(status) && (
          <div className="action-indicator">
            <span className="pulse-dot"></span>
            Action Required
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="application-status">
      {/* Main Status Card */}
      <div 
        className={`status-card ${statusInfo.priority}`}
        style={{ borderLeftColor: statusInfo.color }}
      >
        <div className="status-header">
          <div className="status-icon-large">{statusInfo.icon}</div>
          <div className="status-content">
            <h3>{statusInfo.label}</h3>
            <p>{statusInfo.description}</p>
          </div>
          {isActionRequired(status) && (
            <div className="urgent-indicator">
              <span className="urgent-badge">Action Required</span>
            </div>
          )}
        </div>

        {/* Progress Bar (if progress data available) */}
        {progress && (
          <div className="progress-section">
            <div className="progress-header">
              <span>Application Progress</span>
              <span>Step {progress.currentStep} of {progress.totalSteps}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${(progress.currentStep / progress.totalSteps) * 100}%`,
                  backgroundColor: statusInfo.color 
                }}
              />
            </div>
          </div>
        )}

        {/* Next Action */}
        <div className="next-action">
          <h4>What's Next?</h4>
          <p>{getNextAction(status)}</p>
        </div>

        {/* Timeline Information */}
        <div className="timeline-info">
          <div className="timeline-item">
            <span className="timeline-label">Submitted:</span>
            <span className="timeline-value">
              {submittedDate ? new Date(submittedDate).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          
          {lastUpdated && (
            <div className="timeline-item">
              <span className="timeline-label">Last Updated:</span>
              <span className="timeline-value">
                {new Date(lastUpdated).toLocaleDateString()}
              </span>
            </div>
          )}

          {calculateDaysElapsed() !== null && (
            <div className="timeline-item">
              <span className="timeline-label">Days Elapsed:</span>
              <span className="timeline-value">
                {calculateDaysElapsed()} days
              </span>
            </div>
          )}

          {estimatedCompletion && (
            <div className="timeline-item">
              <span className="timeline-label">Estimated Completion:</span>
              <span className="timeline-value">
                {new Date(estimatedCompletion).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Steps (if progress data available) */}
      {progress && (
        <div className="progress-steps">
          <h4>Application Steps</h4>
          <div className="steps-timeline">
            {progress.steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`step-item ${step.status}`}
              >
                <div className="step-marker">
                  <div className="step-number">{step.id}</div>
                  {step.status === 'completed' && (
                    <div className="step-check">✓</div>
                  )}
                </div>
                <div className="step-content">
                  <h5>{step.title}</h5>
                  <p>{step.description}</p>
                  {step.completedDate && (
                    <small>
                      Completed: {new Date(step.completedDate).toLocaleDateString()}
                    </small>
                  )}
                  {step.status === 'current' && step.estimatedCompletion && (
                    <small>
                      Expected: {new Date(step.estimatedCompletion).toLocaleDateString()}
                    </small>
                  )}
                </div>
                {index < progress.steps.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons (based on status) */}
      <div className="status-actions">
        {status === 'assessment_invited' && (
          <button className="btn btn-primary">
            Take Assessment
          </button>
        )}
        {status === 'interview_scheduled' && (
          <button className="btn btn-primary">
            View Interview Details
          </button>
        )}
        {status === 'approved' && (
          <button className="btn btn-success">
            Start Onboarding
          </button>
        )}
        {status === 'rejected' && (
          <button className="btn btn-outline">
            Request Feedback
          </button>
        )}
        <button className="btn btn-secondary">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default ApplicationStatus;