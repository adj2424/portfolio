import * as THREE from 'three';

export default class Portrait {
	static pfpMesh = new THREE.Mesh();
	static topPfpMesh = new THREE.Mesh();
	static botPfpMesh = new THREE.Mesh();
	static leftPfpMesh = new THREE.Mesh();
	static rightPfpMesh = new THREE.Mesh();
	static borderPfpMesh = new THREE.Group();

	constructor() {}
	static async init(loadManager: THREE.LoadingManager) {
		const pfpTexture = new THREE.TextureLoader(loadManager).load('/pfp.jpg');
		const color = 0x0a0908;
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
				color: color //0xf3f3ec
			})
		);
		this.topPfpMesh.scale.set(8, 8, 8);
		this.topPfpMesh.position.set(-9, 14, -8);
		this.borderPfpMesh.add(this.topPfpMesh);

		this.botPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(4, 4),
			new THREE.MeshBasicMaterial({
				color: color
			})
		);
		this.botPfpMesh.scale.set(8, 8, 8);
		this.botPfpMesh.position.set(-9, -15, -8);
		this.borderPfpMesh.add(this.botPfpMesh);

		this.leftPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(0.5, 4),
			new THREE.MeshBasicMaterial({
				color: color
			})
		);
		this.leftPfpMesh.scale.set(8, 8, 8);
		this.leftPfpMesh.position.set(-23, -2, -8);
		this.borderPfpMesh.add(this.leftPfpMesh);

		this.rightPfpMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(0.5, 4),
			new THREE.MeshBasicMaterial({
				color: color
			})
		);
		this.rightPfpMesh.scale.set(8, 8, 8);
		this.rightPfpMesh.position.set(5, -2, -8);
		this.borderPfpMesh.add(this.rightPfpMesh);
	}
}
