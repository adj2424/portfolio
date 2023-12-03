import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import Technologies from './components/Technologies';
import Contact from './components/Contact';

function App() {
	return (
		<>
			<div className="h-[1500vh]">
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

