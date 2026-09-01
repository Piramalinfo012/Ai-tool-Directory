import React from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import {
  Bot,
  Search,
  PenTool,
  Image as ImageIcon,
  Presentation,
  DollarSign,
  Code2,
  Sparkles,
  Zap,
  Play,
  CheckCircle2,
} from 'lucide-react';

export const AgentsStudioView: React.FC = () => {
  const { agents, navigateToCommandCenterWithPrompt } = useOmniAI();

  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'research-agent':
        return <Search className="h-6 w-6 text-teal-400" />;
      case 'writing-agent':
        return <PenTool className="h-6 w-6 text-purple-400" />;
      case 'image-agent':
        return <ImageIcon className="h-6 w-6 text-pink-400" />;
      case 'presentation-agent':
        return <Presentation className="h-6 w-6 text-blue-400" />;
      case 'finance-agent':
        return <DollarSign className="h-6 w-6 text-emerald-400" />;
      case 'code-agent':
        return <Code2 className="h-6 w-6 text-amber-400" />;
      default:
        return <Bot className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Agents Fleet</h2>
          <p className="text-sm text-slate-400">
            Specialized autonomous agents ready to be deployed individually or orchestrated as a collaborative team.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-indigo-500/50 hover:bg-slate-900 transition shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                  {getAgentIcon(agent.id)}
                </div>
                <span className="flex items-center space-x-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{agent.status.toUpperCase()}</span>
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-white">{agent.name}</h3>
              <p className="text-xs font-medium text-indigo-400 mt-0.5">{agent.role}</p>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">{agent.description}</p>

              <div className="mt-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Core Capabilities
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {agent.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                <span>Model: </span>
                <span className="font-mono text-slate-200">{agent.model.split('/')[0]}</span>
              </div>

              <button
                onClick={() =>
                  navigateToCommandCenterWithPrompt(`Instruct ${agent.name} to execute high priority task: `)
                }
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
              >
                <Play className="h-3 w-3" />
                <span>Deploy Agent</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
