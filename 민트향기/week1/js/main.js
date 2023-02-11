const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(25, 25, 50, 50);


// 좌표 실시간 측정 위해 만듦.
function canvasXY(e){
    const canvasXY = document.querySelector('#canvasXY');
    canvasXY.innerText = `(${e.offsetX}, ${e.offsetY})`;
}
canvas.addEventListener('mousemove',canvasXY)
