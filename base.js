function setup() {
    let dim = windowWidth*0.9;
    dim = dim > 400 ? 400 : dim;

    let c = createCanvas(dim, dim);
    c.parent("container");
}


function draw() {
    background(0);
}
