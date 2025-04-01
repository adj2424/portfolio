import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useMyContext } from './Context';

interface TechnologyProps {
  name: string;
}
export const Technology = ({ name }: TechnologyProps) => {
  const [hover, setHover] = useState(false);
  const techRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();

  useEffect(() => {
    if (hover) {
      gsap.to(techRef.current, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    } else {
      gsap.to(techRef.current, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
    }
  }, [hover]);

  useEffect(() => {
    if (ctx.isTablet) {
      rowRef.current!.style.justifyContent = 'center';
    } else {
      rowRef.current!.style.justifyContent = 'space-between';
    }
  }, [ctx]);

  return (
    <>
      <div
        className="h-[calc(1em)] w-full text-xl leading-none overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div ref={techRef} className="flex flex-col items-center">
          <div>{name}</div>
          <div ref={rowRef} className="row-tech flex w-full bg-accent">
            {!ctx.isTablet && <div className="text-dark ml-[0.5rem]">SKILLS</div>}
            <div className="text-dark">{name}</div>
            {!ctx.isTablet && <div className="text-dark mr-[0.5rem]">SKILLS</div>}
          </div>
        </div>
      </div>
    </>
  );
};
