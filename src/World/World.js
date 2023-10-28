import { createScene } from "./components/scene";
import { createCamera } from "./components/camera";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights";
import { createControls } from "./systems/controls";
import { loadToonCat } from "./components/toonCat/toonCat";
import { createGround } from "./components/ground";
import { Loop } from "./systems/Loop.js";
import { createPhysics } from "./systems/physics";

import { createDragControls } from "./systems/dragControls";

let camera;
let renderer;
let scene;
let loop;
let physicsWorld;
let controls;
let cubeDragControls;
let catDragControls;
let isCubeDragging = false;
let isCatDragging = false;
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
      if (delta) {
        console.log("p tick");
        physicsWorld.step(delta);
      }
    };
    loop.updatables.push(physicsWorld);

    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    const { ambientLight, mainLight } = createLights();
    scene.add(ambientLight, mainLight);

    const { ground, groundBody } = createGround();
    scene.add(ground);
    physicsWorld.addBody(groundBody);

    //* for debugging purposes
    // const { lightHelper, axesHelper, cannonDebugger } = createHelpers(scene, physicsWorld, mainLight);
    // scene.add(lightHelper, axesHelper);
    // loop.updatables.push(cannonDebugger);

    // const { cube, cubeBody } = createCube();
    // cube.tick = () => {
    //   if (!isCubeDragging) {
    //     cube.position.copy(cubeBody.position);
    //     cube.quaternion.copy(cubeBody.quaternion);
    //   }
    // };
    // cubeBody.tick = () => {
    //   if (isCubeDragging) {
    //     cubeBody.position.copy(cube.position);
    //     cubeBody.quaternion.copy(cube.quaternion);
    //   }
    // };

    // loop.updatables.push(cube, cubeBody);
    // cubeDragControls = createDragControls([cube], camera, renderer.domElement);
    // // dragControls.transformGroup = true;
    // cubeDragControls.addEventListener("dragstart", function (event) {
    //   isCubeDragging = true;
    //   controls.enabled = false;
    // });
    // cubeDragControls.addEventListener("dragend", function (event) {
    //   isCubeDragging = false;
    //   controls.enabled = true;
    // });
    // scene.add(cube);
    // physicsWorld.addBody(cubeBody);
  }

  async init() {
    const { cat, catBody } = await loadToonCat();
    cat.tick = (delta) => {
      cat.mixer.update(delta);
      if (!isCatDragging) {
        cat.position.set(catBody.position.x, catBody.position.y - 180, catBody.position.z);
        cat.quaternion.copy(catBody.quaternion);
      }
    };
    catBody.tick = () => {
      if (isCatDragging) {
        catBody.position.set(cat.position.x, cat.position.y + 180, cat.position.z);
        catBody.quaternion.copy(cat.quaternion);
      }
    };
    loop.updatables.push(cat, catBody);
    scene.add(cat);

    catDragControls = createDragControls([cat], camera, renderer.domElement);
    catDragControls.transformGroup = true;
    catDragControls.addEventListener("dragstart", function (event) {
      event.object.traverse((child) => {
        if (child.isMesh) {
          child.material.emissive.set(0xffffff);
          child.material.emissiveIntensity = 0.2;
        }
      });
      isCatDragging = true;
      controls.enabled = false;
    });
    catDragControls.addEventListener("dragend", function (event) {
      event.object.traverse((child) => {
        if (child.isMesh) {
          child.material.emissive.set(0x000000);
          child.material.emissiveIntensity = 0;
        }
      });
      isCatDragging = false;
      controls.enabled = true;
    });

    physicsWorld.addBody(catBody);
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
