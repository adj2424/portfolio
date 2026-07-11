import Lenis from 'lenis';
import { useEffect, useState } from 'react';
import { MyContext } from './Context';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [onHover, setOnHover] = useState(false);
  const [onWorksHover, setOnWorksHover] = useState({ isWorksTitleHover: false, worksImgSrc: '' });

  useEffect(() => {
    let lenisInstance: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let isDestroyed = false;

    const handleResize = () => {
      const width = window.innerWidth;
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(width < 550 || isMobileUA);
    };

    // Run immediately on mount to establish correct initial state
    handleResize();

    const initializeApp = async () => {
      await document.fonts.ready;
      if (isDestroyed) return;

      handleResize();

      lenisInstance = new Lenis({
        smoothWheel: true,
        lerp: 0.07,
        wheelMultiplier: 1,
        syncTouch: true,
        syncTouchLerp: 0.2,
        touchMultiplier: 1,
        touchInertiaExponent: 5
      });

      // Synchronize Lenis with GSAP ScrollTrigger updates
      lenisInstance.on('scroll', ScrollTrigger.update);

      // Connect Lenis to the GSAP ticker
      tickerCallback = (time: number) => {
        if (lenisInstance) {
          lenisInstance.raf(time * 1000); // Convert seconds to milliseconds
        }
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      setLenis(lenisInstance);
    };

    initializeApp();
    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', handleResize);
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
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
          isMobile,
          onHover,
          setOnHover,
          onWorksHover,
          setOnWorksHover
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

