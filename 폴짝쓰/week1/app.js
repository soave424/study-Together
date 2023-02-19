
canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height = 800;

ctx.beginPath();
ctx.moveTo(460, 50);

ctx.bezierCurveTo(437, 48, 425, 48, 400, 50);

ctx.bezierCurveTo(365, 55, 320, 80, 295, 120);
ctx.bezierCurveTo(260, 180, 240, 240, 240, 300);
ctx.bezierCurveTo(245, 330, 260, 360, 290, 400);
ctx.bezierCurveTo(320, 430, 340, 440, 380, 455);
//중앙윤곽
ctx.bezierCurveTo(400, 460, 440, 460, 450, 458);
ctx.moveTo(460, 50);
ctx.bezierCurveTo(485, 55, 534, 80, 565, 120);
ctx.bezierCurveTo(614, 180, 614, 240, 620, 300);
ctx.bezierCurveTo(620, 330, 600, 360, 570, 400);
ctx.bezierCurveTo(545, 430, 515, 440, 450, 458);

ctx.fillStyle ="#FAEBD7";
ctx.fill();
//ctx.stroke();


function drawEyes(){ctx.beginPath();
  ctx.moveTo(340, 250);
  ctx.arc(340, 250, 50, 0, Math.PI*1);
  
  ctx.moveTo(520, 250);
  ctx.arc(520, 250, 50, 0, Math.PI*1);
  ctx.fillStyle = "white";
  ctx.fill()

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(340, 270, 10, 0, Math.PI*2)
  ctx.arc(520, 270, 10, 0, Math.PI*2)
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(400, 370);
  ctx.lineTo(450, 370);
  ctx.stroke();
}

function drawEyeBrows(){
  ctx.beginPath();
  ctx.moveTo(390, 240);
  ctx.quadraticCurveTo(370, 250, 290, 220);
  ctx.moveTo(470, 240);
  ctx.quadraticCurveTo(490, 250, 570, 220);
  ctx.stroke();
}

function drawHair(){
  ctx.beginPath();
  ctx.moveTo(430, 200);
  ctx.arc(430, 200, 190, Math.PI*1, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fillRect(240,200, 20, 55);
  ctx.moveTo(600, 200);
  ctx.fillRect(600, 200, 20, 55);
  ctx.fill();
}

function drawEars(){
  ctx.beginPath();
  ctx.moveTo(240, 300);
  ctx.arc(240, 300, 50, 0, Math.PI*2);
  ctx.moveTo(620, 300);
  ctx.arc(620, 300, 50, 0, Math.PI*2);
  ctx.fillStyle = "#FAEBD7";
  ctx.fill()
}

function basketBall(){
  ctx.beginPath();
  ctx.moveTo(400, 530);
  ctx.arc(400, 530, 140, 0, Math.PI*2);
  ctx.fillStyle="orange";
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(200, 400);
  ctx.quadraticCurveTo(480, 550, 200, 750);
  ctx.moveTo(550, 450);
  ctx.quadraticCurveTo(380, 550, 550, 750);
  ctx.lineWidth=5;
  ctx.strokeStyle="white";
  ctx.stroke();
}

function changeFace(){
  ctx.beginPath();
  ctx.moveTo(340, 250);
  ctx.arc(340, 250, 50, 0, Math.PI*1);
  ctx.moveTo(520, 250);
  ctx.arc(520, 250, 50, 0, Math.PI*1);
  ctx.fillStyle ="#FAEBD7";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(360, 280);
  ctx.quadraticCurveTo(340, 270, 310, 260);
  ctx.moveTo(480, 280);
  ctx.quadraticCurveTo(500, 270, 530, 263);
  ctx.lineWidth = 3;
  ctx.strokeStyle="black";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 370);
  ctx.lineTo(450, 370);
  ctx.strokeStyle="#FAEBD7";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(400, 370);
  ctx.quadraticCurveTo(420, 368, 460, 350);
  ctx.strokeStyle="black";
  ctx.stroke();

}

setTimeout(drawEyes, 1000);
setTimeout(drawEyeBrows, 1000);
setTimeout(drawHair, 2000);
setTimeout(drawEars, 2000);
setTimeout(basketBall, 3000);
setTimeout(changeFace, 3500);
