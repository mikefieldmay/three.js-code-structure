import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Dancer from "./Dancer";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = experience.scene;
    this.resources = this.experience.resources;
    this.dancer = null;
    this.floor = null;
    this.environment = null;

    this.resources.on("ready", () => {
      this.dancer = new Dancer();
      this.floor = new Floor();
      console.log(this.dancer);
      this.environment = new Environment();
    });
  }

  update() {
    if (this.dancer) {
      this.dancer.update();
    }
  }
}
