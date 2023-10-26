import { createScene } from "./components/scene";
import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights";
import { createControls } from "./systems/controls";
import { loadToonCat } from "./components/toonCat/toonCat";
import { createGround } from "./components/ground";
import { Loop } from "./systems/Loop.js";
import { createPhysics } from "./systems/physics";

import { createCube } from "./components/cube.js";
import { createHelpers } from "./components/helpers";
import { createDragControls } from "./systems/dragControls";

let camera;
let renderer;
let scene;
let loop;
let physicsWorld;
let controls;
let draggableObjects = [];
let dragControls;
let isDragging = false;
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
    loop = new Loop(camera, scene, renderer);

    physicsWorld = createPhysics();
    physicsWorld.tick = (delta) => {
      if (delta && !isDragging) {
        console.log("p tick");
        physicsWorld.step(delta);
      }
    };
    loop.updatables.push(physicsWorld);

    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    dragControls = createDragControls(draggableObjects, camera, renderer.domElement);
    // dragControls.transformGroup = true;
    dragControls.addEventListener("dragstart", function (event) {
      isDragging = true;
      controls.enabled = false;
    });
    dragControls.addEventListener("dragend", function (event) {
      isDragging = false;
      controls.enabled = true;
    });

    const { ambientLight, mainLight } = createLights();
    scene.add(ambientLight, mainLight);

    const { ground, groundBody } = createGround();
    scene.add(ground);
    physicsWorld.addBody(groundBody);

    //* for debugging purposes
    const { lightHelper, axesHelper, cannonDebugger } = createHelpers(scene, physicsWorld, mainLight);
    // scene.add(lightHelper, axesHelper);
    loop.updatables.push(cannonDebugger);

    const { cube, cubeBody } = createCube();
    cube.tick = () => {
      if (!isDragging) {
        cube.position.copy(cubeBody.position);
        cube.quaternion.copy(cubeBody.quaternion);
      }
    };
    cubeBody.tick = () => {
      if (isDragging) {
        cubeBody.position.copy(cube.position);
        cubeBody.quaternion.copy(cube.quaternion);
      }
    };

    draggableObjects.push(cube);
    loop.updatables.push(cube, cubeBody);
    scene.add(cube);
    physicsWorld.addBody(cubeBody);
  }

  async init() {
    const toonCat = await loadToonCat();
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
