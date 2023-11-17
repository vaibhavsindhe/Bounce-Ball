let canvas=document.getElementById("mycanvas");
let ctx=canvas.getContext("2d");
ctx.lineWidth=2;
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight-113;
ball={
        x:canvas.width/2,
        y:100,
        radius:20,
        status:0,
        color:"red",
        targetX:null,
        targetY:null
    }  


canvas.addEventListener("click", function (event) {
// Set the target position to the mouse click coordinates
    if(ball.status){
      ball.status=0;
      ball.targetX = event.clientX;   
      ball.targetY = event.clientY;
    }
});

let bounceCount=document.querySelector("#bounce-count");   
document.querySelector(".btn").addEventListener("click",()=>{
  bounceCount.textContent="0";
})




setInterval(draw,1000/60);

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
    ctx.fillStyle=ball.color;
    ctx.fill();
    ballMovement();


    ctx.beginPath();
    ctx.rect(0,300,230,30);
    ctx.stroke();

    const platform=new Image();
    platform.src="Assets/platform.png";
    ctx.drawImage(platform,-25,280,280,80);    
}




//ball movement
let vx=5.0,
    vy=4,
    gravity=0.5,
    bounce=0.7,
    xFriction=0.2;
    speed = 15; 

function ballMovement(){
    if (ball.targetX !== null && ball.targetY !== null) {
        let dx = ball.targetX - ball.x;
        let dy = ball.targetY - ball.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        // Move towards the target
        if (distance > speed) {
          vx = (speed / distance) * dx;
          vy = (speed / distance) * dy;
        } 
        else {
          // Snap to the target when close enough
          ball.x = ball.targetX;
          ball.y = ball.targetY;
          ball.targetX = null;
          ball.targetY = null;
        }
      }
       
    ball.x += vx;
    ball.y += vy;
    vy += gravity;
    
    //Ball hits the wall
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
       vx *= -1;
    } 
    
    // Ball hits the floor
    if(ball.y + ball.radius > canvas.height ){// ||   
        ball.y = canvas.height - ball.radius;
        updateValue();
    }   
    //Ball hits top
    if(ball.y - ball.radius < 0){
        ball.y=ball.radius;
        vy*=-bounce;
    }  
    //Ball hits platform
    if((ball.x<230 && ball.y<300)&& ball.y+ball.radius>300){
        ball.y = 300-ball.radius;
        updateValue();
    }
    if((ball.x<230 && ball.y>330)&& ball.y-ball.radius<330){
        ball.y=330+ball.radius;
        vy*=-bounce; 
    }
    if(((ball.x-ball.radius<=230) && (ball.y<330 && ball.y>300)) ){
      vx *= -1;
    }
}
function xF(){
    if(vx>0)
        vx = vx - xFriction;
    if(vx<0)
        vx = vx + xFriction;
}
function updateBouncecount(){
  bounceCount.textContent=parseInt(bounceCount.textContent)+1;
}
function updateValue(){
  //bounce the ball
    vy *= -bounce;

  //reduce bouncing
    if(vy<0 && vy>-2.1){
      vy=0;
    }
    if(vy!=0 && vy<!0){
      updateBouncecount();
    }
  //resting the ball
   if(Math.abs(vx)<1.1){
      vx=0;
      ball.status=1;
    }   
   xF();
}


