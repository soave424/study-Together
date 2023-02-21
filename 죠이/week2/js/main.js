const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//클릭하여 선을 그리기
//PointerEvent : offsetX,offsetY 가 좌표 의미

// ctx.lineWidth = 2;
//moveTo없으면 처음에 2번 눌러야 함.
// ctx.moveTo(0,0);

//굵기 지정 불러오기
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.ariaValueMax;

//색 지정 불러오기
const colorPick = document.getElementById("color-pick");

//색 옵션 불러오기
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

//https://flatuicolors.com/
const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
  "#18dcff",
  "#7d5fff",
];

function onClick(event) {
  //같은 path에 있으면 선 색깔이 같음.
  ctx.beginPath();
  ctx.moveTo(0, 0);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
// canvas.addEventListener("click", onClick);

//마우스 움직일때 마다 그리기
// canvas.addEventListener("mousemove", onClick);

//2.1 mouse 움직이면서 만들기
let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  // ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);

//canvas 밖으로 나간 경우 mouseup과 같은 기능 실행되도록
canvas.addEventListener("mouseleave", cancelPainting);

//2.2 선의 굵기 변경하기
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

lineWidth.addEventListener("change", onLineWidthChange);

//2.3 색 변경하기
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

//2.4 컬러 옵션으로 색 변경하기
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  colorPick.value = colorValue;
}

colorPick.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

//2.5 filling Mode
const modeBtn = document.getElementById("mode-btn");
let isFilling = false;

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

canvas.addEventListener("click", onCanvasClick);
modeBtn.addEventListener("click", onModeClick);

//2.6 Eraser
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

ctx.fillRect(400, 400, 150, 150); // 기본 설정으로 사각형을 그리기
ctx.save(); // 기본 상태를 저장하기

ctx.fillStyle = "#09F"; // 설정 변경하기
ctx.fillRect(415, 415, 120, 120); // 새로운 설정으로 사각형 그리기

ctx.save(); // 현재 상태 저장하기
ctx.fillStyle = "#FFF"; // 설정 변경하기
ctx.globalAlpha = 0.5;
ctx.fillRect(430, 430, 90, 90); // 새로운 설정으로 사각형 그리기

ctx.restore(); // 이전 상태 복원하기
ctx.globalAlpha = 0.5;
ctx.fillRect(445, 445, 60, 60); // 복원된 설정으로 사각형 그리기

ctx.restore(); // 초기 상태를 복원하기
ctx.fillRect(460, 460, 30, 30); // 복원된 설정으로 사각형 그리기

function draw() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = "rgb(" + 51 * i + ", " + (255 - 51 * i) + ", 255)";
      ctx.rotate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(400, 400, 25, 25);
      ctx.restore();
    }
  }
}

draw();
