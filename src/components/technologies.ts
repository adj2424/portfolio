import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

export default class Technologies {
	static left1 = new THREE.Mesh();
	static left2 = new THREE.Mesh();
	static right = new THREE.Mesh();

	static row1 = new THREE.Group();
	static row2 = new THREE.Group();

	constructor() {}
	static async init() {
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

		//nextjs, react, threejs, ts, tailwind front end
		//java, python, express, mongodb, google cloud platform backend
		//solidity, hardhat, etherjs, metamask, ipfs

		const row1 = ['nextjs', 'react', 'threejs', 'ts', 'tailwind'];

		// for (let i = 0; i < row1.length - 1; i++) {
		// 	const techGeo = new THREE.PlaneGeometry(5, 5);
		// 	const techMat = new THREE.MeshBasicMaterial({
		// 		color: 0x00ff00, //0xe6e6fa
		// 		side: THREE.DoubleSide
		// 	});
		// 	const tech = new THREE.Mesh(techGeo, techMat);
		// 	tech.position.set(i * 6 - 8, -80, -1);
		// 	this.row1.add(tech);
		// }

		// for (let i = 0; i < row1.length - 1; i++) {
		// 	const techGeo = new THREE.PlaneGeometry(5, 5);
		// 	const techMat = new THREE.MeshBasicMaterial({
		// 		color: 0x00ff00, //0xe6e6fa
		// 		side: THREE.DoubleSide
		// 	});
		// 	const tech = new THREE.Mesh(techGeo, techMat);
		// 	tech.position.set(i * 6 - 8, -86, -1);
		// 	this.row2.add(tech);
		// }
	}
}
