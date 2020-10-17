/* let seconds = 0 
let clock = document.querySelector("#box");

setInterval(function() {
    seconds = (seconds+1) % 60;
    clock.getElementsByClassName.trasform = 'rotate(${360 * seconds / 60.0}deg)';
}, 1000); */
/* 'use strict'
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.shadowBlur = 20;
ctx.shadowColor = "black";
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 80); */


let c = document.querySelector('#myCanvas');
let ctx = c.getContext("2d");
let posCentro = {
    'x': c.height/2,
    'y': c.width/2,
};
let reloj = new Image();
reloj.src = "image/reloj.jpg";
reloj.onload = function (){
    let scale = Math.min(c.width/reloj.width,c.height/reloj.height);
    ctx.drawImage(reloj,0,0,reloj.width * scale,reloj.height * scale);
    rectHora();
    rectMinuto();
    rectSegundo();
    //clearCanvasImg(ctx,reloj);
}

function rectHora(){

    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.fillStyle = "red";
    /* ctx.setTransform(1, 0, 0, 1, 60, -40);
    ctx.rotate(20 * Math.PI / 180); */
    ctx.fillRect(posCentro.x-5,posCentro.y-5,80,10);
}


function rectMinuto(){
    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.fillStyle = "blue";
    ctx.setTransform(1, 0, 0, 1, 60, -40);
    ctx.rotate(20 * Math.PI / 180);
    ctx.fillRect(posCentro.x-3,posCentro.y-3,90,7);
}

function rectSegundo(){
    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.fillStyle = "green";
    ctx.setTransform(1, 0, 0, 1, 60, -40);
    ctx.rotate(20 * Math.PI / 180);
    ctx.fillRect(posCentro.x-2,posCentro.y-2,120,4);
}

function clearCanvasImg(ctx,img){
    ctx.drawImage(img,0,0);
}