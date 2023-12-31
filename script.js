const canvas = document.getElementById('canvas');
const rangeBox = document.getElementById('range-box');
const rangeInput = document.getElementById('range-input');
const rangeSlider = document.getElementById('range-slider');
const sizeText = document.getElementById('size-text');
const leftMouseBox = document.getElementById('left-mouse-box');
const rightMouseBox = document.getElementById('right-mouse-box');
const leftColorInput = document.getElementById('left-color');
const rightColorInput = document.getElementById('right-color');
const randomBox = document.getElementById('random-box');
const eraserBox = document.getElementById('eraser-box');
const eraser = document.getElementById('eraser');
const darkerBox = document.getElementById('darker-box');
const GridOptionBox = document.getElementById('grid-option-box');
const resetBox = document.getElementById('reset-box');
const saveBox = document.getElementById('save-box');
let rightColor = document.getElementById('right-color').value;
let leftColor = document.getElementById('left-color').value;

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
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    canvas.innerHTML = '';
    const grid = createDiv(canvas.clientWidth / amount);
    for (let i = 0; i < amount * amount; i++) {
        canvas.appendChild(grid.cloneNode());
    }
    document.documentElement.scrollTop = document.body.scrollTop = scrollPosition;
}

function addGridListener() {
    const grids = document.getElementsByClassName('grid');

    [...grids].forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            checkMode(e.target);
            if (e.buttons === 1) element.style.backgroundColor = leftColor;
            if (e.buttons === 2) element.style.backgroundColor = rightColor;
        });
        element.addEventListener('mousedown', (e) => {
            checkMode(e.target);
            if (e.buttons === 1) element.style.backgroundColor = leftColor;
        });
        element.addEventListener('mousedown', (e) => {
            checkMode(e.target);
            if (e.buttons === 2) element.style.backgroundColor = rightColor;
        });
    });
}

// **************************************
// Grid Size Input

rangeSlider.addEventListener('change', () => {
    sizeText.textContent = `${rangeSlider.value}X${rangeSlider.value}`;
    makeGrids(rangeSlider.value);
    addGridListener();
});

rangeSlider.addEventListener('input', () => rangeInput.value = rangeSlider.value);

rangeInput.addEventListener('blur', () => {
    if (rangeInput.value < 1) rangeInput.value = 1;
    if (rangeInput.value > 100) rangeInput.value = 100;
    sizeText.textContent = `${rangeInput.value}X${rangeInput.value}`;
    makeGrids(rangeInput.value);
    rangeSlider.value = rangeInput.value;
    addGridListener();
});

// **************************************
// Eraser

function isEraser() {
    if (!eraser.classList.contains('active')) return false;
    leftColor = 'rgb(242, 242, 242)';
    rightColor = 'rgb(242, 242, 242)';
    return true;
}

// **************************************
// Random Color

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random value for red (0-255)
    const g = Math.floor(Math.random() * 256); // Random value for green (0-255)
    const b = Math.floor(Math.random() * 256); // Random value for blue (0-255)

    const color = `rgb(${r},${g},${b})`;
    return color;
}

function isRandom() {
    if (!randomBox.classList.contains('active')) return false;
    leftColor = getRandomColor();
    rightColor = getRandomColor();
    return true;
}

// **************************************
// Darker Color

function reduceRGBValue(rgb) {
    rgb = rgb.substring(4, rgb.length - 1)
        .replace(/ /g, '')
        .split(',');
    const newRGB = rgb.map(value => value - 25.5);
    return {
        'r': newRGB[0],
        'g': newRGB[1],
        'b': newRGB[2]
    };
}

function isDarker(element) {
    if (!darkerBox.classList.contains('active')) return false;
    const newRGB = reduceRGBValue(element.style.backgroundColor);
    leftColor = `rgb(${newRGB.r},${newRGB.g},${newRGB.b})`;
    rightColor = `rgb(${newRGB.r},${newRGB.g},${newRGB.b})`;
    return true;
}

// **************************************
// Additional Function

function checkMode(target) {
    if (!isRandom() && !isEraser() && !isDarker(target)) {
        leftColor = leftColorInput.value;
        rightColor = rightColorInput.value;
    };
}

function deactiveEraser() {
    if (eraser.classList.contains('active')) {
        eraser.classList.remove('active');
        eraser.classList.add('deactive');
    }
}

function toggleGrid() {
    const grids = document.getElementsByTagName('grid');
    [...grids].forEach(grid => grid.classList.toggle('grid'));
}

function deactiveMode() {
    randomBox.classList.remove('active');
    darkerBox.classList.remove('active');
}

// **************************************
// Option Box

leftMouseBox.addEventListener('click', () => {
    deactiveMode();
    deactiveEraser()
    leftColorInput.click();
});
leftColorInput.addEventListener('input', () => leftColor = leftColorInput.value);

rightMouseBox.addEventListener('click', () => {
    deactiveMode();
    deactiveEraser()
    rightColorInput.click();
});
rightColorInput.addEventListener('input', () => rightColor = rightColorInput.value);

eraserBox.addEventListener('click', () => {
    deactiveMode();
    if (eraser.classList.contains('active')) {
        eraser.classList.remove('active');
        eraser.classList.add('deactive');
    }
    else {
        eraser.classList.remove('deactive');
        eraser.classList.add('active');
    }
});

randomBox.addEventListener('click', () => {
    deactiveEraser();
    darkerBox.classList.remove('active');
    randomBox.classList.toggle('active');
});

darkerBox.addEventListener('click', () => {
    deactiveEraser();
    randomBox.classList.remove('active');
    darkerBox.classList.toggle('active');
});

GridOptionBox.addEventListener('click', () => {
    toggleGrid();
});

resetBox.addEventListener('click', () => {
    makeGrids(rangeInput.value);
    addGridListener();
});

saveBox.addEventListener("click", function () {
    toggleGrid();
    html2canvas(canvas).then(function (canvas) {
        const uri = canvas.toDataURL();
        const filename = prompt('filename');

        const link = document.createElement('a');

        if (typeof link.download === 'string') {

            link.href = uri;
            link.download = filename;

            //Firefox requires the link to be in the body
            document.body.appendChild(link);

            //simulate click
            link.click();

            //remove the link when done
            document.body.removeChild(link);

        } else {

            window.open(uri);

        }
    });
    toggleGrid();
});


makeGrids();
addGridListener();
