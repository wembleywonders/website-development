/**
 * CLIENT COMMS ROV
 * 
 * Professional communication templates for client work.
 * Say the right thing at the right time.
 * 
 * Philosophy: Clear communication prevents 90% of problems.
 * Be professional, be clear, be human.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface ClientCommsProfile {
  id: string;
  name: string;
  businessName?: string;
  email: string;
}

export type CommsScenario = 
  | 'initial-inquiry'
  | 'send-quote'
  | 'project-start'
  | 'check-in'
  | 'request-feedback'
  | 'handle-revision'
  | 'late-payment'
  | 'scope-creep'
  | 'project-complete'
  | 'ask-testimonial';

export interface CommsTemplate {
  id: string;
  scenario: CommsScenario;
  title: string;
  description: string;
  subject?: string;
  body: string;
  tips: string[];
  variables: string[];
}

// ============================================================
// COMMUNICATION TEMPLATES
// ============================================================

const COMMS_TEMPLATES: CommsTemplate[] = [
  {
    id: 'initial-response',
    scenario: 'initial-inquiry',
    title: 'Responding to Initial Inquiry',
    description: 'First response to a potential client',
    subject: 'Re: [PROJECT] - Thanks for reaching out!',
    body: `Hi [CLIENT_NAME],

Thanks so much for getting in touch about [PROJECT_TYPE]. I'd love to help!

To make sure I can give you an accurate quote, could you tell me a bit more about:
- What you're looking to achieve
- Any specific requirements or preferences
- Your ideal timeline
- Your approximate budget range (if you have one in mind)

I typically work on projects like this for [PRICE_RANGE], and turnaround is usually [TIMELINE].

Would you be free for a quick 15-minute call this week to discuss? I'm available [AVAILABILITY].

Looking forward to hearing more!

Best,
[YOUR_NAME]`,
    tips: [
      'Respond within 24 hours (faster = better)',
      'Show interest but don\'t oversell',
      'Ask questions to understand their needs',
      'Give a rough price range to filter serious clients'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_TYPE', 'PRICE_RANGE', 'TIMELINE', 'AVAILABILITY', 'YOUR_NAME']
  },
  {
    id: 'send-quote',
    scenario: 'send-quote',
    title: 'Sending a Quote/Proposal',
    description: 'Formal quote for project work',
    subject: 'Quote for [PROJECT_NAME] - [YOUR_NAME]',
    body: `Hi [CLIENT_NAME],

Thanks for our conversation! Based on what we discussed, here's my quote for [PROJECT_NAME]:

**Project Overview**
[BRIEF_DESCRIPTION]

**What's Included**
- [DELIVERABLE_1]
- [DELIVERABLE_2]
- [DELIVERABLE_3]
- [NUMBER] rounds of revisions

**Investment**
[PRICE] (plus VAT if applicable)

**Timeline**
[TIMELINE] from project start

**Payment Terms**
- 50% deposit to begin
- 50% on completion

**Next Steps**
If you'd like to proceed, just reply confirming and I'll send over a simple agreement and invoice for the deposit.

This quote is valid for 14 days.

Any questions at all, just let me know!

Best,
[YOUR_NAME]`,
    tips: [
      'Be specific about what\'s included AND excluded',
      'Always include a deadline for the quote',
      'Make next steps crystal clear',
      'Don\'t apologize for your prices'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'BRIEF_DESCRIPTION', 'DELIVERABLE_1', 'DELIVERABLE_2', 'DELIVERABLE_3', 'NUMBER', 'PRICE', 'TIMELINE', 'YOUR_NAME']
  },
  {
    id: 'project-kickoff',
    scenario: 'project-start',
    title: 'Project Kickoff Email',
    description: 'Setting expectations at project start',
    subject: 'Let\'s get started! - [PROJECT_NAME]',
    body: `Hi [CLIENT_NAME],

Great news - I've received your deposit and we're ready to begin [PROJECT_NAME]!

**Here's what happens next:**
1. I'll start work on [FIRST_MILESTONE] this week
2. You'll receive [FIRST_DELIVERABLE] by [DATE]
3. We'll review together and go from there

**How we'll communicate:**
- I'll send updates every [FREQUENCY]
- Best way to reach me: [CONTACT_METHOD]
- If you need anything, just email/message

**What I need from you:**
- [ASSET_1] (if not already received)
- [ASSET_2]
- Feedback within [TIMEFRAME] when I share work

If anything changes on your end or you have questions, just let me know.

Excited to get started!

Best,
[YOUR_NAME]`,
    tips: [
      'Set clear expectations upfront',
      'Tell them how often they\'ll hear from you',
      'Be specific about what you need from them',
      'Keep the tone positive and energetic'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'FIRST_MILESTONE', 'FIRST_DELIVERABLE', 'DATE', 'FREQUENCY', 'CONTACT_METHOD', 'ASSET_1', 'ASSET_2', 'TIMEFRAME', 'YOUR_NAME']
  },
  {
    id: 'progress-update',
    scenario: 'check-in',
    title: 'Progress Update',
    description: 'Keeping clients in the loop',
    subject: '[PROJECT_NAME] - Progress Update',
    body: `Hi [CLIENT_NAME],

Quick update on [PROJECT_NAME]:

**Completed this week:**
- [COMPLETED_1]
- [COMPLETED_2]

**Up next:**
- [NEXT_1]
- [NEXT_2]

**Timeline check:** We're [ON_TRACK/AHEAD/SLIGHTLY_BEHIND] schedule. [ADDITIONAL_CONTEXT_IF_NEEDED]

**Attached:** [DESCRIPTION_OF_ATTACHMENT]

Let me know if you have any questions or feedback!

Best,
[YOUR_NAME]`,
    tips: [
      'Update even when there\'s nothing dramatic to report',
      'Be honest if you\'re behind schedule',
      'Attach visuals when possible',
      'Keep it brief - clients are busy'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'COMPLETED_1', 'COMPLETED_2', 'NEXT_1', 'NEXT_2', 'ON_TRACK/AHEAD/SLIGHTLY_BEHIND', 'ADDITIONAL_CONTEXT_IF_NEEDED', 'DESCRIPTION_OF_ATTACHMENT', 'YOUR_NAME']
  },
  {
    id: 'request-feedback',
    scenario: 'request-feedback',
    title: 'Requesting Client Feedback',
    description: 'When you need their input to proceed',
    subject: '[PROJECT_NAME] - Feedback needed',
    body: `Hi [CLIENT_NAME],

[PROJECT_NAME] is progressing well! I've attached [WHAT_YOU\'RE_SHARING] for your review.

**What I'm looking for:**
- Does this [MATCH_EXPECTATIONS]?
- Any changes you'd like to see?
- [SPECIFIC_QUESTION]

Please share your thoughts by [DEADLINE] so we can stay on schedule.

If you need more time, just let me know and we can adjust.

Thanks!
[YOUR_NAME]`,
    tips: [
      'Ask specific questions, not just "what do you think?"',
      'Give them a deadline for feedback',
      'Make it easy to respond (numbered options if helpful)',
      'Remind them delays on their end affect the timeline'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'WHAT_YOU\'RE_SHARING', 'MATCH_EXPECTATIONS', 'SPECIFIC_QUESTION', 'DEADLINE', 'YOUR_NAME']
  },
  {
    id: 'revision-response',
    scenario: 'handle-revision',
    title: 'Handling Revision Requests',
    description: 'When client wants changes',
    subject: 'Re: [PROJECT_NAME] - Revision notes',
    body: `Hi [CLIENT_NAME],

Thanks for the feedback on [PROJECT_NAME]! I've reviewed your notes and here's the plan:

**Changes I'll make:**
- [CHANGE_1]
- [CHANGE_2]
- [CHANGE_3]

**Clarification needed:**
- [QUESTION_IF_ANY]

**Timeline:** I'll have the revised version to you by [DATE].

[IF_OUTSIDE_SCOPE:]
Note: [SPECIFIC_REQUEST] is outside the original scope we agreed. I can absolutely do this - it would be an additional [PRICE] and add [TIME] to the timeline. Let me know if you'd like to proceed!

Best,
[YOUR_NAME]`,
    tips: [
      'Acknowledge ALL their feedback',
      'Be clear about what you will and won\'t change',
      'Flag out-of-scope requests professionally',
      'Don\'t be defensive about revisions'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'CHANGE_1', 'CHANGE_2', 'CHANGE_3', 'QUESTION_IF_ANY', 'DATE', 'SPECIFIC_REQUEST', 'PRICE', 'TIME', 'YOUR_NAME']
  },
  {
    id: 'late-payment-reminder',
    scenario: 'late-payment',
    title: 'Late Payment Reminder',
    description: 'Polite but firm payment chase',
    subject: 'Invoice [NUMBER] - Friendly reminder',
    body: `Hi [CLIENT_NAME],

Hope you're well! Just a quick note that invoice [NUMBER] for £[AMOUNT] was due on [DATE].

I'm sure it's just slipped through the cracks. Could you let me know when I can expect payment?

For reference, here are my payment details:
[PAYMENT_DETAILS]

Please let me know if you have any questions.

Thanks,
[YOUR_NAME]`,
    tips: [
      'Stay polite but don\'t over-apologize',
      'Be specific about the invoice and amount',
      'Make payment easy by including details',
      'Follow up again in a week if no response'
    ],
    variables: ['CLIENT_NAME', 'NUMBER', 'AMOUNT', 'DATE', 'PAYMENT_DETAILS', 'YOUR_NAME']
  },
  {
    id: 'scope-creep-response',
    scenario: 'scope-creep',
    title: 'Handling Scope Creep',
    description: 'When they ask for more than agreed',
    subject: 'Re: [PROJECT_NAME] - Additional request',
    body: `Hi [CLIENT_NAME],

Thanks for the additional thoughts on [PROJECT_NAME]!

The [NEW_REQUEST] sounds great. Just to check - this wasn't part of our original agreement, so I wanted to confirm how you'd like to proceed:

**Option 1:** Add to this project
- Additional cost: £[PRICE]
- Extended timeline: +[TIME]

**Option 2:** Separate project
- We complete the current scope first
- New quote for [NEW_REQUEST] after

**Option 3:** Swap priorities
- Replace [EXISTING_ELEMENT] with [NEW_REQUEST]
- No change to cost/timeline

Let me know which works best for you!

Best,
[YOUR_NAME]`,
    tips: [
      'Don\'t just say no - offer options',
      'Frame additional work as additional value',
      'Keep the tone collaborative, not confrontational',
      'Document the change in writing'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'NEW_REQUEST', 'PRICE', 'TIME', 'EXISTING_ELEMENT', 'YOUR_NAME']
  },
  {
    id: 'project-delivery',
    scenario: 'project-complete',
    title: 'Final Delivery',
    description: 'Delivering completed work',
    subject: '[PROJECT_NAME] - Final delivery 🎉',
    body: `Hi [CLIENT_NAME],

Great news - [PROJECT_NAME] is complete!

**Attached you'll find:**
- [FILE_1]
- [FILE_2]
- [FILE_3]

**Quick usage notes:**
- [NOTE_1]
- [NOTE_2]

**Final invoice:** I've attached invoice [NUMBER] for the remaining balance of £[AMOUNT]. Payment due within [DAYS] days.

It's been a pleasure working on this project with you. If you need any tweaks or have questions, just shout.

Would love to hear how it performs once it's live!

Best,
[YOUR_NAME]`,
    tips: [
      'Include all final files clearly organized',
      'Add any usage notes they might need',
      'Include the final invoice',
      'End on a positive note'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'FILE_1', 'FILE_2', 'FILE_3', 'NOTE_1', 'NOTE_2', 'NUMBER', 'AMOUNT', 'DAYS', 'YOUR_NAME']
  },
  {
    id: 'testimonial-request',
    scenario: 'ask-testimonial',
    title: 'Asking for a Testimonial',
    description: 'Getting that social proof',
    subject: 'Quick favour?',
    body: `Hi [CLIENT_NAME],

Hope [PROJECT_NAME] is working well for you!

I'm building up my portfolio and would really appreciate a short testimonial from you - if you have a moment.

No pressure at all, but if you're happy with the work, a few sentences about your experience would mean a lot.

To make it easy, you could answer any of these:
- What was it like working with me?
- How has [PROJECT_NAME] helped your [BUSINESS/PROJECT]?
- Would you recommend me to others?

Even just 2-3 sentences would be amazing!

Thanks so much,
[YOUR_NAME]

PS - If you'd prefer to leave a review on [PLATFORM], here's the link: [LINK]`,
    tips: [
      'Ask when they\'re happy (right after delivery or positive feedback)',
      'Make it easy with prompting questions',
      'Keep it low-pressure',
      'Offer multiple ways to leave feedback'
    ],
    variables: ['CLIENT_NAME', 'PROJECT_NAME', 'BUSINESS/PROJECT', 'PLATFORM', 'LINK', 'YOUR_NAME']
  }
];

// ============================================================
// COMPONENT
// ============================================================

export interface ClientCommsROVProps {
  profile: ClientCommsProfile;
  onCopyTemplate?: (template: CommsTemplate) => void;
}

export const ClientCommsROV: React.FC<ClientCommsROVProps> = ({
  profile,
  onCopyTemplate
}) => {
  const [selectedScenario, setSelectedScenario] = useState<CommsScenario | null>(null);
  const [customizedTemplate, setCustomizedTemplate] = useState<string>('');
  
  const scenarios: { id: CommsScenario; label: string; icon: string }[] = [
    { id: 'initial-inquiry', label: 'Reply to Inquiry', icon: '📨' },
    { id: 'send-quote', label: 'Send Quote', icon: '💰' },
    { id: 'project-start', label: 'Project Kickoff', icon: '🚀' },
    { id: 'check-in', label: 'Progress Update', icon: '📊' },
    { id: 'request-feedback', label: 'Request Feedback', icon: '💬' },
    { id: 'handle-revision', label: 'Handle Revisions', icon: '✏️' },
    { id: 'late-payment', label: 'Chase Payment', icon: '⏰' },
    { id: 'scope-creep', label: 'Scope Creep', icon: '📈' },
    { id: 'project-complete', label: 'Deliver Project', icon: '🎉' },
    { id: 'ask-testimonial', label: 'Ask Testimonial', icon: '⭐' }
  ];
  
  const activeTemplate = COMMS_TEMPLATES.find(t => t.scenario === selectedScenario);
  
  const handleUseTemplate = () => {
    if (activeTemplate) {
      let filled = activeTemplate.body;
      // Pre-fill with profile data
      filled = filled.replace(/\[YOUR_NAME\]/g, profile.name);
      setCustomizedTemplate(filled);
    }
  };
  
  const copyToClipboard = () => {
    const textToCopy = customizedTemplate || activeTemplate?.body || '';
    navigator.clipboard.writeText(textToCopy);
    onCopyTemplate?.(activeTemplate!);
  };
  
  return (
    <div className="client-comms-rov">
      <div className="client-comms-rov__header">
        <div className="client-comms-rov__avatar">💬</div>
        <div className="client-comms-rov__info">
          <h2>Client Comms</h2>
          <span>Professional Communication Templates</span>
        </div>
      </div>
      
      <div className="client-comms-rov__intro">
        <p>
          Clear communication prevents 90% of client problems. 
          Use these templates as starting points - always personalize them.
        </p>
      </div>
      
      {/* Scenario Selection */}
      <div className="client-comms-rov__scenarios">
        <h3>What do you need to say?</h3>
        <div className="scenario-grid">
          {scenarios.map(scenario => (
            <button
              key={scenario.id}
              className={`scenario-btn ${selectedScenario === scenario.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedScenario(scenario.id);
                setCustomizedTemplate('');
              }}
            >
              <span className="icon">{scenario.icon}</span>
              <span className="label">{scenario.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Template Display */}
      {activeTemplate && (
        <div className="client-comms-rov__template">
          <div className="template-header">
            <h3>{activeTemplate.title}</h3>
            <p>{activeTemplate.description}</p>
          </div>
          
          {activeTemplate.subject && (
            <div className="template-subject">
              <strong>Subject:</strong> {activeTemplate.subject}
            </div>
          )}
          
          <div className="template-body">
            <div className="template-tips">
              <h4>💡 Tips</h4>
              <ul>
                {activeTemplate.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="template-content">
              <h4>Template</h4>
              {customizedTemplate ? (
                <textarea
                  value={customizedTemplate}
                  onChange={(e) => setCustomizedTemplate(e.target.value)}
                  rows={15}
                />
              ) : (
                <pre>{activeTemplate.body}</pre>
              )}
            </div>
            
            <div className="template-variables">
              <h4>Variables to Replace</h4>
              <div className="variable-tags">
                {activeTemplate.variables.map(v => (
                  <span key={v} className="variable-tag">[{v}]</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="template-actions">
            {!customizedTemplate && (
              <button className="btn-secondary" onClick={handleUseTemplate}>
                Start Customizing
              </button>
            )}
            <button className="btn-primary" onClick={copyToClipboard}>
              📋 Copy to Clipboard
            </button>
          </div>
        </div>
      )}
      
      {/* General Communication Tips */}
      <div className="client-comms-rov__general-tips">
        <h3>🎯 Golden Rules of Client Communication</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <strong>Respond Quickly</strong>
            <p>Within 24 hours, even if just to say "I'll get back to you"</p>
          </div>
          <div className="tip-card">
            <strong>Be Specific</strong>
            <p>Vague = confusion. Dates, numbers, deliverables - be precise</p>
          </div>
          <div className="tip-card">
            <strong>Put It In Writing</strong>
            <p>Important agreements should always be documented in email</p>
          </div>
          <div className="tip-card">
            <strong>Stay Professional</strong>
            <p>Even when frustrated. You can be firm without being rude</p>
          </div>
          <div className="tip-card">
            <strong>Set Expectations</strong>
            <p>Timelines, revisions, payment - clarify before problems arise</p>
          </div>
          <div className="tip-card">
            <strong>Be Human</strong>
            <p>Professional ≠ robotic. Let your personality show</p>
          </div>
        </div>
      </div>
      
      <div className="client-comms-rov__footer">
        <p>
          💚 Good communication builds trust. Trust builds relationships. 
          Relationships build careers.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { COMMS_TEMPLATES };
export default ClientCommsROV;