// src/pages/member/governance/index.tsx
import React, { useState, useEffect } from 'react';
import { MEMBERSHIP_PLANS, type MembershipTier } from '../../../types/membership';
import './CommunityGovernance.css';

interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  category: 'policy' | 'event' | 'partnership' | 'infrastructure' | 'finance';
  proposedBy: string;
  proposerTier: MembershipTier;
  dateSubmitted: Date;
  votingDeadline: Date;
  status: 'draft' | 'discussion' | 'voting' | 'approved' | 'rejected' | 'implemented';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  requiredMajority: number;
  championsOnly: boolean;
}

interface GovernanceRole {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  term: string;
  currentHolder?: string;
  requiredTier: MembershipTier;
  electionDate?: Date;
  applications: number;
}

interface CommunityUpdate {
  id: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  category: 'governance' | 'community' | 'partnership' | 'development';
  priority: 'low' | 'medium' | 'high';
}

const CommunityGovernanceHub: React.FC = () => {
  const [userTier, setUserTier] = useState<MembershipTier>('curator');
  const [selectedTab, setSelectedTab] = useState<'proposals' | 'roles' | 'updates' | 'democracy'>('proposals');
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [governanceRoles, setGovernanceRoles] = useState<GovernanceRole[]>([]);
  const [communityUpdates, setCommunityUpdates] = useState<CommunityUpdate[]>([]);

  useEffect(() => {
    // Mock data - would come from API
    const mockProposals: GovernanceProposal[] = [
      {
        id: '1',
        title: 'Expand Portal Simulator Program to Include Mental Health Services',
        description: 'Proposal to add NHS mental health service simulation to help residents navigate therapy appointments, counseling services, and mental health support systems.',
        category: 'infrastructure',
        proposedBy: 'Dr. Sarah Chen',
        proposerTier: 'champion',
        dateSubmitted: new Date('2024-02-28'),
        votingDeadline: new Date('2024-03-15'),
        status: 'voting',
        votesFor: 127,
        votesAgainst: 23,
        votesAbstain: 8,
        requiredMajority: 60,
        championsOnly: false
      },
      {
        id: '2',
        title: 'Partnership with Wembley Central Library for Digital Skills Workshops',
        description: 'Establish formal partnership to provide additional workshop space and access to library resources for community digital literacy programs.',
        category: 'partnership',
        proposedBy: 'Marcus Johnson',
        proposerTier: 'curator',
        dateSubmitted: new Date('2024-03-01'),
        votingDeadline: new Date('2024-03-18'),
        status: 'discussion',
        votesFor: 0,
        votesAgainst: 0,
        votesAbstain: 0,
        requiredMajority: 50,
        championsOnly: false
      },
      {
        id: '3',
        title: 'Community Emergency Response Protocol Development',
        description: 'Develop comprehensive emergency response procedures for building evacuations, medical emergencies, and crisis communication systems.',
        category: 'policy',
        proposedBy: 'Elena Rodriguez',
        proposerTier: 'champion',
        dateSubmitted: new Date('2024-03-03'),
        votingDeadline: new Date('2024-03-20'),
        status: 'draft',
        votesFor: 0,
        votesAgainst: 0,
        votesAbstain: 0,
        requiredMajority: 75,
        championsOnly: true
      }
    ];

    const mockRoles: GovernanceRole[] = [
      {
        id: '1',
        title: 'Community Board Chair',
        description: 'Lead governance meetings, represent community interests, and oversee strategic planning',
        responsibilities: [
          'Chair monthly governance meetings',
          'Coordinate with Quintain and Brent Council',
          'Oversee community strategic planning',
          'Manage crisis communications'
        ],
        term: '12 months',
        currentHolder: 'James Thompson',
        requiredTier: 'champion',
        electionDate: new Date('2024-06-01'),
        applications: 3
      },
      {
        id: '2',
        title: 'Events Coordination Director',
        description: 'Oversee community events planning and Methodist Hall partnerships',
        responsibilities: [
          'Coordinate quarterly signature events',
          'Manage Methodist Hall relationship',
          'Oversee event budgets and logistics',
          'Develop event programming strategy'
        ],
        term: '12 months',
        requiredTier: 'curator',
        applications: 7
      },
      {
        id: '3',
        title: 'Technology & Innovation Lead',
        description: 'Guide digital platform development and portal simulator expansion',
        responsibilities: [
          'Oversee portal simulator development',
          'Manage ROV system improvements',
          'Coordinate with tech vendors',
          'Lead digital innovation initiatives'
        ],
        term: '12 months',
        currentHolder: 'Raj Singh',
        requiredTier: 'curator',
        electionDate: new Date('2024-04-15'),
        applications: 5
      }
    ];

    const mockUpdates: CommunityUpdate[] = [
      {
        id: '1',
        title: 'Methodist Hall Partnership Renewed for 2024',
        content: 'Reverend Kido Baek has confirmed continued partnership with enhanced PA system and expanded booking availability.',
        author: 'Community Board',
        date: new Date('2024-03-01'),
        category: 'partnership',
        priority: 'high'
      },
      {
        id: '2',
        title: 'New ROV Personalities in Development',
        content: 'Insight Analysis and Justice Compliance ROVs entering beta testing phase with Champion-tier members.',
        author: 'Technology Team',
        date: new Date('2024-02-28'),
        category: 'development',
        priority: 'medium'
      }
    ];

    setProposals(mockProposals);
    setGovernanceRoles(mockRoles);
    setCommunityUpdates(mockUpdates);
  }, []);

  const canVote = (proposal: GovernanceProposal): boolean => {
    if (proposal.championsOnly && userTier !== 'champion') return false;
    return proposal.status === 'voting';
  };

  const canPropose = (): boolean => {
    return userTier === 'curator' || userTier === 'champion';
  };

  const canApplyForRole = (role: GovernanceRole): boolean => {
    const tierHierarchy = { connector: 0, curator: 1, champion: 2 };
    return tierHierarchy[userTier as keyof typeof tierHierarchy] >= tierHierarchy[role.requiredTier as keyof typeof tierHierarchy];
  };

  const handleVote = (proposalId: string, voteType: 'for' | 'against' | 'abstain') => {
    setProposals(prevProposals =>
      prevProposals.map(proposal => {
        if (proposal.id === proposalId) {
          const updated = { ...proposal };
          if (voteType === 'for') updated.votesFor += 1;
          else if (voteType === 'against') updated.votesAgainst += 1;
          else updated.votesAbstain += 1;
          return updated;
        }
        return proposal;
      })
    );
    
    alert(`Vote recorded: ${voteType} for proposal. Thank you for participating in community governance!`);
  };

  const handleSubmitProposal = () => {
    alert('Proposal Submission Form\n\nAs a ' + userTier + ' member, you can submit proposals for community consideration.\n\nProposal guidelines:\n• Clear problem statement\n• Proposed solution\n• Implementation timeline\n• Budget considerations\n• Community benefit analysis\n\nYour proposal will enter the discussion phase for community feedback before voting.');
  };

  const handleApplyForRole = (roleId: string) => {
    const role = governanceRoles.find(r => r.id === roleId);
    alert(`Application for ${role?.title}\n\nThis governance role requires:\n• ${role?.requiredTier} tier membership or higher\n• Commitment to ${role?.term} term\n• Active community participation\n\nYour application will be reviewed by current governance board and put to community vote.`);
  };

  const getProposalStatusColor = (status: string): string => {
    switch (status) {
      case 'voting': return '#3498db';
      case 'approved': return '#27ae60';
      case 'rejected': return '#e74c3c';
      case 'discussion': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  const getVotePercentage = (proposal: GovernanceProposal): number => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
    if (totalVotes === 0) return 0;
    return Math.round((proposal.votesFor / totalVotes) * 100);
  };

  return (
    <div className="community-governance-hub">
      <header className="governance-header">
        <h1>Community Governance</h1>
        <p>Shape the future of Wembley Wonders through democratic participation</p>
        <div className="user-governance-status">
          <span className="tier-indicator">{userTier} Member</span>
          <span className="participation-level">
            {canPropose() ? 'Can Propose & Vote' : 'Can Vote Only'}
          </span>
        </div>
      </header>

      <div className="governance-tabs">
        {(['proposals', 'roles', 'updates', 'democracy'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="governance-content">
        {selectedTab === 'proposals' && (
          <div className="proposals-section">
            <div className="section-header">
              <h2>Community Proposals</h2>
              {canPropose() && (
                <button className="submit-proposal-btn" onClick={handleSubmitProposal}>
                  Submit New Proposal
                </button>
              )}
            </div>

            <div className="proposals-grid">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="proposal-card">
                  <div className="proposal-header">
                    <h3>{proposal.title}</h3>
                    <div 
                      className="proposal-status"
                      style={{ backgroundColor: getProposalStatusColor(proposal.status) }}
                    >
                      {proposal.status}
                    </div>
                  </div>

                  <p className="proposal-description">{proposal.description}</p>

                  <div className="proposal-meta">
                    <div className="proposer-info">
                      <span>Proposed by: {proposal.proposedBy} ({proposal.proposerTier})</span>
                      <span>Category: {proposal.category}</span>
                    </div>
                    <div className="voting-info">
                      <span>Deadline: {proposal.votingDeadline.toLocaleDateString()}</span>
                      {proposal.championsOnly && (
                        <span className="champions-only">Champions Only</span>
                      )}
                    </div>
                  </div>

                  {proposal.status === 'voting' && (
                    <div className="voting-section">
                      <div className="vote-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${getVotePercentage(proposal)}%` }}
                          ></div>
                        </div>
                        <span className="vote-percentage">{getVotePercentage(proposal)}% in favor</span>
                      </div>

                      <div className="vote-counts">
                        <span>For: {proposal.votesFor}</span>
                        <span>Against: {proposal.votesAgainst}</span>
                        <span>Abstain: {proposal.votesAbstain}</span>
                      </div>

                      {canVote(proposal) && (
                        <div className="voting-buttons">
                          <button 
                            className="vote-btn for"
                            onClick={() => handleVote(proposal.id, 'for')}
                          >
                            Vote For
                          </button>
                          <button 
                            className="vote-btn against"
                            onClick={() => handleVote(proposal.id, 'against')}
                          >
                            Vote Against
                          </button>
                          <button 
                            className="vote-btn abstain"
                            onClick={() => handleVote(proposal.id, 'abstain')}
                          >
                            Abstain
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'roles' && (
          <div className="roles-section">
            <h2>Governance Roles</h2>
            <p>Take on leadership responsibilities and shape community direction</p>

            <div className="roles-grid">
              {governanceRoles.map((role) => (
                <div key={role.id} className="role-card">
                  <div className="role-header">
                    <h3>{role.title}</h3>
                    <span className="required-tier">{role.requiredTier}+ required</span>
                  </div>

                  <p className="role-description">{role.description}</p>

                  <div className="role-responsibilities">
                    <h4>Key Responsibilities:</h4>
                    <ul>
                      {role.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="role-meta">
                    <div className="role-term">Term: {role.term}</div>
                    {role.currentHolder && (
                      <div className="current-holder">
                        Current: {role.currentHolder}
                      </div>
                    )}
                    {role.electionDate && (
                      <div className="election-date">
                        Next election: {role.electionDate.toLocaleDateString()}
                      </div>
                    )}
                    <div className="applications-count">
                      {role.applications} applications
                    </div>
                  </div>

                  {canApplyForRole(role) && !role.currentHolder && (
                    <button 
                      className="apply-role-btn"
                      onClick={() => handleApplyForRole(role.id)}
                    >
                      Apply for Role
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'updates' && (
          <div className="updates-section">
            <h2>Community Updates</h2>
            <div className="updates-timeline">
              {communityUpdates.map((update) => (
                <div key={update.id} className="update-item">
                  <div className="update-date">
                    {update.date.toLocaleDateString()}
                  </div>
                  <div className="update-content">
                    <div className="update-header">
                      <h3>{update.title}</h3>
                      <div className="update-meta">
                        <span className="update-category">{update.category}</span>
                        <span className={`update-priority ${update.priority}`}>
                          {update.priority} priority
                        </span>
                      </div>
                    </div>
                    <p>{update.content}</p>
                    <div className="update-author">By: {update.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'democracy' && (
          <div className="democracy-section">
            <h2>Democratic Participation Guide</h2>
            
            <div className="democracy-info">
              <div className="info-card">
                <h3>Voting Rights by Tier</h3>
                <div className="tier-rights">
                  <div className="tier-right">
                    <strong>Connector:</strong> Can vote on general community proposals
                  </div>
                  <div className="tier-right">
                    <strong>Curator:</strong> Can vote and submit proposals
                  </div>
                  <div className="tier-right">
                    <strong>Champion:</strong> Can vote, propose, and participate in governance roles
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Proposal Process</h3>
                <div className="process-steps">
                  <div className="step">1. Submission by Curator+ member</div>
                  <div className="step">2. Community discussion period (7 days)</div>
                  <div className="step">3. Voting period (7 days)</div>
                  <div className="step">4. Implementation if approved</div>
                </div>
              </div>

              <div className="info-card">
                <h3>Community Values</h3>
                <ul className="values-list">
                  <li>Transparent and inclusive decision-making</li>
                  <li>Respect for diverse perspectives and backgrounds</li>
                  <li>Sustainable community development</li>
                  <li>Anti-gentrification and community integration</li>
                  <li>Professional development through civic engagement</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityGovernanceHub;