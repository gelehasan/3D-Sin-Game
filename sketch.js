
let speed;
let boxSize;
let noseWeight;
let boxHight;
let modifyDiv;
let cameraAngle;

function setup() {
    createCanvas(900, 800, WEBGL);    

}

function draw() {
    
    background(125);
    angleMode(DEGREES);
    drawBoxes();
   
    //camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
   // camera(cos(frameCount*0.3)*800,-600,sin(frameCount*0.3)*800,0,0,0,0,1,0);

   flyingCamera();
}

function flyingCamera () {
   
 let cameraHeight = 800;

    cameraAngle = select(".cameraAngle").value();
    //camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
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
            let distance = dist( 0,0, i, j, 0,0) + (frameCount * speed)*noseCal;
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
  

      //draws the confetti to the scene 
