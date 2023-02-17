const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(25, 25, 50, 50);


// 좌표 실시간 측정 위해 만듦. 
// 나중에 재활용시 이것만 복붙하면 되게 CSS부분도 style속성으로 JS으로 구현 함.
function canvasXY(e){
    const canvasXY = document.querySelector('#canvasXY');
    canvasXY.innerText = `(${e.offsetX}, ${e.offsetY})`;
    canvasXY.style.position = "fixed";
    canvasXY.style.zindex = "100";
}
canvas.addEventListener('mousemove',canvasXY)
