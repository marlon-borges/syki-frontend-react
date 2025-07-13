import { createContext, useCallback, useContext, useState, type PropsWithChildren } from 'react';

export interface LayoutContextProps {
  sidebarOpen: boolean;
  toggleOpen: () => void;
}

const LayoutContext = createContext<LayoutContextProps | null>(null);

export const LayoutContextProvider = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleOpen = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, toggleOpen }}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext deve ser usado dentro de LayoutContext');
  }
  return context;
};
