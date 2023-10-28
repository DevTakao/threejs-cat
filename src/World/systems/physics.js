import { Vec3, World } from "cannon-es";

function createPhysics() {
  const world = new World({ gravity: new Vec3(0, -100, 0) });

  return world;
}

export { createPhysics };
