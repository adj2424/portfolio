import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

export default class Titles {
	static topTextGroup = new THREE.Group();
	static botTextGroup = new THREE.Group();
	constructor() {}
	static async init() {
		const fontLoader = new FontLoader();
		const loader = new TTFLoader();
		const ttf = await loader.loadAsync('/fonts/HankenGrotesk-Light.ttf');
		const font = fontLoader.parse(ttf);
		// create top text
		let words = ['SOFTWARE ENGINEER', 'SOFTWARE ENGINEER', 'SOFTWARE ENGINEER'];
		let coords = [
			[-45, 4, -5],
			[0, 4, -5],
			[45, 4, -5]
		];
		for (let i = 0; i < words.length; i++) {
			const textGeometry = new TextGeometry(words[i], {
				font: font,
				size: 3,
				height: 0.0
			});

			const topText = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: 0x0a0908 }));
			const [x, y, z] = coords[i];
			topText.position.set(x, y, z);
			this.topTextGroup.add(topText);
		}
		// create bottom text
		words = ['CREATIVE DEVELOPER', 'CREATIVE DEVELOPER', 'CREATIVE DEVELOPER'];
		coords = [
			[-45.5, -4.5, -5],
			[0, -4.5, -5],
			[45.5, -4.5, -5]
		];
		for (let i = 0; i < words.length; i++) {
			const textGeometry = new TextGeometry(words[i], {
				font: font,
				size: 3,
				height: 0.0
			});

			const botText = new THREE.Mesh(
				textGeometry,
				new THREE.MeshBasicMaterial({
					color: 0x0a0908
				})
			);
			const [x, y, z] = coords[i];
			botText.position.set(x, y, z);
			this.botTextGroup.add(botText);
		}
	}

	static tick = (delta: number) => {
		this.topTextGroup.children.map(e => {
			if (e.position.x < -90) {
				e.position.x = 45;
			}
			e.position.x -= 6 * delta;
		});

		this.botTextGroup.children.map(e => {
			if (e.position.x > 45.5) {
				e.position.x = -91;
			}
			e.position.x += 6 * delta;
		});
	};
}
