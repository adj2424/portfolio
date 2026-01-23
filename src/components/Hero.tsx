import { memo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = memo(() => {
  //console.log('Hero rendered');
  const container = useRef<HTMLDivElement>(null);
  const items = [useRef(null), useRef(null)] as React.RefObject<HTMLDivElement>[];

  useGSAP(
    () => {
      const nameWidth = items[0].current!.clientWidth;
      items.forEach((e: React.RefObject<HTMLDivElement>) => {
        gsap.fromTo(e.current, { x: 0 }, { x: -nameWidth, duration: 30, repeat: -1, ease: 'none' });
      });
    },
    { scope: container }
  );

  return (
    <>
      <div
        ref={container}
        id="hero"
        className="relative w-full h-screen flex items-center justify-center overflow-x-hidden"
      >
        <img className="w-[26rem] z-[1]" src="/pfp.jpg" />
        <div className="absolute flex text-2xl left-0 leading-[1] whitespace-nowrap">
          <div ref={items[0]} className="flex pr-[18rem] whitespace-nowrap">
            <div className="pr-[15rem]">ALAN</div>
            <div>JIANG</div>
          </div>
          <div ref={items[1]} className="flex pr-[18rem] whitespace-nowrap">
            <div className="pr-[15rem]">ALAN</div>
            <div>JIANG</div>
          </div>
        </div>
        <div className="flex absolute w-[92%] bottom-[24px] justify-between text-md">
          <div>SOFTWARE ENGINEER</div>
          <div className="flex flex-col items-center fill-accent text-accent">
            <div className="mx-[3rem]">SCROLL</div>
            <div className="w-[2rem] h-[2rem] mt-[8px]">
              <svg id="scroll" viewBox="0 0 20 11">
                <g transform="translate(-180.000000, -6684.000000)">
                  <g transform="translate(56.000000, 160.000000)">
                    <path d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39"></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div className="text-right">FULL STACK DEVELOPER</div>
        </div>
      </div>
    </>
  );
});
