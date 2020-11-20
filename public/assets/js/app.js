let container;
let camera;
let renderer;
let scene;
let object;

function init() {
  container = document.querySelector(".scene");

  //scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;

  //camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(150, 1000, 3500);

  // light
  const ambient = new THREE.AmbientLight(0x404040, 2);
  const light = new THREE.DirectionalLight(0xfcfcfc, 3);
  light.position.set(50, 0, 500);
  scene.add(ambient);
  scene.add(light);

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //model
  let loader = new THREE.GLTFLoader();
  loader.load("public/assets/models/car/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    object = gltf.scene.children[0];
    object.rotation.z = 5;
    object.rotation.x = 4.5;
    rotate();
  });
}

function rotate() {
  requestAnimationFrame(rotate);
  object.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
