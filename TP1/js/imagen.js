let canvas = document.getElementById('myCanvas')
let ctx = canvas.getContext("2d"); 

let fila = canvas.width;
let columna = canvas.height;

let imageData = ctx.createImageData(fila,columna);
/*let r = 255;
let g = 255;
let b = 255;
let a = 0;
*/
function crearImagenData(image){
    for (let i = 0; i < fila; i++){
        for (let j=0; j < columna; j++){
            setPixel(image,i,j,255,0,155,0);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}
function setPixel(imageData,x,y,r,g,b,a){
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;

}




