import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  DollarSign,
  Cpu,
  Zap,
  CheckCircle2,
  Users,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const metrics = [
    { label: 'Autonomous Tasks Completed', value: '1,284', change: '+24% this month', icon: CheckCircle2, color: 'text-emerald-400' },
    { label: 'Estimated Engineering Hours Saved', value: '492 hrs', change: 'ROI: 8.4x', icon: Clock, color: 'text-indigo-400' },
    { label: 'Active Agent Invocations', value: '14,820', change: '99.4% success rate', icon: Cpu, color: 'text-cyan-400' },
    { label: 'Estimated API Cost Saved', value: '$8,450', change: 'Smart caching active', icon: DollarSign, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">OmniAI Platform Telemetry & Analytics</h2>
        <p className="text-sm text-slate-400">
          Real-time performance metrics, agent coordination efficiency, and compute analytics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{m.label}</span>
                <Icon className={`h-5 w-5 ${m.color}`} />
              </div>
              <div className="mt-3 text-2xl font-extrabold text-white">{m.value}</div>
              <div className="mt-1 text-xs text-slate-400 font-medium">{m.change}</div>
            </div>
          );
        })}
      </div>

      {/* Agent Performance Breakdown */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          Agent Execution Speed & Accuracy Breakdown
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Research Agent', speed: '1.2s avg', accuracy: '99.4%', load: '88%' },
            { name: 'Writing Agent', speed: '1.8s avg', accuracy: '98.9%', load: '92%' },
            { name: 'Presentation Agent', speed: '1.5s avg', accuracy: '99.1%', load: '76%' },
            { name: 'Financial Analyst Agent', speed: '1.4s avg', accuracy: '99.7%', load: '81%' },
            { name: 'Code Synthesizer Agent', speed: '2.1s avg', accuracy: '99.5%', load: '95%' },
          ].map((ag, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div>
                <span className="text-sm font-bold text-white">{ag.name}</span>
                <span className="text-xs text-slate-400 ml-2">Accuracy: {ag.accuracy}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-indigo-400 font-mono">{ag.speed}</span>
                <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: ag.load }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
