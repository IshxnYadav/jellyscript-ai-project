
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Copy, 
  RefreshCw, 
  Send, 
  Check, 
  Settings, 
  Zap, 
  Sparkles,
  Cpu,
  ArrowRight,
  Layout,
  Clock,
  Code,
  AlertCircle
} from 'lucide-react';
import Navbar from './components/Navbar';
import AdUnit from './components/AdUnit';
import { GeminiService } from './geminiService';
import { PromptConfig, PromptFramework, AppState, SavedPrompt } from './types';
import { FRAMEWORKS, TONES, PERSONAS } from './constants';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentInput: '',
    isLoading: false,
    result: null,
    history: [],
    config: {
      framework: PromptFramework.BASIC,
      tone: 'Professional & Authoritative',
      persona: 'Expert Consultant (Strategy)',
      negativeConstraints: '',
      targetModel: 'Generic',
      includeSteps: true,
    }
  });

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ideate' | 'refine'>('ideate');
  const [error, setError] = useState<string | null>(null);
  
  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jellyscript_v2_history');
    if (saved) {
      setState(prev => ({ ...prev, history: JSON.parse(saved) }));
    }
  }, []);

  const saveToHistory = (item: SavedPrompt) => {
    const newHistory = [item, ...state.history].slice(0, 10);
    setState(prev => ({ ...prev, history: newHistory }));
    localStorage.setItem('jellyscript_v2_history', JSON.stringify(newHistory));
  };

  const handleGenerate = async () => {
    if (!state.currentInput.trim()) return;

    setError(null);
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const gemini = GeminiService.getInstance();
      const engineered = await gemini.generatePrompt(state.currentInput, state.config);
      
      const newPrompt: SavedPrompt = {
        id: Math.random().toString(36).substr(2, 9),
        originalIdea: state.currentInput,
        refinedPrompt: engineered,
        framework: state.config.framework,
        timestamp: Date.now()
      };

      setState(prev => ({ ...prev, result: engineered, isLoading: false }));
      saveToHistory(newPrompt);
      setActiveTab('refine');
      
      if (window.innerWidth < 1024) {
        studioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateConfig = (updates: Partial<PromptConfig>) => {
    setState(prev => ({ ...prev, config: { ...prev.config, ...updates } }));
  };

  const metrics = useMemo(() => {
    const chars = state.currentInput.length;
    const tokens = Math.ceil(chars / 4);
    return { chars, tokens };
  }, [state.currentInput]);

  return (
    <div className="min-h-screen pb-12 selection:bg-indigo-500/30">
      <Navbar />

      {/* Hero */}
      <header className="pt-32 pb-16 px-6 max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5 text-[9px] font-black text-zinc-500 mb-8 uppercase tracking-[0.2em] backdrop-blur-sm">
          <Sparkles size={10} className="text-indigo-400" />
          Enterprise Prompt Engineering
        </div>
        
        <h1 className="font-jakarta text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1] text-shimmer">
          Engineered Intelligence.<br />
          <span className="text-zinc-600">Built for Scale.</span>
        </h1>
        
        <p className="text-zinc-400 text-sm md:text-lg max-w-xl mx-auto mb-10 font-medium leading-relaxed">
          The industry benchmark for prompt synthesis. Transform vague intent into world-class logic across all major LLMs.
        </p>

        <button 
          onClick={() => studioRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="group px-8 py-4 rounded-xl jelly-gradient text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 mx-auto shadow-xl shadow-indigo-500/20"
        >
          Enter Studio <ArrowRight size={16} />
        </button>
      </header>

      {/* Main Workbench */}
      <main id="studio" ref={studioRef} className="max-w-[1400px] mx-auto px-4 md:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Logic Modules */}
          <aside className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            <div className="flex items-center gap-2 px-2 py-1">
              <Layout size={12} className="text-zinc-500" />
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logic Modules</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {FRAMEWORKS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateConfig({ framework: f.id })}
                  className={`flex items-start gap-3 p-4 rounded-2xl border transition-all text-left relative overflow-hidden group ${
                    state.config.framework === f.id 
                    ? 'bg-zinc-900 border-indigo-500/30 shadow-lg' 
                    : 'bg-zinc-950/20 border-white/5 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${state.config.framework === f.id ? 'bg-indigo-500 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                    {f.icon}
                  </div>
                  <div className="flex flex-col pr-2">
                    <span className={`text-[11px] font-bold ${state.config.framework === f.id ? 'text-white' : 'text-zinc-400'}`}>
                      {f.label}
                    </span>
                    <p className="text-[9px] text-zinc-600 font-medium leading-snug line-clamp-1 group-hover:line-clamp-none transition-all">
                      {f.desc}
                    </p>
                  </div>
                  {state.config.framework === f.id && <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>}
                </button>
              ))}
            </div>
          </aside>

          {/* Center: Creative Canvas */}
          <section className="lg:col-span-6 order-1 lg:order-2">
            <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border-white/5 h-full min-h-[500px] lg:h-[650px]">
              <div className="px-6 py-4 border-b border-white/5 bg-zinc-950/40 flex items-center justify-between">
                <div className="flex gap-6">
                  {['ideate', 'refine'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`text-[10px] font-black uppercase tracking-widest transition-all relative py-2 ${activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      {tab === 'ideate' ? 'Draft' : 'Final Build'}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full"></div>}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-tighter">Live Engine</span>
                </div>
              </div>

              <div className="flex-grow relative bg-zinc-950/20 overflow-hidden flex flex-col">
                {activeTab === 'ideate' ? (
                  <textarea
                    value={state.currentInput}
                    onChange={(e) => setState(prev => ({ ...prev, currentInput: e.target.value }))}
                    placeholder="Describe your prompt objective in plain English..."
                    className="w-full h-full p-8 md:p-10 bg-transparent text-lg md:text-xl font-medium focus:outline-none placeholder:text-zinc-800 resize-none leading-relaxed text-zinc-100 studio-input custom-scrollbar"
                  />
                ) : (
                  <div className="p-8 md:p-10 h-full overflow-y-auto font-mono text-xs md:text-sm leading-loose text-zinc-400 animate-in fade-in slide-in-from-bottom-2 duration-300 custom-scrollbar">
                    {state.result ? (
                      <div className="whitespace-pre-wrap select-all selection:bg-indigo-500/20 bg-zinc-900/20 p-6 md:p-8 rounded-2xl border border-white/5 shadow-inner">
                        {state.result}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4 py-20">
                        <Code size={48} />
                        <p className="text-sm font-sans text-center max-w-xs">Run the synthesizer to architect your production-ready prompt.</p>
                      </div>
                    )}
                  </div>
                )}

                {state.isLoading && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <RefreshCw size={32} className="text-indigo-500 animate-spin" />
                      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 animate-pulse">Synthesis in progress</span>
                  </div>
                )}

                {error && (
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                    <AlertCircle size={16} className="text-red-400" />
                    <span className="text-xs font-bold text-red-400">{error}</span>
                  </div>
                )}
              </div>

              <div className="p-5 md:p-6 bg-zinc-950/60 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Characters</span>
                    <span className="text-[11px] font-bold text-zinc-300">{metrics.chars}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Est. Tokens</span>
                    <span className="text-[11px] font-bold text-zinc-300">~{metrics.tokens}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {state.result && (
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(state.result || '');
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex-1 sm:flex-none h-12 px-6 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy Output'}
                    </button>
                  )}
                  <button
                    onClick={handleGenerate}
                    disabled={state.isLoading || !state.currentInput.trim()}
                    className="flex-1 sm:flex-none h-12 px-10 rounded-xl jelly-gradient text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20"
                  >
                    <Send size={14} /> Synthesize
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Controls & Ad Slot 1 */}
          <aside className="lg:col-span-3 space-y-4 order-3">
            <div className="px-2 py-1 flex items-center gap-2">
              <Settings size={12} className="text-zinc-500" />
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Parameters</h3>
            </div>
            <div className="glass-panel rounded-[2rem] p-6 space-y-6 border-white/5">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Output Tone</label>
                <select 
                  value={state.config.tone}
                  onChange={(e) => updateConfig({ tone: e.target.value })}
                  className="w-full h-12 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 text-[11px] font-bold text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:bg-zinc-800 transition-colors"
                >
                  {TONES.map(t => <option key={t} value={t} className="bg-zinc-950">{t}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Expert Persona</label>
                <select 
                  value={state.config.persona}
                  onChange={(e) => updateConfig({ persona: e.target.value })}
                  className="w-full h-12 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 text-[11px] font-bold text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:bg-zinc-800 transition-colors"
                >
                  {PERSONAS.map(p => <option key={p} value={p} className="bg-zinc-950">{p}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Strict Constraints</label>
                <textarea 
                  placeholder="e.g. No jargon..."
                  value={state.config.negativeConstraints}
                  onChange={(e) => updateConfig({ negativeConstraints: e.target.value })}
                  className="w-full h-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-[10px] text-zinc-400 focus:outline-none resize-none placeholder:text-zinc-800"
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Show Steps</span>
                <button 
                  onClick={() => updateConfig({ includeSteps: !state.config.includeSteps })}
                  className={`w-10 h-5 rounded-full transition-all relative ${state.config.includeSteps ? 'jelly-gradient' : 'bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${state.config.includeSteps ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Sidebar Ad Unit - Added w-full to prevent availableWidth=0 */}
              <div className="w-full">
                <AdUnit slot="0000000001" format="rectangle" className="mt-6" />
              </div>
            </div>
          </aside>
        </div>

        {/* Ad Slot 2: Horizontal Banner - Explicitly centered with stable width */}
        <div className="mt-16 w-full max-w-4xl mx-auto px-4">
          <AdUnit slot="0000000002" format="auto" />
        </div>

        {/* History / Vault */}
        {state.history.length > 0 && (
          <section className="mt-16 py-12 border-t border-white/5">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-zinc-500" />
                <h2 className="text-xl font-bold font-jakarta text-shimmer">Local Vault</h2>
              </div>
              <button 
                onClick={() => { setState(prev => ({ ...prev, history: [] })); localStorage.removeItem('jellyscript_v2_history'); }}
                className="text-[9px] font-black text-zinc-700 hover:text-red-400 uppercase tracking-[0.2em] transition-colors"
              >
                Flush History
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {state.history.map((h) => (
                <div 
                  key={h.id} 
                  onClick={() => {
                    setState(prev => ({ ...prev, result: h.refinedPrompt, currentInput: h.originalIdea }));
                    setActiveTab('refine');
                    studioRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group p-5 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400/60">{h.framework}</span>
                    <span className="text-[8px] text-zinc-700 font-mono">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 line-clamp-2 italic font-medium leading-relaxed group-hover:text-zinc-300 transition-colors">"{h.originalIdea}"</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-32 pt-16 border-t border-white/5 bg-[#030305] px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg jelly-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-jakarta text-xl font-black text-white">JellyScript<span className="text-indigo-400">.ai</span></span>
           </div>
           <div className="flex gap-10 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Systems</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
