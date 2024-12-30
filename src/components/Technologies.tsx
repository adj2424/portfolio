import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Technologies = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.tech',
            start: 'top top',
            end: 'bottom top',
            markers: true,
            pin: true,
            scrub: 1
          }
        })
        .to('.tech', { fontSize: '5rem', duration: 85 }, 5)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container}>
        <div className="tech flex w-full h-screen text-[40rem] items-center justify-center overflow-hidden">
          TECHNOLOGIES
        </div>
        <div className="flex flex-col w-full items-center text-[5rem] leading-none">
          <div>TECHNOLOGIES</div>
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
