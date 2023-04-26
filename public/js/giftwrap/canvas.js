
let points = [];
let hull = [];
let m;
let done = false;
let wait = 5;

let leftMost;
let currentVertex;
let index = 0;
let nextVertex;

function setup() {
    let dim = windowWidth * 0.9;
    dim = dim > 400 ? 400 : dim;

    let c = createCanvas(dim, dim);
    c.parent("container");

    m = width * 0.15

    for (let i = 0; i < 15; i++) {
        points.push(createVector(random(m, width - m), random(m, height - m)))
    }

    let sorted = [...points]

    sorted.sort((a, b) => a.x - b.x);
    leftMost = sorted[0];
    currentVertex = leftMost;
    nextVertex = sorted[1];
    hull.push(currentVertex)
}


function draw() {
    frameRate(5)
    background(255);
    strokeWeight(1);
    stroke(0);
    noFill();
    //strokeWeight(3)
    for (let p of points) {
        myPoint(p);
    }
    drawHull();

    if (done) {
        wait--;
        if (wait == 0) {
            wait = 5;
            restart();
        }
    }
    else {

        let a = p5.Vector.sub(points[index], currentVertex);
        let b = p5.Vector.sub(nextVertex, currentVertex);
        if (p5.Vector.cross(a, b).z > 0) nextVertex = points[index]


        strokeWeight(1);

        // punto che sto considerando (blu)
        stroke(150, 0, 255);
        myPoint(points[index]);
        myLine(currentVertex, points[index]);

        // punto candidato (rosso)
        stroke(255, 0, 0)
        myPoint(nextVertex);
        myLine(currentVertex, nextVertex);

        // vertice su cui mi trovo (verde)
        stroke(0, 255, 0);
        fill(0, 255, 0);
        ellipse(currentVertex.x, currentVertex.y, 6, 6);

        index++;
        if (index == points.length) {
            index = 0;
            hull.push(nextVertex);
            currentVertex = nextVertex;
            nextVertex = leftMost;
        }

        if (currentVertex == leftMost && hull.length > 1) {
            done = true;
        }


    }
}

function myLine(a, b) {
    line(a.x, a.y, b.x, b.y)
}

function myPoint(a) {
    ellipse(a.x, a.y, 8, 8)
}

function drawHull() {
    noFill();
    stroke(255, 100, 50);
    strokeWeight(4)
    beginShape();
    for (let p of hull) {
        vertex(p.x, p.y);
    }
    endShape();
}

function restart() {
    hull = [];
    done = false;

    let sorted = [...points]

    sorted.sort((a, b) => a.x - b.x);
    leftMost = sorted[0];
    currentVertex = leftMost;
    nextVertex = sorted[1];
    hull.push(currentVertex)
}