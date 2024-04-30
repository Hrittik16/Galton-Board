// Galton Board simulation in p5.js

function setup() {
  Height = 700;
  Width = 700;
  node_space = 50;
  radius = 25;
  rows = 7;
  zero = 0;
  one = 0;
  createCanvas(Width, Height);
  background(200);
}

function draw() {
  const center_pos = Width/2;
  let positions = [[]];
  positions[0].push(center_pos);
  let row_num = 1;
  for(let i = 1; i < rows; i++) {
    let prev = positions[i-1];
    let curr = [];
    prev.forEach((pos) => {
      curr.push(pos-50);
      curr.push(pos+50);
      line(pos, node_space*row_num, pos-50, node_space*(row_num+1));
      line(pos, node_space*row_num, pos+50, node_space*(row_num+1));
    });
    row_num += 1;
    positions.push(curr);
  }
  row_num = 1;
  positions.forEach((row) => {
    row.forEach((pos) => {
      circle(pos, node_space*row_num, radius);
    });
    row_num += 1;
  });
  let choice = random_number(0, 1);
  if(choice == 0) zero += 1;
  else one += 1;
  console.log('zero = ', zero, ' one = ', one);
  create_graph(positions);
}

function create_graph(positions) {
  
}

function random_number(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min; // [min, max]
}
