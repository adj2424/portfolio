import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

gsap.registerPlugin();

export const Loading = () => {
  const countRef = useRef(0);
  const distanceRef = useRef(0);
  const countDisplayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rect = countDisplayRef.current!.getBoundingClientRect();
    const endPosition = rect.right;
    distanceRef.current = window.innerWidth - endPosition - rect.width;
    setTimeout(() => {
      load();
    }, 100);
  }, []);

  /**
   * Recursive loading screen
   */
  const load = () => {
    // finished loading and play enter animation
    if (countRef.current >= 100) {
      finishAnimation();
      return;
    }
    const d = Math.random();
    countRef.current += d > 0.8 ? Math.ceil(Math.sqrt(d) * 30) : Math.ceil(Math.sqrt(d) * 5);
    if (countRef.current > 100) {
      countRef.current = 100;
    }
    countDisplayRef.current!.textContent = `${countRef.current}%`;
    gsap.to(countDisplayRef.current, {
      x: (distanceRef.current * countRef.current) / 100,
      duration: 1
    });
    gsap.to(barRef.current, {
      xPercent: countRef.current,
      duration: 1
    });
    setTimeout(load, 300);
  };

  const finishAnimation = () => {
    gsap
      .timeline()
      .to(nameRef.current, {
        yPercent: -100,
        duration: 0.55,
        delay: 1
      })
      .to(barRef.current!.style, {
        height: '90vh',
        duration: 0.8
      })
      .to(containerRef.current, {
        yPercent: -103,
        duration: 0.7,
        delay: -0.55
      });
  };
  return (
    <>
      <div ref={containerRef} className="fixed w-full h-full text-black z-[4] bg-white overflow-hidden">
        <div className="top-0 text-right mr-[3rem] mt-[3rem] overflow-hidden">
          <div ref={nameRef} className="text-2xl leading-[0.8]">
            ALAN JIANG
          </div>
        </div>
        <div ref={countDisplayRef} className="absolute bottom-0 left-[1rem] text-[8rem] overflow-hidden">
          0%
        </div>
        <div ref={barRef} className="absolute bottom-0 right-[100%] w-full h-[1rem] bg-accent"></div>
      </div>
    </>
  );
};

