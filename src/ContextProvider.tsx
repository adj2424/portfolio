import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { MyContext } from './Context';

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [onHover, setOnHover] = useState(false);
  const [onWorksHover, setOnWorksHover] = useState({ isWorksTitleHover: false, worksImgSrc: '' });
  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    let lenisInstance: Lenis | null = null;
    let rafId: number | null = null;
    let isDestroyed = false;

    const handleResize = () => {
      setIsTablet(window.innerWidth < 800);
      setIsMobile(window.innerWidth < 550);
    };

    const initializeApp = async () => {
      await document.fonts.ready;
      if (isDestroyed) return;

      handleResize();

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false
      });

      const raf = (time: number) => {
        if (lenisInstance) {
          lenisInstance.raf(time);
        }
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      setLenis(lenisInstance);
    };

    initializeApp();
    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <MyContext.Provider
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
      </MyContext.Provider>
    </>
  );
};

