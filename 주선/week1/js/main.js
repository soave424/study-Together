const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

function drawStar(x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 10, y + 25);
  ctx.lineTo(x - 40, y + 25);
  ctx.lineTo(x - 15, y + 45);
  ctx.lineTo(x - 25, y + 70);
  ctx.lineTo(x, y + 50);

  ctx.lineTo(x + 25, y + 70);
  ctx.lineTo(x + 15, y + 45);
  ctx.lineTo(x + 40, y + 25);
  ctx.lineTo(x + 10, y + 25);
  ctx.lineTo(x, y);

  if (color === undefined) {
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
  }
  ctx.stroke();
}

function drawHeart(x, y, r, color) {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.arc(x, y, r, Math.PI, 0);
  ctx.arc(x + r * 2, y, r, Math.PI, 0);
  ctx.arc(x + r, y, r * 2, 0, Math.PI);
  if (color === undefined) {
    ctx.stroke();
  } else {
    console.log(color);
    ctx.fillStyle = color;
    ctx.fill();
  }
}
drawStar(400, 400);
drawStar(40, 40, 'blue');
drawHeart(200, 200, 30, 'yellow');
