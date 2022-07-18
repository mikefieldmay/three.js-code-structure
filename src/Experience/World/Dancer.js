import * as THREE from "three";

import Experience from "../Experience";

export default class Dancer {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.model = null;
    this.animation = null;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("dancer");
    }

    this.resource = this.resources.items.dancerModel;
    console.log(this.resources);

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(1.5, 1.5, 1.5);
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.animation.actions = {};

    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resources.items.idle.animations[0]
    );
    this.animation.actions.stretch = this.animation.mixer.clipAction(
      this.resources.items.stretch.animations[0]
    );

    this.animation.actions.tutDance = this.animation.mixer.clipAction(
      this.resources.items.tutDance.animations[0]
    );

    this.animation.actions.thriller = this.animation.mixer.clipAction(
      this.resources.items.thriller.animations[0]
    );

    // this.animation.actions.walking = this.animation.mixer.clipAction(
    //   this.resource.animations[1]
    // );
    // this.animation.actions.running = this.animation.mixer.clipAction(
    //   this.resource.animations[2]
    // );

    this.animation.actions.current = this.animation.actions.idle;

    this.animation.actions.current.play();

    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      if (newAction !== oldAction) {
        newAction.reset();
        newAction.play();
        newAction.crossFadeFrom(oldAction, 1);
        this.animation.actions.current = newAction;
      }
    };

    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play("idle");
        },
        playStretch: () => {
          this.animation.play("stretch");
        },
        playTutDance: () => {
          this.animation.play("tutDance");
        },
        playThriller: () => {
          this.animation.play("thriller");
        },
      };
      this.debugFolder.add(debugObject, "playIdle");
      this.debugFolder.add(debugObject, "playStretch");
      this.debugFolder.add(debugObject, "playTutDance");
      this.debugFolder.add(debugObject, "playThriller");
    }
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
