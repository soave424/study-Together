// 1. 이미지 추가 기능
// 2. 텍스트 추가 기능
// 3. 이미지 저장 기능

const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
let drawStatus = false;
const lineWidth = document.getElementById("lineWidth");
const color = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("colorOption"));
const colorOptionList = [];
const eraser = document.getElementById("eraser");
let colorFixer = false;
const clear = document.getElementById("clear");
const btn = document.querySelectorAll("button");

canvas.addEventListener("dblclick", (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillText(text, x, y);
    ctx.restore();
  }
});
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  console.log(url);
  const image = document.createElement("img");
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 800, 800);
    fileInput.value = null;
  };
});

clear.addEventListener("click", (e) => {
  let x = e.pageX - e.target.offsetLeft;
  let y = e.pageY - e.target.offsetTop;
  let ripples = document.createElement("span");
  let color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  ripples.style.borderColor = color;
  clear.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 2000);
});

for (i = 0; i < colorOption.length; i++) {
  colorOptionList.push(colorOption[i].dataset.color);
}

function drawCancel() {
  drawStatus = false;
}
// 마우스 눌렀을 때 감지
canvas.addEventListener("mousedown", () => {
  drawStatus = true;
});

// 마우스 누르고 이동할 때 선 그리기
canvas.addEventListener("mousemove", (e) => {
  if (drawStatus) {
    ctx.lineTo(e.offsetX, e.offsetY);

    ctx.stroke();
    return;
  }
  ctx.beginPath();
  if (colorFixer === false) {
    ctx.strokeStyle =
      colorOptionList[Math.floor(Math.random() * colorOptionList.length)];
  }
  ctx.moveTo(e.offsetX, e.offsetY);
});

// 마우스 손 뗄때 감지
canvas.addEventListener("mouseup", drawCancel);

// 캔버스 밖으로 나갔을 때 감지
canvas.addEventListener("mouseleave", drawCancel);

// 선 굵기 두께 변경
lineWidth.addEventListener("change", (e) => {
  const value = parseInt(e.target.value);
  ctx.lineWidth = value;
});

// 선 색깔 변경
color.addEventListener("change", (e) => {
  console.log(typeof e.target.value);
  ctx.strokeStyle = e.target.value;
});

// 지우개
eraser.addEventListener("click", (e) => {
  if (colorFixer === false) {
    e.target.innerText = "Draw";
    colorFixer = true;
    ctx.lineWidth = 30;
    ctx.strokeStyle = "white";
  } else {
    colorFixer = false;
    ctx.lineWidth = parseInt(lineWidth.value);
    e.target.innerText = "Eraser";
  }
  let x = e.pageX - e.target.offsetLeft;
  let y = e.pageY - e.target.offsetTop;
  let ripples = document.createElement("span");
  let color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  ripples.style.borderColor = color;
  eraser.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 2000);
});

// 다 지워
clear.addEventListener("click", () => {
  ctx.fillRect(0, 0, 800, 800);
  ctx.fillStyle = "white";
});
