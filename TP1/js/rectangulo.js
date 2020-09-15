let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d"); 
let alto = canvas.width;
let ancho = canvas.height;
ctx.beginPath();
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, alto, ancho);
ctx.fill();
ctx.closePath();


// sigo desde aca

