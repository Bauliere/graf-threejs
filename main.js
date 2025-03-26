import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import { FontLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://unpkg.com/three@0.154.0/examples/jsm/geometries/TextGeometry.js';

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Agregar luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Posicionar la cámara
camera.position.z = 5;

// Cargar la fuente y crear la geometría del texto
const fontLoader = new FontLoader();
fontLoader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const text = "alexa pendeja";
    const textOptions = {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
    };

    // Crear la geometría de texto y centrarla
    const textGeometry = new TextGeometry(text, textOptions);
    textGeometry.center();

    // Crear tres materiales para cada texto
    const materialGreen = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const materialPurple = new THREE.MeshStandardMaterial({ color: 0x800080 });
    const materialRed = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    // Crear tres mallas de texto con clonación de la geometría para evitar conflictos
    const textGreen = new THREE.Mesh(textGeometry, materialGreen);
    textGreen.position.x = 0; // Centrado
    scene.add(textGreen);

    const textPurple = new THREE.Mesh(textGeometry.clone(), materialPurple);
    textPurple.position.x = 2; // A la derecha
    scene.add(textPurple);

    const textRed = new THREE.Mesh(textGeometry.clone(), materialRed);
    textRed.position.x = -2; // A la izquierda
    scene.add(textRed);

    // Función de animación con diferentes velocidades de rotación
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotación del texto verde: velocidad normal
      textGreen.rotation.x += 0.01;
      textGreen.rotation.y += 0.01;

      // Rotación del texto morado: velocidad rápida
      textPurple.rotation.x += 0.03;
      textPurple.rotation.y += 0.03;

      // Rotación del texto rojo: velocidad muy rápida
      textRed.rotation.x += 0.05;
      textRed.rotation.y += 0.05;

      renderer.render(scene, camera);
    }

    animate();
  }
);
