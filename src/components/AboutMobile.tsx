import { useRef, memo } from 'react';
import { useMyContext } from '../useMyContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutMobile = memo(() => {
  const { lenis } = useMyContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const birthDate = new Date(2000, 9, 24);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!hasBirthdayPassed) age--;

  useGSAP(
    () => {
      if (!lenis) return;

      // TODO: Add mobile-specific GSAP animations (fade-ins, staggered reveals, etc.)
    },
    { dependencies: [lenis], scope: containerRef, revertOnUpdate: true }
  );

  return (
    <div id="about-mobile" ref={containerRef} className="relative mt-48 px-6">
      <div className="flex justify-center items-center text-4xl mb-16 select-none">
        ABOUT
      </div>

      <div className="flex flex-col gap-16 text-base leading-tight">
        <div className="flex items-start">
          <div className="mr-4 shrink-0">01/</div>
          <div>
            I'M ALAN JIANG, A {age} YEAR OLD FULL STACK DEVELOPER WHO GRADUATED FROM VIRGINIA TECH. I LOVE SOLVING
            PROBLEMS AND BUILDING NEW THINGS.
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 shrink-0">02/</div>
          <div>
            FROM CREATING DYNAMIC WEB EXPERIENCES TO DEVELOPING CLOUD NATIVE MICROSERVICES, I AIM TO PROVIDE MY
            SERVICES TO ANY DISCIPLINE.
          </div>
        </div>

        <div className="flex items-start">
          <div className="mr-4 shrink-0">03/</div>
          <div>
            I HAVE EXPANDED MY TECHNICAL EXPERTISE WITH MY YEARS OF EXPERIENCE WORKING WITH SAS, PERATON, CAPTECH,
            LPL FINANCIAL, CAPITAL ONE, AND MORE.
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-4xl mt-16 select-none">
        WORKS
      </div>
    </div>
  );
});
