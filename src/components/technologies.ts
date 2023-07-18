import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/all';

export default class Technologies {
	static left1 = new THREE.Mesh();
	static left2 = new THREE.Mesh();
	static right = new THREE.Mesh();

	static row1 = new THREE.Group();
	static row2 = new THREE.Group();

	constructor() {}
	static async init() {
		gsap.registerPlugin(ScrollTrigger, TextPlugin);
		const fontLoader = new FontLoader();
		const loader = new TTFLoader();
		const ttf = await loader.loadAsync('/fonts/HankenGrotesk-Light.ttf');
		const font = fontLoader.parse(ttf);

		const words = ['THE BEST', 'TECHNOLOGIES', 'I USE'];
		const coords = [
			[-30, -80, -5],
			[-30, -85, -5],
			[0, -95, -5]
		];

		for (let i = 0; i < words.length; i++) {
			const textGeometry = new TextGeometry(words[i], {
				font: font,
				size: 3.5,
				height: 0.0
			});

			const text = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: 0x0a0908 }));
			const [x, y, z] = coords[i];
			text.position.set(x, y, z);
			text.material.color;
			if (i === 0) {
				this.left1 = text;
			}
			//
			else if (i === 1) {
				this.left2 = text;
			}
			//
			else if (i === 2) {
				this.right = text;
			}
		}

		//nextjs, react, threejs, js, ts, tailwind, html, css  front end
		//java, python, express, mongodb, google cloud platform backend
		//solidity, hardhat, etherjs, metamask, ipfs

		const front = [
			'logos/react.svg',
			'Next.js',
			'logos/typescript.svg',
			'Tailwind CSS',
			'React',
			'logos/nextjs.svg',
			'TypeScript',
			'logos/tailwind.svg'
		];

		const back = [
			'logos/java.svg',
			'Python',
			'logos/nodejs.svg',
			'MongoDB',
			'Java',
			'logos/python.svg',
			'Node.js',
			'logos/mongodb.svg'
		];

		const misc = [
			'logos/solidity.svg',
			'Hardhat',
			'logos/threejs.svg',
			'Google Cloud Platform',
			'Solidity',
			'logos/hardhat.svg',
			'Three.js',
			'logos/gcp.svg'
		];

		let count = 0;
		const playAnimation = () => {
			if (count > 2) {
				count = 0;
			}
			if (count === 0) {
				this.playAnimationHelper(front);
			}
			if (count === 1) {
				this.playAnimationHelper(back);
			}
			if (count === 2) {
				this.playAnimationHelper(misc);
			}
			count++;
		};

		// auto timer to play animation every 4 seconds
		let timed = setInterval(playAnimation, 4000);

		document.getElementById('testbtn')!.onclick = () => {
			// stop auto timer
			clearInterval(timed);
			if (count > 2) {
				count = 0;
			}
			playAnimation();
			// resume auto timer
			timed = setInterval(playAnimation, 4000);
		};
	}

	static playAnimationHelper = (arr: string[]) => {
		for (let i = 0; i < 8; i++) {
			// change image
			if (i === 0) {
				const e = document.getElementById(`box-${i}`)!;
				const imgElem = e.querySelector('img');
				gsap
					.timeline()
					.fromTo(
						imgElem,
						{
							xPercent: 0
						},
						{
							xPercent: -200,
							ease: 'back.in(2)',
							duration: 0.6
						}
					)
					.add(() => {
						imgElem!.src = arr[i];
					})
					.fromTo(
						imgElem,
						{
							xPercent: 150
						},
						{
							xPercent: 0,
							ease: 'back.out(2)',
							duration: 0.6
						}
					);
			} else if (i === 2) {
				const e = document.getElementById(`box-${i}`)!;
				const imgElem = e.querySelector('img');
				gsap
					.timeline()
					.fromTo(
						imgElem,
						{
							yPercent: 0
						},
						{
							yPercent: -200,
							ease: 'back.in(2)',
							duration: 0.6
						}
					)
					.add(() => {
						imgElem!.src = arr[i];
					})
					.fromTo(
						imgElem,
						{
							yPercent: 150
						},
						{
							yPercent: 0,
							ease: 'back.out(2)',
							duration: 0.6
						}
					);
			} else if (i === 5) {
				const e = document.getElementById(`box-${i}`)!;
				const imgElem = e.querySelector('img');
				gsap
					.timeline()
					.fromTo(
						imgElem,
						{
							yPercent: 0
						},
						{
							yPercent: 200,
							ease: 'back.in(2)',
							duration: 0.6
						}
					)
					.add(() => {
						imgElem!.src = arr[i];
					})
					.fromTo(
						imgElem,
						{
							yPercent: -150
						},
						{
							yPercent: 0,
							ease: 'back.out(2)',
							duration: 0.6
						}
					);
			} else if (i === 7) {
				const e = document.getElementById(`box-${i}`)!;
				const imgElem = e.querySelector('img');
				gsap
					.timeline()
					.fromTo(
						imgElem,
						{
							xPercent: 0
						},
						{
							xPercent: 200,
							ease: 'back.in(2)',
							duration: 0.6
						}
					)
					.add(() => {
						imgElem!.src = arr[i];
					})
					.fromTo(
						imgElem,
						{
							xPercent: -150
						},
						{
							xPercent: 0,
							ease: 'back.out(2)',
							duration: 0.6
						}
					);
			}
			// change text
			else {
				gsap.to(`#box-${i}`, {
					duration: 1,
					text: {
						value: arr[i]
					},
					ease: 'power2'
				});
			}
		}
	};
}
