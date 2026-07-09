import gsap from 'gsap';
import { useRef, memo } from 'react';
import { useMyContext } from '../useMyContext';
import { getFontSize, getAge } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(ScrollTrigger, SplitText);

export const AboutMobile = memo(() => {
  const { lenis } = useMyContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutDescContainerRef = useRef<HTMLDivElement>(null);
  const aboutDescRef = useRef<HTMLDivElement>(null);
  const blankRef = useRef<HTMLDivElement>(null);
  const descriptions = [
    `I'M ALAN JIANG, A ${getAge()} YEAR OLD FULL STACK DEVELOPER WHO GRADUATED FROM VIRGINIA TECH. I LOVE SOLVING PROBLEMS AND BUILDING NEW THINGS.`,
    'FROM CREATING DYNAMIC WEB EXPERIENCES TO DEVELOPING CLOUD NATIVE MICROSERVICES, I AIM TO PROVIDE MY SERVICES TO ANY DISCIPLINE.',
    'I HAVE EXPANDED MY TECHNICAL EXPERTISE WITH MY YEARS OF EXPERIENCE WORKING WITH SAS, PERATON, CAPTECH, LPL FINANCIAL, CAPITAL ONE, AND MORE.'
  ];

  let split = SplitText.create(aboutDescRef.current, { type: 'lines', mask: 'lines' });

  const changeDescAnimation = (text: string) => {
    gsap
      .timeline()
      .to(split.lines, {
        yPercent: -85,
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: 0.07
      })
      .add(() => {
        split.revert();
        aboutDescRef.current!.textContent = text;
        split = SplitText.create(aboutDescRef.current, { type: 'lines', mask: 'lines' });
        gsap.fromTo(
          split.lines,
          {
            yPercent: 85
          },
          {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.inOut',
            stagger: 0.07
          }
        );
      });
  };

  useGSAP(
    () => {
      if (!lenis) return;
      const txt2xl = getFontSize('.text-2xl');

      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top top',
            end: '100% top',
            markers: true,
            pin: true,
            scrub: 1
          }
        })
        .to('.about', { fontSize: txt2xl, duration: 60 }, 20)
        .to({}, {}, 100);

      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutDescContainerRef.current,
            start: 'top top',
            end: '100% top',
            markers: true,
            pin: true,
            scrub: 1
          }
        })
        .add(() => changeDescAnimation(descriptions[1]), 20)
        .to({}, {}, 100);
    },
    { dependencies: [lenis], scope: containerRef, revertOnUpdate: true }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div ref={aboutRef} className="about flex w-screen h-screen justify-center items-center text-4xl">
        ABOUT
      </div>
      <div ref={aboutDescContainerRef} className="flex w-screen h-screen justify-center items-center">
        <div ref={blankRef} className="absolute bottom-[-100%] h-screen w-screen bg-light"></div>
        <div ref={aboutDescRef} className="w-[80%] text-center text-xl mix-blend-difference">
          {descriptions[0]}
        </div>
      </div>
    </div>
  );
});

