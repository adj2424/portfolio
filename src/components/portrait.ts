import * as THREE from 'three';

export default class Portrait {
	static pfpMesh = new THREE.Mesh();
	static topPfpMesh = new THREE.Mesh();
	static botPfpMesh = new THREE.Mesh();
	static leftPfpMesh = new THREE.Mesh();
	static rightPfpMesh = new THREE.Mesh();

	constructor() {}
	static async init() {
		const pfpTexture = new THREE.TextureLoader().load('/pfp.jpg');
		pfpTexture.colorSpace = THREE.SRGBColorSpace;
		this.pfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(4, 5),
			new THREE.MeshBasicMaterial({
				map: pfpTexture
			})
		);
		this.pfpMesh.scale.set(8, 8, 8);
		this.pfpMesh.position.set(-9, -4, -8);

		this.topPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(4, 2),
			new THREE.MeshBasicMaterial({
				color: 0xf3f3ec
			})
		);
		this.topPfpMesh.scale.set(8, 8, 8);
		this.topPfpMesh.position.set(-9, 14, -8);
		//this.croppedPfp.add(this.topPfpMesh);

		this.botPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(4, 4),
			new THREE.MeshBasicMaterial({
				color: 0xf3f3ec
			})
		);
		this.botPfpMesh.scale.set(8, 8, 8);
		this.botPfpMesh.position.set(-9, -15, -8);
		//this.croppedPfp.add(botPfpMesh);

		this.leftPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(0.5, 4),
			new THREE.MeshBasicMaterial({
				color: 0xf3f3ec
			})
		);
		this.leftPfpMesh.scale.set(8, 8, 8);
		this.leftPfpMesh.position.set(-23, -2, -8);
		//this.croppedPfp.add(leftPfpMesh);

		this.rightPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(0.5, 4),
			new THREE.MeshBasicMaterial({
				color: 0xf3f3ec
			})
		);
		this.rightPfpMesh.scale.set(8, 8, 8);
		this.rightPfpMesh.position.set(5, -2, -8);
		//this.croppedPfp.add(rightPfpMesh);

		//this.croppedPfp.position.set(-2.5, -2, 0);
	}
}
