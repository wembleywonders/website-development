// src/pages/member/governance/CommunityGovernance.tsx
import React, { useState, useEffect } from 'react';
import { MEMBERSHIP_PLANS, type MembershipTier } from '../../../types/membership';
import './CommunityGovernance.css';

interface GovernanceMetrics {
  totalMembers: number;
  activeVoters: number;
  proposalsThisMonth: number;
  participationRate: number;
  membershipDistribution: {
    connector: number;
    curator: number;
    champion: number;
  };
}

interface GovernancePolicy {
  id: string;
  title: string;
  description: string;
  category: 'membership' | 'conduct' | 'finance' | 'operations' | 'partnerships';
  status: 'active' | 'under_review' | 'proposed' | 'archived';
  effectiveDate: Date;
  lastReviewed: Date;
  nextReview: Date;
  amendmentHistory: Array<{
    date: Date;
    changes: string;
    amendedBy: string;
  }>;
}

interface BoardMeeting {
  id: string;
  date: Date;
  agenda: string[];
  attendees: string[];
  decisions: Array<{
    item: string;
    decision: string;
    voteTally?: string;
  }>;
  status: 'scheduled' | 'completed' | 'cancelled';
  minutesAvailable: boolean;
}

interface CommitteeStructure {
  id: string;
  name: string;
  purpose: string;
  members: Array<{
    name: string;
    role: string;
    tier: MembershipTier;
  }>;
  meetingSchedule: string;
  currentProjects: string[];
  openPositions: number;
}

