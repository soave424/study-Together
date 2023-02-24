const CANVAS_WIDTH2 = 600;
const CANVAS_HEIGHT2 = 600;

let canvas2, ctx2, radius2, digitalcanvas; 
let sizevalue = 1;
let clock2Interval;
let bool_realtime2 = true;
let bool_hourvalueview2 = true;
let bool_minvalueview2 = true;
let bool_secvalueview2 = true;
let bool_hourhandview2 = true;
let bool_minhandview2 = true;
let bool_sechandview2 = true;
let bool_hourhandview2_bojo = true;
let bool_minhandview2_bojo = true;
let bool_sechandview2_bojo = true;


const realtimecheck2 = document.getElementById('realtimecheck');
const hourvalueview2 = document.getElementById('hourvalueview');
const minvalueview2 = document.getElementById('minvalueview');
const secvalueview2 = document.getElementById('secvalueview');
const hourhandview2 = document.getElementById('hourhandview');
const minhandview2 = document.getElementById('minhandview');
const sechandview2 = document.getElementById('sechandview');
const hourhandview2_bojo = document.getElementById('hourhandview_bojo');
const minhandview2_bojo = document.getElementById('minhandview_bojo');
const sechandview2_bojo = document.getElementById('sechandview_bojo');


const set_hours2 = Array.from(document.getElementsByClassName('hour'));
set_hours2.forEach((set_hour2) => set_hour2.addEventListener('click', onSet_hour2));
function onSet_hour2(event) {
  //console.log(event.target.dataset.hour);
  hours2 = event.target.dataset.hour;
  minutes2 = 0;
  seconds2 = 0;

  anal_digi_viewClock2();  
}

const set_minutes2 = Array.from(document.getElementsByClassName('minute'));
set_minutes2.forEach((set_minute2) => set_minute2.addEventListener('click', onSet_minute2));
function onSet_minute2(event) {
  //console.log(event.target.dataset.min);
  minutes2 = event.target.dataset.min;
  seconds2 = 0;

  anal_digi_viewClock2();  
}

const set_updowns2 = Array.from(document.getElementsByClassName('updown'));
set_updowns2.forEach((set_updown2) => set_updown2.addEventListener('click', onSet_updown2));
function onSet_updown2(event) {
  console.log(event.target.dataset.type + "-" + event.target.dataset.updown + "-" + event.target.dataset.interval);
}

init();

function init() {
    canvas2 = document.getElementById('clock2');
    canvas2.width = CANVAS_WIDTH2;
    canvas2.height = CANVAS_HEIGHT2;
    radius2 = canvas2.width /2 * 0.9;
    ctx2 = canvas2.getContext('2d');

    digitalcanvas = document.getElementById('digitalclock2');
    digitalcanvas.width = 600;
    digitalcanvas.height = 90;
    digitalctx = digitalcanvas.getContext('2d');
    

    clock2Interval = setInterval( function () {
      anal_digi_viewClock2();
    }, 10);
}

function anal_digi_viewClock2() {
  draw();
  digitalTime2();
}

let time2;

