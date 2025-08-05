import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, BookOpen, Brain, History, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GPTProofAssistant } from '@/components/gpt/GPTProofAssistant';
import { GPTExplainerButton } from '@/components/gpt/GPTExplainerButton';
import { useGPTSystem } from '@/hooks/useGPTSystem';
import { MathRenderer } from '@/components/math/MathRenderer';
import { MermaidDiagram } from '@/components/math/MermaidDiagram';
import { ProofChain } from '@/components/math/ProofChain';
import { cn } from '@/lib/utils';

// Mock data - replace with actual data fetching
const problemData = {
  1: {
    id: 1,
    title: "Riemann Hypothesis Verification",
    description: "Computational verification of the Riemann Hypothesis for critical strip zeros using distributed validation networks.",
    tags: ['Foundation', 'Number Theory'],
    status: 'Active',
    contributors: 127,
    lastUpdate: '2024-01-15',
    historicalChain: [
      { year: 1859, contributor: "Bernhard Riemann", contribution: "Original conjecture formulation" },
      { year: 1896, contributor: "Hadamard & de la Vallée-Poussin", contribution: "Prime Number Theorem proof" },
      { year: 1914, contributor: "G.H. Hardy", contribution: "Infinitely many zeros on critical line" },
      { year: 1986, contributor: "A. Odlyzko", contribution: "Computational verification methods" },
    ],
    content: `
# The Riemann Hypothesis: A Computational Approach

## Abstract

The Riemann Hypothesis stands as one of the most significant unsolved problems in mathematics. This research presents a distributed computational framework for verifying zeros of the Riemann zeta function on the critical line.

## Mathematical Foundation

Let $\\zeta(s)$ be the Riemann zeta function defined for $\\text{Re}(s) > 1$ by:

$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$

The Riemann Hypothesis conjectures that all non-trivial zeros of $\\zeta(s)$ have real part equal to $\\frac{1}{2}$.

## Computational Methodology

### Zero Detection Algorithm

We employ the Gram-Schmidt method combined with Turing's technique:

$$G(t) = \\arg\\left(\\zeta\\left(\\frac{1}{2} + it\\right)\\right) - \\frac{t}{2}\\log\\frac{t}{2\\pi} + \\frac{t}{2}$$

### Verification Protocol

For each candidate zero $\\rho = \\frac{1}{2} + i\\gamma$:

1. **Precision Computation**: Calculate $|\\zeta(\\rho)|$ with arbitrary precision
2. **Distributed Validation**: Multi-node verification using independent algorithms
3. **Consensus Protocol**: Byzantine fault-tolerant agreement on results

## Results

Our distributed network has verified over $10^{12}$ zeros, all confirming the hypothesis.

## Conclusion

While computational verification cannot constitute a proof, our results provide strong empirical evidence supporting the Riemann Hypothesis.
    `,
    proofSteps: [
      {
        id: '1',
        statement: 'Define the Riemann zeta function ζ(s) for Re(s) > 1',
        justification: 'Standard analytic continuation',
        isValid: true,
        dependencies: []
      },
      {
        id: '2',
        statement: 'Extend ζ(s) meromorphically to entire complex plane',
        justification: 'Riemann\'s functional equation',
        isValid: true,
        dependencies: ['1']
      },
      {
        id: '3',
        statement: 'Apply computational verification to critical strip',
        justification: 'Distributed validation network',
        isValid: true,
        suggestions: ['Consider higher precision algorithms'],
        dependencies: ['1', '2']
      }
    ],
    alternativeProofs: [
      {
        title: "Analytic Approach",
        description: "Direct complex analysis using contour integration",
        complexity: "High"
      },
      {
        title: "Probabilistic Method",
        description: "Statistical modeling of zero distribution",
        complexity: "Medium"
      }
    ],
    relatedProblems: [
      { id: 2, title: "Goldbach Conjecture", relation: "Number theory foundation" },
      { id: 3, title: "Twin Prime Conjecture", relation: "Prime distribution" }
    ]
  }
};

export const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const problemId = parseInt(id || '1');
  const problem = problemData[problemId as keyof typeof problemData];
  const { explainContent } = useGPTSystem();

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Problem Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested problem could not be found.</p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Geometric Background */}
      <div className="fixed inset-0 logic-grid opacity-30" />
      <div className="fixed inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-lg animate-geometric-rotate" />
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-primary/5 rounded-full animate-geometric-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-primary/10 rotate-45 animate-morphing-shape" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Problems
              </Button>
              
              <div className="flex items-center space-x-4">
                <Badge className={cn(
                  problem.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' :
                  problem.status === 'Solved' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                  'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                )}>
                  {problem.status}
                </Badge>
                <GPTExplainerButton
                  content={problem.description}
                  context={`Problem: ${problem.title}`}
                  onExplain={(content, context) => explainContent(content, context)}
                  variant="floating"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold text-foreground leading-tight">
                  {problem.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{problem.contributors} contributors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Updated {problem.lastUpdate}</span>
                  </div>
                </div>
              </motion.div>

              {/* Tabbed Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs defaultValue="content" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content" className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Content</span>
                    </TabsTrigger>
                    <TabsTrigger value="proof" className="flex items-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span>Proof Analysis</span>
                    </TabsTrigger>
                    <TabsTrigger value="chain" className="flex items-center space-x-2">
                      <History className="w-4 h-4" />
                      <span>Historical Chain</span>
                    </TabsTrigger>
                    <TabsTrigger value="alternatives" className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4" />
                      <span>Alternatives</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-6">
                    <Card className="glow-hover">
                      <CardContent className="p-8">
                        <MathRenderer content={problem.content} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="proof" className="space-y-6">
                    <GPTProofAssistant
                      proofContent={problem.content}
                      onStepValidation={(stepId, isValid) => console.log('Step validation:', stepId, isValid)}
                      onSuggestionApply={(stepId, suggestion) => console.log('Apply suggestion:', stepId, suggestion)}
                    />
                  </TabsContent>

                  <TabsContent value="chain" className="space-y-6">
                    <ProofChain chain={problem.historicalChain} />
                  </TabsContent>

                  <TabsContent value="alternatives" className="space-y-6">
                    <div className="grid gap-4">
                      {problem.alternativeProofs.map((proof, index) => (
                        <Card key={index} className="glow-hover">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{proof.title}</CardTitle>
                              <Badge variant="outline">{proof.complexity}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{proof.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Problem Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glow-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">Problem Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contributors</span>
                      <span className="font-semibold">{problem.contributors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-semibold">{problem.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Update</span>
                      <span className="font-semibold">{problem.lastUpdate}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Problems */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glow-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Problems</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {problem.relatedProblems.map((related) => (
                      <div key={related.id} className="space-y-1">
                        <h4 className="font-medium text-sm">{related.title}</h4>
                        <p className="text-xs text-muted-foreground">{related.relation}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="glow-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Join Discussion
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      Submit Solution
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};