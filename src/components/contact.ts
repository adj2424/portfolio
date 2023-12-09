import './css/contact.css';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/all';

export default class Contact {
	constructor(isMobile: boolean) {
		gsap.registerPlugin(TextPlugin);
		this.resize(isMobile);

		const copyRight = document.getElementById('copy-right')!;
		copyRight.innerHTML = `© ALAN JIANG ${new Date().getFullYear()}`;

		window.addEventListener('resize', () => {
			this.resize(isMobile);
		});
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
	}
	resize = (isMobile: boolean) => {
		if (window.innerWidth < 730 || isMobile) {
			Array.from(document.getElementsByClassName('left') as HTMLCollectionOf<HTMLElement>).map(e => {
				e.style.justifyContent = 'center';
			});
			Array.from(document.getElementsByClassName('right') as HTMLCollectionOf<HTMLElement>).map(e => {
				e.style.justifyContent = 'center';
			});
		} else {
			Array.from(document.getElementsByClassName('left') as HTMLCollectionOf<HTMLElement>).map(e => {
				e.style.justifyContent = 'flex-start';
			});
			Array.from(document.getElementsByClassName('right') as HTMLCollectionOf<HTMLElement>).map(e => {
				e.style.justifyContent = 'flex-end';
			});
		}
	};
}
