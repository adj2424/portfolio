import './style.css';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// all child objects where it will be animated through tick method
const updatables = [];

/**
 * World
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);

/**
 * Background
 */
//https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
scene.background = new THREE.Color(0xe8e8e4);

/**
 * Light Source
 */
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

/**
 * Helpers
 */
const gridHelper = new THREE.GridHelper(500);
scene.add(gridHelper);
//const controls = new OrbitControls(camera, renderer.domElement);

/**
 * resize window
 */
window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
});

const geo = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(geo, material);
updatables.push(torus);
torus.tick = delta => {
	torus.rotation.x += 1 * delta;
};
//scene.add(torus);

//let txt = new THREE.Mesh();
const fontLoader = new FontLoader();
const font = await fontLoader.loadAsync('/fonts/Hanken_Grotesk_Light_Regular.json');

// name
const textGeometry = new TextGeometry('SOFTWARE ENGINEER   SOFTWARE ENGINEER   ', {
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
scene.add(topText);
topText.position.set(-2, 4, -5);

const croppedPfp = new THREE.Group();

// pfp image
let w = 0;
let h = 0;
const pfpTexture = new THREE.TextureLoader().load('/pfp.jpg', texture => {
	w = texture.image.width;
	h = texture.image.height;
	//pfpMesh.scale.x = 2;
	//pfpMesh.scale.y = 3;
	console.log(w, h);
});
pfpTexture.colorSpace = THREE.SRGBColorSpace;
const pfpMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(4, 5),
	new THREE.MeshBasicMaterial({
		map: pfpTexture
	})
);
pfpMesh.scale.set(8, 8, 8);
pfpMesh.position.set(-9, -4, -8);
croppedPfp.add(pfpMesh);
//scene.add(pfpMesh);

const topPfpMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(4, 2),
	new THREE.MeshBasicMaterial({
		color: 0xf3f3ec
	})
);
topPfpMesh.scale.set(8, 8, 8);
topPfpMesh.position.set(-9, 14, -8);
//scene.add(topPfpMesh);
croppedPfp.add(topPfpMesh);

const botPfpMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(4, 4),
	new THREE.MeshBasicMaterial({
		color: 0xf3f3ec
	})
);
botPfpMesh.scale.set(8, 8, 8);
botPfpMesh.position.set(-9, -15, -8);
//scene.add(botPfpMesh);
croppedPfp.add(botPfpMesh);

croppedPfp.position.set(0, -2, 0);
scene.add(croppedPfp);

/**
 * animates objects with animations
 * @param delta consistency of animation
 */
function tick(delta) {
	for (const obj of updatables) {
		obj.tick(delta);
	}
}

/**
 * Animate
 */
function animate() {
	// delta for consistency
	const delta = 0.005;
	tick(delta);
	//controls.update();
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
