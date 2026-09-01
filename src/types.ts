export type AppTab = 'command_center' | 'tools_directory';

export type CommandCenterSection =
  | 'orchestrator'
  | 'assistant'
  | 'auto_mode'
  | 'agents'
  | 'workflows'
  | 'files'
  | 'conversations'
  | 'favorites'
  | 'analytics'
  | 'connections'
  | 'settings';

export type AccessType = 'external' | 'embedded' | 'api' | 'mcp' | 'hybrid';

export type PricingType = 'Free' | 'Freemium' | 'Paid' | 'Open Source';

export type ToolStatus = 'Available' | 'Beta' | 'Coming Soon';

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  accent: string;
  tool_count: number;
  featured: boolean;
  sort_order: number;
  clusterGroup: 'Business' | 'Creative' | 'Productivity' | 'Engineering' | 'Operations';
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  category_name?: string;
  icon_url?: string;
  icon_name?: string;
  website_url: string;
  official_url: string;
  api_url?: string;
  provider: string;
  access_type: AccessType;
  capabilities: string[];
  tags: string[];
  pricing_type: PricingType;
  pricing_details: string;
  free_plan: boolean;
  api_available: boolean;
  mcp_available: boolean;
  featured: boolean;
  popular: boolean;
  status: ToolStatus;
  rating: number;
  use_cases: string[];
  created_at: string;
  updated_at: string;
  is_demo?: boolean;
  verified_official: boolean;
  best_for?: string[];
  features?: string[];
}

export interface RecentlyUsedTool {
  tool_id: string;
  user_id: string;
  last_used_at: string;
  usage_count: number;
  last_action?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  category: string;
  description: string;
  capabilities: string[];
  model: string;
  status: 'active' | 'idle' | 'busy';
  speedRating: string;
  accuracyRating: string;
}

export interface OrchestrationStep {
  id: string;
  agentId: string;
  agentName: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: string;
  timestamp?: string;
}

export interface OrchestrationResult {
  id: string;
  prompt: string;
  title: string;
  summary: string;
  recommendedAgents: { id: string; name: string; role: string }[];
  steps: OrchestrationStep[];
  deliverable?: string;
  createdAt: string;
  status: 'planning' | 'executing' | 'completed';
}

export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  category: string;
  stepsCount: number;
  executionTime: string;
  agents: string[];
  popularTrigger: string;
}

export interface ConnectionConfig {
  id: string;
  provider: string;
  name: string;
  type: 'gemini' | 'openai' | 'anthropic' | 'mcp' | 'custom_api';
  status: 'connected' | 'unconfigured' | 'pending';
  apiKeyPreview?: string;
  endpoint?: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  agent?: string;
}
