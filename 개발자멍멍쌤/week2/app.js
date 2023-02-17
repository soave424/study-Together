const imgLoadButton = document.getElementById('file2');
const imgButton = document.getElementById('img-button');
const fontName = document.getElementsByName('fontname');
const fontSize = document.getElementById('fontsize');
const fontSizeText = document.getElementById('font-size-text');
const lineWidthText = document.getElementById('line-width-text');

const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let isbrush = true;

function onMove(event) {
  //console.log(isPainting,isbrush);
  if (isPainting) {
    if (isbrush) {
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      return;
    } else {
      ctx.drawImage(imgElement,event.offsetX, event.offsetY);
    }
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  // ctx.fill();
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  isbrush = true;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🎨채우기";
  } else {
    isFilling = true;
    modeBtn.innerText = "🧨그리기";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "🎨채우기";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  let font_size = fontSize.value + 'px';
  let font_name;
  for (var i=0; i<fontName.length; i++) {
    if (fontName[i].checked == true) {
      font_name = fontName[i].value;
    }
  }
  //console.log(font_name);
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${font_size} ${font_name}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
fontSize.addEventListener("input", onFontSize);
lineWidth.addEventListener("change", onLineWidth);
imgButton.addEventListener("click", onImgButton);
imgLoadButton.addEventListener("change", onImgLoadButton);

const imgElement = new Image();
imgElement.src = "./on2.png";

function onImgLoadButton(event) {
  const file2 = event.target.files[0];
  const url = URL.createObjectURL(file2);
  //const image = new Image();
  imgElement.src = url;
  imgElement.onload = function () {
    imgButton.style.backgroundSize = '100%';
    imgButton.style.backgroundImage = 'url(' + imgElement.src + ')';
  };
}

function onImgButton() {
  isbrush = false;
  //console.log(isbrush);
}

function onFontSize(e) {
  //console.log(e.target.value);
  //fontSizeText.innerText = e.target.value;
  fontSizeText.value = e.target.value;
}

function onLineWidth(e) {
  //console.log(e.target.value);
  lineWidthText.value = e.target.value;
}

