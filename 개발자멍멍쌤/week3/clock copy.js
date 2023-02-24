let canvas2, ctx2, radius2; 
let sizevalue = 1;

init();

function init() {
    canvas2 = document.getElementById('clock2');
    canvas2.width = canvas2.height = 600;
    radius2 = canvas2.width /2 * 0.9;
    ctx2 = canvas2.getContext('2d');

    setInterval(draw, 10);
    draw();
}

function draw () {
    let time = (function () {
            let midnight = new Date();
            midnight.setHours(0);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            midnight.setMilliseconds(0);
            return Date.now() - midnight.getTime();
        })(),
        hours = time / (60 * 60 * 1000),
        minutes = hours * 60 % 60,
        seconds = minutes * 60 % 60,
        c = {x: canvas2.width / 2, y: canvas2.height / 2};

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    ctx2.lineCap = 'round';
    
    clockdrow();
    secondHand();
    minuteHand();
    hourHand();

    function clockdrow() {
        border();
        dot();
        number();
        centerdot();
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
        ctx2.lineWidth = 3;
        ctx2.strokeStyle = 'red';
        ctx2.beginPath();
        let a = Math.PI * 2 * (seconds / 60) - Math.PI / 2;
        let v = new Vector(radius2*(sizevalue-0.11), a);
        let v2 = new Vector(-20, a);
        ctx2.moveTo(v2.getX() + c.x, v2.getY() + c.y);
        ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx2.stroke();
    }

    function minuteHand() {
        ctx2.lineWidth = 6;
        ctx2.strokeStyle = 'blue';
        ctx2.beginPath();
        let a = Math.PI * 2 * (minutes / 60) - Math.PI / 2;
        let v = new Vector(radius2*(sizevalue-0.20), a);
        ctx2.moveTo(c.x, c.y);
        ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx2.stroke();
    }

    function hourHand() {
        ctx2.lineWidth = 6;
        ctx2.strokeStyle = 'green';
        ctx2.beginPath();
        let a = Math.PI * 2 * (hours / 12) - Math.PI / 2;
        let v = new Vector(radius2*(sizevalue-0.25), a);
        ctx2.moveTo(c.x, c.y);
        ctx2.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx2.stroke();
    }
}

