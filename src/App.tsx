import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Works } from './components/Works';
import { Technologies } from './components/Technologies';
import { Contact } from './components/Contact';
import { LenisContext } from './components/Lenis';
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [onHover, setHover] = useState(false);
  const [onWorksHover, setOnWorksHover] = useState({ isWorksTitleHover: false, worksImgSrc: '' });
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      touchMultiplier: 2,
      infinite: false
    });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    setLenis(lenis);
    return () => {
      lenis.destroy();
    };
  }, []);

  // lenis is not initialized in time for the components so we return null until it is initialized
  if (!lenis) {
    return null;
  }

  return (
    <LenisContext.Provider value={lenis}>
      <div className="page bg-dark font-inter font-[400] text-light">
        <Cursor onHover={onHover} onWorksHover={onWorksHover}></Cursor>
        <Header setHover={setHover}></Header>
        <Hero></Hero>
        <About></About>
        <Works setHover={setHover} setOnWorksHover={setOnWorksHover}></Works>
        <Technologies></Technologies>
        <Contact setHover={setHover}></Contact>
      </div>
    </LenisContext.Provider>
  );
}

export default App;
