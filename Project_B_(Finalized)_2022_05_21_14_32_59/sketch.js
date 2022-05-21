let sticks = [];
let volume;
let mySong;
let amplitude;

function preload() {
  mySong = loadSound("assets/ShineeView.mp3");
}

function setup() {
  createCanvas(850, 600);
  background(0);
  angleMode(DEGREES);
  amplitude = new p5.Amplitude();
  for (let i = 0; i < 400; i++) {
    sticks[i] = new LightStick(random(width), random(height));
  }
}

function draw() {
  let level = amplitude.getLevel();
  volume = map(level,0,0.7,0.0,1.0);
  background(0);
  // audience
  for (let i = 0; i < sticks.length; i++) {
    let s = sticks[i];
    s.checkMouse();
    s.updateAngle();
    s.draw();
  }
  
  // stage
  fill(64);
  ellipse(width/2 , height, 550, 300);
  push();
  noStroke();

  let g = map(volume, 0, 1, 204, 225);
  let b = map(volume, 0, 1, 102, 253);
  let r = map(volume, 0, 1, 255, 100);
  
  let adj = 1; // adjust based on the volume
  
  let angle = frameCount * adj; // adjustment
  let radDist = 100;
  let x = width/2 + cos(angle*1.0) * radDist * adj;
  let y = height - 40 + sin(angle*1.0) * radDist * adj;
  
  let dia = map(volume,0,1,30,60);
  
  fill(r, g, b, 127);
  ellipse(x, y, dia, dia);
  pop();
}

class LightStick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 270;
    this.r = 0;
    this.g = 255;
    this.b = 0;
  }
  updateAngle() {
    let level = amplitude.getLevel();
    let adj = map(mouseY, 0, height, 5, 20);
    let freq = frameCount * adj;
    let amp = level;
    this.angle = 270 + sin(freq) * amp * 100;
  }
  checkMouse() {
    if (keyIsPressed == true) {
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    } else {
      this.r = random(255);
      this.g = 0;
      this.b = random(255);
    }
  }
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    rectMode(CENTER);
    fill(this.r, this.g, this.b, 200);
    noStroke();
    rect(15, 0, 30, 6, 10, 5, 10, 5);

    // origin for debug
    //fill(255, 0, 0);
    //circle(0, 0, 5);
    pop();
  }
}
function mousePressed() {
  if (mySong.isPlaying() == false) {
    mySong.play();  
  } else {
    mySong.pause();  
  }
}
