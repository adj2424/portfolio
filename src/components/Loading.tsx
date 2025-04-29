import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMyContext } from '../Context';

gsap.registerPlugin();

export const Loading = () => {
  const ctx = useMyContext();
  const countDisplayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  /**
   * Recursive loading screen
   */
  const load = contextSafe((count: number, distance: number) => {
    // finished loading and play enter animation
    if (count >= 100) {
      finishAnimation();
      return;
    }
    const d = Math.random();
    count += d > 0.7 ? Math.ceil(Math.sqrt(d) * 30) : Math.ceil(Math.sqrt(d) * 5);
    if (count > 100) count = 100;
    countDisplayRef.current!.textContent = `${count}%`;
    gsap.to(countDisplayRef.current, {
      x: (distance * count) / 100,
      duration: 1
    });
    gsap.to(barRef.current, {
      xPercent: count,
      duration: 1
    });
    setTimeout(() => load(count, distance), 250);
  });

  const finishAnimation = contextSafe(() => {
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
  });

  useEffect(() => {
    if (!countDisplayRef.current) return;
    const rect = countDisplayRef.current.getBoundingClientRect();
    const endPosition = rect.right;
    const distance = window.innerWidth - endPosition - rect.width;
    load(0, distance);
  }, [ctx.lenis, load]);

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
