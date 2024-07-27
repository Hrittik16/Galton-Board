function setup() {
  Height = 700;
  Width = 700;
  center_pos = Width/2;
  spaceY = 20;
  spaceX = 15;
  diameter = 15;
  rows = 7;
  zero = 0;
  one = 0;
  total_beads = 100;
  circle_color = red;
  count_frames = 0;
  createCanvas(Width, Height);
  background(200);
  frameRate(60);
}

function draw() {
  count_frames++;
  count_frames = count_frames%121;
  // let choice = random_number(0, 1);
  draw_galton_board(count_frames);
}

function draw_galton_board(count_frames) {
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
      if(count_frames == 0) fill('red');
      if(count_frames == 60) fill('white');
      circle(pos, spaceY*row_num, diameter);
    });
    row_num += 1;
  });
}

function random_number(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min; // [min, max]
}
