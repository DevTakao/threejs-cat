import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel";

async function loadToonCat() {
  const loader = new GLTFLoader();

  const toonCatData = await loader.loadAsync("assets/models/toon_cat_free.glb");

  console.log("Meow!", toonCatData);
  const modelScale = 0.01;

  if (toonCatData.scene) {
    toonCatData.scene.scale.set(modelScale, modelScale, modelScale);
    toonCatData.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }

  const cat = setupModel(toonCatData);
  cat.position.set(0, 0, 0);

  return cat;
}

export { loadToonCat };
