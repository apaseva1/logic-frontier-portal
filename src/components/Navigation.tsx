import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Brain, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About GILC', href: '/about' },
  { name: 'Problems', href: '/problems', icon: <FileText className="w-4 h-4" /> },
  { name: 'Proofs', href: '/proofs', icon: <Brain className="w-4 h-4" /> },
  { name: 'Fund', href: '/fund' },
  { name: 'DAO Portal', href: '/dao' },
  { name: 'Join', href: '/join' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'BG'>('EN');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'BG' : 'EN');
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* GILC Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="gilc-logo"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-logic rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">Ψ</span>
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-lg text-foreground">GILC</h1>
              <p className="text-xs text-muted-foreground -mt-1">New Millennium Frontier</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "nav-link text-sm font-medium transition-colors",
                  isActivePath(item.href)
                    ? "text-primary active"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1 h-8"
            >
              <Globe className="w-4 h-4" />
              <motion.span
                key={language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium"
              >
                {language}
              </motion.span>
            </Button>

            {/* GPT Shell Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 h-8 glow-hover"
            >
              <Brain className="w-4 h-4" />
              <span className="text-xs">GPT</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block py-2 px-4 rounded-md transition-colors",
                    isActivePath(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>GPT Shell</span>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};