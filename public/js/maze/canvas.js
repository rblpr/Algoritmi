let scl = 20;
let cols;
let rows;
let caselle = [];
let stack = [];
let visitate = [];
let current;

function setup() {
  let h = scl * floor(windowHeight * 0.8/scl)
  let w = scl * floor(windowWidth * 0.9/scl)

  w = w > 300 ? 300 : w;
  h = h > 600 ? 600 : h
  
  let canvas = createCanvas(w, h);
  canvas.parent("container")
  cols = width / scl;
  rows = height / scl;


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let c = new Casella(i, j, scl);
      caselle.push(c)
    }
  }

  current = caselle[0];


}

function draw() {
  frameRate(60);
  background(255);



  current.visitata = true;


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let index = i + j * cols;
      caselle[index].show();
    }
  }


  let neighbour = current.findNeighbours();

  if (neighbour != undefined) {
    visitate.push(current);
    stack.push(current);
    neighbour.visitata = true;
    current = neighbour;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  if (visitate.length == caselle.length - 1) {
    frameRate(25);
  }

  // push()
  // strokeWeight(5)
  // stroke(255, 0, 0)
  // line(0, 0, scl, 0);
  // line(width, height, width - scl, height);
  // pop()

}



function CalcolaIndice(i, j) {
  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    return i + j * cols;
  } else {
    return undefined;
  }
}


class Casella {

  constructor(x, y, l) {
    this.x = x;
    this.y = y;
    this.l = l;

    this.visitata = false;

    this.walls = [
      true, //up
      true, //right
      true, //down
      true //left
    ]
  }




  show() {

    let x = this.x * this.l;
    let y = this.y * this.l;

    fill(255);
    if (this.visitata) {
      fill(255, 150, 0);
    }
    if (this.x == current.x && this.y == current.y) {
      fill(255, 150, 0, 150);
    }

    noStroke();
    rect(x, y, this.l, this.l);



    stroke(0);
    if (this.walls[0]) {
      line(x, y, x + this.l, y);
    }
    if (this.walls[1]) {
      line(x + this.l, y, x + this.l, y + this.l);
    }
    if (this.walls[2]) {
      line(x, y + this.l, x + this.l, y + this.l);
    }
    if (this.walls[3]) {
      line(x, y, x, y + this.l);
    }

  }

  findNeighbours() {

    let up = caselle[CalcolaIndice(this.x, this.y - 1)];
    let down = caselle[CalcolaIndice(this.x, this.y + 1)];
    let left = caselle[CalcolaIndice(this.x - 1, this.y)];
    let right = caselle[CalcolaIndice(this.x + 1, this.y)];

    let neighbours = [];

    if (up != undefined && !up.visitata) {
      neighbours.push(up);
    }
    if (right != undefined && !right.visitata) {
      neighbours.push(right);
    }
    if (down != undefined && !down.visitata) {
      neighbours.push(down);
    }
    if (left != undefined && !left.visitata) {
      neighbours.push(left);
    }



    if (neighbours.length > 0) {
      let ind = floor(random(neighbours.length));
      if (neighbours[ind] == right) {
        neighbours[ind].walls[3] = false;
        this.walls[1] = false;
      }
      if (neighbours[ind] == up) {
        neighbours[ind].walls[2] = false;
        this.walls[0] = false;
      }
      if (neighbours[ind] == down) {
        neighbours[ind].walls[0] = false;
        this.walls[2] = false;
      }
      if (neighbours[ind] == left) {
        neighbours[ind].walls[1] = false;
        this.walls[3] = false;
      }
      return neighbours[ind];
    }
  }


}