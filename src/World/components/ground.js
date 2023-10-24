import { BoxGeometry, MeshStandardMaterial, Mesh, DoubleSide } from "three";

function createGround() {
  const geometry = new BoxGeometry(1000, 1000, 20);
  const material = new MeshStandardMaterial({ color: 0x7f2a22, roughness: 0, metalness: 0 });
  const ground = new Mesh(geometry, material);
  ground.castShadow = true;
  ground.receiveShadow = true;

  ground.position.set(0, -10, 0);
  ground.rotation.x = Math.PI / 2;

  return ground;
}

export { createGround };
