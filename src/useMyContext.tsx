import { useContext } from 'react';
import { Context, MyContext } from './Context';

export const useMyContext = (): Context => {
  const ctx = useContext(MyContext);
  if (!ctx) {
    throw new Error('useMyContext must be used within a ContextProvider');
  }
  return ctx;
};
