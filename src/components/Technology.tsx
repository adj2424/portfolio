import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TechnologyProps {
  name: string;
}
export const Technology = ({ name }: TechnologyProps) => {
  const [hover, setHover] = useState(false);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hover) {
      gsap.to(techRef.current, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    } else {
      gsap.to(techRef.current, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
    }
  }, [hover]);

  return (
    <>
      <div
        className="h-[5rem] overflow-hidden w-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div ref={techRef} className="flex flex-col items-center">
          <div>{name}</div>
          <div className="flex w-full justify-between bg-accent">
            <div className="text-dark ml-[0.5rem]">SKILLS</div>
            <div className="text-dark">{name}</div>
            <div className="text-dark mr-[0.5rem]">SKILLS</div>
          </div>
        </div>
      </div>
    </>
  );
};
