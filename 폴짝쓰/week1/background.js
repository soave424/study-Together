function draw() {
  for (let i = 0; i < 13; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(50, 530 + i*10);
    ctx.lineTo(450, 530 + i*10);
    ctx.strokeStyle="DarkSeaGreen";
    ctx.stroke();
  }
}

function text() {
  ctx.beginPath();
  ctx.moveTo(65, 650);
  ctx.font = "48px cursive";
  ctx.strokeStyle="Gold";
  ctx.fillText("SlamDunk", 65, 650);
}

setTimeout(draw, 4000);
setTimeout(text, 4000);