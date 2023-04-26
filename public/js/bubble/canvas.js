
let values = [];
let elements;
let w;

let j = 1;

let ready = false;
let n;

function setup() {
	ready = false;
	j = 1;

	let canvas = createCanvas(windowWidth*0.75, windowHeight*0.4);
	canvas.parent("container");

	frameRate(60);
	elements = Number(document.querySelector("input").value);
	if (elements) w = width / elements;

	while (values.length < elements) {
		values.push(ceil(random(height)));
	}

	rectMode(CORNERS);
	for (let k = 0; k < elements; k++) {
		stroke(0);
		rect(k * w, height, (k + 1) * w, values[k]);
	}
	n = values.length - 1;
}
let i = 0;

let scambio = true;

function draw() {
	background("white");
	console.log(n)

	for (let k = 0; k < elements; k++) {
		fill(255, 123, 15);
		if (k <= n) {
			fill(219, 212, 103)
		}
		stroke(0);
		rect(k * w, height, (k + 1) * w, height - values[k]);
	}

	if (ready) {
		if (scambio || i != 0) {
			if (i == 0) scambio = false;
			if (i < n + 1) {
				fill(255, 0, 0);
				rect(i * w, height, (i + 1) * w, height - values[i]);
				if (values[i] > values[i + 1]) {
					let temp = values[i];
					values[i] = values[i + 1];
					values[i + 1] = temp;
					scambio = true;
				}
				i++;
			}
			if (i == n + 1) {
				i = 0;
				n--;
			}
		} else {
			n = -1;
		}
	}
}

function start() {
	ready = true;
	scambio = true;
	frameRate(7);
}

function reset() {
	while (values.length > 0) {
		values.pop();
	}
	ready = false;
	j = 1;
	i = 0;

	elements = Number(document.querySelector("input").value);
	if (elements) w = width / elements;

	while (values.length < elements) {
		let val = ceil(random(height));
		values.push(val);
	}
	n = values.length - 1;
}
