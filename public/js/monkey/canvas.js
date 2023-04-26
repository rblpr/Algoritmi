
let population;

let target;
let P;

let ready = true;

function setup() {
    let dim = windowWidth * 0.9;
	let canvas = createCanvas(dim, 400);
	canvas.parent("container");
    document.querySelector("#container").classList.add("border")

	target = document.querySelector("input").value;
	if (target == "") {
		ready = false;
		window.alert("Input non valido");
	}

	population = new Population();
}

function draw() {
	frameRate(60);

	if (ready) {
		background(255);

		population.run();

		population.calcFitness();

		population.naturalSelection();

		population.generate();

		population.generation++;

		let s = "";
		for (let i = 0; i < population.bestfit.length; i++) {
			s += population.bestfit[i];
		}

		textSize(windowWidth < 500 ? 16 : 20);
		textFont("Josefin Sans");
		text(s, 30, height / 2);

		textFont("Josefin Sans");
		textSize(windowWidth < 500 ? 12 : 16);
		text("generation " + population.generation, 30, height / 2 + 20);
	}

	if (population.maxfit == 1) {
		ready = false;
	}
}

function restart() {
	ready = true;

	setup();
}

/////////////////////////////////////////////////////////////////////////////////
let popsize = 300;
class Population {
	constructor() {
		this.population = [];
		this.maxfit = 0;
		this.bestfit = [];

		this.generation = 1;

		for (let i = 0; i < popsize; i++) {
			let v = new Phrase();
			this.population.push(v);
		}
	}

	run() {
		for (let i = 0; i < this.population.length; i++) {
			this.population[i].show(i);
		}
	}

	calcFitness() {
		this.maxfit = 0;
		for (let i = 0; i < this.population.length; i++) {
			let element = this.population[i];
			element.fitness = element.dna.calcFitness();

			if (element.fitness > this.maxfit) {
				this.maxfit = element.fitness;
				this.bestfit = element.dna.geni;
			}
		}
	}

	naturalSelection() {
		this.matingpool = [];

		for (let i = 0; i < this.population.length; i++) {
			let fitness = map(this.population[i].fitness, 0, this.maxfit, 0, 1);
			if (isNaN(fitness)) {
				fitness = 1;
			}

			let n = floor(fitness * 100);
			for (let j = 0; j < n; j++) {
				this.matingpool.push(this.population[i]);
			}
		}
	}

	generate() {
		let newpop = [];

		for (let i = 0; i < this.population.length; i++) {
			let a = floor(random(this.matingpool.length));
			let b = floor(random(this.matingpool.length));

			let parent1 = this.matingpool[a].dna;
			let parent2 = this.matingpool[b].dna;

			let child = parent1.crossover(parent2);
			child.mutation(0.01);

			newpop.push(new Phrase(child));
		}
		this.population = newpop;
	}
}

///////////////////////////////////////////////////////////////

class Phrase {
	constructor(dna) {
		if (dna) this.dna = dna;
		else this.dna = new DNA();
	}

	show(i) {
		if (i < 10) {
			for (let j = 0; j < target.length; j++) {
				textSize(10);
				text(this.dna.geni[j], width / 2 + j * 10, 40 * i + 30);
			}
		}
	}
}

/////////////////////////////////////////////////////////

class DNA {
	constructor(geni) {
		this.geni = [];

		if (geni) this.geni = geni;
		else {
			for (let i = 0; i < target.length; i++) {
				let c = floor(random(61, 122));
				if (c === 61) c = 44; //virgola
				if (c === 62) c = 39; //apostrofo
				if (c === 63) c = 32; //spazio
				if (c === 64) c = 46; //punto

				this.geni[i] = char(c);
			}
		}
	}

	calcFitness() {
		let fitness = 0;

		for (let i = 0; i < target.length; i++) {
			if (this.geni[i] == target.charAt(i)) fitness++;
		}

		return fitness / target.length;
	}

	crossover(other) {
		let newgeni = [];
		let div = random(this.geni.length);
		for (let i = 0; i < this.geni.length; i++) {
			if (i < div) {
				newgeni[i] = this.geni[i];
			} else {
				newgeni[i] = other.geni[i];
			}
		}
		return new DNA(newgeni);
	}

	mutation(rate) {
		for (let i = 0; i < this.geni.length; i++) {
			if (random(1) < rate) {
				let c = floor(random(63, 122));
				if (c === 63) c = 32;
				if (c === 64) c = 46;

				this.geni[i] = char(c);
			}
		}
	}
}
