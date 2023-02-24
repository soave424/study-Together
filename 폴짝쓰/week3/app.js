//시간표 외형 그리기

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colors = ['#f7cac9', '#f18973', '#d9ecd0', ' #eca1a6', '#b1cbbb'];
const dates = ['월', '화', '수', '목', '금'];
canvas.width = 800;
canvas.height=750;

ctx.lineWidth = 2;

for(i=0;i<5;i++){
  ctx.beginPath();
  ctx.moveTo(155+(120*i), 50);
  ctx.arc(155+(120*i), 50, 40, 0, Math.PI*2);
  ctx.fillStyle = colors[i];
  ctx.fill();
  ctx.font = '27px serif';
  ctx.fillStyle = "white";
  ctx.fillText(dates[i], 140+(120*i), 55);
}

ctx.beginPath();
ctx.strokeStyle = "#96897f";
ctx.strokeRect(100, 100, 600, 600);

for(i=1;i<5;i++){
  ctx.moveTo(100+(120*i), 100);
  ctx.lineTo(100+(120*i), 700);
  ctx.stroke();
}

for(i=1;i<6;i++){
  ctx.moveTo(100, 100+(100*i));
  ctx.strokeRect(100, 100+(100*i), 600, 100);
}
