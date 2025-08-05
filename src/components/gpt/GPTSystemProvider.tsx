import { ReactNode } from 'react';
import { GPTSystemContext, useGPTSystemProvider } from '@/hooks/useGPTSystem';
import { GPTShell } from './GPTShell';
import { GPTFloatingButton } from './GPTFloatingButton';

interface GPTSystemProviderProps {
  children: ReactNode;
}

export const GPTSystemProvider = ({ children }: GPTSystemProviderProps) => {
  const gptSystem = useGPTSystemProvider();

  return (
    <GPTSystemContext.Provider value={gptSystem}>
      {children}
      <GPTShell
        isOpen={gptSystem.isShellOpen}
        onClose={gptSystem.closeShell}
        initialContext={gptSystem.activeContext || undefined}
      />
      <GPTFloatingButton />
    </GPTSystemContext.Provider>
  );
};