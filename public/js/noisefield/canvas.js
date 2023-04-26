let scl = 20;
let grid = [];
let parts = [];
let rows, cols;

let showall = false;

let mag = 10;
let np = 1000;
let inc = 0.1;
let zinc = 0.02;

let zoff = 0;
function setup() {
    let dim = 0.9 * windowWidth;
    dim = dim > 400 ? 400 : dim; 

    let c = createCanvas(dim, dim);
    background(255);

    c.parent("container");
    document.querySelector("#container").classList.add("border")

    rows = width / scl;
    cols = height / scl;

    for(let i = 0; i < np; i++){
        parts.push(new Particle(random(width),random(height), 8));
    }

    //setInterval(restart, 1000 * 10);
}


function draw() {

    if(frameCount % 600 == 0) {
        restart();
    }

    if(showall) {
        background(255);
    } else {
       // background(255);
    }

    updateField();

    for(let c of grid) {
        c.show();
    }

    for(let p of parts) {
        let currx = floor(p.pos.x / scl);
        let curry = floor(p.pos.y / scl);
        //console.log({currx, curry})
        let f = grid.find(g => g.x == currx * scl && g.y == curry * scl).vec;
        p.applyForce(f);
        p.show();

    }

}

function updateField() {
    grid = [];
    yoff = 0;
    for(let i = 0; i < cols; i ++) {
        xoff = 0
        for(let j = 0; j < rows; j ++) {
            grid.push(new Cell(i * scl, j * scl, scl, p5.Vector.fromAngle(noise(xoff, yoff, zoff) * TWO_PI).setMag(mag)));
            xoff += inc;
        }
        yoff += inc;
    }
    zoff += zinc;
}


function index(x, y) {
    return x + y * cols
}


class Cell {

    constructor(x, y, l, vec) {
        this.x = x;
        this.y = y;
        this.vec = vec;
        this.l = l;
    }

    show() {
        fill(255);
        if(showall){
            stroke(155);
            rect(this.x,this.y,this.l,this.l)

            stroke(100)
            line(this.x, this.y, this.x + this.vec.x, this.y + this.vec.y)
        }
    }

}

class Particle {
    constructor(x, y, r) {
        this.pos = createVector(x,y);
        this.prevpos = createVector(x,y);
        this.r = r;

        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
    }

    show() {
        if(showall){
            fill(255,0,0);
            stroke(155)
            ellipse(this.pos.x,this.pos.y,this.r,this.r);
        } else if(p5.Vector.sub(this.pos, this.prevpos).mag() < 100) {
            stroke(50, 1);
            line(this.pos.x, this.pos.y, this.prevpos.x, this.prevpos.y)
        }
    }

    applyForce(f) {
        this.acc.mult(0);
        this.acc.add(f);

        this.vel.add(this.acc);
        this.vel.limit(5)
        this.prevpos.mult(0).add(this.pos);
        this.pos.add(this.vel);
        this.pacman();
    }

    pacman() {
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.x < 0) this.pos.x = width - 1;
        if(this.pos.y < 0) this.pos.y = height - 1;
    }


}


function showField() {
    showall = !showall;
    background(255);
}

function restart() {
    console.log("restart");

    background(255);
    parts = [];
    for(let i = 0; i < np; i++){
        parts.push(new Particle(random(width),random(height), 8));
    }
}