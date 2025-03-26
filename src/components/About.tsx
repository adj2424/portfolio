import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Engine, Render, Runner, Bodies, MouseConstraint, Mouse, Composite } from 'matter-js';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef<Engine>();
  const bigNumber = 10000;
  const thickness = 500;
  const [oneCalled, twoCalled, threeCalled] = [useRef(false), useRef(false), useRef(false)];

  const createBall = (color: string) => {
    if (!engineRef.current) {
      return;
    }
    const newBall = Bodies.circle(100 * Math.random() + 400, 0, 20, {
      restitution: 0.6,
      render: {
        fillStyle: color
      }
    });
    Composite.add(engineRef.current.world, newBall);
  };

  // init matter js
  useEffect(() => {
    engineRef.current = Engine.create();
    const render = Render.create({
      canvas: canvasRef.current!,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false
        //background: 'rgba(255, 0, 0, 0.5)'
      }
    });

    const mouseConstraint = MouseConstraint.create(engineRef.current, {
      mouse: Mouse.create(render.canvas),
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    const ceiling = Bodies.rectangle(
      window.innerWidth / 2,
      -thickness / 2.1 - window.innerHeight / 2,
      bigNumber,
      thickness,
      {
        isStatic: true,
        render: {
          fillStyle: 'blue'
        }
      }
    );

    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness / 2.1, bigNumber, thickness, {
      isStatic: true,
      render: {
        fillStyle: 'blue'
      }
    });

    const left = Bodies.rectangle(-thickness / 2.1, 0, thickness, bigNumber, {
      isStatic: true,
      render: {
        fillStyle: 'blue'
        //fillStyle: 'transparent'
      }
    });

    const right = Bodies.rectangle(window.innerWidth + thickness / 2.1, 0, thickness, bigNumber, {
      isStatic: true,
      render: {
        fillStyle: 'blue'
        //fillStyle: 'transparent'
      }
    });

    const ball = Bodies.circle(600, 0, 20, {
      restitution: 0.6,
      render: {
        fillStyle: 'yellow'
      }
    });
    const ball2 = Bodies.circle(600, 0, 20, {
      restitution: 0.6,
      render: {
        fillStyle: 'blue'
      }
    });
    Composite.add(engineRef.current.world, [ceiling, floor, ball, ball2, left, right, mouseConstraint]);
    Render.run(render);
    Runner.run(Runner.create(), engineRef.current);
  }, []);

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

      // timeline for matter canvas and pinning
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.test',
            start: 'top top',
            end: '535% top',
            markers: true,
            pin: true,
            scrub: 0.5
          }
        })
        .to(canvasRef.current, { yPercent: -40, duration: 9 }, 2)
        .add(() => {
          if (!oneCalled.current) {
            createBall('green');
          }
          oneCalled.current = true;
          console.log('01 im called');
        }, 16)
        .add(() => {
          if (!twoCalled.current) {
            createBall('red');
          }
          twoCalled.current = true;
          console.log('02 im called');
        }, 30)
        .add(() => {
          if (!threeCalled.current) {
            createBall('purple');
          }
          threeCalled.current = true;
          console.log('03 im called');
        }, 45)
        .add(() => {
          oneCalled.current = twoCalled.current = threeCalled.current = false;
          console.log('reset called');
        }, 98)
        .to(canvasRef.current, { yPercent: 10, duration: 8 }, 90)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="relative overflow-hidden mt-[10rem]">
        <div className="test absolute z-[1]">
          <canvas ref={canvasRef} className="w-full h-screen mt-[40vh]"></canvas>
        </div>
        <div className="slider flex w-[530vw] select-none pointer-events-none">
          <div className="hello flex w-screen h-screen justify-center items-center text-[40rem]">HELLO</div>
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

