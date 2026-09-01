import React from 'react';
import { OmniAIProvider, useOmniAI } from './context/OmniAIContext';
import { TopNavbar } from './components/navigation/TopNavbar';
import { CommandCenterView } from './components/command_center/CommandCenterView';
import { DirectoryView } from './components/directory/DirectoryView';

const AppContent: React.FC = () => {
  const { activeTab } = useOmniAI();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Main Navigation Bar with the TWO Top-Level Tabs */}
      <TopNavbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'command_center' ? (
          <CommandCenterView />
        ) : (
          <DirectoryView />
        )}
      </main>

      {/* Unified Platform Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-300">OmniAI Platform</span>
            <span>•</span>
            <span>Orchestration & Directory Ecosystem</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>Server Proxy Connected</span>
            <span>•</span>
            <span>46 Category Taxonomy</span>
            <span>•</span>
            <span>MCP Standard</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <OmniAIProvider>
      <AppContent />
    </OmniAIProvider>
  );
}
