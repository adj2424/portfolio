import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Technology } from './Technology';
import { useMyContext } from './Context';
gsap.registerPlugin(ScrollTrigger);

export const Technologies = () => {
  const container = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const remainingRef = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();

  const getFontSize = () => {
    const e = document.querySelector('.text-xl') as HTMLElement;
    return parseFloat(getComputedStyle(e).fontSize);
  };

  useGSAP(
    () => {
      const marginY = (window.innerHeight - getFontSize()) / 2;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top top',
            end: '130% top',
            // markers: true,
            pin: true,
            scrub: 1
          }
        })
        .to(techRef.current, { fontSize: `${getFontSize()}px`, duration: 40 }, 10)
        .fromTo(remainingRef.current, { marginTop: 0, duration: 50 }, { marginTop: -marginY, duration: 50 }, 48)
        .add(() => {
          // update state to force rerender for contact gsap timeline to update the pin start and end
          ctx.setForceRender(prev => prev + 1);
        }, 100)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} id="technologies" className="mb-[2rem]">
        <div ref={techRef} className="flex w-full h-screen items-center justify-center text-4xl overflow-hidden">
          TECHNOLOGIES
        </div>
        <div ref={remainingRef} className="flex flex-col items-center justify-center w-full">
          <Technology name="REACT" />
          <Technology name="ANGULAR" />
          <Technology name="TAILWIND CSS" />
          <Technology name="JAVASCRIPT" />
          <Technology name="TYPESCRIPT" />
          <Technology name="EXPRESS.JS" />
          <Technology name="NEXT.JS" />
          <Technology name="THREE.JS" />
          <Technology name="REACT THREE FIBER" />
          <Technology name="GSAP" />
          <Technology name="PYTHON" />
          <Technology name="JAVA" />
          <Technology name="GO" />
          <Technology name="SOLIDITY" />
          <Technology name="HARDHAT" />
          <Technology name="NOSQL" />
          <Technology name={ctx.isTablet ? 'AWS' : 'AMAZON WEB SERVICES'} />
          <Technology name={ctx.isTablet ? 'GCP' : 'GOOGLE CLOUD PLATFORM'} />
          <Technology name="TERRAFORM" />
          <Technology name="DOCKER" />
          <Technology name="GIT" />
        </div>
      </div>
    </>
  );
};