const CommunityGovernance: React.FC = () => {
  const [userTier, setUserTier] = useState<MembershipTier>('curator');
  const [selectedView, setSelectedView] = useState<'overview' | 'policies' | 'meetings' | 'committees' | 'transparency'>('overview');
  const [governanceMetrics, setGovernanceMetrics] = useState<GovernanceMetrics | null>(null);
  const [policies, setPolicies] = useState<GovernancePolicy[]>([]);
  const [boardMeetings, setBoardMeetings] = useState<BoardMeeting[]>([]);
  const [committees, setCommittees] = useState<CommitteeStructure[]>([]);

  useEffect(() => {
    // Mock data - would come from API
    const mockMetrics: GovernanceMetrics = {
      totalMembers: 1247,
      activeVoters: 892,
      proposalsThisMonth: 7,
      participationRate: 71.5,
      membershipDistribution: {
        connector: 623,
        curator: 456,
        champion: 168
      }
    };

    const mockPolicies: GovernancePolicy[] = [
      {
        id: 'pol-001',
        title: 'Community Conduct and Inclusion Policy',
        description: 'Guidelines for respectful community interaction, anti-discrimination measures, and inclusive participation standards.',
        category: 'conduct',
        status: 'active',
        effectiveDate: new Date('2024-01-01'),
        lastReviewed: new Date('2024-02-15'),
        nextReview: new Date('2024-08-15'),
        amendmentHistory: [
          {
            date: new Date('2024-02-15'),
            changes: 'Added provisions for multilingual accessibility',
            amendedBy: 'Community Board'
          }
        ]
      },
      {
        id: 'pol-002',
        title: 'Democratic Participation Framework',
        description: 'Voting procedures, proposal submission guidelines, and governance role election processes.',
        category: 'operations',
        status: 'active',
        effectiveDate: new Date('2024-01-01'),
        lastReviewed: new Date('2024-03-01'),
        nextReview: new Date('2024-09-01'),
        amendmentHistory: []
      },
      {
        id: 'pol-003',
        title: 'Financial Transparency and Accountability',
        description: 'Budget disclosure requirements, expenditure approval processes, and financial reporting standards.',
        category: 'finance',
        status: 'under_review',
        effectiveDate: new Date('2024-01-01'),
        lastReviewed: new Date('2024-02-28'),
        nextReview: new Date('2024-04-01'),
        amendmentHistory: [
          {
            date: new Date('2024-01-15'),
            changes: 'Increased transparency requirements for expenditures over £500',
            amendedBy: 'Finance Committee'
          }
        ]
      }
    ];

    const mockMeetings: BoardMeeting[] = [
      {
        id: 'meet-001',
        date: new Date('2024-03-15'),
        agenda: [
          'Review Q1 financial report',
          'Methodist Hall partnership renewal',
          'Portal simulator expansion proposal',
          'Community outreach strategy'
        ],
        attendees: ['James Thompson (Chair)', 'Sarah Chen', 'Marcus Johnson', 'Elena Rodriguez'],
        decisions: [
          {
            item: 'Methodist Hall partnership renewal',
            decision: 'Approved unanimously',
            voteTally: '4-0-0'
          },
          {
            item: 'Portal simulator expansion',
            decision: 'Approved with amendments',
            voteTally: '3-1-0'
          }
        ],
        status: 'completed',
        minutesAvailable: true
      },
      {
        id: 'meet-002',
        date: new Date('2024-04-15'),
        agenda: [
          'Champion tier governance role applications',
          'Community safety protocol review',
          'Brent Council partnership update',
          'Summer event planning'
        ],
        attendees: [],
        decisions: [],
        status: 'scheduled',
        minutesAvailable: false
      }
    ];

    const mockCommittees: CommitteeStructure[] = [
      {
        id: 'comm-001',
        name: 'Finance & Sustainability Committee',
        purpose: 'Oversee community finances, revenue planning, and long-term sustainability initiatives',
        members: [
          { name: 'Raj Singh', role: 'Chair', tier: 'champion' },
          { name: 'Anna Liu', role: 'Treasurer', tier: 'curator' },
          { name: 'David Kumar', role: 'Member', tier: 'curator' }
        ],
        meetingSchedule: 'Second Monday of each month',
        currentProjects: [
          'Q2 budget planning',
          'Revenue diversification strategy',
          'Cost optimization analysis'
        ],
        openPositions: 2
      },
      {
        id: 'comm-002',
        name: 'Community Integration Committee',
        purpose: 'Facilitate new resident onboarding and cross-cultural community building',
        members: [
          { name: 'Elena Rodriguez', role: 'Chair', tier: 'champion' },
          { name: 'Hassan Al-Rashid', role: 'Cultural Liaison', tier: 'curator' },
          { name: 'Maria Santos', role: 'Onboarding Coordinator', tier: 'connector' }
        ],
        meetingSchedule: 'Third Wednesday of each month',
        currentProjects: [
          'Multilingual welcome materials',
          'Cultural celebration calendar',
          'Mentorship program expansion'
        ],
        openPositions: 1
      }
    ];

    setGovernanceMetrics(mockMetrics);
    setPolicies(mockPolicies);
    setBoardMeetings(mockMeetings);
    setCommittees(mockCommittees);
  }, []);

  const handlePolicyReview = (policyId: string) => {
    alert('Policy Review Process\n\nAs a community member, you can:\n• Submit feedback on existing policies\n• Propose amendments through formal channels\n• Participate in policy review meetings\n• Access full policy documentation\n\nYour input helps ensure policies serve community needs effectively.');
  };

  const handleCommitteeApplication = (committeeId: string) => {
    const committee = committees.find(c => c.id === committeeId);
    alert(`Application for ${committee?.name}\n\nCommittee service provides:\n• Direct governance experience\n• Leadership skill development\n• Community impact opportunities\n• Professional development through civic engagement\n\nRequirements:\n• Active community participation\n• Commitment to meeting attendance\n• Relevant skills or interest in committee focus area`);
  };

  const handleMeetingMinutes = (meetingId: string) => {
    alert('Board Meeting Minutes\n\nMeeting minutes include:\n• Full agenda and discussion summaries\n• Voting records and decision rationale\n• Action items and assigned responsibilities\n• Financial reports and budget updates\n\nMinutes are published within 7 days of each meeting for community transparency.');
  };

  const getPolicyStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return '#27ae60';
      case 'under_review': return '#f39c12';
      case 'proposed': return '#3498db';
      case 'archived': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const calculateParticipationTrend = (): string => {
    // Mock calculation - would be based on historical data
    return '+5.2%';
  };

  return (
    <div className="community-governance">
      <header className="governance-header">
        <h1>Community Governance</h1>
        <p>Transparent democratic leadership for sustainable community development</p>
        
        {governanceMetrics && (
          <div className="governance-overview">
            <div className="metric-card">
              <span className="metric-number">{governanceMetrics.totalMembers}</span>
              <span className="metric-label">Total Members</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{governanceMetrics.participationRate}%</span>
              <span className="metric-label">Participation Rate</span>
              <span className="metric-trend">{calculateParticipationTrend()}</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{governanceMetrics.proposalsThisMonth}</span>
              <span className="metric-label">Proposals This Month</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{governanceMetrics.activeVoters}</span>
              <span className="metric-label">Active Voters</span>
            </div>
          </div>
        )}
      </header>

      <div className="governance-navigation">
        {(['overview', 'policies', 'meetings', 'committees', 'transparency'] as const).map((view) => (
          <button
            key={view}
            className={`nav-btn ${selectedView === view ? 'active' : ''}`}
            onClick={() => setSelectedView(view)}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      <div className="governance-content">
        {selectedView === 'overview' && (
          <div className="overview-section">
            <div className="membership-distribution">
              <h3>Membership Distribution</h3>
              <div className="distribution-chart">
                {governanceMetrics && Object.entries(governanceMetrics.membershipDistribution).map(([tier, count]) => (
                  <div key={tier} className="tier-bar">
                    <div className="tier-info">
                      <span className="tier-name">{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                      <span className="tier-count">{count} members</span>
                    </div>
                    <div className="tier-visual">
                      <div 
                        className={`tier-fill ${tier}`}
                        style={{ 
                          width: `${(count / (governanceMetrics?.totalMembers || 1)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Governance Activity</h3>
              <div className="activity-feed">
                <div className="activity-item">
                  <span className="activity-date">March 15</span>
                  <span className="activity-text">Board approved Methodist Hall partnership renewal</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">March 12</span>
                  <span className="activity-text">Community voted on portal simulator expansion (82% approval)</span>
                </div>
                <div className="activity-item">
                  <span className="activity-date">March 10</span>
                  <span className="activity-text">Finance Committee published Q1 transparency report</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'policies' && (
          <div className="policies-section">
            <h2>Community Policies</h2>
            <div className="policies-grid">
              {policies.map((policy) => (
                <div key={policy.id} className="policy-card">
                  <div className="policy-header">
                    <h3>{policy.title}</h3>
                    <div 
                      className="policy-status"
                      style={{ backgroundColor: getPolicyStatusColor(policy.status) }}
                    >
                      {policy.status.replace('_', ' ')}
                    </div>
                  </div>
                  
                  <p className="policy-description">{policy.description}</p>
                  
                  <div className="policy-meta">
                    <div className="meta-row">
                      <span>Category: {policy.category}</span>
                      <span>Effective: {policy.effectiveDate.toLocaleDateString()}</span>
                    </div>
                    <div className="meta-row">
                      <span>Last reviewed: {policy.lastReviewed.toLocaleDateString()}</span>
                      <span>Next review: {policy.nextReview.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {policy.amendmentHistory.length > 0 && (
                    <div className="amendment-history">
                      <h4>Recent Amendments:</h4>
                      {policy.amendmentHistory.slice(0, 2).map((amendment, index) => (
                        <div key={index} className="amendment-item">
                          <span className="amendment-date">{amendment.date.toLocaleDateString()}</span>
                          <span className="amendment-text">{amendment.changes}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button 
                    className="review-policy-btn"
                    onClick={() => handlePolicyReview(policy.id)}
                  >
                    Review Policy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'meetings' && (
          <div className="meetings-section">
            <h2>Board Meetings</h2>
            <div className="meetings-timeline">
              {boardMeetings.map((meeting) => (
                <div key={meeting.id} className="meeting-card">
                  <div className="meeting-header">
                    <h3>Board Meeting - {meeting.date.toLocaleDateString()}</h3>
                    <span className={`meeting-status ${meeting.status}`}>
                      {meeting.status}
                    </span>
                  </div>

                  <div className="meeting-agenda">
                    <h4>Agenda:</h4>
                    <ul>
                      {meeting.agenda.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {meeting.status === 'completed' && (
                    <div className="meeting-outcomes">
                      <h4>Key Decisions:</h4>
                      {meeting.decisions.map((decision, index) => (
                        <div key={index} className="decision-item">
                          <strong>{decision.item}:</strong> {decision.decision}
                          {decision.voteTally && (
                            <span className="vote-tally">({decision.voteTally})</span>
                          )}
                        </div>
                      ))}
                      
                      {meeting.minutesAvailable && (
                        <button 
                          className="minutes-btn"
                          onClick={() => handleMeetingMinutes(meeting.id)}
                        >
                          View Full Minutes
                        </button>
                      )}
                    </div>
                  )}

                  {meeting.attendees.length > 0 && (
                    <div className="meeting-attendees">
                      <h4>Attendees:</h4>
                      <div className="attendees-list">
                        {meeting.attendees.map((attendee, index) => (
                          <span key={index} className="attendee">{attendee}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'committees' && (
          <div className="committees-section">
            <h2>Governance Committees</h2>
            <div className="committees-grid">
              {committees.map((committee) => (
                <div key={committee.id} className="committee-card">
                  <div className="committee-header">
                    <h3>{committee.name}</h3>
                    {committee.openPositions > 0 && (
                      <span className="open-positions">
                        {committee.openPositions} open position{committee.openPositions > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>

                  <p className="committee-purpose">{committee.purpose}</p>

                  <div className="committee-members">
                    <h4>Committee Members:</h4>
                    {committee.members.map((member, index) => (
                      <div key={index} className="member-item">
                        <span className="member-name">{member.name}</span>
                        <span className="member-role">({member.role})</span>
                        <span className="member-tier">{member.tier}</span>
                      </div>
                    ))}
                  </div>

                  <div className="committee-details">
                    <div className="detail-item">
                      <strong>Meets:</strong> {committee.meetingSchedule}
                    </div>
                    <div className="current-projects">
                      <strong>Current Projects:</strong>
                      <ul>
                        {committee.currentProjects.map((project, index) => (
                          <li key={index}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {committee.openPositions > 0 && (
                    <button 
                      className="apply-committee-btn"
                      onClick={() => handleCommitteeApplication(committee.id)}
                    >
                      Apply to Join Committee
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'transparency' && (
          <div className="transparency-section">
            <h2>Transparency & Accountability</h2>
            
            <div className="transparency-info">
              <div className="transparency-card">
                <h3>Financial Transparency</h3>
                <ul>
                  <li>Monthly budget reports published for all members</li>
                  <li>Expenditure approval process with community oversight</li>
                  <li>Annual financial audit by independent accountant</li>
                  <li>All transactions over £500 require board approval</li>
                </ul>
                <button className="view-reports-btn">View Financial Reports</button>
              </div>

              <div className="transparency-card">
                <h3>Decision-Making Process</h3>
                <ul>
                  <li>All major decisions made through democratic voting</li>
                  <li>Proposal discussion period allows community input</li>
                  <li>Voting records published with decision rationale</li>
                  <li>Appeals process for contested decisions</li>
                </ul>
                <button className="view-process-btn">View Process Guide</button>
              </div>

              <div className="transparency-card">
                <h3>Community Feedback</h3>
                <ul>
                  <li>Monthly community surveys on governance effectiveness</li>
                  <li>Open forum sessions with board members</li>
                  <li>Anonymous feedback system for sensitive concerns</li>
                  <li>Regular governance review and improvement process</li>
                </ul>
                <button className="feedback-btn">Submit Feedback</button>
              </div>

              <div className="transparency-card">
                <h3>External Oversight</h3>
                <ul>
                  <li>Annual CIC compliance reporting to government</li>
                  <li>Independent board advisory review</li>
                  <li>Community ombudsman for dispute resolution</li>
                  <li>Public accountability through Methodist Church partnership</li>
                </ul>
                <button className="oversight-btn">View Oversight Reports</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityGovernance;