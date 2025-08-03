import { motion } from 'framer-motion';
import { ArrowRight, FileText, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

import heroImage from '@/assets/hero-logic-pattern.jpg';

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="logic-grid absolute inset-0" />
        
        {/* Geometric Floating Elements */}
        <div className="absolute top-10 left-10 geometric-float opacity-30" />
        <div className="absolute top-32 right-20 geometric-float opacity-40" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-32 geometric-float opacity-35" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-10 geometric-float opacity-30" style={{ animationDelay: '6s' }} />
        
        {/* Morphing Particles */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary/10 morphing-particle" />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-primary-glow/15 morphing-particle" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-primary/5 morphing-particle" style={{ animationDelay: '6s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center particle-system">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-logic bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            New Millennium Frontier
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Scientific clarity. Proof integrity. Shared frontier.
          </motion.p>

          {/* Description */}
          <motion.div
            className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <p className="mb-4">
              The Global Institute of Logic and Cybernetics presents humanity's 
              collaborative platform for rigorous mathematical proof development, 
              peer validation, and scientific governance.
            </p>
            <p className="text-base italic">
              Logic without borders. Science with sovereignty.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Button 
              onClick={() => scrollToSection('problems')}
              size="lg" 
              className="group glow-hover bg-primary hover:bg-primary-deep text-primary-foreground px-8 py-6 text-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              Explore Problems
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              onClick={() => scrollToSection('fund')}
              variant="outline" 
              size="lg"
              className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
            >
              <Brain className="w-5 h-5 mr-2" />
              Support Research
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              onClick={() => scrollToSection('join')}
              variant="ghost" 
              size="lg"
              className="group text-muted-foreground hover:text-primary px-8 py-6 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Join GILC
            </Button>
          </motion.div>

          {/* Enhanced Floating Elements with Geometry */}
          <div className="absolute top-16 left-8 opacity-40">
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -25, 0], 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <div className="w-4 h-4 bg-primary rounded-full" />
              <div className="absolute inset-0 w-4 h-4 border-2 border-primary rounded-full animate-ping" />
            </motion.div>
          </div>
          
          <div className="absolute top-48 right-16 opacity-35">
            <motion.div
              className="relative"
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, -180, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5 
              }}
            >
              <div className="w-3 h-3 bg-primary-glow rounded-full" />
              <div className="absolute -inset-1 border border-primary-glow rounded-full animate-pulse" />
            </motion.div>
          </div>

          <div className="absolute bottom-32 left-16 opacity-45">
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <div className="w-6 h-6 border-2 border-primary rounded-full" />
              <div className="absolute inset-1 w-2 h-2 bg-primary rounded-full" />
            </motion.div>
          </div>

          <div className="absolute bottom-16 right-24 opacity-30">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 45, 90, 135, 180],
                scale: [1, 0.9, 1.1, 0.95, 1]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3 
              }}
            >
              <div className="w-5 h-5 border-2 border-primary-glow transform rotate-45" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};