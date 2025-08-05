import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { MermaidDiagram } from './MermaidDiagram';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer = ({ content, className = '' }: MathRendererProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Custom code block rendering for Mermaid diagrams
          code({ node, className, children, ...props }: any) {
            const inline = !className;
            const match = /language-(\w+)/.exec(className || '');
            const language = match?.[1];
            
            if (!inline && language === 'mermaid') {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="my-6"
                >
                  <MermaidDiagram chart={String(children).replace(/\n$/, '')} />
                </motion.div>
              );
            }
            
            if (!inline && match) {
              return (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="my-4 rounded-lg overflow-hidden"
                >
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    PreTag="div"
                    className="rounded-lg"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </motion.div>
              );
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          
          // Enhanced heading rendering
          h1: ({ children }) => (
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold mb-6 text-foreground border-b border-border pb-4"
            >
              {children}
            </motion.h1>
          ),
          
          h2: ({ children }) => (
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-semibold mt-8 mb-4 text-foreground"
            >
              {children}
            </motion.h2>
          ),
          
          h3: ({ children }) => (
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-2xl font-medium mt-6 mb-3 text-foreground"
            >
              {children}
            </motion.h3>
          ),
          
          // Enhanced paragraph rendering
          p: ({ children }) => (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 leading-relaxed text-foreground"
            >
              {children}
            </motion.p>
          ),
          
          // Enhanced blockquote for theorems/lemmas
          blockquote: ({ children }) => (
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="border-l-4 border-primary pl-6 py-4 my-6 bg-gradient-to-r from-primary/5 to-transparent rounded-r-lg"
            >
              {children}
            </motion.blockquote>
          ),
          
          // Enhanced list rendering
          ul: ({ children }) => (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="list-disc list-inside space-y-2 mb-4"
            >
              {children}
            </motion.ul>
          ),
          
          ol: ({ children }) => (
            <motion.ol
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="list-decimal list-inside space-y-2 mb-4"
            >
              {children}
            </motion.ol>
          ),
          
          // Enhanced table rendering
          table: ({ children }) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="overflow-x-auto my-6"
            >
              <table className="min-w-full border border-border rounded-lg overflow-hidden">
                {children}
              </table>
            </motion.div>
          ),
          
          th: ({ children }) => (
            <th className="px-4 py-2 bg-muted font-semibold text-left border-b border-border">
              {children}
            </th>
          ),
          
          td: ({ children }) => (
            <td className="px-4 py-2 border-b border-border">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};