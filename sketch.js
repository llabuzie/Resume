// The RiTa lib is included in index.html
// The text files are files in the project

let lines, markov, markov2, txt1, txt2,txt3,txt4,txt5,txt6,txt7;
let x = 160, y = 250;
let names = ["Marty", "Trey", "Ethan", "Andrea", "Esha", "Louie"]
let val = 3;
let slider, recButt, resButt, helpButt, saveButt;
let state = 0;
//0 is home
//1 is resume
//2 is letter of rec
//3 is how to make resume


function preload() {

  txt1 = loadStrings('resumeRecent.txt');
  txt2 = loadStrings('letters/martyLetter.txt');
  txt3 = loadStrings('letters/treyLetter.txt');
  txt4 = loadStrings('letters/ethanLetter.txt');
  txt5 = loadStrings('letters/andreaLetter.txt');
  txt6 = loadStrings('letters/eshaLetter.txt');
  txt7 = loadStrings('help.txt');
  img = loadImage('linkedin.png');
}

function setup() {

  cnv=createCanvas(500, 750);
  textFont('Times-New-Roman', 16);
  textLeading(21);
  textAlign(LEFT);

  lines = ["Click to Create My Resume"];
  
  // create a markov model w' n=4
  markov1 = RiTa.markov(val);
  markov2 = RiTa.markov(val);
  markov3 = RiTa.markov(val);

  // load text into the model
  markov1.addText(txt1.join(' '));
  
  markov2.addText(txt2.join(' '));
  markov2.addText(txt3.join(' '));
  markov2.addText(txt4.join(' '));
  markov2.addText(txt5.join(' '));
  markov2.addText(txt6.join(' '));
  
  markov3.addText(txt7.join(' '));
  
  slider = createSlider(2, 4, val, 1);
  slider.position(10, 660);
  slider.style('width', '80px');

  drawPage();
}
function updateMarkov(){
  print(slider.value());
  markov1 = RiTa.markov(slider.value());
  markov2 = RiTa.markov(slider.value());

  // load text into the model
  markov1.addText(txt1.join(' '));
  
  markov2.addText(txt2.join(' '));
  markov2.addText(txt3.join(' '));
  markov2.addText(txt4.join(' '));
  markov2.addText(txt5.join(' '));
  markov2.addText(txt6.join(' '));
  
}
function drawPage(){
  if(state == 0){
    drawHome();
  }
  else if (state == 1){//resume
    drawRes();
  }
  else if (state==2){//recommendation
    drawRec();
    
  }
  else if(state ==3){//Help
    
  }
  recButt = createButton('Create Recommendation');
    recButt.position(10, 600);
    recButt.mousePressed(drawRec);
    resButt = createButton('Create Resume');
    resButt.position(200, 600);
    resButt.mousePressed(drawResume);
    helpButt = createButton('Resume Tips');
    helpButt.position(340, 600);
    helpButt.mousePressed(drawHelp);
    saveButt = createButton('Save This One Because You Are Going to Hire Me');
    saveButt.position(10, 630);
    saveButt.mousePressed(saveFunc);
}

function saveFunc(){
  if(state==1){
    save(cnv, "resume.png");
  }
  else if(state==2){
    save(cnv,"recommendation.png")
  }
}


function drawResume() {
  state = 1;
  lines = markov1.generate(10);
  x = 40;
  y = 100;
  updateMarkov()
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
  text(lines.join(' ') + "\n\nPress Any Key to Create a New Resume", x, y, 420);
  
}
function drawHome(){
  state = 0;
  background(255, 255, 255);
  img.resize(500,500);
  image(img, 0, 0);
  
  
}

function drawHelp(){
  state=3;
  lines = markov3.generate(10);
  x = 40;
  y = 100;
  updateMarkov()
  lines = markov3.generate(10);
  background(255, 255, 255);
  textSize(25);
  text("How To Write a Resume", 40, 55);
  fill(0);
  textSize(16);
  text(lines.join(' ')+"\n\n\nNeed More Help? Press Any Key For More Assistance", x, y, 420, 440);
  
  
}

function drawRec(){
  state=2;
  lines = markov2.generate(10);
  x = 40;
  y = 100;
  updateMarkov()
  lines = markov2.generate(10);
  background(255, 255, 255);
  text("To whom it may concern,", 40, 55);
  fill(0);
  textSize(16);
  text(lines.join(' ')+"\n\nPlease hire Louie\nSincerely,\n"+random(names)+"\n\nPress Any Key For a New Recommendation", x, y, 420, 440);

}
function mousePressed(){
  saveButt.position(10, 630);
  if(state==0){
    window.open("https://www.linkedin.com/in/louis-labuzienski/");
  }
}


function keyPressed(){
  if(state == 1){
    lines = markov1.generate(10);
    x=40;
    y=100;
    drawResume();
    saveButt.position(random(width-80), random(height-80));
    saveButt.style('background-color', color(random(255), random(255), random(255)));
  }
  else if(state == 2){
    lines = markov2.generate(10);
    x=40;
    y=100;
    drawRec();
  }
  else if(state ==3){
    lines = markov3.generate(10);
    x=40;
    y=100;
    drawHelp();
  }
}