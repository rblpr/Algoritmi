
let values = [];
let elements;
let w;

let j = 1;

let ready = false;
let shifting = false;

function setup() {
	ready = false;
	j = 0;

	let canvas = createCanvas(windowWidth * 0.75, windowHeight * 0.4);
	canvas.parent("container");

	frameRate(60);
	elements = Number(document.querySelector("input").value);
	if (elements) w = width / elements;

	while (values.length < elements) {
		values.push(ceil(random(height)));
	}
	console.log(values);
	console.log({ vlen: values.length, elements, j });

	rectMode(CORNERS);
	for (let k = 0; k < elements; k++) {
		stroke(0);
		rect(k * w, height, (k + 1) * w, values[k]);
	}
}
let i = 1,
	key = values[1];
function draw() {
	background(255);

	for (let k = 0; k < elements; k++) {
		fill(219, 212, 103);
		if (k <= j) fill(255, 123, 15)
		stroke(0);
		rect(k * w, height, (k + 1) * w, height - values[k]);
		fill(255, 0, 0);
		if (ready && shifting) {
			rect((i + 1) * w, height, (i + 2) * w, height - values[i + 1]);
		}
	}
	if (ready && !shifting) {
		//console.log(j);
		fill(255, 0, 0);
		rect(j * w, height, (j + 1) * w, height - values[j]);
		shifting = true;
		i = j - 1;
		key = values[j];
		if (j == elements) ready = false;
	}
	if (ready && shifting) {
		//console.log({ i, j, key, value: values[i] });
		if (i >= 0 && values[i] > key) {
			let temp = values[i + 1];
			values[i + 1] = values[i];
			values[i] = temp;
			i--;
		} else {
			values[i + 1] = key;
			shifting = false;
			j++;
		}
	}
}

function start() {
	ready = true;
	shifting = false;
	frameRate(4);
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
}
