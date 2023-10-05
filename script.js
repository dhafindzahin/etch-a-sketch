const canvas = document.getElementById('canvas');
const grid = document.createElement('div');
grid.className = 'item';
const items = document.getElementsByClassName('item');

for (let i = 0; i < 16 * 16; i++) {
    canvas.appendChild(grid.cloneNode(true));
}

[...items].forEach(element => {
    element.addEventListener('mousemove', (e) => {
        if (e.buttons & 1) {
            element.classList.add('active');
        }
    });
    element.addEventListener('click', () => element.classList.add('active'));
});
