const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const RADIUS = CANVAS_HEIGHT / 2;

let canvas, ctx;
let clockInterval;
let secondsDegrees,minutesDegrees,hoursDegrees;
let currentTime,seconds,minutes,hours,millisec;
let bool_realtime = true;
let bool_hourvalueview = true;
let bool_minvalueview = true;
let bool_secvalueview = true;
let bool_hourhandview = true;
let bool_minhandview = true;
let bool_sechandview = true;
let bool_hourhandview_bojo = true;
let bool_minhandview_bojo = true;
let bool_sechandview_bojo = true;
let bool_darkmode = true;
let bool_sunmoonmode = true;
let bool_continuemode = true;

const realtimecheck = document.getElementById('realtimecheck');
const hourvalueview = document.getElementById('hourvalueview');
const minvalueview = document.getElementById('minvalueview');
const secvalueview = document.getElementById('secvalueview');
const hourhandview = document.getElementById('hourhandview');
const minhandview = document.getElementById('minhandview');
const sechandview = document.getElementById('sechandview');
const hourhandview_bojo = document.getElementById('hourhandview_bojo');
const minhandview_bojo = document.getElementById('minhandview_bojo');
const sechandview_bojo = document.getElementById('sechandview_bojo');
const darkmode = document.getElementById('darkmode');
const sunmoonmode = document.getElementById('sunmoonmode');
const continuemode = document.getElementById('continuemode');
const hidedigital = document.getElementById('hidedigital');

const set_hours = Array.from(document.getElementsByClassName('hour'));
set_hours.forEach((set_hour) => set_hour.addEventListener('click', onSet_hour));
function onSet_hour(event) {
  //console.log(event.target.dataset.hour);
  hours = parseInt(event.target.dataset.hour);
  minutes = 0;
  seconds = 0;
  
  anal_digi_viewClock();
}

const set_minutes = Array.from(document.getElementsByClassName('minute'));
set_minutes.forEach((set_minute) => set_minute.addEventListener('click', onSet_minute));
function onSet_minute(event) {
  //console.log(event.target.dataset.min);
  minutes = parseInt(event.target.dataset.min);
  seconds = 0;
  
  anal_digi_viewClock();
}

const set_updowns = Array.from(document.getElementsByClassName('updown'));
set_updowns.forEach((set_updown) => set_updown.addEventListener('click', onSet_updown));
function onSet_updown(event) {
  //console.log("55:" + event.target.dataset.type + "-" + event.target.dataset.updown + "-" + event.target.dataset.interval);

  switch (event.target.dataset.type) {
    case "hour":
      if (event.target.dataset.updown==="up") 
        hours+=parseInt(event.target.dataset.interval);
      else
        hours-=parseInt(event.target.dataset.interval);
      break;
    case "min":
      if (event.target.dataset.updown==="up") 
        minutes+=parseInt(event.target.dataset.interval);
      else
        minutes-=parseInt(event.target.dataset.interval);
      break;
    case "sec":
      if (event.target.dataset.updown==="up") 
        seconds+=parseInt(event.target.dataset.interval);
      else
        seconds-=parseInt(event.target.dataset.interval);
      break;
  }

  anal_digi_viewClock();
}

init();

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
    anal_digi_viewClock();
  }, 10);
}

function anal_digi_viewClock() {
  viewClock();
  digitalTime();
}

function viewClock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  nowtime();
  backColorSet();

  drawFrame();
  if (bool_sunmoonmode) {
    backImageSet();
  }
  
  if (bool_hourvalueview) drawNumbers2();
  if (bool_minvalueview) drawNumbers_min();
  if (bool_secvalueview) drawNumbers_sec();
  //console.log(bool_secvalueview);
  drawClock();

  //requestAnimationFrame(drawClock);
}

function nowtime() {
  if (bool_realtime) {
    currentTime = new Date();
    seconds = currentTime.getSeconds();
    minutes = currentTime.getMinutes();
    hours = currentTime.getHours();
    millisec = currentTime.getMilliseconds();
    //초바늘 연속을 위해
    if (bool_continuemode) {
      let time2 = (function () {
        let midnight = new Date();
        midnight.setHours(0);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);
        return Date.now() - midnight.getTime();
      })();
      hours2 = time2 / (60 * 60 * 1000);
      minutes2 = hours2 * 60 % 60;
      seconds2 = minutes2 * 60 % 60;
    } else {
      seconds2 = seconds;
    }
  } else {
    if (seconds>=60) {
      seconds-=60;
      minutes+=1;
    }
    else if (seconds<0) {
      seconds+=60;
      minutes-=1;
    }

    if (minutes>=60) {
      minutes-=60;
      hours+=1;
    }
    else if (minutes<0) {
      minutes+=60;
      hours-=1;
    }

    if (hours>=24) hours-=24;
    else if (hours<0) hours+=24;

    seconds2 = seconds;
  }
}

