let lifespan = 300;
let target;
let population;
let p;

let img;


let rw;
let rh = 10;
let rx;
let ry;

// function preload(){
//   img = loadImage('rocket.png')
// }

function setup() {
  let c = createCanvas(windowWidth*0.9 > 700 ? 700 : windowWidth * 0.9, 300);
  c.parent("container")
  
  target = createVector(width / 2, 50);

  rw = width * 0.4 > 170 ? 170 : width * 0.4;
  rx = width / 2 - rw/2;
  ry = height * 0.7 - rh/2;
  

  population = new Population();
  
}

function draw() {
  background(30);

  
  
  textFont('Oxanium')
  text('generation: ' + population.generation, 30,30);
  text('arrivati: ' + population.count_arrivati, 30,60);
  
  
  fill(200,0,0)
  ellipse(target.x, target.y, 30, 30);

  fill(255)
  stroke(0)
  rect(rx,ry,rw,rh)

  population.run();

  if (frameCount % lifespan == 0) {
    
    population.calcFitness();

    population.naturalSelection();

    population.generate();
    
    population.generation ++;
  }

}


class DNA {
    constructor(geni) {
      this.geni = [];
      if (geni) this.geni = geni
      else {
        for (let i = 0; i < lifespan; i++) {
          let v = p5.Vector.random2D();
          v.setMag(0.1);
          this.geni.push(v);
        }
      }
    }
  
    calcFitness(obiettivo) {
      let d = dist(obiettivo.x, obiettivo.y, target.x, target.y)
      let fitness = map(d, 0, width, width, 0);
      return fitness;
    }
  
    crossover(other) {
      let newgeni = [];
      let div = random(this.geni.length);
      for (let i = 0; i < this.geni.length; i++) {
        if (i < div) {
          newgeni[i] = this.geni[i]
  
        } else {
          newgeni[i] = other.geni[i];
        }
      }
  
      return new DNA(newgeni);
    }
  
    mutation(rate) {
  
      for (let i = 0; i < lifespan; i++) {
        if (random(1) < rate) {
          let v = p5.Vector.random2D();
          v.setMag(0.1);
          this.geni[i] = v;
        }
  
      }
    }
  
  }

  let popsize = 30;
class Population {
  constructor() {
    this.population = [];
    this.maxfit = 0;

    this.generation = 1
    this.count_arrivati = 0;

    for (let i = 0; i < popsize; i++) {
      let v = new Rocket();
      this.population.push(v);
    }
  }

  run() {

    for (let i = 0; i < this.population.length; i++) {
      this.population[i].applyForce()
      this.population[i].update();
      this.population[i].show();
    }

  }

  calcFitness() {
    this.maxfit = 0;
    
    this.count_arrivati = 0;


    for (let i = 0; i < this.population.length; i++) {

      let element = this.population[i];
      let pos = element.pos
      element.fitness = element.dna.calcFitness(pos);

      if (element.arrivato()) {
        element.fitness *= 100;
        this.count_arrivati++;
      }
      if (element.fine) element.fitness *= 0.01;


      if (element.fitness > this.maxfit) {
        this.maxfit = element.fitness;
      }
    }

    for (let i = 0; i < this.population.length; i++) {
      this.population[i].fitness /= this.maxfit;
    }


  }

  naturalSelection() {

    this.matingpool = [];

    for (let i = 0; i < this.population.length; i++) {
      let n = this.population[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.population[i])
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
      child.mutation(0.05)
      newpop.push(new Rocket(child));
    }
    this.population = newpop;
  }

}


class Rocket {

    constructor(dna) {
      this.pos = createVector(width / 2, height);
      this.vel = createVector();
      this.acc = createVector();
      if (dna) this.dna = dna;
      else this.dna = new DNA();
  
      this.fine = false
  
      this.fitness = 0;
  
      this.index = 0;
    }
  
    applyForce() {
      this.acc.add(this.dna.geni[this.index]);
      this.index++
    }
  
    update() {
      
      this.crashed();
      
      if (!this.arrivato() && !this.fine) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
      }
    }
  
    show() {
      push();
      noStroke();
      fill(200,150);
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      rectMode(CENTER);
      //image(img,0,0,35,10)
      rect(0, 0, 25, 10);
      pop();
    }
  
    arrivato() {
      let d = dist(this.pos.x, this.pos.y, target.x, target.y)
      if(d < 15) {
        this.pos = target;
        return true
      }
      else return false
    }
  
    crashed(){
      
      if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
        this.fine = true;
      }
      else if(this.pos.x < 0 || this.pos.x > width) {
        this.fine = true
      }
      else if(this.pos.y < 0 || this.pos.y > height){
        this.fine = true;
      }
      else this.fine = false;
      
    }
  }
    
    
    
    
    
    
    
    
    
    
    