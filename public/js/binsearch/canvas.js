
let numbers = [];
let index;
let target;
let start = 0;
let end;
let tries = 1;
let wait = 3;


function setup() {
    let dim = windowWidth * 0.9;
    dim = dim > 400 ? 400 : dim;

    let c = createCanvas(dim, dim);
    c.parent("container");

    for (let i = 0; i < 11; i++) {
        numbers.push(Math.floor(random(100)))
    }
    numbers.sort((a, b) => a - b)
    console.log(numbers);

    end = numbers.length - 1
    index = floor(numbers.length / 2);
    target = random(numbers)
    console.log(target)

    rectMode(CENTER);
}

function draw() {
    background(255);
    frameRate(1);

    text("Obiettivo: " + target, 10, 30);


    let maxr = width / 12;


    for (let i = 0; i < numbers.length; i++) {
        push()

        let n = numbers[i];
        let r = map(n, 1, 100, 16, maxr);
        let x = 20 + i * maxr;

        if (i < start || i > end) {
            fill(200)
            stroke(200)
        }
        else if (i == index) {
            continue
        }
        else {
            stroke(200)
            noFill();
        }

        ellipse(x, height / 2, r, r);
        pop();

        if (n > 9) text(nf(n, 2, 0), x - 6, height / 2 + 3)
        else text(n, x - 3, height / 2 + 3)
    }

    push()
    let i = index;
    let n = numbers[i];
    let r = map(n, 1, 100, 16, maxr) + 10;
    let x = 20 + i * maxr;
    fill(255, 0, 0, 100)
    noStroke();
    ellipse(x, height / 2, r, r);
    pop();
    if (n > 9) text(nf(n, 2, 0), x - 6, height / 2 + 3)
    else text(n, x - 3, height / 2 + 3)

    if (numbers[index] == target) {
        text("Trovato! " + tries + " tentativi", 10, 48)
        wait--;
        if (wait == 0) restart();
    }
    else if (numbers[index] > target) {
        end = index - 1;
        index = start + floor((end - start) / 2);
        tries++;
    }
    else {
        start = index + 1;
        index = start + floor((end - start) / 2);
        tries++;
    }
}

function restart() {
    console.log("restart")
    numbers = [];
    for (let i = 0; i < 11; i++) {
        numbers.push(Math.floor(random(100)))
    }
    numbers.sort((a, b) => a - b)

    start = 0;
    end = numbers.length - 1
    index = floor(numbers.length / 2);
    target = random(numbers);
    tries = 1;
    wait = 3;
}
