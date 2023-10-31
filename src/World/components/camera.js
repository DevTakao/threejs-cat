import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 4000);

  camera.position.set(0, 100, 2000);

  return camera;
}

export { createCamera };
