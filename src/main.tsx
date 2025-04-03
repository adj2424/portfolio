import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App.tsx';
import { ContextProvider } from './components/Context.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
