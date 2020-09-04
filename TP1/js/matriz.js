var canvas = document.getElementById("myCanvas");
let container = canvas.getContext("2d");
container.fillStyle = "#CCCCCC";
let ancho=canvas.width;
let alto = canvas.height;
container.fillRect(0, 0,ancho,alto);
let fila = 200;
let col = 200;
let matrix = [];

function crearMatriz(matriz){
    for (let i = 0; i < fila; i++){
        matriz[i] = [];
        for (let j = 0; j < col; j++){
            let n = parseInt(Math.random() * 100);
            matriz[i][j] = n;
            container.fillStyle = "rgb(255,255,55)";
            container.fillRect(i, j, 1, 1);
        }
    }
}

function crearDegrade(){
    let r = 255;
    let g = 255;
    let b = 55;
    //let a = 255;
    for (let i = 200; i < fila+200; i++){
        let factor = 255;
        for (let j = 0; j < col; j++){
            if (j < col/2){
            let factor = 255 * (j/col);
            //factor -= j;
            //r = factor;
            g = factor;
            //b = factor;
            container.fillStyle = "rgb("+r+","+g+","+b+")";
            container.fillRect(i, j, 1, 1);
            }
            else{

            container.fillStyle = "rgb(255,155,"+b+")";
            container.fillRect(i, j, 1, 1);
            }
        }
    }
}


function valor_maximo(matriz){
    let resultado = [];
    let maximo = 0;
    for (let i = 0; i < fila; i++){
        for (let j = 0; j < col; j++){
            if (matriz[i][j] > maximo){
                maximo = matriz[i][j];
            }
        }
    }
    return maximo;
}

function maxParminImpar(matriz){
    let par = true;
    let resultado = [];
    for (let i = 0; i < fila; i++){
        let minimo = 100;
        let maximo = 0;
        for(let j = 0; j < col; j++){
            if(par){
                if (matriz[i][j] > maximo){
                    maximo = matriz[i][j];
                }
            }
            else{
                if (matriz[i][j] < minimo){
                    minimo = matriz[i][j];
                }
            }
        }
        if (par){
            resultado[i]=maximo;
            par=false;
        }
        else{
            resultado[i]=minimo;
            par=true;
        }
    }
    return resultado;
}


function promedioFilas(matriz){
    let promedios = [];
    let prom = 0;
    for (i = 0; i < fila; i++){
        let suma = 0;
        for(j = 0; j < col; j++){
            suma += matriz[i][j];
        }
        promedios[i]= suma/col;
    }
    return promedios;
}

crearMatriz(matrix);
crearDegrade();
console.log(promedioFilas(matrix));
console.log(valor_maximo(matrix));
console.log(maxParminImpar(matrix));