function setup() {
  Height = 700;
  Width = 700;
  center_pos = Width/2;
  spaceY = 20;
  spaceX = 15;
  diameter = 15;
  rows = 10;
  zero = 0;
  one = 0;
  beadX = center_pos;
  beadY = spaceY;
  one_cycle = rows;
  count_frames = 0;
  flag = 0;
  createCanvas(Width, Height);
  background(200);
  frameRate(60);
}

function draw() {
  count_frames += 1;
  count_frames = count_frames%60;
  
  if(count_frames%5 == 0 || flag) {
    draw_galton_board(beadX, beadY);
    if(count_frames%5 == 0) flag = 0;
    if(!flag) { 
      let choice = random_number(0, 1);
      if(choice == 0) {
        beadX -= spaceX;
      }
      else {
        beadX += spaceX;
      }
      beadY += spaceY;
      flag = 1;
      one_cycle -= 1;
      if(one_cycle == 0) {
        beadX = center_pos;
        beadY = spaceY;
        one_cycle = rows;
      }
    }
  }
  else
    draw_galton_board();
}

function draw_galton_board(beadX=-1, beadY=-1) {
  let positions = [[]];
  positions[0].push(center_pos);
  let row_num = 1;
  for(let i = 1; i < rows; i++) {
    let prev = positions[i-1];
    let curr = [];
    prev.forEach((pos) => {
      curr.push(pos-spaceX);
      curr.push(pos+spaceX);
      line(pos, spaceY*row_num, pos-spaceX, spaceY*(row_num+1));
      line(pos, spaceY*row_num, pos+spaceX, spaceY*(row_num+1));
    });
    row_num += 1;
    positions.push(curr);
  }
  row_num = 1;
  positions.forEach((row) => {
    row.forEach((pos) => {
      if(beadX == pos && beadY == row_num*spaceY) fill('red');
      else fill('white');
      circle(pos, spaceY*row_num, diameter);
    });
    row_num += 1;
  });
}

function random_number(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min; // [min, max]
}
