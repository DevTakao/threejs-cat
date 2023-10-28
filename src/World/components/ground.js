import { BoxGeometry, MeshStandardMaterial, Mesh, DoubleSide } from "three";
import { Body, Box, Vec3 } from "cannon-es"; // Make sure your import is correct

function createGround() {
  const geometry = new BoxGeometry(1000, 1000, 20);
  const material = new MeshStandardMaterial({ color: 0x7f2a22, roughness: 0, metalness: 0 });
  const ground = new Mesh(geometry, material);
  ground.castShadow = true;
  ground.receiveShadow = true;

  ground.position.set(0, 0, 0);
  ground.rotation.x = Math.PI / 2;

  // Physics
  const halfExtents = new Vec3(500, 500, 10);
  const groundBodyShape = new Box(halfExtents);
  const groundBody = new Body({ mass: 0, shape: groundBodyShape });

  groundBody.position.copy(ground.position);
  groundBody.quaternion.copy(ground.quaternion);
  groundBody.collisionResponse = true;
  groundBody.mesh = ground;

  groundBody.tick = () => {
    groundBody.position.copy(groundBody.mesh.position);
    groundBody.quaternion.copy(groundBody.mesh.quaternion);
  };

  return { ground, groundBody };
}

export { createGround };
