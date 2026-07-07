import gsap from 'gsap';
import { memo, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMyContext } from '../useMyContext';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const Technology = memo(({ name }: { name: string }) => {
  const [hover, setHover] = useState(false);
  const techRef = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();

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
        className="h-[calc(1em)] w-full text-xl leading-none overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div ref={techRef} className="flex flex-col items-center">
          <div>{name}</div>
          <div
            className="row-tech flex w-full bg-accent"
            style={{
              justifyContent: ctx.isTablet ? 'center' : 'space-between',
              marginTop: ctx.isTablet ? '3px' : '0px'
            }}
          >
            {!ctx.isTablet && <div className="text-dark ml-[0.5rem]">SKILLS</div>}
            <div className="text-dark">{name}</div>
            {!ctx.isTablet && <div className="text-dark mr-[0.5rem]">SKILLS</div>}
          </div>
        </div>
      </div>
    </>
  );
});

export const Technologies = memo(() => {
  //console.log('Technologies rendered');
  const techRef = useRef<HTMLDivElement>(null);
  const remainingRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();

  const getFontSize = () => {
    const e = document.querySelector('.text-xl') as HTMLElement;
    return parseFloat(getComputedStyle(e).fontSize);
  };

  useGSAP(
    () => {
      if (!ctx.lenis) return;
      const reducedFontSize = getFontSize();
      const marginY = (window.innerHeight - reducedFontSize) / 2;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top top',
            end: '120% top',
            markers: true,
            pin: true,
            scrub: 1
          }
        })
        .to(techRef.current, { fontSize: `${reducedFontSize}px`, duration: 40 }, 10)
        .fromTo(remainingRef.current, { y: 0, duration: 50 }, { y: -marginY, duration: 50 }, 48)
        .to({}, {}, 100);
    },
    { dependencies: [ctx.lenis], scope: container, revertOnUpdate: true }
  );

  return (
    <>
      <div id="technologies" ref={container} className="mb-[2rem]">
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
});

