import './style.css';
import './components/css/technologies.css';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin, TextPlugin } from 'gsap/all';
import SplitType from 'split-type';
import Cursor from './components/cursor.ts';
import Technologies from './components/technologies.ts';
import { darkColor } from './colors.ts';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

// all child objects where it will be animated through tick method
const updatables: any[] = [];

let count = 100;
let loadPercent = 0;

/**
 * Loading screen
 */
function load() {
	// finished loading and play enter animation
	if (count >= 100) {
		gsap.to('#load-name', {
			fontSize: '30px',
			top: '2.5%',
			left: '5%',
			duration: 1.5,
			ease: 'power2.out',
			delay: 0.6
		});
		// wait for .5 seconds
		setTimeout(() => {
			let loadingPercent = new SplitType('#loading');
			gsap
				.timeline()
				.to(loadingPercent!.chars, {
					yPercent: -200,
					stagger: 0.15,
					duration: 0.5,
					delay: 0.5
				})
				.to('.loader-container', {
					opacity: 0,
					duration: 0.5,
					delay: 0.3,
					ease: 'power2.out'
				})
				.add(() => {
					document.querySelector('.loader-container')?.remove();
				});
		}, 500);
		return;
	}
	// must wait for load manager to finish
	if (count / 100 >= loadPercent) {
		setTimeout(load, 60);
	} else {
		count++;
	}
	const loading = document.getElementById('loading')!;
	loading.innerHTML = count + '%';
	let scalePercent = (count * 82) / 100;
	document.getElementById('loading')!.style.right = 82 - scalePercent + '%';
	setTimeout(load, 60);
}

// artificial loading
load();
document.querySelector('.loader-container')?.remove();

/**
 * Initialize meshes
 */
// Promise.all([Technologies.init()]).then(() => {
// 	//updatables.push(Titles);
// });

new Cursor();
new Technologies().init();

document.getElementById('header-name')!.addEventListener('click', () => {
	scrollToPosition(0);
});
document.getElementById('header-abt')!.addEventListener('click', () => {
	scrollToPosition(0.11);
});
document.getElementById('header-proj')!.addEventListener('click', () => {
	scrollToPosition(0.41);
});
document.getElementById('header-tech')!.addEventListener('click', () => {
	scrollToPosition(0.75);
});
document.getElementById('header-contact')!.addEventListener('click', () => {
	scrollToPosition(0.93);
});

const scrollToPosition = (percent: number) => {
	let scrollContentHeight = document.querySelector('.page')!.scrollHeight;
	gsap.to(window, { duration: 3.5, ease: 'power2.out', scrollTo: scrollContentHeight * percent });
};

document.getElementById('contact')!.addEventListener('mouseover', () => {
	gsap.to('#contact', {
		duration: 0.8,
		text: {
			value: 'LETS GET IN TOUCH'
		}
	});
});
document.getElementById('contact')!.addEventListener('mouseout', () => {
	gsap.to('#contact', {
		duration: 0.8,
		text: {
			value: 'INTERESTED IN WORKING?'
		}
	});
});

const aboutHello = new SplitType('.about-hello');
const aboutText = new SplitType('.about-text', { types: 'lines' });
const aboutLines = document.querySelectorAll('.about-text .line');

createLineWrapper(aboutLines);
//createLineWrapper(projectNameLines);
// wrap lines with div fsr to make line stagger work idk
function createLineWrapper(lines: NodeListOf<Element>) {
	lines.forEach(line => {
		const wrapper = document.createElement('div');
		wrapper.classList.add('line-wrapper');
		line.parentNode!.insertBefore(wrapper, line);
		wrapper.appendChild(line);
	});
}

/**
 * scroll animation by toggle
 */
