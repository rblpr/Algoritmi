let tab = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  let n = 1;
  let M = [0, 0]
  
  let over;
  
  
  
  function setup() {
    let dim = windowWidth * 0.9
    let c = createCanvas(dim > 400 ? 400 : dim, dim > 400 ? 400 : dim);
    c.parent("container")
    over = true;
    
    let ini=int(random(2)) 
    let inj=int(random(2)) 
    tab[ini][inj] = 'x' 
  }
  
  function draw() {
    background(255);
  
    Base();
  
    ///////////////////////////////////////////////////
  //   for (let i = 0; i < 3 && over; i++) {
  //     for (let j = 0; j < 3 && over; j++) {
  //       if (tab[i][j] == '') {
  //         over = false
  //       }
  //     }
  //   }
  
    if (n==8) {
      textSize(25);
      text('pareggio!', width / 2 - 50, height - 20);
      noLoop();
    }
    ////////////////////////////////////////////////
  
    giocatore = turno(n);
    if (giocatore == 'x') {
      let besti = 0;
      let bestj = 0;
  
  
      maxscore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (tab[i][j] == '') {
            // console.log("i =", i);
            // console.log("j =", j)
            tab[i][j] = 'x';
            score = minimax(tab, false, 10);
            tab[i][j] = '';
            // console.log(tab[i][j]);
            if (score > maxscore) {
              maxscore = score;
              besti = i;
              bestj = j;
            }
          }
        }
  
      }
      tab[besti][bestj] = 'x';
      n++;
    }
    ///////////////////////////////////////////////////////
  
    strokeWeight(4);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        x = i * width / 3 + width / 6
        y = j * height / 3 + height / 6
        if (tab[j][i] == 'o') {
  
          ellipse(x, y, 50, 50);
        }
        if (tab[j][i] == 'x') {
          line(x - 30, y - 30, x + 30, y + 30);
          line(x - 30, y + 30, x + 30, y - 30);
        }
      }
    }
  
  
    /////////////////////////////////////////////
    if (CheckWinner(tab) == 'x') {
      textSize(25);
      text("vittoria di x!", width / 2 - 62, height - 20);
      console.log('addio')
      noLoop();
    } else if (CheckWinner(tab) == 'o') {
      textSize(25);
      text('vittoria di o!', width / 2 - 62, height - 20);
      noLoop();
    }
  
  
  }
  
  
  function Base() {
    strokeWeight(4);
    line(width / 3, 0, width / 3, height)
    line(2 * width / 3, 0, 2 * width / 3, height);
    line(0, height / 3, width, height / 3)
    line(0, 2 * height / 3, width, 2 * height / 3)
  
  }
  
  function CheckWinner(T) {
  
  
  
    //diagonali
  
    if (T[0][0] == T[1][1] && T[1][1] == T[2][2] && T[0][0] != '') {
  
      return T[0][0]
  
    } else if (T[2][0] == T[1][1] && T[1][1] == T[0][2] && T[2][0] != '') {
  
      return T[2][0]
  
    }
  
    //orizzontali
    else if (T[0][0] == T[0][1] && T[0][1] == T[0][2] && T[0][0] != '') {
  
      return T[0][0]
    } else if (T[1][0] == T[1][1] && T[1][1] == T[1][2] && T[1][0] != '') {
  
      return T[1][0]
    } else if (T[2][0] == T[2][1] && T[2][1] == T[2][2] && T[2][0] != '') {
  
      return T[2][0]
    }
  
    //verticali
    else if (T[0][0] == T[1][0] && T[1][0] == T[2][0] && T[0][0] != '') {
  
      return T[0][0];
    } else if (T[0][1] == T[1][1] && T[1][1] == T[2][1] && T[0][1] != '') {
  
      return T[0][1];
    } else if (T[0][2] == T[1][2] && T[1][2] == T[2][2] && T[0][2] != '') {
  
      return T[0][2]
    } else {
      return null;
    }
  }
  
  
  function turno(n) {
    if (n % 2 == 0) {
      giocatore = 'x'
    } else {
      giocatore = 'o'
    }
    return giocatore
  }
  
  function mousePressed() {
  
  
    x = mouseX;
    y = mouseY;
  
    let w = width / 3;
    let h = height / 3;
  
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
  
    if (tab[j][i] == '') {
      tab[j][i] = 'o';
      n++;
    }
  }
  
  
  
  function mossa(T) {
    let besti;
    let bestj;
  
    maxscore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (T[i][j] == '') {
          T[i][j] = 'x';
          score = minimax(T, false);
          T[i][j] = '';
  
          if (score > maxscore) {
            maxscore = score;
            besti = i;
            bestj = j;
          }
        }
      }
  
    }
    console.log('mossa', [besti, bestj]);
    return [besti, bestj]
  
  
  }
  
  
  function minimax(child, maximizingP, depth) {
  
  
    if (CheckWinner(child) == 'x') {
      return +10 + depth;
    } else if (CheckWinner(child) == 'o') {
      return -10 - depth;
    }
  
    if (maximizingP) {
      let maxscore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (child[i][j] == '') {
            child[i][j] = 'x';
            score = minimax(child, false, depth-1);
            child[i][j] = '';
  
            if (score > maxscore) {
              maxscore = score;
            }
          }
        }
      }
      return maxscore;
    }
  
    if (!maximizingP) {
      let minscore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (child[i][j] == '') {
            child[i][j] = 'o';
            score = minimax(child, true, depth-1);
            child[i][j] = '';
  
            if (score < minscore) {
              minscore = score;
            }
          }
        }
      }
      return minscore;
    }
  
  
  }