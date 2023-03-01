const saveBtn = document.querySelector("#save");

function onSaveBtn(){
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href=url;
  a.download = "Timetable.png";
  a.click();
}

saveBtn.addEventListener("click", onSaveBtn)