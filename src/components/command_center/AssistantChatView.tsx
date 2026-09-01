import React, { useState, useRef, useEffect } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { ToolIcon } from '../common/ToolIcon';
import {
  Bot,
  Send,
  Sparkles,
  User,
  RotateCcw,
  Paperclip,
  Wrench,
  Zap,
  ArrowRight,
  ShieldCheck,
  Play,
} from 'lucide-react';
import { ChatMessage } from '../../types';

export const AssistantChatView: React.FC = () => {
  const { navigateToCommandCenterWithPrompt, setActiveTab, tools, setIsAiBusy } = useOmniAI();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content: `Hello! I am **OmniAI Assistant**, your command center copilot connected to **all 60+ AI tools across 46 categories**.

I can directly execute tasks with our connected AI tools:
1. **Multi-Tool Orchestration** (e.g., investor pitch decks, full-stack codebases, financial variance models, marketing campaigns).
2. **Individual Tool Invocations** (ChatGPT, Claude 3.7, Cursor, Perplexity, Midjourney, Runway, Ramp, Julius AI).
3. **Domain Advisory & Live Code Synthesis**.

Give me any task below, and I will complete it right here!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setIsAiBusy(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Task processed successfully.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I encountered an error connecting to the AI backend. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsAiBusy(false);
    }
  };

  return (
    <div className="flex h-[740px] flex-col rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Bot className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">OmniAI Assistant Copilot</h3>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected to 60+ AI Tools</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">Autonomous Task Execution & Model Routing Hub</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('tools_directory')}
            className="flex items-center space-x-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <Wrench className="h-3.5 w-3.5 text-emerald-400" />
            <span>Browse 46 Categories</span>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gradient-to-br from-indigo-900 to-cyan-900 text-cyan-300 border border-cyan-500/30'
              }`}
            >
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-md leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none font-sans'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <span className="mt-1.5 block text-[10px] text-slate-400 text-right opacity-70">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-3 text-slate-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 border border-slate-800 text-indigo-400">
              <RotateCcw className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-300 flex items-center space-x-2">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
              <span>OmniAI is dispatching to connected tools & generating solution...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Action Suggestions */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 px-4 py-2 flex items-center space-x-2 overflow-x-auto text-xs">
        <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">
          Quick Dispatch:
        </span>
        {[
          'Create a 10-slide enterprise pitch deck',
          'Generate full-stack TypeScript API code',
          'Build a 12-month financial variance model',
          'Draft high-conversion multi-channel ad copy',
        ].map((sample, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sample)}
            className="whitespace-nowrap rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-indigo-500 hover:text-white transition"
          >
            ⚡ {sample}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t border-slate-800 bg-slate-950/90 p-4">
        <div className="relative flex items-center rounded-xl border border-slate-800 bg-slate-900 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Instruct a task to execute with all connected AI tools (e.g. Build deck, write code, analyze data)..."
            className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <div className="flex items-center space-x-2 pr-3">
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:brightness-110 disabled:opacity-40 transition shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
