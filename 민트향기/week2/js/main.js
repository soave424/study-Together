const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.linewidth = 2;

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

function onClick(e) {
	ctx.beginPath();
    ctx.moveTo(0, 0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
}
canvas.addEventListener("mousemove", onClick);

// 좌표 실시간 표시.
function canvasXY(e) {
	const canvasXY = document.querySelector("#canvasXY");
	canvasXY.innerText = `(${e.offsetX}, ${e.offsetY})`;
	canvasXY.style.position = "fixed";
	canvasXY.style.zindex = "100";
}
canvas.addEventListener("mousemove", canvasXY);
