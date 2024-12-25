import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const myRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: myRef.current,
        start: 'top top',
        end: '800% top',
        markers: true,
        pin: true,
        scrub: 1
      }
    });
    // .to(
    // 	param,
    // 	{
    // 		x: 15,
    // 		y: -1,
    // 		z: -8,
    // 		duration: 15 // end time is start time + duration
    // 	},
    // 	0 // start time
    // )
    tl.to('.hello', { fontSize: '15rem', duration: 10 }, 5);
    tl.to(myRef.current, { xPercent: -80, duration: 85 }, 15)

      // to make start time a percentage out of 100 from total duration
      // start time + duration cannot be greater than 100 or it will change timeline
      .to({}, {}, 100);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <div ref={myRef} className="flex mt-[10rem] w-[500vw]">
          <div className="hello flex w-screen h-screen justify-center items-center text-[40rem]">HELLO</div>
          <div className="test relative flex w-[300vw] bg-gray-900 text-red-50 text-[2.5rem] leading-tight">
            <div className="absolute w-[70rem] top-[40%]">
              I'M ALAN JIANG, A 24 YEAR OLD FULL STACK DEVELOPER WHO GRADUATED FROM VIRGINIA TECH. I LOVE SOLVING
              PROBLEMS AND BUILDING NEW THINGS.
            </div>
            {/* <div className="absolute bg-blue-400 w-[70rem] top-[30%]">
              I'm Alan Jiang, a 24 year old software engineer passionate about solving problems and building things.
            </div> */}
            <div className="absolute w-[60rem] top-[20rem] left-[100rem]">
              FROM CREATING DYNAMIC WEB EXPERIENCES TO DEVELOPING CLOUD NATIVE MICROSERVICES, I AIM TO PROVIDE MY
              SERVICES TO ANY DISCIPLINE.
            </div>
            <div className="absolute w-[60rem] top-[15rem] left-[200rem]">
              WITH MY YEARS OF EXPERIENCE WORKING AT SAS, PERATON, AND CAPTECH
            </div>
          </div>
          <div className="flex w-screen h-screen justify-center items-center text-[40rem] bg-red-800 overflow-visible">
            WORKS
          </div>
        </div>
      </div>
    </>
  );
};
