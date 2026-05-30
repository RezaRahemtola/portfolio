"use client";

import { useEffect, useRef } from "react";
import {
	AmbientLight,
	CanvasTexture,
	DirectionalLight,
	Euler,
	InstancedMesh,
	MathUtils,
	Material,
	Matrix4,
	MeshPhongMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	Object3D,
	PerspectiveCamera,
	PointLight,
	Raycaster,
	Scene,
	SphereGeometry,
	Vector2,
	Vector3,
	WebGLRenderer,
} from "three";

const LaptopScene = () => {
	const mountRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!mountRef.current) return;
		// Scene, camera and renderer setup
		const scene = new Scene();
		const containerWidth = mountRef.current.clientWidth;
		const containerHeight = mountRef.current.clientHeight;
		const camera = new PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
		const renderer = new WebGLRenderer({
			antialias: true,
			alpha: true, // Enable transparency
		});

		renderer.setSize(containerWidth, containerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x212121, 0); // Set alpha to 0 for transparent background
		mountRef.current.appendChild(renderer.domElement);

		// Mouse position for hover effects
		const mouse = new Vector2();
		const raycaster = new Raycaster();
		let hovering = false;
		const hoverPoint = new Vector3();
		const effectRadius = 2.5; // Radius of effect around mouse

		// Reusable objects to avoid per-frame allocations
		const _direction = new Vector3();
		const _floatingPos = new Vector3();
		const _dummy = new Object3D();
		let mouseDirty = false; // true when mouse moved since last frame

		// Gentle floating animation variables
		let floatTime = 0;
		const floatSpeed = 0.01; // Speed of floating motion
		const floatAmplitude = 0.5; // Height of floating motion

		// Store all laptop parts structure
		const laptopStructure = {
			base: { width: 6, height: 0.2, depth: 4, position: [-2, 0.1, 0] },
			screen: { width: 5.8, height: 4, depth: 0.2, position: [-2, 2, -2.05] },
			display: { width: 6, height: 3.5, depth: 0.05, position: [-2, 1.9, -2] },
			display2: { width: 6, height: 3.5, depth: 0.05, position: [-2, 1.9, -2.15] },
			trackpad: { width: 2, height: 0.05, depth: 1.3, position: [-2, 0.26, 1.25] },
		};

		const marbleRadius = 0.08; // Size of each marble

		// All marbles share one sphere geometry and are rendered as InstancedMeshes
		// grouped by material — collapsing thousands of draw calls into a handful.
		const sharedSphere = new SphereGeometry(marbleRadius, 8, 8);
		const instanceGroups = new Map<Material, { pos: Vector3; rot: Euler; scale: number }[]>();
		const addMarble = (material: Material, pos: Vector3, rot: Euler, scale = 1) => {
			let list = instanceGroups.get(material);
			if (!list) {
				list = [];
				instanceGroups.set(material, list);
			}
			list.push({ pos, rot, scale });
		};

		// Per-instance animation state, kept in sync with the instance matrices
		type MarbleState = {
			mesh: InstancedMesh;
			index: number;
			pos: Vector3;
			rot: Euler;
			originalPosition: Vector3;
			originalRotation: Euler;
			offset: number;
			scale: number;
		};
		const instanceStates: MarbleState[] = [];
		const instancedMeshes: InstancedMesh[] = [];

		// Add lighting
		const ambientLight = new AmbientLight(0x404040, 1);
		scene.add(ambientLight);

		const directionalLight = new DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 10, 7);
		scene.add(directionalLight);

		const pointLight = new PointLight(0xffffff, 0.8);
		pointLight.position.set(-5, 5, -5);
		scene.add(pointLight);

		// Add hover light that follows the mouse
		const hoverLight = new PointLight(0x00ff00, 0, 5);
		hoverLight.position.set(0, 3, 0);
		scene.add(hoverLight);

		// Create a grey marble material
		function createMarbleMaterial(brightness = 0.5) {
			// Create a canvas for the texture
			const canvas = document.createElement("canvas");
			canvas.width = 128;
			canvas.height = 128;
			const ctx = canvas.getContext("2d");

			// Fall back to a plain grey material if a 2D context isn't available
			if (ctx === null) {
				return new MeshStandardMaterial({ color: 0x808080, roughness: 0.3, metalness: 0.1 });
			}

			// Base color - grey tone based on brightness (0.0 to 1.0)
			const colorValue = Math.floor(100 + brightness * 100);
			ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Add marble-like veins and patterns
			for (let i = 0; i < 5; i++) {
				const startX = Math.random() * canvas.width;
				const startY = Math.random() * canvas.height;
				const length = 20 + Math.random() * 40;
				const angle = Math.random() * Math.PI * 2;

				// Veins slightly brighter than base
				const veinColor = Math.min(255, colorValue + 30 + Math.random() * 20);
				ctx.strokeStyle = `rgba(${veinColor}, ${veinColor}, ${veinColor}, 0.5)`;
				ctx.lineWidth = 1 + Math.random() * 2;

				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.lineTo(startX + Math.cos(angle) * length, startY + Math.sin(angle) * length);
				ctx.stroke();
			}

			// Add subtle noise
			for (let i = 0; i < 200; i++) {
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				const size = 1 + Math.random() * 2;

				const speckColor = Math.min(255, colorValue + Math.random() * 50);
				ctx.fillStyle = `rgba(${speckColor}, ${speckColor}, ${speckColor}, 0.2)`;
				ctx.fillRect(x, y, size, size);
			}

			// Convert to texture
			const texture = new CanvasTexture(canvas);

			// Create material
			return new MeshStandardMaterial({
				map: texture,
				roughness: 0.3,
				metalness: 0.1,
				bumpMap: texture,
				bumpScale: 0.02,
			});
		}

		// Create laptop parts from marbles
		function createMarblePart(partDef: any, brightness: number) {
			const { width, height, depth, position, rotation } = partDef;

			// Calculate how many marbles we need along each axis
			const spacingFactor = 1.8; // Adjust for spacing between marbles
			const numX = Math.ceil(width / (marbleRadius * spacingFactor));
			const numY = Math.ceil(height / (marbleRadius * spacingFactor));
			const numZ = Math.ceil(depth / (marbleRadius * spacingFactor));

			// Calculate actual spacing
			const spacingX = width / numX;
			const spacingY = height / numY;
			const spacingZ = depth / numZ;

			const marbleMaterial = createMarbleMaterial(brightness);

			// Get center position for this part
			const centerX = position[0];
			const centerY = position[1];
			const centerZ = position[2];

			// Create marbles for this part
			for (let x = 0; x < numX; x++) {
				for (let y = 0; y < numY; y++) {
					for (let z = 0; z < numZ; z++) {
						// Calculate position with offset to center the part
						const posX = centerX + x * spacingX - width / 2 + spacingX / 2;
						const posY = centerY + y * spacingY - height / 2 + spacingY / 2;
						const posZ = centerZ + z * spacingZ - depth / 2 + spacingZ / 2;

						const pos = new Vector3(posX, posY, posZ);

						// Apply rotation if specified
						if (rotation) {
							const center = new Vector3(centerX, centerY, centerZ);
							const relativePos = new Vector3().subVectors(pos, center);
							const rotMatrix = new Matrix4().makeRotationFromEuler(new Euler(rotation[0], rotation[1], rotation[2]));
							relativePos.applyMatrix4(rotMatrix);
							pos.copy(new Vector3().addVectors(center, relativePos));
						}

						// Random initial rotation
						const rot = new Euler(
							Math.random() * Math.PI * 2,
							Math.random() * Math.PI * 2,
							Math.random() * Math.PI * 2,
						);

						addMarble(marbleMaterial, pos, rot);
					}
				}
			}
		}

		// Create screen display using black marbles with grey edges
		function createMarbleDisplay(structure: any) {
			const { width, height, position } = structure;

			// Calculate how many marbles we need along each axis
			const spacingFactor = 1.8; // Adjust for spacing between marbles
			const numX = Math.ceil(width / (marbleRadius * spacingFactor));
			const numY = Math.ceil(height / (marbleRadius * spacingFactor));

			// Calculate actual spacing
			const spacingX = width / numX;
			const spacingY = height / numY;

			// Create a shiny black material for the display marbles
			const blackMarbleMaterial = new MeshPhysicalMaterial({
				color: 0x000000,
				roughness: 0.05,
				metalness: 0.9,
				clearcoat: 1.0,
			});

			// Create a grey material for the edge marbles
			const edgeMaterial = createMarbleMaterial(0.3); // Darker grey for edges

			// Get center position for this part
			const centerX = position[0];
			const centerY = position[1];
			const centerZ = position[2];

			// Create marbles for the display
			for (let x = 0; x < numX; x++) {
				for (let y = 0; y < numY; y++) {
					// Calculate position with offset to center the part
					const posX = centerX + x * spacingX - width / 2 + spacingX / 2;
					const posY = centerY + y * spacingY - height / 2 + spacingY / 2;
					const posZ = centerZ;

					// Check if this marble is at the edge
					const isEdgeX = x === 0 || x === numX - 1;
					const isEdgeY = y === 0 || y === numY - 1;
					const isEdge = isEdgeX || isEdgeY;

					// Use black material for main display, grey for edges
					const material = isEdge ? edgeMaterial : blackMarbleMaterial;

					const pos = new Vector3(posX, posY, posZ);
					const rot = new Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);

					addMarble(material, pos, rot);
				}
			}
		}

		// Create keyboard keys
		function createKeyboardKeys() {
			const keySpacing = 0.3;
			const keyRows = 5;
			const keyCols = 14;

			const keyMaterial = new MeshPhongMaterial({ color: 0x555555 });

			// Calculate starting position
			const startX = -(keyCols * keySpacing) / 2 + keySpacing / 2 - 2;
			const startZ = -(keyRows * keySpacing) / 2 + keySpacing / 2 - 0.25;
			const keyHeight = 0.3;

			for (let row = 0; row < keyRows; row++) {
				for (let col = 0; col < keyCols; col++) {
					// One (smaller) marble per key — scaled down via the instance matrix
					const pos = new Vector3(startX + col * keySpacing, keyHeight, startZ + row * keySpacing);
					addMarble(keyMaterial, pos, new Euler(0, 0, 0), 0.8);
				}
			}
		}

		// Create entire laptop from marbles
		function createLaptopFromMarbles() {
			// Create different parts of the laptop
			createMarblePart(laptopStructure.base, 0.6); // Base is slightly brighter
			// Screen display is black
			createMarbleDisplay(laptopStructure.display);
			createMarbleDisplay(laptopStructure.display2);
			// Keyboard and trackpad
			createMarblePart(laptopStructure.trackpad, 0.2); // Trackpad is darker
			// Create some keys
			createKeyboardKeys();
		}

		// Initialize the laptop
		createLaptopFromMarbles();

		// Build one InstancedMesh per material from the collected transforms
		instanceGroups.forEach((list, material) => {
			const mesh = new InstancedMesh(sharedSphere, material, list.length);
			mesh.frustumCulled = false; // marbles move on hover; don't cull the whole batch
			for (let i = 0; i < list.length; i++) {
				const t = list[i];
				_dummy.position.copy(t.pos);
				_dummy.rotation.copy(t.rot);
				_dummy.scale.setScalar(t.scale);
				_dummy.updateMatrix();
				mesh.setMatrixAt(i, _dummy.matrix);

				instanceStates.push({
					mesh,
					index: i,
					pos: t.pos.clone(),
					rot: t.rot.clone(),
					originalPosition: t.pos.clone(),
					originalRotation: t.rot.clone(),
					offset: Math.random(),
					scale: t.scale,
				});
			}
			mesh.instanceMatrix.needsUpdate = true;
			scene.add(mesh);
			instancedMeshes.push(mesh);
		});

		// Position camera
		camera.position.set(6, 5, 7.5);
		camera.lookAt(0, 0.5, 0);

		// Handle mouse movement — only store coordinates, raycast deferred to animation frame
		let mouseInBounds = false;
		const onMouseMove = (event: MouseEvent) => {
			if (!mountRef.current) return;

			const rect = mountRef.current.getBoundingClientRect();

			if (
				event.clientX >= rect.left &&
				event.clientX <= rect.right &&
				event.clientY >= rect.top &&
				event.clientY <= rect.bottom
			) {
				mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
				mouseInBounds = true;
				mouseDirty = true;
			} else {
				mouseInBounds = false;
				hovering = false;
			}
		};

		// Animation function
		const animate = () => {
			// Raycast once per frame (not per mousemove event)
			if (mouseDirty && mouseInBounds) {
				mouseDirty = false;
				raycaster.setFromCamera(mouse, camera);
				const intersects = raycaster.intersectObjects(instancedMeshes);
				if (intersects.length > 0) {
					hovering = true;
					hoverPoint.copy(intersects[0].point);
				} else {
					hovering = false;
				}
			}

			// Update floating animation time
			floatTime += 1;
			const floatOffset = Math.sin(floatTime * floatSpeed) * floatAmplitude;

			// Pre-compute squared radius to avoid sqrt in distance checks
			const effectRadiusSq = effectRadius * effectRadius;
			const explosionThreshold = 0.3;
			const explosionDistSq = (effectRadius * explosionThreshold) ** 2;

			// Update marbles - apply hover effect and gentle floating
			for (let i = 0, len = instanceStates.length; i < len; i++) {
				const state = instanceStates[i];
				const pos = state.pos;
				const ud = state;

				// Apply hover effect if mouse is hovering
				if (hovering) {
					// Use squared distance to avoid sqrt
					const dx = pos.x - hoverPoint.x;
					const dy = pos.y - hoverPoint.y;
					const dz = pos.z - hoverPoint.z;
					const distSq = dx * dx + dy * dy + dz * dz;

					if (distSq < effectRadiusSq) {
						const distance = Math.sqrt(distSq);
						const force = Math.pow(1 - distance / effectRadius, 2);

						// Reuse direction vector
						_direction.set(dx, dy, dz);
						if (distance > 0.001) {
							_direction.multiplyScalar(1 / distance); // normalize without creating new vec
						}

						if (distSq < explosionDistSq) {
							const explosionForce = 0.15;
							pos.x += _direction.x * explosionForce + (Math.random() - 0.5) * 0.05;
							pos.y += _direction.y * explosionForce + 0.08;
							pos.z += _direction.z * explosionForce + (Math.random() - 0.5) * 0.05;

							state.rot.x += Math.random() * 0.2;
							state.rot.y += Math.random() * 0.2;
							state.rot.z += Math.random() * 0.2;
						} else {
							const f = 0.08 * force;
							pos.x += _direction.x * f;
							pos.y += _direction.y * f + 0.03 * force;
							pos.z += _direction.z * f;

							state.rot.x += 0.05 * force;
							state.rot.y += 0.07 * force;
							state.rot.z += 0.05 * force;
						}
					}
				}

				// Compute floating target position in-place (no clone)
				const origPos = ud.originalPosition;
				const floatY = floatOffset + Math.sin(floatTime * floatSpeed * 1.2 + ud.offset * Math.PI) * 0.03;
				_floatingPos.set(origPos.x, origPos.y + floatY, origPos.z);

				// Apply slight rotation with the floating motion
				const floatRotation = Math.sin(floatTime * floatSpeed * 0.7 + ud.offset * Math.PI) * 0.02;

				// Squared distance check for return-to-origin
				const rdx = pos.x - _floatingPos.x;
				const rdy = pos.y - _floatingPos.y;
				const rdz = pos.z - _floatingPos.z;
				const returnDistSq = rdx * rdx + rdy * rdy + rdz * rdz;

				if (returnDistSq > 0.0001) {
					// 0.01^2
					const returnDist = Math.sqrt(returnDistSq);
					const returnForce = Math.min(0.04, 0.01 + returnDist * 0.02);

					pos.lerp(_floatingPos, returnForce);

					const targetRotX = ud.originalRotation.x + floatRotation;
					const targetRotZ = ud.originalRotation.z + floatRotation;

					state.rot.x = MathUtils.lerp(state.rot.x, targetRotX, returnForce);
					state.rot.y = MathUtils.lerp(state.rot.y, ud.originalRotation.y, returnForce);
					state.rot.z = MathUtils.lerp(state.rot.z, targetRotZ, returnForce);
				}

				// Write the updated transform into the instanced mesh
				_dummy.position.copy(pos);
				_dummy.rotation.copy(state.rot);
				_dummy.scale.setScalar(state.scale);
				_dummy.updateMatrix();
				state.mesh.setMatrixAt(state.index, _dummy.matrix);
			}

			for (let m = 0; m < instancedMeshes.length; m++) {
				instancedMeshes[m].instanceMatrix.needsUpdate = true;
			}

			renderer.render(scene, camera);
		};

		// Start the animation loop — pauses when off-screen
		let animationId = 0;
		let isVisible = true;
		let observer: IntersectionObserver | undefined;

		const animateLoop = () => {
			if (!isVisible) {
				animationId = 0;
				return;
			}
			animate();
			animationId = requestAnimationFrame(animateLoop);
		};

		// Respect reduced motion: render one static frame, no loop or hover
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReduced) {
			renderer.render(scene, camera);
		} else {
			window.addEventListener("mousemove", onMouseMove, { passive: true });

			observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
					if (isVisible && !animationId) {
						animationId = requestAnimationFrame(animateLoop);
					}
				},
				{ threshold: 0 },
			);
			observer.observe(mountRef.current);

			animationId = requestAnimationFrame(animateLoop);
		}

		// Store a reference to the DOM node to use in cleanup
		const currentRef = mountRef.current;

		// Cleanup function
		return () => {
			observer?.disconnect();
			cancelAnimationFrame(animationId);
			window.removeEventListener("mousemove", onMouseMove);
			if (currentRef) {
				currentRef.removeChild(renderer.domElement);
			}

			// Dispose resources
			sharedSphere.dispose();
			instancedMeshes.forEach((mesh) => {
				const mat = mesh.material;
				if (!Array.isArray(mat)) {
					const map = (mat as MeshStandardMaterial).map;
					if (map) map.dispose();
					mat.dispose();
				}
				mesh.dispose();
			});

			renderer.dispose();
			scene.clear();
		};
	}, []);

	return <div ref={mountRef} className="absolute w-full h-full hidden lg:block" />;
};

export default LaptopScene;
