import gsap from 'gsap';
import { useRef } from 'react';
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
      gsap
        .timeline({
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top top',
            end: `130% top`,
            markers: true,
            pin: true,
            scrub: 1
          }
        })
        .to(techRef.current, { fontSize: '5rem', duration: 55 }, 5)
        .to('.remaining', { y: -marginY, duration: 55 }, 45)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container}>
        <div ref={techRef} className="flex w-full h-screen items-center justify-center text-[40rem] overflow-hidden">
          TECHNOLOGIES
        </div>
        <div className="remaining flex flex-col items-center justify-center text-[5rem] leading-none">
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
          <div>NOSQL</div>
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
