import gsap from 'gsap';
import { useRef, memo } from 'react';
import { useMyContext } from '@/useMyContext';
import { getAge } from '@/utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const AboutMobile = memo(() => {
  const { lenis } = useMyContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const HIDDEN_CLIP = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  const REVEALED_CLIP = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  const descriptions = [
    `I'M ALAN JIANG, A ${getAge()} YEAR OLD FULL STACK DEVELOPER WHO GRADUATED FROM VIRGINIA TECH. I LOVE SOLVING PROBLEMS AND BUILDING NEW THINGS.`,
    'FROM CREATING DYNAMIC WEB EXPERIENCES TO DEVELOPING CLOUD NATIVE MICROSERVICES, I AIM TO PROVIDE MY SERVICES TO ANY DISCIPLINE.',
    'I HAVE EXPANDED MY TECHNICAL EXPERTISE WITH MY YEARS OF EXPERIENCE WORKING WITH SAS, PERATON, CAPTECH, LPL FINANCIAL, CAPITAL ONE, AND MORE.'
  ];

  useGSAP(
    () => {
      if (!lenis) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '300% top',
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        })
        .to(
          slide1Ref.current,
          {
            clipPath: REVEALED_CLIP,
            duration: 30
          },
          15
        )
        .to(
          slide2Ref.current,
          {
            clipPath: REVEALED_CLIP,
            duration: 30
          },
          60
        )
        .to({}, {}, 110);
    },
    { dependencies: [lenis], scope: containerRef, revertOnUpdate: true }
  );

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-dark">
      <div
        ref={slide1Ref}
        className="absolute flex w-full h-full justify-center items-center text-center z-[3] bg-dark"
        style={{ clipPath: HIDDEN_CLIP }}
      >
        <div className="w-[80%] text-xl">{descriptions[0]}</div>
      </div>
      <div
        ref={slide2Ref}
        className="absolute flex w-full h-full justify-center items-center text-center z-[2] bg-light"
        style={{ clipPath: HIDDEN_CLIP }}
      >
        <div className="w-[80%] text-xl text-dark">{descriptions[1]}</div>
      </div>
      <div
        ref={slide3Ref}
        className="absolute flex w-full h-full justify-center items-center text-center z-[1] bg-dark"
        style={{ clipPath: HIDDEN_CLIP }}
      >
        <div className="w-[80%] text-xl">{descriptions[2]}</div>
      </div>
    </div>
  );
});
