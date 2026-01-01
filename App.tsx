import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Copy, 
  RefreshCw, 
  Send, 
  Check, 
  Settings, 
  Zap, 
  Sparkles,
  ArrowRight,
  Layout,
  Clock,
  Code,
  AlertCircle,
  Plus,
  Minus,
  ChevronRight,
  Shield,
  Layers as LayersIcon,
  Focus,
  Search,
  Binary,
  Workflow,
  Cpu,
  BarChart3,
  Globe,
  Database,
  Lock,
  CheckCircle2,
  Terminal,
  ZapIcon,
  Activity,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Zap as ZapBolt
} from 'lucide-react';
import Navbar from './components/Navbar';
import { GeminiService } from './geminiService';
import { PromptConfig, PromptFramework, AppState, SavedPrompt } from './types';
import { FRAMEWORKS, TONES, PERSONAS, METHODOLOGY, FAQS, FEATURES, USE_CASES, COMPATIBILITY } from './constants';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-sm md:text-base font-bold transition-colors ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 p-1 rounded-full transition-all ${isOpen ? 'bg-indigo-500 text-white rotate-180' : 'bg-zinc-900 text-zinc-500'}`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

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

  const [studioActive, setStudioActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ideate' | 'refine'>('ideate');
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [statPulse, setStatPulse] = useState(0);
  
  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jellyscript_v2_history');
    if (saved) {
      setState(prev => ({ ...prev, history: JSON.parse(saved) }));
    }
    
    const stepInterval = setInterval(() => {
      setActiveStep(s => (s + 1) % 4);
    }, 4000);

    const statInterval = setInterval(() => {
      setStatPulse(prev => (prev + 1) % 100);
    }, 2000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(statInterval);
    };
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
    } catch (err: any) {
      setError(err.message || "Synthesis failed.");
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateConfig = (updates: Partial<PromptConfig>) => {
    setState(prev => ({ ...prev, config: { ...prev.config, ...updates } }));
  };

  const enterStudio = () => {
    setStudioActive(true);
    setTimeout(() => {
      studioRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const metrics = useMemo(() => ({
    chars: state.currentInput.length,
    tokens: Math.ceil(state.currentInput.length / 4)
  }), [state.currentInput]);

  return (
    <div className="min-h-screen pb-12 selection:bg-indigo-500/30">
      <Navbar />

      {/* DISCOVERY PHASE: MULTI-SECTION LANDING */}
      {!studioActive && (
        <div className="animate-in fade-in duration-1000">
          
          {/* Section 1: Hero */}
          <header className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10"></div>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Sparkles size={10} className="text-indigo-400" /> Enterprise Prompt Engineering
              </div>
              <h1 className="text-4xl md:text-7xl font-black font-jakarta text-shimmer leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                Engineered Intelligence. <br /> Built for Scale.
              </h1>
              <p className="max-w-2xl mx-auto text-xs md:text-base text-zinc-500 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                The industry benchmark for prompt synthesis. Transform vague intent into world-class logic across all major LLMs with professional architectural frameworks.
              </p>
              <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                <button 
                  onClick={enterStudio}
                  className="h-12 px-8 rounded-xl jelly-gradient text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_15px_50px_-10px_rgba(99,102,241,0.6)] flex items-center gap-3 mx-auto group"
                >
                  Enter Studio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </header>

          {/* Section 2: Methodology Grid (MOVED ABOVE LIFECYCLE) */}
          <section className="py-24 px-6 bg-zinc-950/20 border-t border-white/5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">Frameworks</div>
                <h2 className="text-2xl md:text-4xl font-extrabold font-jakarta text-shimmer leading-tight">Beyond Prompting. <br /><span className="text-zinc-600">Pure Engineering.</span></h2>
                <div className="flex flex-col gap-4">
                  {METHODOLOGY.map((step, idx) => (
                    <div key={idx} className="flex gap-5 p-4 rounded-xl bg-zinc-900/40 border border-white/5 group hover:border-white/10 transition-all">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border border-white/5">{step.icon}</div>
                      <div>
                        <h4 className="text-xs font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative glass-panel rounded-[1.5rem] border-white/5 p-8 md:p-12 overflow-hidden">
                  <div className="space-y-6 relative z-10">
                    <div className="w-10 h-10 rounded-xl jelly-gradient flex items-center justify-center shadow-2xl"><Zap size={20} className="text-white" /></div>
                    <h3 className="text-xl font-bold font-jakarta text-white">Prompt DNA</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3"><ChevronRight className="text-indigo-400 mt-1 flex-shrink-0" size={14} /><p className="text-xs text-zinc-400 leading-relaxed"><strong>Token Density:</strong> Trimming syntactic fillers.</p></div>
                      <div className="flex items-start gap-3"><ChevronRight className="text-indigo-400 mt-1 flex-shrink-0" size={14} /><p className="text-xs text-zinc-400 leading-relaxed"><strong>Logic Gates:</strong> Hard-coded operational bounds.</p></div>
                      <div className="flex items-start gap-3"><ChevronRight className="text-indigo-400 mt-1 flex-shrink-0" size={14} /><p className="text-xs text-zinc-400 leading-relaxed"><strong>Persona Wrappers:</strong> Authority-based grounding.</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Synthesis Workflow (Animated Lifecycle) */}
          <section className="py-24 px-6 relative border-t border-white/5 bg-[#050507]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">The Lifecycle</div>
                <h2 className="text-3xl md:text-5xl font-extrabold font-jakarta text-white">Synthesis Workflow</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10"></div>
                {[
                  { label: "Semantic Ingestion", icon: <Search />, desc: "Linguistic filtering of raw natural language inputs." },
                  { label: "Intent Mapping", icon: <Binary />, desc: "Isolating core objectives and removing noise." },
                  { label: "Structural Layering", icon: <Workflow />, desc: "Applying RTF or CoT for architectural integrity." },
                  { label: "Token Synthesis", icon: <ZapBolt />, desc: "Final output optimization for attention priority." }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 border ${activeStep >= i ? 'bg-zinc-900 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] scale-110' : 'bg-zinc-950 border-white/5 opacity-40'}`}>
                      {React.cloneElement(step.icon as React.ReactElement, { size: 24, className: activeStep === i ? 'text-indigo-400' : 'text-zinc-600' })}
                    </div>
                    <h4 className={`mt-8 text-[10px] font-black uppercase tracking-widest ${activeStep >= i ? 'text-white' : 'text-zinc-700'}`}>Phase 0{i+1}</h4>
                    <p className={`mt-2 text-sm font-bold ${activeStep >= i ? 'text-indigo-400' : 'text-zinc-700'}`}>{step.label}</p>
                    <p className="mt-4 text-[11px] text-zinc-600 leading-relaxed font-medium max-w-[200px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Real-time Metrics (Professional Stats) */}
          <section className="py-24 px-6 border-y border-white/5 bg-[#050507]">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { val: "98.4%", label: "Synthesis Accuracy" },
                { val: "400ms", label: "Latency Benchmark" },
                { val: "10K+", label: "Engineered Vaults" },
                { val: "24/7", label: "Logic Uptime" }
              ].map((s, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-2xl md:text-4xl font-black font-jakarta text-white tracking-tighter">{s.val}</div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Core Capabilities Grid */}
          <section className="py-24 px-6 bg-zinc-950/20">
            <div className="max-w-6xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-8">System Architecture</div>
              <h2 className="text-3xl md:text-5xl font-extrabold font-jakarta text-white mb-16">Universal Logic Engine</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((f, i) => (
                  <div key={i} className="glass-panel p-10 rounded-[2.5rem] border-white/5 group hover:border-indigo-500/30 transition-all hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      {React.cloneElement(f.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <h4 className="text-base font-bold text-white mb-4">{f.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 6: Industry Verticals */}
          <section className="py-24 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] mb-8">Applicability</div>
                <h2 className="text-3xl md:text-5xl font-extrabold font-jakarta text-white mb-8 leading-tight">Professional Standards for <br/><span className="text-zinc-600">Every Vertical.</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {USE_CASES.map((uc, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-purple-500/20 transition-all">
                      <div className="mb-4">{uc.icon}</div>
                      <h5 className="text-xs font-bold text-white mb-1">{uc.title}</h5>
                      <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 bg-indigo-500/10 blur-[120px] rounded-full"></div>
                <div className="relative glass-panel rounded-[2rem] p-12 border-white/5 overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /><span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">SaaS Product Roadmaps</span></div>
                    <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /><span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Scientific Peer Review</span></div>
                    <div className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /><span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">Cloud Architecture</span></div>
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-[11px] text-zinc-500 italic">"The RTF synthesis logic is the most reliable way we've found to ground our enterprise LLM nodes."</p>
                    <p className="mt-4 text-[10px] font-bold text-white uppercase tracking-widest">— CTO, NEXUS</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Security Vault (Privacy Focus) */}
          <section className="py-24 px-6 bg-[#070709]">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8 shadow-2xl active-glow">
                <Lock size={28} className="text-indigo-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold font-jakarta text-white">Privacy by Architecture.</h2>
              <p className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">No cloud databases. Your engineered logic stays in your <strong>Local Vault</strong>—encrypted in your browser. We never see your intellectual property.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-black text-zinc-400 uppercase tracking-widest"><ShieldCheck size={12} className="text-emerald-500" /> 100% Local</div>
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-black text-zinc-400 uppercase tracking-widest"><Terminal size={12} className="text-indigo-500" /> Zero Server Logs</div>
              </div>
            </div>
          </section>

          {/* Section 8: Compatibility Matrix */}
          <section className="py-24 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-2xl font-bold font-jakarta text-white mb-4">Universal Model Support</h2>
                <p className="text-zinc-500 text-xs">Seamlessly deploy synthesized logic to any major architecture.</p>
              </div>
              <div className="glass-panel rounded-3xl border-white/5 overflow-hidden shadow-2xl">
                <div className="grid grid-cols-3 bg-zinc-900/40 p-5 text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5">
                  <div>Model Node</div>
                  <div>Status</div>
                  <div className="text-right">Latency</div>
                </div>
                {COMPATIBILITY.map((c, i) => (
                  <div key={i} className="grid grid-cols-3 p-6 text-xs font-medium border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                    <div className="text-zinc-100 flex items-center gap-2"><Cpu size={14} className="text-indigo-400/60" /> {c.name}</div>
                    <div className="text-emerald-500 flex items-center gap-2"><Check size={12} /> {c.status}</div>
                    <div className="text-right text-zinc-500 font-mono">{c.delay}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 9: FAQ Section */}
          <section className="py-24 px-6 border-t border-white/5 bg-zinc-950/20">
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-16 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">F.A.Q</div>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-jakarta text-white">Expert Consultation</h2>
               </div>
               <div className="glass-panel rounded-[1.5rem] border-white/5 px-8 md:px-10 py-4 shadow-xl">
                  {FAQS.map((faq, idx) => <FAQItem key={idx} question={faq.question} answer={faq.answer} />)}
               </div>
            </div>
          </section>

          {/* Section 10: Final CTA Section */}
          <section className="py-32 px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-6xl font-black font-jakarta text-white">Ready for the Studio?</h2>
              <button 
                onClick={enterStudio}
                className="h-14 px-10 rounded-xl jelly-gradient text-white font-black text-xs uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_60px_-10px_rgba(99,102,241,0.6)] flex items-center gap-4 mx-auto group"
              >
                Initialize Workspace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* WORKBENCH (Studio View) */}
      {studioActive && (
        <main 
          id="studio" 
          ref={studioRef} 
          className="max-w-[1400px] mx-auto px-4 md:px-8 pt-24 animate-in fade-in slide-in-from-bottom-10 duration-700"
        >
          <div className="max-w-4xl mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[9px] font-black text-zinc-500 mb-6 uppercase tracking-[0.2em]"><Sparkles size={10} className="text-indigo-400" />Active Synthesizer v2.1</div>
              <h2 className="font-jakarta text-2xl md:text-3xl font-extrabold tracking-tight text-shimmer leading-tight">Precision Synthesis Studio.</h2>
            </div>
            <button 
              onClick={() => {
                setStudioActive(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="text-[9px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors mb-2"
            >
              Back to Overview
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: Logic Modules */}
            <aside className="lg:col-span-3 space-y-4 order-2 lg:order-1">
              <div className="flex items-center gap-2 px-2 py-1"><Layout size={12} className="text-zinc-500" /><h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logic Modules</h3></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {FRAMEWORKS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateConfig({ framework: f.id })}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left relative overflow-hidden group ${state.config.framework === f.id ? 'bg-zinc-900 border-indigo-500/30 shadow-lg' : 'bg-zinc-950/20 border-white/5 hover:bg-zinc-900/40'}`}
                  >
                    <div className={`p-2 rounded-lg ${state.config.framework === f.id ? 'bg-indigo-500 text-white' : 'bg-zinc-900 text-zinc-500'}`}>{f.icon}</div>
                    <div className="flex flex-col pr-2">
                      <span className={`text-[10px] font-bold ${state.config.framework === f.id ? 'text-white' : 'text-zinc-400'}`}>{f.label}</span>
                      <p className="text-[8px] text-zinc-600 font-medium leading-snug line-clamp-1">{f.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {/* Central Editor: Draft & Final Build */}
            <section className="lg:col-span-6 order-1 lg:order-2">
              <div className="glass-panel rounded-[1.5rem] overflow-hidden flex flex-col shadow-2xl border-white/5 min-h-[500px] lg:h-[600px]">
                {/* Editor Header with Tabs & Live Engine Icon */}
                <div className="px-6 py-4 border-b border-white/5 bg-zinc-950/40 flex items-center justify-between">
                  <div className="flex gap-6">
                    {['ideate', 'refine'].map((tab) => (
                      <button key={tab} onClick={() => setActiveTab(tab as any)} className={`text-[9px] font-black uppercase tracking-widest transition-all relative py-2 ${activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>
                        {tab === 'ideate' ? 'Draft' : 'Final Build'}{activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                  
                  {/* Pulsing Live Engine Indicator */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 active-glow"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-emerald-500/60 uppercase tracking-[0.2em] leading-none">Live Engine</span>
                      <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.1em] leading-tight">Operational</span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow relative bg-zinc-950/20 overflow-hidden flex flex-col">
                  {activeTab === 'ideate' ? (
                    <textarea value={state.currentInput} onChange={(e) => setState(prev => ({ ...prev, currentInput: e.target.value }))} placeholder="Describe your prompt objective in plain English..." className="w-full h-full p-8 md:p-10 bg-transparent text-base md:text-lg font-medium focus:outline-none placeholder:text-zinc-800 resize-none leading-relaxed text-zinc-100 custom-scrollbar" />
                  ) : (
                    <div className="p-8 md:p-10 h-full overflow-y-auto font-mono text-[11px] md:text-xs leading-loose text-zinc-400 custom-scrollbar">
                      {state.result ? (
                        <div className="whitespace-pre-wrap select-all selection:bg-indigo-500/20 bg-zinc-900/20 p-6 md:p-8 rounded-xl border border-white/5 shadow-inner">{state.result}</div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4 py-20 text-center">
                          <Activity size={40} className="text-zinc-500" />
                          <p className="text-xs font-sans">Run the logic engine to synthesize your production-ready prompt.</p>
                        </div>
                      )}
                    </div>
                  )}
                  {state.isLoading && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-4">
                      <RefreshCw size={24} className="text-indigo-500 animate-spin" />
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400">Synthesis in progress</span>
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-5 bg-zinc-950/60 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col"><span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">Characters</span><span className="text-[10px] font-bold text-zinc-300">{metrics.chars}</span></div>
                    <div className="flex flex-col"><span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">Est. Tokens</span><span className="text-[10px] font-bold text-zinc-300">~{metrics.tokens}</span></div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {state.result && (
                      <button onClick={() => { navigator.clipboard.writeText(state.result || ''); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="h-10 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
                      </button>
                    )}
                    <button onClick={handleGenerate} disabled={state.isLoading || !state.currentInput.trim()} className="flex-1 sm:flex-none h-10 px-8 rounded-lg jelly-gradient text-white font-black text-[9px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
                      <Zap size={12} /> Synthesize
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Sidebar: Parameters */}
            <aside className="lg:col-span-3 space-y-4 order-3">
              <div className="px-2 py-1 flex items-center gap-2"><Settings size={12} className="text-zinc-500" /><h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Parameters</h3></div>
              <div className="glass-panel rounded-[1.5rem] p-6 space-y-6 border-white/5">
                <div className="space-y-3">
                  <label className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Output Tone</label>
                  <select value={state.config.tone} onChange={(e) => updateConfig({ tone: e.target.value })} className="w-full h-10 bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 text-[10px] font-bold text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:bg-zinc-800">
                    {TONES.map(t => <option key={t} value={t} className="bg-zinc-950">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Expert Persona</label>
                  <select value={state.config.persona} onChange={(e) => updateConfig({ persona: e.target.value })} className="w-full h-10 bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 text-[10px] font-bold text-zinc-300 focus:outline-none appearance-none cursor-pointer hover:bg-zinc-800">
                    {PERSONAS.map(p => <option key={p} value={p} className="bg-zinc-950">{p}</option>)}
                  </select>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Show Steps</span>
                  <button onClick={() => updateConfig({ includeSteps: !state.config.includeSteps })} className={`w-8 h-4 rounded-full relative transition-all ${state.config.includeSteps ? 'jelly-gradient' : 'bg-zinc-800'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${state.config.includeSteps ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>

              {/* Mini Feature in Studio */}
              <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5">
                <h4 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">Live Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-zinc-600">Density</span>
                    <span className="text-white font-mono">{(metrics.tokens * 1.2).toFixed(1)}w</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(100, (metrics.tokens / 100) * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Local Vault Section in Studio */}
          {state.history.length > 0 && (
            <section className="mt-16 py-12 border-t border-white/5">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3"><Clock size={16} className="text-zinc-500" /><h2 className="text-lg font-bold font-jakarta text-white">Local Vault</h2></div>
                <button onClick={() => { setState(prev => ({ ...prev, history: [] })); localStorage.removeItem('jellyscript_v2_history'); }} className="text-[8px] font-black text-zinc-700 hover:text-red-400 uppercase tracking-[0.2em]">Flush History</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {state.history.map((h) => (
                  <div key={h.id} onClick={() => { setState(prev => ({ ...prev, result: h.refinedPrompt, currentInput: h.originalIdea })); setActiveTab('refine'); }} className="p-4 rounded-xl bg-zinc-950/40 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
                    <span className="text-[7px] font-black uppercase tracking-widest text-indigo-400/60">{h.framework}</span>
                    <p className="text-[9px] text-zinc-500 line-clamp-2 italic mt-2 font-medium group-hover:text-zinc-300 transition-colors">"{h.originalIdea}"</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      )}

      {/* FOOTER */}
      <footer className="mt-24 pt-16 border-t border-white/5 bg-[#030305] px-8 pb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg jelly-gradient flex items-center justify-center shadow-lg shadow-indigo-500/20">
               <span className="text-white font-bold text-sm">J</span>
             </div>
             <span className="font-jakarta text-lg font-black text-white leading-none">JellyScript<span className="text-indigo-400">.ai</span></span>
           </div>
           <div className="flex gap-10 text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">
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