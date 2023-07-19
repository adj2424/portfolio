import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

export default class Projects {
	static projectText = new THREE.Mesh();
	static projects = new THREE.Group();
	static projectInfo: any[] = [];
	constructor() {}
	static async init() {
		const fontLoader = new FontLoader();
		const loader = new TTFLoader();
		const ttf = await loader.loadAsync('/fonts/HankenGrotesk-Medium.ttf');
		const font = fontLoader.parse(ttf);

		//const font = await fontLoader.loadAsync('/fonts/Hanken_Grotesk_Light_Regular.json');
		const textGeometry = new TextGeometry('WORKS', {
			font: font,
			size: 15,
			height: 0.0
		});
		const projectText = new THREE.Mesh(
			textGeometry,
			new THREE.MeshBasicMaterial({
				color: 0x0a0908
			})
		);
		this.projectText = projectText;

		const pictureURLs = ['66.png', '1141549 Cropped.png', 'music Cropped.png', 'powow.png'];
		// 3rd item is the center displayed project
		const projectInfo = [
			{
				titles: 'NFT Minter',
				descriptions: 'Web3/Blockchain/Solidity/Hardhat/IPFS',
				url: 'https://nft-minter-polygon.vercel.app/'
			},
			{
				titles: 'AI Trading Bot',
				descriptions: 'API/Google Cloud Platform/ChatGPT/Alpaca/TypeScript',
				url: 'https://algosus.vercel.app/'
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
			}
		];

		/**
		 * For how projects is setup and displayed, the first two elements of the array is shifted
		 */
		for (let i = 0; i < 2; i++) {
			const t = projectInfo.shift();
			projectInfo.push(t as { titles: string; descriptions: string; url: string });
		}
		this.projectInfo = projectInfo;

		const itemCount = pictureURLs.length;

		for (let i = 0; i < itemCount * 2; i++) {
			const texture = new THREE.TextureLoader().load(pictureURLs[i % itemCount]);
			texture.colorSpace = THREE.SRGBColorSpace;
			const geometry = new THREE.PlaneGeometry(18, 18);
			const material = new THREE.MeshBasicMaterial({ map: texture });
			const plane = new THREE.Mesh(geometry, material);
			plane.position.set(-56 + 28 * i, -57, -8);
			this.projects.add(plane);

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
}
