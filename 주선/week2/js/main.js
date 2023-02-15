const colorBox = Array.from(document.querySelectorAll('.color-box'));

function onClick(e) {
  document.body.className = e.target.dataset.color;
  e.target.textContent = parseInt(e.target.textContent) + 1;
}

colorBox.forEach((color) => {
  color.addEventListener('click', onClick);
});
