import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolCard } from './ToolCard';
import { AITool } from '../../types';
import {
  ArrowLeft,
  Search,
  Filter,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  Zap,
  SlidersHorizontal,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface CategoryPageViewProps {
  onSelectTool: (tool: AITool) => void;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({ onSelectTool }) => {
  const {
    selectedCategorySlug,
    categories,
    tools,
    setDirectoryView,
    setSelectedCategorySlug,
    navigateToCommandCenterWithPrompt,
  } = useOmniAI();

  const [searchSubTerm, setSearchSubTerm] = useState<string>('');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [selectedAccess, setSelectedAccess] = useState<string>('All');

  const activeCategory = categories.find((c) => c.slug === selectedCategorySlug) || categories[0];

  // Filter tools for this category
  const categoryTools = tools.filter((tool) => {
    const matchesCategory =
      tool.category_id === activeCategory.id ||
      tool.category_name?.toLowerCase() === activeCategory.name.toLowerCase();

    const matchesSearch =
      !searchSubTerm ||
      tool.name.toLowerCase().includes(searchSubTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchSubTerm.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchSubTerm.toLowerCase())) ||
      tool.capabilities.some((c) => c.toLowerCase().includes(searchSubTerm.toLowerCase()));

    const matchesPricing = selectedPricing === 'All' || tool.pricing_type === selectedPricing;
    const matchesAccess =
      selectedAccess === 'All' ||
      (selectedAccess === 'in_app' ? tool.access_type !== 'external' : tool.access_type === 'external');

    return matchesCategory && matchesSearch && matchesPricing && matchesAccess;
  });

  return (
    <div className="space-y-8">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setDirectoryView('home');
            setSelectedCategorySlug(null);
          }}
          className="flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Categories</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>AI Tools Directory</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-medium">{activeCategory.name}</span>
        </div>
      </div>

      {/* Category Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>CATEGORY ECOSYSTEM</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {activeCategory.name} AI Tools
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {activeCategory.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="rounded-md bg-slate-950 px-2.5 py-1 border border-slate-800 text-slate-300 font-bold">
              {categoryTools.length} Verified Tools
            </span>
            <span className="text-slate-600">•</span>
            <span>Cluster: <strong className="text-slate-200">{activeCategory.clusterGroup}</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Instant Access & API Enabled</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchSubTerm}
            onChange={(e) => setSearchSubTerm(e.target.value)}
            placeholder={`Filter ${activeCategory.name} tools by name, tag, or capability...`}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 pl-9 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          {/* Pricing Filter */}
          <select
            value={selectedPricing}
            onChange={(e) => setSelectedPricing(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Pricing</option>
            <option value="Free">Free</option>
            <option value="Freemium">Freemium</option>
            <option value="Paid">Paid</option>
            <option value="Open Source">Open Source</option>
          </select>

          {/* Access Filter */}
          <select
            value={selectedAccess}
            onChange={(e) => setSelectedAccess(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">All Access Types</option>
            <option value="in_app">OmniAI In-App / API</option>
            <option value="external">External Only</option>
          </select>
        </div>
      </div>

      {/* 4-COLUMN RESPONSIVE GRID */}
      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onOpenDetails={onSelectTool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <HelpCircle className="mx-auto h-10 w-10 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white">No tools found matching your filters</h3>
          <p className="mt-1 text-xs text-slate-400">Try resetting filters or searching another keyword.</p>
          <button
            onClick={() => {
              setSearchSubTerm('');
              setSelectedPricing('All');
              setSelectedAccess('All');
            }}
            className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* CROSS-LINKING PROMPT: "Want AI to choose and execute the tools for you?" */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Want AI to choose and execute the tools for you?
            </span>
            <h3 className="text-lg font-extrabold text-white mt-1">
              Let the OmniAI Command Center orchestrate these {activeCategory.name} tools automatically.
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Switch to Command Center to give a high-level task directive. The AI Orchestrator will recruit the required models and tools to build your deliverable end-to-end.
            </p>
          </div>

          <button
            onClick={() =>
              navigateToCommandCenterWithPrompt(
                `Execute comprehensive ${activeCategory.name} analysis and task workflow: `
              )
            }
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 whitespace-nowrap active:scale-95 transition"
          >
            <span>Open Command Center</span>
            <Sparkles className="h-4 w-4 text-cyan-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
