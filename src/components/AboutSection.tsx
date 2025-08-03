import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Shield, Zap, Globe, Brain } from 'lucide-react';

const principles = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Rigorous Logic",
    description: "Every proof undergoes peer validation through our distributed network of validators, ensuring mathematical integrity."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Global Collaboration",
    description: "Scientists worldwide contribute to humanity's collective understanding through transparent, borderless research."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Proof Sovereignty",
    description: "Immutable records on IPFS ensure that validated proofs remain accessible and verifiable for all time."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Accelerated Discovery",
    description: "AI-assisted proof development and verification accelerate the pace of mathematical and scientific breakthroughs."
  }
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-section bg-gradient-frontier relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About GILC
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The Global Institute of Logic and Cybernetics represents humanity's 
            commitment to collaborative scientific advancement through rigorous 
            mathematical proof development and validation.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="proof-block">
            <h3 className="text-2xl font-semibold mb-4 text-center">Our Mission</h3>
            <blockquote className="text-lg italic text-center leading-relaxed font-math">
              "To establish a decentralized, transparent, and globally accessible 
              platform where mathematical proofs are developed, validated, and 
              preserved for the advancement of human knowledge."
            </blockquote>
            <p className="text-center mt-6 text-muted-foreground">
              — GILC Founding Charter, ψ11411 Kernel
            </p>
          </div>
        </motion.div>

        {/* Core Principles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors glow-hover">
                <div className="text-primary">
                  {principle.icon}
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-3">{principle.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">Architecture</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold">Global Network</h4>
              <p className="text-sm text-muted-foreground">
                Distributed validation nodes across continents
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold">AI Integration</h4>
              <p className="text-sm text-muted-foreground">
                Machine learning accelerated proof assistance
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold">Immutable Records</h4>
              <p className="text-sm text-muted-foreground">
                IPFS storage with cryptographic verification
              </p>
            </div>
          </div>
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-primary/5 border border-primary/20 rounded-lg px-8 py-6">
            <p className="text-xl font-medium text-primary mb-2">
              Logic without borders. Science with sovereignty.
            </p>
            <p className="text-muted-foreground">
              Join thousands of researchers advancing human knowledge
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};