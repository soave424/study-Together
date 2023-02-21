const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = Array.from(document.querySelectorAll('.color-option'));
const modeBtn = document.querySelector('#mode-btn');
const destoryBtn = document.querySelector('#destory-btn');
const eraseBtn = document.querySelector('#eraser-btn');
const fileInput = document.querySelector('#file');
const textInput = document.querySelector('#text');
const saveBtn = document.querySelector('#save');
const lineWidthNum = document.querySelector('#line-width-num');
const fontValue = document.querySelector('.font');
const figureBtn = document.querySelectorAll('.figure');

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;

function onMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function onMousedown() {
  isPainting = true;
}
function onMouseup() {
  isPainting = false;
  figureMode = undefined;
  ctx.beginPath();
}
function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
  lineWidthNum.innerText = lineWidth.value;
}
function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
  changeCursor();
}
function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  // console.dir(e.target.style.backgroundColor);
  ctx.strokeStyle = e.target.style.backgroundColor; //dataset 을 사용해야하나? 그냥 css 정보 불러와도 되는데..
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  changeCursor();
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
    changeCursor();
  } else {
    isFilling = true;
    modeBtn.innerText = 'Draw';
    changeCursor();
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onDestoryClick() {
  const question = confirm('Are you sure?');
  if (question == true) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function changeCursor() {
  if (isFilling) {
    canvas.classList.replace('eraser', 'fill');
    canvas.classList.replace('brush', 'fill');
  } else if (color.value == '#ffffff') {
    canvas.classList.replace('brush', 'eraser');
    canvas.classList.replace('fill', 'eraser');
  } else {
    canvas.classList.replace('eraser', 'brush');
    canvas.classList.replace('fill', 'brush');
  }
}
function onEraseClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'Fill';
  color.value = '#ffffff';
  changeCursor();
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  console.log(event.target);
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  const fontSize = fontValue.querySelector('input').value;
  const fontType = fontValue.querySelectorAll('select')[0].value;
  const drawType = fontValue.querySelectorAll('select')[1].value;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${fontSize}px ${fontType}`;
    if (drawType == 'stroke') {
      ctx.strokeText(text, event.offsetX, event.offsetY);
    } else {
      ctx.fillText(text, event.offsetX, event.offsetY);
    }
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
}
function onRectClick() {
  figureMode = rect;
}
function onCircleClick() {
  figureMode = circle;
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMousedown);
canvas.addEventListener('mouseup', onMouseup);
canvas.addEventListener('mouseleave', onMouseup);
canvas.addEventListener('click', onCanvasClick);
lineWidth.addEventListener('change', onLineWidthChange);

color.addEventListener('change', onColorChange);

colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
destoryBtn.addEventListener('click', onDestoryClick);
eraseBtn.addEventListener('click', onEraseClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
