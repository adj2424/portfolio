import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const items = [useRef(null), useRef(null)] as React.RefObject<HTMLDivElement>[];

  useGSAP(
    () => {
      const nameWidth = items[0].current!.clientWidth;

      items.forEach((e: React.RefObject<HTMLDivElement>, i: number) => {
        console.log(i);
        gsap.fromTo(e.current, { x: 0 }, { x: -nameWidth, duration: 30, repeat: -1, ease: 'none' });
      });
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="relative w-full h-screen flex items-center justify-center overflow-x-hidden">
        <img className="w-[26rem] z-[1]" src="/pfp.jpg" />
        <div className="absolute flex text-[27rem] left-0 leading-[1] whitespace-nowrap">
          <div ref={items[0]} className="flex pr-[18rem] whitespace-nowrap">
            <div className="pr-[15rem]">ALAN</div>
            <div>JIANG</div>
          </div>
          <div ref={items[1]} className="flex pr-[18rem] whitespace-nowrap">
            <div className="pr-[15rem]">ALAN</div>
            <div>JIANG</div>
          </div>
        </div>
        <div className="flex absolute bg-green-600 w-[90%] bottom-[4rem] justify-between text-[1.3rem]">
          <div>SOFTWARE ENGINEER</div>
          <div>SCROLL</div>
          <div>FULL STACK DEVELOPER</div>
        </div>
      </div>
    </>
  );
};
