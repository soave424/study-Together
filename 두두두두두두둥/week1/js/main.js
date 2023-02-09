const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.arc(400, 200, 40, 0, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();
