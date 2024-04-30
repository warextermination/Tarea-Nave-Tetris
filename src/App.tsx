import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { color } from 'three/examples/jsm/nodes/Nodes.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Significa * todo lo que esta en three
function DoThree() {
  const conversorradiones = Math.PI / 180; // conversión en radianes

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 1000);
  camera.position.set(0, 10, 0);
  camera.rotateX(conversorradiones * 90);

  // Configura la textura de fondo
  const texture = new THREE.TextureLoader().load('models/tetris.png');
  scene.background = new THREE.Color("skyblue");

  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Añade luces a la escena
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  scene.add(directionalLight);
  
  const ambientLight = new THREE.AmbientLight(0xdddddd);
  scene.add(ambientLight);

  document.body.appendChild(renderer.domElement);

  // Geometría, material y mesh
  const planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaffaa,
    side: THREE.DoubleSide,
    map: texture
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);

  plane.rotateX(90 * conversorradiones);
  plane.position.set(0, -2, 0);

  // Esferas
  const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 8);
  const redMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
  const spheres: THREE.Mesh[] = [];

  const positions = [
    new THREE.Vector3(-0.20, -1.75, -2.3),
    new THREE.Vector3(-0.20, -1.75, 2),
    new THREE.Vector3(0.6, -1.75, 2),
    new THREE.Vector3(0.6, -1.75, 3),
    new THREE.Vector3(-1, -1.75, 3),
    new THREE.Vector3(-1, -1.75, -3.3),
    new THREE.Vector3(0.6, -1.75, -3.3),
    new THREE.Vector3(0.6, -1.75, -2.3),
  ];

  // Agrega esferas a la escena
  for (const position of positions) {
    const sphere = new THREE.Mesh(sphereGeometry, redMaterial);
    sphere.position.copy(position);
    scene.add(sphere);
    spheres.push(sphere);
  }

  const clock = new THREE.Clock();
  let time = 0;

  // Modelo de la nave
  const loader = new GLTFLoader();
  let nave: THREE.Group | null = null;
  let id = 0; // índice del objetivo actual
  let pos = positions;

  loader.load(
    // URL del recurso
    'models/spaceship.gltf',
    // Cuando el recurso se carga
    function (gltf) {
      nave = gltf.scene;
      scene.add(nave);
      nave.scale.set(0.1, 0.1, 0.1);
    },
    // Mientras se carga el recurso
    function (xhr) {
      console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
    },
    // Si hay errores al cargar el recurso
    function (error) {
      console.log('Ocurrió un error al cargar el recurso:', error);
    }
  );

  function animate() {
    // Actualiza el tiempo entre frames
    const delta = clock.getDelta();
    time += delta;
    
    requestAnimationFrame(animate);

    // Si la nave está presente, realiza los movimientos hacia el objetivo actual
    if (nave) {
      if (nave.position.distanceTo(pos[id]) > 0.1) {
        nave.position.lerpVectors(nave.position, pos[id], 0.05);
        nave.lookAt(pos[id]);
      } else {
        id = (id + 1) % pos.length;
      }
    }

    // Actualiza los controles y renderiza la escena
    controls.update();
    renderer.render(scene, camera);
  }

  // Configura la función de redimensionar la ventana
  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate();
}

function App() {
  return (
    <>
      <h1>Hola mundo</h1>
      {DoThree()}
    </>
  );
}

export default App;
