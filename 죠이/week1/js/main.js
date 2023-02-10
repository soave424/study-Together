const canvas = document.querySelector("canvas");

//렌더링 컨텍스트
//context는 Paint brush  자주 쓰니 ctx로 줄임.
//context의 종류 strokeRect, fillRect, beginPath, moveTo, lineTo, closePath
//strokeRect은 선만 보이고 fillRect은 단색으로 모양을 다 채움.
//좌상단 (0,0)

//2d 소문자
const ctx = canvas.getContext("2d");

//이미지의 퀄리티를 높이기 위해서 css+js에도 크기 설정
//CSS sets the size of the UI the user will see.The width and height on JS is the resolution of the canvas.
canvas.width = 800;
canvas.height = 800;

//사각형 안을 채워보자 (4개 요소 필요, x, y, w, h)
// ctx.fillRect(50, 50, 1, 1);
// ctx.fillRect(100, 100, 10, 10);
// ctx.fillRect(150, 150, 50, 50);
// ctx.fillRect(200, 200, 100, 100);
// ctx.fillRect(250, 250, 500, 500);

//선을 만든 뒤(rect) fill과 stroke 선택
// ctx.rect(50, 50, 100, 100);
// ctx.fill();

//색깔 변경
// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "red";
// setTimeout(() => {
//   ctx.fill();
// }, 5000);

//이제부터 2개의 함수를 활용해서 만들기 : moveTo, lineTo
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();
// setTimeout(() => {
//   ctx.fill();
// }, 5000);

//집 만들기
ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 2;
// ctx.strokeRect(300,300,50,100);
ctx.fillRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 20);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();

//사람 만들기
ctx.beginPath();
ctx.fillRect(510 - 40, 200 - 30, 15, 100);
ctx.fillRect(650 - 40, 200 - 30, 15, 100);
ctx.fillRect(560 - 40, 200 - 30, 60, 200);

ctx.arc(550, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(560 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(520 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.fill();
