const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const resetBtn = document.getElementById("reset");

function onResetClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

ctx.lineWidth = 2;
ctx.strokeStyle = "black";
//바닥
ctx.moveTo(0, 150);
ctx.lineTo(100, 150);

//기둥
ctx.moveTo(50, 150);
ctx.lineTo(50, 50);
//꼭대기
ctx.moveTo(50, 60);
ctx.lineTo(100, 60);
//줄
ctx.moveTo(80, 60);
ctx.lineTo(80, 80);
ctx.save(); // 현재 상태 저장하기

//머리
ctx.restore(); // 이전 상태 복원하기
ctx.arc(80, 80, 10, 0, 2 * Math.PI, false);
// arc(x, y, 반지름, 시작각도, 끝각도(radian), true 또는 false (반시계방향: true, 시계방향 : false(기본값))

//몸통
//팔1
//팔2
//다리1
//다리2

ctx.stroke();

resetBtn.addEventListener("click", onResetClick);
