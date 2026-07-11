import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';
import { memo, useEffect, useRef, useState } from 'react';
import { useMyContext } from '@/useMyContext';
import { getFontSize } from '@/utils';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(TextPlugin);

export const Contact = memo(() => {
  //console.log('Contact rendered');
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { lenis, setOnHover, isMobile } = useMyContext();
  const [isInterested, setIsInterested] = useState(true);
  const [isInRange, setIsInRange] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      if (!lenis) return;
      const txt2xl = getFontSize('.text-2xl') * (isMobile ? 0.5 : 0.9);
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
          if (lenis) {
            setIsInRange(lenis.direction === 1);
          }
        }, 55)
        .to(textRef.current, { fontSize: txt2xl, duration: 65 }, 10)
        //  .fromTo(textRef.current, { width: '400%', duration: 65 }, { width: '91%', duration: 65 }, 10)
        .to(leftRef.current, { xPercent: 100, duration: 80 }, 10)
        .to(rightRef.current, { xPercent: -100, duration: 80 }, 10)
        .to({}, {}, 100);
    },
    { dependencies: [lenis], scope: container, revertOnUpdate: true }
  );

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    setOnHover(true);
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    setOnHover(false);
    gsap.to(e.currentTarget, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
  });

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

  return (
    <>
      <div id="contact" ref={container} className="relative overflow-hidden">
        <div ref={leftRef} className="absolute left-[-51%] h-screen w-[51%] bg-light"></div>
        <div ref={rightRef} className="absolute right-[-51%] h-screen w-[51%] bg-light"></div>
        <div className="flex w-full h-screen items-center justify-center mix-blend-difference text-4xl overflow-hidden">
          <div
            ref={textRef}
            className="leading-none text-center mix-blend-difference"
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
              <div
                style={{ width: 'clamp(225px, 30%, 33.33%)' }}
                className={`left-contact ${isMobile ? 'text-center' : 'text-left'}`}
              >
                ALAN JIANG
              </div>
              <div
                style={{ width: 'clamp(325px, 30%, 33.33%)' }}
                className="h-[calc(1em*1.5)] overflow-hidden text-center"
              >
                <div
                  className="email-footer flex flex-col"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="mailto:adj2424@gmail.com"
                    target="_blank"
                    aria-label="Send email to adj2424@gmail.com"
                    rel="noopener noreferrer"
                  >
                    ADJ2424@GMAIL.COM
                  </a>
                  <a
                    href="mailto:adj2424@gmail.com"
                    target="_blank"
                    aria-label="Send email to adj2424@gmail.com"
                    rel="noopener noreferrer"
                  >
                    ADJ2424@GMAIL.COM
                  </a>
                </div>
              </div>
              <div
                style={{ width: 'clamp(250px, 30%, 33.33%)' }}
                className={`right-contact ${isMobile ? 'text-center' : 'text-right'}`}
              >
                DESIGNED & CODED BY ME
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-center items-center">
              <div
                style={{ width: 'clamp(225px, 30%, 50%)' }}
                className={`left-contact ${isMobile ? 'text-center' : 'text-left'}`}
              >
                SOFTWARE ENGINEER
              </div>
              <div style={{ width: 'clamp(325px, 30%, 33.33%)' }} className="flex justify-center">
                <div style={{ width: 'clamp(325px, 80%, 100%)' }} className="flex justify-around">
                  <div className="h-[calc(1em*1.5)] overflow-hidden">
                    <div
                      className="linkedin-footer flex flex-col"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a href="https://www.linkedin.com/in/alanjiang24/" target="_blank" rel="noopener noreferrer">
                        LINKEDIN
                      </a>
                      <a href="https://www.linkedin.com/in/alanjiang24/" target="_blank" rel="noopener noreferrer">
                        LINKEDIN
                      </a>
                    </div>
                  </div>
                  <div className="h-[calc(1em*1.5)] overflow-hidden">
                    <div
                      className="instagram-footer flex flex-col"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a href="https://www.instagram.com/alanjiang24/" target="_blank" rel="noopener noreferrer">
                        INSTAGRAM
                      </a>
                      <a href="https://www.instagram.com/alanjiang24/" target="_blank" rel="noopener noreferrer">
                        INSTAGRAM
                      </a>
                    </div>
                  </div>
                  <div className="h-[calc(1em*1.5)] overflow-hidden">
                    <div
                      className="github-footer flex flex-col"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a href="https://www.github.com/adj2424" target="_blank" rel="noopener noreferrer">
                        GITHUB
                      </a>
                      <a href="https://www.github.com/adj2424" target="_blank" rel="noopener noreferrer">
                        GITHUB
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ width: 'clamp(225px, 30%, 50%)' }}
                className={`right-contact ${isMobile ? 'text-center' : 'text-right'}`}
              >
                © ALAN JIANG 2023
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

