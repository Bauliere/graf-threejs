import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometría común para los tres cubos
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Crear el cubo verde (rotación normal)
const cubeGreen = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
cubeGreen.position.x = 0; // Centrado
scene.add(cubeGreen);

// Crear el cubo morado oscuro (rotación rápida)
const cubePurple = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x800080 }));
cubePurple.position.x = 2; // A la derecha
scene.add(cubePurple);

// Crear el cubo rojo (rotación muy rápida)
const cubeRed = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xff0000 }));
cubeRed.position.x = -2; // A la izquierda
scene.add(cubeRed);

// Agregar una luz direccional y ajustar su posición
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Posicionar la cámara
camera.position.z = 5;

// Función de animación con diferentes velocidades de rotación
function animate() {
    // Cubo verde: velocidad normal
    cubeGreen.rotation.x += 0.01;
    cubeGreen.rotation.y += 0.01;

    // Cubo morado: velocidad rápida
    cubePurple.rotation.x += 0.03;
    cubePurple.rotation.y += 0.03;

    // Cubo rojo: velocidad muy rápida
    cubeRed.rotation.x += 0.05;
    cubeRed.rotation.y += 0.05;

    renderer.render(scene, camera);
}

// Iniciar la animación
renderer.setAnimationLoop(animate);
