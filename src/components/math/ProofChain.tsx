import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, User, Calendar, BookOpen } from 'lucide-react';
import { GPTExplainerButton } from '@/components/gpt/GPTExplainerButton';
import { useGPTSystem } from '@/hooks/useGPTSystem';

interface HistoricalContribution {
  year: number;
  contributor: string;
  contribution: string;
}

interface ProofChainProps {
  chain: HistoricalContribution[];
}

export const ProofChain = ({ chain }: ProofChainProps) => {
  const { explainContent } = useGPTSystem();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold mb-4">Historical Foundation Chain</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Trace the logical and historical development from foundational theorems to the current problem state.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

        {/* Chain Items */}
        <div className="space-y-8">
          {chain.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10" />
              
              <div className="ml-16">
                <Card className="glow-hover group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {item.year}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <User className="w-3 h-3 mr-1" />
                            {item.contributor}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-foreground">
                          {item.contribution}
                        </CardTitle>
                      </div>
                      
                      <GPTExplainerButton
                        content={item.contribution}
                        context={`Historical contribution by ${item.contributor} in ${item.year}`}
                        onExplain={(content, context) => explainContent(content, context)}
                        variant="minimal"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Impact Description */}
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
                        <div className="flex items-start space-x-3">
                          <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-sm mb-2">Mathematical Impact</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              This contribution established fundamental principles that enabled 
                              subsequent developments in the field, creating a logical foundation 
                              for modern approaches to the problem.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Modern Relevance */}
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium mb-2 text-foreground">Key Insights</h5>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Methodological innovation</li>
                            <li>• Computational foundation</li>
                            <li>• Theoretical framework</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2 text-foreground">Modern Applications</h5>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Distributed verification</li>
                            <li>• Algorithmic optimization</li>
                            <li>• Quantum implementations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Connection Arrow */}
              {index < chain.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (index * 0.2) + 0.3 }}
                  className="flex justify-center mt-6"
                >
                  <div className="bg-gradient-to-b from-primary/20 to-primary/10 rounded-full p-2">
                    <ArrowDown className="w-4 h-4 text-primary" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Current State */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: chain.length * 0.2 + 0.5 }}
          className="mt-12"
        >
          <div className="text-center">
            <div className="bg-gradient-to-b from-primary/20 to-primary/10 rounded-full p-3 w-fit mx-auto mb-4">
              <ArrowDown className="w-6 h-6 text-primary" />
            </div>
            <Card className="max-w-2xl mx-auto glow-hover bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">Current Research State</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Building upon this historical foundation, current research employs 
                  distributed computational methods and quantum algorithms to advance 
                  toward a complete resolution of the problem.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};