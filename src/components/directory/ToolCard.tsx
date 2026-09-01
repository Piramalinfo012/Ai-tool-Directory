import React from 'react';
import { AITool } from '../../types';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolIcon } from '../common/ToolIcon';
import {
  ExternalLink,
  Star,
  Zap,
  CheckCircle2,
  Info,
  DollarSign,
  Briefcase,
  Layers,
  Code2,
  Image as ImageIcon,
  Video,
  Presentation,
  Search,
  Sparkles,
  Bot,
  Globe,
  Lock,
} from 'lucide-react';

interface ToolCardProps {
  tool: AITool;
  onOpenDetails?: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpenDetails }) => {
  const {
    openOfficialTool,
    openToolRunner,
    toggleFavorite,
    isFavorite,
    navigateToTool,
  } = useOmniAI();

  const favorited = isFavorite(tool.id);

  const hasInApp = tool.access_type === 'embedded' || tool.access_type === 'api' || tool.access_type === 'hybrid' || tool.access_type === 'mcp';
  const hasExternal = tool.access_type === 'external' || tool.access_type === 'hybrid' || (!tool.is_demo && !!tool.official_url);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg hover:border-indigo-500/60 hover:bg-slate-900 hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200">
      <div>
        {/* Top bar with Icon & Pricing & Favorite */}
        <div className="flex items-start justify-between">
          <ToolIcon tool={tool} size="md" />

          <div className="flex items-center space-x-1.5">
            <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-slate-300">
              {tool.pricing_type}
            </span>
            <button
              id={`fav-btn-${tool.id}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(tool.id);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-amber-400 transition"
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star
                className={`h-3.5 w-3.5 ${
                  favorited ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title & Category */}
        <div className="mt-3.5">
          <div className="flex items-center space-x-1.5">
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition truncate">
              {tool.name}
            </h3>
            {tool.verified_official && (
              <span title="Verified Official Tool URL" className="flex items-center text-cyan-400">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-indigo-400 truncate block">
            {tool.category_name || 'AI Software'}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded bg-slate-950 border border-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="mt-3 flex items-center space-x-2 text-[11px]">
          <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{tool.status}</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[10px]">
            {tool.access_type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 flex-1 min-w-0">
          {/* OPEN TOOL BUTTON */}
          {hasExternal ? (
            <button
              id={`open-tool-${tool.id}`}
              onClick={() => openOfficialTool(tool)}
              className="flex-1 flex items-center justify-center space-x-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-sm truncate"
              title={`Open official ${tool.name} website in new tab`}
            >
              <Globe className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Open Tool</span>
            </button>
          ) : (
            <button
              onClick={() => openToolRunner(tool)}
              className="flex-1 flex items-center justify-center space-x-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-sm truncate"
            >
              <Zap className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Use in OmniAI</span>
            </button>
          )}

          {/* In-App Button if available */}
          {hasInApp && hasExternal && (
            <button
              onClick={() => openToolRunner(tool)}
              className="flex items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-950/40 px-2 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-900/60 hover:text-white transition"
              title="Run inside OmniAI Workbench"
            >
              <Zap className="h-3 w-3 text-cyan-300" />
            </button>
          )}
        </div>

        {/* DETAILS BUTTON */}
        <button
          onClick={() => {
            if (onOpenDetails) onOpenDetails(tool);
            else navigateToTool(tool);
          }}
          className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition whitespace-nowrap"
        >
          <Info className="h-3 w-3" />
          <span>Details</span>
        </button>
      </div>
    </div>
  );
};
