import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { useMyContext } from '../Context';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(TextPlugin);

export const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();
  const lenis = ctx.lenis!;
  const setOnHover = ctx.setOnHover;
  const [isInterested, setIsInterested] = useState(true);
  const [isInRange, setIsInRange] = useState(false);
  const { contextSafe } = useGSAP({ scope: container });

  const getFontSize = () => {
    const e = document.querySelector('.text-2xl') as HTMLElement;
    let ret = parseFloat(getComputedStyle(e).fontSize) * 0.8;
    if (ctx.isTablet) {
      ret = parseFloat(getComputedStyle(e).fontSize) * 0.55;
    }
    return `${ret}px`;
  };

  const handleMouseEnter = contextSafe((e: string) => {
    gsap.to(e, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    setOnHover(true);
  });

  const handleMouseLeave = contextSafe((e: string) => {
    setOnHover(false);
    gsap.to(e, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
  });

  useEffect(() => {
    if (ctx.isTablet) {
      document.querySelectorAll('.left-contact').forEach((e: Element) => {
        (e as HTMLElement).style.textAlign = 'center';
      });
      document.querySelectorAll('.right-contact').forEach((e: Element) => {
        (e as HTMLElement).style.textAlign = 'center';
      });
    }
    //
    else {
      document.querySelectorAll('.left-contact').forEach((e: Element) => {
        (e as HTMLElement).style.textAlign = 'left';
      });
      document.querySelectorAll('.right-contact').forEach((e: Element) => {
        (e as HTMLElement).style.textAlign = 'right';
      });
    }
  }, [ctx.isTablet]);

  useEffect(() => {
    if (!isInRange) {
      gsap.to(textRef.current, {
        duration: 0.6,
        text: {
          value: 'INTERESTED?'
        }
      });
      return;
    }
    gsap.to(textRef.current, {
      duration: 0.6,
      text: {
        value: isInterested ? 'INTERESTED?' : 'LETS GET IN TOUCH'
      }
    });
  }, [isInterested, isInRange]);

  // we cannot use useGSAP here because we need to re init timeline on state change useGSAP was not working
  // follow old way before useGSAP - https://www.youtube.com/watch?v=l0aI8Ecumy8&t=606s
  useEffect(() => {
    const gsapCtx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '150% top',
            // markers: true,
            pin: true,
            scrub: 1
          }
        })
        .add(() => {
          setIsInRange(lenis.direction === 1);
        }, 55)
        .to(textRef.current, { fontSize: getFontSize(), duration: 65 }, 10)
        .fromTo(textRef.current, { width: '400%', duration: 65 }, { width: '80%', duration: 65 }, 10)
        .to(leftRef.current, { xPercent: 100, duration: 80 }, 10)
        .to(rightRef.current, { xPercent: -100, duration: 80 }, 10)
        .to({}, {}, 100);
    });
    return () => gsapCtx.revert();
  }, [ctx.lenis, ctx.forceRender]);

  return (
    <>
      <div id="contact" ref={container} className="overflow-hidden">
        <div ref={leftRef} className="absolute left-[-51%] h-screen w-[51%] bg-light"></div>
        <div ref={rightRef} className="absolute right-[-51%] h-screen w-[51%] bg-light"></div>
        <div className="flex h-screen items-center justify-center mix-blend-difference text-4xl">
          <div
            ref={textRef}
            className="w-[400%] leading-none text-center mix-blend-difference"
            onMouseLeave={() => setIsInterested(true)}
            onMouseEnter={() => setIsInterested(false)}
          >
            INTERESTED?
          </div>
        </div>
        <div className="flex justify-center text-dark">
          <div className="absolute flex flex-col bottom-[24px] w-full text-md">
            <div className="flex flex-wrap w-full justify-center items-center">
              {/* 30.66% is from 33% * 92% because we match header which is 92% and then divide by 3 for each column */}
              <div style={{ width: 'clamp(225px, 30%, 33.33%)' }} className="left-contact">
                ALAN JIANG
              </div>
              <div
                style={{ width: 'clamp(325px, 30%, 33.33%)' }}
                className="h-[calc(1em*1.5)] overflow-hidden text-center"
              >
                <div
                  className="email-footer flex flex-col"
                  onMouseEnter={() => handleMouseEnter('.email-footer')}
                  onMouseLeave={() => handleMouseLeave('.email-footer')}
                >
                  <a href="mailto:adj2424@gmail.com" target="_blank">
                    ADJ2424@GMAIL.COM
                  </a>
                  <a href="mailto:adj2424@gmail.com" target="_blank">
                    ADJ2424@GMAIL.COM
                  </a>
                </div>
              </div>
              <div style={{ width: 'clamp(250px, 30%, 33.33%)' }} className="right-contact">
                DESIGNED & CODED BY ME
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-center items-center">
              <div style={{ width: 'clamp(225px, 30%, 50%)' }} className="left-contact">
                SOFTWARE ENGINEER
              </div>
              <div style={{ width: 'clamp(325px, 30%, 33.33%)' }} className="flex justify-center">
                <div style={{ width: 'clamp(325px, 80%, 100%)' }} className="flex justify-around">
                  <div className="h-[calc(1em*1.5)] overflow-hidden">
                    <div
                      className="linkedin-footer flex flex-col"
                      onMouseEnter={() => handleMouseEnter('.linkedin-footer')}
                      onMouseLeave={() => handleMouseLeave('.linkedin-footer')}
                    >
                      <a href="https://www.linkedin.com/in/alanjiang24/" target="_blank">
                        LINKEDIN
                      </a>
                      <a href="https://www.linkedin.com/in/alanjiang24/" target="_blank">
                        LINKEDIN
                      </a>
                    </div>
                  </div>
                  <div className="h-[calc(1em*1.5)] overflow-hidden">
                    <div
                      className="instagram-footer flex flex-col"
                      onMouseEnter={() => handleMouseEnter('.instagram-footer')}
                      onMouseLeave={() => handleMouseLeave('.instagram-footer')}
                    >
                      <a href="https://www.instagram.com/alanjiang24/" target="_blank">
                        INSTAGRAM
                      </a>
                      <a href="https://www.instagram.com/alanjiang24/" target="_blank">
                        INSTAGRAM
                      </a>
                    </div>
                  </div>
                  <div className="h-[calc(1em*1.5)] overflow-hidden">
                    <div
                      className="github-footer flex flex-col"
                      onMouseEnter={() => handleMouseEnter('.github-footer')}
                      onMouseLeave={() => handleMouseLeave('.github-footer')}
                    >
                      <a href="https://www.github.com/adj2424" target="_blank">
                        GITHUB
                      </a>
                      <a href="https://www.github.com/adj2424" target="_blank">
                        GITHUB
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: 'clamp(225px, 30%, 50%)' }} className="right-contact">
                © ALAN JIANG 2023
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

