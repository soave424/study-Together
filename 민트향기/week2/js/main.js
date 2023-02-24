const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const earaserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const color = document.getElementById('color');
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.linewidth = lineWidth.value;

let isPainting = false;
let isFilling = false;

//flatuicolors.com
const colors = [
	"#1abc9c",
	"#2ecc71",
	"#3498db",
	"#9b59b6",
	"#16a085",
	"#f1c40f",
	"#f39c12",
];

function onMove(e) {
	if (isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
	ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
}

function onLineWidthChange(e) {
	ctx.lineWidth = e.target.value;
}

function onColorClick(e){
	const colorValue = e.target.dataset.color
	ctx.strokeStyle = colorValue;
	ctx.fillStyle = colorValue;
	color.value =  colorValue;

}

function onModeClick(){
	if (isFilling) {
		isFilling = false
		modeBtn.innerText = "Fill"
	} else {
		isFilling = true
		modeBtn.innerText = "Draw"
	}
}
function onChangeColor(e) {
	ctx.strokeStyle = e.target.value;
	ctx.fillStyle = e.target.value;
}

function onCanvasClick() {
	if(isFilling) {
		ctx.fillRect(0, 0, 800, 800);
	}
}

function onDestroyClick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 800);
}

function onEraserClick(){
 	ctx.strokeStyle = "white";
 	isFilling = false;
 	modeBtn.innerText = "Fill"
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onChangeColor);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
earaserBtn.addEventListener("click", onEraserClick);