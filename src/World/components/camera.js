import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 4000);

  camera.position.set(-800, 1200, 1800);

  return camera;
}

export { createCamera };
