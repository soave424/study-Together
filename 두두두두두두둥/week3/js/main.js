const saveBtn = document.getElementById("save");
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

saveBtn.addEventListener("click", (e) => {
  let x = e.pageX - e.target.offsetLeft;
  let y = e.pageY - e.target.offsetTop;
  let ripples = document.createElement("span");
  let color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  ripples.style.borderColor = color;
  saveBtn.appendChild(ripples);
  setTimeout(() => {
    ripples.remove();
  }, 2000);
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myImage.png";
  a.click();
});
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
// ????????? ????????? ??? ??????
canvas.addEventListener("mousedown", () => {
  drawStatus = true;
});

// ????????? ????????? ????????? ??? ??? ?????????
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

// ????????? ??? ?????? ??????
canvas.addEventListener("mouseup", drawCancel);

// ????????? ????????? ????????? ??? ??????
canvas.addEventListener("mouseleave", drawCancel);

// ??? ?????? ?????? ??????
lineWidth.addEventListener("change", (e) => {
  const value = parseInt(e.target.value);
  ctx.lineWidth = value;
});

// ??? ?????? ??????
color.addEventListener("change", (e) => {
  console.log(typeof e.target.value);
  ctx.strokeStyle = e.target.value;
});

// ?????????
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

// ??? ??????
clear.addEventListener("click", () => {
  ctx.fillRect(0, 0, 800, 800);
  ctx.fillStyle = "white";
});
