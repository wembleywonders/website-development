// src/services/MayaMetricsIntegration.ts
// Integration layer for Maya/ROVs to access metrics through conversation

import { metricsService } from './MetricsService';
import { ReportType, GeneratedReport } from '../types/metrics';

// ============================================
// INTENT PATTERNS FOR METRICS QUERIES
// ============================================

interface MetricsIntent {
  patterns: RegExp[];
  handler: () => string;
  reportType?: ReportType;
}

const metricsIntents: MetricsIntent[] = [
  // Quick stats
  {
    patterns: [
      /how many (creators?|members?|people)/i,
      /total creators?/i,
      /creator count/i
    ],
    handler: () => metricsService.getQuickStat('total-creators')
  },
  {
    patterns: [
      /how many.*(earning|making money|income)/i,
      /(who|how many).*(earning|making|selling)/i,
      /creators?.*(earning|making)/i
    ],
    handler: () => metricsService.getQuickStat('earning')
  },
  {
    patterns: [
      /created creators?/i,
      /from zero/i,
      /never earned before/i,
      /new to earning/i,
      /wouldn't have tried/i
    ],
    handler: () => metricsService.getQuickStat('created-creators')
  },
  {
    patterns: [
      /gmv|revenue|money|income.*(platform|total|overall)/i,
      /how much.*(platform|we|total).*(making|earning|revenue)/i,
      /platform.*(revenue|earnings|income)/i
    ],
    handler: () => metricsService.getQuickStat('gmv')
  },
  {
    patterns: [
      /local|brent|wembley.*(percentage|how many|count)/i,
      /(how|what).*(local|brent)/i,
      /geographic|location/i
    ],
    handler: () => metricsService.getQuickStat('local')
  },
  {
    patterns: [
      /conversion.*(rate|percentage)/i,
      /zero to earning/i,
      /conversion/i
    ],
    handler: () => metricsService.getQuickStat('conversion')
  },
  {
    patterns: [
      /time to (first )?sale/i,
      /how (long|quickly).*(first )?sale/i,
      /days to sale/i
    ],
    handler: () => metricsService.getQuickStat('time-to-sale')
  },
  {
    patterns: [
      /year ?1 goals?/i,
      /goals?.*(progress|status)/i,
      /how.*(doing|going).*(goals?|targets?)/i
    ],
    handler: () => metricsService.getQuickStat('year1-goals')
  },
  
  // Mission statement
  {
    patterns: [
      /mission/i,
      /what.*(we|wembley).*(about|doing|for)/i,
      /our (purpose|goal|aim)/i,
      /why.*(different|special)/i
    ],
    handler: () => metricsService.getMissionStatement()
  },
  
  // Full reports
  {
    patterns: [
      /executive summary/i,
      /overview|summary|snapshot/i,
      /how.*(we|things|platform).*(doing|going)/i
    ],
    handler: () => formatReport(metricsService.generateReport({ 
      type: 'executive-summary', 
      format: 'summary' 
    })),
    reportType: 'executive-summary'
  },
  {
    patterns: [
      /creator journey/i,
      /funnel|stages?/i,
      /progression/i
    ],
    handler: () => formatReport(metricsService.generateReport({ 
      type: 'creator-journey', 
      format: 'summary' 
    })),
    reportType: 'creator-journey'
  },
  {
    patterns: [
      /income (analysis|breakdown|report)/i,
      /revenue (analysis|breakdown|report)/i,
      /money (breakdown|distribution)/i
    ],
    handler: () => formatReport(metricsService.generateReport({ 
      type: 'income-analysis', 
      format: 'summary' 
    })),
    reportType: 'income-analysis'
  },
  {
    patterns: [
      /geo(graphic)? (breakdown|analysis|report)/i,
      /location (breakdown|analysis|report)/i,
      /where.*(creators?|members?).*(from|located)/i
    ],
    handler: () => formatReport(metricsService.generateReport({ 
      type: 'geographic-breakdown', 
      format: 'summary' 
    })),
    reportType: 'geographic-breakdown'
  },
  {
    patterns: [
      /competitive (position|analysis|comparison)/i,
      /vs (gumroad|etsy|teachable)/i,
      /how.*(compare|different).*(competitors?|others)/i,
      /moat/i
    ],
    handler: () => formatReport(metricsService.generateReport({ 
      type: 'competitive-position', 
      format: 'summary' 
    })),
    reportType: 'competitive-position'
  },
  {
    patterns: [
      /goal progress/i,
      /strategic goals?/i,
      /targets?.*(progress|status)/i,
      /year \d goals?/i
    ],
    handler: () => formatReport(metricsService.generateReport({ 
      type: 'goal-progress', 
      format: 'summary' 
    })),
    reportType: 'goal-progress'
  }
];

