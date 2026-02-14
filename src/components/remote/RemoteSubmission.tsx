// src/components/remote/RemoteSubmission.tsx
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import './RemoteSubmission.css';

interface Programme {
  id: string;
  name: string;
  icon: string;
  submissionTypes: string[];
  examples: string[];
  earnings: string;
  reviewTime: string;
  googleFormUrl: string;
}

const PROGRAMMES: Programme[] = [
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    icon: '🎵',
    submissionTypes: ['Beat/Track (MP3, WAV)', 'SoundCloud/YouTube Link', 'Project Description'],
    examples: ['60-sec radio jingle', 'Drama soundbed', 'Podcast intro music'],
    earnings: '£35-120 per track accepted',
    reviewTime: '5-7 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE', // You'll create these
  },
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    icon: '🎭',
    submissionTypes: ['Voice Recording (MP3)', 'Script/Monologue', 'Character Demo Reel'],
    examples: ['Radio drama character', 'Narrator role', 'Voice acting sample'],
    earnings: '£25-200 per role',
    reviewTime: '5-7 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'pageturners',
    name: 'PageTurners',
    icon: '📖',
    submissionTypes: ['Written Article (Google Docs link)', 'Story (PDF/Word)', 'Interview/Feature'],
    examples: ['Heritage story', 'Community profile', 'Personal essay'],
    earnings: '£35-80 per published piece',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    icon: '🤖',
    submissionTypes: ['Project Documentation (photos/video)', 'Build Guide', 'Code Repository Link'],
    examples: ['Repair tutorial', 'Arduino project', 'App demo'],
    earnings: '£40-150 per project',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    icon: '👗',
    submissionTypes: ['Design Portfolio (images)', 'Brand Concept', 'Illustration'],
    examples: ['Cover art', 'Logo design', 'Fashion illustration'],
    earnings: '£30-100 per commission',
    reviewTime: '5-7 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    icon: '🍲',
    submissionTypes: ['Recipe Documentation (photos/video)', 'Family Food Story', 'Cooking Tutorial'],
    examples: ['Heritage recipe video', 'Family cookbook entry', 'Cooking demo'],
    earnings: '£40-120 per content piece',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'scrap-cat',
    name: 'Scrap Cat',
    icon: '🔧',
    submissionTypes: ['Repair Guide (photos/video)', 'Upcycle Project', 'Fix Tutorial'],
    examples: ['Phone repair guide', 'Furniture upcycle', 'Electronics fix'],
    earnings: '£30-100 per guide',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'g-tech-casters',
    name: 'G-Tech Casters',
    icon: '🎙️',
    submissionTypes: ['Audio Sample (MP3)', 'Mixing Portfolio', 'Sound Design Demo'],
    examples: ['Podcast mix', 'Audio restoration', 'Sound effects'],
    earnings: '£60-150 per project',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'joystick',
    name: 'Joystick E-Zine',
    icon: '🎮',
    submissionTypes: ['Article (Google Docs)', 'Game Review', 'Tech Feature'],
    examples: ['Game review', 'Esports coverage', 'Tech analysis'],
    earnings: '£35-80 per article',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
  {
    id: 'raydyo',
    name: 'Rayd-yo Radio',
    icon: '📻',
    submissionTypes: ['Show Idea (written pitch)', 'Audio Content Sample', 'Interview Recording'],
    examples: ['Show concept', 'Audio segment', 'Interview piece'],
    earnings: '£40-120 per accepted content',
    reviewTime: '7-10 days',
    googleFormUrl: 'https://forms.gle/YOUR_FORM_ID_HERE',
  },
];

interface RemoteSubmissionProps {
  programmeId?: string;
}

