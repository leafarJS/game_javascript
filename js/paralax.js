const d = document;
const w = window;

const canvas = d.getElementById("canvas");
const context = canvas.getContext("2d");

let gameSpeed = 10;

const slider = d.getElementById("slider");

const showGameSpeed = d.getElementById("showGameSpeed");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

const backgroundLayerOne = new Image();
const backgroundLayerTwo = new Image();
const backgroundLayerThree = new Image();
const backgroundLayerFour = new Image();
const backgroundLayerFive = new Image();

backgroundLayerOne.src = "../assets/layer-1.png";
backgroundLayerTwo.src = "../assets/layer-2.png";
backgroundLayerThree.src = "../assets/layer-3.png";
backgroundLayerFour.src = "../assets/layer-4.png";
backgroundLayerFive.src = "../assets/layer-5.png";

w.addEventListener("load", (e) => {
  slider.value = gameSpeed;
  showGameSpeed.innerHTML = gameSpeed;

  slider.addEventListener("change", (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.x2 = this.width;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }

    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = this.width + this.x2 - this.speed;
      }
      if (this.x2 <= -this.width) {
        this.x2 = this.width + this.x - this.speed;
      }
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw() {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
  }

  const layer_1 = new Layer(backgroundLayerOne, 0.2);
  const layer_2 = new Layer(backgroundLayerTwo, 0.4);
  const layer_3 = new Layer(backgroundLayerThree, 0.6);
  const layer_4 = new Layer(backgroundLayerFour, 0.8);
  const layer_5 = new Layer(backgroundLayerFive, 1);

  const layoutObject = [layer_1, layer_2, layer_3, layer_4, layer_5];

  function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layoutObject.forEach((obj) => {
      obj.update();
      obj.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
});
