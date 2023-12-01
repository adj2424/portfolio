import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { lightColor } from '../colors';

export default class Projects {
	static projectText = new THREE.Mesh();
	static projectInfo = [
		{ site: 'https://nft-minter-polygon.vercel.app/', src: 'nft.png' },
		{ site: 'https://algosus.vercel.app/', src: 'algosus.png' },
		{ site: 'https://music-profile-three.vercel.app/', src: 'music.png' },
		{ site: 'https://github.com/adj2424/video-chat-website', src: 'powow.png' }
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
				color: lightColor.hex
			})
		);
		this.projectText = projectText;
	}
}
