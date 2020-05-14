"use strict";

class Animadio {

  static input(inputs, elements = ["animadio", ["trigger"]], duration = [2000, {}, {}]) {
    new Input(inputs, elements, duration);
  }

  static slider(timeout = 2000, auto = true, random = false) {
    new Slider(timeout, auto, random);
  }

  static canvas(width = 500, height = 500, line = 2, color = "navy") {
    new Canvas(width, height, line, color);
  }

  static ajax(url, callback = null, data = null) {
    new Ajax(url, callback, data);
  }

}
