import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const container = useRef(null);

  // https://www.youtube.com/watch?v=l0aI8Ecumy8
  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.slider',
            start: 'top top',
            end: '750% top',
            // markers: true,
            pin: true,
            scrub: 1
          }
        })
        // .to(
        // 	param,
        // 	{
        // 		x: 15,
        // 		duration: 15 // end time is start time + duration
        // 	},
        // 	0 // start time
        // )
        .to('.hello', { fontSize: '15rem', duration: 10 }, 5)
        .to('.slider', { xPercent: -78.26, duration: 65 }, 15) // xPercent is 100 + 260/460 from width of div
        .to('.works', { fontSize: '15rem', duration: 10 }, 85)

        // to make start time a percentage out of 100 from total duration
        // start time + duration cannot be greater than 100 or it will change timeline
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="relative overflow-hidden">
        <div className="slider flex mt-[10rem] w-[460vw]">
          <div className="hello flex w-screen h-screen justify-center items-center text-[40rem]">HELLO</div>
          <div className="relative flex w-[260vw] text-[2.5rem] leading-tight">
            <div className="absolute w-[70rem] top-[50%]">
              01/ I'M ALAN JIANG, A 24 YEAR OLD FULL STACK DEVELOPER WHO GRADUATED FROM VIRGINIA TECH. I LOVE SOLVING
              PROBLEMS AND BUILDING NEW THINGS.
            </div>
            {/* <div className="absolute bg-blue-400 w-[70rem] top-[30%]">
              I'm Alan Jiang, a 24 year old software engineer passionate about solving problems and building things.
            </div> */}
            <div className="absolute w-[60rem] top-[13rem] left-[100rem]">
              02/ FROM CREATING DYNAMIC WEB EXPERIENCES TO DEVELOPING CLOUD NATIVE MICROSERVICES, I AIM TO PROVIDE MY
              SERVICES TO ANY DISCIPLINE.
            </div>
            <div className="absolute w-[60rem] top-[20rem] left-[200rem]">
              03/ I HAVE EXPANDED MY TECHNICAL EXPERTISE WITH MY YEARS OF EXPERIENCE WORKING WITH SAS, PERATON, CAPTECH,
              LPL FINANCIAL, CAPITAL ONE, AND MORE.
            </div>
          </div>
          <div className="works relative flex w-screen h-screen justify-center items-center text-[40rem]">WORKS</div>
        </div>
      </div>
    </>
  );
};
