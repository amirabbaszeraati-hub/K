
export interface AnalysisData {
  personalityTraits: {
    trait: string;
    score: number;
    description: string;
  }[];
  emotionalState: string;
  stressLevel: number; // 1-100
  creativityLevel: number; // 1-100
  detailedAnalysis: string;
  recommendations: string[];
  timestamp: number;
  imageUrl?: string;
}

export interface HistoryItem extends AnalysisData {
  id: string;
}

export enum Page {
  Landing = 'landing',
  Upload = 'upload',
  Processing = 'processing',
  Result = 'result',
  History = 'history'
}
