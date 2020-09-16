//'use strict'
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d"); 
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
clearCanvas();
let figures = [];
addFigures();

//--------------------------------------------

function addFigure(){
    let figura = Math.random();
    if (figura > 0,5){ 
        addCircle();
    }
    else{
        addRect();
    }
    drawFigures();
}

function drawFigures(){
    clearCanvas();
    for (let i=0; i < figures.length; i++){
        figures[i].draw();
    }
}

function addCircle(){
  let posX = Math.round(Math.random() * canvasWidth);
  let posY = Math.round(Math.random() * canvasHeight);
  let color = randomRGBA();
  let circle = new Circle(posX,posY,10,color,ctx);
  figures.push(circle);
}

function addRect(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();
    let rect = new Rect(posX,posY,color,ctx,15,10);
    figures.push(rect);
  }

function addFigures(){
    addFigure();
    if (figures.length < 40){
        setTimeout(addFigures,1000);
    }
}
function clearCanvas(){
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(20, 20, canvasWidth, canvasHeight);
    ctx.fill();
    ctx.closePath();
}

function randomRGBA(){
    let R = parseInt(Math.random() * 255);
    let G = parseInt(Math.random() * 255);
    let B = parseInt(Math.random() * 255);
    let A = parseInt(Math.random() * 255);
    return "rgba("+R+","+G+","+B+","+A+")";
}
