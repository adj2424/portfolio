import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Works } from './components/Works';
import { Technologies } from './components/Technologies';
import { Contact } from './components/Contact';

function App() {
  // use context provider instead of defining state in app because state change in app causes all components to re-render
  return (
    <div className="page bg-dark font-inter font-[400] text-light">
      <Cursor></Cursor>
      <Header></Header>
      <Hero></Hero>
      <About></About>
      <Works></Works>
      <Technologies></Technologies>
      <Contact></Contact>
    </div>
  );
}

export default App;
