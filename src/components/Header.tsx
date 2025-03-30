import gsap from 'gsap';
import { useLenisContext } from './Lenis';
interface HeaderProps {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setHover }: HeaderProps) => {
  const lenis = useLenisContext();
  const handleScrollTo = (cssSelector: string, percentOffset: number) => {
    const offset = percentOffset * lenis.limit;
    const distanceFromSelector = Math.abs(document.querySelector(cssSelector)!.getBoundingClientRect().top);
    const selectorPercent = distanceFromSelector / lenis.limit;
    const duration = 5 * Math.sqrt(selectorPercent);
    lenis.scrollTo(cssSelector, {
      duration: duration,
      easing: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      offset: offset
    });
  };

  const handleMouseEnter = (e: string) => {
    gsap.to(e, { yPercent: -50, ease: 'power3.inOut', duration: 0.6 });
    setHover(true);
  };

  const handleMouseLeave = (e: string) => {
    setHover(false);
    gsap.to(e, { yPercent: 0, ease: 'power3.inOut', duration: 0.6 });
  };

  return (
    <>
      <div className="fixed flex w-screen justify-center text-[1.3rem] z-[3] mt-[1.5rem] mix-blend-difference">
        <div className="flex w-[90%] justify-between align-baseline user-select-none select-none">
          <div className="h-[1.95rem] mr-[3rem] overflow-hidden">
            <div
              className="hero-header flex flex-col"
              onMouseEnter={() => handleMouseEnter('.hero-header')}
              onMouseLeave={() => handleMouseLeave('.hero-header')}
              onClick={() => handleScrollTo('#hero', 0)}
            >
              <div>ALAN JIANG</div>
              <div>ALAN JIANG</div>
            </div>
          </div>
          <div className="flex">
            <div className="h-[1.95rem] mr-[3rem] overflow-hidden">
              <div
                className="about-header flex flex-col"
                onMouseEnter={() => handleMouseEnter('.about-header')}
                onMouseLeave={() => handleMouseLeave('.about-header')}
                onClick={() => handleScrollTo('#about', 0.065)}
              >
                <div>ABOUT</div>
                <div>ABOUT</div>
              </div>
            </div>
            <div className="h-[1.95rem] mr-[3rem] overflow-hidden">
              <div
                className="works-header flex flex-col"
                onMouseEnter={() => handleMouseEnter('.works-header')}
                onMouseLeave={() => handleMouseLeave('.works-header')}
                onClick={() => handleScrollTo('#works', -0.075)}
              >
                <div>WORKS</div>
                <div>WORKS</div>
              </div>
            </div>
            <div className="h-[1.95rem] mr-[3rem] overflow-hidden">
              <div
                className="technologies-header flex flex-col"
                onMouseEnter={() => handleMouseEnter('.technologies-header')}
                onMouseLeave={() => handleMouseLeave('.technologies-header')}
                onClick={() => handleScrollTo('#technologies', 0.055)}
              >
                <div>TECHNOLOGIES</div>
                <div>TECHNOLOGIES</div>
              </div>
            </div>
            <div className="h-[1.95rem] mr-[3rem] overflow-hidden">
              <div
                className="contact-header flex flex-col"
                onMouseEnter={() => handleMouseEnter('.contact-header')}
                onMouseLeave={() => handleMouseLeave('.contact-header')}
                onClick={() => handleScrollTo('#contact', 0.09)}
              >
                <div>CONTACT</div>
                <div>CONTACT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
