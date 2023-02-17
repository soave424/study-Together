const circleBtn = document.querySelector("#circle");
let circle = false;


function drawCircle(event){
  if(circle){
    const x = event.offsetX;
    const y = event.offsetY;
    const z = Math.floor(Math.random()*100);
    ctx.beginPath();
    ctx.arc(x, y, z, 0, Math.PI*2);
    if(savedColor){
      ctx.fillStyle = savedColor;
      ctx.fill();
    }else{
      ctx.fillStyle = newcolor;
      ctx.fill();
    }
  }
}


circleBtn.addEventListener("click", (event)=> event.preventDefault());

