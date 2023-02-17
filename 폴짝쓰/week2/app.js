const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidthRange = document.querySelector("#linewidth");
const colorBoard = document.querySelector("#colorboard");
const colorPalette = Array.from(document.querySelectorAll(".color-palette"));
const saveBtn = document.querySelector("#colorsave");
let newcolor;
let savedColor;
let save=false;

canvas.width = 800;
canvas.height = 800;

function onChangeRange(event){
  ctx.lineWidth = event.target.value;
}

function onColorChange(event){
  newcolor = event.target.value;
}

function onPaletteClick(event){
  event.target.style.backgroundColor = newcolor;
}


function onSaveBtn(event){
  event.preventDefault();
  if(save){
    savedColor = "";
    save=false;
    colorBoard.addEventListener("change", onColorChange);
    colorPalette.forEach(color => color.removeEventListener("click", 
    (event)=> console.log(event.target.style.backgroundColor), ctx.fillStyle=newcolor));
    colorPalette.forEach(color => colorPalette.forEach(color => color.addEventListener("click", onPaletteClick)));
    saveBtn.innerText = "colorsave";
    circleBtn.classList.add("none");
    triangleBtn.classList.add("none");
    circle = false;
    triangle = false;
  }else{
    save=true;
    colorBoard.removeEventListener("change", onColorChange);
    colorPalette.forEach(color => color.removeEventListener("click", onPaletteClick));
    colorPalette.forEach(color => color.addEventListener("click", 
    (event)=> savedColor = event.target.style.backgroundColor, ctx.fillStyle=savedColor));
    saveBtn.innerText = "colorchange";
    circleBtn.classList.remove("none");
    triangleBtn.classList.remove("none");
    circleBtn.addEventListener("click", () => circle=true);
    circleBtn.addEventListener("click", () => triangle=false);
    circleBtn.addEventListener("click", ()=> canvas.addEventListener("click", drawCircle));
    triangleBtn.addEventListener("click", () => triangle=true);
    triangleBtn.addEventListener("click", () => circle=false);
    triangleBtn.addEventListener("click", ()=> canvas.addEventListener("click", drawTriangle));
  }
}

lineWidthRange.addEventListener("change", onChangeRange);
colorBoard.addEventListener("change", onColorChange);
colorPalette.forEach(color => color.addEventListener("click", onPaletteClick));
saveBtn.addEventListener("click", onSaveBtn);

