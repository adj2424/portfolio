import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import SplitType from 'split-type';
import Titles from './components/titles.ts';
import Portrait from './components/portrait.ts';
import { projectInfo } from './components/projects.ts';
import Technologies from './components/technologies.ts';
import { darkColor } from './colors.ts';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
// actual loading stuff should be very fast
const loadManager = new THREE.LoadingManager();
loadManager.onProgress = (_, loaded, total) => {
	loadPercent = loaded / total;
};

/**
 * World
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')!,
	antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);

/**
 * Background
 */
//https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
scene.background = new THREE.Color(darkColor.hex);

/**
 * Light Source
 */
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

/**
 * resize window
 */
window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
});

/**
 * Initialize meshes
 */
Promise.all([Titles.init(loadManager), Portrait.init(loadManager), Technologies.init()]).then(() => {
	scene.add(Titles.topTextGroup);
	scene.add(Titles.botTextGroup);
	updatables.push(Titles);

	scene.add(Portrait.pfpMesh);
	scene.add(Portrait.borderPfpMesh);
});

/**
 * animates objects with animations
 * @param delta consistency of animation
 */
function tick(delta: number) {
	for (const obj of updatables) {
		obj.tick(delta);
	}
}

const cursor = document.querySelector('.cursor-container') as HTMLElement;
const cursorCircle = document.querySelector('.cursor-circle') as HTMLElement;
const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
const cursorDisplay = document.querySelector('.cursor-display') as HTMLElement;
document.addEventListener('mousemove', e => {
	const cursorOutlineWidth = 3;
	const cursorW = document.querySelector('.cursor-circle')!.clientWidth + cursorOutlineWidth;
	let mouseX = e.clientX - cursorW / 2;
	let mouseY = e.clientY - cursorW / 2;

	// from css
	const scrollBarWidth = 11;
	let percentX = (mouseX / (window.innerWidth - scrollBarWidth)) * 100;
	let percentY = (mouseY / window.innerHeight) * 100;

	cursor.style.top = percentY + '%';
	cursor.style.left = percentX + '%';
	cursorDisplay.style.left = `-${cursorW / 2}px`;
	cursorDisplay.style.top = `${cursorW / 2}px`;
	if (hover) {
		cursorCircle.style.width = '17px';
		cursorCircle.style.height = '17px';
		cursorCircle.style.opacity = '.7';
		cursorDot.style.width = '20px';
		cursorDot.style.height = '20px';
	}
	// default cursor
	else {
		cursorCircle.style.width = '35px';
		cursorCircle.style.height = '35px';
		cursorCircle.style.opacity = '1';
		cursorDot.style.width = '0px';
		cursorDot.style.height = '0px';
	}
});

document.addEventListener('mousedown', () => {
	cursorCircle.style.transform = 'scale(0.6)';
});

document.addEventListener('mouseup', () => {
	cursorCircle.style.transform = 'scale(1)';
});

let hover = false;

const projectElements = [
	...(document.getElementsByClassName('project-name') as HTMLCollectionOf<HTMLElement>),
	...(document.getElementsByClassName('arrow') as HTMLCollectionOf<HTMLElement>)
];

const elements: HTMLElement[] = [
	document.getElementById('header-name')!,
	document.getElementById('header-abt')!,
	document.getElementById('header-proj')!,
	document.getElementById('header-tech')!,
	document.getElementById('header-contact')!,
	document.getElementById('frontend')!,
	document.getElementById('backend')!,
	document.getElementById('misc')!,
	document.getElementById('socials-email')!,
	document.getElementById('socials-instagram')!,
	document.getElementById('socials-threads')!,
	document.getElementById('socials-linkedin')!,
	document.getElementById('socials-github')!,
	...projectElements
];

elements.map(e => {
	e.addEventListener('mouseover', () => {
		hover = true;
	});
	e.addEventListener('mouseout', () => {
		hover = false;
	});
});

const url = projectInfo;
projectElements.map((e, i) => {
	const img = document.getElementById('display')! as HTMLImageElement;
	e.addEventListener('click', () => {
		window.open(url[i % url.length].site);
	});
	// shows the image when hovering over project name
	if (e.className === 'project-name') {
		e.addEventListener('mouseover', () => {
			img.src = url[i % url.length].src;
			img.style.opacity = '1';
		});
		e.addEventListener('mouseout', () => {
			img.style.opacity = '0';
		});
	}
});

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

/**
 * Initial values of objects
 */
let cameraParam = { x: 0, y: 0, z: 10 };
let pfpParam = { x: -12, y: -6, z: -8 };
let pfpParamScale = { x: 8, y: 8, z: 8 };
let borderPfpParam = { x: 0, y: 0, z: 0 };
let borderPfpScaleParam = { x: 1, y: 1, z: 1 };
let topPfpMeshParam = { x: -12, y: 12, z: -8 };
let botPfpMeshParam = { x: -12, y: -17, z: -8 };
let leftPfpMeshParam = { x: -26, y: -4, z: -8 };
let rightPfpMeshParam = { x: 2, y: -4, z: -8 };

let topTextGroupParam = { x: 0, y: 0, z: 0 };
let botTextGroupParam = { x: 0, y: 0, z: 0 };
let botTextGroupScaleParam = { x: 1, y: 1, z: 1 };