// ============================================
// REPORT FORMATTER
// ============================================

function formatReport(report: GeneratedReport): string {
  const sections: string[] = [];
  
  // Header
  sections.push(`📊 **${report.type.replace(/-/g, ' ').toUpperCase()}**`);
  sections.push(`_${report.period}_\n`);
  
  // Highlights
  if (report.highlights.length > 0) {
    sections.push('**Highlights:**');
    report.highlights.forEach(h => sections.push(`• ${h}`));
    sections.push('');
  }
  
  // Concerns
  if (report.concerns.length > 0) {
    sections.push('**Concerns:**');
    report.concerns.forEach(c => sections.push(`• ${c}`));
    sections.push('');
  }
  
  // Recommendations
  if (report.recommendations.length > 0) {
    sections.push('**Recommendations:**');
    report.recommendations.forEach(r => sections.push(`• ${r}`));
    sections.push('');
  }
  
  // Goal progress (if available)
  if (report.goalProgress && report.goalProgress.length > 0) {
    sections.push('**Goal Progress:**');
    report.goalProgress.forEach(g => {
      const emoji = g.status === 'achieved' ? '✅' : g.status === 'on-track' ? '📈' : g.status === 'at-risk' ? '⚠️' : '🔴';
      sections.push(`${emoji} ${g.name}: ${g.current}/${g.target} (${g.percentage}%)`);
    });
  }
  
  return sections.join('\n');
}

// ============================================
// MAIN QUERY HANDLER
// ============================================

export interface MetricsQueryResult {
  found: boolean;
  response: string;
  reportType?: ReportType;
  suggestedFollowUps?: string[];
}

export function handleMetricsQuery(query: string): MetricsQueryResult {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check each intent pattern
  for (const intent of metricsIntents) {
    for (const pattern of intent.patterns) {
      if (pattern.test(normalizedQuery)) {
        const response = intent.handler();
        
        // Generate follow-up suggestions based on report type
        const followUps = generateFollowUps(intent.reportType);
        
        return {
          found: true,
          response,
          reportType: intent.reportType,
          suggestedFollowUps: followUps
        };
      }
    }
  }
  
  // No match found - return helpful guidance
  return {
    found: false,
    response: getMetricsHelpText(),
    suggestedFollowUps: [
      "Show me the executive summary",
      "How many creators are earning?",
      "What's our competitive position?"
    ]
  };
}

function generateFollowUps(currentReport?: ReportType): string[] {
  const allFollowUps: Record<string, string[]> = {
    'executive-summary': [
      "Show me the income breakdown",
      "How's our geographic distribution?",
      "What's the creator journey funnel?"
    ],
    'income-analysis': [
      "Show the competitive comparison",
      "How many from zero are now earning?",
      "What are our Year 1 goals?"
    ],
    'creator-journey': [
      "Show income distribution",
      "How long until first sale?",
      "Who are the mentors?"
    ],
    'geographic-breakdown': [
      "Why is local density important?",
      "Show the competitive position",
      "How many in Wembley specifically?"
    ],
    'competitive-position': [
      "Show the full executive summary",
      "What's our moat?",
      "How many created creators do we have?"
    ],
    'goal-progress': [
      "Show Year 3 goals",
      "What about Year 5?",
      "What needs the most attention?"
    ]
  };
  
  return allFollowUps[currentReport || 'executive-summary'] || [
    "Show executive summary",
    "How many creators?",
    "What's our mission impact?"
  ];
}

function getMetricsHelpText(): string {
  return `I can help you with Creator Factory metrics! Try asking:

**Quick Stats:**
• "How many creators do we have?"
• "How many are earning?"
• "How many created creators?" (zero income before us)
• "What's the platform GMV?"
• "How local are we?"

**Reports:**
• "Show executive summary"
• "Creator journey analysis"
• "Income breakdown"
• "Geographic distribution"
• "Competitive position"
• "Goal progress"

**Mission:**
• "What's our mission?"
• "Why are we different?"`;
}

// ============================================
// ROV INTEGRATION HOOKS
// ============================================

export interface ROVMetricsContext {
  creatorId?: string;
  programmeId?: string;
  currentPage?: string;
}

