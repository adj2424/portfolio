import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Works } from './components/Works';
import { Technologies } from './components/Technologies';
import { Contact } from './components/Contact';
import { ContextProvider } from './components/Context';

const Page = () => {
  return (
    <div className="font-inter font-[400] bg-dark text-light">
      <Cursor></Cursor>
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Works></Works>
      <Technologies></Technologies>
      <Contact></Contact>
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
