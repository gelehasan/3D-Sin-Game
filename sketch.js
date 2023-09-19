// My code starts here

// Variables for sliders and settings
let speedSlider;
let heightSlider;
let boxSize;
let noseSlider;
let boxHeight;
let modifyDiv;
let cameraAngleSlider;
let zoomSlider;

// Arrays to store confetti locations and theta values
let confLocs = [];
let confTheta = [];

// Default camera position
let defaultCamera = {
  X: 800,
  Y: -600,
  Z: 800
};

//my code starts here
function setup() {
  // Create a canvas and initialize settings
  createCanvas(900, 800, WEBGL);

  // Initialize confetti locations and theta values
  for (var i = 0; i < 200; i++) {
    var confettiLocation = createVector(random(-500, 500), random(-800, 0), random(-500, 500));
    confLocs.push(confettiLocation);
    confTheta.push(random(0, 360));
  }

  // Add a point light
  pointLight(255, 255, 255, 0, -200, 200);

  // Select the settingDiv element
  const settingDiv = select(".settingDiv");

  // Create sliders for various settings
  createSpan("Speed:").parent(settingDiv);
  speedSlider = createSlider(1, 100, 5);
  speedSlider.parent(settingDiv);

  createSpan("Height:").parent(settingDiv);
  heightSlider = createSlider(0, 10, 1, 0.5);
  heightSlider.parent(settingDiv);

  createSpan("Nose:").parent(settingDiv);
  noseSlider = createSlider(0, 50, 0);
  noseSlider.parent(settingDiv);

  createSpan("Camera Angle:").parent(settingDiv);
  cameraAngleSlider = createSlider(-600, 600, -600);
  cameraAngleSlider.parent(settingDiv);

  createSpan("Zoom:").parent(settingDiv);
  zoomSlider = createSlider(100, 1000, 800);
  zoomSlider.parent(settingDiv);
}

// Ends here

// My code starts here
function draw() {
  background(125);

  angleMode(DEGREES);

  // Generate a random color for the point light
  let randomColor = color(random(255), random(255), random(255));
  let r = red(randomColor);
  let g = green(randomColor);
  let b = blue(randomColor);

  // Apply the random color to the point light
  let lightX = width / 2;
  let lightY = height / 2;
  pointLight(r, g, b, lightX, lightY, 50);

  // Call functions to draw boxes, confetti, and adjust the camera
  drawBoxes();
  confetti();
  flyingCamera();
}

// Ends here

// My code starts here
function flyingCamera() {
  // Get values from sliders
  let zoomValue = zoomSlider.value();
  let userCameraAngle = cameraAngleSlider.value();
  let cameraAngle = (frameCount * 0.8) + userCameraAngle;

  // Calculate camera position
  let cameraX = cos(cameraAngle) * 800;
  let cameraY = -600;
  let cameraZ = sin(cameraAngle) * 800;

  // Adjust camera based on zoom value
  if (zoomValue !== defaultCamera.Z) {
    let zoomFactor = map(zoomValue, 100, 1000, 0.2, 5);
    cameraX *= zoomFactor;
    cameraY *= zoomFactor;
    cameraZ *= zoomFactor;
  }

  // Set the camera position
  camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 1, 0);
}

// Ends here

// My code starts here
function drawBoxes() {
  let speed = speedSlider.value();
  let noseWeight = noseSlider.value();
  let sizeSlider = heightSlider.value();

  // Draw a grid of boxes
  for (let i = -400; i < 400; i += 50) {
    for (let j = -400; j < 400; j += 50) {
      const minHeight = 100;
      const maxHeight = 300;

      let noseCal = noise(i * noseWeight, j * noseWeight);
      let distance = dist(0, 0, i, j) + (frameCount * speed * 4) * noseCal;
      let length = map(sin(distance) * sizeSlider, -1, 1, minHeight, maxHeight);

      push();
      normalMaterial();
      stroke(0);
      strokeWeight(2);
      translate(i, 0, j);
      box(50, length, 50);
      pop();
    }
  }
}

// Ends here

// My code starts here
function confetti() {
  // Draw confetti pieces and animate them
  for (var i = 0; i < confLocs.length; i++) {
    push();
    translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
    rotateX(confTheta[i]);
    specularMaterial(255, 0, 0);
    plane(15, 15, 15);
    pop();

    // Animate the confetti
    confLocs[i].y += 1; // Move downwards
    confTheta[i] += 10; // Spin

    if (confLocs[i].y > 0) {
      confLocs[i].y = -800; // Reset to the top
    }
  }
}

// Ends here
