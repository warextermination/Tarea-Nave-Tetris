import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { color } from 'three/examples/jsm/nodes/Nodes.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//Significa * todo lo que esta en three
function DoThree(){

const conversorradiones = Math.PI/180;//conversion en radianes 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 1000 );
camera.position.set(0,10,0);
camera.rotateX(conversorradiones * 90);
//fov: Angulo de vision
//Aspect ratio
//Near plane: Que tan cerca puede estar un objeto
//Far plane
const texture = new THREE.TextureLoader().load('models/tetris.png' ); 

scene.background = new THREE.Color("skyblue");

const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls(camera,renderer.domElement);

//Luz 
const directionallight = new THREE.DirectionalLight( 0xffffff, 2);
scene.add( directionallight);

const ambientlight = new THREE.AmbientLight(0xdddddd);
scene.add(ambientlight);


document.body.appendChild( renderer.domElement );

//Geometria, material y mesh


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffaaaa } );


const PlaneG = new THREE.PlaneGeometry(10,10,1,1)
const Planemat = new THREE.MeshPhongMaterial({color:0xaaffaa, side:THREE.DoubleSide, map:texture});
const Plane = new THREE.Mesh(PlaneG, Planemat);
scene.add(Plane);

Plane.rotateX(90 * conversorradiones );


//Plane.translateY(-2);//relativo al objeto
Plane.position.set(0,-2,0);


//esferas
const esfegeo = new THREE.SphereGeometry(0.1,16,8);
const red = new THREE.MeshBasicMaterial({color:'red'})
const esfera = new THREE.Mesh(esfegeo,red);
const esfera1 = new THREE.Mesh(esfegeo,red);
const esfera2 = new THREE.Mesh(esfegeo,red);
const esfera3 = new THREE.Mesh(esfegeo,red);
const esfera4 = new THREE.Mesh(esfegeo,red);
const esfera5 = new THREE.Mesh(esfegeo,red);
const esfera6 = new THREE.Mesh(esfegeo,red);
const esfera7 = new THREE.Mesh(esfegeo,red);
const esfera8 = new THREE.Mesh(esfegeo,red);

scene.add(esfera,esfera1,esfera2,esfera3,esfera4,esfera5,esfera6,esfera7,esfera8);

const vector1 = new THREE.Vector3(-0.20,-1.75,2);
const vector2 = new THREE.Vector3(-0.20,-1.75,-2.3);
const vector3 = new THREE.Vector3(0.6,-1.75,2);
const vector4 = new THREE.Vector3(0.6,-1.75,3);
const vector5 = new THREE.Vector3(-1,-1.75,3);
const vector6 = new THREE.Vector3(-1,-1.75,-3.3);
const vector7 = new THREE.Vector3(0.6,-1.75,-2.3);
const vector8 = new THREE.Vector3(0.6,-1.75,-3.3);


esfera.position.copy(vector1);
esfera1.position.copy(vector2);
esfera2.position.copy(vector3);
esfera3.position.copy(vector4);
esfera4.position.copy(vector5);
esfera5.position.copy(vector6);
esfera6.position.copy(vector7);
esfera7.position.copy(vector8);
esfera8.position.copy(vector7);

const clock = new THREE.Clock();
let time=0;

//modelo naves
// Instantiate a loader
const loader = new GLTFLoader();

let nave:any;
// Load a glTF resource
loader.load(
	// resource URL
	'models/spaceship.gltf',
	// called when the resource is loaded
	function ( gltf ) {

    nave = gltf.scene;
    scene.add(nave)
    nave.scale.set(0.1,0.1,0.1)
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


function animate() {
  //UPDATE
  let delta = clock.getDelta(); //tiempo entre frames
  time+=delta;
	requestAnimationFrame( animate ); //pide el siguiente frame

  controls.update();

	renderer.render( scene, camera );
}
//cambia el tamaño de la ventana
window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

animate();
}



function App() {


  return (
    <>
      <h1>Hola mundo</h1>
      {DoThree()}
    </>
  )
}

export default App
