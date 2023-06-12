import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default class Titles {
	static topTextGroup = new THREE.Group();
	constructor() {}
	static async init() {
		//let txt = new THREE.Mesh();
		const fontLoader = new FontLoader();
		const font = await fontLoader.loadAsync('/fonts/Hanken_Grotesk_Light_Regular.json');
		// name
		const words = ['SOFTWARE ENGINEER', 'SOFTWARE ENGINEER', 'SOFTWARE ENGINEER'];
		const coords = [
			[-45, 4, -5],
			[0, 4, -5],
			[45, 4, -5]
		];
		//const topTextGroup = new THREE.Group();
		for (let i = 0; i < words.length; i++) {
			const textGeometry = new TextGeometry(words[i], {
				font: font,
				size: 3,
				height: 0.0
			});

			const topText = new THREE.Mesh(
				textGeometry,
				new THREE.MeshBasicMaterial({
					color: 0x2d3033
				})
			);
			const [x, y, z] = coords[i];
			topText.position.set(x, y, z);
			this.topTextGroup.add(topText);
		}
	}

	static tick = delta => {
		this.topTextGroup.children.map(e => {
			if (e.position.x < -90) {
				e.position.x = 45;
			}
			e.position.x -= 5 * delta;
		});
	};
}
