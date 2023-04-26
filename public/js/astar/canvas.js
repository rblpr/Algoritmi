let nodes;
let ris = 20;

let cols, rows;

let openSet = [];
let closedSet = [];
let path = [];

let current;
let start;
let goal;

let btnStart = document.getElementById('btnStart');
let btnDis = document.getElementById('btnDis');
let go = false;
let once = true;

function setup() {
    let dim = ris*Math.floor(windowWidth*0.75/ris)
    dim = dim > 400 ? 400 : dim;
    let canvas = createCanvas(dim, dim);

    canvas.parent('container');

    cols = floor(width / ris);
    rows = height / ris;

    nodes = new Array(cols);

    for (let i = 0; i < cols; i++) {
        nodes[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let n = new Node(i, j, ris);
            nodes[i][j] = n;
        }
    }




    start = nodes[0][0];
    openSet.push(start);
    openSet[0].f = 0;
    goal = nodes[cols - 1][rows - 1];


    start.g = 0;
    start.calcHeuristic();
    start.f = start.h;

}

function draw() {

    //show
    background(220);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            nodes[i][j].show(255);
            if (nodes[i][j].wall) nodes[i][j].show(0);
        }
    }




    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(242, 164, 242));
    }
    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(135, 68, 135));
    }
    start.show(color(0, 255, 0));
    goal.show(color(255, 0, 0));



    //A*
    if (go) {
        AStar();

        reconstructPath(current);
    }
}




function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

function reconstructPath(current) {
    // current.show(color(70, 87, 238));


    if (current.prev) {

        let x = current.x * ris + ris / 2;
        let y = current.y * ris + ris / 2;
        let px = current.prev.x * ris + ris / 2;
        let py = current.prev.y * ris + ris / 2;

        stroke(255, 0, 0);
        strokeWeight(2);
        line(px, py, x, y);
        reconstructPath(current.prev);
    }
}




//DISEGNO DEI MURI

function mouseDragged() {
    disegno();
}

function mousePressed() {
    disegno();
}

let matita = false;

function cambioMatita() {
    if (matita) {
        matita = false;
        btnDis.innerHTML = 'disegna'
    } else {
        matita = true;
        btnDis.innerHTML = "cancella"
    }
}

function disegno() {
    if (!go && matita) {
        if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
            let x = floor(mouseX / ris);
            let y = floor(mouseY / ris);

            nodes[x][y].wall = true;
        }
    } else if (!go && !matita) {
        if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
            let x = floor(mouseX / ris);
            let y = floor(mouseY / ris);

            nodes[x][y].wall = false;
        }


    }

}

function restart() {
    location.reload();
}

class Node {

    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;

        this.neighbors = [];

        this.g = Infinity;
        this.h = 0;
        this.f = Infinity;

        this.prev = undefined;

        this.wall = false;
    }

    findNeighbors() {
        let n;
        if (this.x > 0) {
            n = nodes[this.x - 1][this.y]
            if (!n.wall) this.neighbors.push(n);
        }
        if (this.x < cols - 1) {
            n = nodes[this.x + 1][this.y]
            if (!n.wall) this.neighbors.push(n);
        }
        if (this.y > 0) {
            n = nodes[this.x][this.y - 1]
            if (!n.wall) this.neighbors.push(n);
        }
        if (this.y < rows - 1) {
            n = nodes[this.x][this.y + 1]
            if (!n.wall) this.neighbors.push(n);
        }

    }

    calcHeuristic() {
        this.h = dist(this.x, this.y, goal.x, goal.y);
    }

    show(col) {
        fill(col)
        stroke(100);
        strokeWeight(0.5)
        rect(this.x * this.w, this.y * this.w, this.w, this.w);
    }


}

function AStar() {
    go = true;

    while (once) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                nodes[i][j].findNeighbors();
            }
        }
        once = false;
    }

    if (openSet.length > 0) {

        //the node in openSet having the lowest fScore value
        let lowest = Infinity;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < lowest) {
                lowest = openSet[i].f;
                current = openSet[i];
            }
        }

        //trovato
        if (current == goal) {
            console.log('FATTO!');
            go = false;
            noLoop();
        }

        //rimuovi current da openSet
        removeFromArray(openSet, current);
        closedSet.push(current);


        for (let neighbor of current.neighbors) {

            tempG = current.g;

            if (tempG < neighbor.g) {
                neighbor.g = tempG;
                neighbor.calcHeuristic();
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.prev = current;

                if (!openSet.includes(neighbor))
                    openSet.push(neighbor);
            }
        }


    } else {
        console.log('RICERCA FALLITA');
        go = false;
        noLoop();
    }



}