import React, { useState } from 'react';
import { useOmniAI } from '../../context/OmniAIContext';
import { AITool, AccessType, PricingType } from '../../types';
import { ToolIcon } from '../common/ToolIcon';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Globe,
  Star,
  Zap,
  Save,
  Shield,
} from 'lucide-react';

interface AdminDirectoryModalProps {
  onClose: () => void;
}

export const AdminDirectoryModal: React.FC<AdminDirectoryModalProps> = ({ onClose }) => {
  const { tools, categories, addTool, updateTool, deleteTool } = useOmniAI();
  const [editingToolId, setEditingToolId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'finance-accounting');
  const [description, setDescription] = useState('');
  const [officialUrl, setOfficialUrl] = useState('');
  const [verifiedOfficial, setVerifiedOfficial] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [pricingType, setPricingType] = useState<PricingType>('Freemium');
  const [accessType, setAccessType] = useState<AccessType>('hybrid');
  const [tagsInput, setTagsInput] = useState('');
  const [capabilitiesInput, setCapabilitiesInput] = useState('');

  const handleStartEdit = (tool: AITool) => {
    setEditingToolId(tool.id);
    setName(tool.name);
    setProvider(tool.provider);
    setCategoryId(tool.category_id);
    setDescription(tool.description);
    setOfficialUrl(tool.official_url || '');
    setVerifiedOfficial(tool.verified_official);
    setIsDemo(tool.is_demo);
    setPricingType(tool.pricing_type);
    setAccessType(tool.access_type);
    setTagsInput(tool.tags.join(', '));
    setCapabilitiesInput(tool.capabilities.join(', '));
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      alert('Name and Description are required.');
      return;
    }

    const matchedCategory = categories.find((c) => c.id === categoryId);
    const toolPayload: AITool = {
      id: editingToolId || `tool-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      provider: provider || name,
      category_id: categoryId,
      category_name: matchedCategory?.name || 'AI Software',
      description,
      website_url: officialUrl.trim() || 'https://example.com',
      official_url: officialUrl.trim() || 'https://example.com',
      verified_official: verifiedOfficial,
      is_demo: isDemo,
      pricing_type: pricingType,
      pricing_details: pricingType === 'Free' ? 'Free tier available' : 'Standard subscription',
      free_plan: pricingType === 'Free' || pricingType === 'Freemium',
      api_available: accessType === 'api' || accessType === 'hybrid',
      mcp_available: accessType === 'mcp' || accessType === 'hybrid',
      access_type: accessType,
      capabilities: capabilitiesInput.split(',').map((s) => s.trim()).filter(Boolean),
      tags: tagsInput.split(',').map((s) => s.trim()).filter(Boolean),
      use_cases: ['General Task Automation'],
      featured: true,
      popular: true,
      status: 'Available',
      rating: 4.8,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingToolId) {
      updateTool(editingToolId, toolPayload);
    } else {
      addTool(toolPayload);
    }

    // Reset
    setShowAddForm(false);
    setEditingToolId(null);
    setName('');
    setDescription('');
    setOfficialUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Tools Registry Management (Admin)</h2>
              <p className="text-xs text-slate-400">Add, edit, delete, or verify official AI tools in the directory</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-950 p-2 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Tools Registered: {tools.length}
            </span>
            <button
              onClick={() => {
                setEditingToolId(null);
                setName('');
                setDescription('');
                setOfficialUrl('');
                setShowAddForm(!showAddForm);
              }}
              className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{showAddForm ? 'Cancel Form' : 'Register New Tool'}</span>
            </button>
          </div>

          {/* Form */}
          {showAddForm && (
            <div className="rounded-xl border border-indigo-500/30 bg-slate-950 p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">
                {editingToolId ? 'Edit Tool Information' : 'Add New Tool to Directory'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tool Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramp AI"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Provider / Company</label>
                  <input
                    type="text"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    placeholder="e.g. Ramp Financial Inc"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.clusterGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Official Website URL</label>
                  <input
                    type="text"
                    value={officialUrl}
                    onChange={(e) => setOfficialUrl(e.target.value)}
                    placeholder="e.g. https://ramp.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Access Type</label>
                  <select
                    value={accessType}
                    onChange={(e) => setAccessType(e.target.value as AccessType)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  >
                    <option value="external">External Only</option>
                    <option value="api">API Direct</option>
                    <option value="mcp">MCP Bridge</option>
                    <option value="embedded">In-App Sandbox</option>
                    <option value="hybrid">Hybrid (External + In-App)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Pricing Model</label>
                  <select
                    value={pricingType}
                    onChange={(e) => setPricingType(e.target.value as PricingType)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Open Source">Open Source</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="Concise overview of what this AI software does..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Finance, Accounting, Automation"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 p-2 text-white focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Tool</span>
                </button>
              </div>
            </div>
          )}

          {/* Tool Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="divide-y divide-slate-800 text-xs">
              {tools.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 hover:bg-slate-900/60">
                  <div className="flex items-center space-x-3 min-w-0 pr-3">
                    <ToolIcon tool={t} size="sm" />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white truncate">{t.name}</span>
                        <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-indigo-300">
                          {t.category_name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => handleStartEdit(t)}
                      className="rounded p-1.5 text-slate-400 hover:text-white hover:bg-slate-800"
                      title="Edit"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${t.name}?`)) {
                          deleteTool(t.id);
                        }
                      }}
                      className="rounded p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
