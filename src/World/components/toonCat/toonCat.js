import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel";
import { Body, Box, Vec3 } from "cannon-es";

async function loadToonCat() {
  const loader = new GLTFLoader();

  const toonCatData = await loader.loadAsync("assets/models/toon_cat_free.glb");

  const catMesh = toonCatData.scene.getObjectByName("Object_43");
  catMesh.castShadow = true;
  catMesh.computeBoundingBox();
  const catBounds = catMesh.boundingBox;

  const cat = setupModel(toonCatData);
  cat.position.set(0, 10, 0);

  const scale = 160;
  // Physics
  const halfExtents = new Vec3(
    ((catBounds.max.x - catBounds.min.x) / 2) * scale - 50,
    ((catBounds.max.y - catBounds.min.y) / 2) * scale + 130,
    ((catBounds.max.z - catBounds.min.z) / 2) * scale + 20
  );
  const catBodyShape = new Box(halfExtents);
  const catBody = new Body({ mass: 1, shape: catBodyShape });

  catBody.position.set(cat.position.x, cat.position.y + 180, cat.position.z);
  catBody.quaternion.copy(cat.quaternion);
  catBody.collisionResponse = true;

  catBody.mesh = cat;

  return { cat, catBody };
}

export { loadToonCat };
