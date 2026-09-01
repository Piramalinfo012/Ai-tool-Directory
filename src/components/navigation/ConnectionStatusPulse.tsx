import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOmniAI } from '../../context/OmniAIContext';
import {
  Activity,
  Zap,
  RefreshCw,
  Server,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export const ConnectionStatusPulse: React.FC = () => {
  const { connectionState, isAiBusy, proxyInfo, checkConnection } = useOmniAI();
  const [isOpen, setIsOpen] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleManualPing = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPinging) return;
    setIsPinging(true);
    await checkConnection();
    setTimeout(() => setIsPinging(false), 400);
  };

  // Determine status color configurations
  const getStatusConfig = () => {
    if (connectionState === 'busy') {
      return {
        label: 'Active',
        subLabel: 'Processing AI Task...',
        dotColor: 'bg-cyan-400',
        ringColor: 'bg-cyan-400/40',
        glowShadow: 'shadow-[0_0_10px_rgba(34,211,238,0.9)]',
        badgeBg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
        icon: <Zap className="h-3 w-3 text-cyan-400 animate-pulse" />,
      };
    }

    if (connectionState === 'active') {
      return {
        label: 'Active',
        subLabel: 'Proxy Online & Ready',
        dotColor: 'bg-emerald-400',
        ringColor: 'bg-emerald-400/40',
        glowShadow: 'shadow-[0_0_10px_rgba(52,211,153,0.85)]',
        badgeBg: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300',
        icon: <Activity className="h-3 w-3 text-emerald-400" />,
      };
    }

    if (connectionState === 'idle') {
      return {
        label: 'Idle',
        subLabel: 'Proxy Standby',
        dotColor: 'bg-emerald-500',
        ringColor: 'bg-emerald-500/30',
        glowShadow: 'shadow-[0_0_8px_rgba(16,185,129,0.7)]',
        badgeBg: 'bg-slate-900/60 border-slate-700/60 text-slate-300',
        icon: <Activity className="h-3 w-3 text-emerald-400" />,
      };
    }

    return {
      label: 'Offline',
      subLabel: 'Reconnecting...',
      dotColor: 'bg-rose-500',
      ringColor: 'bg-rose-500/40',
      glowShadow: 'shadow-[0_0_10px_rgba(244,63,94,0.8)]',
      badgeBg: 'bg-rose-950/40 border-rose-500/30 text-rose-300',
      icon: <AlertCircle className="h-3 w-3 text-rose-400" />,
    };
  };

  const statusConfig = getStatusConfig();
  const latency = proxyInfo?.latencyMs !== undefined && proxyInfo.latencyMs >= 0 ? `${proxyInfo.latencyMs}ms` : '--';

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Pill */}
      <button
        type="button"
        id="gemini-connection-status-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center space-x-2 rounded-lg border px-2.5 py-1 text-xs font-medium backdrop-blur-md transition-all duration-200 hover:border-slate-600 hover:bg-slate-900/90 ${statusConfig.badgeBg}`}
        title={`Gemini API / Server Proxy: ${statusConfig.label} (${statusConfig.subLabel})`}
        aria-label="Gemini API & Server Proxy Connection Status"
      >
        {/* Real-time Pulse Dot */}
        <div className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              connectionState === 'busy'
                ? 'animate-ping duration-700 ' + statusConfig.ringColor
                : 'animate-ping duration-1000 ' + statusConfig.ringColor
            }`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${statusConfig.dotColor} ${statusConfig.glowShadow}`}
          />
        </div>

        {/* Status Text for Desktop & Compact on Mobile */}
        <div className="flex items-center space-x-1.5">
          <span className="hidden font-semibold text-slate-200 sm:inline">Gemini Proxy:</span>
          <span className="font-bold tracking-wide">{statusConfig.label}</span>
          <span className="hidden items-center rounded bg-slate-950/80 px-1 py-0.2 font-mono text-[10px] text-slate-400 sm:inline-flex border border-slate-800/80">
            {latency}
          </span>
        </div>

        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-200' : 'group-hover:text-slate-200'
          }`}
        />
      </button>

      {/* Diagnostics Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-72 sm:w-80 rounded-xl border border-slate-800 bg-slate-950/95 p-3.5 shadow-2xl shadow-black/80 backdrop-blur-xl ring-1 ring-white/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Gemini API & Server Proxy</h4>
                  <p className="text-[10px] text-slate-400">Live Express Proxy Architecture</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleManualPing}
                disabled={isPinging}
                className="flex items-center space-x-1 rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[10px] font-medium text-slate-300 hover:border-slate-700 hover:text-white transition disabled:opacity-50"
                title="Ping Gemini proxy now"
              >
                <RefreshCw className={`h-3 w-3 text-indigo-400 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Pinging...' : 'Ping'}</span>
              </button>
            </div>

            {/* Diagnostic Grid */}
            <div className="mt-3 space-y-2 text-xs">
              {/* Connection Status Row */}
              <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-2.5 py-1.5 border border-slate-800/60">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Activity className="h-3.5 w-3.5 text-slate-400" />
                  <span>Connection State</span>
                </span>
                <span className="flex items-center space-x-1.5 font-semibold">
                  <span className={`h-2 w-2 rounded-full ${statusConfig.dotColor} ${statusConfig.glowShadow}`} />
                  <span className={statusConfig.label === 'Active' ? 'text-emerald-300' : 'text-slate-300'}>
                    {statusConfig.label} ({connectionState === 'busy' ? 'Executing' : 'Idle'})
                  </span>
                </span>
              </div>

              {/* Gemini Models Engine */}
              <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-2.5 py-1.5 border border-slate-800/60">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Cpu className="h-3.5 w-3.5 text-slate-400" />
                  <span>Model Engine</span>
                </span>
                <span className="font-mono text-[11px] font-bold text-indigo-300">
                  {proxyInfo?.modelEngine || 'Gemini 2.5/3.7 Multi-Model'}
                </span>
              </div>

              {/* Proxy Gateway */}
              <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-2.5 py-1.5 border border-slate-800/60">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                  <span>Backend Gateway</span>
                </span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>Server-Side Secure</span>
                </span>
              </div>

              {/* Round-trip Latency */}
              <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-2.5 py-1.5 border border-slate-800/60">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Round-Trip Latency</span>
                </span>
                <span className="font-mono font-bold text-slate-200">{latency}</span>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-3 border-t border-slate-800/80 pt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>Security: Keys isolated server-side</span>
              <span className="text-emerald-400 font-mono">Port 3000 • Live</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
