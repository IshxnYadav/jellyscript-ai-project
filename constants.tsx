
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
  Copy,
  History,
  Workflow,
  Eye,
  Target
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
