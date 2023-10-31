import CannonDebugger from "cannon-es-debugger";
import { AxesHelper, DirectionalLightHelper } from "three";

function createHelpers(scene, world, light) {
  const lightHelper = new DirectionalLightHelper(light, 5);
  const axesHelper = new AxesHelper(2000); // No need to convert axesHelper.geometry
  const cannonDebugger = new CannonDebugger(scene, world);

  cannonDebugger.tick = () => cannonDebugger.update();

  return { lightHelper, axesHelper, cannonDebugger };
}

export { createHelpers };
