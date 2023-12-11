import './css/technologies.css';
import { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body, Vector } from 'matter-js';

export default class Technologies {
	scale = 1;
	constructor() {}
	async init(isMobile: boolean) {
		if (!isMobile) {
			const masks = Array.from(document.querySelectorAll('.mask'));
			masks.map(mask => {
				mask.remove();
			});
		}
		const bigNumber = 10000;
		const thickness = 80;
		const canvas = document.getElementById('matter-canvas')! as HTMLCanvasElement;
		this.setPillScale();

		let engine = Engine.create();
		let render = Render.create({
			canvas: canvas,
			engine: engine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				background: 'transparent',
				wireframes: false
			}
		});

		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: Mouse.create(render.canvas),
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

		const pills = await Promise.all([
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/angular.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/aws.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/test2.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/gcp.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/git.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/gsap.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/hardhat.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/java.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/javascript.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/next.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/node.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/react.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/solidity.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/tailwind.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/test1.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/three.png', this.scale),
			this.createPill(0.8 * Math.random() * window.innerWidth, 100, '/pills/typescript.png', this.scale)
		]);

		const ground = Bodies.rectangle(bigNumber / 2, window.innerHeight + thickness / 2.2, bigNumber, thickness, {
			isStatic: true,
			render: {
				fillStyle: 'transparent'
			}
		});
		const left = Bodies.rectangle(-thickness / 2.3, 0, thickness, bigNumber, {
			isStatic: true,
			render: {
				fillStyle: 'transparent'
			}
		});
		const right = Bodies.rectangle(window.innerWidth + (thickness - 15) / 2.3, 0, thickness, bigNumber, {
			isStatic: true,
			render: {
				fillStyle: 'transparent'
			}
		});

		Composite.add(engine.world, [ground, left, right, mouseConstraint, ...pills]);
		Render.run(render);
		Runner.run(Runner.create(), engine);

		window.addEventListener('resize', () => {
			this.setPillScale();
			render.canvas.width = window.innerWidth;
			render.canvas.height = window.innerHeight;
			Body.setPosition(ground, Vector.create(window.innerWidth / 2, window.innerHeight + thickness / 2.2));
			Body.setPosition(left, Vector.create(-thickness / 2.3, window.innerHeight));
			Body.setPosition(right, Vector.create(window.innerWidth + (thickness - 15) / 2.3, window.innerHeight));
		});
		mouseConstraint.mouse.element.removeEventListener('mousewheel', (mouseConstraint.mouse as any).mousewheel);
		mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', (mouseConstraint.mouse as any).mousewheel);
	}

	createPill = async (x: number, y: number, url: string, scale: number) => {
		const img = new Image();
		img.src = url;
		await img.decode();
		const pill = Bodies.rectangle(x, y, img.width * scale, img.height * scale, {
			restitution: 0.8,
			chamfer: { radius: (img.height / 2) * 0.9 * scale },
			render: {
				sprite: {
					texture: url,
					xScale: scale,
					yScale: scale
				}
			}
		});
		return pill;
	};
	setPillScale = () => {
		this.scale = 1;
		if (window.innerWidth > 2000) {
			this.scale = 0.8;
		} else if (window.innerWidth > 1600) {
			this.scale = 0.68;
		} else if (window.innerWidth > 1250) {
			this.scale = 0.63;
		} else if (window.innerWidth > 1050) {
			this.scale = 0.59;
		} else if (window.innerWidth > 800) {
			this.scale = 0.52;
		} else if (window.innerWidth > 600) {
			this.scale = 0.44;
		} else if (window.innerWidth > 450) {
			this.scale = 0.4;
		} else {
			this.scale = 0.38;
		}
	};
}
