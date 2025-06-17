const canvas = document.getElementById('canvas');
let selectedElement = null;

document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', e.target.dataset.type);
  });
});

canvas.addEventListener('dragover', e => e.preventDefault());

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  const x = e.offsetX;
  const y = e.offsetY;
  const el = document.createElement(type === 'image' ? 'img' : type === 'text' ? 'div' : 'button');
  el.contentEditable = type === 'text';
  el.className = 'canvas-element';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  if (type === 'text') el.textContent = 'Edit me';
  if (type === 'button') el.textContent = 'Click Me';
  if (type === 'image') el.src = 'https://via.placeholder.com/150';
  el.addEventListener('click', () => selectElement(el));
  canvas.appendChild(el);
});

function selectElement(el) {
  selectedElement = el;
  const props = document.getElementById('props-content');
  props.innerHTML = '';

  if (el.tagName === 'DIV' || el.tagName === 'BUTTON') {
    props.innerHTML += '<label>Text: <input type="text" value="' + el.textContent + '" onchange="updateText(this.value)"/></label><br>'; 
    props.innerHTML += '<label>Font size: <input type="number" value="' + (parseInt(el.style.fontSize) || 16) + '" onchange="updateStyle(\'fontSize\', this.value + \'px\')"/></label><br>';
    props.innerHTML += '<label>Color: <input type="color" onchange="updateStyle(\'color\', this.value)"/></label><br>';
    if (el.tagName === 'BUTTON') {
      props.innerHTML += '<label>Background: <input type="color" onchange="updateStyle(\'backgroundColor\', this.value)"/></label><br>';
    }
  } else if (el.tagName === 'IMG') {
    props.innerHTML += '<label>Image URL: <input type="text" value="' + el.src + '" onchange="updateSrc(this.value)"/></label><br>';
    props.innerHTML += '<label>Width: <input type="number" value="' + el.width + '" onchange="selectedElement.width = this.value"/></label><br>';
  }
}

function updateText(value) {
  if (selectedElement) selectedElement.textContent = value;
}

function updateStyle(property, value) {
  if (selectedElement) selectedElement.style[property] = value;
}

function updateSrc(value) {
  if (selectedElement) selectedElement.src = value;
}
