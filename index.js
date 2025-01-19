import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"

const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement)

var scaleSolid = 0.5
var scaleWire = 1.5

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

camera.position.z = 3;

const scene = new THREE.Scene();

// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.autoRotate = true;

// Geometry

const geometry = new THREE.IcosahedronGeometry(1,2);

// Solid

const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
});
const mesh = new THREE.Mesh(geometry, mat);
mesh.scale.setScalar(scaleSolid)
scene.add(mesh);

// Wireframe

const wireMat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
const wireMesh = new THREE.Mesh(geometry, wireMat);
wireMesh.scale.setScalar(scaleWire)
scene.add(wireMesh)

// Light

const hemiLight = new THREE.HemisphereLight(0x00ddff, 0xff00d4);
scene.add(hemiLight);

function animate(t = 0) {
    requestAnimationFrame(animate);

    wireMesh.scale.setScalar(scaleWire)
    mesh.scale.setScalar(scaleSolid)

    scaleWire = lerp(scaleWire, 1.2, 0.05)
    scaleSolid = lerp(scaleSolid, 1, 0.05)

    controls.update();
    renderer.render(scene, camera);
}

animate()

function lerp(start, end, t) {
    return start + t * (end - start);
}