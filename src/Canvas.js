class Canvas {
  /**
   * @param {number} width
   * @param {number} height
   * @param {number} line
   * @param {string} color
   */
  constructor(width = 500, height = 500, line = 2, color = "navy") {
    this.startState = false;
    this.endState   = false;

    this.line  = null;
    this.color = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.canvas   = document.getElementById("canvas");
    this.context  = this.canvas.getContext("2d");
    
    this.cleaner = document.getElementById("canvas-cleaner");
    this.cleaner.addEventListener("click", this.cleanCanvas.bind(this));

    this.initCanvas(width, height);
    this.initOptions();
    this.initContext(line, color);
    this.initDraw();
  }

  /**
   * @param {number} width
   * @param {number} height
   */
  initCanvas(width, height) {
    this.canvas.width   = width;
    this.canvas.height  = height;
  }

  initOptions() {
    if (document.getElementById("canvas-line")) {
      this.initLine();
    }

    if (document.getElementById("canvas-color")) {
      this.initColor();
    }
  }

  initLine() {
    this.line = document.getElementById("canvas-line");
    this.line.addEventListener("input", this.setLine.bind(this));
  }

  setLine() {
    this.context.lineWidth = this.line.value;
  }

  initColor() {
    this.color = document.getElementById("canvas-color");
    this.color.addEventListener("input", this.setColor.bind(this));
  }

  setColor() {
    this.context.strokeStyle = this.color.value;
  }

  /**
   * @param {number} line
   * @param {string} color
   */
  initContext(line, color) {
    this.context.lineWidth    = line;
    this.context.strokeStyle  = color;
    this.context.lineCap      = "round";
    this.context.lineJoin     = "round";
  }

  initDraw() {
    this.canvas.addEventListener("mousedown", this.moveInCanvas.bind(this, "mousedown"));
    this.canvas.addEventListener("mousemove", this.drawWithMouse.bind(this));
    this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("mouseout", this.stopDrawing.bind(this));

    this.canvas.addEventListener("touchstart", this.moveInCanvas.bind(this, "touchstart"));
    this.canvas.addEventListener("touchmove", this.drawWithTouch.bind(this));
    this.canvas.addEventListener("touchend", this.stopDrawing.bind(this));
    this.canvas.addEventListener("touchcancel", this.stopDrawing.bind(this));
  }

  startDrawing() {
    this.startState = true;
    this.context.beginPath();
  }

  stopDrawing() {
    this.startState = false;
    this.endState   = true;
  }

  cleanCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.endState = false;
  }

  /**
   * @param {object} event
   */
  getMouseLocation(event) {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
  }

  /**
   * @param {object} event
   */
  getTouchLocation(event) {
    let position  = event.target.getBoundingClientRect();
    this.touchX   = event.targetTouches[0].clientX - position.left;
    this.touchY   = event.targetTouches[0].clientY - position.top;
  }

  /**
   * @param {object} event
   * @param {string} type
   */
  moveInCanvas(event, type) {
    this.startDrawing();

    switch (type) {
      case "mousedown":
        this.moveWithMouse(event);
        break;
      case "touchstart":
        this.moveWithTouch(event);
        break;
    }
  }

  /**
   * @param {object} event
   */
  moveWithMouse(event) {
    this.getMouseLocation(event);
    this.moveTo(event, this.mouseX, this.mouseY);
  }

  /**
   * @param {object} event
   */
  moveWithTouch(event) {
    this.getTouchLocation(event);
    this.moveTo(event, this.touchX, this.touchY);
  }

  /**
   * @param {object} event
   * @param {number} x
   * @param {number} y
   */
  moveTo(event, x, y) {
    this.context.moveTo(x, y);
    event.preventDefault();
  }

  /**
   * @param {object} event
   */
  drawWithMouse(event) {
    if (this.startState) {
      this.getMouseLocation(event);
      this.lineTo(this.mouseX, this.mouseY);
    }
  }

  /**
   * @param {object} event
   */
  drawWithTouch(event) {
    if (this.startState) {
      this.getTouchLocation(event);
      this.lineTo(this.touchX, this.touchY);
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  lineTo(x, y) {
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}
