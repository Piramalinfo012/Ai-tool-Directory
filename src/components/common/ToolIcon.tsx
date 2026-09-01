import React, { useState } from 'react';
import { AITool } from '../../types';
import {
  Sparkles,
  DollarSign,
  Briefcase,
  Layers,
  Code2,
  Image as ImageIcon,
  Video,
  Presentation,
  Search,
  Bot,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  Table,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Globe,
  Headphones,
  Mic,
  Palette,
  Megaphone,
} from 'lucide-react';

interface ToolIconProps {
  tool?: AITool | { id?: string; name?: string; website_url?: string; official_url?: string; category_id?: string; category_name?: string; icon_url?: string; icon_name?: string };
  name?: string;
  websiteUrl?: string;
  categoryId?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

// Brand-specific SVG Logos for popular AI tools
const BRAND_LOGOS: Record<string, React.FC<{ className?: string }>> = {
  // OpenAI / ChatGPT
  chatgpt: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.259 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7466-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0748a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4598a.7948.7948 0 0 0-.3927.6813v6.722zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),

  // Anthropic / Claude
  claude: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M17.486 4.5H6.514C4.301 4.5 2.5 6.301 2.5 8.514v6.972C2.5 17.699 4.301 19.5 6.514 19.5h10.972c2.213 0 4.014-1.801 4.014-4.014V8.514C21.5 6.301 19.699 4.5 17.486 4.5zm-5.486 3.25c.414 0 .75.336.75.75v2.75h2.75c.414 0 .75.336.75.75s-.336.75-.75.75H12.75v2.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75V12.75H8.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.75V8.5c0-.414.336-.75.75-.75z" />
    </svg>
  ),

  // Perplexity AI
  perplexity: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || 'h-full w-full'}>
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
    </svg>
  ),

  // Notion AI
  notion: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.087-.803c1.168-.093 1.355.373.981 1.214l-2.477 5.61a.834.834 0 0 1-.747.466H6.886l5.7 8.414c.7.98.233 1.493-1.027 1.493H2.825c-1.214 0-1.447-.56-1.073-1.4l3.127-6.91a.84.84 0 0 1 .746-.466h5.882L5.807 5.374c-.606-.886-.326-1.399.746-1.399l10.9-1.026c.746-.093 1.12.28 1.12.747 0 .466-.374.84-1.12.933L6.886 5.608c-.746.093-.933-.28-.56-.933z" />
    </svg>
  ),

  // Cursor IDE
  cursor: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-10-5v10l10 5 10-5V6l-10 5z" />
    </svg>
  ),

  // GitHub Copilot
  github: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),

  // Midjourney
  midjourney: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M12 2L3 19h18L12 2zm0 4.5l5.5 10.5h-11L12 6.5zm-1 5.5v3h2v-3h-2z" />
    </svg>
  ),

  // Gamma App
  gamma: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M12 2L2 9.5l10 7.5 10-7.5L12 2zm0 13l-8-6v7l8 6 8-6v-7l-8 6z" />
    </svg>
  ),

  // ElevenLabs
  elevenlabs: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <rect x="7" y="4" width="3" height="16" rx="1.5" />
      <rect x="14" y="4" width="3" height="16" rx="1.5" />
    </svg>
  ),

  // Runway
  runway: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M6 4h7a5 5 0 0 1 5 5 5 5 0 0 1-3.2 4.66L19 20h-4l-3.5-5.5H9V20H6V4zm3 3v4.5h4a2.25 2.25 0 0 0 0-4.5H9z" />
    </svg>
  ),

  // v0 / Vercel
  v0: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  ),

  // Ramp
  ramp: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M3 19h18L14 5H7l-4 14zm5.5-3l3-6.5h2.5l-3 6.5H8.5z" />
    </svg>
  ),

  // Brex
  brex: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M6 4h7a4.5 4.5 0 0 1 3.5 7.3A4.5 4.5 0 0 1 14 20H6V4zm3.5 3v4h3.5a1.5 1.5 0 0 0 0-3H9.5zm0 7v3H14a1.5 1.5 0 0 0 0-3H9.5z" />
    </svg>
  ),

  // ClickUp
  clickup: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <path d="M4 16.5l8-6 8 6-2 2.5-6-4.5-6 4.5zM4 9l8-6 8 6-2 2.5-6-4.5-6 4.5z" />
    </svg>
  ),

  // Asana
  asana: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <circle cx="12" cy="7" r="4" />
      <circle cx="6" cy="17" r="4" />
      <circle cx="18" cy="17" r="4" />
    </svg>
  ),

  // Make.com
  make: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || 'h-full w-full'}>
      <circle cx="7" cy="12" r="3.5" />
      <circle cx="17" cy="12" r="3.5" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  ),
};

