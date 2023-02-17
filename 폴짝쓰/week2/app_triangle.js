const triangleBtn = document.querySelector("#triangle");
let triangle = false;

function drawTriangle(event){
  if(triangle){
    const x = event.offsetX;
    const y = event.offsetY;
    const z = Math.floor(Math.random()*100);
    ctx.beginPath();
    ctx.moveTo(x, y); //기준 좌표값 이동
    ctx.lineTo(x+z, y+z); // X, Y 좌표를 사용하여 선 그리기
    ctx.lineTo(x, y+z);
    ctx.stroke();

    if(savedColor){
      ctx.fillStyle = savedColor;
      ctx.fill();
    }else{
      ctx.fillStyle = newcolor;
      ctx.fill();
    }
  }
}

triangleBtn.addEventListener("click", (event)=> event.preventDefault());