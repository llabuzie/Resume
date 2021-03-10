// The RiTa lib is included in index.html
// The text files are files in the project

let lines, markov, txt1, txt2;
let x = 160, y = 250;

function preload() {

  txt1 = loadStrings('resumeRecent.txt');
  txt2 = loadStrings('martyLetter.txt');
}

function setup() {

  createCanvas(500, 900);
  textFont('Times-New-Roman', 16);
  textLeading(21);
  textAlign(LEFT);

  lines = ["Click to Create My Resume"];
  
  // create a markov model w' n=4
  markov = RiTa.markov(3);

  // load text into the model
  markov.addText(txt1.join(' '));
  markov.addText(txt2.join(' '));

  drawText();
}

function drawText() {
  background(255, 255, 255);
  fill(0);
  textSize(25);
  text("Louis F. Labuzienski", 40, 10, 420,440);
  textSize(10);
  text("email: llabuzie@iu.edu", 391, 10, 420,440);
  text("phone: 574.252.1333", 400, 25, 420,440);
  textSize(18);
  text("Experience", 40, 55, 420,440);
  line(40,70,485,70)
  textAlign(LEFT);
  text()
  textSize(16);
  text(lines.join(' '), x, y, 420, 440);
}

function mouseClicked() {
  lines = markov.generate(10);
  x = 40;
  y = 100;
  drawText();
}