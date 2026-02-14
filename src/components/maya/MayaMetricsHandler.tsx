// src/components/maya/MayaMetricsHandler.tsx
// Integration component showing how Maya handles metrics queries

import React from 'react';
import { useMayaMetrics } from '../../hooks/useMetrics';
import { MetricsQueryResult } from '../../services/MayaMetricsIntegration';

// ============================================
// MAYA METRICS RESPONSE COMPONENT
// ============================================

interface MayaMetricsResponseProps {
  result: MetricsQueryResult;
  onFollowUp?: (query: string) => void;
}

export const MayaMetricsResponse: React.FC<MayaMetricsResponseProps> = ({ 
  result, 
  onFollowUp 
}) => {
  return (
    <div className="maya-metrics-response">
      <div className="metrics-content">
        {result.response.split('\n').map((line, i) => {
          // Handle markdown-style formatting
          if (line.startsWith('**') && line.endsWith('**')) {
            return <h4 key={i}>{line.replace(/\*\*/g, '')}</h4>;
          }
          if (line.startsWith('• ')) {
            return <p key={i} className="bullet-item">{line.substring(2)}</p>;
          }
          if (line.startsWith('_') && line.endsWith('_')) {
            return <p key={i} className="subtitle">{line.replace(/_/g, '')}</p>;
          }
          if (line.trim() === '') {
            return <br key={i} />;
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
      
      {result.suggestedFollowUps && result.suggestedFollowUps.length > 0 && (
        <div className="metrics-followups">
          <span className="followup-label">Ask me more:</span>
          <div className="followup-buttons">
            {result.suggestedFollowUps.map((followUp, i) => (
              <button
                key={i}
                className="followup-btn"
                onClick={() => onFollowUp?.(followUp)}
              >
                {followUp}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// MAYA METRICS HOOK EXAMPLE
// ============================================

/**
 * Example of how to integrate metrics into Maya's conversation handler.
 * 
 * In your Maya conversation processing:
 * 
 * ```typescript
 * import { useMayaMetrics } from '../../hooks/useMetrics';
 * 
 * const MyMayaComponent = () => {
 *   const { handleQuery, isMetricsQuery } = useMayaMetrics();
 * 
 *   const processUserMessage = (message: string) => {
 *     // Check if this is a metrics query
 *     if (isMetricsQuery(message)) {
 *       const result = handleQuery(message);
 *       if (result.found) {
 *         return {
 *           type: 'metrics',
 *           content: result.response,
 *           followUps: result.suggestedFollowUps
 *         };
 *       }
 *     }
 *     
 *     // Continue with regular Maya processing...
 *     return regularMayaResponse(message);
 *   };
 * };
 * ```
 */

// ============================================
// SAMPLE MAYA CONVERSATION INTEGRATION
// ============================================

export interface MayaMessage {
  role: 'user' | 'maya';
  content: string;
  type?: 'text' | 'metrics' | 'action';
  metadata?: {
    reportType?: string;
    followUps?: string[];
  };
}

/**
 * Process a user message and determine if it's a metrics query
 */
export function processMayaMetricsQuery(
  userMessage: string,
  metricsHandler: ReturnType<typeof useMayaMetrics>
): MayaMessage | null {
  const { handleQuery, isMetricsQuery } = metricsHandler;
  
  // Check if this looks like a metrics query
  if (!isMetricsQuery(userMessage)) {
    return null;
  }
  
  // Process the query
  const result = handleQuery(userMessage);
  
  if (!result.found) {
    // Return the help text
    return {
      role: 'maya',
      content: result.response,
      type: 'text',
      metadata: {
        followUps: result.suggestedFollowUps
      }
    };
  }
  
  // Return the metrics response
  return {
    role: 'maya',
    content: result.response,
    type: 'metrics',
    metadata: {
      reportType: result.reportType,
      followUps: result.suggestedFollowUps
    }
  };
}

// ============================================
// QUICK STATS WIDGET FOR MAYA
// ============================================

interface QuickStatsWidgetProps {
  className?: string;
}

export const MayaQuickStatsWidget: React.FC<QuickStatsWidgetProps> = ({ className }) => {
  const { getQuickStat } = useMayaMetrics();
  
  const stats = [
    { key: 'total-creators', label: 'Creators' },
    { key: 'earning', label: 'Earning' },
    { key: 'created-creators', label: 'Created' },
    { key: 'local', label: 'Local' }
  ];
  
  return (
    <div className={`maya-quick-stats ${className || ''}`}>
      <div className="quick-stats-header">
        <span>📊 Quick Stats</span>
      </div>
      <div className="quick-stats-grid">
        {stats.map(stat => (
          <div key={stat.key} className="quick-stat-item">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{getQuickStat(stat.key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE QUERIES FOR TESTING
// ============================================

export const sampleMetricsQueries = [
  // Quick stats
  "How many creators do we have?",
  "How many people are earning money?",
  "How many created creators do we have?",
  "What's our platform GMV?",
  "How local are we?",
  "What's the conversion rate?",
  "How long until first sale?",
  "What's our Year 1 goal progress?",
  
  // Reports
  "Show me the executive summary",
  "Creator journey analysis",
  "Income breakdown",
  "Geographic distribution",
  "Competitive position",
  "Goal progress report",
  
  // Mission
  "What's our mission?",
  "Why are we different from competitors?",
  
  // Natural language
  "How are we doing overall?",
  "Are we on track for our goals?",
  "How does our revenue compare to Gumroad?",
  "Tell me about our community"
];

export default {
  MayaMetricsResponse,
  MayaQuickStatsWidget,
  processMayaMetricsQuery,
  sampleMetricsQueries
};