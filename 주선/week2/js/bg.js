const startColor = document.querySelector('#startcolor');
const endColor = document.querySelector('#endcolor');
const typeNode = document.getElementsByName('type');
const form = document.querySelectorAll('fieldset');

function changeBg(event) {
  const color = startColor.value;
  const colors = endColor.value;
  document.body.style.backgroundImage = `${event.target.value}-gradient(${startColor.value}, ${endColor.value})`;
  console.log(
    `${event.value}-gradient(${startColor.value}, ${endColor.value})`
  );
}