// about
gsap.fromTo(
	aboutHello.chars,
	{
		yPercent: 300
	},
	{
		scrollTrigger: {
			trigger: '.about-container',
			start: '210% center',
			end: '300% 0%',
			//markers: true,
			toggleActions: 'play reverse play reverse'
		},
		yPercent: 0,
		stagger: 0.1,
		duration: 0.4
	}
);
gsap.fromTo(
	aboutText.lines,
	{
		yPercent: 100
	},
	{
		scrollTrigger: {
			trigger: '.about-container',
			start: '210% center',
			end: '300% 0%',
			//markers: true,
			toggleActions: 'play reverse play reverse'
		},
		yPercent: 0,
		stagger: 0.1,
		duration: 0.2
	}
);

/**
 * https://tympanus.net/codrops/2022/12/13/how-to-code-an-on-scroll-folding-3d-cardboard-box-animation-with-three-js-and-gsap/
 * Animation timeline by scrolling
 */
const timeline = gsap.timeline({
	scrollTrigger: {
		trigger: '.page',
		start: '0% 0%',
		end: '100% 100%',
		scrub: 1
		//markers: true
	}
});

timeline
	// .to(
	// 	pfpParam,
	// 	{
	// 		x: 15,
	// 		y: -1,
	// 		z: -8,
	// 		duration: 15 // end time is start time + duration
	// 	},
	// 	0 // start time
	// )

	// move about text out of screen
	.to('.about-container', { xPercent: -150, duration: 5 }, 28)

	// move works text then shrink then move again
	.to('.projects-container', { yPercent: -58, duration: 16 }, 22)
	.to('#works div', { fontSize: (window.innerWidth - 14) * 0.18, duration: 8 }, 40)
	.to('.projects-container', { yPercent: -200, duration: 48 }, 50)

	// moves technologies text left and right
	.fromTo('#best', { x: -window.innerWidth * 0.45 }, { x: -window.innerWidth * 0.15, duration: 35 }, 64)
	.fromTo('.main', { x: -window.innerWidth * 0.5 }, { x: window.innerWidth * 0.08, duration: 26 }, 64)
	.fromTo('#use', { x: window.innerWidth * 0.7 }, { x: -window.innerWidth * 0.35, duration: 35 }, 64)

	// fix box
	// .to('.box-container', { xPercent: -122.7, duration: 2 }, 78)

	// moves technologies up then down
	.to('.technologies-desc', { y: 0, duration: 26 }, 60)
	.to('.technologies-container', { yPercent: -100, duration: 26 }, 64)
	.to('.secondary', { opacity: 0, duration: 5 }, 85)
	//.to('.main', { y: window.innerHeight * 0.45, duration: 15 }, 93)
	//.to('.main', { scale: 0.75, duration: 15 }, 93)

	//.to(cameraParam, { x: 0, y: -85, z: 10, duration: 40 }, 50)

	// move project desc with screen
	// .from('.list-container', { xPercent: -105, duration: 3 }, 85)
	// .from('.item', { opacity: 0, xPercent: -105, stagger: 3, duration: 5 }, 92)
	// .from('.box-container', { yPercent: -150, duration: 5 }, 90)
	// .from('.box', { opacity: 0, yPercent: -50, stagger: 1.5, duration: 8 }, 88)

	// transition to contact page
	.to('.technologies-container', { xPercent: -100, duration: 23 }, 116)
	.to('.main', { x: 0, duration: 23 }, 116)
	.to('.contact-container', { xPercent: -100, duration: 21 }, 116)
	.to('.contact-container', { color: darkColor.hexString, duration: 2 }, 116)
	.to('#header-contact', { color: darkColor.hexString, duration: 3 }, 116)
	.to('#header-tech', { color: darkColor.hexString, duration: 3 }, 116.67)
	.to('#header-proj', { color: darkColor.hexString, duration: 3 }, 117.33)
	.to('#header-abt', { color: darkColor.hexString, duration: 3 }, 118)
	.to('#header-name', { color: darkColor.hexString, duration: 4 }, 129.5)

	// to make start time a percentage out of 140 from total duration
	// start time + duration cannot be greater than 140 or it will change timeline
	.to({}, {}, 140);
// it was 100% at 1500vh
