import { DirectionalLight, HemisphereLight } from "three";

function createLights() {
  const ambientLight = new HemisphereLight("white", 0x777777, 1);
  ambientLight.position.set(-1000, 1500, 0);

  const mainLight = new DirectionalLight("white", 5);
  mainLight.position.set(-1000, 1500, 400);
  mainLight.castShadow = true;

  const side = 800;
  mainLight.shadow.camera.top = side;
  mainLight.shadow.camera.bottom = -side;
  mainLight.shadow.camera.left = side;
  mainLight.shadow.camera.right = -side;

  mainLight.shadow.mapSize.width = 500;
  mainLight.shadow.mapSize.height = 500;
  mainLight.shadow.camera.near = 0;
  mainLight.shadow.camera.far = 4000;

  return { ambientLight, mainLight };
}

export { createLights };
