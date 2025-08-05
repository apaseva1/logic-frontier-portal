import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export const MermaidDiagram = ({ chart, className = '' }: MermaidDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const renderDiagram = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Configure mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            darkMode: true,
            primaryColor: 'hsl(var(--primary))',
            primaryTextColor: 'hsl(var(--primary-foreground))',
            primaryBorderColor: 'hsl(var(--primary))',
            lineColor: 'hsl(var(--border))',
            secondaryColor: 'hsl(var(--secondary))',
            tertiaryColor: 'hsl(var(--muted))',
            background: 'hsl(var(--background))',
            mainBkg: 'hsl(var(--card))',
            secondBkg: 'hsl(var(--muted))',
            tertiaryBkg: 'hsl(var(--accent))',
          },
          flowchart: {
            curve: 'basis',
            padding: 20,
          },
          sequence: {
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
          },
          gantt: {
            fontSize: 11,
            gridLineStartPadding: 35,
            leftPadding: 75,
          },
        });

        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        
        // Clear previous content
        if (ref.current) {
          ref.current.innerHTML = '';
        }

        // Render the diagram
        const { svg } = await mermaid.render(id, chart);
        
        if (ref.current) {
          ref.current.innerHTML = svg;
          
          // Add custom styling to the SVG
          const svgElement = ref.current.querySelector('svg');
          if (svgElement) {
            svgElement.style.width = '100%';
            svgElement.style.height = 'auto';
            svgElement.style.maxWidth = '100%';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="font-medium">Error rendering diagram</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
    >
      <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border-primary/20 overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Rendering diagram...</span>
          </div>
        )}
        
        <div
          ref={ref}
          className={`mermaid-container ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      </Card>
    </motion.div>
  );
};