export function getContextualMetrics(context: ROVMetricsContext): string {
  const metrics = metricsService.getDashboardMetrics();
  
  // If on a specific programme page, show programme-specific stats
  if (context.programmeId) {
    const productCount = metrics.productsByProgramme[context.programmeId as keyof typeof metrics.productsByProgramme] || 0;
    return `This programme has produced ${productCount} products. ${metrics.creatorsNowEarning} creators are currently earning across all programmes.`;
  }
  
  // If in creator context, show relevant stats
  if (context.creatorId) {
    return `You're one of ${metrics.totalCreators} creators. ${metrics.creatorsNowEarning} are currently earning, with an average income of £${metrics.avgMonthlyIncomePerEarner}/month.`;
  }
  
  // Default context
  return `Wembley Wonders has ${metrics.totalCreators} creators, with ${metrics.creatorsNowEarning} currently earning. Platform GMV: £${metrics.totalPlatformGMV.toLocaleString()}/month.`;
}

// ============================================
// SCHEDULED REPORT GENERATORS
// ============================================

export function generateDailySnapshot(): string {
  const metrics = metricsService.getDashboardMetrics();
  const created = metricsService.getCreatedCreatorsEarning();
  
  return `📊 **Daily Snapshot** (${new Date().toLocaleDateString()})

**Mission Impact:**
• ${created.count} people earning who had zero income before us
• £${created.totalMonthlyIncome.toLocaleString()} created monthly

**Core Numbers:**
• Total creators: ${metrics.totalCreators}
• Currently earning: ${metrics.creatorsNowEarning}
• Local (Brent): ${Math.round(metrics.brentPercentage)}%
• Platform GMV: £${metrics.totalPlatformGMV.toLocaleString()}

**Key Ratios:**
• Zero → Earning: ${Math.round(metrics.conversionZeroToEarning)}%
• Days to first sale: ${metrics.avgDaysToFirstSale}
• Retention: ${metrics.monthlyRetentionRate}%`;
}

export function generateWeeklyReport(): string {
  const report = metricsService.generateReport({
    type: 'executive-summary',
    format: 'detailed'
  });
  
  return `📊 **WEEKLY CREATOR FACTORY REPORT**
_Week ending ${new Date().toLocaleDateString()}_

${formatReport(report)}

---
_Full dashboard: /admin/dashboard_
_Ask me for specific reports: income, geography, competitive, goals_`;
}

export function generateMonthlyReport(): string {
  const metrics = metricsService.getDashboardMetrics();
  const goals = metricsService.getGoalProgress(1);
  const created = metricsService.getCreatedCreatorsEarning();
  
  const achievedGoals = goals.filter(g => g.status === 'achieved').length;
  const onTrackGoals = goals.filter(g => g.status === 'on-track').length;
  const atRiskGoals = goals.filter(g => g.status === 'at-risk').length;
  
  return `📊 **MONTHLY CREATOR FACTORY REPORT**
_${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}_

## Mission: Create Creators Who Would Never Have Tried

### Impact This Month
• **${created.count}** people now earning who had **zero income** before us
• Average monthly income: **£${Math.round(created.avgIncome)}**
• Total value created: **£${created.totalMonthlyIncome.toLocaleString()}/month**

### Platform Health
| Metric | Value | Status |
|--------|-------|--------|
| Total Creators | ${metrics.totalCreators} | ${metrics.totalCreators >= 100 ? '✅' : '📈'} |
| Currently Earning | ${metrics.creatorsNowEarning} | ${metrics.creatorsNowEarning >= 30 ? '✅' : '📈'} |
| Brent Local % | ${Math.round(metrics.brentPercentage)}% | ${metrics.brentPercentage >= 50 ? '✅' : '⚠️'} |
| Platform GMV | £${metrics.totalPlatformGMV.toLocaleString()} | ${metrics.totalPlatformGMV >= 5000 ? '✅' : '📈'} |

### Revenue Distribution
• Creators (55%): £${Math.round(metrics.totalPlatformGMV * 0.55).toLocaleString()}
• Community (25%): £${Math.round(metrics.totalPlatformGMV * 0.25).toLocaleString()}
• Operations (20%): £${Math.round(metrics.totalPlatformGMV * 0.20).toLocaleString()}

### Year 1 Goal Progress
• ✅ Achieved: ${achievedGoals}
• 📈 On Track: ${onTrackGoals}
• ⚠️ At Risk: ${atRiskGoals}

### Competitive Position
We serve the **forgotten 60%** who need training AND marketplace.
Competitors only serve the 1-5% who already have audiences.

Our moat: **Local community + Training + Marketplace = Unreplicable**

---
_For detailed analysis, ask Maya for specific reports._`;
}

// ============================================
// EXPORT
// ============================================

export default {
  handleMetricsQuery,
  getContextualMetrics,
  generateDailySnapshot,
  generateWeeklyReport,
  generateMonthlyReport
};