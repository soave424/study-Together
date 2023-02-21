let canvas, ctx;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const RADIUS = CANVAS_HEIGHT / 2;
let clockInterval;
const realtime = document.getElementById('realtime');

const hourvalueview = document.getElementById('hourvalueview');
const minvalueview = document.getElementById('minvalueview');
const secvalueview = document.getElementById('secvalueview');
const hourhandview = document.getElementById('hourhandview');
const minhandview = document.getElementById('minhandview');
const sechandview = document.getElementById('sechandview');

let bool_hourvalueview = true;
let bool_minvalueview = true;
let bool_secvalueview = true;
let bool_hourhandview = true;
let bool_minhandview = true;
let bool_sechandview = true;


init();
//digitalTime();

function init () {
  canvas = document.getElementById('clock');
  ctx = canvas.getContext("2d");
  ctx.lineCap = 'round';
  
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  
  ctx.font = `${RADIUS * 0.12}px arial`;
  //ctx.font = RADIUS * 0.15 + "px arial";  //위 아래 내용은 동일한 내용임.
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  clockInterval = setInterval( function () {
    drawClock();
    digitalTime();
  }, 10);
}

function drawClock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame();
  if (bool_hourvalueview) drawNumbers2();
  if (bool_minvalueview) drawNumbers_min();
  if (bool_secvalueview) drawNumbers_sec();
  //console.log(bool_secvalueview);
  nowtime();

  //requestAnimationFrame(drawClock);
}

let secondsDegrees;
let minutesDegrees;
let hoursDegrees;

function nowtime() {
  // get current time
  let currentTime = new Date();
  let seconds = currentTime.getSeconds();
  let minutes = currentTime.getMinutes();
  let hours = currentTime.getHours();

  // determine the degree of angle in which each clock hand is there
  secondsDegrees = (seconds - 15) * 6;
  minutesDegrees = ((minutes - 15) * 6);
  hoursDegrees = (hours - 3 + minutes / 60) * 30;
  
  if (bool_hourhandview) hourhand();
  if (bool_minhandview) minhand();
  if (bool_sechandview) sechand();

  // fill center with dark black color
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
  ctx.translate(-RADIUS, -RADIUS);
}

function hourhand() {
    // hour hand
    ctx.beginPath();    
    ctx.moveTo(0, 0);
    ctx.lineWidth = 9;    
    ctx.strokeStyle = "green";  
    drawHand(ctx, hoursDegrees, RADIUS * 0.67); // hour hand is 0.6 times of radius
    ctx.stroke();
    ctx.closePath();
}

function minhand() {
  //분침 보정
  let addminutesDegrees = (secondsDegrees + 90) /60;
  minutesDegrees = minutesDegrees + addminutesDegrees;
  // minute hand
  ctx.beginPath();    
  ctx.moveTo(0, 0);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 6;  
  drawHand(ctx, minutesDegrees, RADIUS * 0.73); // minute hand is 0.85 times of radius
  ctx.stroke();
  ctx.closePath();
}

function sechand() {
// second hand
  ctx.beginPath();  
  ctx.moveTo(0, 0);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  drawHand(ctx, secondsDegrees, RADIUS * 0.80); // second hand is 0.75 times of radius
  ctx.stroke();
  ctx.closePath();
}

function drawHand(ctx, angleInDegrees, r) {
  let a = r * Math.cos(angleInDegrees * Math.PI / 180);
  let b = r * Math.sin(angleInDegrees * Math.PI / 180);
  ctx.lineTo(a, b);
}


function drawNumbers() {
  var ang;
  var num;
  ctx.font = radius * 0.9 * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "#333";
  for (num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.9 * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.9 * 0.85);
    ctx.rotate(-ang);
  }
}

function drawNumbers2() {
  ctx.beginPath();
  ctx.font = `${RADIUS * 0.12}px arial`;
  ctx.fillStyle = "#000";
  for (let num = 1; num <= 12; num++) {
    let x = RADIUS * 0.9 * 0.84 * Math.cos(((num * 30 - 90) * Math.PI) / 180);
    let y = RADIUS * 0.9 * 0.84 * Math.sin(((num * 30 - 90) * Math.PI) / 180);
    ctx.fillText(num, x, y);
  }
}

