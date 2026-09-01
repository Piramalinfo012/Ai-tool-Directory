import React from 'react';
import { INITIAL_CONNECTIONS } from '../../data/workflowsData';
import {
  Link2,
  CheckCircle2,
  AlertCircle,
  Key,
  Server,
  Cpu,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const ConnectionsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Provider & MCP Connections</h2>
          <p className="text-sm text-slate-400">
            Secure server-side API connectors and Model Context Protocol bridges powering OmniAI execution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_CONNECTIONS.map((conn) => (
          <div
            key={conn.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 border border-slate-800">
                    <Cpu className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{conn.name}</h3>
                    <span className="text-[11px] text-slate-400">{conn.provider}</span>
                  </div>
                </div>

                <span className="flex items-center space-x-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>CONNECTED</span>
                </span>
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">{conn.description}</p>

              <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs">
                {conn.apiKeyPreview && (
                  <div className="flex items-center justify-between font-mono text-slate-400">
                    <span className="flex items-center text-slate-500">
                      <Key className="h-3 w-3 mr-1.5" />
                      Key:
                    </span>
                    <span className="text-emerald-400">{conn.apiKeyPreview}</span>
                  </div>
                )}
                {conn.endpoint && (
                  <div className="flex items-center justify-between font-mono text-slate-400">
                    <span className="flex items-center text-slate-500">
                      <Server className="h-3 w-3 mr-1.5" />
                      URI:
                    </span>
                    <span className="text-cyan-400">{conn.endpoint}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                Server-Side Proxied
              </span>
              <button className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 text-slate-300 hover:text-white">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
