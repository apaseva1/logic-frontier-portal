import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGPTSystem } from '@/hooks/useGPTSystem';

interface ContextualTip {
  id: string;
  title: string;
  description: string;
  action: string;
  context: string;
}

interface GPTContextualHelpProps {
  section: string;
  visible?: boolean;
}

const sectionTips: Record<string, ContextualTip[]> = {
  hero: [
    {
      id: 'welcome',
      title: 'Welcome to GILC',
      description: 'Start by exploring our logic problems or asking GPT about mathematical concepts.',
      action: 'Ask GPT about GILC',
      context: 'general'
    }
  ],
  about: [
    {
      id: 'mission',
      title: 'Our Mission',
      description: 'Learn more about our methodological framework and cybernetic principles.',
      action: 'Explain cybernetic epistemology',
      context: 'research'
    }
  ],
  problems: [
    {
      id: 'proof-help',
      title: 'Need Proof Help?',
      description: 'Use our GPT Proof Assistant to validate logical steps and get suggestions.',
      action: 'Start proof assistance',
      context: 'proof'
    },
    {
      id: 'problem-analysis',
      title: 'Problem Analysis',
      description: 'Get GPT to break down complex mathematical problems into manageable steps.',
      action: 'Analyze problem structure',
      context: 'research'
    }
  ],
  fund: [
    {
      id: 'funding-logic',
      title: 'Funding Logic',
      description: 'Understand how our quantum harmonic funding model works.',
      action: 'Explain funding model',
      context: 'general'
    }
  ],
  join: [
    {
      id: 'contribution',
      title: 'How to Contribute',
      description: 'Learn about different ways to contribute to the GILC frontier.',
      action: 'Show contribution paths',
      context: 'general'
    }
  ]
};

export const GPTContextualHelp = ({ section, visible = true }: GPTContextualHelpProps) => {
  const [currentTip, setCurrentTip] = useState<ContextualTip | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openShell } = useGPTSystem();

  useEffect(() => {
    const tips = sectionTips[section];
    if (tips && tips.length > 0 && !isDismissed) {
      // Show tip after a delay
      const timer = setTimeout(() => {
        setCurrentTip(tips[0]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [section, isDismissed]);

  const handleAction = () => {
    if (currentTip) {
      openShell(currentTip.context);
      setCurrentTip(null);
    }
  };

  const handleDismiss = () => {
    setCurrentTip(null);
    setIsDismissed(true);
  };

  if (!visible || !currentTip) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-24 left-6 z-30 max-w-sm"
      >
        <Card className="p-4 bg-background/95 backdrop-blur-sm border-primary/20 shadow-xl">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Lightbulb className="w-3 h-3 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">
                GPT Tip
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold mb-1">{currentTip.title}</h4>
              <p className="text-xs text-muted-foreground">{currentTip.description}</p>
            </div>

            <Button
              size="sm"
              onClick={handleAction}
              className="w-full text-xs group"
            >
              {currentTip.action}
              <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};