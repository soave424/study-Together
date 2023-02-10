canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height = 800;

// Draw the head
ctx.beginPath();
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill();
ctx.stroke();

// Draw the body
ctx.beginPath();
ctx.moveTo(250, 150);
ctx.lineTo(250, 300);
ctx.stroke();

// Draw the arms
ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(300, 200);
ctx.stroke();

// Draw the legs
ctx.beginPath();
ctx.moveTo(250, 300);
ctx.lineTo(200, 400);
ctx.lineTo(300, 400);
ctx.closePath();
ctx.stroke();

// Draw the hair
ctx.beginPath();
ctx.moveTo(225, 75);
ctx.lineTo(275, 75);
ctx.lineTo(250, 50);
ctx.closePath();
ctx.fillStyle = "black";
ctx.fill();