// src/systems/rovs/personalities/insight/InsightAnalysisROV.tsx
import React, { useState, useEffect } from 'react';
import { InsightAnalysisROVProps, InsightSession, DataPattern } from './InsightAnalysisROVTypes';

const InsightAnalysisROV: React.FC<InsightAnalysisROVProps> = ({
  userId,
  skillId,
  onAnalysisComplete,
  onRecommendation,
  analysisType = 'performance',
  dataContext = {}
}) => {
  const [currentSession, setCurrentSession] = useState<InsightSession | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    initializeSession();
  }, [userId, skillId]);

  const initializeSession = () => {
    const session: InsightSession = {
      id: `insight-${Date.now()}`,
      userId,
      skillId: skillId || '',
      startedAt: new Date(),
      analysisType,
      dataAnalyzed: [],
      patternsIdentified: [],
      recommendations: [],
      confidence: 0,
      actionable: true
    };
    setCurrentSession(session);
  };

  const analyzeData = async () => {
    if (!currentSession) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate data analysis process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const patterns = identifyPatterns(dataContext);
      const analysisInsights = generateInsights(patterns);
      const actionRecommendations = generateRecommendations(patterns, analysisInsights);

      const updatedSession: InsightSession = {
        ...currentSession,
        patternsIdentified: patterns,
        recommendations: actionRecommendations,
        confidence: calculateConfidence(patterns),
        completedAt: new Date()
      };

      setCurrentSession(updatedSession);
      setInsights(analysisInsights);
      setRecommendations(actionRecommendations);

      if (onAnalysisComplete) {
        onAnalysisComplete(updatedSession);
      }

      if (onRecommendation && actionRecommendations.length > 0) {
        onRecommendation(actionRecommendations[0]);
      }

    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const identifyPatterns = (data: any): DataPattern[] => {
    // Mock pattern identification - in real implementation would use ML/analytics
    const patterns: DataPattern[] = [];

    if (analysisType === 'performance') {
      patterns.push({
        type: 'trend',
        description: 'Skill progress shows consistent improvement over past month',
        strength: 0.85,
        dataPoints: ['week1: 65%', 'week2: 72%', 'week3: 78%', 'week4: 83%'],
        significance: 'high'
      });

      patterns.push({
        type: 'correlation',
        description: 'ROV assistance usage correlates with faster skill acquisition',
        strength: 0.78,
        dataPoints: ['ROV sessions: 12', 'Skill gain: +25 points', 'Time efficiency: +40%'],
        significance: 'medium'
      });
    }

    if (analysisType === 'community') {
      patterns.push({
        type: 'engagement',
        description: 'Peak community activity occurs during evening hours (6-9 PM)',
        strength: 0.92,
        dataPoints: ['6PM: 45 active', '7PM: 67 active', '8PM: 72 active', '9PM: 58 active'],
        significance: 'high'
      });
    }

    return patterns;
  };

  const generateInsights = (patterns: DataPattern[]): string[] => {
    const insights: string[] = [];

    patterns.forEach(pattern => {
      switch (pattern.type) {
        case 'trend':
          insights.push(`Your skill development shows a strong upward trajectory with ${Math.round(pattern.strength * 100)}% consistency. This indicates effective learning habits and engagement.`);
          break;
        case 'correlation':
          insights.push(`Data shows that ROV-assisted learning sessions result in ${Math.round((pattern.strength - 0.5) * 200)}% faster skill acquisition compared to unassisted practice.`);
          break;
        case 'engagement':
          insights.push(`Community engagement peaks during evening hours, suggesting this is the optimal time for collaborative activities and networking.`);
          break;
        case 'bottleneck':
          insights.push(`Analysis reveals a potential learning bottleneck that could be addressed through targeted intervention.`);
          break;
      }
    });

    return insights;
  };

  const generateRecommendations = (patterns: DataPattern[], insights: string[]): string[] => {
    const recommendations: string[] = [];

    if (analysisType === 'performance') {
      recommendations.push('Schedule regular ROV coaching sessions to maintain your accelerated learning pace');
      recommendations.push('Focus next development efforts on project leadership skills to maximize career impact');
      recommendations.push('Consider mentoring newer community members to reinforce your own learning');
    }

    if (analysisType === 'community') {
      recommendations.push('Plan community events for 7-8 PM to maximize attendance and engagement');
      recommendations.push('Create evening networking sessions to leverage peak activity periods');
      recommendations.push('Develop asynchronous engagement options for members in different time zones');
    }

    return recommendations;
  };

  const calculateConfidence = (patterns: DataPattern[]): number => {
    if (patterns.length === 0) return 0;
    
    const averageStrength = patterns.reduce((sum, pattern) => sum + pattern.strength, 0) / patterns.length;
    const significanceBonus = patterns.filter(p => p.significance === 'high').length * 0.1;
    
    return Math.min(averageStrength + significanceBonus, 1.0);
  };

  const handleManualAnalysis = () => {
    analyzeData();
  };

  const formatConfidence = (confidence: number): string => {
    const percentage = Math.round(confidence * 100);
    if (percentage >= 80) return `High confidence (${percentage}%)`;
    if (percentage >= 60) return `Medium confidence (${percentage}%)`;
    return `Low confidence (${percentage}%)`;
  };

  return (
    <div className="insight-analysis-rov">
      <div className="rov-header">
        <div className="rov-avatar">📊</div>
        <div className="rov-info">
          <h3>Insight Analysis ROV</h3>
          <p>Data-driven analysis and strategic recommendations</p>
        </div>
      </div>

      <div className="analysis-status">
        {isAnalyzing ? (
          <div className="analyzing">
            <div className="spinner"></div>
            <span>Analyzing patterns in your data...</span>
          </div>
        ) : currentSession && currentSession.completedAt ? (
          <div className="analysis-complete">
            <span className="status-indicator">✓</span>
            <span>Analysis complete - {formatConfidence(currentSession.confidence)}</span>
          </div>
        ) : (
          <div className="analysis-ready">
            <span className="status-indicator">⏳</span>
            <span>Ready to analyze your {analysisType} data</span>
          </div>
        )}
      </div>

      {!isAnalyzing && (!currentSession?.completedAt) && (
        <div className="analysis-controls">
          <button 
            className="analyze-btn"
            onClick={handleManualAnalysis}
          >
            Start Data Analysis
          </button>
        </div>
      )}

      {insights.length > 0 && (
        <div className="insights-section">
          <h4>Key Insights</h4>
          <div className="insights-list">
            {insights.map((insight, index) => (
              <div key={index} className="insight-item">
                <div className="insight-icon">💡</div>
                <div className="insight-text">{insight}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h4>Strategic Recommendations</h4>
          <div className="recommendations-list">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <div className="recommendation-icon">🎯</div>
                <div className="recommendation-text">{recommendation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentSession?.patternsIdentified && currentSession.patternsIdentified.length > 0 && (
        <div className="patterns-section">
          <h4>Patterns Identified</h4>
          <div className="patterns-grid">
            {currentSession.patternsIdentified.map((pattern, index) => (
              <div key={index} className="pattern-card">
                <div className="pattern-header">
                  <span className="pattern-type">{pattern.type}</span>
                  <span className={`pattern-significance ${pattern.significance}`}>
                    {pattern.significance} significance
                  </span>
                </div>
                <div className="pattern-description">{pattern.description}</div>
                <div className="pattern-strength">
                  Strength: {Math.round(pattern.strength * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightAnalysisROV;