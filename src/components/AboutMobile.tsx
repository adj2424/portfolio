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
    if (aboutDescRef.current?.textContent === text || !lenis) return;
    const direction = lenis.direction || 1; // 1 for down, -1 for up
    const yPercentOut = direction === 1 ? -85 : 85;
    const yPercentIn = direction === 1 ? 85 : -85;

    gsap
      .timeline()
      .to(split.lines, {
        yPercent: yPercentOut,
        duration: 0.4,
        ease: 'power3.inOut',
        stagger: 0.06
      })
      .add(() => {
        split.revert();
        aboutDescRef.current!.textContent = text;
        split = SplitText.create(aboutDescRef.current, { type: 'lines', mask: 'lines' });
        gsap.fromTo(
          split.lines,
          {
            yPercent: yPercentIn
          },
          {
            yPercent: 0,
            duration: 0.4,
            ease: 'power3.inOut',
            stagger: 0.06
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
            // markers: true,
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
            end: '300% top',
            // markers: true,
            pin: true,
            scrub: 1
          }
        })
        .add(() => changeDescAnimation(descriptions[0]), 0)
        .fromTo(blankRef.current, { yPercent: 0 }, { yPercent: -100, duration: 10 }, 10)
        .add(() => {
          const direction = lenis.direction || 1;
          const newText = direction === 1 ? descriptions[1] : descriptions[0];
          changeDescAnimation(newText);
        }, 25)
        .fromTo(blankRef.current, { yPercent: -100 }, { yPercent: -200, duration: 10 }, 40)
        .add(() => {
          const direction = lenis.direction || 1;
          const newText = direction === 1 ? descriptions[2] : descriptions[1];
          changeDescAnimation(newText);
        }, 55)
        .to({}, {}, 80);
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

