const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

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
    console.log(color);
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
drawStar(50, 10);
drawStar(200, 10, 'red');
drawHeart(700, 50, 10);
drawHeart(350, 200, 50, 'yellow');
