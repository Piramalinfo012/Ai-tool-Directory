import React from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { INITIAL_WORKFLOWS } from '../../data/workflowsData';
import {
  Workflow,
  Clock,
  Play,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const WorkflowsView: React.FC = () => {
  const { navigateToCommandCenterWithPrompt } = useOmniAI();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Multi-Agent Workflows</h2>
          <p className="text-sm text-slate-400">
            Pre-engineered autonomous pipelines combining multiple agents, tools, and output validators.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_WORKFLOWS.map((wf) => (
          <div
            key={wf.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-indigo-500/40 hover:bg-slate-900 transition shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-300">
                  {wf.category}
                </span>
                <span className="flex items-center text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 mr-1 text-slate-500" />
                  {wf.executionTime}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-white">{wf.name}</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">{wf.description}</p>

              <div className="mt-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Coordinated Agent Pipeline:
                </span>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {wf.agents.map((ag, i) => (
                    <React.Fragment key={i}>
                      <span className="rounded-md bg-slate-950 px-2 py-1 text-xs font-semibold text-slate-200 border border-slate-800">
                        {ag}
                      </span>
                      {i < wf.agents.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-slate-600" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Trigger: <strong className="text-slate-300">{wf.popularTrigger}</strong>
              </span>

              <button
                onClick={() => navigateToCommandCenterWithPrompt(`Execute automated pipeline: ${wf.name}`)}
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition"
              >
                <Play className="h-3.5 w-3.5" />
                <span>Run Pipeline</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