function nowtime2() {
  if (bool_realtime2) {
    time2 = (function () {
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
    minutes2 = Math.trunc(minutes2);
    hours2 = Math.trunc(hours2) + minutes2/60;
    seconds2 = Math.trunc(seconds2);
  }

}


function draw () {
  nowtime2();
   
  c = {x: canvas2.width / 2, y: canvas2.height / 2};

  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  ctx2.lineCap = 'round';
    
  clockdraw();
  if (bool_hourhandview2) hourHand();
  if (bool_minhandview2) minuteHand();    
  if (bool_sechandview2) secondHand();
  centerdot();

    //requestAnimationFrame(draw);

  function clockdraw() {
    border();
    if (bool_hourvalueview2) number();
    if (bool_minvalueview2) number_min();
    if (bool_secvalueview2) number_sec();
    dot();            
  }

    function border() {
        ctx2.beginPath();
        ctx2.arc(c.x, c.y, radius2, 0, Math.PI * 2);
        ctx2.fillStyle = "white";
        ctx2.fill();
        var grad2;
        grad2 = ctx2.createRadialGradient(c.x,c.y,radius2*0.97,c.x,c.y,radius2*1.03);
        grad2.addColorStop(0, "#aa0");
        grad2.addColorStop(0.5, "white");
        grad2.addColorStop(1, "#333");
        ctx2.strokeStyle = grad2;
        ctx2.lineWidth = radius2 * 0.07;
        ctx2.stroke();
    }

    function dot() {
        // Dashes
        for (let i = 0; i < 60; i++) {
            let r = radius2*(sizevalue-0.05);
            //let r = 135;
            let l = 5;
            ctx2.lineWidth = 3;
            ctx2.strokeStyle = 'rgba(0, 0, 0, 1';
            if (i % 5 === 0) {
                r -= l;
                l *= 2;
                ctx2.lineWidth = 5;
                ctx2.strokeStyle = 'rgba(0, 0, 0, 1';
            }                
            let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
            ctx2.beginPath();
            ctx2.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx2.stroke();
        }

    }

    function number() {
        //ctx2.font = RADIUS * 0.15 + "px arial";  //위 아래 내용은 동일한 내용임.
        ctx2.font = `${radius2 * 0.13}px arial`;
        ctx2.fillStyle = 'black';
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            let v = new Vector(radius2*(sizevalue-0.15), Math.PI * 2 * (i / 12) - Math.PI / 2);
            ctx2.fillText(i, v.getX() + c.x, v.getY() + c.y);
        }
    }

    function number_min() {
        //ctx2.font = RADIUS * 0.15 + "px arial";  //위 아래 내용은 동일한 내용임.
        ctx2.font = `${radius2 * 0.08}px arial`;
        ctx2.fillStyle = 'blue';
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            let v = new Vector(radius2*(sizevalue-0.28), Math.PI * 2 * (i / 12) - Math.PI / 2);
            ctx2.fillText(i*5, v.getX() + c.x, v.getY() + c.y);
        }
    }

    function number_sec() {
        //ctx2.font = RADIUS * 0.15 + "px arial";  //위 아래 내용은 동일한 내용임.
        ctx2.font = `${radius2 * 0.05}px arial`;
        ctx2.fillStyle = 'red';
        ctx2.textAlign = 'center';
        ctx2.textBaseline = 'middle';
        for (let i = 1; i <= 60; i++) {
            let v = new Vector(radius2*(sizevalue+0.08), Math.PI * 2 * (i / 60) - (Math.PI / 2));
            ctx2.fillText(i, v.getX() + c.x, v.getY() + c.y);
        }
    }

    function centerdot() {
        ctx2.beginPath();
        ctx2.arc(c.x, c.y, 6.75, 0, Math.PI * 2);
        ctx2.fillStyle = 'white';
        ctx2.strokeStyle = 'black';
        ctx2.lineWidth = 7;
        ctx2.fill();
        ctx2.stroke();        
    }

    function secondHand() {
      let a = Math.PI * 2 * (seconds2 / 60) - Math.PI / 2;
      let v = new Vector(radius2*(sizevalue-0.11), a);
      let v2 = new Vector(-20, a);
      let v3 = new Vector(radius2*(sizevalue), a);

      ctx2.lineWidth = 4;
      ctx2.strokeStyle = 'red';
      ctx2.beginPath();
      ctx2.moveTo(v2.getX() + c.x, v2.getY() + c.y);
      ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx2.stroke();

      if (bool_sechandview2_bojo) {
      ctx2.lineWidth = 2;
      ctx2.strokeStyle = 'red';
      ctx2.beginPath();
      ctx2.moveTo(v3.getX() + c.x, v3.getY() + c.y);
      ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx2.stroke();
    }
    }

    function minuteHand() {
      let a = Math.PI * 2 * (minutes2 / 60) - Math.PI / 2;
      let v = new Vector(radius2*(sizevalue-0.18), a);
      let v3 = new Vector(radius2*(sizevalue-0.00), a);
      
      ctx2.lineWidth = 7;
      ctx2.strokeStyle = 'blue';
      ctx2.beginPath();
      ctx2.moveTo(c.x, c.y);
      ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx2.stroke();

      if (bool_minhandview2_bojo) {
      ctx2.lineWidth = 2;
      ctx2.strokeStyle = 'blue';
      ctx2.beginPath();
      ctx2.moveTo(c.x, c.y);
      ctx2.lineTo(v3.getX() + c.x, v3.getY() + c.y);
      ctx2.stroke();      
    }
    }

    function hourHand() {
      let a = Math.PI * 2 * (hours2 / 12) - Math.PI / 2;
      let v = new Vector(radius2*(sizevalue-0.25), a);
      let v3 = new Vector(radius2*(sizevalue), a);

      ctx2.lineWidth = 10;
      ctx2.strokeStyle = 'green';
      ctx2.beginPath();
      ctx2.moveTo(c.x, c.y);
      ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx2.stroke();

      if (bool_hourhandview2_bojo) {
      ctx2.lineWidth = 2;
      ctx2.strokeStyle = 'green';
      ctx2.beginPath();
      ctx2.moveTo(c.x, c.y);
      ctx2.lineTo(v3.getX() + c.x, v3.getY() + c.y);
      ctx2.stroke();      
    }
    }
}

