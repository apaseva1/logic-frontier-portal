import { useState, useCallback, useContext, createContext } from 'react';

interface GPTMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: string;
}

interface GPTSystemContextType {
  isShellOpen: boolean;
  messages: GPTMessage[];
  activeContext: string | null;
  openShell: (context?: string) => void;
  closeShell: () => void;
  sendMessage: (content: string, context?: string) => Promise<void>;
  explainContent: (content: string, context?: string) => void;
  clearMessages: () => void;
}

const GPTSystemContext = createContext<GPTSystemContextType | null>(null);

export const useGPTSystem = () => {
  const context = useContext(GPTSystemContext);
  if (!context) {
    throw new Error('useGPTSystem must be used within GPTSystemProvider');
  }
  return context;
};

export const useGPTSystemProvider = () => {
  const [isShellOpen, setIsShellOpen] = useState(false);
  const [messages, setMessages] = useState<GPTMessage[]>([]);
  const [activeContext, setActiveContext] = useState<string | null>(null);

  const openShell = useCallback((context?: string) => {
    setIsShellOpen(true);
    if (context) {
      setActiveContext(context);
    }
  }, []);

  const closeShell = useCallback(() => {
    setIsShellOpen(false);
    setActiveContext(null);
  }, []);

  const sendMessage = useCallback(async (content: string, context?: string) => {
    const userMessage: GPTMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      context
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate API call - replace with actual GPT integration
    setTimeout(() => {
      const assistantMessage: GPTMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand your query about "${content}". Let me provide a comprehensive analysis based on GILC's methodological framework...`,
        timestamp: new Date(),
        context
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1500);
  }, []);

  const explainContent = useCallback((content: string, context?: string) => {
    openShell(`Explain: ${content}`);
    if (context) {
      setActiveContext(context);
    }
  }, [openShell]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isShellOpen,
    messages,
    activeContext,
    openShell,
    closeShell,
    sendMessage,
    explainContent,
    clearMessages,
  };
};

export { GPTSystemContext };