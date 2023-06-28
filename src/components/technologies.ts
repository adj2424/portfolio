import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

export default class Technologies {
	static left1 = new THREE.Mesh();
	static left2 = new THREE.Mesh();
	static right = new THREE.Mesh();

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
	}
}
