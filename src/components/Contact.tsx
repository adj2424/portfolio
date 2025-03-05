import gsap from 'gsap';
import { TextPlugin } from 'gsap/all';

gsap.registerPlugin(TextPlugin);

export const Contact = () => {
  const handleMouseEnter = () => {
    gsap.to('.interested-text', {
      duration: 0.8,
      text: {
        value: 'LETS GET IN TOUCH'
      }
    });
  };
  const handleMouseLeave = () => {
    gsap.to('.interested-text', {
      duration: 0.8,
      text: {
        value: 'INTERESTED IN WORKING?'
      }
    });
  };

  return (
    <>
      <div className="relative w-full h-screen bg-light text-dark">
        <div className="flex h-[90vh] text-[12rem] items-center justify-center text-center">
          <div
            className="interested-text w-[80%] leading-[14rem]"
            onMouseLeave={() => handleMouseLeave()}
            onMouseEnter={() => handleMouseEnter()}
          >
            INTERESTED IN WORKING?
          </div>
        </div>
        <div className="flex justify-center">
          <div className="absolute bottom-[1rem] w-[90vw] text-[1.3rem] leading-[1.8rem]">
            <div className="flex justify-between">
              <div className="w-[30rem]">ALAN JIANG</div>
              <div className="flex justify-center w-[30rem]">ADJ2424@GMAIL.COM</div>
              <div className="flex justify-end w-[30rem]">DESIGNED & CODED BY ME</div>
            </div>
            <div className="flex justify-between">
              <div className="w-[30rem]">SOFTWARE ENGINEER</div>
              <div className="flex justify-around w-[26rem]">
                <div>LINKEDIN</div>
                <div>INSTAGRAM</div>
                <div>GITHUB</div>
              </div>
              <div className="flex justify-end w-[30rem]">© ALAN JIANG 2023</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
