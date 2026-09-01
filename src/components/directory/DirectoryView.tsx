import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { AITool, ToolCategory } from '../../types';
import { CategoryVisualization } from './CategoryVisualization';
import { ToolCard } from './ToolCard';
import { CategoryPageView } from './CategoryPageView';
import { ToolDetailModal } from './ToolDetailModal';
import { InAppToolRunnerModal } from './InAppToolRunnerModal';
import { MyAIToolsView } from './MyAIToolsView';
import { AdminDirectoryModal } from './AdminDirectoryModal';
import {
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Star,
  Clock,
  TrendingUp,
  Award,
  PlusCircle,
  FolderTree,
  ChevronRight,
  Shield,
  HelpCircle,
  Wrench,
  Globe,
  SlidersHorizontal,
  DollarSign,
  Briefcase,
  Presentation,
  Video,
  Image as ImageIcon,
  Code2,
  Table,
  Megaphone,
} from 'lucide-react';

const SEARCH_SUGGESTIONS = [
  'Search "finance"',
  'Search "video generator"',
  'Search "presentation"',
  'Search "coding"',
  'Search "marketing"',
  'Search "HR"',
  'Search "research"',
];

export const DirectoryView: React.FC = () => {
  const {
    directoryView,
    setDirectoryView,
    selectedCategorySlug,
    navigateToCategory,
    navigateToTool,
    navigateToCommandCenterWithPrompt,
    tools,
    categories,
    searchTerm,
    setSearchTerm,
    favorites,
    recentlyUsed,
  } = useOmniAI();

  const [selectedToolForModal, setSelectedToolForModal] = useState<AITool | null>(null);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('All');

  // Filter tools based on global directory search
  const filteredTools = tools.filter((tool) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      tool.name.toLowerCase().includes(term) ||
      tool.description.toLowerCase().includes(term) ||
      tool.category_name?.toLowerCase().includes(term) ||
      tool.tags.some((t) => t.toLowerCase().includes(term)) ||
      tool.capabilities.some((c) => c.toLowerCase().includes(term))
    );
  });

  // Featured sections
  const trendingTools = tools.filter((t) => t.featured).slice(0, 4);
  const editorsChoiceTools = tools.filter((t) => ['gamma-app', 'ramp-ai', 'cursor-ide', 'midjourney'].includes(t.id));
  const newTools = tools.slice(-4);

  // Filtered categories for browsing grid
  const filteredCategories = categories.filter((c) => {
    if (selectedClusterFilter === 'All') return true;
    return c.clusterGroup === selectedClusterFilter;
  });

  // If in category view
  if (directoryView === 'category' && selectedCategorySlug) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <CategoryPageView onSelectTool={(tool) => setSelectedToolForModal(tool)} />
        <ToolDetailModal
          tool={selectedToolForModal}
          onClose={() => setSelectedToolForModal(null)}
        />
        <InAppToolRunnerModal />
      </div>
    );
  }

  // If in My AI Tools view
  if (directoryView === 'my_tools') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <MyAIToolsView />
        <ToolDetailModal
          tool={selectedToolForModal}
          onClose={() => setSelectedToolForModal(null)}
        />
        <InAppToolRunnerModal />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* 1. DIRECTORY HEADER & LARGE SEARCH BAR */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-6 sm:p-10 shadow-2xl text-center">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <Wrench className="h-3.5 w-3.5 text-emerald-400" />
            <span>AI TOOLS DIRECTORY • FIND THE TOOL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AI Tools Directory
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Discover the best AI tools for every task, all in one place. Explore 46 specialized categories with verified links and direct execution.
          </p>

          {/* Large Search Bar */}
          <div className="mt-6">
            <div className="relative flex items-center rounded-2xl border-2 border-slate-800 bg-slate-900/90 p-2 shadow-2xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 transition">
              <Search className="h-5 w-5 text-slate-400 ml-3 flex-shrink-0" />
              <input
                id="search-tools-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search AI tools by name, function, domain, or capability..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-400 hover:text-white mr-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Search Chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium mr-1">Popular searches:</span>
              {SEARCH_SUGGESTIONS.map((sug, i) => {
                const term = sug.replace('Search "', '').replace('"', '');
                return (
                  <button
                    key={i}
                    onClick={() => setSearchTerm(term)}
                    className="rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-slate-400 hover:border-emerald-500/50 hover:bg-slate-850 hover:text-white transition"
                  >
                    {sug}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Hub Navigation (My AI Tools & Admin) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setDirectoryView('my_tools')}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-200 hover:border-indigo-500 hover:text-white shadow-sm transition"
            >
              <Star className="h-3.5 w-3.5 text-amber-400" />
              <span>My AI Tools Hub ({favorites.length + recentlyUsed.length})</span>
            </button>

            <button
              onClick={() => setShowAdminModal(true)}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-bold text-slate-400 hover:border-slate-700 hover:text-white shadow-sm transition"
            >
              <Shield className="h-3.5 w-3.5 text-indigo-400" />
              <span>Admin Registry</span>
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS VIEW (if search is active) */}
      {searchTerm.trim() && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">
                Search Results for "{searchTerm}" ({filteredTools.length} tools found)
              </h2>
            </div>
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-indigo-400 hover:underline"
            >
              Reset Search
            </button>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onOpenDetails={(t) => setSelectedToolForModal(t)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-white">No tools matched your search</h3>
              <p className="mt-1 text-xs text-slate-400">
                Try searching for broader keywords like "finance", "video", "code", or "writing".
              </p>
            </div>
          )}
        </div>
      )}

      {/* 2. CATEGORY VISUALIZATION (Tree / Radial Architecture) */}
      {!searchTerm.trim() && <CategoryVisualization />}

      {/* 3. FEATURED AI TOOLS SECTIONS */}
      {!searchTerm.trim() && (
        <div className="space-y-10">
          {/* Trending AI Tools */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">Trending AI Tools</h2>
              </div>
              <span className="text-xs text-slate-400">Most engaged this week</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trendingTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onOpenDetails={(t) => setSelectedToolForModal(t)}
                />
              ))}
            </div>
          </div>

          {/* Editor's Choice */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Editor's Choice</h2>
              </div>
              <span className="text-xs text-slate-400">Hand-curated enterprise grade tools</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {editorsChoiceTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onOpenDetails={(t) => setSelectedToolForModal(t)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. ALL 46 CATEGORIES EXPLORER GRID */}
      {!searchTerm.trim() && (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white">All 46 AI Categories</h2>
              <p className="text-xs text-slate-400">
                Browse our complete taxonomy spanning business, engineering, design, and operations.
              </p>
            </div>

            {/* Cluster Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Business', 'Creative', 'Productivity', 'Engineering', 'Operations'].map(
                (grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedClusterFilter(grp)}
                    className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                      selectedClusterFilter === grp
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {grp}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategories.map((cat) => {
              const getCatIcon = () => {
                const s = cat.slug.toLowerCase();
                if (s.includes('finance') || s.includes('accounting')) return <DollarSign className="h-4 w-4 text-emerald-400" />;
                if (s.includes('presentation') || s.includes('slide')) return <Presentation className="h-4 w-4 text-cyan-400" />;
                if (s.includes('video')) return <Video className="h-4 w-4 text-rose-400" />;
                if (s.includes('image') || s.includes('design')) return <ImageIcon className="h-4 w-4 text-pink-400" />;
                if (s.includes('excel') || s.includes('spreadsheet')) return <Table className="h-4 w-4 text-emerald-400" />;
                if (s.includes('code') || s.includes('dev')) return <Code2 className="h-4 w-4 text-purple-400" />;
                if (s.includes('marketing') || s.includes('ad')) return <Megaphone className="h-4 w-4 text-amber-400" />;
                if (s.includes('business')) return <Briefcase className="h-4 w-4 text-blue-400" />;
                return <Sparkles className="h-4 w-4 text-indigo-400" />;
              };

              return (
                <div
                  key={cat.id}
                  id={`cat-card-${cat.slug}`}
                  onClick={() => navigateToCategory(cat.slug)}
                  className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-emerald-500/50 hover:bg-slate-900 transition shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 border border-slate-800 shadow-inner group-hover:border-emerald-500/40 transition">
                          {getCatIcon()}
                        </div>
                        <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-slate-400 group-hover:text-emerald-400 transition">
                          {cat.clusterGroup}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-400">
                        {cat.tool_count} tools
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-white group-hover:text-emerald-300 transition">
                      {cat.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400 transition">
                    <span className="font-semibold">Explore Tools</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. CROSS-LINKING PROMPT: "Want AI to choose and execute the tools for you?" */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-xs font-bold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>DO IT FOR ME • AUTONOMOUS AGENTS</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Want AI to choose and execute the tools for you?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              You don't need to manually find each tool. Switch to the <strong>OmniAI Command Center</strong>, describe your goal in natural language, and autonomous agents will collaborate, invoke tools, and deliver finished work automatically.
            </p>
          </div>

          <button
            id="btn-switch-command-center"
            onClick={() =>
              navigateToCommandCenterWithPrompt(
                'Create a professional sales presentation for an AI enterprise workflow platform.'
              )
            }
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition whitespace-nowrap"
          >
            <span>Open Command Center</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <ToolDetailModal
        tool={selectedToolForModal}
        onClose={() => setSelectedToolForModal(null)}
      />
      <InAppToolRunnerModal />
      {showAdminModal && <AdminDirectoryModal onClose={() => setShowAdminModal(false)} />}
    </div>
  );
};
