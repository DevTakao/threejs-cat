import { Vec3, World } from "cannon-es";

function createPhysics() {
  const world = new World({ gravity: new Vec3(0, -100, 0) });

  return world;
}

// function checkAABBCollision(body1, body2) {
//   const aabb1 = body1.aabb;
//   const aabb2 = body2.aabb;

//   console.log(/*cube*/ aabb1.lowerBound.y, /*ground*/ aabb2.upperBound.y);
//   if (Math.ceil(aabb1.lowerBound.y) < aabb2.upperBound.y - 5) {
//     return true;
//   } else {
//     return false;
//   }
// }

export {
  createPhysics,
  // , checkAABBCollision
};
