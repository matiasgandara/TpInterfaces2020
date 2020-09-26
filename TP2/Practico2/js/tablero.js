'use strict'

//dibujando el tablero

let inicX = 270;
let inicY = 80;
let dimX= 7;
let dimY = 6;
let cantWin = 4;
let fichasJugador =dimX * dimY;
let tabWidth = 60;
let tabHeight = 60;
let tabFill = "rgb(0,0,255)";
let fillCirc = "rgb(255,255,255)";
let fichas = [];//Fichas de ambos equipos
let tamFicha = (tabWidth/2) -7;
/* let ficha1 = new Image;
let ficha2 = new Image;
let fichaWin = new Image; */
let colorUno = "red";
let colorDos = "yellow";
let colorWin = "green";
let vecinos = [];
let bajadas = [];//sectores de bajada de ficha

//guardo el tablero
let matrizJuego = [];


//#region cargado Juego
function cargarTablero(){
    let posX = inicX;
    let posY = inicY;
    let ancho = tabWidth;
    let alto = tabHeight;
    let color = tabFill;
    for (let i = 0; i < dimY ; i++){
        matrizJuego[i]=[];
        for(let j = 0; j < dimX; j++){
            let rect = new Rect(posX,posY,color,ctx,ancho,alto);
            let circ = new Circle(posX+(ancho/2),posY+(alto/2),fillCirc,(ancho/2)-10,ctx);
            //guardo el estado de casillero, arranca en blanco
            let compuesto = new FigCompuesta(rect,circ);
            matrizJuego[i][j] = compuesto;
            posX+=ancho;
        }
        posX = inicX;
        posY+=alto;
    }
  }

  
  function addFichaR(X,Y,color){
    let posX = Math.round(Math.random() * X);
    let posY = Y + Math.round(Math.random() * (canvasHeight - Y));
    let radio = tamFicha;
    let circle = new Circle(posX,posY,color,radio,ctx);
    return circle;
  }

  function addFichaA(X,Y,color){
    let posX = canvasWidth - (Math.round(Math.random() * X));
    let posY = Y + Math.round(Math.random() * (canvasHeight - Y));
    let radio = tamFicha;
    let circle = new Circle(posX,posY,color,radio,ctx);
    return circle;
  }


  function cargarBajadas(){
    let posY = inicY - tamFicha;
    let posX = inicX + (tabWidth/2);
    let radio = tamFicha;
    for(let i = 0; i < dimX; i++){
      /* let rect = new Rect(posX,posY,"green",ctx,tabHeight,tabWidth); */
      let circle = new Circle(posX,posY,"green",radio,ctx);
      bajadas[i] = circle;
      posX+=tabWidth;
    }
  }

  /// MODIFICA EL CUADRANTE DEL SECTOR GANADOR
  function cargarGanador(){
    for(let i = 0; i < vecinos.length ; i++){
      matrizJuego[vecinos[i].x][vecinos[i].y].getFig1().setFill(colorWin);
    }
  }

//#endregion

//#region dibujado de Juego
  function dibujarTablero(){
    dibujarBajadas();
    for(let i=0; i < dimY; i++){
      for(let j=0; j < dimX; j++){
        matrizJuego[i][j].getFig1().draw();
        matrizJuego[i][j].getFig2().draw();
      }
    }
  }

  function dibujarBajadas(){
    for(let i = 0; i < dimX; i++){
      bajadas[i].draw();
    }
  }

  function dibujarFichas(){
      let initAltura = inicY + 250; 
      let limitRojoX = inicX -20;
      let inicAmarilloX = canvasWidth - (limitRojoX + tabWidth * dimX) -20;
        for (let i=0; i < fichasJugador; i++){
            fichas[i]=addFichaR(limitRojoX,initAltura,colorUno);
            i++;
            fichas[i]=addFichaA(inicAmarilloX, initAltura, colorDos);
        }
      cargarTablero();
      cargarBajadas();
    drawFigures();
  }

  function drawFigures(){
    clearCanvas(ctx,colorClean);
    dibujarTablero();
    for (let i=0; i < fichas.length; i++){
        fichas[i].draw();
    }
    
}
//#endregion

//#region LOGICA DE JUEGO
//***AGREGA LA FICHA AL FINAL*/
function actualizarTablero(columna,color){
  let pinto = false;
  for(let i = dimY-1; i >= 0; i--){
    if ((matrizJuego[i][columna].getFig2().getFill() == fillCirc) && !pinto ){
      matrizJuego[i][columna].getFig2().setFill(color);
      pinto = true;
      juegoGanado = buscaGanador(i,columna,color);
    } 
  }
}

//#endregion

//#region VERIFICA SI GANO EL ULTIMO EN AGREGAR
function buscaGanador(posX,posY){
  let enLinea = 0;
  let color = matrizJuego[posX][posY].getFig2().getFill();
  enLinea = recursivoRectaX(posX,posY,color);
  if(enLinea == cantWin){
    cargarGanador();
    return true;
  }
  else{
    vecinos = [];
    enLinea = recursivoRectaY(posX,posY,color);
    if (enLinea == cantWin){
      cargarGanador();
      return true;
    }
    else {
      vecinos = [];
      enLinea = recursivoDiagonalI(posX,posY,color);
      if (enLinea == cantWin){
        cargarGanador();
        return true;
      }
      else {
        vecinos = [];
        enLinea = recursivoDiagonalD(posX,posY,color);
        if (enLinea == cantWin){
          cargarGanador();
          return true;
        }
      }
    }
  }
  return false;
}

function recursivoRectaY(posX,posY,color){
  let suma = 0;
  if (posX >= 0 && posX <= dimX){
    if (matrizJuego[posX][posY].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoRectaY(posX - 1,posY, color);
      return (suma + 1);
    }
  }
  return 0;
}

function recursivoRectaX(posX, posY, color){
  let suma = 0;
  if (posY<= dimY && posY >= 0){
    if (matrizJuego[posX][posY].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoRectaX(posX, posY - 1, color);
      suma+= recursivoRectaX(posX, posY + 1, color);
      return (suma + 1);
    }
  }
  return 0;
}

function recursivoDiagonalI(posX,posY,color){
  let suma = 0;
  if (posX <= dimX && posX >= 0 && posY<= dimY && posY >= 0){
    if (matrizJuego[posX][posY].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoDiagonalI(posX + 1, posY - 1, color);
      suma+= recursivoDiagonalI(posX - 1, posY + 1, color);
      return (suma + 1);
    }
  }
  return 0;
}

function recursivoDiagonalD(posX,posY,color){
  let suma = 0;
  if (posX <= dimX && posX >= 0 && posY<= dimY && posY >= 0){
    if (matrizJuego[posX][posY].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoDiagonalD(posX + 1, posY + 1, color);
      suma+= recursivoDiagonalD(posX - 1, posY - 1, color);
      return (suma + 1);
    }
  }
  return 0;
}


//#endregion