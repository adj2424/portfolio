import Lenis from 'lenis';
import { createContext, useContext } from 'react';

export const LenisContext = createContext<Lenis | null>(null);

export const useLenisContext = () => {
  const lenis = useContext(LenisContext);
  if (!lenis) {
    throw new Error('useLenisContext must be used within a LenisProvider');
  }
  return lenis;
};
