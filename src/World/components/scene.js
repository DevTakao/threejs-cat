import { Color, Scene } from "three";

function createScene() {
  const scene = new Scene();

  scene.background = new Color(0xfca99f);

  return scene;
}

export { createScene };
