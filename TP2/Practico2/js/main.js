'use strict'
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d"); 
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
clearCanvas();
let figures = [];
addFigures();
//--------------------------------------------

function addFigure(){
    let figura = parseInt(Math.random()*10);
    if (figura > 5){ 
        addCircle();
    }
    else{
        addRect();
        addTriangulo();
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
  let radio = parseInt(Math.random() * 50);
  let color = randomRGBA();
  let circle = new Circle(posX,posY,color,radio,ctx);
  figures.push(circle);
}

function addRect(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let ancho = parseInt(Math.random() * 50);
    let alto = parseInt(Math.random() * 50);
    let color = randomRGBA();
    let rect = new Rect(posX,posY,color,ctx,ancho,alto);
    figures.push(rect);
  }

  function addTriangulo(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let ancho = parseInt(Math.random() * 10);
    /* let alto = parseInt(Math.random() * 10); */
    let color = randomRGBA();
    let triangulo = new Triangulo(posX,posY,color,ctx,ancho,ancho);
    figures.push(triangulo);
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
    return "rgb("+R+","+G+","+B+")";
}
