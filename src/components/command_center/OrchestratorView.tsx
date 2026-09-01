import React, { useState, useEffect } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolIcon } from '../common/ToolIcon';
import { AITool } from '../../types';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Layers,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Download,
  Copy,
  Wrench,
  Search,
  Code2,
  FileText,
  ExternalLink,
  ChevronRight,
  Zap,
  Sliders,
  Check,
  Globe,
  Cpu,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_TASKS = [
  {
    title: 'Enterprise Pitch Deck & Market Analysis',
    prompt: 'Create an investor-ready pitch deck for an autonomous enterprise AI platform including problem statement, market size, product architecture, and 3-year revenue forecast.',
    domain: 'Business & Strategy',
    toolsSuggested: ['Perplexity Pro', 'Claude 3.7', 'Gamma App', 'Ramp AI'],
  },
  {
    title: 'Full-Stack SaaS Architecture & Codebase',
    prompt: 'Architect and generate the core TypeScript backend schema, REST endpoints, authentication middleware, and React frontend dashboard for a team collaboration platform.',
    domain: 'Software Engineering',
    toolsSuggested: ['Cursor AI', 'Claude 3.7', 'GitHub Copilot', 'v0 by Vercel'],
  },
  {
    title: 'Financial Variance Audit & 12-Month Runway',
    prompt: 'Perform a comprehensive financial variance analysis, identify expense anomalies, and build a 12-month burn rate forecast with capital efficiency recommendations.',
    domain: 'Finance & Accounting',
    toolsSuggested: ['Ramp AI', 'Julius AI', 'Claude 3.7', 'Truewind AI'],
  },
  {
    title: 'Omni-Channel Product Launch Campaign',
    prompt: 'Create a full marketing launch package: viral launch tweet thread, technical blog post, LinkedIn executive post, and 5 Google search ad variations.',
    domain: 'Marketing & Growth',
    toolsSuggested: ['ChatGPT Plus', 'Jasper AI', 'Canva Magic Studio', 'Midjourney'],
  },
  {
    title: 'Video Script + Scene Prompts + Voiceover Directives',
    prompt: 'Write a 60-second high-conversion product teaser video script with frame-by-frame Midjourney visual prompts and ElevenLabs voice tone directives.',
    domain: 'Video & Media',
    toolsSuggested: ['Claude 3.7', 'Midjourney', 'ElevenLabs', 'Runway Gen-3'],
  },
];

