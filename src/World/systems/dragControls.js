import { DragControls } from "three/addons/controls/DragControls.js";

function createDragControls(objects, camera, canvas) {
  const controls = new DragControls(objects, camera, canvas);

  return controls;
}

export { createDragControls };
