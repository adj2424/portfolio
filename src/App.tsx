import { Hero } from './components/Hero';
import { About } from './components/About';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      touchMultiplier: 2,
      infinite: false
    });

    // //get scroll value
    // lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    //   console.log({ scroll, limit, velocity, direction, progress });
    // });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="page bg-dark font-inter font-[400] text-light">
      <Hero></Hero>
      <About></About>
      <div className="h-screen w-full">random text</div>
    </div>
  );
}

export default App;

