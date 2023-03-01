const trashcan = document.querySelector(".trashcan");
let dragged;

document.addEventListener("dragstart", (event) => 
// drag할 때 투명도 적용
{dragged=event.target; 
event.target.classList.add("dragging");}
)

document.addEventListener("dragend", event => {
  // 투명도 초기화
  event.target.classList.remove("dragging");
});

document.addEventListener("dragover", event => {
  // 드롭을 허용하기 위해 기본 동작 취소
  event.preventDefault();
}, false);

document.addEventListener("dragenter", event => {
  // 드래그 가능한 요소가 대상 위로 오면 강조
  if (event.target.classList.contains("trashcan")) {
    event.target.classList.add("dragover");
  }
});

document.addEventListener("dragleave", event => {
  // 드래그 가능한 요소가 대상 밖으로 나가면 강조 제거
  if (event.target.classList.contains("trashcan")) {
    event.target.classList.remove("dragover");
  }
});

document.addEventListener("drop", event => {
  // 일부 요소의 링크 열기와 같은 기본 동작 취소
  event.preventDefault();
  // 드래그한 요소를 선택한 드롭 대상으로 이동
  if (event.target.classList.contains("trashcan")) {
    event.target.classList.remove("dragover");
    lsSubjects = lsSubjects.filter((item)=>item.text != dragged.innerText);
    localStorage.setItem("subject", JSON.stringify(lsSubjects));
    dragged.parentNode.removeChild(dragged);
  }
});