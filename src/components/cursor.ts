import './css/cursor.css';
export default class Cursor {
	worksInfo = [
		{ site: 'https://nft-minter-polygon.vercel.app/', src: 'nft.png' },
		{ site: 'https://algosus.vercel.app/', src: 'algosus.png' },
		{ site: 'https://music-profile-three.vercel.app/', src: 'music.png' },
		{ site: 'https://github.com/adj2424/video-chat-website', src: 'powow.png' }
	];
	hover = false;
	x = 0;
	y = 0;
	constructor(isMobile: boolean) {
		if (isMobile) {
			document.querySelector('.cursor-container')!.remove();
			return;
		}
		const cursor = document.querySelector('.cursor-container') as HTMLElement;
		const cursorCircle = document.querySelector('.cursor-circle') as HTMLElement;
		const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
		const cursorDisplay = document.querySelector('.cursor-display') as HTMLElement;
		document.addEventListener('mousemove', e => {
			const cursorOutlineWidth = 3;
			const cursorW = document.querySelector('.cursor-circle')!.clientWidth + cursorOutlineWidth;
			this.x = e.clientX - cursorW / 2;
			this.y = e.clientY - cursorW / 2;

			// from css
			const scrollBarWidth = 11;
			let percentX = (this.x / (window.innerWidth - scrollBarWidth)) * 100;
			let percentY = (this.y / window.innerHeight) * 100;

			cursor.style.top = percentY + '%';
			cursor.style.left = percentX + '%';
			cursorDisplay.style.left = `-${cursorW / 2}px`;
			cursorDisplay.style.top = `${cursorW / 2}px`;
			if (this.hover) {
				cursorCircle.style.width = '17px';
				cursorCircle.style.height = '17px';
				cursorCircle.style.opacity = '.8';
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

		const projectElements = [
			...(document.getElementsByClassName('project-name') as HTMLCollectionOf<HTMLElement>),
			...(document.getElementsByClassName('arrow') as HTMLCollectionOf<HTMLElement>)
		];

		const elements: HTMLElement[] = [
			...(Array.from(document.querySelectorAll('.header-right div')) as HTMLElement[]),
			document.getElementById('header-name')!,
			...(Array.from(document.querySelectorAll('a')) as HTMLElement[]),
			...projectElements
		];

		elements.map(e => {
			e.addEventListener('mouseover', () => {
				this.hover = true;
			});
			e.addEventListener('mouseout', () => {
				this.hover = false;
			});
		});
		projectElements.map((e, i) => {
			const img = document.getElementById('display')! as HTMLImageElement;
			// shows the image when hovering over project name
			if (e.className === 'project-name') {
				e.addEventListener('mouseover', () => {
					img.src = this.worksInfo[i % this.worksInfo.length].src;
					img.style.opacity = '1';
				});
				e.addEventListener('mouseout', () => {
					img.style.opacity = '0';
				});
			}
		});
	}
}
