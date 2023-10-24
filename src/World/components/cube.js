import { BoxGeometry, MeshStandardMaterial, Mesh, DoubleSide } from "three";

function createCube() {
  const geometry = new BoxGeometry(200, 200, 200);
  const material = new MeshStandardMaterial({ color: 0x123456 });
  const cube = new Mesh(geometry, material);
  cube.castShadow = true;

  cube.position.set(0, 200, 0);

  return cube;
}

export { createCube };
