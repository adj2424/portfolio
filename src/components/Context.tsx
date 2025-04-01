import Lenis from 'lenis';
import { createContext, useContext } from 'react';

export const Context = createContext<{
  lenis: Lenis | null;
  isTablet: boolean;
  isMobile: boolean;
}>({ lenis: null, isTablet: false, isMobile: false });

export const useMyContext = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useContext must be used within a Provider');
  }
  if (ctx.lenis === null) {
    throw new Error('lenis is not initialized');
  }
  return ctx;
};
