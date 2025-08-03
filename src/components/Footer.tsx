import { motion } from 'framer-motion';
import { Github, Globe, Mail, FileText, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentTime = new Date().toISOString().slice(0, 19) + 'Z';

  return (
    <footer className="bg-secondary text-secondary-foreground py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* GILC Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-logic rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">Ψ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">GILC</h3>
                <p className="text-xs opacity-75">New Millennium Frontier</p>
              </div>
            </div>
            <p className="text-sm opacity-75 leading-relaxed">
              Global Institute of Logic and Cybernetics - Advancing human knowledge 
              through collaborative mathematical proof development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Platform</h4>
            <nav className="space-y-2">
              {[
                { name: 'Problems', href: '/problems' },
                { name: 'Proofs', href: '/proofs' },
                { name: 'Fund', href: '/fund' },
                { name: 'DAO Portal', href: '/dao' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Resources</h4>
            <nav className="space-y-2">
              {[
                { name: 'Documentation', href: '/docs' },
                { name: 'API Reference', href: '/api' },
                { name: 'Research Papers', href: '/papers' },
                { name: 'Community', href: '/community' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/gilc"
                className="text-secondary-foreground/75 hover:text-secondary-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@gilc.org"
                className="text-secondary-foreground/75 hover:text-secondary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://ipfs.io"
                className="text-secondary-foreground/75 hover:text-secondary-foreground transition-colors"
                aria-label="IPFS"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <div className="text-xs opacity-75 space-y-1">
              <p>ENS: gilc.eth</p>
              <p>License: CC-ND</p>
            </div>
          </div>
        </div>

        {/* Sync Status */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="opacity-75">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Synced @ {currentTime.replace('T', ' ').slice(0, -1)} UTC+0
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="opacity-75">IPFS Verified</span>
              </div>
            </div>

            <div className="text-sm opacity-75">
              <p>Powered by ψ11411 kernel</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-secondary-foreground/20">
            <p className="text-sm opacity-75">
              © 2024 Global Institute of Logic and Cybernetics. 
              Committed to open science and mathematical truth.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};