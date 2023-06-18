import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

export default class Projects {
	static projectText = new THREE.Mesh();
	static projects = new THREE.Group();
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

		const colors = [0xff6347, 0xffff00, 0x196f3d, 0x0000ff];
		const pictureURLs = ['/66.png', '1141549 Cropped.png', 'music Cropped.png', 'powow.png'];

		for (let i = 0; i < 8; i++) {
			const texture = new THREE.TextureLoader().load(pictureURLs[i % 4]);
			texture.colorSpace = THREE.SRGBColorSpace;
			const geometry = new THREE.PlaneGeometry(18, 18);
			const material = new THREE.MeshBasicMaterial({ map: texture });
			const plane = new THREE.Mesh(geometry, material);
			plane.position.set(-56 + 28 * i, -59.5, -8);
			this.projects.add(plane);

			// background is so it can be draggable
			const backgroundGeo = new THREE.PlaneGeometry(36, 26);
			const backgroundMat = new THREE.MeshBasicMaterial({
				color: 0xe8e8e4, //0xe6e6fa
				side: THREE.DoubleSide
			});
			const projectBackground = new THREE.Mesh(backgroundGeo, backgroundMat);
			projectBackground.position.set(-56 + 28 * i, -60, -8.5);
			this.projects.add(projectBackground);
		}

		this.projects.position.set(0, 0, 1);
	}
}
