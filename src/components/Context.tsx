import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

interface Context {
  lenis: Lenis | null;
  isTablet: boolean;
  isMobile: boolean;
  onHover: boolean;
  setOnHover: React.Dispatch<React.SetStateAction<boolean>>;
  onWorksHover: { isWorksTitleHover: boolean; worksImgSrc: string };
  setOnWorksHover: React.Dispatch<React.SetStateAction<{ isWorksTitleHover: boolean; worksImgSrc: string }>>;
  forceRender: number;
  setForceRender: React.Dispatch<React.SetStateAction<number>>;
}

const Context = createContext<Context | null>(null);

export const useMyContext = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useContext must be used within a Provider');
  }
  return ctx;
};

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [onWorksHover, setOnWorksHover] = useState({ isWorksTitleHover: false, worksImgSrc: '' });
  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 800);
      setIsMobile(window.innerWidth < 550);
    };

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      touchMultiplier: 2,
      infinite: false
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    setLenis(lenis);
    setIsTablet(window.innerWidth < 800);
    setIsMobile(window.innerWidth < 550);

    window.addEventListener('resize', handleResize);
    return () => {
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          lenis,
          isTablet,
          isMobile,
          onHover,
          setOnHover,
          onWorksHover,
          setOnWorksHover,
          forceRender,
          setForceRender
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
};
