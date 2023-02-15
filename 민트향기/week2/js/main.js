const lineWidth = document.getElementById("line-width")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.linewidth = lineWidth.value;

let isPainting = false;

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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);