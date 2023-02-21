const resetBtn = document.querySelector("#reset");

function onClickReset(event){
  event.preventDefault();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}

resetBtn.addEventListener("click", onClickReset);