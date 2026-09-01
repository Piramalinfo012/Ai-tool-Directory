import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppTab,
  CommandCenterSection,
  AITool,
  ToolCategory,
  RecentlyUsedTool,
  OrchestrationResult,
  AIAgent,
} from '../types';
import { TOOL_CATEGORIES } from '../data/categoriesData';
import { INITIAL_AI_TOOLS } from '../data/toolsData';
import { INITIAL_AGENTS } from '../data/agentsData';

interface OmniAIContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  activeSection: CommandCenterSection;
  setActiveSection: (sec: CommandCenterSection) => void;
  directoryView: 'home' | 'category' | 'my_tools';
  setDirectoryView: (view: 'home' | 'category' | 'my_tools') => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedTool: AITool | null;
  setSelectedTool: (tool: AITool | null) => void;
  tools: AITool[];
  categories: ToolCategory[];
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  recentlyUsed: RecentlyUsedTool[];
  trackToolUsage: (toolId: string, actionType?: string) => void;
  activeToolRunner: AITool | null;
  openToolRunner: (tool: AITool) => void;
  closeToolRunner: () => void;
  openOfficialTool: (tool: AITool) => void;
  agents: AIAgent[];
  orchestrationHistory: OrchestrationResult[];
  addOrchestrationResult: (result: OrchestrationResult) => void;
  adminMode: boolean;
  setAdminMode: (active: boolean) => void;
  addTool: (tool: AITool) => void;
  updateTool: (tool: AITool) => void;
  deleteTool: (toolId: string) => void;
  // Navigation helpers
  navigateToCategory: (categorySlug: string) => void;
  navigateToTool: (tool: AITool) => void;
  navigateToCommandCenterWithPrompt: (prompt: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const OmniAIContext = createContext<OmniAIContextType | undefined>(undefined);

export const OmniAIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AppTab>('tools_directory');
  const [activeSection, setActiveSection] = useState<CommandCenterSection>('orchestrator');
  const [directoryView, setDirectoryView] = useState<'home' | 'category' | 'my_tools'>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [tools, setTools] = useState<AITool[]>(() => {
    const saved = localStorage.getItem('omniai_wheel_tools_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tools', e);
      }
    }
    return INITIAL_AI_TOOLS;
  });

  const [categories] = useState<ToolCategory[]>(TOOL_CATEGORIES);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('omniai_favorites_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
    return ['chatgpt', 'claude-ai', 'gemini-ai', 'notebooklm', 'whoop-coach', 'datarails'];
  });

  const [recentlyUsed, setRecentlyUsed] = useState<RecentlyUsedTool[]>(() => {
    const saved = localStorage.getItem('omniai_recently_used_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse recently used', e);
      }
    }
    return [
      { tool_id: 'chatgpt', user_id: 'user-default', last_used_at: '2026-02-28T14:20:00Z', usage_count: 24, last_action: 'Open in OmniAI' },
      { tool_id: 'claude-ai', user_id: 'user-default', last_used_at: '2026-02-28T12:15:00Z', usage_count: 32, last_action: 'Open Official Website' },
      { tool_id: 'notebooklm', user_id: 'user-default', last_used_at: '2026-02-27T18:40:00Z', usage_count: 18, last_action: 'Open in OmniAI' },
      { tool_id: 'datarails', user_id: 'user-default', last_used_at: '2026-02-27T10:10:00Z', usage_count: 8, last_action: 'Open in OmniAI' },
      { tool_id: 'whoop-coach', user_id: 'user-default', last_used_at: '2026-02-26T16:05:00Z', usage_count: 15, last_action: 'Open in OmniAI' },
    ];
  });

  const [activeToolRunner, setActiveToolRunner] = useState<AITool | null>(null);
  const [agents] = useState<AIAgent[]>(INITIAL_AGENTS);
  const [orchestrationHistory, setOrchestrationHistory] = useState<OrchestrationResult[]>([]);
  const [adminMode, setAdminMode] = useState<boolean>(false);

  // Sync tools to localStorage
  useEffect(() => {
    localStorage.setItem('omniai_wheel_tools_v3', JSON.stringify(tools));
  }, [tools]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('omniai_favorites_v3', JSON.stringify(favorites));
  }, [favorites]);

  // Sync recently used
  useEffect(() => {
    localStorage.setItem('omniai_recently_used_v3', JSON.stringify(recentlyUsed));
  }, [recentlyUsed]);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const trackToolUsage = (toolId: string, actionType: string = 'Open Tool') => {
    setRecentlyUsed((prev) => {
      const existing = prev.find((item) => item.tool_id === toolId);
      if (existing) {
        return [
          {
            ...existing,
            last_used_at: new Date().toISOString(),
            usage_count: existing.usage_count + 1,
            last_action: actionType,
          },
          ...prev.filter((item) => item.tool_id !== toolId),
        ];
      } else {
        return [
          {
            tool_id: toolId,
            user_id: 'user-default',
            last_used_at: new Date().toISOString(),
            usage_count: 1,
            last_action: actionType,
          },
          ...prev,
        ];
      }
    });
  };

  const openToolRunner = (tool: AITool) => {
    trackToolUsage(tool.id, 'Executed in OmniAI');
    setActiveToolRunner(tool);
  };

  const closeToolRunner = () => {
    setActiveToolRunner(null);
  };

  const openOfficialTool = (tool: AITool) => {
    trackToolUsage(tool.id, 'Opened Official Website');
    if (tool.is_demo || !tool.official_url) {
      alert(`"${tool.name}" is an experimental internal demo tool with no external URL. You can run it inside OmniAI.`);
      return;
    }
    window.open(tool.official_url, '_blank', 'noopener,noreferrer');
  };

  const addOrchestrationResult = (result: OrchestrationResult) => {
    setOrchestrationHistory((prev) => [result, ...prev]);
  };

  const addTool = (newTool: AITool) => {
    setTools((prev) => [newTool, ...prev]);
  };

  const updateTool = (updatedTool: AITool) => {
    setTools((prev) => prev.map((t) => (t.id === updatedTool.id ? updatedTool : t)));
    if (selectedTool?.id === updatedTool.id) {
      setSelectedTool(updatedTool);
    }
  };

  const deleteTool = (toolId: string) => {
    setTools((prev) => prev.filter((t) => t.id !== toolId));
    if (selectedTool?.id === toolId) {
      setSelectedTool(null);
    }
  };

  // Navigations
  const navigateToCategory = (categorySlug: string) => {
    setActiveTab('tools_directory');
    setSelectedCategorySlug(categorySlug);
    setDirectoryView('category');
    setSelectedTool(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTool = (tool: AITool) => {
    setActiveTab('tools_directory');
    setSelectedTool(tool);
    // Find category
    const cat = categories.find((c) => c.id === tool.category_id);
    if (cat) {
      setSelectedCategorySlug(cat.slug);
    }
  };

  const navigateToCommandCenterWithPrompt = (prompt: string) => {
    setActiveTab('command_center');
    setActiveSection('orchestrator');
    // Dispatch custom event or store pending prompt
    localStorage.setItem('omniai_pending_prompt', prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <OmniAIContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSection,
        setActiveSection,
        directoryView,
        setDirectoryView,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedTool,
        setSelectedTool,
        tools,
        categories,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyUsed,
        trackToolUsage,
        activeToolRunner,
        openToolRunner,
        closeToolRunner,
        openOfficialTool,
        agents,
        orchestrationHistory,
        addOrchestrationResult,
        adminMode,
        setAdminMode,
        addTool,
        updateTool,
        deleteTool,
        navigateToCategory,
        navigateToTool,
        navigateToCommandCenterWithPrompt,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </OmniAIContext.Provider>
  );
};

export const useOmniAI = () => {
  const context = useContext(OmniAIContext);
  if (!context) {
    throw new Error('useOmniAI must be used within an OmniAIProvider');
  }
  return context;
};
