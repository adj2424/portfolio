import Lenis from 'lenis';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(TextPlugin);

interface ContactProps {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  lenis: Lenis;
}

export const Contact = ({ setHover, lenis }: ContactProps) => {
  const container = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isInterested, setIsInterested] = useState(true);
  const [isInRange, setIsInRange] = useState(false);

  useEffect(() => {
    if (!isInRange) {
      gsap.to(contactRef.current, {
        duration: 0.7,
        text: {
          value: 'INTERESTED?'
        }
      });
      return;
    }
    gsap.to(contactRef.current, {
      duration: 0.7,
      text: {
        value: isInterested ? 'INTERESTED?' : 'LETS GET IN TOUCH'
      }
    });
  }, [isInterested, isInRange]);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '150% top',
            markers: true,
            pin: true,
            scrub: 0.5
          }
        })
        .add(() => {
          if (lenis.direction === 1) {
            setIsInRange(true);
          } else {
            setIsInRange(false);
          }
        }, 55)
        .to(contactRef.current, { fontSize: '12rem', duration: 65 }, 10)
        .fromTo(contactRef.current, { width: '300%', duration: 65 }, { width: '80%', duration: 65 }, 10)
        .to('.left', { xPercent: 100, duration: 80 }, 10)
        .to('.right', { xPercent: -100, duration: 80 }, 10)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div id="contact" ref={container} className="relative overflow-hidden">
        <div className="left absolute left-[-51%] h-screen w-[51%] bg-light"></div>
        <div className="right absolute right-[-51%] h-screen w-[51%] bg-light"></div>
        <div className="relative flex h-screen items-center justify-center">
          <div
            ref={contactRef}
            className="text-[40rem] w-[300%] leading-none mix-blend-difference text-center"
            onMouseLeave={() => setIsInterested(true)}
            onMouseEnter={() => setIsInterested(false)}
          >
            INTERESTED?
          </div>
        </div>
        <div className="flex justify-center text-dark">
          <div className="absolute bottom-[1rem] w-[90vw] text-[1.3rem] leading-[1.8rem]">
            <div className="flex justify-between">
              <div className="w-[30rem]">ALAN JIANG</div>
              <a
                href="mailto:adj2424@gmail.com"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                ADJ2424@GMAIL.COM
              </a>
              <div className="flex justify-end w-[30rem]">DESIGNED & CODED BY ME</div>
            </div>
            <div className="flex justify-between">
              <div className="w-[30rem]">SOFTWARE ENGINEER</div>
              <div className="flex justify-around w-[26rem]">
                <a
                  href="https://www.linkedin.com/in/alanjiang24/"
                  target="_blank"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  LINKEDIN
                </a>
                <a
                  href="https://www.instagram.com/alanjiang24/"
                  target="_blank"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://github.com/adj2424"
                  target="_blank"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  GITHUB
                </a>
              </div>
              <div className="flex justify-end w-[30rem]">© ALAN JIANG 2023</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
