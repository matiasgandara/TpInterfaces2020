let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext("2d"); 
//ctx.fillStyle = "#FF0055";
ctx.fillRect(20, 80, 100, 100);
let fila = canvas.with;
let colum = canvas.height;



function crearMatriz(matriz){
    for (let i = 0; i < fila; i++){
        for (let j = 0; j < colum; j++){
            matriz.fillStyle = "#FF8855";
            matriz.strokeStyle = 'rgba(255,127,0,0,0.5)';
            matriz.fillRect(i+40,j+40,1,1);
        }
    }
}

crearMatriz(ctx);