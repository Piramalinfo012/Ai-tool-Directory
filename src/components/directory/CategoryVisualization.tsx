import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { AITool, ToolCategory } from '../../types';
import {
  Sparkles,
  Briefcase,
  Megaphone,
  DollarSign,
  GraduationCap,
  Compass,
  ChevronRight,
  ExternalLink,
  Zap,
  Star,
  CheckCircle,
} from 'lucide-react';

export const CategoryVisualization: React.FC = () => {
  const { categories, tools, navigateToCategory, openToolRunner, openOfficialTool } = useOmniAI();
  const [activeCategoryId, setActiveCategoryId] = useState<string>('business-productivity');
  const [hoveredTool, setHoveredTool] = useState<AITool | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const categoryTools = tools.filter((t) => t.category_id === activeCategoryId);

  const sectorColors: Record<string, { bg: string; border: string; text: string; badge: string; ring: string }> = {
    'business-productivity': {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/40',
      text: 'text-orange-400',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      ring: 'ring-orange-500/50',
    },
    'branding-marketing': {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      ring: 'ring-amber-500/50',
    },
    'investment-finance': {
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/40',
      text: 'text-teal-400',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      ring: 'ring-teal-500/50',
    },
    'learning-career': {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      ring: 'ring-emerald-500/50',
    },
    'fitness-travel-gov': {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/40',
      text: 'text-indigo-400',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      ring: 'ring-indigo-500/50',
    },
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'business-productivity':
        return <Briefcase className="h-4 w-4" />;
      case 'branding-marketing':
        return <Megaphone className="h-4 w-4" />;
      case 'investment-finance':
        return <DollarSign className="h-4 w-4" />;
      case 'learning-career':
        return <GraduationCap className="h-4 w-4" />;
      case 'fitness-travel-gov':
        return <Compass className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header matching pad wheel motif */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-xs font-bold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>POWERFUL TOOLS AT YOUR FINGERTIPS • 5 PILLARS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
              Interactive AI Wheel & Ecosystem
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Select a domain sector below to inspect & run curated tools
          </div>
        </div>

        {/* 5 Core Wheel Sectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const isSelected = activeCategoryId === cat.id;
            const theme = sectorColors[cat.id] || sectorColors['business-productivity'];
            const toolList = tools.filter((t) => t.category_id === cat.id);

            return (
              <button
                key={cat.id}
                id={`wheel-sector-${cat.slug}`}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? `${theme.bg} ${theme.border} ring-2 ${theme.ring} shadow-xl scale-[1.02]`
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl border shadow-inner ${
                        isSelected
                          ? `${theme.badge}`
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300">
                      {toolList.length} Tools
                    </span>
                  </div>

                  <h3
                    className={`mt-3 text-sm font-bold leading-snug ${
                      isSelected ? 'text-white' : 'text-slate-200'
                    }`}
                  >
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                  <span className={isSelected ? theme.text : 'text-slate-500 font-medium'}>
                    {isSelected ? 'Active Sector' : 'Explore'}
                  </span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition-transform ${
                      isSelected ? `${theme.text} translate-x-0.5` : 'text-slate-600'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Sector Tools Showcase */}
        {activeCategory && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 rounded-md border px-2.5 py-1 text-xs font-bold ${
                      sectorColors[activeCategory.id]?.badge
                    }`}
                  >
                    {getCategoryIcon(activeCategory.id)}
                    <span>{activeCategory.name}</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    ({categoryTools.length} Curated Tools on the Pad)
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  {activeCategory.description}
                </p>
              </div>

              <button
                onClick={() => navigateToCategory(activeCategory.slug)}
                className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:border-indigo-500 hover:text-white transition shadow-sm whitespace-nowrap self-start sm:self-auto"
              >
                <span>View Full Page</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Grid of Tools in Active Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {categoryTools.map((tool, idx) => {
                const theme = sectorColors[activeCategory.id] || sectorColors['business-productivity'];
                return (
                  <div
                    key={tool.id}
                    id={`wheel-tool-card-${tool.slug}`}
                    onMouseEnter={() => setHoveredTool(tool)}
                    className="group relative flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-900/60 p-3.5 hover:border-slate-700 hover:bg-slate-900 hover:shadow-lg transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold text-slate-400">
                          {idx + 1}
                        </span>
                        <span className="rounded bg-slate-950 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-800">
                          {tool.pricing_type}
                        </span>
                      </div>

                      <h4 className="mt-2 text-xs font-bold text-white group-hover:text-cyan-300 transition truncate">
                        {tool.name}
                      </h4>

                      <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                      <button
                        onClick={() => openToolRunner(tool)}
                        className="flex-1 flex items-center justify-center space-x-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 py-1 px-2 text-[10px] font-bold text-indigo-300 hover:text-white transition"
                      >
                        <Zap className="h-3 w-3" />
                        <span>Run in OmniAI</span>
                      </button>

                      {tool.official_url && (
                        <button
                          onClick={() => openOfficialTool(tool)}
                          className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white transition"
                          title="Open official site"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
