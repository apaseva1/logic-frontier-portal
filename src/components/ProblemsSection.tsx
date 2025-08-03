import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FileText, Brain, Filter, Search, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const problemCategories = [
  'Foundation', 'Geometry', 'AI Ethics', 'Number Theory', 'Topology', 'Logic', 'Cybernetics'
];

const sampleProblems = [
  {
    id: 1,
    title: "Riemann Hypothesis Verification",
    description: "Computational verification of the Riemann Hypothesis for critical strip zeros using distributed validation networks.",
    tags: ['Foundation', 'Number Theory'],
    status: 'Active',
    contributors: 127,
    lastUpdate: '2024-01-15'
  },
  {
    id: 2,
    title: "AI Decision Boundary Ethics",
    description: "Formal logical framework for ethical decision boundaries in autonomous AI systems operating in complex social environments.",
    tags: ['AI Ethics', 'Logic'],
    status: 'Under Review',
    contributors: 89,
    lastUpdate: '2024-01-12'
  },
  {
    id: 3,
    title: "Quantum Logic Gate Optimization",
    description: "Mathematical proof of optimal quantum gate sequences for universal quantum computing with minimal decoherence.",
    tags: ['Cybernetics', 'Foundation'],
    status: 'Solved',
    contributors: 203,
    lastUpdate: '2024-01-10'
  },
  {
    id: 4,
    title: "Topological Data Persistence",
    description: "Persistence homology applications in high-dimensional data analysis with formal convergence guarantees.",
    tags: ['Topology', 'AI Ethics'],
    status: 'Active',
    contributors: 156,
    lastUpdate: '2024-01-08'
  }
];

export const ProblemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProblems = sampleProblems.filter(problem => {
    const matchesCategory = !selectedCategory || problem.tags.includes(selectedCategory);
    const matchesSearch = !searchTerm || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-primary/10 text-primary border-primary/20';
      case 'Under Review': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Solved': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section ref={ref} className="py-section bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Global Problem Portal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore open mathematical problems, contribute solutions, and participate 
            in humanity's collective pursuit of rigorous knowledge.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="h-8"
              >
                <Filter className="w-4 h-4 mr-1" />
                All
              </Button>
              {problemCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="h-8"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProblems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 glow-hover group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getStatusColor(problem.status)}>
                      {problem.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Brain className="w-4 h-4 mr-1" />
                      GPT
                    </Button>
                  </div>
                  <CardTitle className="text-lg leading-tight">{problem.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {problem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{problem.contributors} contributors</span>
                      <span>{problem.lastUpdate}</span>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full group" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Problem
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border border-primary/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Submit Your Problem</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a mathematical problem that needs rigorous proof? Submit it to our 
              global network of validators and contributors.
            </p>
            <Button size="lg" className="glow-hover">
              <FileText className="w-5 h-5 mr-2" />
              Submit Problem
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};