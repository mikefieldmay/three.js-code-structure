import * as dat from "lil-gui";

export default class Debug {
  constructor() {
    this.active = true;
    if (this.active) {
      this.ui = new dat.GUI();
    }
  }
}
