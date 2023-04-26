let going = false;

let scl = 20;
let grid = [];
let rows, cols;

function setup() {
    let dim = floor(windowWidth*0.9 / scl) * scl
    dim = dim > 400 ? 400 : dim;

    let c = createCanvas(dim, dim);
    c.parent("container");

    rows = width / scl;
    cols = height / scl;

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            grid.push(0)
        }
    }

}


function draw() {
    background(0);

    if (going) {
        frameRate(2)
        update();
    }
    for (i = 0; i < rows * cols; i++) {
        fill(grid[i] ? 0 : 255);
        stroke(155)
        rect((i % cols) * scl, floor(i / cols) * scl, scl, scl)
    }

    

}

function update() {
    let newgrid = [];
    for (i = 0; i < rows * cols; i++) {
        x = i % cols;
        y = floor(i / cols)
        //console.log({x,y})
        if (x == 0 || x == cols - 1 || y == 0 || y == rows - 1) continue
        neigh = countNeighbors(i);
        if (grid[i] == 1 && (neigh < 2 || neigh > 3)) {
            // muore
            newgrid[i] = 0;
        }
        else if (grid[i] == 0 && neigh == 3) {
            // nasce
            newgrid[i] = 1;
        }
        else if (grid[i] == 1 && (neigh == 2 || neigh == 3)) {
            // sopravvive
            newgrid[i] = 1
        } else {
            newgrid[i] = 0
        }
    }

    grid = newgrid;

}

function countNeighbors(i) {
    let count = 0;
    count += grid[i - 1] + grid[i + 1];
    count += grid[i - cols - 1] + grid[i - cols] + grid[i - cols + 1];
    count += grid[i + cols - 1] + grid[i + cols] + grid[i + cols + 1];


    return count;
}

function index(x, y) {
    return x + y * cols
}

function mousePressed() {
    if (!going) {
        let x = floor(mouseX / scl);
        let y = floor(mouseY / scl);
        if(x > 0 && x < cols - 1 && y > 0 && y < rows - 1)
            grid[index(x, y)] = 1;
    }
}

function start() {
    going = true;
}

function fillRandom() {
    going = false;
    for (i = 1; i < rows - 1; i++) {
        for (j = 1; j < cols - 1; j++) {
            grid[index(i, j)] = round(random(1));
        }
    }
}

function restart() {
    frameRate(60);
    going = false;
    for (i = 0; i < rows * cols; i++) {
        grid[i] = 0;
    }
}