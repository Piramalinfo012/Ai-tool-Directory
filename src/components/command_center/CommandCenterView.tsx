import React from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { CommandCenterSection } from '../../types';
import { OrchestratorView } from './OrchestratorView';
import { AssistantChatView } from './AssistantChatView';
import { AutoModeView } from './AutoModeView';
import { AgentsStudioView } from './AgentsStudioView';
import { WorkflowsView } from './WorkflowsView';
import { FileAIView } from './FileAIView';
import { ConnectionsView } from './ConnectionsView';
import { AnalyticsView } from './AnalyticsView';
import {
  Sparkles,
  Bot,
  Zap,
  Cpu,
  Workflow,
  FileText,
  MessageSquare,
  Star,
  BarChart3,
  Link2,
  Settings,
  ArrowRight,
  Wrench,
} from 'lucide-react';

export const CommandCenterView: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    setActiveTab,
    favorites,
    tools,
    navigateToTool,
  } = useOmniAI();

  const navItems: { id: CommandCenterSection; label: string; icon: any; badge?: string }[] = [
    { id: 'orchestrator', label: 'AI Orchestrator', icon: Sparkles, badge: 'DO FOR ME' },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'auto_mode', label: 'AI Auto Mode', icon: Zap, badge: 'Loop' },
    { id: 'agents', label: 'AI Agents Fleet', icon: Cpu },
    { id: 'workflows', label: 'AI Workflows', icon: Workflow },
    { id: 'files', label: 'File AI Studio', icon: FileText },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'favorites', label: 'Favorites', icon: Star, badge: `${favorites.length}` },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'connections', label: 'Connections', icon: Link2, badge: 'MCP' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'orchestrator':
        return <OrchestratorView />;
      case 'assistant':
      case 'conversations':
        return <AssistantChatView />;
      case 'auto_mode':
        return <AutoModeView />;
      case 'agents':
        return <AgentsStudioView />;
      case 'workflows':
        return <WorkflowsView />;
      case 'files':
        return <FileAIView />;
      case 'connections':
        return <ConnectionsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'favorites':
        const favoriteTools = tools.filter((t) => favorites.includes(t.id));
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Starred Favorites & Pinned Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => navigateToTool(tool)}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-indigo-500 transition"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{tool.name}</h3>
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{tool.category_name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
            <h2 className="text-2xl font-bold text-white">Platform Settings & Orchestration Profile</h2>
            <div className="space-y-4 max-w-xl text-sm text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Default Foundation Model</span>
                <span className="font-semibold text-cyan-400">Gemini 3.7 Flash</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Connected AI Tools Network</span>
                <span className="font-semibold text-emerald-400">60+ Tools Across 46 Categories Active</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span>Auto-Launch In-App Workbench</span>
                <span className="font-semibold text-white">Enabled</span>
              </div>
            </div>
          </div>
        );
      default:
        return <OrchestratorView />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Sub-Header bar for Command Center */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">OMNIAI COMMAND CENTER</h2>
            <span className="text-[11px] text-slate-400">The "Do the work for me" autonomous workspace</span>
          </div>
        </div>

        {/* Cross-Link to Directory */}
        <button
          onClick={() => setActiveTab('tools_directory')}
          className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition"
        >
          <span>Need another AI tool?</span>
          <span className="text-emerald-400 font-bold flex items-center">
            Explore Directory <ArrowRight className="h-3 w-3 ml-1" />
          </span>
        </button>
      </div>

      {/* Main Command Center Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sub-Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-1">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-2 shadow-lg backdrop-blur-sm">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Command Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                        isActive
                          ? 'bg-indigo-900/80 text-cyan-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Stats Widget */}
          <div className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span>Connected Models</span>
              <span className="font-bold text-emerald-400">Gemini 2.5 • Claude • GPT</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Execution Mode</span>
              <span className="font-bold text-indigo-300">Server-Side Proxy</span>
            </div>
          </div>
        </div>

        {/* Main Content Pane */}
        <div className="lg:col-span-9">{renderContent()}</div>
      </div>
    </div>
  );
};
