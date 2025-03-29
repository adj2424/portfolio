import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Matter } from './Matter';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const container = useRef(null);

  // https://www.youtube.com/watch?v=l0aI8Ecumy8
  useGSAP(
    () => {
      // timeline for about text and pinning
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.slider',
            start: 'top top',
            end: '750% top',
            markers: true,
            pin: true,
            scrub: 0.5
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
        .to('.hello', { fontSize: '15rem', duration: 9 }, 4)
        .to('.slider', { xPercent: (-(100 + 330) / 530) * 100, duration: 74 }, 14) // xPercent is -(w-screen + slide width)/total width * 100
        .to('.works', { fontSize: '15rem', duration: 9 }, 88)

        // to make start time a percentage out of 100 from total duration
        // start time + duration cannot be greater than 100 or it will change timeline
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="relative overflow-hidden mt-[10rem]">
        <div>
          <Matter></Matter>
        </div>
        <div className="slider flex w-[530vw] select-none pointer-events-none">
          <div className="hello flex w-screen h-screen justify-center items-center text-[40rem]">ABOUT</div>
          <div className="relative flex items-center w-[330vw] text-[2.5rem] leading-tight justify-between pr-[50vw] ">
            <div className="flex w-[70vw] items-center">
              <div className="mr-[5vw]">01/</div>
              <div>
                I'M ALAN JIANG, A 24 YEAR OLD FULL STACK DEVELOPER WHO GRADUATED FROM VIRGINIA TECH. I LOVE SOLVING
                PROBLEMS AND BUILDING NEW THINGS.
              </div>
            </div>
            <div className="flex w-[70vw] items-center">
              <div className="mr-[5vw]">02/</div>
              <div>
                FROM CREATING DYNAMIC WEB EXPERIENCES TO DEVELOPING CLOUD NATIVE MICROSERVICES, I AIM TO PROVIDE MY
                SERVICES TO ANY DISCIPLINE.
              </div>
            </div>
            <div className="flex w-[70vw] items-center">
              <div className="mr-[5vw]">03/</div>
              <div>
                I HAVE EXPANDED MY TECHNICAL EXPERTISE WITH MY YEARS OF EXPERIENCE WORKING WITH SAS, PERATON, CAPTECH,
                LPL FINANCIAL, CAPITAL ONE, AND MORE.
              </div>
            </div>
          </div>
          <div className="works relative flex w-screen h-screen justify-center items-center text-[40rem]">WORKS</div>
        </div>
      </div>
    </>
  );
};
