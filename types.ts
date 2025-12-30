
export enum PromptFramework {
  BASIC = 'Basic',
  RTF = 'Role-Task-Format',
  CHAIN_OF_THOUGHT = 'Chain of Thought',
  FEW_SHOT = 'Few-Shot Learning',
  REVERSE_PROMPT = 'Reverse Prompting',
  DELIMITED = 'Delimited Input',
  MIDJOURNEY = 'Midjourney Image',
  DALL_E = 'DALL-E 3 Style'
}

export interface SavedPrompt {
  id: string;
  originalIdea: string;
  refinedPrompt: string;
  framework: PromptFramework;
  timestamp: number;
}

export interface PromptConfig {
  framework: PromptFramework;
  tone: string;
  persona: string;
  negativeConstraints: string;
  targetModel: 'GPT-4' | 'Claude-3' | 'Gemini' | 'Midjourney' | 'Generic';
  includeSteps: boolean;
}

export interface AppState {
  currentInput: string;
  isLoading: boolean;
  result: string | null;
  history: SavedPrompt[];
  config: PromptConfig;
}
