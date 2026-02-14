// src/components/admin/SubmissionReviewQueue.tsx

import React from 'react';

interface Submission {
  id: number;
  title?: string;
  content?: string;
  // add other fields as needed
  [key: string]: any;
}

const SubmissionReviewQueue: React.FC = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Load pending submissions from the server
  const fetchPendingSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions?status=pending', {
        headers: {
          'Authorization': `Bearer ${getAdminToken()}`
        }
      });
      if (!res.ok) {
        console.error('Failed to fetch pending submissions', res.status);
        setPendingSubmissions([]);
        return;
      }
      const data = await res.json();
      setPendingSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('fetchPendingSubmissions error', err);
      setPendingSubmissions([]);
    }
  };

  // Fetch on mount
  React.useEffect(() => {
    fetchPendingSubmissions();
  }, []);

  const handleAccept = async (id: number, amount: number, notes: string) => {
    await fetch(`/api/admin/submissions/${id}/review`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAdminToken()}`
      },
      body: JSON.stringify({
        status: 'ACCEPTED',
        paymentAmount: amount,
        reviewerNotes: notes
      })
    });
    
    // Refresh queue
    await fetchPendingSubmissions();
  };

  const handleReject = async (id: number, notes?: string) => {
    await fetch(`/api/admin/submissions/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAdminToken()}`
      },
      body: JSON.stringify({
        status: 'REJECTED',
        reviewerNotes: notes || ''
      })
    });

    await fetchPendingSubmissions();
  };

  const handleRequestChanges = async (id: number, notes: string) => {
    await fetch(`/api/admin/submissions/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAdminToken()}`
      },
      body: JSON.stringify({
        status: 'CHANGES_REQUESTED',
        reviewerNotes: notes
      })
    });

    await fetchPendingSubmissions();
  };
  
  return (
    <div className="review-queue">
      <h2>Pending Submissions ({pendingSubmissions.length})</h2>
      
      {pendingSubmissions.map(sub => (
        <ReviewCard
          key={sub.id}
          submission={sub}
          onAccept={handleAccept}
          onReject={handleReject}
          onRequestChanges={handleRequestChanges}
        />
      ))}
    </div>
  );
};

function ReviewCard({
  submission,
  onAccept,
  onReject,
  onRequestChanges
}: {
  submission: Submission;
  onAccept: (id: number, amount: number, notes: string) => Promise<void>;
  onReject: (id: number, notes?: string) => Promise<void>;
  onRequestChanges: (id: number, notes: string) => Promise<void>;
}) {
  const [processing, setProcessing] = React.useState(false);

  const accept = async () => {
    const amountStr = window.prompt('Payment amount (e.g. 50.00):', '0');
    if (amountStr === null) return;
    const amount = parseFloat(amountStr || '0');
    const notes = window.prompt('Reviewer notes:', '') || '';
    setProcessing(true);
    try {
      await onAccept(submission.id, amount, notes);
    } finally {
      setProcessing(false);
    }
  };

  const reject = async () => {
    const notes = window.prompt('Rejection notes (optional):', '') || '';
    setProcessing(true);
    try {
      await onReject(submission.id, notes);
    } finally {
      setProcessing(false);
    }
  };

  const requestChanges = async () => {
    const notes = window.prompt('Change request notes:', '') || '';
    setProcessing(true);
    try {
      await onRequestChanges(submission.id, notes);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="review-card" style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <h3>{submission.title || `Submission #${submission.id}`}</h3>
      <p>{submission.content}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={accept} disabled={processing}>Accept</button>
        <button onClick={requestChanges} disabled={processing}>Request Changes</button>
        <button onClick={reject} disabled={processing}>Reject</button>
      </div>
    </div>
  );
}

export default SubmissionReviewQueue;
function useState<T>(initial: T | (() => T)):
    [T, React.Dispatch<React.SetStateAction<T>>] {
    // Delegate to React's built-in hook so component behavior remains consistent.
    return React.useState<T>(initial as any);
}
function getAdminToken(): string {
    if (typeof window === 'undefined') {
        throw new Error('getAdminToken must be called in a browser environment');
    }

    // Common localStorage keys used for tokens
    const possibleKeys = ['adminToken', 'token', 'authToken', 'access_token'];
    for (const key of possibleKeys) {
        const val = localStorage.getItem(key);
        if (val && val.trim()) return val;
    }

    // Fallback to cookies (e.g. server-set session cookie)
    const cookieMatch = document.cookie.match(/(?:^|; )(?:admin_token|adminToken|token|access_token)=([^;]+)/);
    if (cookieMatch && cookieMatch[1]) return decodeURIComponent(cookieMatch[1]);

    throw new Error('Admin token not found. Ensure the admin is authenticated and a token is stored in localStorage or cookies.');
}