function drawClock() {

  // determine the degree of angle in which each clock hand is there
  
  secondsDegrees = (seconds - 15) * 6;
  secondsDegrees2 = (seconds2 - 15) * 6;

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
    ctx.lineWidth = 10;    
    ctx.strokeStyle = "green";  
    drawHand(ctx, hoursDegrees, RADIUS * 0.67); // hour hand is 0.6 times of radius
    ctx.stroke();
    ctx.closePath();

  if (bool_hourhandview_bojo) {
    ctx.beginPath();    
    ctx.moveTo(0, 0);
    ctx.lineWidth = 2;    
    ctx.strokeStyle = "green";  
    drawHand(ctx, hoursDegrees, RADIUS * 0.9); // hour hand is 0.6 times of radius
    ctx.stroke();
    ctx.closePath();
  }
}



function minhand() {
  //분침 보정
  let addminutesDegrees = (secondsDegrees + 90) /60;
  minutesDegrees = minutesDegrees + addminutesDegrees;
  // minute hand
  ctx.beginPath();    
  ctx.moveTo(0, 0);
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 7;  
  drawHand(ctx, minutesDegrees, RADIUS * 0.73); // minute hand is 0.85 times of radius
  ctx.stroke();
  ctx.closePath();

  if (bool_minhandview_bojo) {
    ctx.beginPath();    
    ctx.moveTo(0, 0);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;  
    drawHand(ctx, minutesDegrees, RADIUS * 0.9); // minute hand is 0.85 times of radius
    ctx.stroke();
    ctx.closePath();
  }
}

function sechand() {
// second hand
  ctx.beginPath();  
  ctx.moveTo(0, 0);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  drawHand(ctx, secondsDegrees2, RADIUS * 0.80); // second hand is 0.75 times of radius
  ctx.stroke();
  ctx.closePath();

  if (bool_sechandview_bojo) {
    ctx.beginPath();  
    ctx.moveTo(0, 0);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    drawHand(ctx, secondsDegrees2, RADIUS * 0.9); // second hand is 0.75 times of radius
    ctx.stroke();
    ctx.closePath();
  }
}

function drawHand(ctx, angleInDegrees, r) {
  let a = r * Math.cos(angleInDegrees * Math.PI / 180);
  let b = r * Math.sin(angleInDegrees * Math.PI / 180);
  ctx.lineTo(a, b);
}


// function drawNumbers() {
//   var ang;
//   var num;
//   ctx.font = radius * 0.9 * 0.15 + "px arial";
//   ctx.textBaseline = "middle";
//   ctx.textAlign = "center";
//   ctx.fillStyle = "#333";
//   for (num = 1; num < 13; num++) {
//     ang = (num * Math.PI) / 6;
//     ctx.rotate(ang);
//     ctx.translate(0, -radius * 0.9 * 0.85);
//     ctx.rotate(-ang);
//     ctx.fillText(num.toString(), 0, 0);
//     ctx.rotate(ang);
//     ctx.translate(0, radius * 0.9 * 0.85);
//     ctx.rotate(-ang);
//   }
// }

