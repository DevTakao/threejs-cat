import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel";
import { Body, Box, Vec3 } from "cannon-es";

async function loadToonCat() {
  const loader = new GLTFLoader();

  const toonCatData = await loader.loadAsync("assets/models/toon_cat_free.glb");

  console.log("Meow!", toonCatData);

  if (toonCatData.scene) {
    toonCatData.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }

  const cat = setupModel(toonCatData);
  cat.position.set(0, 300, 0);

  // Physics
  const halfExtents = new Vec3(120, 200, 120);
  const catBodyShape = new Box(halfExtents);
  const catBody = new Body({ mass: 1, shape: catBodyShape });

  catBody.position.copy(cat.position);
  catBody.quaternion.copy(cat.quaternion);

  catBody.mesh = cat;

  return { cat, catBody };
}

export { loadToonCat };
