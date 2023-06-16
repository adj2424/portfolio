import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';

export default class Projects {
	static projectText = new THREE.Mesh();
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
				color: 0x2d3033
			})
		);
		this.projectText = projectText;
	}
}
