import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/all';
import { lightColor, accentColor } from '../colors';

export default class Technologies {
	constructor() {}
	static async init() {
		gsap.registerPlugin(ScrollTrigger, TextPlugin);

		const frontE = document.getElementById('frontend')! as HTMLElement;
		const backE = document.getElementById('backend')! as HTMLElement;
		const miscE = document.getElementById('misc')! as HTMLElement;

		let count = 0;
		const playAnimation = () => {
			const front = [
				'logos/javascript.svg',
				'TypeScript',
				'logos/react.svg',
				'Next.js',
				'logos/tailwind.svg',
				'JavaScript',
				'logos/typescript.svg',
				'React',
				'logos/nextjs.svg',
				'Tailwind CSS'
			];

			const back = [
				'logos/python.svg',
				'Java',
				'logos/nodejs.svg',
				'Solidity',
				'logos/mongodb.svg',
				'Python',
				'logos/java.svg',
				'Node.js',
				'logos/solidity.svg',
				'MongoDB'
			];

			const misc = [
				'logos/gcp.svg',
				'Hardhat',
				'logos/threejs.svg',
				'Git',
				'logos/vscode.svg',
				'Google Cloud Platform',
				'logos/hardhat.svg',
				'Three.js',
				'logos/git.svg',
				'VS Code'
			];
			if (count > 2) {
				count = 0;
			}
			if (count === 0) {
				frontE.style.color = accentColor.hexString;
				backE.style.color = lightColor.hexString;
				miscE.style.color = lightColor.hexString;
				this.playAnimationHelper(front);
			}
			if (count === 1) {
				frontE.style.color = lightColor.hexString;
				backE.style.color = accentColor.hexString;
				miscE.style.color = lightColor.hexString;
				this.playAnimationHelper(back);
			}
			if (count === 2) {
				frontE.style.color = lightColor.hexString;
				backE.style.color = lightColor.hexString;
				miscE.style.color = accentColor.hexString;
				this.playAnimationHelper(misc);
			}
			count++;
		};
		// auto timer to play animation every 4.5 seconds
		let timed = setInterval(playAnimation, 4500);
		const elements: HTMLElement[] = [frontE, backE, miscE];
		elements.map(e => {
			e.addEventListener('click', () => {
				// stop auto timer
				clearInterval(timed);
				if (e === frontE && count !== 1) {
					count = 0;
					playAnimation();
				} else if (e === backE && count !== 2) {
					count = 1;
					playAnimation();
				} else if (e === miscE && count !== 0) {
					count = 2;
					playAnimation();
				}
				// resume auto timer
				timed = setInterval(playAnimation, 4500);
			});
		});
	}

	static playAnimationHelper = (arr: string[]) => {
		for (let i = 0; i < 10; i++) {
			// change top row icons
			if (i === 0 || i === 2 || i === 4) {
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
							yPercent: 280,
							ease: 'back.in(2)',
							duration: 0.6
						}
					)
					.add(() => {
						imgElem!.src = arr[i];
					}, 0.68)
					.add(() => {
						gsap.fromTo(
							imgElem,
							{
								yPercent: -280
							},
							{
								yPercent: 0,
								ease: 'back.out(2)',
								duration: 0.6
							}
						);
					}, 0.75);
			}
			// bottom row icons
			else if (i === 6 || i === 8) {
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
							yPercent: -280,
							ease: 'back.in(2)',
							duration: 0.6
						}
					)
					.add(() => {
						imgElem!.src = arr[i];
					}, 0.68)
					.add(() => {
						gsap.fromTo(
							imgElem,
							{
								yPercent: 200
							},
							{
								yPercent: 0,
								ease: 'back.out(2)',
								duration: 0.6
							}
						);
					}, 0.75);
			}
			// change text
			else {
				gsap.to(`#box-${i}`, {
					duration: 1.2,
					text: {
						value: arr[i]
					},
					ease: 'power2.inOut'
				});
			}
		}
	};
}
