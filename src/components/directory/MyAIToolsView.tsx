import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolCard } from './ToolCard';
import { ToolIcon } from '../common/ToolIcon';
import {
  Star,
  Clock,
  Zap,
  TrendingUp,
  ArrowLeft,
  Search,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export const MyAIToolsView: React.FC = () => {
  const {
    tools,
    favorites,
    recentlyUsed,
    setDirectoryView,
    openToolRunner,
    openOfficialTool,
    navigateToTool,
  } = useOmniAI();

  const [activeTab, setActiveTab] = useState<'recents' | 'favorites' | 'most_used'>('recents');

  // Resolved lists
  const favoriteTools = tools.filter((t) => favorites.includes(t.id));

  const recentToolEntries = recentlyUsed
    .map((item) => {
      const tool = tools.find((t) => t.id === item.tool_id);
      return tool ? { ...item, tool } : null;
    })
    .filter(Boolean) as Array<typeof recentlyUsed[0] & { tool: typeof tools[0] }>;

  const mostUsedEntries = [...recentToolEntries].sort((a, b) => b.usage_count - a.usage_count);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setDirectoryView('home')}
          className="flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Personal Hub</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-950 p-6 sm:p-8 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My AI Tools Hub</h1>
        <p className="mt-2 text-sm text-slate-300">
          Quickly access your pinned favorites, recently launched AI applications, and usage statistics.
        </p>

        {/* Tab Buttons */}
        <div className="mt-6 flex items-center space-x-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('recents')}
            className={`flex items-center space-x-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'recents'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>Recently Used ({recentToolEntries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center space-x-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'favorites'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            <span>Favorites ({favoriteTools.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('most_used')}
            className={`flex items-center space-x-1.5 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'most_used'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Most Used</span>
          </button>
        </div>
      </div>

      {/* Recents View */}
      {activeTab === 'recents' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentToolEntries.map(({ tool, last_used_at, usage_count, last_action }) => (
              <div
                key={tool.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 hover:border-indigo-500/50 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      {tool.category_name}
                    </span>
                    <span className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                      {usage_count} launches
                    </span>
                  </div>

                  <div className="mt-3 flex items-center space-x-3">
                    <ToolIcon tool={tool} size="sm" />
                    <h3 className="text-base font-bold text-white truncate">{tool.name}</h3>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{tool.description}</p>

                  <div className="mt-3 text-[11px] text-slate-500">
                    Last action: <strong className="text-slate-300">{last_action || 'Opened'}</strong> (
                    {new Date(last_used_at).toLocaleDateString()})
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-2">
                  <button
                    onClick={() => openOfficialTool(tool)}
                    className="flex-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition text-center"
                  >
                    Open Official Tool
                  </button>
                  <button
                    onClick={() => openToolRunner(tool)}
                    className="rounded-lg border border-indigo-500/40 bg-indigo-950/50 px-2.5 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-900 transition"
                    title="Use in OmniAI"
                  >
                    <Zap className="h-3.5 w-3.5 text-cyan-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites View */}
      {activeTab === 'favorites' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* Most Used View */}
      {activeTab === 'most_used' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mostUsedEntries.map(({ tool }) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};
