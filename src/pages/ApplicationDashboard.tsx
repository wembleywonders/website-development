import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './ApplicationDashboard.css';

interface ApplicationProgress {
  status: 'submitted' | 'under_review' | 'assessment_scheduled' | 'assessment_completed' | 'approved' | 'declined';
  submittedDate: string;
  lastUpdated: string;
  currentStep: number;
  totalSteps: number;
  estimatedCompletion: string;
  nextAction: string;
  referenceNumber: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  icon: string;
}

const ApplicationDashboard: React.FC = () => {
  const [applicationData, setApplicationData] = useState<ApplicationProgress | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulated data - replace with actual API call
  useEffect(() => {
    const fetchApplicationData = async () => {
      // Simulate API call
      setTimeout(() => {
        setApplicationData({
          status: 'assessment_scheduled',
          submittedDate: '2024-01-15',
          lastUpdated: '2024-01-20',
          currentStep: 3,
          totalSteps: 5,
          estimatedCompletion: '2024-02-15',
          nextAction: 'Attend assessment on January 25th',
          referenceNumber: 'WW-CONN-2024-001'
        });
        setLoading(false);
      }, 1000);
    };

    fetchApplicationData();
  }, []);

  const getStatusInfo = (status: string) => {
    const statusMap = {
      submitted: { label: 'Application Submitted', color: '#4299e1', icon: '📝' },
      under_review: { label: 'Under Review', color: '#ed8936', icon: '👀' },
      assessment_scheduled: { label: 'Assessment Scheduled', color: '#38b2ac', icon: '📅' },
      assessment_completed: { label: 'Assessment Completed', color: '#9f7aea', icon: '✅' },
      approved: { label: 'Application Approved', color: '#48bb78', icon: '🎉' },
      declined: { label: 'Application Declined', color: '#f56565', icon: '❌' }
    };
    return statusMap[status] || statusMap.submitted;
  };

  const timelineEvents: TimelineEvent[] = [
    {
      date: '2024-01-15',
      title: 'Application Submitted',
      description: 'Your Connector application has been successfully submitted and assigned reference number WW-CONN-2024-001.',
      status: 'completed',
      icon: '📝'
    },
    {
      date: '2024-01-18',
      title: 'Initial Review Complete',
      description: 'Our team has completed the initial review of your application. All required documents have been verified.',
      status: 'completed',
      icon: '✓'
    },
    {
      date: '2024-01-20',
      title: 'Assessment Scheduled',
      description: 'Your practical assessment has been scheduled for January 25th at 2:00 PM. Check your email for joining instructions.',
      status: 'current',
      icon: '📅'
    },
    {
      date: '2024-01-25',
      title: 'Practical Assessment',
      description: 'Complete your practical assessment with one of our senior team members.',
      status: 'pending',
      icon: '🎯'
    },
    {
      date: '2024-02-01',
      title: 'Final Decision',
      description: 'Receive final decision on your Connector application and next steps.',
      status: 'pending',
      icon: '📋'
    }
  ];

  if (loading) {
    return (
      <div className="application-dashboard-page">
        <div className="dashboard-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your application status...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="application-dashboard-page">
        <div className="dashboard-container">
          <div className="no-application-state">
            <h1>No Application Found</h1>
            <p>We couldn't find an application associated with your account.</p>
            <Link to="/apply" className="apply-button">
              Start New Application
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const statusInfo = getStatusInfo(applicationData.status);

  return (
    <div className="application-dashboard-page">
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Application Dashboard</h1>
          <div className="reference-number">
            Reference: {applicationData.referenceNumber}
          </div>
        </div>

        <div className="dashboard-content">
          <div className="status-overview">
            <div className="status-card">
              <div className="status-header">
                <div className="status-icon" style={{ color: statusInfo.color }}>
                  {statusInfo.icon}
                </div>
                <div className="status-info">
                  <h2>{statusInfo.label}</h2>
                  <p>Last updated: {new Date(applicationData.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${(applicationData.currentStep / applicationData.totalSteps) * 100}%`,
                      backgroundColor: statusInfo.color
                    }}
                  />
                </div>
                <div className="progress-info">
                  <span>Step {applicationData.currentStep} of {applicationData.totalSteps}</span>
                  <span>Est. completion: {new Date(applicationData.estimatedCompletion).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="next-action">
                <h3>Next Action Required</h3>
                <p>{applicationData.nextAction}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="timeline-section">
              <h2>Application Timeline</h2>
              <div className="timeline">
                {timelineEvents.map((event, index) => (
                  <div key={index} className={`timeline-item ${event.status}`}>
                    <div className="timeline-marker">
                      <span className="timeline-icon">{event.icon}</span>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-date">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="actions-section">
              <h2>Quick Actions</h2>
              <div className="action-cards">
                <div className="action-card">
                  <h3>📅 Assessment Details</h3>
                  <p>View your upcoming assessment information</p>
                  <Link to="/schedule-assessment" className="action-link">
                    View Details →
                  </Link>
                </div>

                <div className="action-card">
                  <h3>📚 Preparation Guide</h3>
                  <p>Get ready for your assessment</p>
                  <Link to="/assessment-guide" className="action-link">
                    Study Guide →
                  </Link>
                </div>

                <div className="action-card">
                  <h3>🎯 Practice Assessment</h3>
                  <p>Test your knowledge and skills</p>
                  <Link to="/practice-assessment" className="action-link">
                    Start Practice →
                  </Link>
                </div>

                <div className="action-card">
                  <h3>💬 Get Support</h3>
                  <p>Contact our team for help</p>
                  <button className="action-link">
                    Chat with Us →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="resources-section">
            <h2>While You Wait</h2>
            <div className="resource-grid">
              <div className="resource-item">
                <h3>🏘️ Community Overview</h3>
                <p>Learn about Wembley's demographics, challenges, and opportunities</p>
                <Link to="/community/overview">Explore Community →</Link>
              </div>
              
              <div className="resource-item">
                <h3>📖 Connector Handbook</h3>
                <p>Understand your role and responsibilities as a Connector</p>
                <Link to="/membership">Read Handbook →</Link>
              </div>
              
              <div className="resource-item">
                <h3>🌟 Success Stories</h3>
                <p>Get inspired by other community members' journeys</p>
                <Link to="/success-stories">Read Stories →</Link>
              </div>
              
              <div className="resource-item">
                <h3>🎬 Sample Scenarios</h3>
                <p>Review real-world situations you might encounter</p>
                <Link to="/practice-assessment">View Scenarios →</Link>
              </div>
            </div>
          </div>

          <div className="support-section">
            <h2>Need Help?</h2>
            <div className="support-options">
              <div className="support-option">
                <h3>📞 Phone Support</h3>
                <p>0208 902 9991</p>
                <p>Monday-Friday, 9 AM - 5 PM</p>
              </div>
              
              <div className="support-option">
                <h3>📧 Email Support</h3>
                <p>applications@wembleywonders.org</p>
                <p>Response within 24 hours</p>
              </div>
              
              <div className="support-option">
                <h3>💬 Live Chat</h3>
                <p>Available during office hours</p>
                <button className="chat-button">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationDashboard;