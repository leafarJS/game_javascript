console.log("cargado");

const d = document;
const w = window;

let playerState = "sit";
const dropdown = d.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const canvas = d.getElementById("canvas1");
const context = canvas.getContext("2d");

//console.log(ctx);

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();

const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrame = 5;

//llamar sprite
playerImage.src = "../assets/shadow_dog.png";

//recorrer sprite
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 7,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let i = 0; i < state.frames; i++) {
    let position_x = i * spriteWidth;
    let position_y = index * spriteHeight;

    frames.loc.push({
      x: position_x,
      y: position_y,
    });
  }
  spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

//animar sprite
function animate() {
  //limpiar el lienzo
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;
  //console.log(position);
  let frame_x = spriteWidth * position;
  let frame_y = spriteAnimations[playerState].loc[position].y;
  // imagen axis.x , axis.y , width , height, destination.x, y, w, h
  context.drawImage(
    playerImage,
    frame_x,
    frame_y,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