/**
 * Animate
 */
function animate() {
	// delta for consistency
	const delta = 0.005;
	tick(delta);
	//controls.update();
	camera.position.set(cameraParam.x, cameraParam.y, cameraParam.z);
	//scene.background = new THREE.Color(bgColorParam.r, bgColorParam.g, bgColorParam.b).convertSRGBToLinear();

	Portrait.pfpMesh.position.set(pfpParam.x, pfpParam.y, pfpParam.z);
	Portrait.pfpMesh.scale.set(pfpParamScale.x, pfpParamScale.y, pfpParamScale.z);
	Portrait.borderPfpMesh.position.set(borderPfpParam.x, borderPfpParam.y, borderPfpParam.z);
	Portrait.borderPfpMesh.scale.set(borderPfpScaleParam.x, borderPfpScaleParam.y, borderPfpScaleParam.z);
	Portrait.topPfpMesh.position.set(topPfpMeshParam.x, topPfpMeshParam.y, topPfpMeshParam.z);
	Portrait.botPfpMesh.position.set(botPfpMeshParam.x, botPfpMeshParam.y, botPfpMeshParam.z);
	Portrait.leftPfpMesh.position.set(leftPfpMeshParam.x, leftPfpMeshParam.y, leftPfpMeshParam.z);
	Portrait.rightPfpMesh.position.set(rightPfpMeshParam.x, rightPfpMeshParam.y, rightPfpMeshParam.z);

	Titles.topTextGroup.position.set(topTextGroupParam.x, topTextGroupParam.y, topTextGroupParam.z);
	Titles.botTextGroup.position.set(botTextGroupParam.x, botTextGroupParam.y, botTextGroupParam.z);
	Titles.botTextGroup.scale.set(botTextGroupScaleParam.x, botTextGroupScaleParam.y, botTextGroupScaleParam.z);

	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

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
		scrub: 2
		//markers: true
	}
});

timeline
	.to(
		pfpParam,
		{
			x: 15,
			y: -1,
			z: -8,
			duration: 15 // end time is start time + duration
		},
		0 // start time
	)
	.to(pfpParamScale, { x: 4, y: 4, z: 4, duration: 15 }, 0)
	.to(topPfpMeshParam, { x: 16, y: 18, z: -8, duration: 15 }, 0)
	.to(botPfpMeshParam, { x: 16, y: -28, z: -8, duration: 15 }, 0)
	.to(leftPfpMeshParam, { x: 4, y: -4, z: -8, duration: 15 }, 0)
	.to(rightPfpMeshParam, { x: 26, y: -4, z: -8, duration: 15 }, 0)

	.to(topTextGroupParam, { x: 0, y: 8, z: 0, duration: 15 }, 0)
	.to(botTextGroupParam, { x: 0, y: -11, z: 0, duration: 15 }, 0)
	// remove things for next transition by scaling to 0
	.to(botTextGroupScaleParam, { x: 0, y: 0, z: 0, duration: 0.2 }, 15)
	.to(borderPfpParam, { x: 0, y: 0, z: -10, duration: 0.5 }, 15)
	.to(borderPfpScaleParam, { x: 0, y: 0, z: 0, duration: 0.5 }, 16)
	.to(cameraParam, { x: 0, y: -35, z: 10, duration: 22 }, 18)
	// move about text out of screen
	.to('.about-container', { xPercent: -150, duration: 5 }, 28)

	// move works text then shrink then move again
	.to('.projects-container', { yPercent: -58, duration: 16 }, 22)
	.to('#works div', { fontSize: (window.innerWidth - 14) * 0.18, duration: 8 }, 40)
	.to('.projects-container', { yPercent: -200, duration: 48 }, 50)

	// moves technologies text left and right
	.fromTo('#best', { x: -window.innerWidth * 0.45 }, { x: -window.innerWidth * 0.15, duration: 35 }, 64)
	.fromTo('.main', { x: -window.innerWidth * 0.8 }, { x: window.innerWidth * 0.08, duration: 26 }, 64)
	.fromTo('#use', { x: window.innerWidth * 0.7 }, { x: -window.innerWidth * 0.35, duration: 35 }, 64)

	// fix box
	.to('.box-container', { xPercent: -122.7, duration: 2 }, 78)

	// moves technologies up then down
	.to('.technologies-desc', { y: 0, duration: 26 }, 60)
	.to('.technologies-container', { yPercent: -100, duration: 26 }, 64)
	.to('.secondary', { opacity: 0, duration: 5 }, 85)
	.to('.main', { y: window.innerHeight * 0.45, duration: 15 }, 93)
	.to('.main', { scale: 0.75, duration: 15 }, 93)

	.to(cameraParam, { x: 0, y: -85, z: 10, duration: 40 }, 50)

	// move project desc with screen
	.from('.list-container', { xPercent: -105, duration: 3 }, 85)
	.from('.item', { opacity: 0, xPercent: -105, stagger: 3, duration: 5 }, 92)
	.from('.box-container', { yPercent: -150, duration: 5 }, 90)
	.from('.box', { opacity: 0, yPercent: -50, stagger: 1.5, duration: 8 }, 88)

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
