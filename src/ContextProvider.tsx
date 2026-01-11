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
    const initializeApp = async () => {
      await document.fonts.ready;
      const handleResize = () => {
        setIsTablet(window.innerWidth < 800);
        setIsMobile(window.innerWidth < 550);
      };

      handleResize();

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

      window.addEventListener('resize', handleResize);
      return () => {
        lenis.destroy();
        window.removeEventListener('resize', handleResize);
      };
    };

    const cleanup = initializeApp();

    return () => {
      cleanup.then(fn => {
        fn();
      });
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
