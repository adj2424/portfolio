import WorkItem from './WorkItem';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import '../css/works.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Works = () => {
	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: '.test',

			scrub: 1,
			markers: true
		}
	});
	timeline.to('#works', { x: 100, duration: 50 }).to({}, {}, 100);
	return (
		<div className="test">
			<div className="works flex items-center justify-center h-screen">
				<div id="works" className="text-[35vw]">
					WORKS
				</div>
			</div>
			<div className="divider" />
			<WorkItem number={1} name="NFT MINTER" technologies={['Web3', 'Blockchain', 'Solidity']} />
			<div className="divider" />
			<WorkItem number={2} name="AI TRADING BOT" technologies={['Alpaca', 'API', 'ChatGPT', 'GCP', 'TypeScript']} />
			<div className="divider" />
			<WorkItem number={3} name="MUSIC PORTFOLIO" technologies={['Three.js', 'GSAP', 'TypeScript']} />
			<div className="divider" />
			<WorkItem number={4} name="POWOW" technologies={['MongoDB', 'Express', 'React', 'Node.js']} />
			<div className="divider" />
		</div>
	);
};

export default Works;
