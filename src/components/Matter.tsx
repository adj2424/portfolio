import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { memo, useEffect, useRef } from 'react';
import { Engine, Render, Runner, Bodies, MouseConstraint, Mouse, Composite } from 'matter-js';

export const Matter = memo(() => {
  const container = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef<Engine>();
  const bigNumber = 10000;
  const thickness = 500;
  const scale = 0.000223214 * window.innerWidth + 0.4215;

  const [aboutCalled, oneCalled, twoCalled, threeCalled, fourCalled, fiveCalled, sixCalled] = [
    useRef(false),
    useRef(false),
    useRef(false),
    useRef(false),
    useRef(false),
    useRef(false),
    useRef(false)
  ];

  const createPill = async (url: string, scale: number, y?: number) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    const pill = Bodies.rectangle(Math.random() * window.innerWidth, y ?? -200, img.width * scale, img.height * scale, {
      restitution: 0.8,
      angle: (Math.random() - 0.5) * Math.PI * 0.5,
      chamfer: { radius: (img.height / 2) * 0.9 * scale },
      render: {
        sprite: {
          texture: url,
          xScale: scale,
          yScale: scale
        }
      }
    });
    Composite.add(engineRef.current!.world, pill);
  };

  const loadStaggerPills = async (urls: string[], scale: number) => {
    urls.forEach((e, i) => {
      setTimeout(() => {
        createPill(e, scale);
      }, i * 1000);
    });
  };

  // init matter js
  useEffect(() => {
    engineRef.current = Engine.create();
    engineRef.current.timing.timeScale = 1.5;
    const render = Render.create({
      canvas: canvasRef.current!,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false
        // showDebug: true
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

    const ceiling = Bodies.rectangle(window.innerWidth / 2, -thickness / 2 - window.innerHeight, bigNumber, thickness, {
      isStatic: true,
      render: {
        fillStyle: 'blue'
      }
    });

    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness / 2.02, bigNumber, thickness, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    });

    const left = Bodies.rectangle(-thickness / 2.02, 0, thickness, bigNumber, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    });

    const right = Bodies.rectangle(window.innerWidth + thickness / 2.02, 0, thickness, bigNumber, {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    });
    createPill('/pills/orange/about.png', scale, window.innerHeight - 100);
    createPill('/pills/orange/dragMe.png', scale, window.innerHeight - 100);
    Composite.add(engineRef.current.world, [ceiling, floor, left, right, mouseConstraint]);
    Render.run(render);
    Runner.run(Runner.create(), engineRef.current);

    // return () => {
    //   Render.stop(render);
    //   Engine.clear(engineRef.current!);
    //   render.canvas.remove();
    // };
  }, [scale]);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '505% top',
            // markers: true,
            pin: true,
            scrub: 1
          }
        })
        .to(canvasRef.current, { yPercent: -50, duration: 6 }, 2)
        .add(() => {
          if (!aboutCalled.current) {
            loadStaggerPills(['/pills/hello.png', '/pills/keepScrolling.png', '/pills/circle.png'], scale);
          }
          aboutCalled.current = true;
        }, 3)
        .add(() => {
          if (!oneCalled.current) {
            loadStaggerPills(['/pills/alanJiang.png', '/pills/swe.png', '/pills/age.png'], scale);
          }
          oneCalled.current = true;
        }, 16)
        .add(() => {
          if (!twoCalled.current) {
            loadStaggerPills(['/pills/virginiaTech.png', '/pills/circle.png', '/pills/yoe.png'], scale);
          }
          twoCalled.current = true;
        }, 21)
        .add(() => {
          if (!threeCalled.current) {
            loadStaggerPills(['/pills/backEnd.png', '/pills/circle.png', '/pills/frontEnd.png'], scale);
          }
          threeCalled.current = true;
        }, 28)
        .add(() => {
          if (!fourCalled.current) {
            loadStaggerPills(['/pills/circle.png', '/pills/cloud.png', '/pills/solutionsArchitect.png'], scale);
          }
          fourCalled.current = true;
        }, 33)
        .add(() => {
          if (!fiveCalled.current) {
            loadStaggerPills(['/pills/freshIdeas.png', '/pills/passionate.png', '/pills/circle.png'], scale);
          }
          fiveCalled.current = true;
        }, 38)
        .add(() => {
          if (!sixCalled.current) {
            loadStaggerPills(['/pills/memorableExperiences.png', '/pills/developer.png'], scale);
          }
          sixCalled.current = true;
        }, 41)
        .to(canvasRef.current, { yPercent: 10, duration: 10 }, 88.5)
        .to(canvasRef.current, { yPercent: 70, duration: 1 }, 99)
        .to({}, {}, 100);
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container} className="absolute z-[1]">
        <canvas ref={canvasRef} className="w-full h-screen mt-[50vh]"></canvas>
      </div>
    </>
  );
});