const RemoteSubmission: React.FC<RemoteSubmissionProps> = ({ programmeId }) => {
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(
    programmeId ? PROGRAMMES.find(p => p.id === programmeId) || null : null
  );

  if (!selectedProgramme) {
    return (
      <div className="remote-submission">
        <div className="submission-intro">
          <h2>🌍 Submit Your Work Remotely</h2>
          <p>
            Can't come to Wembley? No problem. Submit your work online and earn from anywhere in the UK.
          </p>
          
          <div className="remote-promise">
            <AlertCircle size={24} className="promise-icon" />
            <div className="promise-text">
              <strong>Our Promise:</strong> Every submission gets reviewed by experienced mentors. 
              If we use your work, you get paid. If it needs work, we tell you how to improve it. 
              No ghosting, no gatekeeping.
            </div>
          </div>

          <div className="how-it-works">
            <h3>How Remote Submission Works:</h3>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h4>Pick a Programme</h4>
                <p>Choose what you want to create (beats, designs, writing, etc)</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h4>Submit Your Work</h4>
                <p>Upload via Google Form (easy, takes 5 mins)</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h4>Get Reviewed</h4>
                <p>Mentor feedback within 5-10 days</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h4>Get Paid</h4>
                <p>If accepted, payment via bank transfer/PayPal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="programmes-grid">
          {PROGRAMMES.map(programme => (
            <div 
              key={programme.id} 
              className="programme-card"
              onClick={() => setSelectedProgramme(programme)}
            >
              <div className="programme-icon">{programme.icon}</div>
              <h3>{programme.name}</h3>
              <p className="programme-earnings">{programme.earnings}</p>
              <button className="submit-btn">Submit Work →</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="remote-submission">
      <button className="back-btn" onClick={() => setSelectedProgramme(null)}>
        ← Back to All Programmes
      </button>

      <div className="submission-header">
        <div className="programme-icon-large">{selectedProgramme.icon}</div>
        <div className="programme-info">
          <h2>{selectedProgramme.name}</h2>
          <p className="earnings-info">💰 {selectedProgramme.earnings}</p>
          <p className="review-time">⏱️ Review time: {selectedProgramme.reviewTime}</p>
        </div>
      </div>

      <div className="submission-types">
        <h3>What You Can Submit:</h3>
        <ul>
          {selectedProgramme.submissionTypes.map((type, i) => (
            <li key={i}><CheckCircle size={20} className="check-icon" />{type}</li>
          ))}
        </ul>
      </div>

      <div className="submission-examples">
        <h3>Examples of Work We Use:</h3>
        <div className="examples-grid">
          {selectedProgramme.examples.map((example, i) => (
            <div key={i} className="example-card">
              {example}
            </div>
          ))}
        </div>
      </div>

      <div className="submission-process">
        <h3>📝 Submission Process:</h3>
        <ol className="process-list">
          <li>
            <strong>Fill out the Google Form</strong> (includes: your name, age, contact info, work description)
          </li>
          <li>
            <strong>Upload your work</strong> (or provide links to SoundCloud, YouTube, Google Drive, etc)
          </li>
          <li>
            <strong>Tell us your story</strong> (why you made it, what problem it solves, who it's for)
          </li>
          <li>
            <strong>Wait for review</strong> (you'll get an email within {selectedProgramme.reviewTime})
          </li>
          <li>
            <strong>Get feedback</strong> (either "We'll use it + payment details" OR "Here's how to improve it")
          </li>
        </ol>
      </div>

      <div className="quality-standards">
        <h3>⭐ What We're Looking For:</h3>
        <ul>
          <li><strong>Real quality:</strong> It doesn't have to be perfect, but it needs to be usable</li>
          <li><strong>Your voice:</strong> We want YOUR style, not copies of other people's work</li>
          <li><strong>Community value:</strong> Does it serve Rayd-yo listeners, Joystick readers, or help someone?</li>
          <li><strong>Honest work:</strong> No plagiarism, no AI-generated content passed off as yours</li>
        </ul>
      </div>

      <div className="payment-info">
        <h3>💷 Payment Details:</h3>
        <p>
          If we accept your work, you'll get paid via bank transfer or PayPal within 14 days. 
          You'll need a parent/guardian to help set up payment if you're under 16.
        </p>
        <p className="payment-note">
          <strong>Tax info:</strong> Earnings under £1,000/year don't need to be declared. 
          Over that, you'll need to register as self-employed (we'll help you understand this).
        </p>
      </div>

      <div className="submission-cta">
        <a 
          href={selectedProgramme.googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="submit-work-btn"
        >
          <Upload size={24} />
          Submit Your Work to {selectedProgramme.name}
          <ExternalLink size={20} />
        </a>
        <p className="cta-note">
          Opens in Google Forms (you'll need a Google account)
        </p>
      </div>

      <div className="submission-faq">
        <h3>❓ Quick Questions:</h3>
        <div className="faq-item">
          <strong>What if I'm not good enough yet?</strong>
          <p>Submit anyway. We'll give you honest feedback on how to improve. That's mentorship.</p>
        </div>
        <div className="faq-item">
          <strong>Can I submit multiple times?</strong>
          <p>Yes! Keep submitting as you improve. We track your progress.</p>
        </div>
        <div className="faq-item">
          <strong>Do I need to live in Wembley?</strong>
          <p>No. Remote submission is open to anyone aged 13-19 in the UK.</p>
        </div>
        <div className="faq-item">
          <strong>What if you don't accept my work?</strong>
          <p>You get detailed feedback on what to improve + you can resubmit when ready.</p>
        </div>
      </div>
    </div>
  );
};

export default RemoteSubmission;