import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Copy,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProofStep {
  id: string;
  statement: string;
  justification: string;
  isValid: boolean;
  suggestions?: string[];
  dependencies: string[];
}

interface GPTProofAssistantProps {
  proofContent: string;
  onStepValidation?: (stepId: string, isValid: boolean) => void;
  onSuggestionApply?: (stepId: string, suggestion: string) => void;
}

export const GPTProofAssistant = ({ 
  proofContent, 
  onStepValidation, 
  onSuggestionApply 
}: GPTProofAssistantProps) => {
  const [steps, setSteps] = useState<ProofStep[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    analyzeProof(proofContent);
  }, [proofContent]);

  const analyzeProof = async (content: string) => {
    setIsAnalyzing(true);
    
    // Simulate proof analysis
    setTimeout(() => {
      const mockSteps: ProofStep[] = [
        {
          id: '1',
          statement: 'Let f: ℝ → ℝ be a continuous function',
          justification: 'Given premise',
          isValid: true,
          dependencies: []
        },
        {
          id: '2',
          statement: 'Assume f is differentiable on (a,b)',
          justification: 'Mean Value Theorem prerequisite',
          isValid: true,
          suggestions: ['Consider adding continuity on [a,b]'],
          dependencies: ['1']
        },
        {
          id: '3',
          statement: '∃c ∈ (a,b) such that f\'(c) = (f(b) - f(a))/(b - a)',
          justification: 'Mean Value Theorem application',
          isValid: false,
          suggestions: [
            'Need to establish continuity on [a,b]',
            'Verify differentiability condition'
          ],
          dependencies: ['1', '2']
        }
      ];
      
      setSteps(mockSteps);
      setIsAnalyzing(false);
    }, 2000);
  };

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const validateStep = (stepId: string, isValid: boolean) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, isValid } : step
    ));
    onStepValidation?.(stepId, isValid);
  };

  const applySuggestion = (stepId: string, suggestion: string) => {
    onSuggestionApply?.(stepId, suggestion);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-proof-primary/5 to-transparent border-proof-primary/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-proof-primary rounded-full flex items-center justify-center">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-sm">GILC Proof Assistant</h3>
          <p className="text-xs text-muted-foreground">Quantum logical verification</p>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-proof-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-sm text-muted-foreground">Analyzing proof structure...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Proof Overview */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">
                {steps.filter(s => s.isValid).length}/{steps.length} steps verified
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {Math.round((steps.filter(s => s.isValid).length / steps.length) * 100)}% complete
            </Badge>
          </div>

          {/* Proof Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "border rounded-lg overflow-hidden",
                  step.isValid 
                    ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
                    : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20"
                )}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center space-x-2">
                        {expandedSteps.has(step.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {step.id}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{step.statement}</p>
                        <p className="text-xs text-muted-foreground">{step.justification}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {step.isValid ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSteps.has(step.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 border-t border-border/50">
                        {/* Dependencies */}
                        {step.dependencies.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              Dependencies:
                            </p>
                            <div className="flex items-center space-x-2">
                              {step.dependencies.map((dep, i) => (
                                <div key={dep} className="flex items-center space-x-1">
                                  <Badge variant="outline" className="text-xs">
                                    Step {dep}
                                  </Badge>
                                  {i < step.dependencies.length - 1 && (
                                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggestions */}
                        {step.suggestions && step.suggestions.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center space-x-1">
                              <Lightbulb className="w-3 h-3" />
                              <span>GPT Suggestions:</span>
                            </p>
                            <div className="space-y-2">
                              {step.suggestions.map((suggestion, i) => (
                                <div 
                                  key={i}
                                  className="flex items-center justify-between p-2 bg-background/50 rounded border border-border/50"
                                >
                                  <p className="text-xs flex-1 mr-2">{suggestion}</p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => applySuggestion(step.id, suggestion)}
                                    className="h-6 text-xs"
                                  >
                                    <Wand2 className="w-3 h-3 mr-1" />
                                    Apply
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={step.isValid ? "outline" : "default"}
                            size="sm"
                            onClick={() => validateStep(step.id, true)}
                            className="h-7 text-xs"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Validate
                          </Button>
                          <Button
                            variant={!step.isValid ? "outline" : "default"}
                            size="sm"
                            onClick={() => validateStep(step.id, false)}
                            className="h-7 text-xs"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Flag Issue
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(step.statement)}
                            className="h-7 text-xs"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};