import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Coins, Users, Shield, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const fundingRoles = [
  {
    icon: <Coins className="w-8 h-8" />,
    title: "Funder",
    description: "Contribute ETH or fiat to support proof development and validation infrastructure.",
    benefits: ["Direct impact metrics", "Governance tokens", "Early access to results"]
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Validator",
    description: "Stake tokens to participate in proof verification and earn validation rewards.",
    benefits: ["Validation rewards", "Network security", "Academic recognition"]
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Researcher",
    description: "Access funding for mathematical research projects and collaborative initiatives.",
    benefits: ["Research grants", "Global collaboration", "Publication support"]
  }
];

export const FundSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="fund" ref={ref} className="py-section bg-gradient-frontier relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Fund Scientific Progress
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Support humanity's quest for mathematical truth through our transparent, 
            decentralized funding architecture.
          </p>
        </motion.div>

        {/* Current Funding Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center glow-hover">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">₿ 2,847</CardTitle>
                <CardDescription>Total Funds Raised</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center glow-hover">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">156</CardTitle>
                <CardDescription>Active Validators</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center glow-hover">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">89</CardTitle>
                <CardDescription>Funded Projects</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </motion.div>

        {/* Funding Flow Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Funding Architecture</h3>
          
          <div className="proof-block">
            <div className="text-center mb-8">
              <h4 className="text-xl font-semibold mb-4 font-math">Logic-Driven Distribution</h4>
              <p className="text-muted-foreground">
                Ξ → Validator → Kernel → Public Access
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Research Grants</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Validation Infrastructure</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Platform Development</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <Progress value={15} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Administrative Costs</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </motion.div>

        {/* Funding Roles */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {fundingRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 glow-hover">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <div className="text-primary">
                      {role.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h5 className="font-semibold text-sm">Benefits:</h5>
                    <ul className="space-y-2">
                      {role.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Support a Proofline</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Choose your contribution method and join thousands of supporters 
              advancing mathematical knowledge worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="glow-hover group">
                <Coins className="w-5 h-5 mr-2" />
                Contribute ETH
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                <TrendingUp className="w-5 h-5 mr-2" />
                Stripe Payment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="ghost" size="lg" className="group">
                <Zap className="w-5 h-5 mr-2" />
                NFT Support
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};