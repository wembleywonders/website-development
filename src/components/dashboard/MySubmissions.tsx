// src/components/dashboard/MySubmissions.tsx

import React, { useState, useEffect } from 'react';

type Submission = {
  id: string;
  title?: string;
  status?: 'submitted' | 'under_review' | 'accepted' | string;
  earned?: number;
  [key: string]: any;
};

type SubmissionStats = {
  totalSubmitted: number;
  underReview: number;
  accepted: number;
  totalEarned: number;
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

const SubmissionCard: React.FC<{ submission: Submission }> = ({ submission }) => {
  return (
    <div className="submission-card" data-id={submission.id}>
      <h4 className="submission-title">{submission.title || 'Untitled'}</h4>
      <div className="submission-meta">
        <span className="submission-status">{submission.status || 'unknown'}</span>
        <span className="submission-earned">£{submission.earned ?? 0}</span>
      </div>
    </div>
  );
};

const MySubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  
  // Fetch user's submissions (replace placeholder with real API call)
  const fetchMySubmissions = async () => {
    try {
      // Example placeholder data; replace with actual fetch:
      // const res = await fetch('/api/my/submissions');
      // const data: Submission[] = await res.json();
      const data: Submission[] = [
        { id: '1', title: 'Example Submission', status: 'submitted', earned: 0 },
      ];
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions', err);
    }
  };

  // Fetch submission statistics (replace placeholder with real API call)
  const fetchMyStats = async () => {
    try {
      // Example placeholder data; replace with actual fetch:
      // const res = await fetch('/api/my/submissions/stats');
      // const data: SubmissionStats = await res.json();
      const data: SubmissionStats = {
        totalSubmitted: 1,
        underReview: 0,
        accepted: 0,
        totalEarned: 0,
      };
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  useEffect(() => {
    fetchMySubmissions();
    fetchMyStats();
  }, []);
  
  return (
    <div className="my-submissions">
      <div className="stats-overview">
        <StatCard 
          label="Total Submitted" 
          value={stats?.totalSubmitted || 0}
          icon="📤"
        />
        <StatCard 
          label="Under Review" 
          value={stats?.underReview || 0}
          icon="🔍"
        />
        <StatCard 
          label="Accepted" 
          value={stats?.accepted || 0}
          icon="✅"
        />
        <StatCard 
          label="Total Earned" 
          value={`£${stats?.totalEarned || 0}`}
          icon="💰"
        />
      </div>
      
      <div className="submissions-list">
        {submissions.map(sub => (
          <SubmissionCard 
            key={sub.id}
            submission={sub}
          />
        ))}
      </div>
    </div>
  );
};

export default MySubmissions;

