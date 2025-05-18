let drawGrid = () => {
    let styleObj = {
        "border": "10px solid #242d34",
        "cell_mark": "#D2D0A0",
        "containerBorder":"1px solid white"
    };


    let addListeners = (gridElement) => {
        let maxXinp = gridElement.querySelector('.maxX');
        let maxYinp = gridElement.querySelector('.maxY');
        let drawButton = gridElement.querySelector('.draw_button');
        let markButton = gridElement.querySelector('.mark_button');
        let drawXinp = gridElement.querySelector('.drawX');
        let drawYinp = gridElement.querySelector('.drawY');
        let resetButton = gridElement.querySelector('.reset_button');
        let clearButton = gridElement.querySelector('.clear_button');
        let gridContainer = gridElement.querySelector('.grid_container');
        let markInputs = gridElement.querySelector('.mark_inputs');
        let drawInputs = gridElement.querySelector('.draw_inputs');
        let controlButtons = gridElement.querySelector('.buttons');
        let deleteButton = gridElement.querySelector('.delete_button');

        let grid = [];

        // Draw grid 
        let genarateGrid = () => {
            let maxX = maxXinp.value;
            let maxY = maxYinp.value;
 
            if (isNaN(maxX) || isNaN(maxY) || maxX <= 0 || maxY <= 0) {
                alert("Enter a number greater than 0");
                maxXinp.style.border = '1px solid red';
                maxYinp.style.border = '1px solid red';
                return;
            }

            gridContainer.innerHTML = '';
            gridContainer.style.gridTemplateColumns = `repeat(${maxX}, 1fr)`;
            gridContainer.style.gridTemplateRows = `repeat(${maxY}, 1fr)`;

            grid = [];
            for (let i = maxY; i > 0; i--) {
                grid[i] = [];
                for (let j = 1; j <= maxX; j++) {
                    let cell = document.createElement('div');
                    cell.classList.add('grid_cell');
                    gridContainer.style.borderBottom = styleObj.containerBorder
                    gridContainer.style.borderLeft = styleObj.containerBorder
                    cell.style.borderRight = styleObj.border;
                    cell.style.borderLeft = styleObj.border;
  
                    gridContainer.appendChild(cell);
                    grid[i][j] = cell;
                }
            }

            let warning = document.createElement('div');
            warning.className = 'warning';
            warning.innerHTML = `<h1>Note: X must be ≤ ${maxX} and Y must be ≤ ${maxY} to mark a valid cell.</h1>`;
            controlButtons.appendChild(warning);

            markInputs.style.display = 'flex';
            drawInputs.style.display = 'none';
            drawButton.style.display = 'none';
            markButton.style.display = 'flex';
            clearButton.style.display = 'flex';
            resetButton.style.display = 'flex';
        };

        // Remove cell marks
        let removeMark = () => {
            drawXinp.value = '';
            drawYinp.value = '';
            let cells = gridContainer.querySelectorAll('.grid_cell');
            cells.forEach(cell => {
                cell.style.backgroundColor = '';
            });
        };

        // Mark  cell
        let markCell = () => {
            let x = parseInt(drawXinp.value);
            let y = parseInt(drawYinp.value);
            let maxX = parseInt(maxXinp.value);
            let maxY = parseInt(maxYinp.value);

            if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
                alert("Enter a number greater than 0");
                drawXinp.style.border = '1px solid red';
                drawYinp.style.border = '1px solid red';
                removeMark();
            } else if (x > maxX || y > maxY) {
                alert(`X must be ≤ ${maxX} and Y must be ≤ ${maxY} to mark a valid cell.`);
                removeMark();
            } else {
                for (let i = y; i >= 1; i--) {
                    if (grid[i][x]) {
                        grid[i][x].style.backgroundColor = styleObj.cell_mark;
                    }
                }
            }
        };
        //draw button
        drawButton.addEventListener('click', genarateGrid);
        //mark button
        markButton.addEventListener('click', markCell);
        //clear button
        clearButton.addEventListener('click', removeMark);
        //reset button
        resetButton.addEventListener('click', () => {
            removeMark();
            markInputs.style.display = 'none';
            drawInputs.style.display = 'flex';
            drawButton.style.display = 'flex';
            markButton.style.display = 'none';
            clearButton.style.display = 'none';
            resetButton.style.display = 'none';
            gridContainer.innerHTML = '';
            maxXinp.value = '';
            maxYinp.value = ''
        });
        //delete button
        deleteButton.addEventListener('click', () => {
            gridElement.remove()
        })
    };
    //add more grid
    let gridCount = 0;
    let addMore = () => {
        gridCount++;
        let main = document.querySelector('.main');
        let grids = document.createElement('div');
        let gridId = gridCount;
        grids.id = gridId;
        grids.innerHTML = `
                <div class="grid_container">
                </div>
                <div class="buttons">
                <div class='delete_button'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                    <div class="inputs">
                        <div class="draw_inputs">
                            <div class="inputs">
                                <label>Max-X:</label>
                                <input type="number" class="maxX" placeholder="X">
                            </div>
                            <div class="inputs">
                                <label>Max-Y:</label>
                                <input type="number" class="maxY" placeholder="Y">
                            </div>
                        </div>
                        <div class="mark_inputs" style="display: none;">
                            <div class="inputs">
                                <label>X:</label>
                                <input type="number" class="drawX" placeholder="X">
                            </div>
                            <div class="inputs">
                                <label>Y:</label>
                                <input type="number" class="drawY" placeholder="Y">
                            </div> 
                        </div>
                    </div> 
                    <div class="inner_buttons">
                        <button class="grid_button draw_button">Draw</button>
                        <button class="grid_button mark_button" style="display:none;">Mark</button>
                        <button class="grid_button clear_button" style="display:none;">Clear</button>
                        <button class="grid_button reset_button" style="display:none;">Reset</button>
                    </div> 
                </div> 
            `;
            grids.style.cssText = "display: flex; flex-direction: column; width: 100%; align-items: center; gap: 32px;";
        main.appendChild(grids);
        addListeners(grids);
    };
    //add grid button
    let hideImg = () => {
        if (gridImage) {
            gridImage.style.display = 'none';
        }
    };
    let gridImage = document.querySelector('.grid_img');
    let addGridButton = document.querySelector('.add_grid');
    if (addGridButton) {
        addGridButton.addEventListener('click', addMore);
        addGridButton.addEventListener('click', hideImg);
    }
};
drawGrid();
