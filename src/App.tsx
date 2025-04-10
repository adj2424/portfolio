import { useEffect, useRef } from 'react';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Works } from './components/Works';
import { Technologies } from './components/Technologies';
import { Contact } from './components/Contact';
import { ContextProvider, useMyContext } from './Context';
import { Loading } from './components/Loading';

const Page = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const ctx = useMyContext();

  useEffect(() => {
    if (ctx.onHover) {
      pageRef.current!.style.cursor = 'pointer';
    }
    //
    else {
      pageRef.current!.style.cursor = 'default';
    }
  }, [ctx.onHover]);

  return (
    <div ref={pageRef} className="font-inter font-[400] bg-dark text-light">
      {!ctx.isMobile && <Cursor />}
      <Loading />
      <Header />
      <Hero />
      <About />
      <Works />
      <Technologies />
      <Contact />
    </div>
  );
};

function App() {
  // use context provider instead of defining state in app because state change in app causes all components to re-render
  return (
    <>
      <ContextProvider>
        <Page />
      </ContextProvider>
    </>
  );
}

export default App;

