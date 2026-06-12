export interface Decision {
  id: string;
  daire: string;
  esasNo: string;
  kararNo: string;
  kararTarihi: string;
  arananKelime?: string;
  durum: string;
  konu: string;
  özet: string;
  markdown_content: string;
  justification?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export interface CaseFile {
  id: string;
  title: string;
  court: string;
  caseNumber?: string;
  client?: string;
  subject: string;
  details: string;
  createdAt: string;
  matchedDecisions: Decision[];
  chatHistory: Message[];
  aiAnalysis: string;
}