// Brand Styling Config for specific tool IDs or names
const BRAND_STYLES: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'chatgpt': { bg: 'bg-emerald-950/80', text: 'text-emerald-400', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20' },
  'claude-ai': { bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-500/40', glow: 'shadow-amber-500/20' },
  'perplexity-ai': { bg: 'bg-cyan-950/80', text: 'text-cyan-400', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20' },
  'notion-ai': { bg: 'bg-zinc-900', text: 'text-white', border: 'border-zinc-700', glow: 'shadow-white/10' },
  'cursor-ide': { bg: 'bg-blue-950/80', text: 'text-blue-400', border: 'border-blue-500/40', glow: 'shadow-blue-500/20' },
  'github-copilot': { bg: 'bg-purple-950/80', text: 'text-purple-300', border: 'border-purple-500/40', glow: 'shadow-purple-500/20' },
  'midjourney': { bg: 'bg-indigo-950/80', text: 'text-indigo-300', border: 'border-indigo-500/40', glow: 'shadow-indigo-500/20' },
  'gamma-app': { bg: 'bg-fuchsia-950/80', text: 'text-fuchsia-400', border: 'border-fuchsia-500/40', glow: 'shadow-fuchsia-500/20' },
  'elevenlabs-voice': { bg: 'bg-slate-900', text: 'text-cyan-400', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20' },
  'runway-gen3': { bg: 'bg-pink-950/80', text: 'text-pink-400', border: 'border-pink-500/40', glow: 'shadow-pink-500/20' },
  'v0-vercel': { bg: 'bg-zinc-950', text: 'text-white', border: 'border-zinc-700', glow: 'shadow-white/10' },
  'ramp-ai': { bg: 'bg-lime-950/80', text: 'text-lime-400', border: 'border-lime-500/40', glow: 'shadow-lime-500/20' },
  'brex-ai': { bg: 'bg-orange-950/80', text: 'text-orange-400', border: 'border-orange-500/40', glow: 'shadow-orange-500/20' },
  'clickup-brain': { bg: 'bg-violet-950/80', text: 'text-violet-400', border: 'border-violet-500/40', glow: 'shadow-violet-500/20' },
  'asana-intelligence': { bg: 'bg-rose-950/80', text: 'text-rose-400', border: 'border-rose-500/40', glow: 'shadow-rose-500/20' },
  'make-ai': { bg: 'bg-purple-950/80', text: 'text-purple-400', border: 'border-purple-500/40', glow: 'shadow-purple-500/20' },
  'canva-magic-studio': { bg: 'bg-teal-950/80', text: 'text-teal-400', border: 'border-teal-500/40', glow: 'shadow-teal-500/20' },
  'jasper-ai': { bg: 'bg-amber-950/80', text: 'text-amber-400', border: 'border-amber-500/40', glow: 'shadow-amber-500/20' },
  'julius-ai': { bg: 'bg-blue-950/80', text: 'text-blue-400', border: 'border-blue-500/40', glow: 'shadow-blue-500/20' },
};

export const ToolIcon: React.FC<ToolIconProps> = ({
  tool,
  name,
  websiteUrl,
  categoryId,
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const toolName = tool?.name || name || 'AI Tool';
  const toolId = tool?.id || '';
  const url = tool?.website_url || tool?.official_url || websiteUrl || '';
  const cat = (tool?.category_id || categoryId || '').toLowerCase();
  const iconUrl = (tool as any)?.icon_url;

  // Extract clean domain hostname for favicon fetching
  const getDomain = (rawUrl: string): string => {
    if (!rawUrl) return '';
    try {
      const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  const domain = getDomain(url);
  const brandKey = Object.keys(BRAND_LOGOS).find(
    (k) => toolId.includes(k) || toolName.toLowerCase().includes(k) || domain.includes(k)
  );

  const brandStyle = BRAND_STYLES[toolId] || {
    bg: 'bg-slate-950',
    text: 'text-indigo-400',
    border: 'border-slate-800',
    glow: 'shadow-indigo-500/10',
  };

  // Size mapping
  const sizeClasses = {
    xs: 'h-6 w-6 rounded-md text-xs',
    sm: 'h-8 w-8 rounded-lg text-xs',
    md: 'h-11 w-11 rounded-xl text-sm',
    lg: 'h-14 w-14 rounded-2xl text-base',
    xl: 'h-16 w-16 rounded-2xl text-lg',
  };

  const iconSizeClasses = {
    xs: 'h-3.5 w-3.5',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
    xl: 'h-8 w-8',
  };

  const imgSizeClasses = {
    xs: 'h-3.5 w-3.5 rounded-sm object-contain',
    sm: 'h-5 w-5 rounded-sm object-contain',
    md: 'h-6 w-6 rounded-md object-contain',
    lg: 'h-8 w-8 rounded-lg object-contain',
    xl: 'h-9 w-9 rounded-lg object-contain',
  };

  // Preferred Favicon URL
  const faviconUrl = iconUrl || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null);

  // Fallback category Lucide icon
  const getCategoryFallback = () => {
    const iconClass = `${iconSizeClasses[size]} ${brandStyle.text}`;

    if (cat.includes('finance') || cat.includes('accounting')) return <DollarSign className={iconClass} />;
    if (cat.includes('business') || cat.includes('management')) return <Briefcase className={iconClass} />;
    if (cat.includes('spreadsheet') || cat.includes('excel')) return <Table className={iconClass} />;
    if (cat.includes('presentation') || cat.includes('slide')) return <Presentation className={iconClass} />;
    if (cat.includes('video')) return <Video className={iconClass} />;
    if (cat.includes('image') || cat.includes('design') || cat.includes('photo')) return <ImageIcon className={iconClass} />;
    if (cat.includes('audio') || cat.includes('voice') || cat.includes('speech')) return <Mic className={iconClass} />;
    if (cat.includes('code') || cat.includes('dev') || cat.includes('engineering')) return <Code2 className={iconClass} />;
    if (cat.includes('research') || cat.includes('search')) return <Search className={iconClass} />;
    if (cat.includes('marketing') || cat.includes('ad')) return <Megaphone className={iconClass} />;
    if (cat.includes('agent') || cat.includes('assistant') || cat.includes('bot')) return <Bot className={iconClass} />;
    
    return <Sparkles className={iconClass} />;
  };

  const BrandSvg = brandKey ? BRAND_LOGOS[brandKey] : null;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 border transition-all duration-200 overflow-hidden shadow-inner ${
        brandStyle.bg
      } ${brandStyle.border} ${sizeClasses[size]} ${
        showGlow ? `shadow-md ${brandStyle.glow}` : ''
      } ${className}`}
      title={toolName}
    >
      {/* 1. First priority: High-Res Official Brand Favicon */}
      {faviconUrl && !imageFailed ? (
        <img
          src={faviconUrl}
          alt={`${toolName} logo`}
          className={imgSizeClasses[size]}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : BrandSvg ? (
        /* 2. Second priority: Handcrafted crisp Brand SVG */
        <div className={`${iconSizeClasses[size]} ${brandStyle.text} flex items-center justify-center`}>
          <BrandSvg />
        </div>
      ) : (
        /* 3. Third priority: Category-tailored vibrant Icon */
        getCategoryFallback()
      )}
    </div>
  );
};
