const colorBox = Array.from(document.querySelectorAll('.color-box'));
const noticeColor = document.querySelector('h2');

function onClick(e) {
  document.body.className = e.target.dataset.color;
  e.target.textContent = parseInt(e.target.textContent) + 1;
  noticeColor.innerText = `You choose '${e.target.dataset.color}' color !`;
}

colorBox.forEach((color) => {
  color.addEventListener('click', onClick);
});
