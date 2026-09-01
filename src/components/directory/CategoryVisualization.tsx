import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { AITool, ToolCategory } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
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
  CheckCircle2,
  Layers,
} from 'lucide-react';

export const CategoryVisualization: React.FC = () => {
  const { categories, tools, navigateToCategory, openToolRunner, openOfficialTool } = useOmniAI();
  const [activeCategoryId, setActiveCategoryId] = useState<string>('business-productivity');
  const [hoveredTool, setHoveredTool] = useState<AITool | null>(null);

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const categoryTools = tools.filter((t) => t.category_id === activeCategoryId);

  const sectorThemes: Record<
    string,
    {
      gradient: string;
      activeBorder: string;
      glowColor: string;
      activeGlow: string;
      text: string;
      iconBg: string;
      iconColor: string;
      badge: string;
      accentHex: string;
    }
  > = {
    'business-productivity': {
      gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
      activeBorder: 'border-orange-500/70',
      glowColor: 'rgba(249, 115, 22, 0.25)',
      activeGlow: 'shadow-[0_0_25px_rgba(249,115,22,0.35)]',
      text: 'text-orange-400',
      iconBg: 'bg-orange-500/20 border-orange-500/40 text-orange-300',
      iconColor: 'text-orange-400',
      badge: 'bg-orange-950/80 border-orange-500/40 text-orange-300',
      accentHex: '#f97316',
    },
    'branding-marketing': {
      gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent',
      activeBorder: 'border-yellow-500/70',
      glowColor: 'rgba(234, 179, 8, 0.25)',
      activeGlow: 'shadow-[0_0_25px_rgba(234,179,8,0.35)]',
      text: 'text-yellow-400',
      iconBg: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
      iconColor: 'text-yellow-400',
      badge: 'bg-yellow-950/80 border-yellow-500/40 text-yellow-300',
      accentHex: '#eab308',
    },
    'investment-finance': {
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      activeBorder: 'border-teal-500/70',
      glowColor: 'rgba(20, 184, 166, 0.25)',
      activeGlow: 'shadow-[0_0_25px_rgba(20,184,166,0.35)]',
      text: 'text-teal-400',
      iconBg: 'bg-teal-500/20 border-teal-500/40 text-teal-300',
      iconColor: 'text-teal-400',
      badge: 'bg-teal-950/80 border-teal-500/40 text-teal-300',
      accentHex: '#14b8a6',
    },
    'learning-career': {
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      activeBorder: 'border-green-500/70',
      glowColor: 'rgba(34, 197, 94, 0.25)',
      activeGlow: 'shadow-[0_0_25px_rgba(34,197,94,0.35)]',
      text: 'text-green-400',
      iconBg: 'bg-green-500/20 border-green-500/40 text-green-300',
      iconColor: 'text-green-400',
      badge: 'bg-green-950/80 border-green-500/40 text-green-300',
      accentHex: '#22c55e',
    },
    'fitness-travel-gov': {
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      activeBorder: 'border-indigo-500/70',
      glowColor: 'rgba(99, 102, 241, 0.25)',
      activeGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.35)]',
      text: 'text-indigo-400',
      iconBg: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
      iconColor: 'text-indigo-400',
      badge: 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300',
      accentHex: '#6366f1',
    },
  };

  const getCategoryIcon = (id: string, className = 'h-4 w-4') => {
    switch (id) {
      case 'business-productivity':
        return <Briefcase className={className} />;
      case 'branding-marketing':
        return <Megaphone className={className} />;
      case 'investment-finance':
        return <DollarSign className={className} />;
      case 'learning-career':
        return <GraduationCap className={className} />;
      case 'fitness-travel-gov':
        return <Compass className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Dynamic ambient background glow that shifts with active category */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[700px] rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background: `radial-gradient(circle, ${sectorThemes[activeCategoryId]?.accentHex || '#6366f1'} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
              <span>POWERFUL TOOLS AT YOUR FINGERTIPS • 5 PILLARS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5 tracking-tight flex items-center gap-2">
              <span>Interactive AI Ecosystem Wheel</span>
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Click any pillar card to view and launch tools</span>
          </div>
        </div>

        {/* 5 Core Sector Cards with Stylish Animations & Glowing Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {categories.map((cat, index) => {
            const isSelected = activeCategoryId === cat.id;
            const theme = sectorThemes[cat.id] || sectorThemes['business-productivity'];
            const toolList = tools.filter((t) => t.category_id === cat.id);

            return (
              <motion.button
                key={cat.id}
                id={`wheel-sector-${cat.slug}`}
                onClick={() => setActiveCategoryId(cat.id)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? `border-2 ${theme.activeBorder} ${theme.activeGlow} bg-gradient-to-b ${theme.gradient} bg-slate-900/90`
                    : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-200 shadow-md'
                }`}
              >
                {/* Active Sector Top Accent Light Bar */}
                {isSelected && (
                  <motion.div
                    layoutId="active-sector-bar"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Subtle hover backlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at top right, ${theme.accentHex}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    {/* Stylized Icon Badge */}
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? `${theme.iconBg} shadow-inner scale-105`
                          : 'border-slate-800 bg-slate-950/80 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-200 group-hover:scale-105'
                      }`}
                    >
                      {getCategoryIcon(cat.id, 'h-4 w-4')}
                    </div>

                    {/* Count Pill */}
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border transition-colors ${
                        isSelected
                          ? `${theme.badge}`
                          : 'bg-slate-950/90 border-slate-800 text-slate-400 group-hover:border-slate-700 group-hover:text-slate-300'
                      }`}
                    >
                      {toolList.length} Tools
                    </span>
                  </div>

                  <h3
                    className={`mt-3.5 text-sm font-bold leading-snug transition-colors ${
                      isSelected ? 'text-white font-extrabold' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </h3>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between pt-2.5 border-t border-slate-800/60 text-[11px]">
                  <span
                    className={`font-semibold transition-colors flex items-center gap-1 ${
                      isSelected ? theme.text : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
                    {isSelected ? 'Active Sector' : 'Explore'}
                  </span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isSelected
                        ? `${theme.text} translate-x-1`
                        : 'text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Sector Tools Showcase with Smooth Animated Entrance */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-5 sm:p-6 space-y-5 shadow-inner backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center space-x-1.5 rounded-md border px-2.5 py-1 text-xs font-bold ${
                        sectorThemes[activeCategory.id]?.badge
                      }`}
                    >
                      {getCategoryIcon(activeCategory.id)}
                      <span>{activeCategory.name}</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      ({categoryTools.length} Curated Tools on the Pad)
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-300">
                    {activeCategory.description}
                  </p>
                </div>

                <button
                  onClick={() => navigateToCategory(activeCategory.slug)}
                  className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:border-indigo-500 hover:bg-slate-800 hover:text-white transition shadow-sm whitespace-nowrap self-start sm:self-auto"
                >
                  <span>View Full Page</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Grid of Tools in Active Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {categoryTools.map((tool, idx) => {
                  return (
                    <motion.div
                      key={tool.id}
                      id={`wheel-tool-card-${tool.slug}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
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
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
