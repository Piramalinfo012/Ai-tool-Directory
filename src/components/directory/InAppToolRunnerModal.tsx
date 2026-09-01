import React, { useState } from 'react';
import { AITool } from '../../types';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolIcon } from '../common/ToolIcon';
import {
  X,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Copy,
  Download,
  ArrowRight,
  ExternalLink,
  Bot,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InAppToolRunnerModal: React.FC = () => {
  const {
    activeToolRunner,
    closeToolRunner,
    openOfficialTool,
    navigateToCommandCenterWithPrompt,
  } = useOmniAI();

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<string | null>(null);

  if (!activeToolRunner) return null;

  const handleExecute = async () => {
    if (!inputPrompt.trim() || isExecuting) return;

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const res = await fetch('/api/gemini/execute-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: activeToolRunner.name,
          category: activeToolRunner.category_name,
          prompt: inputPrompt,
        }),
      });

      const data = await res.json();
      setExecutionResult(data.result || 'Execution completed with no output.');

      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error('Execution error:', error);
      setExecutionResult('Error communicating with in-app engine. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-indigo-500/40 bg-slate-900 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-950 px-6 py-4">
          <div className="flex items-center space-x-3">
            <ToolIcon tool={activeToolRunner} size="md" className="shadow-lg" />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">OmniAI In-App Execution Engine</h3>
                <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/20">
                  {activeToolRunner.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Running in sandboxed environment via server-side Gemini API & MCP Bridge
              </p>
            </div>
          </div>

          <button
            onClick={closeToolRunner}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Prompt Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Instruct {activeToolRunner.name}
            </label>
            <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-2 focus-within:border-indigo-500 transition">
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={`e.g. "Execute high precision analysis for ${activeToolRunner.category_name}..."`}
                rows={3}
                className="w-full resize-none bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <div className="flex items-center justify-between border-t border-slate-850 pt-2 px-2">
                <span className="text-xs text-slate-400">
                  Capabilities: {activeToolRunner.capabilities.slice(0, 3).join(', ')}
                </span>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting || !inputPrompt.trim()}
                  className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-40 transition"
                >
                  {isExecuting ? (
                    <>
                      <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      <span>Run in OmniAI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick presets for this tool */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Quick template:</span>
            {activeToolRunner.use_cases.map((uc, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputPrompt(uc);
                }}
                className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-300 hover:border-indigo-500 hover:text-white transition truncate max-w-xs"
              >
                ✨ {uc}
              </button>
            ))}
          </div>

          {/* Execution Result Box */}
          {executionResult && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Execution Output Generated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(executionResult);
                      alert('Copied to clipboard!');
                    }}
                    className="flex items-center space-x-1 rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300 hover:text-white"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
              <div className="text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {executionResult}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-4 text-xs">
          <div className="text-slate-400">
            Official Provider:{' '}
            <strong className="text-slate-200">{activeToolRunner.provider}</strong>
          </div>
          {activeToolRunner.official_url && (
            <button
              onClick={() => openOfficialTool(activeToolRunner)}
              className="flex items-center space-x-1 text-emerald-400 hover:underline font-semibold"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
