
import React from 'react';
import { 
  Zap, 
  Layers, 
  Cpu, 
  Sparkles, 
  ShieldAlert, 
  ListChecks, 
  Image as ImageIcon,
  BookOpen,
  History,
  Workflow,
  Eye,
  Target,
  Terminal,
  BrainCircuit,
  Binary,
  Shield,
  Cpu as CpuIcon,
  Globe,
  Database,
  BarChart3,
  Smartphone,
  CheckCircle2,
  Lock,
  ZapIcon
} from 'lucide-react';
import { PromptFramework } from './types';

export const FRAMEWORKS = [
  { 
    id: PromptFramework.BASIC, 
    label: 'Precision Polish', 
    icon: <Zap size={18} />, 
    desc: 'Enhances clarity, grammar, and structural flow while maintaining the core intent of your original idea.' 
  },
  { 
    id: PromptFramework.RTF, 
    label: 'RTF Architecture', 
    icon: <Layers size={18} />, 
    desc: 'The industry standard: assigns a specific Role, defines a precise Task, and dictates the exact output Format.' 
  },
  { 
    id: PromptFramework.CHAIN_OF_THOUGHT, 
    label: 'Reasoning Engine', 
    icon: <Cpu size={18} />, 
    desc: 'Forces the LLM to process logic step-by-step, significantly increasing accuracy for complex or mathematical tasks.' 
  },
  { 
    id: PromptFramework.MIDJOURNEY, 
    label: 'Visual Synthesis', 
    icon: <ImageIcon size={18} />, 
    desc: 'Injects technical photography parameters, lighting styles, and artistic movements for high-fidelity image generation.' 
  },
  { 
    id: PromptFramework.REVERSE_PROMPT, 
    label: 'Reverse Logic', 
    icon: <Workflow size={18} />, 
    desc: 'Analyzes a desired output to reconstruct the underlying instructions required to reproduce similar results.' 
  },
  { 
    id: PromptFramework.FEW_SHOT, 
    label: 'Pattern Learning', 
    icon: <ListChecks size={18} />, 
    desc: 'Provides the model with 3-5 high-quality examples to establish a specific behavioral pattern and stylistic tone.' 
  }
];

export const METHODOLOGY = [
  {
    title: "Semantic Ingestion",
    icon: <Terminal size={24} className="text-indigo-400" />,
    desc: "We parse your raw input through a specialized linguistic filter that extracts core objectives, eliminating ambiguity and fluff."
  },
  {
    title: "Logic Architecting",
    icon: <BrainCircuit size={24} className="text-purple-400" />,
    desc: "The system applies advanced frameworks like RTF or Chain-of-Thought to restructure your intent into a machine-readable hierarchy."
  },
  {
    title: "Token Synthesis",
    icon: <Binary size={24} className="text-emerald-400" />,
    desc: "The final output is optimized for specific LLM attention mechanisms, ensuring high-fidelity execution across any model."
  }
];

export const FAQS = [
  {
    question: "What makes JellyScript AI different from standard prompt generators?",
    answer: "Unlike generic templates, JellyScript uses a multi-stage logic synthesis engine. It doesn't just 'reword' your text; it reconstructs it based on established engineering patterns used by professional AI researchers to maximize model performance."
  },
  {
    question: "Does it support image generation models like Midjourney?",
    answer: "Yes. Our Visual Synthesis module is pre-configured with technical photography parameters, lens physics, and artistic movement databases to create high-fidelity prompts for Midjourney, DALL-E 3, and Stable Diffusion."
  },
  {
    question: "How secure is my data and IP?",
    answer: "We prioritize privacy. All your prompts and history are stored exclusively in your browser's Local Storage (your 'Vault'). No prompts are logged on our servers or used for training purposes."
  },
  {
    question: "Can I use these prompts for professional enterprise work?",
    answer: "Absolutely. JellyScript is designed for professional prompt architects and software engineers who need reliable, reproducible results for production-grade AI applications."
  }
];

export const TONES = [
  'Professional & Authoritative',
  'Creative & Avant-Garde',
  'Academic & Scholarly',
  'Minimalist & Concise',
  'Witty & Personable',
  'Strategic & Analytical'
];

export const PERSONAS = [
  'Expert Consultant (Strategy)',
  'Senior Software Architect',
  'Award-winning Creative Director',
  'PhD Research Scientist',
  'Executive Product Manager',
  'Bestselling Narrative Author'
];

export const FEATURES = [
  { title: "Universal Logic Engine", icon: <Layers className="text-indigo-400" />, desc: "Support for RTF, CoT, and Few-Shot patterns tailored for the world's leading LLMs." },
  { title: "Dynamic Personality", icon: <Sparkles className="text-purple-400" />, desc: "Our injector adopts high-tier expert personalities to shift model perspective and depth." },
  { title: "Negative Logic Gates", icon: <ShieldAlert className="text-red-400" />, desc: "Explicitly define constraints to prevent hallucinations and undesired stylistic choices." },
  { title: "Architectural View", icon: <Eye className="text-emerald-400" />, desc: "Real-time preview of how structural changes affect prompt weight and LLM attention." },
  { title: "Context Optimization", icon: <Target className="text-amber-400" />, desc: "Automatically trims fluff to maximize token efficiency and focus on core instructions." },
  { title: "Prompt Persistence", icon: <History className="text-blue-400" />, desc: "Your intellectual property stays local. Save and recall engineered prompts instantly." }
];

export const USE_CASES = [
  {
    title: "Engineering & Dev",
    desc: "Complex code generation and architectural planning prompts.",
    icon: <Terminal className="text-indigo-400" />
  },
  {
    title: "Marketing Strategy",
    desc: "Psychologically-driven ad copy and campaign logic.",
    icon: <BarChart3 className="text-purple-400" />
  },
  {
    title: "Scientific Research",
    desc: "Synthesizing literature reviews and data analysis queries.",
    icon: <Database className="text-emerald-400" />
  },
  {
    title: "Creative Arts",
    desc: "High-fidelity visual directives for AI image generators.",
    icon: <ImageIcon className="text-amber-400" />
  }
];

export const COMPATIBILITY = [
  { name: "OpenAI GPT-4o", status: "Native Support", delay: "0s" },
  { name: "Anthropic Claude 3.5", status: "Optimized", delay: "0.1s" },
  { name: "Google Gemini 1.5", status: "Native Support", delay: "0.2s" },
  { name: "Midjourney v6", status: "Specialized", delay: "0.3s" },
  { name: "Llama 3 (Ollama)", status: "Compatible", delay: "0.4s" }
];
