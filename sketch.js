
let speed;
let boxSize;
let noseWeight;
let boxHight;
let modifyDiv;
let cameraAngle;
let confLocs = [];
let confTheta=[];

function setup() {
    createCanvas(900, 800, WEBGL);    

    for (var i = 0; i < 200; i++) {
        var confettiLocation = createVector(random(-500, 500), random(-800, 0), random(-500, 500));
        confLocs.push(confettiLocation);
        confTheta.push(random(0, 360));
    }
    pointLight(255, 255, 255, 0, -200, 200);
  
 

}

function draw() {
  
    background(125);

    angleMode(DEGREES);
   
    let randomColor = color(random(255), random(255), random(255));

    let r = red(randomColor);
    let g = green(randomColor);
    let b = blue(randomColor);
    
    // Apply the random color to the point light
    let lightX = width / 2;
    let lightY =  height / 2;
    pointLight(r, g, b, lightX, lightY, 50);

    //camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
   // camera(cos(frameCount*0.3)*800,-600,sin(frameCount*0.3)*800,0,0,0,0,1,0);

   drawBoxes();
  
   confetti();

   flyingCamera();
  
}


function flyingCamera () {
   
 let cameraHeight = 800;

    cameraAngle = select(".cameraAngle").value();

   camera(cos(frameCount*0.8)*cameraHeight,cameraAngle,sin(frameCount*0.8)*cameraHeight,0,0,0,0,1,0);

}
    
function drawBoxes() {
    speed= select(".speed").value();    
    noseWeight = select(".nose").value();
    sizeSlider = select(".sizeSlider").value();
        for (let i = -400; i < 400; i=i+ 50) {
          for (let j = -400; j < 400; j= j+ 50) {
            const minHeight = 100;
            const maxHeight = 300;
            let noseCal= noise(i * noseWeight, j * noseWeight);
            let distance = dist( 0,0, i, j) + (frameCount * speed*4)*noseCal;
            let length = map(sin(distance)*sizeSlider, -1, 1, minHeight, maxHeight);
      
            
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







      
      function confetti() {
        for (var i = 0; i < confLocs.length; i++) {
            push();
            translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
            rotateX(confTheta[i]);
            specularMaterial(255, 0, 0);
            plane(15, 15,15);
            pop();
    
            // Animate the confetti
            confLocs[i].y += 1;         // Move downwards
            confTheta[i] += 10;        // Spin
    
            if (confLocs[i].y > 0) {
                confLocs[i].y = -800;  // Reset to the top
            }
        }
    }