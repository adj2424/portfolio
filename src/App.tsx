import { Hero } from './components/Hero';
import { About } from './components/About';
import { Works } from './components/Works';
import { Technologies } from './components/Technologies';
import { Contact } from './components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const test = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // test.current!.style.marginTop = `-${(window.innerHeight - remToPixels(5)) / 2}px`;

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

  const remToPixels = (rem: number) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * rootFontSize;
  };

  return (
    <div className="page bg-dark font-inter font-[400] text-light">
      <Hero></Hero>
      <About></About>
      <Works></Works>
      <Technologies></Technologies>
      <div ref={test}>
        <Contact></Contact>
      </div>
    </div>
  );
}

export default App;

