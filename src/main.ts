import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
// import SplitType from 'split-type';
import Cursor from './components/cursor.ts';
import Hero from './components/hero.ts';
import Works from './components/works.ts';
import Technologies from './components/technologies.ts';
import Contact from './components/contact.ts';
import { darkColor } from './colors.ts';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// let count = 100;
// let loadPercent = 0;

/**
 * Loading screen
 */
// function load() {
// 	// finished loading and play enter animation
// 	if (count >= 100) {
// 		gsap.to('#load-name', {
// 			fontSize: '30px',
// 			top: '2.5%',
// 			left: '5%',
// 			duration: 1.5,
// 			ease: 'power2.out',
// 			delay: 0.6
// 		});
// 		// wait for .5 seconds
// 		setTimeout(() => {
// 			let loadingPercent = new SplitType('#loading');
// 			gsap
// 				.timeline()
// 				.to(loadingPercent!.chars, {
// 					yPercent: -200,
// 					stagger: 0.15,
// 					duration: 0.5,
// 					delay: 0.5
// 				})
// 				.to('.loader-container', {
// 					opacity: 0,
// 					duration: 0.5,
// 					delay: 0.3,
// 					ease: 'power2.out'
// 				})
// 				.add(() => {
// 					document.querySelector('.loader-container')?.remove();
// 				});
// 		}, 500);
// 		return;
// 	}
// 	// must wait for load manager to finish
// 	if (count / 100 >= loadPercent) {
// 		setTimeout(load, 60);
// 	} else {
// 		count++;
// 	}
// 	const loading = document.getElementById('loading')!;
// 	loading.innerHTML = count + '%';
// 	let scalePercent = (count * 82) / 100;
// 	document.getElementById('loading')!.style.right = 82 - scalePercent + '%';
// 	setTimeout(load, 60);
// }

// artificial loading
//load();
document.querySelector('.loader-container')?.remove();

/**
 * Initialize meshes
 */
let isMobile = window.innerWidth < 550;

new Cursor(isMobile);
new Hero();
new Works();
new Technologies().init(isMobile);
new Contact(isMobile);

document.getElementById('header-name')!.addEventListener('click', () => {
	scrollToPosition(0);
});
// document.getElementById('header-about')!.addEventListener('click', () => {
// 	scrollToPosition(0.11);
// });
document.getElementById('header-works')!.addEventListener('click', () => {
	scrollToPosition(0.37);
});
document.getElementById('header-technologies')!.addEventListener('click', () => {
	scrollToPosition(0.71);
});
document.getElementById('header-contact')!.addEventListener('click', () => {
	scrollToPosition(0.9);
});

const scrollToPosition = (percent: number) => {
	let scrollContentHeight = document.querySelector('.page')!.scrollHeight;
	const current = window.scrollY / scrollContentHeight;
	const duration = 4.5 * Math.sqrt(Math.abs(current - percent));
	gsap.to(window, {
		duration: duration,
		ease: 'power2.out',
		scrollTo: scrollContentHeight * percent
	});
};
const resize = () => {
	const headerLeft = document.getElementsByClassName('header-left')[0] as HTMLElement;
	const headerRight = document.getElementsByClassName('header-right')[0] as HTMLElement;
	if (isMobile || window.innerWidth < 600) {
		headerLeft.style.visibility = 'hidden';
		headerRight.style.width = '100%';
		headerRight.style.marginRight = '0';
		headerRight.style.minWidth = window.innerWidth < 450 ? '100%' : '450px';
	} else {
		headerLeft.style.visibility = 'visible';
		headerRight.style.width = '30%';
	}
};
resize();
window.addEventListener('resize', () => {
	resize();
});

// const aboutHello = new SplitType('.about-hello');
// const aboutText = new SplitType('.about-text', { types: 'lines' });
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
// gsap.fromTo(
// 	aboutHello.chars,
// 	{
// 		yPercent: 300
// 	},
// 	{
// 		scrollTrigger: {
// 			trigger: '.about-container',
// 			start: '210% center',
// 			end: '300% 0%',
// 			//markers: true,
// 			toggleActions: 'play reverse play reverse'
// 		},
// 		yPercent: 0,
// 		stagger: 0.1,
// 		duration: 0.4
// 	}
// );
// gsap.fromTo(
// 	aboutText.lines,
// 	{
// 		yPercent: 100
// 	},
// 	{
// 		scrollTrigger: {
// 			trigger: '.about-container',
// 			start: '210% center',
// 			end: '300% 0%',
// 			//markers: true,
// 			toggleActions: 'play reverse play reverse'
// 		},
// 		yPercent: 0,
// 		stagger: 0.1,
// 		duration: 0.2
// 	}
// );

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
	.to('.hero-container', { yPercent: -100, duration: 18 }, 2)

	// move works text then shrink then move again
	.to('.works-container', { yPercent: -58, duration: 16 }, 6)
	.to('#works div', { fontSize: (window.innerWidth - 14) * 0.18, duration: 8 }, 24)
	.to('.works-container', { yPercent: -200, duration: 48 }, 34)

	// transition to technologies
	.to('.technologies-container', { yPercent: -100, duration: 26 }, 44)
	.fromTo('#best', { x: -window.innerWidth * 0.65 }, { x: -window.innerWidth * 0.21, duration: 28 }, 44)
	.fromTo('.main', { x: -window.innerWidth * 1.8 }, { x: 0, duration: 28 }, 42)
	.fromTo('#use', { x: window.innerWidth * 0.7 }, { x: -window.innerWidth * 0.1, duration: 35 }, 44)

	// move mask if mobile
	.to('#top', { yPercent: 100, duration: 8 }, 70)
	.to('#left', { xPercent: 100, duration: 8 }, 70)
	.to('#right', { xPercent: -100, duration: 8 }, 70)

	.to('.secondary', { opacity: 0, duration: 7 }, 65)
	.to('#matter-canvas', { yPercent: -50, duration: 12 }, 69)

	// move mask away
	.to('#top', { yPercent: -50, duration: 13 }, 92)
	.to('#left', { xPercent: -50, duration: 10 }, 95)
	.to('#right', { xPercent: 50, duration: 5 }, 89)

	// transition to contact page
	.to('.technologies-container', { xPercent: -100, duration: 20 }, 85)
	.to('.main', { x: 0, duration: 20 }, 85)
	.to('.contact-container', { xPercent: -100, duration: 20 }, 85)
	.to('.contact-container', { color: darkColor.hexString, duration: 2 }, 85)
	.to('#header-contact', { color: darkColor.hexString, duration: 1.5 }, 85.5)
	.to('#header-technologies', { color: darkColor.hexString, duration: 1.5 }, 86.5)
	.to('#header-works', { color: darkColor.hexString, duration: 1.5 }, 87.66)
	// .to('#header-about', { color: darkColor.hexString, duration: 1.5 }, 89)
	.to('#header-name', { color: darkColor.hexString, duration: 4 }, 96.5)

	// to make start time a percentage out of 140 from total duration
	// start time + duration cannot be greater than 140 or it will change timeline
	.to({}, {}, 110);
// it was 100% at 1500vh
