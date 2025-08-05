import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Code, 
  FileText, 
  Calculator,
  Sparkles,
  Copy,
  Check,
  Zap,
  MessageSquare,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: string;
  proofStep?: boolean;
}

interface GPTShellProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}

const contextModes = [
  { id: 'general', label: 'General', icon: <MessageSquare className="w-4 h-4" />, color: 'bg-primary' },
  { id: 'proof', label: 'Proof Assistant', icon: <Calculator className="w-4 h-4" />, color: 'bg-proof-primary' },
  { id: 'code', label: 'Code Analysis', icon: <Code className="w-4 h-4" />, color: 'bg-secondary' },
  { id: 'research', label: 'Research', icon: <FileText className="w-4 h-4" />, color: 'bg-muted-foreground' }
];

export const GPTShell = ({ isOpen, onClose, initialContext }: GPTShellProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeMode, setActiveMode] = useState('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialContext) {
      setMessages([{
        id: Date.now().toString(),
        type: 'system',
        content: `Context: ${initialContext}`,
        timestamp: new Date()
      }]);
    }
  }, [initialContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      context: activeMode
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate GPT response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateContextualResponse(input, activeMode),
        timestamp: new Date(),
        context: activeMode
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateContextualResponse = (query: string, mode: string): string => {
    const responses = {
      general: `I understand you're asking about "${query}". As your GILC AI assistant, I can help you explore logic, cybernetics, and frontier science concepts. What specific aspect would you like to dive deeper into?`,
      proof: `Analyzing proof context for "${query}". Let me break down the logical structure:

1. **Premise Analysis**: Examining foundational assumptions
2. **Logical Flow**: Tracing inference chains
3. **Verification**: Checking for logical consistency

Would you like me to elaborate on any particular step or provide alternative proof approaches?`,
      code: `Code analysis for "${query}":

\`\`\`typescript
// Potential implementation approach
function analyzeLogicStructure(input: string) {
  return {
    complexity: 'O(n log n)',
    pattern: 'recursive-descent',
    optimization: 'memoization-ready'
  };
}
\`\`\`

This follows GILC's computational principles. Need deeper architectural insights?`,
      research: `Research synthesis for "${query}":

**Current Frontier**: Quantum-logic interfaces
**Methodological Framework**: Cybernetic epistemology
**Cross-References**: 
- Gödel incompleteness theorems
- Turing machine equivalence
- Category theory applications

Shall we explore the interdisciplinary connections?`
    };

    return responses[mode as keyof typeof responses] || responses.general;
  };

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      >
        <motion.div
          className={cn(
            "bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-2xl",
            "w-full max-w-4xl transition-all duration-300",
            isMinimized ? "h-16" : "h-[80vh]"
          )}
          layout
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-logic rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">GILC GPT Shell</h3>
                <p className="text-xs text-muted-foreground">Quantum Harmonic AI Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex flex-col h-[calc(80vh-4rem)]">
              {/* Context Modes */}
              <div className="flex items-center space-x-2 p-4 border-b border-border bg-muted/20">
                {contextModes.map((mode) => (
                  <Button
                    key={mode.id}
                    variant={activeMode === mode.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveMode(mode.id)}
                    className="flex items-center space-x-2 h-8"
                  >
                    {mode.icon}
                    <span className="text-xs">{mode.label}</span>
                  </Button>
                ))}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-12">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Welcome to GILC GPT Shell</p>
                    <p className="text-xs mt-1">Ask me anything about logic, proofs, or cybernetics</p>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      message.type === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <Card className={cn(
                      "max-w-[80%] p-3 relative group",
                      message.type === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : message.type === 'system'
                        ? "bg-muted border-dashed"
                        : "bg-card"
                    )}>
                      {message.context && (
                        <Badge variant="outline" className="mb-2 text-xs">
                          {contextModes.find(m => m.id === message.context)?.label}
                        </Badge>
                      )}
                      
                      <pre className="whitespace-pre-wrap text-sm font-sans">
                        {message.content}
                      </pre>
                      
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                          onClick={() => copyToClipboard(message.content, message.id)}
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <Card className="bg-card p-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">Thinking...</span>
                      </div>
                    </Card>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-muted/10">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={`Ask GILC GPT about ${contextModes.find(m => m.id === activeMode)?.label.toLowerCase()}...`}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      className="pr-10"
                    />
                    <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="glow-hover"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Quantum harmonic mode active</span>
                  <span className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>Real-time reasoning</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};