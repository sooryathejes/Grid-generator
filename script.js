let drawgrid = () => {
    let gridContainer = document.querySelector('.grid_container');
    let maxXinp = document.querySelector('#maxX');
    let maxYinp = document.querySelector('#maxY');
    let drawButton = document.querySelector('#draw_button');
    let markButton = document.querySelector('#mark_button');
    let drawXinp = document.querySelector('#drawX');
    let drawYinp = document.querySelector('#drawY');
    let resetButton = document.querySelector('#reset_button')
    let clearButton = document.querySelector('#clear_button')
    let markInputs = document.querySelector('.mark_inputs')
    let drawInputs = document.querySelector('.draw_inputs')
    let controlButtons = document.querySelector('.buttons')
    let maxX = maxXinp.value;
    let maxY = maxYinp.value;
    let grid = []
    drawButton.addEventListener('click', () => {
        if (maxX > 0 && maxY > 0) {
            gridContainer.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`;
            gridContainer.style.gridTemplateRows = `repeat(${maxY}, 1fr)`;
            let warning = document.createElement('div')
            controlButtons.appendChild(warning)
            warning.innerHTML = `<h1>Note: X must be ≤ ${maxX} and Y must be ≤ ${maxY} to mark a valid cell.</h1>`;
            for (let i = maxY; i > 0; i--) {
                grid[i] = []
                for (let j = 1; j <= maxX; j++) {
                    let cell = document.createElement('div');
                    cell.classList.add('grid_cell');
                    gridContainer.appendChild(cell);
                    grid[i][j] = cell
                }
            }
            if (maxX == '' && maxY == '') {
                alert("Enter a valid input")
            } else {
                markInputs.style.display = 'flex'
                drawInputs.style.display = 'none'
                drawButton.style.display = 'none'
                markButton.style.display = 'flex'
                clearButton.style.display = 'flex'
                resetButton.style.display = 'flex'
            }
        } else {
            alert("Enter a number greater than 0")
            maxXinp.style.border = '1px solid red'
            maxYinp.style.border = '1px solid red'
        }
    });
    let removeMark = () => {
        drawXinp.value = '';
        drawYinp.value = '';
        let cells = document.querySelectorAll('.grid_cell')
        cells.forEach(cell => {
            cell.style.backgroundColor = ''
        })
    }
    markButton.addEventListener('click', () => {
        let x = drawXinp.value;
        let y = drawYinp.value;

        if (x > maxX && y > maxY) {
            alert(`X must be ≤ ${maxX} and Y must be ≤ ${maxY} to mark a valid cell.`)
            removeMark()
        } else if (x == '' && y == '' || x < 1 && y < 1) {
            alert("Enter a number greater than 0")
            drawXinp.style.border = '1px solid red'
            drawYinp.style.border = '1px solid red'
            removeMark()
        } else if (grid[y] && grid[y][x]) {
            grid[y][x].style.backgroundColor = '#D2D0A0';
        }
    });
    resetButton.addEventListener('click', () => {
        location.reload()
    })
    clearButton.addEventListener('click', () => {
        removeMark()
    })
};
drawgrid();    