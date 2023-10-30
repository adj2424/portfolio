import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

export default class Projects {
	static projectText = new THREE.Mesh();
	static projects = new THREE.Group();
	projectInfo: any[] = [
		{
			titles: 'NFT Minter',
			descriptions: 'Web3/Blockchain/Solidity/Hardhat/IPFS',
			url: 'https://nft-minter-polygon.vercel.app/'
		},
		{
			titles: 'Music Portfolio',
			descriptions: 'Three.js/GSAP/TypeScript',
			url: 'https://music-profile-three.vercel.app/'
		},
		{
			titles: 'POWOW',
			descriptions: 'MongoDB/Express/React/Node.js',
			url: 'https://github.com/adj2424/video-chat-website'
		},
		{
			titles: 'AI Trading Bot',
			descriptions: 'API/Google Cloud Platform/ChatGPT/Alpaca/TypeScript',
			url: 'https://algosus.vercel.app/'
		}
	];
	constructor() {}
	static async init(loadManager: THREE.LoadingManager) {
		const fontLoader = new FontLoader(loadManager);
		const loader = new TTFLoader(loadManager);
		const ttf = await loader.loadAsync('/fonts/HankenGrotesk-Medium.ttf');
		const font = fontLoader.parse(ttf);
		const textGeometry = new TextGeometry('WORKS', {
			font: font,
			size: 15,
			height: 0.0
		});
		const projectText = new THREE.Mesh(
			textGeometry,
			new THREE.MeshBasicMaterial({
				color: 0xe8e8e4
			})
		);
		this.projectText = projectText;

		// 3rd item is the center displayed project
		const pictureURLs = ['powow.png', 'algosus.png', 'nft.png', 'music.png'];
		const itemCount = pictureURLs.length;
		for (let i = 0; i < itemCount * 2; i++) {
			const texture = new THREE.TextureLoader(loadManager).load(pictureURLs[i % itemCount]);
			texture.colorSpace = THREE.SRGBColorSpace;
			const geometry = new THREE.PlaneGeometry(18, 18);
			const material = new THREE.MeshBasicMaterial({ map: texture });
			const plane = new THREE.Mesh(geometry, material);
			plane.position.set(-56 + 28 * i, -57, -8);
			this.projects.add(plane);

			// project count text
			const textGeometry = new TextGeometry(`0${(i % itemCount) + 1}/`, {
				font: font,
				size: 0.5,
				height: 0.0
			});
			const projectCount = new THREE.Mesh(
				textGeometry,
				new THREE.MeshBasicMaterial({
					color: 0x0a0908
				})
			);
			projectCount.position.set(-10.5 + 28 * i, -48.5, -8);
			this.projects.add(projectCount);

			// background is so it can be draggable
			const backgroundGeo = new THREE.PlaneGeometry(36, 26);
			const backgroundMat = new THREE.MeshBasicMaterial({
				color: 0xe8e8e4,
				side: THREE.DoubleSide
			});
			const projectBackground = new THREE.Mesh(backgroundGeo, backgroundMat);
			projectBackground.position.set(-56 + 28 * i, -57, -8.5);
			this.projects.add(projectBackground);
		}
		this.projects.position.set(0, 0, 1);
	}

	public getProjectInfo() {
		return this.projectInfo;
	}
}
