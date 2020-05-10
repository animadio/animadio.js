"use strict";

class Animadio {

  static input (inputs, elements = ["animadio", ["trigger"]], duration = [2000, {}, {}]) {
    new Input(inputs, elements, duration);
  }

  static slider (timeout = 2000, auto = true, random = false) {
    new Slider(timeout, auto, random);
  }
}
