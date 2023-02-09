const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const lingrad0 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad0.addColorStop(0, "#ff9a9e");
lingrad0.addColorStop(0.99, "#fad0c4");
lingrad0.addColorStop(1, "#fad0c4");

const lingrad1 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad1.addColorStop(0, "#a18cd1");
lingrad1.addColorStop(1, "#fbc2eb");

const lingrad2 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad2.addColorStop(0, "#fad0c4");
lingrad2.addColorStop(1, "#ffd1ff");

const lingrad3 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad3.addColorStop(0, "#ffecd2");
lingrad3.addColorStop(1, "#fcb69f");

const lingrad4 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad4.addColorStop(0, "#ff8177");
lingrad4.addColorStop(0.21, "#ff8c7f");
lingrad4.addColorStop(0.52, "#f99185");
lingrad4.addColorStop(0.78, "#cf556c");
lingrad4.addColorStop(1, "#b12a5b");

const lingrad5 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad5.addColorStop(0, "#ff919e");
lingrad5.addColorStop(0.99, "#fecfef");
lingrad5.addColorStop(1, "#fecfef");

const lingrad6 = ctx.createLinearGradient(0, 0, 700, 700);
lingrad6.addColorStop(0, "#f6d365");
lingrad6.addColorStop(1, "#fda085");

// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, 2 * Math.PI);
// ctx.fillStyle = lingrad0;
// ctx.fill();

// ctx.beginPath();
// ctx.arc(200, 100, 50, 0, 2 * Math.PI);
// ctx.fillStyle = lingrad1;
// ctx.fill();

for (i = 0; i < 7; i++) {
  for (j = 0; j < 7; j++) {
    ctx.beginPath();
    ctx.arc(100 + 100 * i, 100 + 100 * j, 50, 0, 2 * Math.PI);
    ctx.fillStyle = lingrad4;
    ctx.fill();
  }
}
