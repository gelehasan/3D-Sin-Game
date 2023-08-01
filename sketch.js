

function setup() {
    createCanvas(900, 800, WEBGL);    

}

function draw() {
    
    background(125);
    angleMode(DEGREES);
    drawBoxes();
   
    camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
}


    
function drawBoxes() {
    
    
        for (let i = -400; i < 400; i=i+ 50) {
          for (let j = -400; j < 400; j= j+ 50) {
            let distance = dist(0, 0, i, j) + (frameCount * 1);
            const minHeight = 100;
            const maxHeight = 300;
            let length = map(sin(distance), -1, 1, minHeight, maxHeight);
      
            
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
  

