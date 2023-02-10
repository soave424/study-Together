canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height = 800;

function draw(){
  for(let i=1;i<11;i++){
    for(let j=1; j<13; j++){
      ctx.strokeStyle = `rgb(200, ${Math.floor(12.5 * i)}, ${Math.floor(32.5 * j)})`;
      ctx.beginPath();
      ctx.arc(60*j, 60*i+(15*(i-1)), 20, 0, Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(60*j, 30*i+(45*(i-1)), 15, 0, Math.PI*2);
      ctx.stroke();
      ctx.fillStyle="white";
      ctx.fill();
      ctx.moveTo(60*j-20, 60*i+(15*(i-1)));
      ctx.lineTo(60*j-(20*2), 60*i+(15*(i-1))-10);
      ctx.moveTo(60*j+20, 60*i+(15*(i-1)));
      ctx.lineTo(60*j+(20*2), 60*i+(15*(i-1))-10);
      ctx.stroke();
    }
  }
}

draw();