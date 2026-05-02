import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

// Wait for DOM layout to resolve so canvas dimensions are correct
window.addEventListener('load', () => {
  const canvas = document.querySelector('#hero-3d');
  if (!canvas) return;

  const container = document.querySelector('.hero-bg-canvas');
  const W = container.clientWidth || window.innerWidth;
  const H = container.clientHeight || window.innerHeight;

  // Scene + Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
  camera.position.setZ(28);

  // Renderer (transparent background)
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);

  // Wireframe Torus Knot — matches the screenshot design
  const geometry = new THREE.TorusKnotGeometry(9, 2.8, 120, 18);
  const material = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    wireframe: true,
    transparent: true,
    opacity: 0.02
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(pointLight, ambientLight);

  // Scroll reactive velocity
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const delta = window.scrollY - lastScrollY;
    scrollVelocity = delta * 0.002;
    lastScrollY = window.scrollY;
    // Subtle zoom-out effect on scroll
    camera.position.z = 28 + window.scrollY * 0.008;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Base slow rotation + scroll boost
    torusKnot.rotation.x += 0.003 + scrollVelocity;
    torusKnot.rotation.y += 0.003 + scrollVelocity * 1.5;
    torusKnot.rotation.z += 0.002;

    // Dampen scroll velocity
    scrollVelocity *= 0.92;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive resize
  window.addEventListener('resize', () => {
    const nW = container.clientWidth;
    const nH = container.clientHeight;
    if (nW === 0 || nH === 0) return;
    renderer.setSize(nW, nH);
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
  });
});
