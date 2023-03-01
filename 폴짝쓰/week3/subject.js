//과목 추가하기
// import { deleteSubject } from "./deletesubject.js";

const newBtnsDiv = document.querySelector("#newBtns");
let subjectInput = document.querySelector("#subjectInput");
//const subjectBtn = document.querySelector("#createSubject");
const savedSubjects = localStorage.getItem("subject");
let lsSubjects = [];
let text = "";

if(savedSubjects){
  const parseSubject = JSON.parse(savedSubjects);
  lsSubjects = parseSubject;
  parseSubject.forEach(paintSubjects);
}

function paintSubjects(newSubjectobj){
  const newSubjectBtn = document.createElement("button");
  newSubjectBtn.setAttribute("draggable", true);
  newSubjectBtn.innerText = newSubjectobj.text;
  newBtnsDiv.appendChild(newSubjectBtn);

  const newButtons = newBtnsDiv.querySelectorAll("button"); 
  const array = Array.from(newButtons);
  array.forEach(item => item.addEventListener("click", changeText));

}

function changeText(event){
  text=event.target.innerText;
}

function makeSubjects(event){
  const newSubject = subjectInput.value;
  const newSubjectobj = {
    id: Date.now(),
    text: newSubject
  };
  subjectInput.value ="";
  lsSubjects.push(newSubjectobj);
  localStorage.setItem("subject", JSON.stringify(lsSubjects));
  paintSubjects(newSubjectobj); 
}

subjectInput.addEventListener("change", makeSubjects);
