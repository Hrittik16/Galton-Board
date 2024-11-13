function setup() {
  Height = 700;
  Width = 700;
  center_pos = Width/2;
  spaceY = 20;
  spaceX = 20;
  diameter = 15;
  rows = 13;
  zero = 0;
  one = 0;
  beadX = center_pos;
  beadY = spaceY;
  one_cycle = rows;
  count_frames = 0;
  flag = 0;
  // distribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  distribution = Array(rows).fill(0);
  createCanvas(Width, Height);
  background(200);
  frameRate(60);
}

function draw() {
  draw_galton_board(beadX, beadY, rows-one_cycle+1);
  let choice = random_number(0, 1);
  if(choice == 0) {
    beadX -= spaceX;
  }
  else {
    beadX += spaceX;
  }
  beadY += spaceY;
  one_cycle -= 1;
  if(one_cycle == 0) {
    beadX = center_pos;
    beadY = spaceY;
    one_cycle = rows;
  }
}

function draw_galton_board(beadX=-1, beadY=-1, curr_row=0) {
  var positions = [[]];
  positions[0].push(center_pos);
  let row_num = 1;
  for(let i = 1; i < rows; i++) {
    let prev = positions[i-1];
    let curr = [];
    var c = 0;
    prev.forEach((pos) => {
      if(c == 0) {
        curr.push(pos-spaceX);
        c+=1;
      }
      curr.push(pos+spaceX);
      line(pos, spaceY*row_num, pos-spaceX, spaceY*(row_num+1));
      line(pos, spaceY*row_num, pos+spaceX, spaceY*(row_num+1));
    });
    row_num += 1;
    positions.push(curr);
  }
  row_num = 1;
  let col = 0;
  positions.forEach((row) => {
    col = 0;
    row.forEach((pos) => {
      if(beadX == pos && beadY == row_num*spaceY) {
        fill('red');
        if(row_num == rows) distribution[col] += 1;
      }
      else {
        fill('white'); 
      }
      circle(pos, spaceY*row_num, diameter);
      
      col += 1;
    });
    row_num += 1;
  });
  
  // Bar Graph
  for (var i = 0; i < rows; i++){
    rect(i*50+20,500,30,-distribution[i]);
  }
}

function random_number(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min; // [min, max]
}