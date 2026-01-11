import gsap from 'gsap';
import { useMyContext } from '../useMyContext';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
export const Header = () => {
  const container = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();
  const setOnHover = ctx.setOnHover;
  const { contextSafe } = useGSAP({ scope: container });

  const handleScrollTo = (cssSelector: string, percentOffset: number) => {
    const lenis = ctx.lenis;
    if (!lenis) return;

    const element = document.querySelector(cssSelector);
    if (!element) return;

    const offset = percentOffset * lenis.limit;
    const distanceFromSelector = Math.abs(element.getBoundingClientRect().top);
    const selectorPercent = distanceFromSelector / lenis.limit;
    const duration = 4 * Math.sqrt(selectorPercent);
    lenis.scrollTo(cssSelector, {
      duration: duration,
      easing: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      offset: offset
    });
  };

  const handleMouseEnter = contextSafe((e: string) => {
    gsap.to(e, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    setOnHover(true);
  });

  const handleMouseLeave = contextSafe((e: string) => {
    setOnHover(false);
    gsap.to(e, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
  });

  useEffect(() => {
    const headerRow = document.querySelector('.header-row') as HTMLElement;
    if (!headerRow) return;

    if (ctx.isTablet) {
      headerRow.style.justifyContent = 'center';
    } else {
      headerRow.style.justifyContent = 'space-between';
    }
  }, [ctx]);

  return (
    <>
      <div ref={container} className="fixed flex w-full justify-center text-md z-[3] mt-[24px] mix-blend-difference">
        <div className="header-row flex w-[92%] justify-between align-baseline user-select-none select-none">
          <div className="h-[calc(1em*1.5)] overflow-hidden">
            <div
              className="hero-header flex flex-col"
              onMouseEnter={() => handleMouseEnter('.hero-header')}
              onMouseLeave={() => handleMouseLeave('.hero-header')}
              onClick={() => handleScrollTo('#hero', 0)}
            >
              <div>ALAN JIANG</div>
              <div>ALAN JIANG</div>
            </div>
          </div>
          {!ctx.isTablet && (
            <div className="flex">
              <div className="h-[calc(1em*1.5)] mr-[3rem] overflow-hidden">
                <div
                  className="about-header flex flex-col"
                  onMouseEnter={() => handleMouseEnter('.about-header')}
                  onMouseLeave={() => handleMouseLeave('.about-header')}
                  onClick={() => handleScrollTo('#about', 0.06)}
                >
                  <div>ABOUT</div>
                  <div>ABOUT</div>
                </div>
              </div>
              <div className="h-[calc(1em*1.5)] mr-[3rem] overflow-hidden">
                <div
                  className="works-header flex flex-col"
                  onMouseEnter={() => handleMouseEnter('.works-header')}
                  onMouseLeave={() => handleMouseLeave('.works-header')}
                  onClick={() => handleScrollTo('#works', -0.075)}
                >
                  <div>WORKS</div>
                  <div>WORKS</div>
                </div>
              </div>
              <div className="h-[calc(1em*1.5)] mr-[3rem] overflow-hidden">
                <div
                  className="technologies-header flex flex-col"
                  onMouseEnter={() => handleMouseEnter('.technologies-header')}
                  onMouseLeave={() => handleMouseLeave('.technologies-header')}
                  onClick={() => handleScrollTo('#technologies', 0.055)}
                >
                  <div>TECHNOLOGIES</div>
                  <div>TECHNOLOGIES</div>
                </div>
              </div>
              <div className="h-[calc(1em*1.5)] overflow-hidden">
                <div
                  className="contact-header flex flex-col"
                  onMouseEnter={() => handleMouseEnter('.contact-header')}
                  onMouseLeave={() => handleMouseLeave('.contact-header')}
                  onClick={() => handleScrollTo('#contact', 0.09)}
                >
                  <div>CONTACT</div>
                  <div>CONTACT</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
