import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GPTExplainerButtonProps {
  content: string;
  context?: string;
  variant?: 'default' | 'minimal' | 'floating';
  onExplain?: (content: string, context?: string) => void;
  className?: string;
}

export const GPTExplainerButton = ({ 
  content, 
  context, 
  variant = 'default',
  onExplain,
  className 
}: GPTExplainerButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onExplain?.(content, context);
  };

  const variants = {
    default: "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20",
    minimal: "bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground",
    floating: "bg-background/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-border"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={cn(
          "group relative overflow-hidden",
          variants[variant],
          className
        )}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative flex items-center space-x-2">
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Brain className="w-4 h-4" />
          </motion.div>
          
          <span className="text-xs font-medium">
            {variant === 'minimal' ? 'GPT' : 'Explain'}
          </span>
          
          <motion.div
            className="opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            animate={{ x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        </div>
      </Button>
    </motion.div>
  );
};