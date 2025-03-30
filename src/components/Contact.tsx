import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';
import { useLenisContext } from './Lenis';
gsap.registerPlugin(TextPlugin);

interface ContactProps {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Contact = ({ setHover }: ContactProps) => {
  const container = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisContext();
  const [isInterested, setIsInterested] = useState(true);
  const [isInRange, setIsInRange] = useState(false);

  const handleMouseEnter = (e: string) => {
    gsap.to(e, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    setHover(true);
  };

  const handleMouseLeave = (e: string) => {
    setHover(false);
    gsap.to(e, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
  };

  useEffect(() => {
    if (!isInRange) {
      gsap.to(contactRef.current, {
        duration: 0.6,
        text: {
          value: 'INTERESTED?'
        }
      });
      return;
    }
    gsap.to(contactRef.current, {
      duration: 0.6,
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
            scrub: 1
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
              <div className="h-[1.95rem] overflow-hidden">
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
              <div className="flex justify-end w-[30rem]">DESIGNED & CODED BY ME</div>
            </div>
            <div className="flex justify-between">
              <div className="w-[30rem]">SOFTWARE ENGINEER</div>
              <div className="flex justify-around w-[26rem]">
                <div className="h-[1.95rem] overflow-hidden">
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
                <div className="h-[1.95rem] overflow-hidden">
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
                <div className="h-[1.95rem] overflow-hidden">
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
              <div className="flex justify-end w-[30rem]">© ALAN JIANG 2023</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
