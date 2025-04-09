import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import SplitType from 'split-type';

gsap.registerPlugin();

export const Loading = () => {
  const countRef = useRef(0);
  const countDisplayRef = useRef(null) as any;
  const distanceRef = useRef(0);

  useEffect(() => {
    const rect = countDisplayRef.current.getBoundingClientRect();
    const endPosition = rect.right;
    distanceRef.current = window.innerWidth - endPosition - rect.width;
    load();
  }, []);

  // useEffect(() => {
  //   if (isComplete) {
  //     isCompleteRef.current = true;
  //   }
  // }, [isComplete]);

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
    countRef.current += d > 0.85 ? Math.ceil(Math.sqrt(d) * 20) : Math.ceil(Math.sqrt(d) * 6);
    if (countRef.current > 93) {
      countRef.current = 93;
    }
    countDisplayRef.current.textContent = `${countRef.current}%`;
    gsap.to(countDisplayRef.current, {
      x: (distanceRef.current * countRef.current) / 100,
      duration: 1
    });
    setTimeout(load, 200);
  };

  const finishAnimation = () => {
    countRef.current = 100;
    countDisplayRef.current.textContent = '100%';
    // const countPercent = new SplitType(countDisplayRef.current, { types: 'chars' });
    gsap
      .timeline()
      .to(countDisplayRef.current, {
        x: distanceRef.current,
        duration: 1
      })
      .to(countDisplayRef.chars, {
        yPercent: -200,
        stagger: 0.15,
        duration: 0.5,
        delay: 0.1
      })
      .to('#load-container', {
        yPercent: -100,
        duration: 1,
        ease: 'power2.inOut'
      });
  };
  return (
    <>
      <div
        id="load-container"
        className="flex items-center justify-center absolute w-full h-full font-oswald text-dark z-[100] bg-light "
      >
        <div className="text-[8rem] overflow-hidden">✨LOADING✨</div>
        <div ref={countDisplayRef} className="absolute bottom-0 left-[1rem] text-[8rem] overflow-hidden">
          0%
        </div>
      </div>
    </>
  );
};