realtimecheck2.addEventListener("change", function() {
    if (realtimecheck2.checked) {
        clock2Interval = setInterval( function () {
            draw();
            digitalTime2();
        }, 10);
        bool_realtime2 = true;
    } else {
        clearInterval(clock2Interval);
        bool_realtime2 = false;
    }
  });

  function digitalTime2() {
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
  
    let tmpsize = 50;
    digitalctx.clearRect(0,0,digitalcanvas.width,digitalcanvas.height);
    digitalctx.font = "53px 굴림체";
    digitalctx.fillStyle = "white";
    digitalctx.fillText(ampm,tmpsize,43);

    digitalctx.font = "90px 굴림체";
    digitalctx.fillStyle = "green";
    digitalctx.fillText(zeroPadding(hr),tmpsize+120,76);
    
    digitalctx.fillStyle = "white";
    digitalctx.fillText(":",tmpsize+120+90,76);

    digitalctx.fillStyle = "blue";
    digitalctx.fillText(_min,tmpsize+120+90+45,76);

    digitalctx.fillStyle = "white";
    digitalctx.fillText(":",tmpsize+120+90+40+90,76);

    digitalctx.fillStyle = "red";
    digitalctx.fillText(sec,tmpsize+120+90+40+90+45,76);

    digitalctx.font = "40px 굴림체";
    digitalctx.fillStyle = "white";
    digitalctx.fillText(parseInt(dateInfo.getMilliseconds()/100),tmpsize+120+90+40+90+45+100,76);
    

  }
  
  function zeroPadding2(num) {
    var zero = '';
    if (num < 10)   zero += '0';
    return (zero + num);
  }  

  
  hourvalueview2.addEventListener("change", function() {
    if (this.checked) bool_hourvalueview2 = true;
    else bool_hourvalueview2 = false;

    anal_digi_viewClock2();
  });
  
  minvalueview2.addEventListener("change", function() {
    if (this.checked) bool_minvalueview2 = true;
    else bool_minvalueview2 = false;

    anal_digi_viewClock2();
  });
  
  secvalueview2.addEventListener("change", function() {
    if (this.checked) bool_secvalueview2 = true;
    else bool_secvalueview2 = false;

    anal_digi_viewClock2();
  });
  
  hourhandview2.addEventListener("change", function() {
    if (this.checked) bool_hourhandview2 = true;
    else bool_hourhandview2 = false;

    anal_digi_viewClock2();
  });
  
  minhandview2.addEventListener("change", function() {
    if (this.checked) bool_minhandview2 = true;
    else bool_minhandview2 = false;

    anal_digi_viewClock2(); 
  });
  
  sechandview2.addEventListener("change", function() {
    if (this.checked) bool_sechandview2 = true;
    else bool_sechandview2 = false;

    anal_digi_viewClock2();  
  });
  
  hourhandview2_bojo.addEventListener("change", function() {
    if (this.checked) bool_hourhandview2_bojo = true;
    else bool_hourhandview2_bojo = false;

    anal_digi_viewClock2();   
  });
  
  minhandview2_bojo.addEventListener("change", function() {
    if (this.checked) bool_minhandview2_bojo = true;
    else bool_minhandview2_bojo = false;

    anal_digi_viewClock2();    
  });
  
  sechandview2_bojo.addEventListener("change", function() {
    if (this.checked) bool_sechandview2_bojo = true;
    else bool_sechandview2_bojo = false;

    anal_digi_viewClock2();  
  });
  