import { createScene } from "./components/scene";
import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights";
import { createControls } from "./systems/controls";
import { loadToonCat } from "./components/toonCat/toonCat";
import { createGround } from "./components/ground";
import { Loop } from "./systems/Loop.js";

import { createCube } from "./components/cube.js";
import { createHelpers } from "./components/helpers";
import { createDragControls } from "./systems/dragControls";

let camera;
let renderer;
let scene;
let lights;
let loop;
let controls;
let draggableObjects = [];
let dragControls;

class World {
  constructor(container) {
    console.log("world constructed", container);
    renderer = createRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.append(renderer.domElement);

    camera = createCamera();
    const aspectRatio = container.clientWidth / container.clientHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    scene = createScene();
    lights = createLights();
    loop = new Loop(camera, scene, renderer);

    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    dragControls = createDragControls(draggableObjects, camera, renderer.domElement);
    dragControls.transformGroup = true;
    dragControls.addEventListener("dragstart", function (event) {
      controls.enabled = false;
    });
    dragControls.addEventListener("dragend", function (event) {
      controls.enabled = true;
    });

    const { ambientLight, mainLight } = createLights();

    scene.add(ambientLight, mainLight);

    const ground = createGround();
    scene.add(ground);

    // for debugging purposes
    // const { lightHelper, axesHelper } = createHelpers(mainLight);
    // scene.add(lightHelper, axesHelper);

    // const cube = createCube();
    // draggableObjects.push(cube);
    // scene.add(cube);
  }

  async init() {
    const toonCat = await loadToonCat();
    // controls.target.copy(toonCat.position);
    draggableObjects.push(toonCat);
    loop.updatables.push(toonCat);
    scene.add(toonCat);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
