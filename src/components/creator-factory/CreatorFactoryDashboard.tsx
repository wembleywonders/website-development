import { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, MapPin, Target, Rocket, 
  Award, DollarSign, Calendar, RefreshCw 
} from 'lucide-react';
import { creatorMetricsApi } from '../../services/creatorMetricsApi';
import type { CreatorFactoryMetrics } from '../../types/creatorMetrics';
import { STAGE_COLORS } from '../../types/creatorMetrics';

export function CreatorFactoryDashboard() {
  const [metrics, setMetrics] = useState<CreatorFactoryMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await creatorMetricsApi.getDashboard();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError('Failed to load metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-purple-500" />
        <span className="ml-2 text-lg">Loading Creator Factory metrics...</span>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error || 'No data available'}</p>
        <button 
          onClick={fetchMetrics}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const { mission, stages, income, geographic, journey, goals } = metrics;

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Creator Factory Dashboard</h1>
          <p className="text-purple-600 font-medium mt-1">
            "Creating Creators Who Would Never Have Tried"
          </p>
        </div>
        <button 
          onClick={fetchMetrics}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Mission Impact - Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <MetricCard 
            icon={<Users />} 
            label="Total Creators" 
            value={mission.totalCreators} 
            light 
          />
          <MetricCard 
            icon={<Rocket />} 
            label="Started from Zero" 
            value={mission.creatorsFromZero}
            light 
          />
          <MetricCard 
            icon={<Award />} 
            label="Created Creators" 
            value={mission.createdCreators}
            subtitle={`${mission.createdCreatorPercent}% conversion`}
            highlight
            light 
          />
          <MetricCard 
            icon={<TrendingUp />} 
            label="Now Earning" 
            value={mission.creatorsEarning}
            light 
          />
          <MetricCard 
            icon={<MapPin />} 
            label="Local (Brent)" 
            value={`${geographic.brentPercent}%`}
            light 
          />
        </div>
      </div>

      {/* Stage Pipeline */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          Creator Journey Pipeline
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(stages.distribution)
            .filter(([stage]) => !['CHURNED', 'PAUSED'].includes(stage))
            .map(([stage, count]) => (
              <div 
                key={stage}
                className="flex-1 min-w-24 text-center p-4 rounded-lg"
                style={{ backgroundColor: `${STAGE_COLORS[stage]}20` }}
              >
                <div 
                  className="text-2xl font-bold"
                  style={{ color: STAGE_COLORS[stage] }}
                >
                  {count}
                </div>
                <div className="text-xs font-medium text-slate-600 uppercase">
                  {stage}
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4 flex gap-4 text-sm text-slate-500">
          <span>Churned: {stages.churned}</span>
          <span>Paused: {stages.paused}</span>
        </div>
      </div>

      {/* Revenue & Goals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Split */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Revenue Model (55/25/20)
          </h2>
          <div className="space-y-4">
            <div className="text-3xl font-bold text-slate-800">
              £{income.lifetimeEarnings.toLocaleString()}
              <span className="text-sm font-normal text-slate-500 ml-2">lifetime</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <RevenueBar label="Creators" percent={55} color="bg-green-500" />
              <RevenueBar label="Community" percent={25} color="bg-blue-500" />
              <RevenueBar label="Operations" percent={20} color="bg-purple-500" />
            </div>
          </div>
        </div>

        {/* Year Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Growth Goals
          </h2>
          <div className="space-y-4">
            <GoalRow goal={goals.year1} label="Year 1" />
            <GoalRow goal={goals.year3} label="Year 3" />
            <GoalRow goal={goals.year5} label="Year 5" />
          </div>
        </div>
      </div>

      {/* Journey Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Journey Insights</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <InsightCard 
            label="Avg Days to First Sale" 
            value={Math.round(journey.avgDaysToFirstSale)} 
            unit="days"
          />
          <InsightCard 
            label="Fastest to Sale" 
            value={journey.fastestToFirstSale} 
            unit="days"
          />
          <InsightCard 
            label="Active Mentors" 
            value={journey.mentorCount} 
          />
          <InsightCard 
            label="Top Source" 
            value={Object.entries(journey.earnersBySource)
              .sort((a, b) => b[1] - a[1])[0]?.[0]?.replace('_', ' ') || 'N/A'} 
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-slate-500">
        Last updated: {new Date(metrics.generatedAt).toLocaleString()}
      </div>
    </div>
  );
}

// Sub-components
function MetricCard({ icon, label, value, subtitle, highlight, light }: any) {
  return (
    <div className={`text-center ${highlight ? 'bg-white/20 rounded-xl p-4' : ''}`}>
      <div className={`inline-flex p-2 rounded-full mb-2 ${light ? 'bg-white/20' : 'bg-slate-100'}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className={`text-sm ${light ? 'text-white/80' : 'text-slate-500'}`}>{label}</div>
      {subtitle && <div className="text-xs mt-1 text-yellow-300">{subtitle}</div>}
    </div>
  );
}

function RevenueBar({ label, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{percent}%</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function GoalRow({ goal, label }: any) {
  const statusColors = {
    ON_TRACK: 'text-green-600 bg-green-50',
    AHEAD: 'text-blue-600 bg-blue-50',
    BEHIND: 'text-amber-600 bg-amber-50'
  };
  
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">
          {goal.currentEarning}/{goal.targetEarning} earning
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[goal.status]}`}>
          {goal.earningProgress.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

function InsightCard({ label, value, unit }: any) {
  return (
    <div className="text-center p-4 bg-slate-50 rounded-lg">
      <div className="text-2xl font-bold text-slate-800">
        {value} {unit && <span className="text-sm font-normal text-slate-500">{unit}</span>}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default CreatorFactoryDashboard;
