'use strict'
let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext("2d"); 

let MAXFIGURES = 10;
let SIZEFIGURES = 25;

let lastClickedFigure = null;
let isMouseDown = false;

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let colorClean = "rgb(255,255,255)";
clearCanvas(ctx,colorClean);
let figures = [];
addFigures();
canvas.addEventListener('mousedown',onMouseDown,false);


//--------------------------------------------



function findClickedFigure(layerX, layerY){
    for (let f = 0; f < MAXFIGURES; f++){
        
        if (figures[f].isPointInside(layerX,layerY) === true){
            return figures[f];
        }
    }
    return null;
}

function onMouseDown(event){
    isMouseDown = true;
    if (lastClickedFigure != null){
        lastClickedFigure.setSeleccionado(false);
        lastClickedFigure = null;
    }
    let clickedFigure = findClickedFigure(event.layerX, event.layerY);
    if (clickedFigure != null){
        clickedFigure.setSeleccionado(true);
        lastClickedFigure - clickedFigure;
    }
    drawFigures();
}

function addFigure(){
    for (let i = 0; i < MAXFIGURES; i++){
        if (Math.random() > 0.5){
            addCircle();
        }else{
            addRect()
        }
    }
    drawFigures();

   /*  canvas.addEventListener('mousedown',onMouseDown,false); */
    /* canvas.addEventListener('mouseup',onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMoved, false); */
}

function drawFigures(){
    clearCanvas(ctx,colorClean);
    for (let i=0; i < figures.length; i++){
        figures[i].draw();
    }
}

function addCircle(){
  let posX = Math.round(Math.random() * canvasWidth);
  let posY = Math.round(Math.random() * canvasHeight);
  let radio = SIZEFIGURES;
  let color = randomRGBA();
  let circle = new Circle(posX,posY,color,radio,ctx);
  figures.push(circle);
}

function addRect(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let ancho = SIZEFIGURES;
    let alto = SIZEFIGURES;
    let color = randomRGBA();
    let rect = new Rect(posX,posY,color,ctx,ancho,alto);
    figures.push(rect);
  }

  function addTriangulo(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let ancho = parseInt(Math.random() * 10);
    let alto = parseInt(Math.random() * 10);
    let color = randomRGBA();
    let triangulo = new Triangulo(posX,posY,color,ctx,ancho,alto);
    figures.push(triangulo);
  }
  
  

function addFigures(){
    addFigure();
    if (figures.length < MAXFIGURES){
        addFigures();
    }
}

