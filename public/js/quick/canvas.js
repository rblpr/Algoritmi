let values = [];
let w;
let n = 10;
let flag = false;

let subs = [];

function setup() {
    let dim = windowWidth * 0.9;
    dim = dim > 400 ? 400 : dim;

    let c = createCanvas(dim, dim);
    c.parent("container");

    while (values.length < n) {
        values.push(ceil(random(height)));
    }

    w = width / n;

    rectMode(CORNERS);

    subs.push({
        pivot: n - 1,
        low: -1,
        high: -1,
        index: 0,
        from: 0,
        to: n - 1,
        done: false,
    })
}

function draw() {
    frameRate(1)
    background(240);
    showRects({
        pivot: -1,
        low: -1,
        high: -1,
        index: -1,
        from: 0,
        to: n - 1,
        done: false,
    })
    for (let i = 0; i < subs.length; i++) {
        quicksort(i);
    }

    
    //noLoop();
}

function quicksort(k) {
    let s = subs[k];

    if (s.done) {
        showRects(s);
        return;
    }

    if (values[s.index] > values[s.pivot]) {
        s.low++;
        s.high++;
        swap(s.index, s.low);
    } else {
        s.high++;
        swap(s.index, s.high);
    }
    s.index++;

    if (s.index == s.pivot) {
        swap(s.pivot, s.low + 1);
        s.pivot = s.low + 1;
        s.high = s.to;
        s.done = true;
        newSubs(s);
        //subs.splice(k, 1);
    }
    console.log("parte " + k)
    console.log(s);

    showRects(s);
}

function newSubs(s) {

    let leftFrom = s.from;
    let leftTo = s.pivot - 1;
    if (leftTo > leftFrom + 1) {
        subs.push({
            from: leftFrom,
            to: leftTo,
            pivot: leftTo,

            low: leftFrom - 1,
            high: leftFrom - 1,
            index: leftFrom,

            done: false,
        })
    }

    let rightFrom = s.pivot + 1;
    let rightTo = s.to;
    if (rightTo > rightFrom + 1) {
        subs.push({
            from: rightFrom,
            to: rightTo,
            pivot: rightTo,

            low: rightFrom - 1,
            high: rightFrom - 1,
            index: rightFrom,

            done: false,
        })
    }

}

function showRects(s) {
    if (s.done) {
        /* fill(255, 0, 0)
        rect(s.pivot * w, height, (s.pivot + 1) * w, values[s.pivot]); */
        return;
    }
    stroke(0);

    for (let k = s.from; k <= s.to; k++) {
        if (k == s.pivot) fill(255, 255, 0)
        else if (k <= s.low) fill(0, 0, 255);
        else if (k <= s.high) fill(0, 200, 255);
        else if (k == s.index) fill(255, 0, 0)
        else fill(255, 100, 0)
        rect(k * w, height, (k + 1) * w, values[k]);
    }
}


function swap(i, j) {
    let temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}

function mousePressed() {
    redraw();
}