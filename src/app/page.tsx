
// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       hi
//     </main>
//   )
// }
'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const page: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<FirstPersonControls | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const statsRef = useRef<Stats | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);

  useEffect(() => {
    const init = () => {
      cameraRef.current = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
      cameraRef.current.position.y = 200;

      clockRef.current = new THREE.Clock();

      sceneRef.current = new THREE.Scene();
      sceneRef.current.background = new THREE.Color('#ffffff');
      sceneRef.current.fog = new THREE.FogExp2('#b3c7fc', 0.0007);

      geometryRef.current = new THREE.PlaneGeometry(20000, 20000, 128 - 1, 128 - 1);
      geometryRef.current.rotateX(-Math.PI / 2);

      const position = geometryRef.current.attributes.position;
      position.usage = THREE.DynamicDrawUsage;

      for (let i = 0; i < position.count; i++) {
        const y = 35 * Math.sin(i / 2);
        position.setY(i, y);
      }

      const texture = new THREE.TextureLoader().load('textures/water.jpg');
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5);
      texture.encoding = THREE.sRGBEncoding;

      const material = new THREE.MeshBasicMaterial({ color: '#b3c7fc', map: texture }); 

      meshRef.current = new THREE.Mesh(geometryRef.current, material);
      sceneRef.current.add(meshRef.current);

      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(rendererRef.current.domElement);

      controlsRef.current = new FirstPersonControls(cameraRef.current, rendererRef.current.domElement);
      controlsRef.current.movementSpeed = 500;
      controlsRef.current.lookSpeed = 0.1;

      statsRef.current = new Stats();
      containerRef.current?.appendChild(statsRef.current.dom);

      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();

        rendererRef.current.setSize(window.innerWidth, window.innerHeight);

        if (controlsRef.current) {
          controlsRef.current.handleResize();
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
      statsRef.current?.update();
    };

    const render = () => {
      if (clockRef.current && geometryRef.current && controlsRef.current && rendererRef.current) {
        const delta = clockRef.current.getDelta();
        const time = clockRef.current.getElapsedTime() * 10;
        const position = geometryRef.current.attributes.position;

        for (let i = 0; i < position.count; i++) {
          const y = 35 * Math.sin(i / 5 + (time + i) / 7);
          position.setY(i, y);
        }

        position.needsUpdate = true;

        controlsRef.current.update(delta);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <div>
      <div id="info">
        <a href="https://threejs.org" target="_blank" rel="noopener">
          three.js
        </a>{' '}
        - dynamic geometry<br />
        left click: forward, right click: backward
      </div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default page;
