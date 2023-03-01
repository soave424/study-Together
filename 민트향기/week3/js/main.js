const canvas1 = document.querySelector(".canvas-video");
const canvas2 = document.querySelector(".canvas-transform");
const canvas3 = document.querySelector(".canvas-interaction");
const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");
const btnsElem = document.querySelector('.btns');

// video
/* ctx1.font = "bold 50px serif";
ctx1.fillStyle = "red"; */
const videoElem = document.querySelector(".video");
videoElem.addEventListener("canplaythrough", render);
/* const messages = [
	{ time: 1, message: "첫번째 자막", x: 100, y: 100 },
	{ time: 3, message: "두번째 자막", x: 300, y: 300 },
	{ time: 5, message: "세번째 자막", x: 400, y: 200 },
];
 */
let colorValue;

function render() {
	//console.log(videoElem.currentTime);
	ctx1.drawImage(videoElem, 0, 0, 600, 400);
    imageData = ctx1.getImageData(0, 0, 600, 400);
    leng = imageData.data.length / 4;

    for (let i = 0; i < leng; i++) {
        switch(colorValue) {
            case 'red':
                imageData.data[i * 4 + 0] = 255;
                break;
            case 'green':
                imageData.data[i * 4 + 1] = 255;
                break;
            case 'blue':
                imageData.data[i * 4 + 2] = 255;
                break;
            }
        }
    ctx1.putImageData(imageData, 0, 0);
/* for (let i = 0; i < messages.length; i++) {
        if (videoElem.currentTime > messages[i].time) {
          ctx1.fillText(messages[i].message, messages[i].x, messages[i].y);
        }
      } */
	requestAnimationFrame(render);
}

btnsElem.addEventListener('click', (e) => {
    console.dir(e.target)
    colorValue = e.target.dataset.color;
});



