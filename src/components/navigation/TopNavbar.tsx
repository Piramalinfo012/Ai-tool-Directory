import React from 'react';
import { motion } from 'motion/react';
import { useOmniAI } from '../../context/OmniAIContext';
import {
  Sparkles,
  Wrench,
  Search,
  Shield,
  Star,
  Clock,
  Compass,
  Cpu,
  Workflow,
  PlusCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface TopNavbarProps {
  onOpenAdmin?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenAdmin }) => {
  const {
    activeTab,
    setActiveTab,
    directoryView,
    setDirectoryView,
    activeSection,
    setActiveSection,
    favorites,
    recentlyUsed,
    tools,
    categories,
    adminMode,
    setAdminMode,
  } = useOmniAI();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight text-white">
                OMNI<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI</span>
              </span>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                PLATFORM
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              {activeTab === 'command_center'
                ? 'Autonomous Task Orchestration & Multi-Agent Execution'
                : 'Centralized AI Tools Directory • 5 Core Pillars'}
            </p>
          </div>
        </div>

        {/* NAVIGATION: AI Tools Directory + Eye Icon for Command Center */}
        <div className="flex items-center space-x-2">
          <div className="tab-navigation-container relative flex items-center rounded-xl border border-slate-800/90 bg-slate-900/90 p-1 shadow-inner backdrop-blur-md">
            {/* Primary AI Tools Directory Tab (Default) */}
            <button
              id="tab-tools-directory"
              onClick={() => setActiveTab('tools_directory')}
              className={`relative z-10 flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'tools_directory'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'tools_directory' && (
                <>
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600/90 via-emerald-600 to-teal-700/90 shadow-md shadow-emerald-500/25 ring-1 ring-emerald-400/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                  <motion.div
                    layoutId="active-tab-glow-underline"
                    className="absolute -bottom-1.5 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                </>
              )}
              <span className="relative z-20 flex items-center space-x-2">
                <Wrench className={`h-4 w-4 ${activeTab === 'tools_directory' ? 'text-emerald-200' : 'text-slate-400'}`} />
                <span>AI Tools Directory</span>
                <span className="inline-flex items-center rounded-full bg-slate-950/80 px-2 py-0.5 text-[11px] font-bold text-slate-300 border border-slate-700/60">
                  {categories.length} Sectors
                </span>
              </span>
            </button>

            {/* Eye Icon for OmniAI Command Center */}
            <button
              id="tab-command-center"
              onClick={() => setActiveTab(activeTab === 'command_center' ? 'tools_directory' : 'command_center')}
              className={`relative z-10 flex items-center justify-center rounded-lg p-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                activeTab === 'command_center'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title={activeTab === 'command_center' ? 'Close Command Center' : 'Open OmniAI Command Center'}
              aria-label="Open OmniAI Command Center"
            >
              {activeTab === 'command_center' && (
                <>
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 shadow-md shadow-indigo-600/35 ring-1 ring-indigo-400/50"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                  <motion.div
                    layoutId="active-tab-glow-underline"
                    className="absolute -bottom-1.5 left-1 right-1 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.9)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                </>
              )}
              <span className="relative z-20 flex items-center justify-center">
                <Eye
                  className={`h-4 w-4 transition-transform duration-300 ${
                    activeTab === 'command_center' ? 'text-cyan-200 scale-110' : 'text-slate-400 hover:text-white'
                  }`}
                />
              </span>
              <span className="sr-only">Command Center</span>
            </button>
          </div>
        </div>

        {/* Right Action Tools & Profile / Admin */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {activeTab === 'tools_directory' && (
            <button
              onClick={() => setDirectoryView(directoryView === 'my_tools' ? 'home' : 'my_tools')}
              className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                directoryView === 'my_tools'
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
              title="My AI Tools & Favorites"
            >
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400/40" />
              <span className="hidden md:inline">My AI Tools</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-400">
                {favorites.length}
              </span>
            </button>
          )}

          {/* Admin Tools Management */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-950/40 hover:text-indigo-200 transition"
              title="Manage AI Tools Directory"
            >
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden lg:inline">Admin Registry</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
