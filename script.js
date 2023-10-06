const canvas = document.getElementById('canvas');
const rangeSlider = document.getElementById('range-slider');
const rangeInput = document.getElementById('range-input');
const sizeText = document.getElementById('size-text')
const borderWidth = 2;

// **************************************
// Grid Logic

function createDiv(size) {
    const grid = document.createElement('grid');
    grid.classList.add('grid');
    grid.style.width = `${size}px`;
    grid.style.height = `${size}px`;
    return grid;
}

function makeGrids(amount = 16) {
    canvas.innerHTML = '';
    const grid = createDiv(canvas.clientWidth / amount );
    for (let i = 0; i < amount * amount; i++) {
        canvas.appendChild(grid.cloneNode());
    }
}

function addGridListener() {
    const grids = document.getElementsByClassName('grid');
    [...grids].forEach(element => {
        element.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                element.classList.add('active');
            }
        });
        element.addEventListener('click', () => element.classList.add('active'));
    });
}

rangeSlider.addEventListener('change', () => {
    sizeText.textContent = `${rangeSlider.value}X${rangeSlider.value}`
    makeGrids(rangeSlider.value);
    addGridListener();
});

rangeSlider.addEventListener('input', () => rangeInput.value = rangeSlider.value);

rangeInput.addEventListener('blur', () => {
    if (rangeInput.value < 1) rangeInput.value = 1;
    if (rangeInput.value > 100) rangeInput.value = 100;
    sizeText.textContent = `${rangeInput.value}X${rangeInput.value}`
    makeGrids(rangeInput.value);
    rangeSlider.value = rangeInput.value;
    addGridListener();
});

makeGrids();
addGridListener();