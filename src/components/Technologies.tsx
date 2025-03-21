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
        .to(techRef.current, { fontSize: '5rem', duration: 40 }, 10)
        .to('.remaining', { y: -marginY, duration: 50 }, 48)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} id="technologies">
        <div ref={techRef} className="flex w-full h-screen items-center justify-center text-[40rem] overflow-hidden">
          TECHNOLOGIES
        </div>
        <div className="remaining flex flex-col items-center justify-center text-[5rem] leading-none">
          <div className="hover:text-accent transition-all duration-500">REACT</div>
          <div className="hover:text-accent transition-all duration-500">ANGULAR</div>
          <div className="hover:text-accent transition-all duration-500">TAILWIND CSS</div>
          <div className="hover:text-accent transition-all duration-500">JAVASCRIPT</div>
          <div className="hover:text-accent transition-all duration-500">TYPESCRIPT</div>
          <div className="hover:text-accent transition-all duration-500">EXPRESS.JS</div>
          <div className="hover:text-accent transition-all duration-500">NEXT.JS</div>
          <div className="hover:text-accent transition-all duration-500">THREE.JS</div>
          <div className="hover:text-accent transition-all duration-500">REACT THREE FIBER</div>
          <div className="hover:text-accent transition-all duration-500">GSAP</div>
          <div className="hover:text-accent transition-all duration-500">PYTHON</div>
          <div className="hover:text-accent transition-all duration-500">JAVA</div>
          <div className="hover:text-accent transition-all duration-500">GO</div>
          <div className="hover:text-accent transition-all duration-500">SOLIDITY</div>
          <div className="hover:text-accent transition-all duration-500">HARDHAT</div>
          <div className="hover:text-accent transition-all duration-500">NOSQL</div>
          <div className="hover:text-accent transition-all duration-500">AMAZON WEB SERVICES</div>
          <div className="hover:text-accent transition-all duration-500">GOOGLE CLOUD PLATFORM</div>
          <div className="hover:text-accent transition-all duration-500">TERRAFORM</div>
          <div className="hover:text-accent transition-all duration-500">DOCKER</div>
          <div className="hover:text-accent transition-all duration-500">GIT</div>
        </div>
      </div>
    </>
  );
};

