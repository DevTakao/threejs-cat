import { AxesHelper, DirectionalLightHelper } from "three";

function createHelpers(light) {
  const lightHelper = new DirectionalLightHelper(light, 5);
  const axesHelper = new AxesHelper(2000); // No need to convert axesHelper.geometry
  return { lightHelper, axesHelper };
}

export { createHelpers };
