
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-3d'),
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create a Torus Knot
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const torusKnot = new THREE.Mesh(geometry, material);

scene.add(torusKnot);

// Add Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.003;
    torusKnot.rotation.y += 0.003;
    torusKnot.rotation.z += 0.003;

    renderer.render(scene, camera);
}

// Scroll Animation
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.0075;
    torusKnot.rotation.z += 0.005;

    camera.position.z = t * -0.01 + 30;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera(); // Initial call
animate();

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