export const OrchestratorView: React.FC = () => {
  const {
    navigateToCategory,
    navigateToTool,
    setActiveTab,
    tools,
    addOrchestrationResult,
    orchestrationHistory,
  } = useOmniAI();

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [orchestrationData, setOrchestrationData] = useState<any | null>(null);
  const [activeTabDeliverable, setActiveTabDeliverable] = useState<'deliverable' | 'steps' | 'json'>('deliverable');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Tool Connection & Selection Mode
  const [connectionMode, setConnectionMode] = useState<'auto' | 'custom'>('auto');
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([]);
  const [toolSearchQuery, setToolSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Quick In-App Tool Runner inside Command Center
  const [quickToolRunnerActive, setQuickToolRunnerActive] = useState<boolean>(false);
  const [selectedQuickTool, setSelectedQuickTool] = useState<AITool | null>(null);
  const [quickToolPrompt, setQuickToolPrompt] = useState<string>('');
  const [quickToolLoading, setQuickToolLoading] = useState<boolean>(false);
  const [quickToolResult, setQuickToolResult] = useState<string | null>(null);

  // Check for pending prompt from cross-linking
  useEffect(() => {
    const pending = localStorage.getItem('omniai_pending_prompt');
    if (pending) {
      setInputPrompt(pending);
      localStorage.removeItem('omniai_pending_prompt');
      handleOrchestrate(pending);
    }
  }, []);

  const toggleToolSelection = (toolId: string) => {
    setSelectedToolIds((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const handleOrchestrate = async (promptToRun?: string) => {
    const text = promptToRun || inputPrompt;
    if (!text.trim() || isOrchestrating) return;

    setIsOrchestrating(true);
    setActiveStepIndex(0);
    setOrchestrationData(null);

    try {
      const selectedToolNames = tools
        .filter((t) => selectedToolIds.includes(t.id))
        .map((t) => t.name);

      const response = await fetch('/api/gemini/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          selectedTools: connectionMode === 'custom' ? selectedToolNames : [],
        }),
      });

      const data = await response.json();
      setOrchestrationData(data);

      // Simulate live step-by-step tool execution feedback
      const steps = data.steps || [];
      for (let i = 0; i < steps.length; i++) {
        setActiveStepIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 650));
      }
      setActiveStepIndex(steps.length);

      // Confetti celebration on completion
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });

      addOrchestrationResult({
        id: `orch-${Date.now()}`,
        prompt: text,
        title: data.title || 'Connected AI Task Orchestration',
        summary: data.summary || 'Task completed successfully',
        recommendedAgents: data.recommendedAgents || [],
        steps: data.steps || [],
        deliverable: data.deliverable,
        createdAt: new Date().toISOString(),
        status: 'completed',
      });
    } catch (error) {
      console.error('Orchestration error:', error);
    } finally {
      setIsOrchestrating(false);
    }
  };

  const handleCopyDeliverable = () => {
    if (!orchestrationData?.deliverable) return;
    navigator.clipboard.writeText(orchestrationData.deliverable);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleDownloadDeliverable = () => {
    if (!orchestrationData?.deliverable) return;
    const blob = new Blob([orchestrationData.deliverable], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OmniAI_Task_Deliverable_${Date.now()}.md`;
    a.click();
  };

  // Run a single tool immediately in workbench
  const handleRunQuickTool = async () => {
    if (!selectedQuickTool || !quickToolPrompt.trim() || quickToolLoading) return;
    setQuickToolLoading(true);
    setQuickToolResult(null);

    try {
      const res = await fetch('/api/gemini/execute-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: selectedQuickTool.name,
          category: selectedQuickTool.category_name || 'AI Tool',
          prompt: quickToolPrompt,
        }),
      });
      const data = await res.json();
      setQuickToolResult(data.result || 'Executed successfully.');
    } catch (err) {
      console.error('Quick tool execution error:', err);
      setQuickToolResult('Failed to execute tool. Please try again.');
    } finally {
      setQuickToolLoading(false);
    }
  };

  // Filter tools for the connection panel
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(toolSearchQuery.toLowerCase()) ||
      tool.category_name?.toLowerCase().includes(toolSearchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(toolSearchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'code') return tool.category_id?.includes('code') || tool.category_id?.includes('dev');
    if (activeCategoryFilter === 'finance') return tool.category_id?.includes('finance');
    if (activeCategoryFilter === 'video') return tool.category_id?.includes('video') || tool.category_id?.includes('audio');
    if (activeCategoryFilter === 'image') return tool.category_id?.includes('image') || tool.category_id?.includes('design');
    if (activeCategoryFilter === 'research') return tool.category_id?.includes('search') || tool.category_id?.includes('research');
    if (activeCategoryFilter === 'business') return tool.category_id?.includes('business') || tool.category_id?.includes('presentation');
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Connected Tools Status Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-slate-950 p-6 sm:p-7 shadow-2xl backdrop-blur-md">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>ALL {tools.length}+ AI TOOLS CONNECTED • 46 CATEGORIES ACTIVE</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-medium">Execution Engine:</span>
              <span className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                Gemini 3.7 Flash + Multi-Agent Bus
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            OmniAI Universal Command Center
          </h1>
          <p className="mt-2 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Directly connected to all AI tools (Claude, Cursor, Perplexity, Midjourney, Ramp, ElevenLabs, Gamma, Julius AI, and 60+ more). 
            Give any task — OmniAI orchestrates the connected tools, runs the execution, and returns the complete deliverable right here.
          </p>

          {/* Connection Mode Selection */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 p-1 text-xs">
              <button
                type="button"
                onClick={() => setConnectionMode('auto')}
                className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 font-bold transition ${
                  connectionMode === 'auto'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>⚡ Auto Smart-Routing (All Tools Connected)</span>
              </button>
              <button
                type="button"
                onClick={() => setConnectionMode('custom')}
                className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 font-bold transition ${
                  connectionMode === 'custom'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>🎯 Custom Tool Chain ({selectedToolIds.length} Selected)</span>
              </button>
            </div>

            {connectionMode === 'custom' && selectedToolIds.length > 0 && (
              <button
                onClick={() => setSelectedToolIds([])}
                className="text-xs text-rose-400 hover:text-rose-300 underline"
              >
                Clear Selected
              </button>
            )}
          </div>

          {/* Custom Tool Selection Drawer if in Custom Mode */}
          {connectionMode === 'custom' && (
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/90 p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Select AI Tools to Chain for this Task:
                </span>

                {/* Search in Tool Drawer */}
                <div className="relative w-48 sm:w-64">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={toolSearchQuery}
                    onChange={(e) => setToolSearchQuery(e.target.value)}
                    placeholder="Search connected tools..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tool Category Filters */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {[
                  { id: 'all', label: 'All Categories' },
                  { id: 'code', label: 'Code & Dev' },
                  { id: 'business', label: 'Business & Deck' },
                  { id: 'finance', label: 'Finance & Audit' },
                  { id: 'video', label: 'Video & Audio' },
                  { id: 'image', label: 'Image & Design' },
                  { id: 'research', label: 'Research' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`rounded-md px-2 py-1 font-medium transition ${
                      activeCategoryFilter === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Tool Chips Grid */}
              <div className="max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
                {filteredTools.map((tool) => {
                  const isSelected = selectedToolIds.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => toggleToolSelection(tool.id)}
                      className={`flex items-center space-x-2 rounded-lg border p-2 text-left transition ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-950/60 ring-1 ring-indigo-500'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <ToolIcon tool={tool} size="xs" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{tool.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{tool.category_name}</div>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Primary Task Input Console */}
          <div className="mt-6">
            <div className="relative rounded-2xl border-2 border-indigo-500/50 bg-slate-900/95 p-3 shadow-2xl focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20 transition">
              <textarea
                id="command-center-prompt-input"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder='Enter any task to execute across all connected AI tools (e.g. "Draft an investor pitch deck with market research and financial runway", "Generate full-stack auth and REST API code", "Perform financial variance analysis")...'
                rows={3}
                className="w-full resize-none bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleOrchestrate();
                  }
                }}
              />

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3 px-2">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="hidden sm:inline">
                    Shortcut: <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300 font-mono">Ctrl+Enter</kbd>
                  </span>
                  <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Model Bus Active</span>
                  </div>
                </div>

                <button
                  id="btn-command-center-execute"
                  onClick={() => handleOrchestrate()}
                  disabled={isOrchestrating || !inputPrompt.trim()}
                  className="flex items-center space-x-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition"
                >
                  {isOrchestrating ? (
                    <>
                      <RotateCcw className="h-4 w-4 animate-spin text-white" />
                      <span>Executing Across Connected AI Tools...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 text-cyan-200 fill-cyan-200" />
                      <span>Execute Task & Deliver Result</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preset One-Click Tasks */}
          <div className="mt-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              One-Click High-Impact Tasks:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_TASKS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputPrompt(sample.prompt);
                    handleOrchestrate(sample.prompt);
                  }}
                  className="group flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500 hover:bg-slate-800 hover:text-white transition shadow-sm"
                >
                  <span className="text-indigo-400 group-hover:scale-110 transition">⚡</span>
                  <span className="font-semibold">{sample.title}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {sample.domain}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LIVE ORCHESTRATION PIPELINE & DELIVERABLE RESULT */}
      {(isOrchestrating || orchestrationData) && (
        <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Deliverable Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {orchestrationData?.title || 'Autonomous Task Execution in Progress...'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {orchestrationData?.summary || 'Routing task through connected AI tool ecosystem and synthesizing deliverables...'}
              </p>
            </div>

            {/* View Tabs */}
            <div className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs">
              <button
                onClick={() => setActiveTabDeliverable('deliverable')}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-bold transition ${
                  activeTabDeliverable === 'deliverable'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Completed Result</span>
              </button>
              <button
                onClick={() => setActiveTabDeliverable('steps')}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-bold transition ${
                  activeTabDeliverable === 'steps'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Tool Execution Trace ({orchestrationData?.steps?.length || 4})</span>
              </button>
            </div>
          </div>

          {/* Connected AI Tools Activated for this Task */}
          {orchestrationData?.recommendedAgents && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Connected AI Tools Activated for this Task:
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {orchestrationData.recommendedAgents.length} Tools Synchronized
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {orchestrationData.recommendedAgents.map((agent: any, i: number) => {
                  const matched = tools.find(
                    (t) =>
                      t.id.toLowerCase() === (agent.id || '').toLowerCase() ||
                      t.name.toLowerCase().includes((agent.name || '').toLowerCase())
                  );

                  return (
                    <div
                      key={i}
                      className="flex items-center space-x-3 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-slate-950 p-3.5 shadow-md"
                    >
                      {matched ? (
                        <ToolIcon tool={matched} size="md" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-900/60 border border-indigo-500/30">
                          <Bot className="h-5 w-5 text-indigo-400" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-white truncate">{agent.name}</span>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{agent.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 1: Completed Final Deliverable */}
          {activeTabDeliverable === 'deliverable' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-inner space-y-6">
              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-white">Synthesized Master Deliverable</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyDeliverable}
                    className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadDeliverable}
                    className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Markdown</span>
                  </button>
                </div>
              </div>

              {/* Rendered Content */}
              {orchestrationData?.deliverable ? (
                <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
                  <div className="whitespace-pre-wrap font-sans bg-slate-900/60 p-6 rounded-xl border border-slate-800/80">
                    {orchestrationData.deliverable}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
                  <RotateCcw className="h-8 w-8 animate-spin text-indigo-400" />
                  <p className="text-sm font-medium">Synthesizing outputs across connected AI tools...</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Execution Step-by-Step Trace */}
          {activeTabDeliverable === 'steps' && (
            <div className="space-y-4">
              {(orchestrationData?.steps || []).map((step: any, index: number) => {
                const isCurrent = activeStepIndex === index;
                const isDone = activeStepIndex > index;
                const matchedTool = tools.find(
                  (t) =>
                    t.id.toLowerCase() === (step.agentId || '').toLowerCase() ||
                    t.name.toLowerCase().includes((step.agentName || '').toLowerCase())
                );

                return (
                  <div
                    key={step.id || index}
                    className={`rounded-2xl border p-5 transition-all duration-300 ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/40 shadow-lg'
                        : isDone
                        ? 'border-emerald-500/40 bg-slate-950/70 shadow-sm'
                        : 'border-slate-800 bg-slate-950/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3.5 min-w-0">
                        {matchedTool ? (
                          <ToolIcon tool={matchedTool} size="md" />
                        ) : (
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${
                              isDone
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : isCurrent
                                ? 'bg-indigo-600 text-white animate-pulse'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-cyan-300">
                              {step.agentName || 'AI Tool'}
                            </span>
                            <span className="text-slate-600">•</span>
                            <h4 className="text-sm sm:text-base font-bold text-white truncate">
                              {step.title}
                            </h4>
                          </div>

                          <div className="mt-2 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
                            {step.output}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold shrink-0 ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isCurrent
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isDone ? '✓ Completed' : isCurrent ? '⚡ Processing' : 'Queued'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* QUICK IN-APP TOOL WORKBENCH */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Individual AI Tool Execution Workbench
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any connected tool from the 46 categories to execute an isolated task or verify output.
            </p>
          </div>

          {/* Selected Tool Picker */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedQuickTool?.id || ''}
              onChange={(e) => {
                const found = tools.find((t) => t.id === e.target.value);
                setSelectedQuickTool(found || null);
                setQuickToolResult(null);
              }}
              className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="">-- Choose a Connected AI Tool ({tools.length} available) --</option>
              {tools.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category_name || 'AI'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Workbench Execution Box */}
        {selectedQuickTool ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3">
              <ToolIcon tool={selectedQuickTool} size="sm" />
              <div>
                <span className="text-xs font-bold text-white">{selectedQuickTool.name}</span>
                <span className="ml-2 text-[10px] text-indigo-300 font-mono">{selectedQuickTool.category_name}</span>
                <p className="text-[11px] text-slate-400">{selectedQuickTool.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={quickToolPrompt}
                onChange={(e) => setQuickToolPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunQuickTool()}
                placeholder={`Ask ${selectedQuickTool.name} to execute a task...`}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleRunQuickTool}
                disabled={quickToolLoading || !quickToolPrompt.trim()}
                className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-40 transition"
              >
                {quickToolLoading ? (
                  <RotateCcw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>Run</span>
              </button>
            </div>

            {quickToolResult && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-400">Response from {selectedQuickTool.name}:</span>
                <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  {quickToolResult}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {tools.slice(0, 12).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedQuickTool(t);
                  setQuickToolPrompt('');
                  setQuickToolResult(null);
                }}
                className="flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 text-left hover:border-indigo-500/50 hover:bg-slate-900 transition"
              >
                <ToolIcon tool={t} size="xs" />
                <span className="text-xs font-bold text-slate-200 truncate">{t.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* EXPLORE FULL DIRECTORY FOOTER */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Wrench className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Connected Directory Ecosystem
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white">
              Want to explore the complete catalog of 46 categories?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Browse detailed profiles, launch external web apps, or manage custom AI tools in the directory.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('tools_directory')}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/25 hover:brightness-110 active:scale-95 transition whitespace-nowrap"
          >
            <span>Explore AI Tools Directory</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