function drawNumbers_min() {
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.font = `${RADIUS * 0.08}px arial`;
  for (let num = 1; num <= 12; num++) {
    let x = RADIUS * 0.9 * 0.70 * Math.cos(((num * 30 - 90) * Math.PI) / 180);
    let y = RADIUS * 0.9 * 0.70 * Math.sin(((num * 30 - 90) * Math.PI) / 180);
    ctx.fillText(num*5, x, y);
  }
}

function drawNumbers_sec() {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.font = `${RADIUS * 0.05}px arial`;
  for (let num = 1; num <= 60; num++) {
    let x = RADIUS * 0.9 * 1.08 * Math.cos(((num * 30 - 90) * Math.PI) / (180*5));
    let y = RADIUS * 0.9 * 1.08 * Math.sin(((num * 30 - 90) * Math.PI) / (180*5));
    let num2;
    if ((num+12) > 60) 
      num2 = num+12-60;
    else 
      num2 = num+12;
    ctx.fillText(num2, x, y);
  }
}

function drawFrame() {
  ctx.translate(RADIUS, RADIUS);
  ctx.beginPath();
  ctx.arc(0, 0, RADIUS * 0.9, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  
  var grad = ctx.createRadialGradient(0,0,RADIUS * 0.9 * 0.97,0,0,RADIUS * 0.9 * 1.03);
  grad.addColorStop(0, "#aa0");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = RADIUS * 0.07;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, RADIUS * 0.03, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();

  for (let num = 1; num <= 60; num++) {
    let linesize;
    if (num % 5 === 0) {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      linesize = 0.83;
    }
    else {
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      linesize = 0.85;
    }

    let x1 = RADIUS * linesize* Math.cos(((num * 6 - 90) * Math.PI) / 180);
    let y1 = RADIUS * linesize* Math.sin(((num * 6 - 90) * Math.PI) / 180);
    let x2 = RADIUS * 0.87 * Math.cos(((num * 6 - 90) * Math.PI) / 180);
    let y2 = RADIUS * 0.87 * Math.sin(((num * 6 - 90) * Math.PI) / 180);
    //ctx.beginPath();    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    //ctx.closePath();
  }
}

realtime.addEventListener("change", function() {
  if (realtime.checked) {
    clockInterval = setInterval( function () {
      drawClock();
      digitalTime();
    }, 10);
  } else {
      clearInterval(clockInterval);
  }
});

function digitalTime() {
  var dateInfo = new Date();

  /* time */
  var hr,
    _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
    sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
    ampm = (dateInfo.getHours() >= 12) ? "오후" : "오전";

  // replace 0 with 12 at midnight, subtract 12 from hour if 13–23
  if (dateInfo.getHours() == 0) {
    hr = 12;
  } else if (dateInfo.getHours() > 12) {
    hr = dateInfo.getHours() - 12;
  } else {
    hr = dateInfo.getHours();
  }
// Add to time format

  var currentTime = "<font color=green>" + zeroPadding(hr) + "</font></font>:<font color=blue>" + _min + "</font>:<font color=red>" + sec + "</font>";

  // AM/ PM options 

  document.getElementsByClassName("hms")[0].innerHTML = currentTime;
  document.getElementsByClassName("ampm")[0].innerHTML = ampm;
}

function zeroPadding(num) {
  var zero = '';
  if (num < 10)   zero += '0';
  return (zero + num);
}  


realtime.addEventListener("change", function() {
  if (realtime.checked) {
    clockInterval = setInterval( function () {
      drawClock();
      digitalTime();
    }, 10);
  } else {
      clearInterval(clockInterval);
  }
});

hourvalueview.addEventListener("change", function() {
  if (this.checked) bool_hourvalueview = true;
  else bool_hourvalueview = false;
  
  drawClock();
  digitalTime();
});

minvalueview.addEventListener("change", function() {
  if (this.checked) bool_minvalueview = true;
  else bool_minvalueview = false;

  drawClock();
  digitalTime();
});

secvalueview.addEventListener("change", function() {
  if (this.checked) bool_secvalueview = true;
  else bool_secvalueview = false;

  drawClock();
  digitalTime();
});

hourhandview.addEventListener("change", function() {
  if (this.checked) bool_hourhandview = true;
  else bool_hourhandview = false;

  drawClock();
  digitalTime();
});

minhandview.addEventListener("change", function() {
  if (this.checked) bool_minhandview = true;
  else bool_minhandview = false;

  drawClock();
  digitalTime();
});

sechandview.addEventListener("change", function() {
  if (this.checked) bool_sechandview = true;
  else bool_sechandview = false;

  drawClock();
  digitalTime();
});