function drawNumbers2() {
  ctx.beginPath();
  ctx.font = `${RADIUS * 0.12}px arial`;
  //ctx.fillStyle = "#000000";
  ctx.fillStyle = changecolor;
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
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(0, 0, RADIUS * 0.9, 0, 2 * Math.PI);
  ctx.fillStyle = "#444444"+backalphavalue.toString(16);
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
      //ctx.strokeStyle = "black";
      ctx.strokeStyle = changecolor;
      ctx.lineWidth = 5;
      linesize = 0.83;
    }
    else {
      ctx.beginPath();
      ctx.lineCap = 'round';
      //ctx.strokeStyle = "black";
      ctx.strokeStyle = changecolor;
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

function digitalTime() {

  //var dateInfo = new Date();
  /* time */
  //var hr,
  //  _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
  //  sec = (dateInfo.getSeconds() < 10) ? "0" + dateInfo.getSeconds() : dateInfo.getSeconds(),
  //  ampm = (dateInfo.getHours() >= 12) ? "오후" : "오전";

  if (hours == 0) {
    hr = 12;
  } else if (hours > 12) {
    hr = hours - 12;
  } else {
    hr = hours;
  }
  _min = minutes;
  sec = seconds;
  ampm = (hours >= 12) ? "오후" : "오전";
  
  document.getElementsByClassName("ampm")[0].style.color = changecolor;
  document.getElementsByClassName("millisec")[0].style.color = changecolor;
  dotcolor= changecolor;
  
  document.getElementsByClassName("digitalclock")[0].style.background = "#121212"+ backalphavalue.toString(16);

  var currentTime = "<font color=green>" + zeroPadding(hr) + "</font><font color="+dotcolor+">:</font><font color=blue>" + zeroPadding(_min) + "</font><font color="+dotcolor+">:</font><font color=red>" + zeroPadding(sec) + "</font>";
  document.getElementsByClassName("hms")[0].innerHTML = currentTime;
  document.getElementsByClassName("ampm")[0].innerHTML = ampm;

  if (bool_continuemode) {
    document.getElementsByClassName("millisec")[0].style.visibility = "";
    document.getElementsByClassName("millisec")[0].innerHTML = parseInt(millisec/100);
  } else {
    document.getElementsByClassName("millisec")[0].style.visibility = "hidden";
  }
}

var backalphavalue, changecolor, dotcolor;

function backColorSet() {
  if (bool_darkmode) {
    if (hours >= 20 || hours < 5) {         //밤
      backalphavalue = 14*16+14;
      changecolor = "#ffffff";
      //ctx.drawImage(imgElement,-0,-0);
    } else if (hours >= 8 && hours < 17) {  //낮
      backalphavalue = 2*16+2;
      changecolor = "#000000";
    } else if (hours >= 5 && hours < 8) {   // 밤->낮 
      backalphavalue = (14 - (hours-5)*4)*16+(14 - (hours-5)*4) - minutes;
      changecolor = "#ffffff";
    } else {                                // 낮->밤
      backalphavalue = ((hours-17)*4+2)*16+((hours-17)*4+2) + minutes;
      changecolor = "#000000";
    }
  } else {
    backalphavalue = 2*16+2;
    changecolor = "#000000";
  }
}  

const imgElement = new Image();
imgElement.src = "./mon.gif";
const imgElement2 = new Image();
imgElement2.src = "./sun.gif";

function backImageSet() {
  if (hours >= 20 || hours < 5) {         //밤
    ctx.drawImage(imgElement,-100,-160);
  } else if (hours >= 8 && hours < 17) {  //낮
    ctx.drawImage(imgElement2,-140,-150);
  } else if (hours >= 5 && hours < 8) {   // 밤->낮 
    if (hours === 5) ctx.drawImage(imgElement,-100,-160+((hours-5)*20+minutes));   //밤 
    if (hours === 7) ctx.drawImage(imgElement2,-140,-90-((hours-7)*20+minutes));  //낮
  } else {                                // 낮->밤
    if (hours === 19) ctx.drawImage(imgElement,-100,-100-((hours-19)*20+minutes));   //밤
    if (hours === 17) ctx.drawImage(imgElement2,-140,-150+((hours-17)*20+minutes));  //낮
  }
}  

function zeroPadding(num) {
  var zero = '';
  if (num < 10)   zero += '0';
  return (zero + num);
}  

realtimecheck.addEventListener("change", function() {
  if (this.checked) {
    clockInterval = setInterval( function () {
      viewClock();
      digitalTime();
    }, 10);
    bool_realtime = true;    
  } else {
    clearInterval(clockInterval);
    bool_realtime = false;
  }
});

hourvalueview.addEventListener("change", function() {
  if (this.checked) bool_hourvalueview = true;
  else bool_hourvalueview = false;
  
  anal_digi_viewClock();
});

minvalueview.addEventListener("change", function() {
  if (this.checked) bool_minvalueview = true;
  else bool_minvalueview = false;

  anal_digi_viewClock();
});

secvalueview.addEventListener("change", function() {
  if (this.checked) bool_secvalueview = true;
  else bool_secvalueview = false;

  anal_digi_viewClock();
});

hourhandview.addEventListener("change", function() {
  if (this.checked) bool_hourhandview = true;
  else bool_hourhandview = false;

  anal_digi_viewClock();
});

minhandview.addEventListener("change", function() {
  if (this.checked) bool_minhandview = true;
  else bool_minhandview = false;

  anal_digi_viewClock();
});

sechandview.addEventListener("change", function() {
  if (this.checked) bool_sechandview = true;
  else bool_sechandview = false;

  anal_digi_viewClock();
});

hourhandview_bojo.addEventListener("change", function() {
  if (this.checked) bool_hourhandview_bojo = true;
  else bool_hourhandview_bojo = false;

  anal_digi_viewClock();
});

minhandview_bojo.addEventListener("change", function() {
  if (this.checked) bool_minhandview_bojo = true;
  else bool_minhandview_bojo = false;

  anal_digi_viewClock();
});

sechandview_bojo.addEventListener("change", function() {
  if (this.checked) bool_sechandview_bojo = true;
  else bool_sechandview_bojo = false;

  anal_digi_viewClock();
});

sunmoonmode.addEventListener("change", function() {
  if (this.checked) bool_sunmoonmode = true;
  else bool_sunmoonmode = false;

  anal_digi_viewClock();
});

darkmode.addEventListener("change", function() {
  if (this.checked) bool_darkmode = true;
  else bool_darkmode = false;

  anal_digi_viewClock();
});

 
continuemode.addEventListener("change", function() {
  if (this.checked) bool_continuemode = true;
  else bool_continuemode = false;

  anal_digi_viewClock();
});

hidedigital.addEventListener("change", function() {
  if (this.checked) 
    document.getElementsByClassName("digitalclock")[0].style.visibility = "";
  else 
    document.getElementsByClassName("digitalclock")[0].style.visibility = "hidden";
});
