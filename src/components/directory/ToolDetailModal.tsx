import React from 'react';
import { AITool } from '../../types';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolIcon } from '../common/ToolIcon';
import {
  X,
  ExternalLink,
  Zap,
  Star,
  CheckCircle2,
  Globe,
  DollarSign,
  Briefcase,
  Layers,
  Code2,
  Presentation,
  Video,
  Image as ImageIcon,
  Search,
  Sparkles,
  Link,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from 'lucide-react';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  const {
    openOfficialTool,
    openToolRunner,
    toggleFavorite,
    isFavorite,
    navigateToCommandCenterWithPrompt,
  } = useOmniAI();

  if (!tool) return null;

  const favorited = isFavorite(tool.id);
  const hasInApp = tool.access_type === 'embedded' || tool.access_type === 'api' || tool.access_type === 'hybrid' || tool.access_type === 'mcp';
  const hasExternal = tool.access_type === 'external' || tool.access_type === 'hybrid' || (!tool.is_demo && !!tool.official_url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 sm:p-8 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <ToolIcon tool={tool} size="xl" className="shadow-2xl" />

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-xs font-bold text-indigo-300">
                  {tool.category_name || 'AI Software'}
                </span>
                {tool.verified_official && (
                  <span className="flex items-center space-x-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>✓ Official Website</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white">{tool.name}</h2>
              <p className="text-xs text-slate-400">
                Provider: <strong className="text-slate-200">{tool.provider}</strong> • Access Mode:{' '}
                <strong className="text-cyan-300 font-mono">{tool.access_type.toUpperCase()}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              What This Tool Does
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">{tool.description}</p>
          </div>

          {/* Best For */}
          {tool.best_for && tool.best_for.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Best For:
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.best_for.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-indigo-500/20 bg-indigo-950/30 px-3 py-1 text-xs font-medium text-indigo-200"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Capabilities & Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Capabilities
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {tool.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Integration Specifications
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>API Availability:</span>
                  <span className={tool.api_available ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {tool.api_available ? 'Enabled (REST/gRPC)' : 'Not Publicly Available'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>MCP Bridge:</span>
                  <span className={tool.mcp_available ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                    {tool.mcp_available ? 'Supported' : 'Unconfigured'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Pricing Structure:</span>
                  <span className="text-amber-300 font-semibold">{tool.pricing_type}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Free Plan / Trial:</span>
                  <span className="text-slate-200">{tool.free_plan ? 'Yes (Free Tier)' : 'Trial / Paid'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pricing Details</span>
            <p className="mt-1 text-xs text-slate-300">{tool.pricing_details}</p>
          </div>

          {/* Official URL Verification Section */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span className="text-slate-400">Official URL:</span>
              <span className="text-slate-200 font-mono truncate max-w-xs sm:max-w-md">
                {tool.official_url || 'Internal Demo Sandbox'}
              </span>
            </div>
            {tool.verified_official && (
              <span className="text-emerald-400 font-semibold flex items-center">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950 p-4 sm:p-6">
          <button
            onClick={() => toggleFavorite(tool.id)}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-300 transition"
          >
            <Star className={`h-4 w-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{favorited ? 'Favorited' : 'Add to Favorites'}</span>
          </button>

          <div className="flex flex-wrap items-center space-x-2">
            {/* USE IN OMNIAI BUTTON (Only if in-app/api/mcp/embedded exists) */}
            {hasInApp && (
              <button
                id="btn-use-in-omniai"
                onClick={() => {
                  onClose();
                  openToolRunner(tool);
                }}
                className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 hover:brightness-110 active:scale-95 transition"
              >
                <Zap className="h-3.5 w-3.5 text-cyan-200" />
                <span>⚡ Use in OmniAI</span>
              </button>
            )}

            {/* OPEN TOOL BUTTON (Official external website) */}
            {hasExternal && (
              <button
                id="btn-open-official-tool"
                onClick={() => openOfficialTool(tool)}
                className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-500 active:scale-95 transition"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>🚀 Open Official Tool</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
