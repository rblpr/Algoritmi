/* const main = document.querySelector("main");

main.innerHTML = `<label for="">Angolo tra i rami</label>
		<input type="range" value="0.785" max="6.28" step="0.0628" min="0" onchange='restart()' />
		<div id="canvasHolder"></div>`; */

/////////////////////////////////////////////////////////////////////

let slider;
let angle = 0;
let w = 3;
let b = window.innerWidth * 0.35;
let ready = true;

function setup() {
	b = b > 150 ? 150 : b;
	let dim = windowWidth*0.9;
	let canvas = createCanvas(dim, dim > 400 ? 400 : dim);
	canvas.parent("container");
	slider = document.querySelector("input");
}

function draw() {
	if (ready) {
		background(255);
		angle = slider.value;
		stroke("#5c3e24");
		translate(width / 2, height);
		branch(b);
		ready = false;
	}
}

function branch(len) {
	line(0, 0, 0, -len);
	translate(0, -len);
	if (len < 15 && len > 10) {
		stroke("#f97910");
	}
	if (len < 10) {
		stroke("#f99410");
	}

	if (len > 6) {
		push();
		rotate(angle);
		branch(len * 0.6);
		pop();
		push();
		rotate(-angle);
		branch(len * 0.6);
		pop();
		push();
		branch(len * 0.6);
		pop();
	}
}

function restart() {
	ready = true;
}
