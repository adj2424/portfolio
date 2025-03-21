import Lenis from 'lenis';

interface HeaderProps {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  lenis: Lenis;
}

export const Header = ({ setHover, lenis }: HeaderProps) => {
  const handleScrollTo = (cssSelector: string, percentOffset: number) => {
    const offset = percentOffset * lenis.limit;
    lenis.scrollTo(cssSelector, {
      duration: 5,
      easing: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      offset: offset
    });
  };
  return (
    <>
      <div className="fixed flex w-screen justify-center text-[1.3rem] z-[3] mt-[1.5rem] mix-blend-difference">
        <div className="flex w-[90%] justify-between align-baseline user-select-none select-none">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleScrollTo('#hero', 0)}
          >
            ALAN JIANG
          </div>
          <div className="flex">
            <div
              className="mr-[3rem]"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleScrollTo('#works', -0.077)}
            >
              WORKS
            </div>
            <div
              className="mr-[3rem]"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleScrollTo('#technologies', 0.055)}
            >
              TECHNOLOGIES
            </div>
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleScrollTo('#contact', 0)}
            >
              CONTACT
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

