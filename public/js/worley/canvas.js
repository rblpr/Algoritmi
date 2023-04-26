let points = [];
let n = 0;

let distances = [];

function setup() {
    let dim = windowWidth * 0.9;
    dim = dim > 300 ? 300 : dim;

    let c = createCanvas(round(dim), round(dim));
    c.parent("container");

    for (let i = 0; i < 100; i++) {
        points.push(createVector(random(width), random(height)))
    }



    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            distances[i+j*width] = (calcDist(i,j));
        }
    }
}


function draw() {
    background(0);

    let img = createImage(width, height);
    img.loadPixels();
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            //let distances = calcDist(i,j);
            let max = 50 + n*10;
            let c = map(distances[i+j*width][n],0, max, 0, 255)
            img.set(i,j, color(c,50,100))
        }
    }
    img.updatePixels();
    image(img, 0, 0);

    /* stroke(0, 255, 0);
    strokeWeight(5);
    for (let p of points) {
        point(p.x, p.y);
    } */
    noLoop();

    stroke(200);
    strokeWeight(1);
}

function calcDist(x, y) {
    let d = [];
    for (let p of points) {
        d.push(dist(x,y,p.x,p.y));
    }
    return d.sort((a,b) => a - b);
}

function changeOrder(k) {
    n+=k;
    if(n < 0) n = 0;
    if(n >= points.length) n = points.length
    document.querySelector("#ordine").textContent = n + 1;
    redraw();
}

