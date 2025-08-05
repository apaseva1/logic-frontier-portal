import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, MessageSquare, Calculator, Code, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGPTSystem } from '@/hooks/useGPTSystem';
import { cn } from '@/lib/utils';

const quickActions = [
  { id: 'general', icon: MessageSquare, label: 'General', color: 'bg-primary' },
  { id: 'proof', icon: Calculator, label: 'Proof', color: 'bg-proof-primary' },
  { id: 'code', icon: Code, label: 'Code', color: 'bg-secondary' },
  { id: 'research', icon: FileText, label: 'Research', color: 'bg-muted-foreground' },
];

export const GPTFloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { openShell } = useGPTSystem();

  const handleQuickAction = (mode: string) => {
    openShell(mode);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <span className="text-sm font-medium text-foreground bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border shadow-sm">
                  {action.label}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleQuickAction(action.id)}
                  className={cn(
                    "w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                    action.color
                  )}
                >
                  <action.icon className="w-5 h-5 text-white" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300",
            "bg-gradient-logic text-primary-foreground",
            "border-2 border-primary/20"
          )}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Brain className="w-6 h-6" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};