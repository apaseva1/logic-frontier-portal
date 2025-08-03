import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { User, Brain, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const roles = [
  {
    id: 'axiom-proposer',
    icon: <Brain className="w-6 h-6" />,
    title: "Axiom Proposer",
    description: "Propose foundational mathematical axioms and logical frameworks",
    requirements: ["PhD in Mathematics/Logic", "Published research", "Peer recommendations"],
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  {
    id: 'proof-verifier',
    icon: <Shield className="w-6 h-6" />,
    title: "Proof Verifier",
    description: "Validate mathematical proofs through rigorous peer review",
    requirements: ["Advanced mathematics degree", "Formal verification experience", "GILC training"],
    color: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  {
    id: 'fund-fellow',
    icon: <Users className="w-6 h-6" />,
    title: "GILC Fund Fellow",
    description: "Research fellowship with full funding and collaborative support",
    requirements: ["Exceptional research proposal", "Academic excellence", "Global impact potential"],
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20"
  }
];

export const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    background: '',
    motivation: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select a role before submitting your application.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Submitted",
      description: "Thank you for your interest! We'll review your application and respond within 7 days.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      institution: '',
      background: '',
      motivation: ''
    });
    setSelectedRole('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="join" ref={ref} className="py-section bg-background relative overflow-hidden">
      {/* Network Connection Visuals */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-32 left-40 w-1 h-1 bg-primary-glow rounded-full animate-ping" />
        <div className="absolute bottom-40 right-32 w-3 h-3 border border-primary rounded-full animate-spin" style={{ animationDuration: '10s' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ filter: 'blur(1px)' }}>
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="hsl(var(--primary))" opacity="0.1" />
              <line x1="20" y1="20" x2="80" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join New Millennium Frontier
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Become part of humanity's most ambitious scientific collaboration. 
            Contributors, validators, and thinkers from around the world shape our future.
          </p>
        </motion.div>

        {/* Available Roles */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === role.id ? 'ring-2 ring-primary glow-primary' : 'glow-hover'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <div className="text-primary">
                        {role.icon}
                      </div>
                    </div>
                    {selectedRole === role.id && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-sm">Requirements:</h5>
                    <ul className="space-y-2">
                      {role.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="glow-hover">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Application Form</CardTitle>
              <CardDescription className="text-center">
                Tell us about yourself and your passion for advancing mathematical knowledge
              </CardDescription>
              {selectedRole && (
                <div className="flex justify-center">
                  <Badge className={roles.find(r => r.id === selectedRole)?.color}>
                    Applying for: {roles.find(r => r.id === selectedRole)?.title}
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      placeholder="Dr. John Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="john@university.edu"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Institution / Affiliation</label>
                  <Input
                    placeholder="MIT, Independent Researcher, etc."
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Academic Background</label>
                  <Textarea
                    placeholder="PhD in Pure Mathematics from Cambridge, 10+ years in formal logic..."
                    value={formData.background}
                    onChange={(e) => handleInputChange('background', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Motivation & Vision</label>
                  <Textarea
                    placeholder="What drives your passion for mathematics? How do you envision contributing to GILC's mission?"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full glow-hover group"
                  disabled={!selectedRole}
                >
                  <User className="w-5 h-5 mr-2" />
                  Submit Application
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                {!selectedRole && (
                  <p className="text-center text-sm text-muted-foreground">
                    Please select a role above to enable application submission
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contributor Tree Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Global Contributor Network</h3>
          <div className="relative max-w-md mx-auto">
            <div className="logic-grid absolute inset-0 opacity-30" />
            <div className="relative bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 rounded-xl p-8">
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">2,847</div>
                <div className="text-sm text-muted-foreground">Active Contributors</div>
                <div className="text-xs text-muted-foreground">
                  Spanning 94 countries across 6 continents
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};