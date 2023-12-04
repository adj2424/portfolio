import './App.css';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import Technologies from './components/Technologies';
import Contact from './components/Contact';

function App() {
	return (
		<>
			<div className="flex flex-col bg-black">
				<Cursor />
				<Header />
				<Hero />
				<Works />
				<Technologies />
				<Contact />
			</div>
		</>
	);
}

export default App;

