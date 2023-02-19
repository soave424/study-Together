const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//굵기 지정 불러오기
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.ariaValueMax;

//색 지정 불러오기
const colorPick = document.getElementById("color-pick");

//색 옵션 불러오기
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

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
