import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Technologies = () => {
  const container = useRef(null);
  const techRef = useRef<HTMLDivElement>(null);

  const remToPixels = (rem: number) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * rootFontSize;
  };

  useGSAP(
    () => {
      const heightInPixels = remToPixels(5);
      const marginY = (window.innerHeight - heightInPixels) / 2;
      const buffer = remToPixels(50);
      techRef.current!.style.paddingTop = `${marginY}px`;
      techRef.current!.style.paddingBottom = `${marginY}px`;
      gsap.timeline({
        scrollTrigger: {
          trigger: techRef.current,
          start: 'top top',
          end: `${window.innerHeight + buffer} ${(window.innerHeight + heightInPixels) / 2}`,
          markers: true,
          pin: true,
          scrub: 1
        }
      });
      // .to(techRef.current, { fontSize: '5rem', duration: 85 }, 5);
      // .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-full items-center text-[5rem] leading-none overflow-hidden">
          <div ref={techRef} className="text-[5rem] overflow-hidden">
            TECHNOLOGIES
          </div>
          <div className="h-[50rem] w-full bg-slate-900"></div>
          <div>REACT</div>
          <div>ANGULAR</div>
          <div>TAILWIND CSS</div>
          <div>JAVASCRIPT</div>
          <div>TYPESCRIPT</div>
          <div>EXPRESS.JS</div>
          <div>NEXT.JS</div>
          <div>THREE.JS</div>
          <div>REACT THREE FIBER</div>
          <div>GSAP</div>
          <div>PYTHON</div>
          <div>JAVA</div>
          <div>GO</div>
          <div>SOLIDITY</div>
          <div>HARDHAT</div>
          <div>AMAZON WEB SERVICES</div>
          <div>GOOGLE CLOUD PLATFORM</div>
          <div>TERRAFORM</div>
          <div>DOCKER</div>
          <div>GIT</div>
        </div>
      </div>
    </>
  );
};
