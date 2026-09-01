import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

export const FileAIView: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>('Q3_Corporate_Financial_Statement.xlsx');
  const [analysisResult, setAnalysisResult] = useState<string | null>(
    `## OmniAI Multimodal File Analysis: Q3_Corporate_Financial_Statement.xlsx\n\n### 1. Key Metrics Extracted\n- **Gross Revenue**: $4,850,000 (+22% YoY)\n- **Operating Expenses**: $3,120,000 (Within 4% budget forecast)\n- **Net Margin**: 35.6% (Expansion driven by automated AP reconciliation via Vic.ai)\n- **Projected Cash Runway**: 19.4 months\n\n### 2. Strategic Anomalies Detected\n- Software subscription line items jumped 38% in September. Recommend audit via Ramp Intelligence.\n- 14 vendor payments pending 3-way PO match.\n\n### 3. Recommended Next Actions\n- Export to Excel model in Julius AI for Monte Carlo simulation\n- Generate executive presentation deck with Presentation Agent.`
  );

  const handleSimulateUpload = (fileName: string) => {
    setSelectedFile(fileName);
    setAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult(
        `## OmniAI Deep Extraction: ${fileName}\n\n- File scanned with Gemini multimodal parser.\n- 100% text, tables, and numeric vector embeddings indexed.\n- Ready for conversational querying, automated summarization, or agent workflow ingestion.`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">File AI Intelligence Studio</h2>
        <p className="text-sm text-slate-400">
          Upload PDF reports, Excel spreadsheets, CSV data, or codebases for instant multi-agent analysis and extraction.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) {
            handleSimulateUpload(e.dataTransfer.files[0].name);
          }
        }}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? 'border-indigo-400 bg-indigo-950/40'
            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-400">
          <UploadCloud className="h-7 w-7" />
        </div>
        <h3 className="mt-3 text-base font-bold text-white">Drag and drop documents or click to browse</h3>
        <p className="mt-1 text-xs text-slate-400">
          Supports PDF, XLSX, CSV, JSON, Markdown, DOCX up to 100MB
        </p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleSimulateUpload('Tech_Product_Roadmap_2026.pdf')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
          >
            📄 Sample: Tech_Product_Roadmap.pdf
          </button>
          <button
            onClick={() => handleSimulateUpload('Sales_Pipeline_Q4_Export.csv')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
          >
            📊 Sample: Sales_Pipeline_Q4.csv
          </button>
        </div>
      </div>

      {/* Analysis Output */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">Active Document: {selectedFile}</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Vector Context Loaded
          </span>
        </div>

        {analyzing ? (
          <div className="flex items-center justify-center py-12 text-slate-400 space-x-3">
            <RotateCcw className="h-5 w-5 animate-spin text-indigo-400" />
            <span>Parsing multimodal structure and running semantic analysis...</span>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
            {analysisResult}
          </div>
        )}
      </div>
    </div>
  );
};
