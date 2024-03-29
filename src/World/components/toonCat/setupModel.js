import { AnimationMixer } from "three";

function setupModel(data) {
  console.log("setupModel");
  const model = data.scene.children[0];

  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  model.mixer = mixer;

  return model;
}

export { setupModel };
