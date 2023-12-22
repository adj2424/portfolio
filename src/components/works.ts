import './css/works.css';
export default class Works {
	worksInfo = [
		{ site: 'https://nft-minter-polygon.vercel.app/', src: 'nft.png' },
		{ site: 'https://algosus.vercel.app/', src: 'algosus.png' },
		{ site: 'https://music-profile-three.vercel.app/', src: 'music.png' },
		{ site: 'https://github.com/adj2424/video-chat-website', src: 'powow.png' }
	];
	constructor() {
		const projectElements = [
			...(document.getElementsByClassName('project-name') as HTMLCollectionOf<HTMLElement>),
			...(document.getElementsByClassName('arrow') as HTMLCollectionOf<HTMLElement>)
		];
		projectElements.map((e, i) => {
			e.addEventListener('click', () => {
				window.open(this.worksInfo[i % this.worksInfo.length].site);
			});
		});
	}
}
