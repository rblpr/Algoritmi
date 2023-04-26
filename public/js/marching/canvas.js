
let res = 20;
let inc = 0.5;
let zoff = 0;

let grid = [];
let rows, cols;

let showMode = 0;

function setup() {
    let dim = res*Math.floor(windowWidth*0.80/res)
    dim = dim > 400 ? 400 : dim;

    let c = createCanvas(dim, dim);
    c.parent("container");

    rows = 1 + height / res;
    cols = 1 + width / res;

    yoff = 0;
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        xoff = 0;
        for (let j = 0; j < cols; j++) {
            //grid[i].push(round(random(1)));
            grid[i].push(noise(xoff, yoff, zoff))
            xoff += inc;
        }
        yoff += inc;
    }

}


function draw() {
    background(250);
    move();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let x = j * res;
            let y = i * res;
            noStroke();
            //fill(255, grid[i][j] * 255, 0);
            if (showMode == 0) {
                fill(grid[i][j] * 255);
                ellipse(x, y, 4, 4);
            } else if(showMode == 1) {
                fill(0);
                textSize(4)
                text(nf(grid[i][j], 1, 1), j * res - 3,i * res + 1)
            } else if(showMode == 2) {
                fill(0);
                textSize(8)
                text(thres(grid[i][j]), j * res - 2,i * res + 2)
            }
        }
    }

    for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols - 1; j++) {
            let va = thres(grid[i][j]);
            let vb = thres(grid[i][j + 1]);
            let vc = thres(grid[i + 1][j + 1]);
            let vd = thres(grid[i + 1][j]);
            let val = va + vb * 2 + vc * 4 + vd * 8;

            let x = j * res;
            let y = i * res;
            let a = createVector(x + res / 2, y);
            let b = createVector(x + res, y + res / 2);
            let c = createVector(x + res / 2, y + res);
            let d = createVector(x, y + res / 2);

            stroke(255, 127, 80)

            switch (val) {
                case 1:
                    aline(a, d);
                    break;
                case 2:
                    aline(a, b);
                    break;
                case 3:
                    aline(b, d);
                    break;
                case 4:
                    aline(b, c);
                    break;
                case 5:
                    aline(a, b);
                    aline(c, d);
                    break;
                case 6:
                    aline(a, c);
                    break;
                case 7:
                    aline(c, d);
                    break;
                case 8:
                    aline(c, d);
                    break;
                case 9:
                    aline(a, c);
                    break;
                case 10:
                    aline(a, d);
                    aline(b, c);
                    break;
                case 11:
                    aline(b, c);
                    break;
                case 12:
                    aline(b, d);
                    break;
                case 13:
                    aline(a, b);
                    break;
                case 14:
                    aline(a, d);
                    break;
                default:
                    break;
            }


        }
    }
}

function aline(a, b) {
    line(a.x, a.y, b.x, b.y);
}

function move() {
    yoff = 0;
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        xoff = 0;
        for (let j = 0; j < cols; j++) {
            //grid[i].push(round(random(1)));
            grid[i].push(noise(xoff, yoff, zoff))
            xoff += inc;
        }
        yoff += inc;
    }
    zoff += 0.001
}


function thres(val) {
    return val > 0.5 ? 1 : 0;
}

function changeMode() {
    showMode = (showMode + 1) % 3
}