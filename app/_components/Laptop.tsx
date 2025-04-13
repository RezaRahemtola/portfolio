"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LaptopScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // Scene, camera and renderer setup
    const scene = new THREE.Scene();
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // Enable transparency
    });

    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x212121, 0); // Set alpha to 0 for transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Mouse position for hover effects
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hovering = false;
    let hoverPoint = new THREE.Vector3();
    const effectRadius = 2.5; // Radius of effect around mouse

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
      trackpad: { width: 2, height: 0.05, depth: 1.3, position: [-2, 0.26, 1.25] }
    };

    // Marbles array to hold all marbles
    const marbles: any[] = [];
    const marbleRadius = 0.08; // Size of each marble

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, 5, -5);
    scene.add(pointLight);

    // Add hover light that follows the mouse
    const hoverLight = new THREE.PointLight(0x00ff00, 0, 5);
    hoverLight.position.set(0, 3, 0);
    scene.add(hoverLight);

    // Create a grey marble material
    function createMarbleMaterial(brightness = 0.5) {
      // Create a canvas for the texture
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');

      if (ctx === null) return;

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
      const texture = new THREE.CanvasTexture(canvas);

      // Create material
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.1,
        bumpMap: texture,
        bumpScale: 0.02
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

      // Create marbles
      const sphereGeometry = new THREE.SphereGeometry(marbleRadius, 8, 8);
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
            const posX = centerX + (x * spacingX) - (width / 2) + (spacingX / 2);
            const posY = centerY + (y * spacingY) - (height / 2) + (spacingY / 2);
            const posZ = centerZ + (z * spacingZ) - (depth / 2) + (spacingZ / 2);

            // Create marble
            const marble = new THREE.Mesh(sphereGeometry, marbleMaterial);
            marble.position.set(posX, posY, posZ);

            // Apply rotation if specified
            if (rotation) {
              // Create a dummy object to help with rotation
              const center = new THREE.Vector3(centerX, centerY, centerZ);
              const marblePos = new THREE.Vector3(posX, posY, posZ);

              // Calculate vector from center to marble
              const relativePos = new THREE.Vector3().subVectors(marblePos, center);

              // Create rotation matrix
              const rotMatrix = new THREE.Matrix4().makeRotationFromEuler(
                new THREE.Euler(rotation[0], rotation[1], rotation[2])
              );

              // Apply rotation to the relative position
              relativePos.applyMatrix4(rotMatrix);

              // Calculate new position
              const newPos = new THREE.Vector3().addVectors(center, relativePos);
              marble.position.copy(newPos);
            }

            // Add random rotation
            marble.rotation.set(
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2,
              Math.random() * Math.PI * 2
            );

            // Store original position and rotation for animations
            marble.userData.originalPosition = marble.position.clone();
            marble.userData.originalRotation = marble.rotation.clone();
            marble.userData.offset = Math.random(); // Random offset for animation

            // Add to scene and track
            scene.add(marble);
            marbles.push(marble);
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

      // Create marbles
      const sphereGeometry = new THREE.SphereGeometry(marbleRadius, 8, 8);

      // Create a shiny black material for the display marbles
      const blackMarbleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        roughness: 0.05,
        metalness: 0.9,
        clearcoat: 1.0
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
          const posX = centerX + (x * spacingX) - (width / 2) + (spacingX / 2);
          const posY = centerY + (y * spacingY) - (height / 2) + (spacingY / 2);
          const posZ = centerZ;

          // Check if this marble is at the edge
          const isEdgeX = x === 0 || x === numX - 1;
          const isEdgeY = y === 0 || y === numY - 1;
          const isEdge = isEdgeX || isEdgeY;

          // Use black material for main display, grey for edges
          const material = isEdge ? edgeMaterial : blackMarbleMaterial;

          // Create marble
          const marble = new THREE.Mesh(sphereGeometry, material);
          marble.position.set(posX, posY, posZ);

          // Add random rotation
          marble.rotation.set(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          );

          // Store original position and rotation for animations
          marble.userData.originalPosition = marble.position.clone();
          marble.userData.originalRotation = marble.rotation.clone();
          marble.userData.offset = Math.random(); // Random offset for animation

          // Add to scene and track
          scene.add(marble);
          marbles.push(marble);
        }
      }
    }

    // Create keyboard keys
    function createKeyboardKeys() {
      const keySpacing = 0.3;
      const keyRows = 5;
      const keyCols = 14;

      const sphereGeometry = new THREE.SphereGeometry(marbleRadius * 0.8, 8, 8);
      const keyMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });

      // Calculate starting position
      const startX = -(keyCols * keySpacing) / 2 + keySpacing / 2 - 2;
      const startZ = -(keyRows * keySpacing) / 2 + keySpacing / 2 - 0.25;
      const keyHeight = 0.3;

      for (let row = 0; row < keyRows; row++) {
        for (let col = 0; col < keyCols; col++) {
          // Place a single marble for each key
          const marble = new THREE.Mesh(sphereGeometry, keyMaterial);

          // Position the key
          marble.position.set(
            startX + col * keySpacing,
            keyHeight,
            startZ + row * keySpacing
          );

          // Store original position and rotation for animations
          marble.userData.originalPosition = marble.position.clone();
          marble.userData.originalRotation = marble.rotation.clone();
          marble.userData.offset = Math.random(); // Random offset for animation

          // Add to scene and track
          scene.add(marble);
          marbles.push(marble);
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

    // Position camera
    camera.position.set(6, 5, 7.5);
    camera.lookAt(0, 0.5, 0);

    // Handle mouse movement
    const onMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();

      // Check if mouse is within the container bounds
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update raycaster
        raycaster.setFromCamera(mouse, camera);

        // Check for intersections with marbles
        const intersects = raycaster.intersectObjects(marbles);

        if (intersects.length > 0) {
          hovering = true;
          hoverPoint = intersects[0].point;
        } else {
          hovering = false;
        }
      } else {
        hovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation function
    const animate = () => {
      // Update floating animation time
      floatTime += 1;
      const floatOffset = Math.sin(floatTime * floatSpeed) * floatAmplitude;

      // Update marbles - apply hover effect and gentle floating
      marbles.forEach(marble => {
        // Apply hover effect if mouse is hovering
        if (hovering) {
          const distance = marble.position.distanceTo(hoverPoint);

          if (distance < effectRadius) {
            // Calculate force based on distance with non-linear falloff for more explosive effect
            const force = Math.pow(1 - (distance / effectRadius), 2);

            // Create direction vector away from hover point
            const direction = new THREE.Vector3().subVectors(marble.position, hoverPoint).normalize();

            // Apply force in that direction - much stronger
            const explosionThreshold = 0.3;

            if (distance < effectRadius * explosionThreshold) {
              // Moderate effect for very close marbles
              const explosionForce = 0.15;
              marble.position.add(direction.multiplyScalar(explosionForce));

              // Subtle random direction component
              marble.position.x += (Math.random() - 0.5) * 0.05;
              marble.position.z += (Math.random() - 0.5) * 0.05;
              marble.position.y += 0.08; // Moderate upward burst

              // Gentle rotation
              marble.rotation.x += Math.random() * 0.2;
              marble.rotation.y += Math.random() * 0.2;
              marble.rotation.z += Math.random() * 0.2;
            } else {
              // Reduced force for other marbles
              marble.position.add(direction.multiplyScalar(0.08 * force));

              // Subtle vertical movement
              marble.position.y += 0.03 * force;

              // Gentler rotation
              marble.rotation.x += 0.05 * force;
              marble.rotation.y += 0.07 * force;
              marble.rotation.z += 0.05 * force;
            }
          }
        }

        // Calculate floating position based on original position
        const floatingOriginalPosition = marble.userData.originalPosition.clone();

        // Add floating offset with slight variation based on marble's random offset
        floatingOriginalPosition.y += floatOffset + (Math.sin(floatTime * floatSpeed * 1.2 + marble.userData.offset * Math.PI) * 0.03);

        // Apply slight rotation with the floating motion
        const floatRotation = Math.sin(floatTime * floatSpeed * 0.7 + marble.userData.offset * Math.PI) * 0.02;

        // Apply gravity to return marbles to floating position with easing
        if (marble.position.distanceTo(floatingOriginalPosition) > 0.01) {
          // Faster return if far from target position, slower as it gets closer
          const distance = marble.position.distanceTo(floatingOriginalPosition);
          const returnForce = Math.min(0.04, 0.01 + distance * 0.02);

          marble.position.lerp(floatingOriginalPosition, returnForce);

          // Calculate target rotation with floating effect
          const targetRotationX = marble.userData.originalRotation.x + floatRotation;
          const targetRotationZ = marble.userData.originalRotation.z + floatRotation;

          // Also return rotation with easing
          marble.rotation.x = THREE.MathUtils.lerp(marble.rotation.x, targetRotationX, returnForce);
          marble.rotation.y = THREE.MathUtils.lerp(marble.rotation.y, marble.userData.originalRotation.y, returnForce);
          marble.rotation.z = THREE.MathUtils.lerp(marble.rotation.z, targetRotationZ, returnForce);
        }
      });

      renderer.render(scene, camera);
    };

    // Start the animation loop
    const animationId = requestAnimationFrame(function animateLoop() {
      animate();
      requestAnimationFrame(animateLoop);
    });

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      marbles.forEach(marble => {
        marble.geometry.dispose();
        if (marble.material.map) marble.material.map.dispose();
        marble.material.dispose();
      });

      scene.clear();
    };
  }, []);

  return <div ref={mountRef} className='absolute w-full h-full hidden lg:block' />;
};

export default LaptopScene;
