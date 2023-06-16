import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';

import Titles from './components/titles.ts';
import Portrait from './components/portrait.ts';
import Projects from './components/projects.ts';

//import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
//import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//import Titles from './components/titles.js';

// all child objects where it will be animated through tick method
const updatables: any[] = [];

/**
 * World
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg')!,
	antialias: true
});
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
(torus as any).tick = (delta: number) => {
	//torus.rotation.x += 1 * delta;
};
torus.position.set(0, -60, -8);
scene.add(torus);

/**
 * Initialize meshes
 */
await Titles.init();
scene.add(Titles.topTextGroup);
scene.add(Titles.botTextGroup);
//updatables.push(Titles);

await Portrait.init();
scene.add(Portrait.pfpMesh);
// scene.add(Portrait.topPfpMesh);
// scene.add(Portrait.botPfpMesh);
// scene.add(Portrait.leftPfpMesh);
// scene.add(Portrait.rightPfpMesh);
scene.add(Portrait.borderPfpMesh);

await Projects.init();
scene.add(Projects.projectText);

/**
 * animates objects with animations
 * @param delta consistency of animation
 */
function tick(delta: number) {
	for (const obj of updatables) {
		obj.tick(delta);
	}
}

/**
 * Initial values of objects
 */

let cameraParam = { x: 0, y: 0, z: 10 };

let pfpParam = { x: -12, y: -6, z: -8 };
let pfpParamScale = { x: 8, y: 8, z: 8 };
let borderPfpParam = { x: 0, y: 0, z: 0 };
let borderPfpScaleParam = { x: 1, y: 1, z: 1 };
let topPfpMeshParam = { x: -12, y: 12, z: -8 };
let botPfpMeshParam = { x: -12, y: -17, z: -8 };
let leftPfpMeshParam = { x: -26, y: -4, z: -8 };
let rightPfpMeshParam = { x: 2, y: -4, z: -8 };

let topTextGroupParam = { x: 0, y: 0, z: 0 };
let botTextGroupParam = { x: 0, y: 0, z: 0 };
let botTextGroupScaleParam = { x: 1, y: 1, z: 1 };

let projectTextParam = { x: -36, y: -38, z: -8 };
let projectTextScaleParam = { x: 1, y: 1, z: 1 };

/**
 * Animate
 */
function animate() {
	// delta for consistency
	const delta = 0.005;
	tick(delta);
	//controls.update();
	camera.position.set(cameraParam.x, cameraParam.y, cameraParam.z);

	Portrait.pfpMesh.position.set(pfpParam.x, pfpParam.y, pfpParam.z);
	Portrait.pfpMesh.scale.set(pfpParamScale.x, pfpParamScale.y, pfpParamScale.z);
	Portrait.borderPfpMesh.position.set(borderPfpParam.x, borderPfpParam.y, borderPfpParam.z);
	Portrait.borderPfpMesh.scale.set(borderPfpScaleParam.x, borderPfpScaleParam.y, borderPfpScaleParam.z);
	Portrait.topPfpMesh.position.set(topPfpMeshParam.x, topPfpMeshParam.y, topPfpMeshParam.z);
	Portrait.botPfpMesh.position.set(botPfpMeshParam.x, botPfpMeshParam.y, botPfpMeshParam.z);
	Portrait.leftPfpMesh.position.set(leftPfpMeshParam.x, leftPfpMeshParam.y, leftPfpMeshParam.z);
	Portrait.rightPfpMesh.position.set(rightPfpMeshParam.x, rightPfpMeshParam.y, rightPfpMeshParam.z);

	Titles.topTextGroup.position.set(topTextGroupParam.x, topTextGroupParam.y, topTextGroupParam.z);
	Titles.botTextGroup.position.set(botTextGroupParam.x, botTextGroupParam.y, botTextGroupParam.z);
	Titles.botTextGroup.scale.set(botTextGroupScaleParam.x, botTextGroupScaleParam.y, botTextGroupScaleParam.z);

	Projects.projectText.position.set(projectTextParam.x, projectTextParam.y, projectTextParam.z);
	Projects.projectText.scale.set(projectTextScaleParam.x, projectTextScaleParam.y, projectTextScaleParam.z);

	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

const hello = new SplitType('.about-hello');
const text = new SplitType('.about-text', { types: 'lines' });
const lines = document.querySelectorAll('.about-text .line');
lines.forEach(line => {
	const wrapper = document.createElement('div');
	wrapper.classList.add('line-wrapper');
	line.parentNode!.insertBefore(wrapper, line);
	wrapper.appendChild(line);
});

gsap.registerPlugin(ScrollTrigger);
/**
 * scroll animation by toggle
 */
gsap.fromTo(
	hello.chars,
	{
		y: 300
	},
	{
		scrollTrigger: {
			trigger: '.about-container',
			start: '210% center',
			end: '340% 0%',
			markers: true,
			toggleActions: 'play reverse play reverse'
		},
		y: 0,
		stagger: 0.1,
		duration: 0.4
	}
);
gsap.fromTo(
	text.lines,
	{
		y: 50
	},
	{
		scrollTrigger: {
			trigger: '.about-container',
			start: '210% center',
			end: '340% 0%',
			markers: true,
			toggleActions: 'play reverse play reverse'
		},
		y: 0,
		stagger: 0.15,
		duration: 0.4
	}
);

const timeline = gsap.timeline({
	scrollTrigger: {
		trigger: '.page',
		start: '0% 0%',
		end: '100% 100%',
		scrub: 1,
		markers: true
	}
});

timeline
	.to(
		pfpParam,
		{
			x: 15,
			y: -1,
			z: -8,
			duration: 15 // end time is start time + duration
		},
		0 // start time
	)
	.to(pfpParamScale, { x: 4, y: 4, z: 4, duration: 15 }, 0)
	.to(topPfpMeshParam, { x: 16, y: 18, z: -8, duration: 15 }, 0)
	.to(botPfpMeshParam, { x: 16, y: -28, z: -8, duration: 15 }, 0)
	.to(leftPfpMeshParam, { x: 4, y: -4, z: -8, duration: 15 }, 0)
	.to(rightPfpMeshParam, { x: 26, y: -4, z: -8, duration: 15 }, 0)

	.to(topTextGroupParam, { x: 0, y: 8, z: 0, duration: 15 }, 0)
	.to(botTextGroupParam, { x: 0, y: -11, z: 0, duration: 15 }, 0)
	// remove things for next transition by scaling to 0
	.to(botTextGroupScaleParam, { x: 0, y: 0, z: 0, duration: 0.2 }, 15)
	.to(borderPfpParam, { x: 0, y: 0, z: -10, duration: 0.5 }, 15)
	.to(borderPfpScaleParam, { x: 0, y: 0, z: 0, duration: 0.5 }, 16)

	// move camera to project text
	.to(cameraParam, { x: 0, y: -31, z: 10, duration: 17 }, 18)

	// shrink project text
	.to(cameraParam, { x: 0, y: -31, z: 10, duration: 8 }, 36)
	.to(projectTextParam, { x: -18, y: -35, z: -8, duration: 8 }, 36)
	.to(projectTextScaleParam, { x: 0.5, y: 0.5, z: 0.5, duration: 8 }, 36)

	// move camera to project showcase
	.to(cameraParam, { x: 0, y: -60, z: 10, duration: 20 }, 45)

	// to make start time a percentage out of 100 from total duration
	.to({}, {}, 100);
