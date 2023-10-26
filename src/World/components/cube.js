import { Body, Box, Vec3 } from "cannon-es"; // Make sure your import is correct
import { BoxGeometry, MeshStandardMaterial, Mesh } from "three";

function createCube() {
  const geometry = new BoxGeometry(200, 200, 200);
  const material = new MeshStandardMaterial({ color: 0x123456 });
  const cube = new Mesh(geometry, material);
  cube.castShadow = true;

  cube.position.set(0, 200, 0);

  // Physics
  const halfExtents = new Vec3(100, 100, 100);
  const cubeBodyShape = new Box(halfExtents);
  const cubeBody = new Body({ mass: 50, shape: cubeBodyShape });

  cubeBody.position.copy(cube.position);
  cubeBody.quaternion.copy(cube.quaternion);

  cubeBody.mesh = cube;

  // cube.tick = () => {
  //   cube.position.copy(cubeBody.position);
  //   cube.quaternion.copy(cubeBody.quaternion);
  // };

  return { cube, cubeBody };
}

export { createCube };