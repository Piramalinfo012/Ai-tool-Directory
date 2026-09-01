import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import {
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AutoModeView: React.FC = () => {
  const { navigateToCommandCenterWithPrompt } = useOmniAI();
  const [goal, setGoal] = useState<string>('Autonomously monitor competitor pricing changes and synthesize weekly intelligence brief.');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [autonomyLevel, setAutonomyLevel] = useState<'semi' | 'full'>('full');
  const [logs, setLogs] = useState<Array<{ time: string; text: string; status: 'ok' | 'info' | 'warn' }>>([
    { time: '10:00:02', text: 'Auto Mode daemon initialized with safety bounds.', status: 'info' },
    { time: '10:00:05', text: 'Perception loop scanning connected MCP endpoints.', status: 'ok' },
    { time: '10:00:12', text: 'Scheduled automated execution trigger at 00:00 UTC.', status: 'ok' },
  ]);

  const handleStartAutoMode = () => {
    setIsRunning(true);
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { time: now, text: `Starting autonomous execution for goal: "${goal}"`, status: 'info' },
      { time: now, text: 'Recruiting autonomous Research & Analysis sub-agents...', status: 'ok' },
      ...prev,
    ]);
  };

  const handleStop = () => {
    setIsRunning(false);
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { time: now, text: 'Auto Mode paused by operator.', status: 'warn' },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 to-slate-900 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-2">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>AUTONOMOUS AGENT LOOP</span>
            </div>
            <h2 className="text-2xl font-bold text-white">AI Auto Mode</h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Give high-level autonomous directives. Auto Mode continuously plans, verifies sub-goals, handles errors, and executes tasks in the background without requiring continuous manual prompting.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {isRunning ? (
              <button
                onClick={handleStop}
                className="flex items-center space-x-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-rose-500 transition"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Pause Auto Mode</span>
              </button>
            ) : (
              <button
                onClick={handleStartAutoMode}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:brightness-110 transition"
              >
                <Play className="h-4 w-4" />
                <span>Launch Autonomous Loop</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goal Directive */}
        <div className="lg:col-span-2 space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Autonomous Objective</h3>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Specify long-running autonomous directive..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <span className="text-xs font-semibold text-slate-400">Autonomy Tier</span>
              <div className="mt-2 flex items-center space-x-2">
                <button
                  onClick={() => setAutonomyLevel('semi')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-semibold ${
                    autonomyLevel === 'semi' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Semi-Autonomous
                </button>
                <button
                  onClick={() => setAutonomyLevel('full')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-semibold ${
                    autonomyLevel === 'full' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Full Autonomy
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <span className="text-xs font-semibold text-slate-400">Safety Guardrails</span>
              <div className="mt-1 flex items-center justify-between text-xs text-emerald-400">
                <span className="flex items-center space-x-1">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Cost Ceiling Active ($25/day)</span>
                </span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-bold">Safe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/80 p-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Engine Telemetry</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Status</span>
              <span className={`font-bold ${isRunning ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isRunning ? '● RUNNING' : '○ STANDBY'}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Connected Agents</span>
              <span className="font-bold text-white">4 Active</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="text-slate-400">Decision Iterations</span>
              <span className="font-bold text-indigo-300">142 cycles</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Average Latency</span>
              <span className="font-bold text-cyan-300">840ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Log Stream */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">Autonomous Agent Decision Log</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Stream: Live</span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-60 overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start space-x-3">
              <span className="text-slate-500">{log.time}</span>
              <span
                className={
                  log.status === 'ok'
                    ? 'text-emerald-400'
                    : log.status === 'warn'
                    ? 'text-amber-400'
                    : 'text-cyan-300'
                }
              >
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
