export interface ChatMessage {
    text: string;
    user?: string;
    date?: Date;
    type: 'sent' | 'received'; // Solo estos dos tipos
  }